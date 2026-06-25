<template>
  <main class="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-6 pb-32 sm:pb-12 flex flex-col items-center">
      
    <!-- 🚀 Premium Floating Back Button -->
    <div class="w-full flex justify-start mb-6 sm:mb-8 animate-fade-in-up">
      <button @click="goBack" :class="['group flex items-center gap-2 sm:gap-3 px-5 py-2.5 bg-white/40 dark:bg-slate-800/40 hover:bg-white/80 dark:hover:bg-slate-800/80 backdrop-blur-2xl rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-500 shadow-[0_4px_15px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_15px_rgba(0,0,0,0.2)] border border-white/60 dark:border-white/10 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:-translate-y-0.5', language === 'kh' ? 'font-khmer' : '']">
        <div class="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/30 group-hover:-translate-x-1 transition-all duration-300">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
        </div>
        {{ t.back }}
      </button>
    </div>

    <!-- 🌌 Ultra-Deep Glass Settings Panel -->
    <div class="w-full bg-white/60 dark:bg-[#0B1120]/70 backdrop-blur-3xl rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_20px_80px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_40px_100px_-20px_rgba(99,102,241,0.15)] border border-white dark:border-slate-700/50 p-6 sm:p-10 overflow-hidden relative transition-colors duration-500 animate-fade-in-up ring-1 ring-slate-900/5 dark:ring-white/5" style="animation-delay: 0.1s;">
      
      <!-- Dynamic Ambient Light Orbs -->
      <div class="absolute -top-32 -right-32 w-96 h-96 bg-indigo-500/20 dark:bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none z-0 animate-pulse-slow"></div>
      <div class="absolute -bottom-32 -left-32 w-96 h-96 bg-cyan-500/20 dark:bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0 animate-pulse-slow" style="animation-delay: 2s;"></div>

      <!-- Header -->
      <div class="mb-10 relative z-10 flex flex-col items-center text-center">
        <!-- Levitating Icon Box -->
        <div class="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-indigo-400 dark:via-indigo-500 dark:to-cyan-400 rounded-[1.25rem] flex items-center justify-center shadow-[0_15px_30px_rgba(0,0,0,0.2)] dark:shadow-[0_15px_30px_rgba(99,102,241,0.4)] mb-5 border-t border-white/20 dark:border-white/40 animate-float relative group cursor-default">
          <div class="absolute inset-0 bg-white/20 rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <svg class="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-md transition-transform duration-700 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        </div>
        
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-3 shadow-inner">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span :class="['text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400', language === 'kh' ? 'font-khmer' : '']">System Active</span>
        </div>
        
        <h1 :class="['text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white', language === 'kh' ? 'font-khmer leading-snug' : '']">{{ t.title }}</h1>
        <p :class="['text-slate-500 dark:text-slate-400 mt-2 text-sm font-bold', language === 'kh' ? 'font-khmer' : '']">{{ t.subtitle }}</p>
      </div>

      <!-- 🌓 Theme Section -->
      <div class="relative z-10 mb-10 animate-fade-in-up" style="animation-delay: 0.2s;">
        <div class="flex items-center justify-between mb-4 px-1">
          <p :class="['text-[10px] sm:text-xs font-black text-slate-800 dark:text-white uppercase tracking-widest flex items-center gap-2', language === 'kh' ? 'font-khmer' : '']">
            <span class="w-5 h-5 rounded-md bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-500 shrink-0">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
            </span>
            {{ t.theme }}
          </p>
        </div>
        
        <div class="grid grid-cols-3 gap-3 sm:gap-4 p-1.5 bg-slate-100 dark:bg-[#060B14]/80 rounded-[2rem] border border-slate-200/50 dark:border-white/5 shadow-inner">
          
          <!-- Light -->
          <button @click="setTheme('light')" :class="['relative overflow-hidden pt-5 pb-4 px-2 sm:px-4 rounded-[1.5rem] flex flex-col items-center gap-3 transition-all duration-300 outline-none group', theme === 'light' ? 'bg-white dark:bg-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-transparent text-indigo-600 dark:text-indigo-400' : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5']">
            <div :class="['w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300', theme === 'light' ? 'bg-indigo-50 dark:bg-indigo-500/10 scale-110 shadow-inner' : 'bg-slate-200/50 dark:bg-slate-700/50 group-hover:scale-105']">
              <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <span :class="['font-black uppercase tracking-wider transition-colors', language === 'kh' ? 'font-khmer text-[10px] sm:text-xs' : 'text-[9px] sm:text-[10px]', theme === 'light' ? 'text-indigo-600 dark:text-indigo-400' : '']">{{ t.light }}</span>
          </button>
          
          <!-- Dark -->
          <button @click="setTheme('dark')" :class="['relative overflow-hidden pt-5 pb-4 px-2 sm:px-4 rounded-[1.5rem] flex flex-col items-center gap-3 transition-all duration-300 outline-none group', theme === 'dark' ? 'bg-white dark:bg-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-transparent text-indigo-600 dark:text-indigo-400' : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5']">
            <div :class="['w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300', theme === 'dark' ? 'bg-indigo-50 dark:bg-indigo-500/10 scale-110 shadow-inner' : 'bg-slate-200/50 dark:bg-slate-700/50 group-hover:scale-105']">
              <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            </div>
            <span :class="['font-black uppercase tracking-wider transition-colors', language === 'kh' ? 'font-khmer text-[10px] sm:text-xs' : 'text-[9px] sm:text-[10px]', theme === 'dark' ? 'text-indigo-600 dark:text-indigo-400' : '']">{{ t.dark }}</span>
          </button>
          
          <!-- Auto -->
          <button @click="setTheme('system')" :class="['relative overflow-hidden pt-5 pb-4 px-2 sm:px-4 rounded-[1.5rem] flex flex-col items-center gap-3 transition-all duration-300 outline-none group', theme === 'system' ? 'bg-white dark:bg-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-transparent text-indigo-600 dark:text-indigo-400' : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5']">
            <div v-if="theme === 'system'" class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-fuchsia-500/5 to-cyan-500/5 z-0 animate-pulse-slow"></div>
            <div :class="['w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative z-10', theme === 'system' ? 'bg-indigo-50 dark:bg-indigo-500/10 scale-110 shadow-inner ring-2 ring-indigo-500/20' : 'bg-slate-200/50 dark:bg-slate-700/50 group-hover:scale-105']">
              <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <span :class="['font-black uppercase tracking-wider relative z-10 transition-colors', language === 'kh' ? 'font-khmer text-[10px] sm:text-xs' : 'text-[9px] sm:text-[10px]', theme === 'system' ? 'text-indigo-600 dark:text-indigo-400' : '']">{{ t.auto }}</span>
          </button>
        </div>
      </div>

      <!-- 🌍 Language Section -->
      <div class="relative z-10 mb-10 pt-8 border-t border-slate-200/50 dark:border-slate-700/50 animate-fade-in-up" style="animation-delay: 0.3s;">
        <div class="flex items-center justify-between mb-4 px-1">
          <p :class="['text-[10px] sm:text-xs font-black text-slate-800 dark:text-white uppercase tracking-widest flex items-center gap-2', language === 'kh' ? 'font-khmer' : '']">
            <span class="w-5 h-5 rounded-md bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center text-cyan-500 shrink-0">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
            </span>
            {{ t.lang }}
          </p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <!-- English -->
          <button @click="setLanguage('en')" :class="['relative overflow-hidden py-4 sm:py-5 px-5 rounded-2xl sm:rounded-[1.5rem] flex items-center justify-start gap-4 transition-all duration-300 border outline-none group hover:-translate-y-1', language === 'en' ? 'bg-white dark:bg-slate-800 shadow-[0_15px_30px_rgba(6,182,212,0.15)] border-cyan-200 dark:border-cyan-500/50 ring-2 ring-cyan-500/20' : 'bg-slate-50 dark:bg-white/5 border-transparent hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:border-slate-200 dark:hover:border-slate-700']">
            <div :class="['w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-2xl sm:text-3xl shadow-inner transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110', language === 'en' ? 'bg-cyan-50 dark:bg-cyan-900/30' : 'bg-slate-200/50 dark:bg-slate-700/50']">🇬🇧</div>
            <div class="text-left flex-grow">
              <p :class="['font-black uppercase tracking-wider text-sm sm:text-base font-sans', language === 'en' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-700 dark:text-slate-300']">English</p>
              <p class="text-[9px] sm:text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest">Global</p>
            </div>
            <div :class="['w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shrink-0', language === 'en' ? 'bg-cyan-500 text-white scale-100 opacity-100' : 'bg-slate-200 dark:bg-slate-700 text-transparent scale-50 opacity-0']">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
          </button>
          
          <!-- Khmer -->
          <button @click="setLanguage('kh')" :class="['relative overflow-hidden py-4 sm:py-5 px-5 rounded-2xl sm:rounded-[1.5rem] flex items-center justify-start gap-4 transition-all duration-300 border outline-none group hover:-translate-y-1', language === 'kh' ? 'bg-white dark:bg-slate-800 shadow-[0_15px_30px_rgba(6,182,212,0.15)] border-cyan-200 dark:border-cyan-500/50 ring-2 ring-cyan-500/20' : 'bg-slate-50 dark:bg-white/5 border-transparent hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:border-slate-200 dark:hover:border-slate-700']">
            <div :class="['w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-2xl sm:text-3xl shadow-inner transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110', language === 'kh' ? 'bg-cyan-50 dark:bg-cyan-900/30' : 'bg-slate-200/50 dark:bg-slate-700/50']">🇰🇭</div>
            <div class="text-left flex-grow">
              <p :class="['font-black uppercase tracking-wider text-base sm:text-lg font-khmer leading-none', language === 'kh' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-700 dark:text-slate-300']">ភាសាខ្មែរ</p>
              <p class="text-[9px] sm:text-[10px] font-bold text-slate-400 mt-1 font-khmer uppercase tracking-widest">កម្ពុជា</p>
            </div>
            <div :class="['w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shrink-0', language === 'kh' ? 'bg-cyan-500 text-white scale-100 opacity-100' : 'bg-slate-200 dark:bg-slate-700 text-transparent scale-50 opacity-0']">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
          </button>
        </div>
      </div>

      <!-- ✨ Motion Section -->
      <div class="relative z-10 pt-8 border-t border-slate-200/50 dark:border-slate-700/50 animate-fade-in-up" style="animation-delay: 0.4s;">
        <div class="flex items-center justify-between mb-4 px-1">
          <p :class="['text-[10px] sm:text-xs font-black text-slate-800 dark:text-white uppercase tracking-widest flex items-center gap-2', language === 'kh' ? 'font-khmer' : '']">
            <span class="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </span>
            {{ t.motion }}
          </p>
        </div>
        
        <div class="flex items-center justify-between bg-slate-50 dark:bg-[#060B14]/80 p-5 sm:p-6 rounded-2xl sm:rounded-[1.5rem] border border-slate-200/50 dark:border-white/5 transition-all shadow-inner hover:shadow-md group">
          <div class="flex items-center gap-4">
            <div :class="['w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 transition-colors', enableAnimations ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-slate-200 dark:bg-slate-800 text-slate-400']">
              <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div>
              <h3 :class="['font-black text-slate-900 dark:text-white', language === 'kh' ? 'font-khmer text-base' : 'text-sm sm:text-base']">{{ t.animations }}</h3>
              <p :class="['text-slate-500 dark:text-slate-400 mt-1', language === 'kh' ? 'font-khmer text-[10px] sm:text-xs' : 'text-[10px] sm:text-xs font-bold']">{{ t.animationsDesc }}</p>
            </div>
          </div>
          
          <button 
            @click="toggleAnimations" 
            :class="['relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full transition-all duration-500 ease-out outline-none border-[3px]', enableAnimations ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-slate-300 dark:bg-slate-700 border-slate-300 dark:border-slate-700']"
          >
            <span class="sr-only">Toggle Animations</span>
            <span :class="['pointer-events-none inline-flex items-center justify-center h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-500 ease-out', enableAnimations ? 'translate-x-[1.4rem]' : 'translate-x-0']">
              <svg v-if="enableAnimations" class="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
            </span>
          </button>
        </div>
      </div>

    </div>
  </main>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// State
