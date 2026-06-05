<template>
  <div class="min-h-screen bg-[#F4F7FA] dark:bg-[#0B1120] font-sans text-slate-800 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-500 pb-32">
    
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <div class="absolute inset-0 bg-[radial-gradient(#94A3B8_1px,transparent_1.5px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1.5px)] [background-size:32px_32px] opacity-[0.12] dark:opacity-[0.05] transition-opacity"></div>
      <div class="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-40 dark:opacity-20 animate-blob bg-indigo-300 dark:bg-indigo-600 transition-opacity"></div>
      <div class="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[140px] opacity-40 dark:opacity-20 animate-blob animation-delay-4000 bg-fuchsia-200 dark:bg-fuchsia-800 transition-opacity"></div>
    </div>

    <main class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-16 animate-fade-in-up">
      
      <div class="mb-12">
        <button @click="router.push('/admin')" class="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors">
          <div class="w-8 h-8 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
          </div>
          Back to Admin Dashboard
        </button>

        <h1 class="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-none mb-4">System Preferences</h1>
        <p class="text-slate-500 dark:text-slate-400 font-medium">Customize your administrative workspace experience.</p>
      </div>

      <div class="space-y-8">
        
        <div class="bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2.5rem] shadow-xl shadow-indigo-500/5 dark:shadow-black/50 border border-white dark:border-white/5 p-8 sm:p-10">
          <div class="flex items-center gap-4 mb-8">
            <div class="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
            </div>
            <div>
              <h2 class="text-xl font-black text-slate-900 dark:text-white tracking-tight">Appearance</h2>
              <p class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Select your preferred theme</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <button 
              @click="setTheme('system')" 
              :class="['p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-4 text-center', 
                currentTheme === 'system' ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10 shadow-lg shadow-indigo-500/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 opacity-70 hover:opacity-100'
              ]"
            >
              <div :class="['p-4 rounded-full', currentTheme === 'system' ? 'bg-indigo-500 text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-400']">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <p class="font-black text-slate-900 dark:text-white">System</p>
                <p class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">Syncs with OS</p>
              </div>
            </button>

            <button 
              @click="setTheme('light')" 
              :class="['p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-4 text-center', 
                currentTheme === 'light' ? 'border-amber-400 bg-amber-50/50 dark:bg-amber-500/10 shadow-lg shadow-amber-500/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-amber-300 dark:hover:border-amber-700 opacity-70 hover:opacity-100'
              ]"
            >
              <div :class="['p-4 rounded-full', currentTheme === 'light' ? 'bg-amber-400 text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-400']">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              </div>
              <div>
                <p class="font-black text-slate-900 dark:text-white">Light Mode</p>
                <p class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">Always Bright</p>
              </div>
            </button>

            <button 
              @click="setTheme('dark')" 
              :class="['p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-4 text-center', 
                currentTheme === 'dark' ? 'border-indigo-400 bg-indigo-50/50 dark:bg-indigo-500/10 shadow-lg shadow-indigo-500/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 opacity-70 hover:opacity-100'
              ]"
            >
              <div :class="['p-4 rounded-full', currentTheme === 'dark' ? 'bg-indigo-900 text-indigo-300' : 'bg-slate-100 dark:bg-slate-900 text-slate-400']">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
              </div>
              <div>
                <p class="font-black text-slate-900 dark:text-white">Dark Mode</p>
                <p class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">Always Dark</p>
              </div>
            </button>

          </div>
        </div>

        <div class="bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2.5rem] shadow-xl shadow-fuchsia-500/5 dark:shadow-black/50 border border-white dark:border-white/5 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div class="flex items-center gap-5">
            <div class="w-12 h-12 rounded-2xl bg-fuchsia-50 dark:bg-fuchsia-500/10 flex items-center justify-center text-fuchsia-600 dark:text-fuchsia-400 border border-fuchsia-100 dark:border-fuchsia-500/20 shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
            </div>
            <div>
              <h2 class="text-xl font-black text-slate-900 dark:text-white tracking-tight">Performance Animations</h2>
              <p class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">Enable for smooth transitions & effects</p>
            </div>
          </div>
          
          <button @click="toggleAnimations" :class="isAnimationsEnabled ? 'bg-fuchsia-500' : 'bg-slate-300 dark:bg-slate-700'" class="w-14 h-8 rounded-full relative transition-colors duration-300 focus:outline-none flex-shrink-0 border border-transparent dark:border-white/10">
            <span :class="isAnimationsEnabled ? 'translate-x-[26px]' : 'translate-x-1'" class="absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 shadow-sm flex items-center justify-center"></span>
          </button>
        </div>

        <div class="bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2.5rem] shadow-xl shadow-rose-500/5 dark:shadow-black/50 border border-white dark:border-white/5 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div class="flex items-center gap-5">
            <div class="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-500/20 shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </div>
            <div>
              <h2 class="text-xl font-black text-slate-900 dark:text-white tracking-tight">Account Session</h2>
              <p class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">Securely log out of the admin portal</p>
            </div>
          </div>
          
          <button @click="handleSignOut" class="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-black tracking-widest uppercase text-xs transition-all shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:-translate-y-0.5 shrink-0 flex items-center gap-2">
            Sign Out
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </button>
        </div>

      </div>
    </main>

    <!-- COOL ALERT MODAL -->
    <transition name="fade-scale">
      <div v-if="customAlert.show" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xl transition-opacity" @click="closeAlert"></div>

        <div class="relative w-full max-w-sm bg-white dark:bg-[#0A0A0A] rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.3)] overflow-hidden border border-slate-200 dark:border-white/10 flex flex-col z-10 p-8 text-center ring-1 ring-slate-200 dark:ring-white/5">
          
          <div :class="['absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none', 
            customAlert.type === 'success' ? 'bg-emerald-500/20' : 
            customAlert.type === 'error' ? 'bg-rose-500/20' : 
            'bg-amber-500/20']">
          </div>

          <div :class="['w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-2xl relative transition-transform animate-bounce-short', 
            customAlert.type === 'success' ? 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-500/40' : 
            customAlert.type === 'error' ? 'bg-gradient-to-br from-rose-400 to-red-500 shadow-rose-500/40' : 
            'bg-gradient-to-br from-amber-400 to-orange-500 shadow-amber-500/40']">
            
            <div class="absolute inset-0 rounded-full border-2 border-white/30 mix-blend-overlay"></div>
            
            <svg v-if="customAlert.type === 'success'" class="w-10 h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
            <svg v-else-if="customAlert.type === 'error'" class="w-10 h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
            <svg v-else class="w-10 h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          </div>

          <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-2 font-sans tracking-tight">
            {{ customAlert.type === 'success' ? 'Success!' : customAlert.type === 'error' ? 'Error Occurred' : 'Sign Out?' }}
          </h3>
          <p class="text-sm font-bold text-slate-500 dark:text-slate-400 mb-8 font-khmer">
            {{ customAlert.message }}
          </p>

          <div v-if="customAlert.type === 'confirm'" class="flex gap-3">
            <button @click="closeAlert" class="flex-1 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300">
              Cancel
            </button>
            <button @click="executeConfirm" class="flex-1 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg text-white bg-rose-600 hover:bg-rose-500 hover:shadow-rose-500/25">
              {{ customAlert.confirmText }}
            </button>
          </div>
          
          <button v-else @click="closeAlert" :class="['w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-lg text-white flex items-center justify-center gap-2 hover:-translate-y-1', 
            customAlert.type === 'success' ? 'bg-slate-900 dark:bg-white dark:text-slate-900 hover:shadow-emerald-500/25 dark:hover:bg-emerald-400' : 'bg-rose-600 hover:shadow-rose-500/25 hover:bg-rose-500']">
            {{ customAlert.type === 'success' ? 'Awesome' : 'Try Again' }}
          </button>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// --- STATE ---
