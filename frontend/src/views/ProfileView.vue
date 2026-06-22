<template>
  <div class="w-full h-full relative min-h-screen">
    
    <main class="relative z-10 w-full max-w-[28rem] sm:max-w-xl mx-auto px-4 sm:px-6 pt-6 pb-32 sm:pb-12 flex flex-col items-center">
        
      <div class="w-full flex justify-start mb-6 sm:mb-8 animate-fade-in-up">
        <button @click="goBack" class="group flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 bg-white/60 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 backdrop-blur-xl rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 shadow-sm border border-white/80 dark:border-slate-700/50 hover:scale-105">
          <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
          Return to Workspace
        </button>
      </div>

      <div class="group/card relative w-full bg-white/60 dark:bg-[#0B1120]/80 backdrop-blur-3xl rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_40px_100px_-20px_rgba(99,102,241,0.25)] border border-white dark:border-slate-700/50 flex flex-col items-center px-5 sm:px-8 pb-8 pt-6 sm:pt-8 z-10 transition-all duration-500 animate-fade-in-up overflow-hidden" style="animation-delay: 0.1s;">
        
        <div class="absolute inset-0 z-50 pointer-events-none overflow-hidden rounded-[2.5rem] sm:rounded-[3rem]">
          <div class="absolute top-0 bottom-0 w-[200%] bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent -skew-x-12 translate-x-[-150%] group-hover/card:animate-shimmer-fast"></div>
        </div>

        <div class="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-20 pointer-events-none z-0">
          <img src="../assets/DUC.png" class="w-3/4 h-3/4 object-contain scale-110 drop-shadow-2xl" alt="DUC Watermark" />
        </div>

        <div class="absolute top-[-50%] right-[-20%] w-[120%] h-[150%] bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-indigo-500/30 via-fuchsia-600/30 to-cyan-400/30 opacity-60 mix-blend-screen animate-spin-slow origin-center blur-3xl z-0 pointer-events-none"></div>

        <div class="w-full flex items-center justify-between z-10 mb-6">
          <div class="flex items-center gap-2 sm:gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-3 py-1.5 sm:py-2 rounded-xl border border-white/50 dark:border-slate-700/50 shadow-sm">
             <img src="../assets/DUC.png" class="w-5 h-5 sm:w-6 sm:h-6 object-contain drop-shadow-sm" alt="DUC Logo" />
             <span class="text-[9px] sm:text-[10px] font-black tracking-widest text-slate-800 dark:text-white uppercase letter-spacing-2">Faculty Profile</span>
          </div>
          
          <div class="w-10 h-7 sm:w-12 sm:h-8 rounded-lg border border-emerald-300/50 dark:border-emerald-500/30 bg-gradient-to-br from-emerald-100 to-teal-200 dark:from-emerald-500/20 dark:to-teal-600/10 flex items-center justify-center overflow-hidden relative shadow-[0_0_15px_rgba(16,185,129,0.3)] backdrop-blur-md">
            <div class="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.6)_50%,transparent_75%)] bg-[length:200%_200%] animate-hologram"></div>
            <svg class="w-4 h-4 text-emerald-600 dark:text-emerald-300 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          </div>
        </div>
          
        <div class="relative z-30 mb-5 sm:mb-6 animate-fade-in-up" style="animation-delay: 0.2s;">
           <input type="file" ref="fileInput" @change="handleImageUpload" class="hidden" accept="image/png, image/jpeg, image/jpg, image/webp" />
           
           <div @click="!isUploadingAvatar && (showAvatarMenu = true)" class="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] rounded-full bg-white/40 dark:bg-slate-900/50 backdrop-blur-2xl p-2.5 sm:p-3 shadow-[0_15px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_0_40px_rgba(99,102,241,0.3)] ring-4 ring-white/60 dark:ring-white/10 transition-transform duration-500 hover:-translate-y-2 group cursor-pointer relative">
              
              <div class="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-6 h-6 sm:w-7 sm:h-7 bg-emerald-400 dark:bg-emerald-500 border-[3px] sm:border-4 border-white dark:border-[#0B1120] rounded-full z-40 shadow-lg flex items-center justify-center transition-colors duration-300">
                <div class="absolute inset-0 rounded-full border-2 border-emerald-300 animate-ping opacity-75"></div>
              </div>

              <div class="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center shadow-inner border-2 border-white/80 dark:border-slate-600 overflow-hidden relative">
                
                <img v-if="teacher?.avatarUrl" :src="teacher.avatarUrl" class="w-full h-full object-cover object-center" alt="Profile Image" />
                <img v-else src="../assets/DUC.png" class="w-1/2 h-1/2 object-contain opacity-70 drop-shadow-md scale-110" alt="DUC Logo Placeholder" />
                
                <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                  <div class="flex gap-2 mb-1">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
                  </div>
                  <span class="text-[10px] font-black uppercase tracking-widest text-white mt-1 shadow-sm">Manage</span>
                </div>

                <div v-if="isUploadingAvatar" class="absolute inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-50">
                   <div class="w-8 h-8 border-[3px] sm:border-4 border-indigo-400 border-t-white rounded-full animate-spin"></div>
                </div>
              </div>
           </div>
        </div>

        <div class="text-center mb-8 w-full animate-fade-in-up relative z-20" style="animation-delay: 0.3s;">
          <h2 class="text-3xl sm:text-[2.5rem] font-black font-khmer text-slate-900 dark:text-white leading-tight tracking-tight mb-2 drop-shadow-md">
            {{ teacher?.nameKh }}
          </h2>
          <div class="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50/80 dark:bg-indigo-500/20 border border-indigo-100 dark:border-indigo-500/30 backdrop-blur-md shadow-sm">
            <span class="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
            <p class="text-[10px] sm:text-xs font-black text-indigo-700 dark:text-indigo-300 uppercase tracking-widest">
              {{ teacher?.nameEn || 'Verified Instructor' }}
            </p>
          </div>
        </div>

        <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 relative z-20">
           
           <div class="sm:col-span-2 w-full bg-white/70 dark:bg-slate-800/60 p-4 sm:p-5 rounded-[1.5rem] sm:rounded-[2rem] border border-white dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] flex items-start sm:items-center gap-4 group/panel hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" style="animation-delay: 0.4s;">
             <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 flex items-center justify-center text-white shrink-0 group-hover/panel:scale-110 group-hover/panel:rotate-3 transition-transform duration-300 ring-2 ring-white/50 dark:ring-white/10 mt-1 sm:mt-0">
               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
             </div>
             <div class="text-left flex-grow overflow-hidden">
               <p class="text-[9px] sm:text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Faculty Departments</p>
               
               <div class="flex flex-wrap gap-2">
                 <span 
                   v-for="(dept, idx) in formattedDepartments" 
                   :key="idx" 
                   class="inline-block px-3 py-1.5 bg-fuchsia-900/30 dark:bg-fuchsia-900/40 text-fuchsia-600 dark:text-fuchsia-300 rounded-lg text-xs sm:text-sm font-black font-khmer border border-fuchsia-200 dark:border-fuchsia-700/50 shadow-sm transition-all duration-300 hover:shadow-md"
                 >
                   {{ dept }}
                 </span>
                 <span v-if="!formattedDepartments.length" class="text-sm font-bold text-slate-900 dark:text-white">Not Provided</span>
               </div>
             </div>
           </div>

           <div class="sm:col-span-2 w-full bg-white/70 dark:bg-slate-800/60 p-4 sm:p-5 rounded-[1.5rem] sm:rounded-[2rem] border border-white dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] flex items-center gap-4 group/panel hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" style="animation-delay: 0.45s;">
             <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30 flex items-center justify-center text-white shrink-0 group-hover/panel:scale-110 transition-transform duration-300 ring-2 ring-white/50 dark:ring-white/10">
               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
             </div>
             <div class="text-left flex-grow overflow-hidden">
               <p class="text-[9px] sm:text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">Registered Email</p>
               <p class="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">{{ teacher?.email || 'Not Provided' }}</p>
             </div>
           </div>

           <div class="w-full bg-white/70 dark:bg-slate-800/60 p-4 sm:p-5 rounded-[1.5rem] sm:rounded-[2rem] border border-white dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] flex items-center gap-4 group/panel hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" style="animation-delay: 0.5s;">
             <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 flex items-center justify-center text-white shrink-0 group-hover/panel:scale-110 transition-transform duration-300 ring-2 ring-white/50 dark:ring-white/10">
               <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
             </div>
             <div class="text-left flex-grow overflow-hidden">
               <p class="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Academic Degree</p>
               <p class="text-sm font-bold text-slate-900 dark:text-white truncate font-khmer">{{ teacher?.degree || 'Not Provided' }}</p>
             </div>
           </div>

           <div class="w-full bg-white/70 dark:bg-slate-800/60 p-4 sm:p-5 rounded-[1.5rem] sm:rounded-[2rem] border border-white dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] flex items-center gap-4 group/panel hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" style="animation-delay: 0.55s;">
             <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-600 shadow-lg shadow-fuchsia-500/30 flex items-center justify-center text-white shrink-0 group-hover/panel:scale-110 transition-transform duration-300 ring-2 ring-white/50 dark:ring-white/10">
               <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
             </div>
             <div class="text-left flex-grow overflow-hidden">
               <p class="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Specialization</p>
               <p class="text-sm font-bold text-slate-900 dark:text-white truncate font-khmer">{{ teacher?.major || 'Not Provided' }}</p>
             </div>
           </div>

           <div class="w-full bg-white/70 dark:bg-slate-800/60 p-4 sm:p-5 rounded-[1.5rem] sm:rounded-[2rem] border border-white dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] flex items-center gap-4 group/panel hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" style="animation-delay: 0.6s;">
             <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30 flex items-center justify-center text-white shrink-0 group-hover/panel:scale-110 transition-transform duration-300 ring-2 ring-white/50 dark:ring-white/10">
               <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
             </div>
             <div class="text-left flex-grow overflow-hidden">
               <p class="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Gender</p>
               <p class="text-sm font-bold text-slate-900 dark:text-white truncate font-khmer">{{ teacher?.gender || 'Not Provided' }}</p>
             </div>
           </div>

           <div class="w-full bg-white/70 dark:bg-slate-800/60 p-4 sm:p-5 rounded-[1.5rem] sm:rounded-[2rem] border border-white dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] flex items-center gap-4 group/panel hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" style="animation-delay: 0.65s;">
             <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-500 shadow-lg shadow-cyan-500/30 flex items-center justify-center text-white shrink-0 group-hover/panel:scale-110 transition-transform duration-300 ring-2 ring-white/50 dark:ring-white/10">
               <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
             </div>
             <div class="text-left flex-grow overflow-hidden">
               <p class="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                 Secure PIN <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
               </p>
               <p class="text-sm font-black text-slate-900 dark:text-white font-mono tracking-widest">{{ formatPhone(teacher?.phone) }}</p>
             </div>
           </div>

        </div>

        <button @click="promptLogout" class="relative z-20 w-full py-4 sm:py-5 bg-white/90 dark:bg-slate-800/90 hover:bg-rose-50 dark:hover:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-2xl sm:rounded-[2rem] text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-500/50 shadow-md hover:shadow-lg hover:shadow-rose-500/20 flex justify-center items-center gap-2.5 group/logout animate-fade-in-up" style="animation-delay: 0.7s;">
          <div class="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-rose-100 dark:bg-rose-500/20 group-hover/logout:bg-rose-500 group-hover/logout:text-white text-rose-500 dark:text-rose-400 flex items-center justify-center transition-colors duration-300">
            <svg class="w-3.5 h-3.5 transform group-hover/logout:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          </div>
          Terminate Session
        </button>

      </div>
    </main>

    <transition name="fade-scale">
      <div v-if="showAvatarMenu" class="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md transition-opacity" @click="showAvatarMenu = false"></div>
        
        <div class="relative w-full max-w-xs bg-white dark:bg-[#0A0F1A] rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 z-10 p-5 sm:p-6 flex flex-col gap-2 sm:gap-3 ring-1 ring-black/5 dark:ring-white/5">
          <h3 class="text-center text-[10px] sm:text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Profile Photo</h3>

          <button v-if="teacher?.avatarUrl" @click="viewFullscreenImage" class="group/btn flex items-center gap-3 sm:gap-4 w-full p-3 sm:p-4 rounded-xl sm:rounded-[1.5rem] bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white transition-all duration-300">
            <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover/btn:scale-110 transition-transform">
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </div>
            <span class="text-xs sm:text-sm font-bold">View Picture</span>
          </button>

          <button @click="openAppAvatarsModal" class="group/btn flex items-center gap-3 sm:gap-4 w-full p-3 sm:p-4 rounded-xl sm:rounded-[1.5rem] bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white transition-all duration-300">
            <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover/btn:scale-110 transition-transform">
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <span class="text-xs sm:text-sm font-bold">Choose App Avatar</span>
          </button>

          <button @click="triggerFileInputFromMenu" class="group/btn flex items-center gap-3 sm:gap-4 w-full p-3 sm:p-4 rounded-xl sm:rounded-[1.5rem] bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white transition-all duration-300">
            <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover/btn:scale-110 transition-transform">
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
            </div>
            <span class="text-xs sm:text-sm font-bold">Upload Custom</span>
          </button>

          <button @click="showAvatarMenu = false" class="mt-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 py-2 sm:py-3 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </transition>

    <transition name="fade-scale">
      <div v-if="showAppAvatarsModal" class="fixed inset-0 z-[115] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md transition-opacity" @click="showAppAvatarsModal = false"></div>
        
        <div class="relative w-full max-w-sm bg-white dark:bg-[#0A0F1A] rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 z-10 p-5 sm:p-6 flex flex-col ring-1 ring-black/5 dark:ring-white/5">
          <div class="flex justify-between items-center mb-5 sm:mb-6">
            <h3 class="text-xs sm:text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">Select Avatar</h3>
            <button @click="showAppAvatarsModal = false" class="text-slate-400 hover:text-rose-500 transition-colors">
              <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <div class="grid grid-cols-3 gap-3 sm:gap-4 mb-2 max-h-[50vh] overflow-y-auto pr-2 pb-2">
            <button v-for="(avatar, index) in appAvatars" :key="index" @click="selectAppAvatar(avatar)" class="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-square border-2 border-transparent hover:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 bg-slate-100 dark:bg-slate-800 focus:outline-none">
              <img :src="avatar" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="App Avatar" />
            </button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="showFullscreenImage" class="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/95 dark:bg-black/95 backdrop-blur-xl p-4">
        
        <button @click="showFullscreenImage = false" class="absolute top-6 right-6 sm:top-10 sm:right-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors border border-white/20 z-10 group">
           <svg class="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div class="relative w-full h-[85vh] flex items-center justify-center animate-fade-in-up p-4">
          <img 
            :src="teacher?.avatarUrl" 
            :class="[
              'rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] ring-1 ring-white/10',
              teacher?.avatarUrl?.includes('dicebear') 
                ? 'w-full max-w-[300px] sm:max-w-[400px] aspect-square object-cover bg-slate-100 dark:bg-slate-800' 
                : 'max-w-full max-h-full object-contain'
            ]" 
            alt="Full Profile Image" 
          />
        </div>
        
      </div>
    </transition>

    <transition name="fade-scale">
      <div v-if="customAlert.show" class="fixed inset-0 z-[130] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xl transition-opacity" @click="closeAlert"></div>
        <div class="relative w-full max-w-sm bg-white dark:bg-[#0A0A0A] rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.3)] overflow-hidden border border-slate-200 dark:border-white/10 flex flex-col z-10 p-6 sm:p-8 text-center ring-1 ring-slate-200 dark:ring-white/5">
          <div :class="['absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none', customAlert.type === 'success' ? 'bg-emerald-500/20' : 'bg-rose-500/20']"></div>
          <div :class="['w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full flex items-center justify-center mb-5 sm:mb-6 shadow-2xl relative transition-transform animate-bounce-short', customAlert.type === 'success' ? 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-500/40' : 'bg-gradient-to-br from-rose-400 to-red-500 shadow-rose-500/40']">
            <div class="absolute inset-0 rounded-full border-2 border-white/30 mix-blend-overlay"></div>
            <svg v-if="customAlert.type === 'success'" class="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
            <svg v-else-if="customAlert.type === 'error'" class="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
            <svg v-else class="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          </div>
          <h3 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 font-sans tracking-tight">{{ customAlert.type === 'success' ? 'Success!' : customAlert.type === 'error' ? 'Error Occurred' : 'Sign Out?' }}</h3>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 sm:mb-8 font-khmer">{{ customAlert.message }}</p>
          <div v-if="customAlert.type === 'confirm'" class="flex gap-2 sm:gap-3">
            <button @click="closeAlert" class="flex-1 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300">Cancel</button>
            <button @click="executeConfirm" class="flex-1 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all shadow-lg text-white bg-rose-600 hover:bg-rose-50 hover:shadow-rose-500/25">{{ customAlert.confirmText }}</button>
          </div>
          <button v-else @click="closeAlert" :class="['w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all shadow-lg text-white flex items-center justify-center gap-2 hover:-translate-y-1', customAlert.type === 'success' ? 'bg-slate-900 dark:bg-white dark:text-slate-900 hover:shadow-emerald-500/25 dark:hover:bg-emerald-400' : 'bg-rose-600 hover:shadow-rose-500/25 hover:bg-rose-500']">{{ customAlert.type === 'success' ? 'Awesome' : 'Try Again' }}</button>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const teacher = ref(null);

