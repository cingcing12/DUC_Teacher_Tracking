<template>
  <main class="relative z-10 max-w-xl mx-auto px-4 sm:px-6 pt-2 pb-24 sm:pb-12">
      
    <button @click="goBack" class="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors w-max">
      <div class="w-8 h-8 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
      </div>
      Back to Workspace
    </button>

    <div class="bg-white/60 dark:bg-[#0A0A0A]/60 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] border border-white dark:border-white/5 p-8 sm:p-10 overflow-hidden relative transition-colors duration-500 animate-fade-in-up">
      
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div class="mb-10 relative z-10">
        <div class="w-12 h-12 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-indigo-600 dark:to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg mb-6 border border-slate-700 dark:border-indigo-400/50">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        </div>
        <h1 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight">System Preferences</h1>
        <p class="text-slate-500 dark:text-slate-400 mt-2 text-sm font-medium">Customize your workspace environment.</p>
      </div>

      <div class="relative z-10">
        <p class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Interface Theme</p>
        
        <div class="grid grid-cols-3 gap-3">
          <button @click="setTheme('light')" :class="['py-6 px-4 rounded-[1.5rem] flex flex-col items-center gap-3 transition-all duration-300 border', theme === 'light' ? 'bg-white dark:bg-slate-800 shadow-[0_8px_20px_rgba(0,0,0,0.05)] border-indigo-100 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 ring-2 ring-indigo-500/20' : 'bg-slate-50 dark:bg-white/5 border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10']">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            <span class="text-[10px] font-black uppercase tracking-wider">Light</span>
          </button>
          
          <button @click="setTheme('dark')" :class="['py-6 px-4 rounded-[1.5rem] flex flex-col items-center gap-3 transition-all duration-300 border', theme === 'dark' ? 'bg-white dark:bg-slate-800 shadow-[0_8px_20px_rgba(0,0,0,0.05)] border-indigo-100 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 ring-2 ring-indigo-500/20' : 'bg-slate-50 dark:bg-white/5 border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10']">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            <span class="text-[10px] font-black uppercase tracking-wider">Dark</span>
          </button>
          
          <button @click="setTheme('system')" :class="['py-6 px-4 rounded-[1.5rem] flex flex-col items-center gap-3 transition-all duration-300 border', theme === 'system' ? 'bg-white dark:bg-slate-800 shadow-[0_8px_20px_rgba(0,0,0,0.05)] border-indigo-100 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 ring-2 ring-indigo-500/20' : 'bg-slate-50 dark:bg-white/5 border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10']">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            <span class="text-[10px] font-black uppercase tracking-wider">Auto</span>
          </button>
        </div>
      </div>

      <div class="relative z-10 mt-8 pt-8 border-t border-slate-200/50 dark:border-slate-800/50">
        <p class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Motion Preferences</p>
        
        <div class="flex items-center justify-between bg-slate-50 dark:bg-white/5 p-5 rounded-[1.5rem] border border-transparent dark:border-white/5 transition-colors">
          <div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Interface Animations</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Enable fluid transitions and motion effects.</p>
          </div>
          
          <button 
            @click="toggleAnimations" 
            :class="['relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 shadow-inner', enableAnimations ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-700']"
          >
            <span class="sr-only">Toggle Animations</span>
            <span :class="['pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out', enableAnimations ? 'translate-x-5' : 'translate-x-0']"></span>
          </button>
        </div>
      </div>

    </div>
  </main>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Theme State
const theme = ref(localStorage.getItem('theme') || 'system');

// Animation State (Defaults to true if not set)
const enableAnimations = ref(localStorage.getItem('animations') !== 'false');

// --- THEME LOGIC ---
const applyTheme = () => {
  if (theme.value === 'dark' || (theme.value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const setTheme = (newTheme) => {
  theme.value = newTheme;
};

watch(theme, (newTheme) => {
  localStorage.setItem('theme', newTheme);
  applyTheme();
});

// --- ANIMATION LOGIC ---
const applyAnimations = () => {
  if (enableAnimations.value) {
    document.documentElement.classList.remove('disable-animations');
  } else {
    document.documentElement.classList.add('disable-animations');
  }
};

const toggleAnimations = () => {
  enableAnimations.value = !enableAnimations.value;
};

watch(enableAnimations, (newValue) => {
  localStorage.setItem('animations', newValue);
  applyAnimations();
});

// --- LIFECYCLE ---
onMounted(() => {
  applyTheme();
  applyAnimations();
  
  // Protect the route
  if (!localStorage.getItem('duc_teacher_token')) {
    router.push('/login');
  }
});

const goBack = () => {
  // Using '/' or '/schedule' depending on your main page route
  router.push('/schedule');
};
</script>

<style>
/* 🔥 GLOBAL OVERRIDE: 
  This stops ALL CSS animations and transitions when the '.disable-animations' 
  class is applied to the <html> tag. 
*/
.disable-animations *,
.disable-animations *::before,
.disable-animations *::after {
  animation: none !important;
  transition: none !important;
}

.animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>