const currentTheme = ref('system'); 
const isAnimationsEnabled = ref(true);

// Cool Alert State
const customAlert = ref({ show: false, type: 'success', message: '', confirmText: 'Confirm', confirmAction: null });
let alertTimeout = null;

// --- MOUNT & INIT ---
onMounted(() => {
  // Load Theme
  const savedTheme = localStorage.getItem('theme') || 'system';
  currentTheme.value = savedTheme;
  applyThemeClass();

  // Load Animations
  if (localStorage.getItem('animations') === 'false') {
    isAnimationsEnabled.value = false;
    document.documentElement.classList.add('disable-animations');
  } else {
    isAnimationsEnabled.value = true;
    document.documentElement.classList.remove('disable-animations');
  }

  // System listener to catch live OS changes if set to 'system'
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (currentTheme.value === 'system') {
      applyThemeClass();
    }
  });
});

// --- THEME LOGIC ---
const setTheme = (themeOption) => {
  currentTheme.value = themeOption;
  localStorage.setItem('theme', themeOption);
  applyThemeClass();
};

const applyThemeClass = () => {
  if (currentTheme.value === 'dark' || (currentTheme.value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// --- ANIMATION LOGIC ---
const toggleAnimations = () => {
  isAnimationsEnabled.value = !isAnimationsEnabled.value;
  if (!isAnimationsEnabled.value) {
    document.documentElement.classList.add('disable-animations');
    localStorage.setItem('animations', 'false');
  } else {
    document.documentElement.classList.remove('disable-animations');
    localStorage.setItem('animations', 'true');
  }
};

// --- ALERT LOGIC ---
const triggerAlert = (type, message, confirmText = 'Confirm', onConfirm = null) => {
  customAlert.value = { show: true, type, message, confirmText, confirmAction: onConfirm };
  if (type === 'success') {
    alertTimeout = setTimeout(() => {
      if (customAlert.value.show) closeAlert();
    }, 2500);
  }
};

const closeAlert = () => {
  customAlert.value.show = false;
  if (alertTimeout) clearTimeout(alertTimeout);
};

const executeConfirm = () => {
  if (customAlert.value.confirmAction) {
    customAlert.value.confirmAction();
  }
  closeAlert();
};

// --- AUTH LOGIC ---
const handleSignOut = () => {
  // Trigger the confirmation alert instead of directly logging out
  triggerAlert(
    'confirm', 
    'Are you sure you want to securely terminate this admin session?', 
    'Log Out', 
    logout
  );
};

const logout = () => {
  // Remove the admin authentication token
  localStorage.removeItem('duc_admin_token');
  // Redirect to the hidden admin login route
  router.push('/admin/login');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;500;600;700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
.font-khmer { font-family: 'Kantumruy Pro', sans-serif; }

.animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob { animation: blob 15s infinite alternate; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

.fade-scale-enter-active, .fade-scale-leave-active { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.fade-scale-enter-from, .fade-scale-leave-to { opacity: 0; transform: scale(0.9) translateY(15px); }

@keyframes bounce-short {
  0% { transform: scale(0.8); opacity: 0; }
  60% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-bounce-short { animation: bounce-short 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
</style>