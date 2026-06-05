<template>
  <div class="min-h-screen bg-[#F1F5F9] dark:bg-[#0B1120] font-sans text-slate-900 dark:text-slate-50 selection:bg-indigo-500 selection:text-white relative overflow-x-hidden transition-colors duration-500">
    
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <div class="absolute inset-0 bg-[radial-gradient(#94A3B8_1px,transparent_1.5px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1.5px)] [background-size:32px_32px] opacity-[0.12] dark:opacity-[0.05] transition-opacity"></div>
      <div class="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-50 dark:opacity-20 animate-blob bg-indigo-300 dark:bg-indigo-600 transition-opacity"></div>
      <div class="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-40 dark:opacity-20 animate-blob animation-delay-2000 bg-fuchsia-200 dark:bg-purple-700 transition-opacity"></div>
      <div class="absolute bottom-[-20%] left-[10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[140px] opacity-50 dark:opacity-20 animate-blob animation-delay-4000 bg-cyan-200 dark:bg-cyan-800 transition-opacity"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(241,245,249,0.9)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,17,32,0.9)_100%)] transition-colors duration-500"></div>
    </div>

    <nav class="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 animate-fade-in-down">
      <div class="bg-white/60 dark:bg-slate-900/60 hover:bg-white/80 dark:hover:bg-slate-900/80 backdrop-blur-3xl border border-white/80 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-full p-1.5 flex items-center justify-between w-full max-w-4xl relative overflow-hidden transition-all duration-500">
        <div class="flex items-center gap-3 pl-4 relative z-10">
          <div class="w-9 h-9 from-slate-900 via-slate-800 to-slate-900 dark:from-indigo-600 dark:to-cyan-500 rounded-full flex items-center justify-center shadow-sm  border-slate-700 dark:border-transparent">
            <img src="../assets/DUC.png" class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477-4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></img>
          </div>
          <span class="font-black tracking-tight text-sm text-slate-800 dark:text-white bg-clip-text hidden sm:block">Digital Faculty Workspace</span>
        </div>
        <div class="flex items-center gap-2 relative z-10 pr-1.5">
          <button @click="router.push('/settings')" class="w-9 h-9 flex items-center justify-center bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 rounded-full transition-all shadow-sm border border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </button>
          
          <button v-if="teacher" @click="goToProfile" class="group flex items-center gap-2 pr-3 pl-1.5 py-1.5 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 rounded-full transition-all shadow-sm border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-500">
            <div class="relative">
              <div class="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1.5px] relative z-10 overflow-hidden">
                <img v-if="teacher.avatarUrl" :src="teacher.avatarUrl" class="w-full h-full object-cover rounded-full" />
                <div v-else class="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-[10px] font-black text-indigo-700 dark:text-indigo-400">
                  {{ getInitials(teacher.nameEn, teacher.nameKh) }}
                </div>
              </div>
            </div>
            <span class="text-xs font-bold text-slate-600 dark:text-slate-300">{{ teacher.nameKh.split(' ')[0] }}</span>
          </button>
        </div>
      </div>
    </nav>

    <main class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-36 pb-32">
      
      <div v-if="teacher" class="mb-12 animate-fade-in-up" style="animation-delay: 0.1s;">
        <p class="text-indigo-500 font-black tracking-widest uppercase text-[10px] mb-2 flex items-center gap-2">
          <span class="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
          Academic Timetable
        </p>
        <h1 class="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-none">Your Schedule</h1>
      </div>

      <div v-if="isLoading" class="relative mt-8">
        <div class="absolute left-[27px] sm:left-[35px] top-6 bottom-10 w-[3px] bg-slate-200/50 dark:bg-slate-700/50 z-0 rounded-full overflow-hidden"></div>

        <div class="space-y-16">
          <div v-for="i in 2" :key="`skeleton-day-${i}`" class="relative">
            <div class="sticky top-[96px] z-30 py-4 flex items-center gap-6 mb-6">
              <div class="relative flex items-center justify-center w-10 h-10 shrink-0">
                <div class="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse border-[5px] border-white dark:border-[#0B1120] shadow-sm z-10"></div>
              </div>
              <div class="h-7 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
            </div>

            <div class="flex flex-col gap-6 pl-12 sm:pl-16 relative z-10">
              <div v-for="j in 2" :key="`skeleton-card-${j}`" class="relative rounded-3xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-slate-200/40 dark:border-slate-700/40 overflow-hidden flex flex-col sm:flex-row shadow-sm">
                
                <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 dark:via-white/5 to-transparent z-20 pointer-events-none"></div>

                <div class="sm:w-48 shrink-0 bg-slate-50/50 dark:bg-slate-800/50 p-6 flex flex-row sm:flex-col items-center sm:items-start sm:justify-center border-b sm:border-b-0 sm:border-r border-slate-100/50 dark:border-slate-700/50 gap-4 sm:gap-3">
                  <div class="hidden sm:block h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
                  <div class="h-8 w-24 bg-slate-300 dark:bg-slate-600 rounded-lg animate-pulse"></div>
                  <div class="hidden sm:block h-5 w-5 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse my-1"></div>
                  <div class="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
                </div>

                <div class="flex-grow p-6 sm:p-8 flex flex-col relative z-10 justify-between">
                  <div>
                    <div class="flex flex-wrap items-center gap-2 mb-6">
                      <div class="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
                      <div class="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
                      <div class="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
                    </div>
                    <div class="h-8 w-3/4 bg-slate-300 dark:bg-slate-600 rounded-lg animate-pulse mb-3"></div>
                    <div class="h-8 w-1/2 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse mb-8"></div>
                  </div>
                  
                  <div class="flex flex-wrap items-center gap-3 pt-5 border-t border-slate-100 dark:border-slate-700/50">
                    <div class="h-10 w-28 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"></div>
                    <div class="h-10 w-32 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="hasError" class="relative mt-8 animate-fade-in-up">
        <div class="flex flex-col items-center justify-center py-20 px-6 text-center rounded-3xl bg-white/60 dark:bg-slate-800/40 backdrop-blur-xl border border-red-200/60 dark:border-red-900/30 shadow-sm relative overflow-hidden">
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-red-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div class="w-24 h-24 mb-6 rounded-2xl bg-gradient-to-br from-red-50 to-white dark:from-red-900/40 dark:to-slate-900 flex items-center justify-center border border-red-100 dark:border-red-800/50 shadow-sm -rotate-3 relative z-10">
            <svg class="w-10 h-10 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"></path></svg>
          </div>
          <h3 class="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-3 relative z-10">Connection Lost</h3>
          <p class="text-slate-500 dark:text-slate-400 max-w-sm mb-8 relative z-10">We couldn't reach the server. Please check your internet connection and try again.</p>
          
          <button @click="refreshTeacherData" class="px-6 py-3 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl font-bold transition-all border border-red-200 dark:border-red-500/30 shadow-sm flex items-center gap-2 relative z-10 group">
            <svg class="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            Try Again
          </button>
        </div>
      </div>

      <div v-else-if="Object.keys(groupedSchedule).length === 0" class="relative mt-8 animate-fade-in-up">
        <div class="flex flex-col items-center justify-center py-20 px-6 text-center rounded-3xl bg-white/60 dark:bg-slate-800/40 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/50 shadow-sm relative overflow-hidden">
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div class="w-24 h-24 mb-6 rounded-2xl bg-gradient-to-br from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm rotate-3 relative z-10">
            <svg class="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          <h3 class="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-3 relative z-10">Clear Schedule</h3>
          <p class="text-slate-500 dark:text-slate-400 max-w-sm mb-8 relative z-10">You don't have any classes assigned for this semester yet. Enjoy your free time!</p>
          <button @click="refreshTeacherData" class="px-6 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-bold transition-all border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-2 relative z-10 group">
            <svg class="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            Reload Data
          </button>
        </div>
      </div>

      <div v-else class="relative mt-8">
        <div class="absolute left-[27px] sm:left-[35px] top-6 bottom-10 w-[3px] bg-slate-200/50 dark:bg-slate-700/50 z-0 rounded-full overflow-hidden">
          <div class="w-full h-1/3 bg-gradient-to-b from-transparent via-indigo-500 to-transparent animate-data-flow"></div>
        </div>

        <div class="space-y-16">
          <div v-for="(classes, day, index) in groupedSchedule" :key="day" class="relative animate-fade-in-up" :style="`animation-delay: ${0.15 * index}s;`">
            
            <div class="sticky top-[96px] z-30 py-4 flex items-center gap-6 mb-6 backdrop-blur-2xl bg-[#F1F5F9]/80 dark:bg-[#0B1120]/80 -ml-4 pl-4 rounded-r-3xl">
              <div class="relative flex items-center justify-center w-10 h-10 shrink-0">
                <div class="absolute inset-0 bg-indigo-400 rounded-full animate-ping opacity-30"></div>
                <div class="w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-[5px] border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.6)] z-10"></div>
              </div>
              <h3 class="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase">{{ day }}</h3>
            </div>

            <div class="flex flex-col gap-6 pl-12 sm:pl-16 relative z-10">
              
              <div v-for="cls in classes" :key="cls.time + cls.room" class="group relative rounded-3xl bg-white/80 dark:bg-slate-800/60 backdrop-blur-xl shadow-sm border border-slate-200/60 dark:border-slate-700/50 hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all duration-300 overflow-hidden flex flex-col sm:flex-row">
                
                <div class="sm:w-48 shrink-0 bg-slate-50 dark:bg-slate-800/80 p-6 flex flex-row sm:flex-col items-center sm:items-start sm:justify-center border-b sm:border-b-0 sm:border-r border-slate-100 dark:border-slate-700/50 relative overflow-hidden gap-4 sm:gap-1">
                  <div class="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                  
                  <div class="hidden sm:block">
                    <p class="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Timeblock</p>
                  </div>
                  
                  <template v-if="cls.time && cls.time.includes('-')">
                    <p class="text-2xl sm:text-3xl font-black tracking-tighter text-slate-900 dark:text-white font-mono leading-none">{{ cls.time.split('-')[0].trim() }}</p>
                    <div class="text-slate-300 dark:text-slate-600 sm:my-1 opacity-70">
                      <svg class="w-5 h-5 -rotate-90 sm:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                    </div>
                    <p class="text-xl sm:text-2xl font-black tracking-tighter text-slate-500 dark:text-slate-400 font-mono leading-none">{{ cls.time.split('-')[1].trim() }}</p>
                  </template>
                  <template v-else>
                    <p class="text-3xl font-black tracking-tighter text-slate-900 dark:text-white font-mono">{{ cls.time }}</p>
                  </template>
                </div>

                <div class="flex-grow p-6 sm:p-8 flex flex-col relative z-10 justify-between">
                  
                  <div>
                    <div class="flex flex-wrap items-center gap-2 mb-5">
                      <div class="flex items-center gap-1.5 px-3 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-[11px] font-black font-mono uppercase tracking-wider shadow-sm">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        {{ cls.room }}
                      </div>

                      <div v-if="cls.department && cls.department !== '?'" class="flex items-center px-2.5 py-1 bg-fuchsia-50 dark:bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 rounded-lg text-[10px] font-black font-khmer uppercase tracking-widest border border-fuchsia-100 dark:border-fuchsia-500/20 truncate max-w-[200px]" :title="cls.department">
                        {{ cls.department }}
                      </div>

                      <div v-if="extractGen(cls.group)" class="flex items-center px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg text-[10px] font-black font-khmer uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20">
                        ជំនាន់ទី {{ extractGen(cls.group) }}
                      </div>
                      
                      <div v-if="cls.year && cls.year !== '?'" class="flex items-center px-2.5 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-[10px] font-black font-khmer uppercase tracking-widest border border-blue-100 dark:border-blue-500/20">
                        ឆ្នាំទី {{ cls.year }}
                      </div>

                      <div v-if="cls.semester && cls.semester !== '?'" class="flex items-center px-2.5 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg text-[10px] font-black font-khmer uppercase tracking-widest border border-amber-100 dark:border-amber-500/20">
                        ឆមាសទី {{ cls.semester }}
                      </div>
                    </div>

                    <h4 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-khmer leading-tight mb-8">{{ cls.subject }}</h4>
                  </div>
                  
                  <div class="flex flex-wrap items-center gap-3 pt-5 border-t border-slate-100 dark:border-slate-700/50">
                    <button @click="openTrackingForm(cls)" class="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-500/10 px-4 py-2.5 rounded-xl text-xs font-bold text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition-all duration-300 cursor-pointer w-max hover:-translate-y-0.5 group/btn">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
                      Track: {{ cls.group }}
                    </button>

                    <button @click="openHistoryView(cls)" class="flex items-center gap-2 bg-white dark:bg-slate-800 shadow-sm px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 cursor-pointer w-max hover:-translate-y-0.5 group/btn2">
                      <svg class="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      View History
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onActivated } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const teacher = ref(null);
const mySchedule = ref([]);
const isLoading = ref(true);
const hasError = ref(false);

