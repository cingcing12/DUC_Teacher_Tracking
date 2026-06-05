<template>
  <div class="min-h-screen bg-[#F4F7FA] dark:bg-[#050B14] font-sans text-slate-900 dark:text-slate-50 selection:bg-indigo-500 selection:text-white relative overflow-x-hidden transition-colors duration-700 flex items-center justify-center py-12">
    
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <div class="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1.5px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1.5px)] [background-size:40px_40px] opacity-[0.15] dark:opacity-[0.03] transition-opacity"></div>
      <div class="absolute top-[5%] right-[15%] w-[45vw] h-[45vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[140px] opacity-50 dark:opacity-20 animate-blob bg-cyan-300 dark:bg-cyan-700 transition-colors duration-700"></div>
      <div class="absolute bottom-[5%] left-[10%] w-[55vw] h-[55vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[160px] opacity-50 dark:opacity-20 animate-blob animation-delay-2000 bg-indigo-300 dark:bg-indigo-800 transition-colors duration-700"></div>
      <div class="absolute top-[40%] left-[40%] w-[30vw] h-[30vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-30 dark:opacity-10 animate-blob animation-delay-4000 bg-purple-300 dark:bg-fuchsia-800 transition-colors duration-700"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(244,247,250,0.85)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,11,20,0.9)_100%)] transition-colors duration-700"></div>
    </div>

    <main class="relative z-10 w-full max-w-md px-4 sm:px-6 animate-fade-in-up">
      
      <div class="flex justify-center mb-8">
        <button @click="goBack" class="group flex items-center gap-3 px-5 py-2.5 bg-white/60 dark:bg-slate-800/40 hover:bg-white dark:bg-slate-800 backdrop-blur-xl rounded-full text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-white/80 dark:border-slate-700/50 hover:scale-105">
          <svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
          Return to Workspace
        </button>
      </div>

      <div class="group/card relative w-full bg-white/40 dark:bg-[#0A0F1A]/60 backdrop-blur-3xl rounded-[3rem] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_80px_-20px_rgba(99,102,241,0.2)] overflow-hidden border border-white dark:border-white/10 flex flex-col z-10 p-3 ring-1 ring-black/5 dark:ring-white/5 transition-all duration-500">
        
        <div class="absolute inset-0 z-50 pointer-events-none overflow-hidden rounded-[3rem]">
          <div class="absolute top-0 bottom-0 w-[200%] bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent -skew-x-12 translate-x-[-150%] group-hover/card:animate-shimmer-fast"></div>
        </div>

        <div class="h-56 relative rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-inner group-hover/card:shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] transition-all duration-500">
          <div class="absolute top-[-50%] right-[-20%] w-[120%] h-[150%] bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-indigo-500 via-fuchsia-600 to-cyan-400 opacity-80 mix-blend-screen animate-spin-slow origin-center blur-2xl"></div>
          <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQPSI4Ij4KPHJlY3Qgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE1KSIvPgo8L3N2Zz4=')] opacity-50 mix-blend-overlay"></div>
          
          <div class="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
            <div class="flex items-center gap-2.5">
               <div class="w-10 h-10 backdrop-blur-md rounded-xl flex items-center justify-center">
                 <img src="../assets/DUC.png" class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477-4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></img>
               </div>
               <span class="text-[10px] font-black tracking-widest text-white/90 uppercase letter-spacing-2">Digital ID</span>
            </div>
            
            <div class="w-10 h-8 rounded-lg border border-white/30 bg-gradient-to-br from-amber-200/40 via-yellow-400/20 to-transparent flex items-center justify-center overflow-hidden relative shadow-[0_0_15px_rgba(251,191,36,0.3)]">
              <div class="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.4)_50%,transparent_75%)] bg-[length:200%_200%] animate-hologram"></div>
              <svg class="w-4 h-4 text-amber-100 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
          </div>
        </div>

        <div class="flex justify-center -mt-24 relative z-20">
           <input type="file" ref="fileInput" @change="handleImageUpload" class="hidden" accept="image/png, image/jpeg, image/jpg, image/webp" />
           
           <div @click="!isUploadingAvatar && (showAvatarMenu = true)" class="w-40 h-40 rounded-[2.5rem] bg-white/40 dark:bg-[#0B1120]/60 backdrop-blur-2xl p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/80 dark:border-white/10 transition-all duration-700 hover:-translate-y-2 relative group cursor-pointer">
              
              <div class="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 border-4 border-white dark:border-[#0B1120] rounded-full z-30 shadow-lg flex items-center justify-center">
                <div class="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-75"></div>
              </div>

              <div class="w-full h-full bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-[2rem] flex items-center justify-center text-6xl font-black text-slate-800 dark:text-white shadow-[inset_0_2px_15px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_2px_20px_rgba(255,255,255,0.05)] border border-white dark:border-slate-700/50 overflow-hidden relative">
                
                <img v-if="teacher?.avatarUrl" :src="teacher.avatarUrl" class="w-full h-full object-cover object-center" alt="Profile Image" />
                <span v-else>{{ getInitials(teacher?.nameEn, teacher?.nameKh) }}</span>
                
                <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                  <div class="flex gap-2 mb-1">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
                  </div>
                  <span class="text-[10px] font-black uppercase tracking-widest text-white mt-1">Manage</span>
                </div>

                <div v-if="isUploadingAvatar" class="absolute inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center">
                   <div class="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                </div>

              </div>
           </div>
        </div>

        <div class="pt-6 pb-5 px-6 text-center flex-grow flex flex-col relative z-20">
           <div class="mb-8">
              <h2 class="text-3xl font-khmer leading-normal py-2 tracking-tight mb-1 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-indigo-100 dark:to-slate-300 drop-shadow-sm">
  {{ teacher?.nameKh }}