const fileInput = ref(null);
const isUploadingAvatar = ref(false);
const showAvatarMenu = ref(false);
const showFullscreenImage = ref(false);
const showAppAvatarsModal = ref(false);

const appAvatars = [
  'https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e0e7ff',
  'https://api.dicebear.com/7.x/notionists/svg?seed=Aneka&backgroundColor=dcfce7',
  'https://api.dicebear.com/7.x/notionists/svg?seed=Oliver&backgroundColor=fee2e2',
  'https://api.dicebear.com/7.x/notionists/svg?seed=Luna&backgroundColor=fef3c7',
  'https://api.dicebear.com/7.x/notionists/svg?seed=Jasper&backgroundColor=f3e8ff',
  'https://api.dicebear.com/7.x/notionists/svg?seed=Zoe&backgroundColor=cffafe',
  'https://api.dicebear.com/7.x/notionists/svg?seed=Milo&backgroundColor=ffedd5',
  'https://api.dicebear.com/7.x/notionists/svg?seed=Cleo&backgroundColor=fce7f3',
  'https://api.dicebear.com/7.x/notionists/svg?seed=Leo&e0f2fe'
];

const customAlert = ref({ show: false, type: 'success', message: '', confirmText: 'Confirm', confirmAction: null });
let alertTimeout = null;

