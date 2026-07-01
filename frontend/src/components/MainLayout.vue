<template>
  <div class="min-h-screen bg-[#F1F5F9] dark:bg-[#050A15] font-sans text-slate-900 dark:text-slate-50 selection:bg-indigo-500 selection:text-white relative overflow-x-hidden transition-colors duration-700 pb-32 sm:pb-0">
    
    <!-- 🌌 ULTIMATE AMBIENT PHYSICS BACKGROUND -->
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <!-- High-res Noise Texture -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQPSI4Ij4KPHJlY3Qgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPgo8L3N2Zz4=')] opacity-60 mix-blend-overlay z-10"></div>
      
      <!-- Precision Grid -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 transition-opacity duration-700"></div>
      
      <!-- Liquid Ambient Orbs -->
      <div class="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[140px] opacity-40 dark:opacity-20 animate-blob bg-indigo-400 dark:bg-indigo-600 transition-opacity"></div>
      <div class="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[140px] opacity-30 dark:opacity-20 animate-blob animation-delay-2000 bg-fuchsia-300 dark:bg-purple-700 transition-opacity"></div>
      <div class="absolute bottom-[-20%] left-[10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[160px] opacity-40 dark:opacity-10 animate-blob animation-delay-4000 bg-cyan-300 dark:bg-cyan-800 transition-opacity"></div>
    </div>

    <!-- 🔮 VISION-OS DESKTOP NAVIGATION COMMAND CENTER -->
    <nav class="hidden sm:flex fixed top-6 left-0 right-0 z-50 justify-center px-4 animate-fade-in-down pointer-events-none">
      
      <!-- Ambient Outer Glow -->
      <div class="absolute inset-0 max-w-4xl mx-auto rounded-full bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/20 to-cyan-500/20 blur-2xl opacity-0 transition-opacity duration-700 nav-hover-target"></div>

      <!-- Core Glass Structure -->
      <div class="pointer-events-auto relative p-[1.5px] rounded-full bg-gradient-to-r from-white/60 via-white/20 to-white/60 dark:from-indigo-500/50 dark:via-slate-800/50 dark:to-cyan-500/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] w-full max-w-4xl group/nav transition-all duration-700 hover:shadow-[0_40px_80px_-15px_rgba(99,102,241,0.25)] dark:hover:shadow-[0_40px_80px_-15px_rgba(99,102,241,0.4)] hover:-translate-y-1">
        
        <!-- Deep Glass Inner Container -->
        <div class="bg-white/70 dark:bg-[#060B14]/80 backdrop-blur-[40px] rounded-full p-2 flex items-center justify-between w-full h-full relative overflow-visible">
          
          <!-- Logo Section (Holographic Shimmer) -->
          <div class="flex items-center gap-4 pl-4 relative z-10 group/logo cursor-pointer overflow-hidden rounded-full py-1.5 transition-transform hover:scale-[1.02]">
            <div class="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent z-20 pointer-events-none group-hover/logo:animate-[shimmer_1s_infinite]"></div>
            
            <div class="w-10 h-10 rounded-full flex items-center justify-center relative z-10 overflow-hidden">
              <div class="absolute inset-0 bg-indigo-500/30 rounded-full blur-md opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500"></div>
              <img src="../assets/DUC.png" class="w-20 h-20 object-contain relative z-10 group-hover/logo:scale-110 transition-transform duration-500" alt="DUC Logo" />
            </div>
            
            <span :class="['font-black tracking-tight text-sm text-slate-800 dark:text-white hidden md:block relative z-10 drop-shadow-sm transition-all duration-300 group-hover/logo:text-indigo-600 dark:group-hover/logo:text-indigo-400 group-hover:tracking-wide', language === 'kh' ? 'font-khmer font-bold text-[13px]' : '']">
              {{ t.universityName }}
            </span>
          </div>
          
          <!-- Interactive Center Tabs -->
          <div class="flex items-center gap-2 relative z-10 pr-2">
            
            <!-- Floating Pill Container -->
            <div class="flex items-center gap-1.5 bg-slate-400/10 dark:bg-white/5 p-1.5 rounded-full border border-slate-300/40 dark:border-white/10 mr-3 shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)] relative">
              
              <!-- Dynamic Background Slider (Simulated via hover/active classes per button for Vue routing) -->
              
              <!-- Schedule Tab -->
              <button @click="router.push('/schedule')" :class="['relative flex flex-col items-center justify-center px-6 py-2.5 rounded-full transition-all duration-500 group outline-none overflow-hidden', route.path === '/schedule' ? 'text-indigo-600 dark:text-indigo-300' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white', language === 'kh' ? 'font-khmer' : '']">
                <div :class="['absolute inset-0 rounded-full transition-all duration-500 z-0', route.path === '/schedule' ? 'bg-white dark:bg-slate-800 shadow-[0_5px_20px_rgba(99,102,241,0.25)] border border-slate-200/50 dark:border-slate-600/50 opacity-100 scale-100' : 'opacity-0 scale-75 group-hover:scale-100 group-hover:bg-white/40 dark:group-hover:bg-white/5']"></div>
                <span class="relative z-10 text-[10px] font-black uppercase tracking-widest transform transition-transform duration-300 group-active:scale-90">{{ t.schedule }}</span>
                <div :class="['absolute -bottom-1 w-2 h-1 rounded-t-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,1)] transition-all duration-500 ease-out', route.path === '/schedule' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2']"></div>
              </button>

              <!-- Stats Tab -->
              <button @click="router.push('/stats')" :class="['relative flex flex-col items-center justify-center px-6 py-2.5 rounded-full transition-all duration-500 group outline-none overflow-hidden', route.path === '/stats' ? 'text-blue-600 dark:text-blue-300' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white', language === 'kh' ? 'font-khmer' : '']">
                <div :class="['absolute inset-0 rounded-full transition-all duration-500 z-0', route.path === '/stats' ? 'bg-white dark:bg-slate-800 shadow-[0_5px_20px_rgba(59,130,246,0.25)] border border-slate-200/50 dark:border-slate-600/50 opacity-100 scale-100' : 'opacity-0 scale-75 group-hover:scale-100 group-hover:bg-white/40 dark:group-hover:bg-white/5']"></div>
                <span class="relative z-10 text-[10px] font-black uppercase tracking-widest transform transition-transform duration-300 group-active:scale-90">{{ t.stats }}</span>
                <div :class="['absolute -bottom-1 w-2 h-1 rounded-t-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)] transition-all duration-500 ease-out', route.path === '/stats' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2']"></div>
              </button>

              <!-- Support Tab -->
              <button @click="router.push('/support')" :class="['relative flex flex-col items-center justify-center px-6 py-2.5 rounded-full transition-all duration-500 group outline-none overflow-hidden', route.path === '/support' ? 'text-fuchsia-600 dark:text-fuchsia-300' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white', language === 'kh' ? 'font-khmer' : '']">
                <div :class="['absolute inset-0 rounded-full transition-all duration-500 z-0', route.path === '/support' ? 'bg-white dark:bg-slate-800 shadow-[0_5px_20px_rgba(217,70,239,0.25)] border border-slate-200/50 dark:border-slate-600/50 opacity-100 scale-100' : 'opacity-0 scale-75 group-hover:scale-100 group-hover:bg-white/40 dark:group-hover:bg-white/5']"></div>
                <span class="relative z-10 text-[10px] font-black uppercase tracking-widest transform transition-transform duration-300 group-active:scale-90">{{ t.support }}</span>
                <div :class="['absolute -bottom-1 w-2 h-1 rounded-t-full bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,1)] transition-all duration-500 ease-out', route.path === '/support' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2']"></div>
              </button>
            </div>

            <!-- Settings Gear (Liquid Rotate) -->
            <button @click="router.push('/settings')" :class="['relative w-11 h-11 flex items-center justify-center rounded-full transition-all duration-500 border group outline-none overflow-hidden', route.path === '/settings' ? 'bg-white dark:bg-slate-800 border-amber-400 dark:border-amber-500 text-amber-500 dark:text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.4)] scale-110' : 'bg-white/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 text-slate-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 hover:border-amber-300 dark:hover:border-amber-500/50 hover:bg-amber-50/50 dark:hover:bg-slate-800 hover:shadow-[0_10px_20px_rgba(245,158,11,0.15)]']">
              <div v-if="route.path === '/settings'" class="absolute inset-0 bg-gradient-to-br from-amber-300/20 to-orange-500/20 z-0 animate-spin-slow"></div>
              <svg class="w-[18px] h-[18px] relative z-10 transform transition-transform duration-700 ease-out group-hover:rotate-[135deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </button>
            
            <!-- Profile Orb -->
            <button v-if="teacher" @click="router.push('/profile')" :class="['group flex items-center gap-3 pr-5 pl-2 py-2 rounded-full transition-all duration-500 outline-none relative overflow-hidden', route.path === '/profile' ? 'bg-white dark:bg-slate-800 shadow-[0_10px_30px_rgba(16,185,129,0.3)] scale-[1.05] ring-1 ring-emerald-400 dark:ring-emerald-500' : 'bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-[0_10px_25px_rgba(16,185,129,0.15)] hover:border-emerald-200 dark:hover:border-emerald-500/30']">
              <div v-if="route.path === '/profile'" class="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 z-0"></div>
              
              <div class="relative z-10">
                <!-- Orbital Animated Border -->
                <div :class="['w-9 h-9 rounded-full p-[2px] relative z-10 overflow-hidden transition-all duration-500', route.path === '/profile' ? 'bg-gradient-to-tr from-emerald-400 via-white to-cyan-400 shadow-[0_0_20px_rgba(52,211,153,0.8)] animate-[spin_4s_linear_infinite]' : 'bg-gradient-to-tr from-slate-300 to-slate-200 dark:from-slate-600 dark:to-slate-700 group-hover:from-emerald-400 group-hover:to-cyan-400']">
                  <!-- Reverse Spin inner to keep image upright -->
                  <div :class="['w-full h-full rounded-full overflow-hidden', route.path === '/profile' ? 'animate-[spin_4s_linear_infinite_reverse]' : '']">
                    <img v-if="teacher.avatarUrl" :src="teacher.avatarUrl" class="w-full h-full object-cover rounded-full bg-white dark:bg-slate-900 border-[1.5px] border-white dark:border-slate-900" />
                    <div v-else class="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-[10px] font-black text-indigo-700 dark:text-indigo-400 border-[1.5px] border-white dark:border-slate-900">
                      {{ teacher.nameKh.charAt(0) }}
                    </div>
                  </div>
                </div>
              </div>
              <span :class="['text-[11px] font-black tracking-widest uppercase transition-all duration-300 relative z-10', route.path === '/profile' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400', language === 'kh' ? 'font-khmer' : '']">{{ teacher.nameKh.split(' ')[0] }}</span>
            </button>

          </div>
        </div>
      </div>
    </nav>

    <!-- 🏝️ DYNAMIC FLOATING ISLAND (MOBILE NAV) -->
    <div class="sm:hidden fixed bottom-6 left-4 right-4 z-50">
      
      <!-- Outer Glow behind the island -->
      <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/20 to-cyan-500/20 rounded-[2.5rem] blur-xl opacity-50"></div>

      <!-- Glass Capsule -->
      <div class="relative bg-white/75 dark:bg-[#060B14]/85 backdrop-blur-[30px] border border-white/50 dark:border-white/10 rounded-[2.5rem] p-2 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] flex justify-between items-center overflow-hidden">
        
        <!-- SCHEDULE TAB -->
        <button @click="router.push('/schedule')" :class="['group relative flex flex-col items-center justify-center h-14 rounded-3xl transition-all duration-500 outline-none', route.path === '/schedule' ? 'flex-[1.5] bg-indigo-50 dark:bg-indigo-500/15 shadow-[inset_0_0_15px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_0_15px_rgba(99,102,241,0.2)]' : 'flex-1 hover:bg-slate-100/50 dark:hover:bg-white/5']">
          <div :class="['relative z-10 flex items-center justify-center transition-all duration-500', route.path === '/schedule' ? 'text-indigo-600 dark:text-indigo-400 scale-110 -translate-y-1' : 'text-slate-400 dark:text-slate-500 group-active:scale-90']">
            <svg class="w-[22px] h-[22px] drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          <span :class="['absolute bottom-2 text-[8px] font-black uppercase tracking-wider transition-all duration-500', route.path === '/schedule' ? 'opacity-100 text-indigo-600 dark:text-indigo-400 transform-none' : 'opacity-0 translate-y-4 text-slate-400', language === 'kh' ? 'font-khmer text-[9px]' : '']">{{ t.schedule }}</span>
        </button>

        <!-- STATS TAB -->
        <button @click="router.push('/stats')" :class="['group relative flex flex-col items-center justify-center h-14 rounded-3xl transition-all duration-500 outline-none', route.path === '/stats' ? 'flex-[1.5] bg-blue-50 dark:bg-blue-500/15 shadow-[inset_0_0_15px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_0_15px_rgba(59,130,246,0.2)]' : 'flex-1 hover:bg-slate-100/50 dark:hover:bg-white/5']">
          <div :class="['relative z-10 flex items-center justify-center transition-all duration-500', route.path === '/stats' ? 'text-blue-600 dark:text-blue-400 scale-110 -translate-y-1' : 'text-slate-400 dark:text-slate-500 group-active:scale-90']">
            <svg class="w-[22px] h-[22px] drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          <span :class="['absolute bottom-2 text-[8px] font-black uppercase tracking-wider transition-all duration-500', route.path === '/stats' ? 'opacity-100 text-blue-600 dark:text-blue-400 transform-none' : 'opacity-0 translate-y-4 text-slate-400', language === 'kh' ? 'font-khmer text-[9px]' : '']">{{ t.stats }}</span>
        </button>

        <!-- SUPPORT TAB -->
        <button @click="router.push('/support')" :class="['group relative flex flex-col items-center justify-center h-14 rounded-3xl transition-all duration-500 outline-none', route.path === '/support' ? 'flex-[1.5] bg-fuchsia-50 dark:bg-fuchsia-500/15 shadow-[inset_0_0_15px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_0_15px_rgba(217,70,239,0.2)]' : 'flex-1 hover:bg-slate-100/50 dark:hover:bg-white/5']">
          <div :class="['relative z-10 flex items-center justify-center transition-all duration-500', route.path === '/support' ? 'text-fuchsia-600 dark:text-fuchsia-400 scale-110 -translate-y-1' : 'text-slate-400 dark:text-slate-500 group-active:scale-90']">
            <svg class="w-[22px] h-[22px] drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          </div>
          <span :class="['absolute bottom-2 text-[8px] font-black uppercase tracking-wider transition-all duration-500', route.path === '/support' ? 'opacity-100 text-fuchsia-600 dark:text-fuchsia-400 transform-none' : 'opacity-0 translate-y-4 text-slate-400', language === 'kh' ? 'font-khmer text-[9px]' : '']">{{ t.support }}</span>
        </button>

        <!-- SETTINGS TAB -->
        <button @click="router.push('/settings')" :class="['group relative flex flex-col items-center justify-center h-14 rounded-3xl transition-all duration-500 outline-none', route.path === '/settings' ? 'flex-[1.5] bg-amber-50 dark:bg-amber-500/15 shadow-[inset_0_0_15px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_0_15px_rgba(245,158,11,0.2)]' : 'flex-1 hover:bg-slate-100/50 dark:hover:bg-white/5']">
          <div :class="['relative z-10 flex items-center justify-center transition-all duration-500', route.path === '/settings' ? 'text-amber-500 dark:text-amber-400 scale-110 -translate-y-1' : 'text-slate-400 dark:text-slate-500 group-active:scale-90']">
            <svg class="w-[22px] h-[22px] drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </div>
          <span :class="['absolute bottom-2 text-[8px] font-black uppercase tracking-wider transition-all duration-500', route.path === '/settings' ? 'opacity-100 text-amber-500 dark:text-amber-400 transform-none' : 'opacity-0 translate-y-4 text-slate-400', language === 'kh' ? 'font-khmer text-[9px]' : '']">{{ t.settings }}</span>
        </button>

        <!-- PROFILE TAB -->
        <button @click="router.push('/profile')" :class="['group relative flex flex-col items-center justify-center h-14 rounded-3xl transition-all duration-500 outline-none', route.path === '/profile' ? 'flex-[1.5] bg-emerald-50 dark:bg-emerald-500/15 shadow-[inset_0_0_15px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_0_15px_rgba(16,185,129,0.2)]' : 'flex-1 hover:bg-slate-100/50 dark:hover:bg-white/5']">
          <div :class="['relative z-10 flex items-center justify-center transition-all duration-500', route.path === '/profile' ? 'text-emerald-500 dark:text-emerald-400 scale-110 -translate-y-1' : 'text-slate-400 dark:text-slate-500 group-active:scale-90']">
            <svg class="w-[22px] h-[22px] drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </div>
          <span :class="['absolute bottom-2 text-[8px] font-black uppercase tracking-wider transition-all duration-500', route.path === '/profile' ? 'opacity-100 text-emerald-500 dark:text-emerald-400 transform-none' : 'opacity-0 translate-y-4 text-slate-400', language === 'kh' ? 'font-khmer text-[9px]' : '']">{{ t.profile }}</span>
        </button>

      </div>
    </div>

    <!-- MAIN CONTENT SLOT -->
    <div class="w-full h-full pt-6 sm:pt-32">
      <slot />
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const teacher = ref(null);