const goToProfile = () => {
  router.push('/profile');
};

const openTrackingForm = (cls) => {
  router.push({
    path: '/tracking',
    query: {
      subject: cls.subject, 
      group: cls.group, 
      room: cls.room, 
      time: cls.time, 
      day: cls.day,
      year: cls.year,
      semester: cls.semester,
      department: cls.department
    }
  });
};

const extractGen = (groupName) => {
  if (!groupName) return '';
  const match = groupName.match(/G(\d+)/i);
  return match ? match[1] : '';
};

const openHistoryView = (cls) => {
  const teacherName = teacher.value?.nameKh || '';
  const cleanTeacherName = teacherName.replace(/លោកគ្រូ|អ្នកគ្រូ/g, '').trim();
  const exactFullTabName = `${cls.group}-${cleanTeacherName}-${cls.subject}`.substring(0, 100);

  router.push({
    path: '/history',
    query: {
      group: exactFullTabName, 
      subject: cls.subject
    }
  });
};

const getInitials = (nameEn, nameKh) => {
  if (nameEn && nameEn !== 'N/A') return nameEn.charAt(0).toUpperCase();
  if (nameKh) return nameKh.charAt(0);
  return '?';
};

const refreshTeacherData = async () => {
  const token = localStorage.getItem('duc_teacher_token');
  if (token) teacher.value = JSON.parse(token);
  
  if (teacher.value) {
    isLoading.value = true;
    hasError.value = false;
    
    try {
      const res = await fetch(`http://localhost:3000/api/my-schedule?name=${encodeURIComponent(teacher.value.nameKh)}`);
      
      if (!res.ok) throw new Error('Network response was not ok');
      
      const data = await res.json();
      if (data.success) {
        mySchedule.value = data.data;
      } else {
        throw new Error('API returned unsuccessful response');
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      hasError.value = true;
    } finally {
      isLoading.value = false;
    }
  }
};

onActivated(() => {
  refreshTeacherData();
});

onMounted(() => {
  const theme = localStorage.getItem('theme') || 'system';
  if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  const token = localStorage.getItem('duc_teacher_token');
  if (!token) {
    router.push('/login');
    return;
  }
  
  refreshTeacherData();
});

const groupedSchedule = computed(() => {
  const groups = {};
  const validClasses = mySchedule.value.filter(cls => {
    return (cls.subject && cls.subject.trim() !== '') || (cls.time && cls.time.trim() !== '');
  });

  validClasses.forEach(cls => {
    if (!groups[cls.day]) groups[cls.day] = [];
    groups[cls.day].push(cls);
  });

  Object.keys(groups).forEach(day => {
    groups[day].sort((a, b) => {
      const getHour = (t) => t ? parseInt(t.match(/(\d+):/)?.[1] || 99) : 99;
      return getHour(a.time) - getHour(b.time);
    });
  });

  return groups;
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Siemreap&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@700;800&display=swap');

.font-sans { font-family: 'Inter', sans-serif; }
.font-khmer { font-family: 'Siemreap', sans-serif; }
.font-mono { font-family: 'JetBrains Mono', monospace; }

@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob { animation: blob 15s infinite alternate; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

@keyframes dataFlow {
  0% { transform: translateY(-100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(300%); opacity: 0; }
}
.animate-data-flow { animation: dataFlow 3s ease-in-out infinite; }

.animate-fade-in-down { animation: fadeInDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
.animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shimmer {
  100% { transform: translateX(100%); }
}
</style>