// 🔥 COMPUTES MULTIPLE DEPARTMENTS IF SEPARATED BY COMMA
const formattedDepartments = computed(() => {
  if (!teacher.value?.department) return [];
  if (Array.isArray(teacher.value.department)) return teacher.value.department;
  // Splits by comma, removes whitespace, filters out empty strings
  return teacher.value.department.split(',').map(d => d.trim()).filter(d => d);
});

const getInitials = (nameEn, nameKh) => {
  if (nameEn && nameEn !== 'N/A') return nameEn.charAt(0).toUpperCase();
  if (nameKh) return nameKh.charAt(0);
  return '?';
};

const formatPhone = (phone) => {
  if (!phone || phone === 'N/A') return 'NO PIN SET';
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{3,4})$/);
  if (match) return `${match[1]} ${match[2]} ${match[3]}`;
  return phone;
};

const goBack = () => router.push('/schedule');

const viewFullscreenImage = () => {
  showAvatarMenu.value = false;
  showFullscreenImage.value = true;
};

const triggerFileInputFromMenu = () => {
  showAvatarMenu.value = false;
  setTimeout(() => { if (fileInput.value) fileInput.value.click(); }, 300);
};

const openAppAvatarsModal = () => {
  showAvatarMenu.value = false;
  setTimeout(() => { showAppAvatarsModal.value = true; }, 300);
};

