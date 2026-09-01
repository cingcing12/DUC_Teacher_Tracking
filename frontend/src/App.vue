<template>
  <component :is="layoutComponent">
    
    <router-view v-slot="{ Component }">
      <transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </component>

  <!-- ERROR BOUNDARY DISPLAY -->
  <div v-if="globalError" class="fixed inset-0 z-[999999] bg-black/90 p-10 flex flex-col items-center justify-center text-white font-mono">
    <h1 class="text-red-500 text-3xl font-bold mb-4">Vue Runtime Error!</h1>
    <pre class="bg-red-900/50 p-6 rounded-xl overflow-auto max-w-4xl text-sm border border-red-500 whitespace-pre-wrap">{{ globalError }}</pre>
    <button @click="globalError = null" class="mt-8 px-6 py-3 bg-white text-black font-bold rounded hover:bg-slate-200">Dismiss</button>
  </div>

  <!-- Cool Blocked Alert Modal -->
  <transition name="fade-scale">
    <div v-if="isBlockedGlobal" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
      <div class="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center border border-red-500/30 transform transition-all animate-bounce-short">
        <div class="w-20 h-20 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white mb-2 font-khmer">Account Blocked</h2>
        <p class="text-slate-500 dark:text-slate-400 mb-8 font-khmer text-sm leading-relaxed">
          Your account has been temporarily restricted by the Administrator. Please contact support for more information.
        </p>
        <button @click="handleLogoutRedirect" class="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-red-500/30">
          Return to Login
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, onErrorCaptured, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MainLayout from './components/MainLayout.vue';
const route = useRoute();
const router = useRouter();

const isBlockedGlobal = ref(false);
const globalError = ref(null);

onErrorCaptured((err, instance, info) => {
  console.error('Captured in App.vue:', err, info);
  globalError.value = `${err.toString()}\n\nInfo: ${info}\n\nStack: ${err.stack}`;
  return false; // Stop propagation
});

const layoutComponent = computed(() => {
  // 1. Hide for login pages
  if (route.path.includes('/login') || route.name === 'login') {
    return 'div';
  }

  // 2. Hide for admin dashboard pages
  if (route.path.includes('/admin')) {
    return 'div';
  }

  // 🔥 3. FIX: Hide for 404 pages 
  if (route.name === 'NotFound' || route.matched.length === 0) {
    return 'div';
  }

  // Standard teacher pages use MainLayout
  return MainLayout;
});

const handleLogoutRedirect = () => {
  isBlockedGlobal.value = false;
  localStorage.removeItem('duc_teacher_token');
  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }
  if (router) router.push('/login');
  else window.location.href = '/login';
};

let eventSource = null;

const setupSSE = () => {
  if (eventSource) return; // Already connected
  
  const token = localStorage.getItem('duc_teacher_token');
  if (!token) return;

  try {
    const teacher = JSON.parse(token);
    if (!teacher || !teacher.nameKh) return;

    eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/api/stream-status?name=${encodeURIComponent(teacher.nameKh)}`);
    
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'BLOCKED') {
          isBlockedGlobal.value = true;
          if (eventSource) {
            eventSource.close();
            eventSource = null;
          }
        } else if (data.type === 'CLASS_TOGGLED') {
          // Dispatch a global event so that schedule views can refresh their data
          window.dispatchEvent(new CustomEvent('class-toggled', { detail: data }));
        } else if (data.type === 'MAPPING_UPDATED') {
          window.dispatchEvent(new CustomEvent('mapping-updated', { detail: data }));
        } else if (data.type === 'TRACKING_UPDATED') {
          window.dispatchEvent(new CustomEvent('tracking-updated', { detail: data }));
        }
      } catch (err) {
        console.error("Failed to parse SSE message", err);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      if (eventSource) {
        eventSource.close();
        eventSource = null;
      }
    };
  } catch (error) {
    console.error("Failed to setup SSE", error);
  }
};

// Watch route changes to establish SSE if the user logs in without a page refresh
watch(() => route.path, (newPath) => {
  if (!newPath.includes('/login')) {
    setupSSE();
  }
});

onMounted(() => {
  // Global App Theme Hydration
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (theme === 'light') {
    document.documentElement.classList.remove('dark');
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  }
  
  // Global Animation Hydration
  if (localStorage.getItem('animations') === 'false') {
    document.documentElement.classList.add('disable-animations');
  }

  // Use SSE for real-time blocking
  setupSSE();
});

onUnmounted(() => {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }
});
</script>
<style>
/* 🔥 FIX: Sped up transitions so clicks feel instant and responsive! */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.15s ease-out, transform 0.15s ease-out;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Base styles for standardizing scrollbars across the app */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.dark ::-webkit-scrollbar-thumb { background: #475569; }

@keyframes bounce-short { 
  0% { transform: scale(0.8); opacity: 0; } 
  60% { transform: scale(1.1); opacity: 1; } 
  100% { transform: scale(1); opacity: 1; } 
}
.animate-bounce-short { animation: bounce-short 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

.fade-scale-enter-active, .fade-scale-leave-active { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
.fade-scale-enter-from, .fade-scale-leave-to { opacity: 0; transform: scale(0.9) translateY(-10px); }
</style>