const theme = ref(localStorage.getItem('theme') || 'system');
const enableAnimations = ref(localStorage.getItem('animations') !== 'false');
const language = ref(localStorage.getItem('app_lang') || 'en');

// --- TRANSLATION DICTIONARY ---
const t = computed(() => {
  if (language.value === 'kh') {
    return {
      title: 'ការកំណត់ប្រព័ន្ធ',
      subtitle: 'កំណត់បរិយាកាសកន្លែងធ្វើការរបស់អ្នក។',
      theme: 'រចនាប័ទ្មចំណុចប្រទាក់',
      light: 'ពន្លឺ',
      dark: 'ងងឹត',
      auto: 'ស្វ័យប្រវត្តិ',
      lang: 'ភាសាបង្ហាញ',
      motion: 'ចំណូលចិត្តចលនា',
      animations: 'ចលនាចំណុចប្រទាក់',
      animationsDesc: 'បើកដំណើរការចលនានិងបែបផែន។',
      back: 'ត្រឡប់ទៅកន្លែងធ្វើការ'
    };
  }
  return {
    title: 'System Preferences',
    subtitle: 'Customize your workspace environment.',
    theme: 'Interface Theme',
    light: 'Light',
    dark: 'Dark',
    auto: 'Auto',
    lang: 'Display Language',
    motion: 'Motion Preferences',
    animations: 'Interface Animations',
    animationsDesc: 'Enable fluid transitions and motion effects.',
    back: 'Return to Workspace'
  };
});