</h2>
              <p class="text-xs font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest flex items-center justify-center gap-2 mt-2">
                {{ teacher?.nameEn || 'Faculty Instructor' }}
              </p>
           </div>

           <div class="grid grid-cols-1 gap-3 mb-8">
             <div class="bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 p-5 rounded-[2rem] border border-white dark:border-white/10 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 flex items-center gap-4 group/bento cursor-default">
               <div class="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/20 border border-indigo-100 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 group-hover/bento:scale-110 group-hover/bento:rotate-3 transition-transform duration-300">
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
               </div>
               <div class="text-left flex-grow">
                 <p class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">Faculty Department</p>
                 <p class="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug">{{ teacher?.department }}</p>
               </div>
             </div>
             
             <div class="bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 p-5 rounded-[2rem] border border-white dark:border-white/10 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 flex items-center gap-4 group/bento cursor-default relative overflow-hidden">
               <div class="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent -translate-x-full group-hover/bento:translate-x-full transition-transform duration-1000 ease-in-out"></div>
               
               <div class="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-500/20 border border-cyan-100 dark:border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 group-hover/bento:scale-110 group-hover/bento:-rotate-3 transition-transform duration-300">
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
               </div>
               <div class="text-left flex-grow">
                 <p class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">Secure Comms PIN</p>
                 <p class="text-base font-black text-slate-800 dark:text-white font-mono tracking-widest">{{ formatPhone(teacher?.phone) }}</p>
               </div>
             </div>
           </div>

           <button @click="promptLogout" class="mt-auto w-full py-5 bg-white/80 dark:bg-[#0B1120]/80 hover:bg-rose-500 dark:hover:bg-rose-600 text-rose-600 hover:text-white rounded-[2rem] text-xs font-black uppercase tracking-widest transition-all duration-300 border border-rose-100 dark:border-rose-900/50 shadow-sm hover:shadow-[0_15px_30px_rgba(225,29,72,0.3)] flex justify-center items-center gap-3 group/logout">
             <div class="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-500/20 group-hover/logout:bg-white/20 flex items-center justify-center transition-colors">
               <svg class="w-3 h-3 transform group-hover/logout:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
             </div>
             Terminate Session
           </button>
        </div>
      </div>
    </main>

    <transition name="fade-scale">
      <div v-if="showAvatarMenu" class="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md transition-opacity" @click="showAvatarMenu = false"></div>
        
        <div class="relative w-full max-w-xs bg-white dark:bg-[#0A0F1A] rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 z-10 p-6 flex flex-col gap-3 ring-1 ring-black/5 dark:ring-white/5">
          <h3 class="text-center text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Profile Photo</h3>

          <button v-if="teacher?.avatarUrl" @click="viewFullscreenImage" class="group/btn flex items-center gap-4 w-full p-4 rounded-[1.5rem] bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white transition-all duration-300">
            <div class="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover/btn:scale-110 transition-transform">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </div>
            <span class="text-sm font-bold">View Picture</span>
          </button>

          <button @click="openAppAvatarsModal" class="group/btn flex items-center gap-4 w-full p-4 rounded-[1.5rem] bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white transition-all duration-300">
            <div class="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover/btn:scale-110 transition-transform">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <span class="text-sm font-bold">Choose App Avatar</span>
          </button>

          <button @click="triggerFileInputFromMenu" class="group/btn flex items-center gap-4 w-full p-4 rounded-[1.5rem] bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white transition-all duration-300">
            <div class="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover/btn:scale-110 transition-transform">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
            </div>
            <span class="text-sm font-bold">Upload Custom</span>
          </button>

          <button @click="showAvatarMenu = false" class="mt-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 py-3 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </transition>

    <transition name="fade-scale">
      <div v-if="showAppAvatarsModal" class="fixed inset-0 z-[115] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md transition-opacity" @click="showAppAvatarsModal = false"></div>
        
        <div class="relative w-full max-w-sm bg-white dark:bg-[#0A0F1A] rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 z-10 p-6 flex flex-col ring-1 ring-black/5 dark:ring-white/5">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">Select Avatar</h3>
            <button @click="showAppAvatarsModal = false" class="text-slate-400 hover:text-rose-500 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <div class="grid grid-cols-3 gap-4 mb-2 max-h-[50vh] overflow-y-auto pr-2 pb-2">
            <button v-for="(avatar, index) in appAvatars" :key="index" @click="selectAppAvatar(avatar)" class="group relative rounded-2xl overflow-hidden aspect-square border-2 border-transparent hover:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 bg-slate-100 dark:bg-slate-800 focus:outline-none">
              <img :src="avatar" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="App Avatar" />
            </button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="showFullscreenImage" class="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/95 dark:bg-black/95 backdrop-blur-xl p-4">
        
        <button @click="showFullscreenImage = false" class="absolute top-6 right-6 sm:top-10 sm:right-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors border border-white/20 z-10 group">
           <svg class="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div class="relative w-full h-[85vh] flex items-center justify-center animate-fade-in-up p-4">
          <img 
            :src="teacher?.avatarUrl" 
            :class="[
              'rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] ring-1 ring-white/10',
              teacher?.avatarUrl?.includes('dicebear') 
                ? 'w-full max-w-[400px] aspect-square object-cover bg-slate-100 dark:bg-slate-800' 
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
        <div class="relative w-full max-w-sm bg-white dark:bg-[#0A0A0A] rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.3)] overflow-hidden border border-slate-200 dark:border-white/10 flex flex-col z-10 p-8 text-center ring-1 ring-slate-200 dark:ring-white/5">
          <div :class="['absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none', customAlert.type === 'success' ? 'bg-emerald-500/20' : 'bg-rose-500/20']"></div>
          <div :class="['w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-2xl relative transition-transform animate-bounce-short', customAlert.type === 'success' ? 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-500/40' : 'bg-gradient-to-br from-rose-400 to-red-500 shadow-rose-500/40']">
            <div class="absolute inset-0 rounded-full border-2 border-white/30 mix-blend-overlay"></div>
            <svg v-if="customAlert.type === 'success'" class="w-10 h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
            <svg v-else-if="customAlert.type === 'error'" class="w-10 h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
            <svg v-else class="w-10 h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          </div>
          <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-2 font-sans tracking-tight">{{ customAlert.type === 'success' ? 'Success!' : customAlert.type === 'error' ? 'Error Occurred' : 'Sign Out?' }}</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-8 font-khmer">{{ customAlert.message }}</p>
          <div v-if="customAlert.type === 'confirm'" class="flex gap-3">
            <button @click="closeAlert" class="flex-1 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300">Cancel</button>
            <button @click="executeConfirm" class="flex-1 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg text-white bg-rose-600 hover:bg-rose-500 hover:shadow-rose-500/25">{{ customAlert.confirmText }}</button>
          </div>
          <button v-else @click="closeAlert" :class="['w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-lg text-white flex items-center justify-center gap-2 hover:-translate-y-1', customAlert.type === 'success' ? 'bg-slate-900 dark:bg-white dark:text-slate-900 hover:shadow-emerald-500/25 dark:hover:bg-emerald-400' : 'bg-rose-600 hover:shadow-rose-500/25 hover:bg-rose-500']">{{ customAlert.type === 'success' ? 'Awesome' : 'Try Again' }}</button>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
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
  'https://api.dicebear.com/7.x/notionists/svg?seed=Leo&backgroundColor=e0f2fe'
];

const customAlert = ref({ show: false, type: 'success', message: '', confirmText: 'Confirm', confirmAction: null });
let alertTimeout = null;

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
    const res = await fetch('http://localhost:3000/api/update-avatar-url', {
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
    const res = await fetch('http://localhost:3000/api/upload-avatar', { method: 'POST', body: formData });
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
@import url('https://fonts.googleapis.com/css2?family=Siemreap&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@700;800&display=swap');

.font-sans { font-family: 'Inter', sans-serif; }

/* 2. Updated the font-khmer class to apply Siemreap */
.font-khmer { font-family: 'Siemreap', sans-serif; }

.font-mono { font-family: 'JetBrains Mono', monospace; }
.animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pulse-slow { 0%, 100% { opacity: 0.8; transform: scale(1); } 50% { opacity: 0.9; transform: scale(1.05); } }
.animate-pulse-slow { animation: pulse-slow 6s infinite; }
@keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
.animate-blob { animation: blob 15s infinite alternate; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }
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