const selectAppAvatar = async (url) => {
  showAppAvatarsModal.value = false;
  isUploadingAvatar.value = true;
  
  try {
    const res = await fetch('https://duc-teacher-tracking.onrender.com/api/update-avatar-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nameKh: teacher.value.nameKh,
        phone: teacher.value.phone,
        avatarUrl: url
      })
    });
    
    const data = await res.json();
    
    if (data.success) {
      teacher.value.avatarUrl = url;
      localStorage.setItem('duc_teacher_token', JSON.stringify(teacher.value));
      triggerAlert('success', 'App avatar selected successfully!');
    } else {
      triggerAlert('error', data.message || 'Failed to update avatar.');
    }
  } catch (error) {
    triggerAlert('error', 'Server connection failed.');
  } finally {
    isUploadingAvatar.value = false;
  }
};

const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    triggerAlert('error', 'Image is too large. Please select an image under 5MB.');
    return;
  }

  isUploadingAvatar.value = true;
  const formData = new FormData();
  formData.append('image', file);
  formData.append('nameKh', teacher.value.nameKh);
  formData.append('phone', teacher.value.phone);

  try {
    const res = await fetch('https://duc-teacher-tracking.onrender.com/api/upload-avatar', { method: 'POST', body: formData });
    const data = await res.json();
    if (data.success) {
      teacher.value.avatarUrl = data.imageUrl;
      localStorage.setItem('duc_teacher_token', JSON.stringify(teacher.value));
      triggerAlert('success', 'Profile avatar updated successfully!');
    } else {
      triggerAlert('error', data.message || 'Upload failed.');
    }
  } catch (error) {
    triggerAlert('error', 'Server connection failed. Could not upload image.');
  } finally {
    isUploadingAvatar.value = false;
    event.target.value = ''; 
  }
};