// --- LANGUAGE STATE & DICTIONARY ---
const language = ref(localStorage.getItem('app_lang') || 'en');

// 1. Cross-tab sync
window.addEventListener('storage', (e) => {
  if (e.key === 'app_lang') {
    language.value = e.newValue || 'en';
  }
});

// 2. Same-tab sync (Instant Update!)
const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
  originalSetItem.apply(this, arguments);
  if (key === 'app_lang') {
    window.dispatchEvent(new CustomEvent('local-lang-change', { detail: value }));
  }
};

window.addEventListener('local-lang-change', (e) => {
  language.value = e.detail;
});

// --- PROFILE INSTANT SYNC ---
window.addEventListener('local-teacher-change', (e) => {
  if (e.detail) {
    teacher.value = JSON.parse(e.detail);
  }
});

const t = computed(() => {
  if (language.value === 'kh') {
    return {
      universityName: 'សាកលវិទ្យាល័យឌីជីថលកម្ពុជា',
      schedule: 'កាលវិភាគ',
      stats: 'ស្ថិតិ',
      support: 'ជំនួយ',
      settings: 'ការកំណត់',
      profile: 'ប្រវត្តិរូប'
    };
  }
  return {
    universityName: 'Digital University Of Cambodia',
    schedule: 'Schedule',
    stats: 'Stats',
    support: 'Support',
    settings: 'Settings',
    profile: 'Profile'
  };
});

onMounted(() => {
  const token = localStorage.getItem('duc_teacher_token');
  if (token) {
    teacher.value = JSON.parse(token);
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;500;600;700;900&family=Inter:wght@400;500;600;700;800;900&display=swap');
.font-khmer { font-family: 'Kantumruy Pro', sans-serif; }

/* Ultra-Premium Ambient Physics */
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(40px, -60px) scale(1.15); }
  66% { transform: translate(-30px, 30px) scale(0.85); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob { animation: blob 15s infinite alternate ease-in-out; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

/* Micro-interactions */
@keyframes shimmer { 100% { transform: translateX(100%); } }
.nav-hover-target { pointer-events: none; }
.group\/nav:hover .nav-hover-target { opacity: 1; }

.animate-fade-in-down {
  animation: fadeInDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulse-slow {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}
.animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
</style>