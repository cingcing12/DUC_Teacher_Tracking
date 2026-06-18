<template>
  <div class="min-h-screen bg-[#F1F5F9] dark:bg-[#0B1120] font-sans text-slate-900 dark:text-slate-50 selection:bg-indigo-500 selection:text-white relative overflow-x-hidden transition-colors duration-500 pb-24 sm:pb-0">
    
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <div class="absolute inset-0 bg-[radial-gradient(#94A3B8_1px,transparent_1.5px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1.5px)] [background-size:32px_32px] opacity-[0.12] dark:opacity-[0.05] transition-opacity"></div>
      <div class="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-50 dark:opacity-20 animate-blob bg-indigo-300 dark:bg-indigo-600 transition-opacity"></div>
      <div class="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-40 dark:opacity-20 animate-blob animation-delay-2000 bg-fuchsia-200 dark:bg-purple-700 transition-opacity"></div>
      <div class="absolute bottom-[-20%] left-[10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[140px] opacity-50 dark:opacity-20 animate-blob animation-delay-4000 bg-cyan-200 dark:bg-cyan-800 transition-opacity"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(241,245,249,0.9)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,17,32,0.9)_100%)] transition-colors duration-500"></div>
    </div>
<!-- 🔥 ULTIMATE VISION-OS DESKTOP NAVIGATION BAR -->
    <nav class="hidden sm:flex fixed top-6 left-0 right-0 z-50 justify-center px-4 animate-fade-in-down pointer-events-none">
      
      <!-- Gradient Border Wrapper -->
      <div class="pointer-events-auto relative p-[1px] rounded-full bg-gradient-to-r from-indigo-500/20 via-white/40 to-cyan-500/20 dark:from-indigo-500/40 dark:via-slate-700/50 dark:to-cyan-500/40 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] transition-all duration-500 hover:shadow-[0_25px_60px_-10px_rgba(99,102,241,0.2)] w-full max-w-4xl group/nav">
        
        <!-- Deep Glass Inner Container -->
        <div class="bg-white/80 dark:bg-[#0A0F1A]/90 backdrop-blur-3xl rounded-full p-1.5 flex items-center justify-between w-full h-full relative overflow-visible">
          
          <!-- Logo Section (With Shimmer Effect) -->
          <div class="flex items-center gap-3 pl-4 relative z-10 group/logo cursor-pointer overflow-hidden rounded-full py-1">
            <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent z-20 pointer-events-none group-hover/logo:animate-[shimmer_1s_infinite]"></div>
            <div class="w-9 h-9 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-full flex items-center justify-center shadow-inner border border-slate-700 dark:border-slate-600 relative z-10">
              <div class="absolute inset-0 bg-indigo-500/20 rounded-full blur-md opacity-0 group-hover/logo:opacity-100 transition-opacity"></div>
              <img src="../assets/DUC.png" class="w-[22px] h-[22px] object-contain relative z-10" alt="DUC Logo" />
            </div>
            <span class="font-black tracking-tight text-sm text-slate-800 dark:text-white hidden md:block relative z-10 drop-shadow-sm group-hover/logo:text-indigo-600 dark:group-hover/logo:text-indigo-400 transition-colors">Digital University Of Cambodia</span>
          </div>
          
          <!-- Tabs & Actions -->
          <div class="flex items-center gap-2 relative z-10 pr-1.5">
            
            <!-- Central Tabs Container -->
            <div class="flex items-center gap-1 bg-slate-400/10 dark:bg-white/5 p-1 rounded-full border border-slate-300/30 dark:border-white/5 mr-2 shadow-inner">
              
              <!-- Schedule Tab (Indigo) -->
              <button 
                @click="router.push('/schedule')" 
                :class="['relative flex flex-col items-center justify-center px-5 py-2 rounded-full transition-all duration-500 group outline-none', route.path === '/schedule' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white']"
              >
                <!-- 3D Background Pill -->
                <div :class="['absolute inset-0 rounded-full transition-all duration-500 z-0', route.path === '/schedule' ? 'bg-white dark:bg-slate-800 shadow-[0_4px_15px_rgba(99,102,241,0.2)] dark:shadow-[0_4px_15px_rgba(99,102,241,0.4)] border border-slate-200/50 dark:border-slate-700 opacity-100 scale-100' : 'opacity-0 scale-90 group-hover:scale-100 group-hover:bg-white/50 dark:group-hover:bg-white/5 border border-transparent']"></div>
                <!-- Text -->
                <span class="relative z-10 text-[10px] font-black uppercase tracking-widest transform transition-transform duration-300 group-active:scale-95">Schedule</span>
                <!-- Neon Glowing Dot -->
                <div :class="['absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.9)] transition-all duration-500 ease-out', route.path === '/schedule' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 scale-0']"></div>
              </button>

              <!-- Stats Tab (Blue) -->
              <button 
                @click="router.push('/stats')" 
                :class="['relative flex flex-col items-center justify-center px-5 py-2 rounded-full transition-all duration-500 group outline-none', route.path === '/stats' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white']"
              >
                <div :class="['absolute inset-0 rounded-full transition-all duration-500 z-0', route.path === '/stats' ? 'bg-white dark:bg-slate-800 shadow-[0_4px_15px_rgba(59,130,246,0.2)] dark:shadow-[0_4px_15px_rgba(59,130,246,0.4)] border border-slate-200/50 dark:border-slate-700 opacity-100 scale-100' : 'opacity-0 scale-90 group-hover:scale-100 group-hover:bg-white/50 dark:group-hover:bg-white/5 border border-transparent']"></div>
                <span class="relative z-10 text-[10px] font-black uppercase tracking-widest transform transition-transform duration-300 group-active:scale-95">Stats</span>
                <div :class="['absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.9)] transition-all duration-500 ease-out', route.path === '/stats' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 scale-0']"></div>
              </button>

              <!-- Support Tab (Fuchsia) -->
              <button 
                @click="router.push('/support')" 
                :class="['relative flex flex-col items-center justify-center px-5 py-2 rounded-full transition-all duration-500 group outline-none', route.path === '/support' ? 'text-fuchsia-600 dark:text-fuchsia-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white']"
              >
                <div :class="['absolute inset-0 rounded-full transition-all duration-500 z-0', route.path === '/support' ? 'bg-white dark:bg-slate-800 shadow-[0_4px_15px_rgba(217,70,239,0.2)] dark:shadow-[0_4px_15px_rgba(217,70,239,0.4)] border border-slate-200/50 dark:border-slate-700 opacity-100 scale-100' : 'opacity-0 scale-90 group-hover:scale-100 group-hover:bg-white/50 dark:group-hover:bg-white/5 border border-transparent']"></div>
                <span class="relative z-10 text-[10px] font-black uppercase tracking-widest transform transition-transform duration-300 group-active:scale-95">Support</span>
                <div :class="['absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,0.9)] transition-all duration-500 ease-out', route.path === '/support' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 scale-0']"></div>
              </button>

            </div>

            <!-- Settings Button (Amber Glow) -->
            <button @click="router.push('/settings')" :class="['relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-500 border group outline-none', route.path === '/settings' ? 'bg-white dark:bg-slate-800 border-amber-300 dark:border-amber-500 text-amber-500 dark:text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)] scale-105' : 'bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/50 text-slate-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 hover:border-amber-200 dark:hover:border-amber-500/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-[0_0_15px_rgba(245,158,11,0.1)]']">
              <!-- Interactive Rotating Gear -->
              <svg class="w-4 h-4 transform transition-transform duration-700 ease-out group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </button>
            
            <!-- Profile Pill (Emerald Energy) -->
            <button v-if="teacher" @click="router.push('/profile')" :class="['group flex items-center gap-2.5 pr-4 pl-1.5 py-1.5 rounded-full transition-all duration-500 border outline-none', route.path === '/profile' ? 'bg-white dark:bg-slate-800 border-emerald-300 dark:border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.25)] scale-105' : 'bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/50 hover:border-emerald-300 dark:hover:border-emerald-500/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]']">
              <div class="relative">
                <!-- Glowing Pulsing Ring -->
                <div :class="['w-8 h-8 rounded-full p-[2px] relative z-10 overflow-hidden transition-all duration-500', route.path === '/profile' ? 'bg-gradient-to-tr from-emerald-400 to-cyan-400 shadow-[0_0_15px_rgba(52,211,153,0.6)] animate-pulse-slow' : 'bg-gradient-to-tr from-slate-300 to-slate-200 dark:from-slate-600 dark:to-slate-700 group-hover:from-emerald-400 group-hover:to-cyan-400']">
                  <img v-if="teacher.avatarUrl" :src="teacher.avatarUrl" class="w-full h-full object-cover rounded-full bg-white dark:bg-slate-900 border border-white dark:border-slate-800" />
                  <div v-else class="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-[10px] font-black text-indigo-700 dark:text-indigo-400 border border-white dark:border-slate-800">
                    {{ teacher.nameKh.charAt(0) }}
                  </div>
                </div>
              </div>
              <span :class="['text-[11px] font-black tracking-widest uppercase transition-colors duration-300', route.path === '/profile' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400']">{{ teacher.nameKh.split(' ')[0] }}</span>
            </button>

          </div>
        </div>
      </div>
    </nav>

    <!-- 🔥 PREMIUM MOBILE NAVIGATION DOCK -->
    <div class="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-2xl border-t border-slate-200/50 dark:border-white/5 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
      <div class="flex justify-between items-center px-1">
        
        <!-- SCHEDULE TAB -->
        <button @click="router.push('/schedule')" class="group relative flex flex-col items-center justify-center flex-1 h-[4.5rem] outline-none">
          <!-- Active Top Line Indicator -->
          <div :class="['absolute top-0 w-8 h-[3px] rounded-b-full transition-all duration-500 ease-out', route.path === '/schedule' ? 'bg-indigo-500 shadow-[0_2px_10px_rgba(99,102,241,0.8)] opacity-100' : 'bg-transparent opacity-0 scale-x-0']"></div>
          <!-- Glow Halo -->
          <div :class="['absolute top-2 w-10 h-10 rounded-full transition-all duration-500 blur-md', route.path === '/schedule' ? 'bg-indigo-500/20 dark:bg-indigo-500/30 opacity-100' : 'opacity-0 scale-50']"></div>
          <!-- Icon -->
          <div :class="['relative z-10 transition-all duration-500', route.path === '/schedule' ? 'text-indigo-600 dark:text-indigo-400 -translate-y-1 drop-shadow-md' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 group-active:scale-90']">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          <!-- Text -->
          <span :class="['relative z-10 text-[9px] font-black uppercase tracking-wider transition-all duration-500', route.path === '/schedule' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500']">Schedule</span>
        </button>

        <!-- STATS TAB -->
        <button @click="router.push('/stats')" class="group relative flex flex-col items-center justify-center flex-1 h-[4.5rem] outline-none">
          <div :class="['absolute top-0 w-8 h-[3px] rounded-b-full transition-all duration-500 ease-out', route.path === '/stats' ? 'bg-blue-500 shadow-[0_2px_10px_rgba(59,130,246,0.8)] opacity-100' : 'bg-transparent opacity-0 scale-x-0']"></div>
          <div :class="['absolute top-2 w-10 h-10 rounded-full transition-all duration-500 blur-md', route.path === '/stats' ? 'bg-blue-500/20 dark:bg-blue-500/30 opacity-100' : 'opacity-0 scale-50']"></div>
          <div :class="['relative z-10 transition-all duration-500', route.path === '/stats' ? 'text-blue-600 dark:text-blue-400 -translate-y-1 drop-shadow-md' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 group-active:scale-90']">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          <span :class="['relative z-10 text-[9px] font-black uppercase tracking-wider transition-all duration-500', route.path === '/stats' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500']">Stats</span>
        </button>

        <!-- SUPPORT TAB -->
        <button @click="router.push('/support')" class="group relative flex flex-col items-center justify-center flex-1 h-[4.5rem] outline-none">
          <div :class="['absolute top-0 w-8 h-[3px] rounded-b-full transition-all duration-500 ease-out', route.path === '/support' ? 'bg-fuchsia-500 shadow-[0_2px_10px_rgba(217,70,239,0.8)] opacity-100' : 'bg-transparent opacity-0 scale-x-0']"></div>
          <div :class="['absolute top-2 w-10 h-10 rounded-full transition-all duration-500 blur-md', route.path === '/support' ? 'bg-fuchsia-500/20 dark:bg-fuchsia-500/30 opacity-100' : 'opacity-0 scale-50']"></div>
          <div :class="['relative z-10 transition-all duration-500', route.path === '/support' ? 'text-fuchsia-600 dark:text-fuchsia-400 -translate-y-1 drop-shadow-md' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 group-active:scale-90']">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          </div>
          <span :class="['relative z-10 text-[9px] font-black uppercase tracking-wider transition-all duration-500', route.path === '/support' ? 'text-fuchsia-600 dark:text-fuchsia-400' : 'text-slate-400 dark:text-slate-500']">Support</span>
        </button>

        <!-- SETTINGS TAB -->
        <button @click="router.push('/settings')" class="group relative flex flex-col items-center justify-center flex-1 h-[4.5rem] outline-none">
          <div :class="['absolute top-0 w-8 h-[3px] rounded-b-full transition-all duration-500 ease-out', route.path === '/settings' ? 'bg-amber-500 shadow-[0_2px_10px_rgba(245,158,11,0.8)] opacity-100' : 'bg-transparent opacity-0 scale-x-0']"></div>
          <div :class="['absolute top-2 w-10 h-10 rounded-full transition-all duration-500 blur-md', route.path === '/settings' ? 'bg-amber-500/20 dark:bg-amber-500/30 opacity-100' : 'opacity-0 scale-50']"></div>
          <div :class="['relative z-10 transition-all duration-500', route.path === '/settings' ? 'text-amber-500 dark:text-amber-400 -translate-y-1 drop-shadow-md' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 group-active:scale-90']">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </div>
          <span :class="['relative z-10 text-[9px] font-black uppercase tracking-wider transition-all duration-500', route.path === '/settings' ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 dark:text-slate-500']">Settings</span>
        </button>

        <!-- PROFILE TAB -->
        <button @click="router.push('/profile')" class="group relative flex flex-col items-center justify-center flex-1 h-[4.5rem] outline-none">
          <div :class="['absolute top-0 w-8 h-[3px] rounded-b-full transition-all duration-500 ease-out', route.path === '/profile' ? 'bg-emerald-500 shadow-[0_2px_10px_rgba(16,185,129,0.8)] opacity-100' : 'bg-transparent opacity-0 scale-x-0']"></div>
          <div :class="['absolute top-2 w-10 h-10 rounded-full transition-all duration-500 blur-md', route.path === '/profile' ? 'bg-emerald-500/20 dark:bg-emerald-500/30 opacity-100' : 'opacity-0 scale-50']"></div>
          <div :class="['relative z-10 transition-all duration-500', route.path === '/profile' ? 'text-emerald-500 dark:text-emerald-400 -translate-y-1 drop-shadow-md' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 group-active:scale-90']">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </div>
          <span :class="['relative z-10 text-[9px] font-black uppercase tracking-wider transition-all duration-500', route.path === '/profile' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500']">Profile</span>
        </button>

      </div>
    </div>

    <div class="w-full h-full pt-6 sm:pt-24">
      <slot />
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const teacher = ref(null);

onMounted(() => {
  const token = localStorage.getItem('duc_teacher_token');
  if (token) {
    teacher.value = JSON.parse(token);
  }
});
</script>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob { animation: blob 15s infinite alternate; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }
</style>