const triggerAlert = (type, message, confirmText = 'Confirm', onConfirm = null) => {
  customAlert.value = { show: true, type, message, confirmText, confirmAction: onConfirm };
  if (type === 'success') { alertTimeout = setTimeout(() => { if (customAlert.value.show) closeAlert(); }, 2500); }
};

const closeAlert = () => {
  customAlert.value.show = false;
  if (alertTimeout) clearTimeout(alertTimeout);
};

const executeConfirm = () => {
  if (customAlert.value.confirmAction) customAlert.value.confirmAction();
  closeAlert();
};

const promptLogout = () => triggerAlert('confirm', 'Are you sure you want to securely terminate this session?', 'Log Out', logout);
const logout = () => { localStorage.removeItem('duc_teacher_token'); router.push('/login'); };

onMounted(() => {
  const theme = localStorage.getItem('theme') || 'system';
  if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  const token = localStorage.getItem('duc_teacher_token');
  if (!token) { router.push('/login'); return; }
  teacher.value = JSON.parse(token);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;500;600;700;900&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@700;800&display=swap');

.font-sans { font-family: 'Inter', sans-serif; }
.font-khmer { font-family: 'Kantumruy Pro', sans-serif; }
.font-mono { font-family: 'JetBrains Mono', monospace; }

.animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pulse-slow { 0%, 100% { opacity: 0.8; transform: scale(1); } 50% { opacity: 0.9; transform: scale(1.05); } }
.animate-pulse-slow { animation: pulse-slow 6s infinite; }
@keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.animate-spin-slow { animation: spin-slow 12s linear infinite; }
@keyframes hologram { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
.animate-hologram { animation: hologram 3s ease infinite; }
@keyframes shimmer { 100% { transform: translateX(100%) skewX(-12deg); } }
.animate-shimmer-fast { animation: shimmer 0.8s ease-out forwards; }
.fade-scale-enter-active, .fade-scale-leave-active { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.fade-scale-enter-from, .fade-scale-leave-to { opacity: 0; transform: scale(0.9) translateY(15px); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
@keyframes bounce-short { 0% { transform: scale(0.8); opacity: 0; } 60% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
.animate-bounce-short { animation: bounce-short 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
</style>