// --- LANGUAGE LOGIC ---
const setLanguage = (newLang) => {
  language.value = newLang;
};

watch(language, (newLang) => {
  localStorage.setItem('app_lang', newLang);
});

// --- THEME LOGIC ---

/**
 * Temporarily injects a global transition on all elements so that
 * background-color / color / border-color cross-fade smoothly when
 * the `dark` class is toggled on <html>.  The transition is removed
 * after it completes so it never interferes with other animations.
 * Pass instant = true on first mount to avoid an unwanted fade-in.
 */
const THEME_TRANSITION_DURATION = 400; // ms — keep in sync with CSS

const enableThemeTransition = () => {
  const style = document.createElement('style');
  style.id = '__theme-transition__';
  style.textContent = `
    *, *::before, *::after {
      transition:
        background-color ${THEME_TRANSITION_DURATION}ms ease,
        color            ${THEME_TRANSITION_DURATION}ms ease,
        border-color     ${THEME_TRANSITION_DURATION}ms ease,
        box-shadow       ${THEME_TRANSITION_DURATION}ms ease,
        fill             ${THEME_TRANSITION_DURATION}ms ease,
        stroke           ${THEME_TRANSITION_DURATION}ms ease !important;
    }
  `;
  document.head.appendChild(style);
};

const disableThemeTransition = () => {
  const style = document.getElementById('__theme-transition__');
  if (style) style.remove();
};

