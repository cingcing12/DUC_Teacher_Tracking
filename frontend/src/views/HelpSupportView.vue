<template>
  <div class="w-full h-full relative">
    
    <main class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-2 pb-24 sm:pb-12">
      
      <button @click="router.push('/schedule')" class="group flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 sm:mb-8 transition-colors w-max animate-fade-in-up">
        <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
          <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
        </div>
        Go Back to Schedule
      </button>

      <div class="mb-8 sm:mb-10 animate-fade-in-up" style="animation-delay: 0.1s;">
        <p class="text-indigo-500 font-black tracking-widest uppercase text-[9px] sm:text-[10px] mb-1.5 sm:mb-2 flex items-center gap-2">
          <span class="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
          Digital Faculty Workspace
        </p>
        <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-none mb-3 sm:mb-4">Help & Support</h1>
        <p class="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl">Need assistance with your schedule or tracking? Find answers below or contact the administration team directly.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-12 animate-fade-in-up" style="animation-delay: 0.2s;">
        
        <a href="https://t.me/Vongsokpheak" target="_blank" class="group bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-5 sm:p-6 rounded-2xl sm:rounded-[2rem] border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-500/30 transition-all duration-300 flex items-center gap-4 sm:gap-5">
          <div class="w-12 h-12 sm:w-14 sm:h-14 shrink-0 bg-[#0088cc]/10 text-[#0088cc] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
          </div>
          <div>
            <p class="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5 sm:mb-1">Fastest Response</p>
            <h3 class="text-base sm:text-lg font-black text-slate-800 dark:text-white">Admin Telegram</h3>
          </div>
        </a>

        <a href="tel:+85512345678" class="group bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-5 sm:p-6 rounded-2xl sm:rounded-[2rem] border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-500/30 transition-all duration-300 flex items-center gap-4 sm:gap-5">
          <div class="w-12 h-12 sm:w-14 sm:h-14 shrink-0 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
          </div>
          <div>
            <p class="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5 sm:mb-1">Academic Office</p>
            <h3 class="text-base sm:text-lg font-black text-slate-800 dark:text-white font-mono">+855 10 769 128</h3>
          </div>
        </a>

      </div>

      <div class="bg-white/60 dark:bg-slate-800/40 backdrop-blur-2xl rounded-2xl sm:rounded-[2.5rem] shadow-sm border border-slate-200/50 dark:border-slate-700/50 overflow-hidden animate-fade-in-up" style="animation-delay: 0.3s;">
        <div class="p-5 sm:p-8 border-b border-slate-100 dark:border-slate-700/50 bg-white/40 dark:bg-slate-900/40">
          <h2 class="text-xl sm:text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2 sm:gap-3">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-fuchsia-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Frequently Asked Questions
          </h2>
        </div>
        
        <div class="divide-y divide-slate-100 dark:divide-slate-700/50">
          <div v-for="(faq, index) in faqs" :key="index" class="p-5 sm:p-8 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
            <h3 class="text-base sm:text-lg font-black text-slate-900 dark:text-white mb-2 sm:mb-3">{{ faq.question }}</h3>
            <p class="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-khmer leading-relaxed">{{ faq.answer }}</p>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const faqs = [
  {
    question: "How do I edit or delete a lesson I already tracked?",
    answer: "Go to your 'Schedule' page, find the class you want to edit, and click 'View History'. From there, you will see a list of all your tracked lessons with Edit (✏️) and Delete (🗑️) buttons next to them."
  },
  {
    question: "What if I forgot to track my class on the actual day?",
    answer: "No problem! You can click 'Track' on your schedule, and manually change the 'Date' in the form to the day you actually taught the class."
  },
  {
    question: "Why is one of my classes missing from the schedule?",
    answer: "The schedule is synced directly from the University's Master Database. If a class is missing, please contact the Academic Office via Telegram so they can assign the class to your name."
  },
  {
    question: "The app is showing a 'Connection Lost' error. What should I do?",
    answer: "This usually happens if your internet connection drops or if Google Sheets is updating. Check your Wi-Fi, wait 10 seconds, and click the 'Try Again' button."
  }
];

onMounted(() => {
  const theme = localStorage.getItem('theme') || 'system';
  if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Siemreap&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@700;800&display=swap');

.font-sans { font-family: 'Inter', sans-serif; }
.font-khmer { font-family: 'Siemreap', sans-serif; }
.font-mono { font-family: 'JetBrains Mono', monospace; }

.animate-fade-in-up { animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>