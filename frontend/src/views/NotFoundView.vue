<template>
  <div class="min-h-screen bg-[#F4F7FA] dark:bg-[#0B1120] font-sans flex items-center justify-center relative overflow-hidden selection:bg-indigo-500 selection:text-white p-6 transition-colors duration-500">
    
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <div class="absolute inset-0 bg-[radial-gradient(#94A3B8_1px,transparent_1.5px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1.5px)] [background-size:32px_32px] opacity-[0.12] dark:opacity-[0.05] transition-opacity"></div>
      <div class="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-40 dark:opacity-20 animate-blob bg-rose-300 dark:bg-rose-800 transition-opacity"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-40 dark:opacity-20 animate-blob animation-delay-4000 bg-indigo-300 dark:bg-indigo-800 transition-opacity"></div>
    </div>

    <div class="w-full max-w-lg relative z-10 animate-fade-in-up">
      <div class="bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-black/50 border border-white dark:border-white/5 p-10 sm:p-14 text-center relative overflow-hidden flex flex-col items-center">
        
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative w-full flex justify-center mb-6">
          <h1 class="text-8xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-rose-500 drop-shadow-sm animate-bounce-slow">
            404
          </h1>
        </div>

        <h2 :class="['text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight mb-3 relative z-10', language === 'kh' ? 'font-khmer' : '']">
          {{ t.title }}
        </h2>
        
        <p :class="['text-slate-500 dark:text-slate-400 font-medium mb-10 relative z-10 text-sm sm:text-base leading-relaxed', language === 'kh' ? 'font-khmer' : '']">
          {{ t.desc }}
        </p>

        <button @click="goHome" :class="['w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-sm font-black tracking-widest uppercase transition-all flex items-center justify-center gap-3 group hover:shadow-xl hover:shadow-indigo-500/20 dark:hover:shadow-white/10 hover:-translate-y-1 relative z-10', language === 'kh' ? 'font-khmer' : '']">
          <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          {{ t.button }}
        </button>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// --- LANGUAGE STATE & DICTIONARY ---
const language = ref(localStorage.getItem('app_lang') || 'en');

window.addEventListener('storage', (e) => {
  if (e.key === 'app_lang') {
    language.value = e.newValue || 'en';
  }
});

const t = computed(() => {
  if (language.value === 'kh') {
    return {
      title: 'មិនរកឃើញទំព័រ',
      desc: 'អូ! ទំព័រដែលអ្នកកំពុងស្វែងរកមិនមានទេ។ វាអាចត្រូវបានផ្លាស់ទី លុបចេញ ឬមិនដែលមាននៅឡើយ។',
      button: 'ត្រឡប់ទៅសុវត្ថិភាពវិញ'
    };
  }
  return {
    title: 'Digital Void Discovered',
    desc: 'Oops! The page you are looking for has drifted out of bounds. It might have been moved, deleted, or never existed at all.',
    button: 'Return to Safety'
  };
});

// Theme setup remains consistent
onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'system';
  if (savedTheme === 'dark' || (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

const goHome = () => {
  if (localStorage.getItem('duc_admin_token')) {
    router.push('/admin');
  } else if (localStorage.getItem('duc_teacher_token')) {
    router.push('/schedule');
  } else {
    router.push('/login');
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;500;600;700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

.font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
.font-khmer { font-family: 'Kantumruy Pro', sans-serif; }

.animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob { animation: blob 15s infinite alternate; }
.animation-delay-4000 { animation-delay: 4s; }

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}
.animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
</style>