const applyTheme = (instant = false) => {
  if (!instant) {
    enableThemeTransition();
    // Remove the injected style after the transition finishes
    setTimeout(disableThemeTransition, THEME_TRANSITION_DURATION + 50);
  }

  if (
    theme.value === 'dark' ||
    (theme.value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
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

// --- SYSTEM THEME WATCHER ---
// Re-apply when the OS switches light/dark while theme is set to "system"
const systemThemeWatcher = window.matchMedia('(prefers-color-scheme: dark)');
systemThemeWatcher.addEventListener('change', () => {
  if (theme.value === 'system') applyTheme();
});

// --- LIFECYCLE ---
onMounted(() => {
  applyTheme(true); // instant = true → no fade on first load
  applyAnimations();

  if (!localStorage.getItem('duc_teacher_token')) {
    router.push('/login');
  }
});

const goBack = () => {
  router.push('/schedule');
};
</script>

<style>
/* ─── Motion Disabler ─────────────────────────────────────────────────────── */
/* Must stay last so !important wins over the injected theme-transition style */
.disable-animations *,
.disable-animations *::before,
.disable-animations *::after {
  animation: none !important;
  transition: none !important;
}

/* ─── Base Animations ─────────────────────────────────────────────────────── */
.animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
.animate-fade-in    { animation: fadeIn   0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.8); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
}
.animate-float { animation: float 6s ease-in-out infinite; }

@keyframes pulse-slow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50%       { opacity: 0.8; transform: scale(1.05); }
}
.animate-pulse-slow { animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

/* ─── Font Imports ────────────────────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;500;600;700&display=swap');
.font-khmer { font-family: 'Kantumruy Pro', sans-serif; }
</style>