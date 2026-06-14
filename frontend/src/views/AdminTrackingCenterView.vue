<template>
  <div class="min-h-screen font-sans selection:bg-indigo-500 selection:text-white relative overflow-x-hidden transition-colors duration-700 pb-32 bg-[#F4F7FA] dark:bg-[#0B1120] text-slate-800 dark:text-slate-100">
    
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#eef2ff] via-[#f8fafc] to-[#e0f2fe] dark:from-[#0B1120] dark:via-[#0f172a] dark:to-[#1e1b4b]">
      <div class="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-50 dark:opacity-20 animate-blob bg-cyan-100 dark:bg-cyan-900/40 transition-colors duration-700"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[140px] opacity-50 dark:opacity-20 animate-blob animation-delay-2000 bg-indigo-100 dark:bg-indigo-900/40 transition-colors duration-700"></div>
      <div class="absolute top-[30%] left-[20%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-40 dark:opacity-20 animate-blob animation-delay-4000 bg-emerald-100 dark:bg-emerald-900/40 transition-colors duration-700"></div>
    </div>

    <main class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-12 animate-fade-in-up">
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-4">
        <div>
          <button @click="router.push('/admin')" class="group flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-4 transition-colors w-max">
            <div class="w-8 h-8 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
            </div>
            Return to Dashboard
          </button>
        </div>
      </div>

      <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white dark:border-white/5 flex flex-col h-[750px] relative overflow-hidden isolate max-w-4xl mx-auto w-full">
        
        <div class="p-6 sm:p-8 pb-6 border-b border-slate-100/50 dark:border-slate-700/50 relative z-10 flex flex-col gap-4 bg-white/40 dark:bg-slate-900/40">
          
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 class="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-100 dark:border-emerald-500/20 shadow-sm shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </div>
              Master Tracking Directory
            </h2>
          </div>
          
          <div class="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 font-khmer mt-2">
            <button @click="navigateLevel(0)" :class="['hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors', trackingLevel === 0 ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-lg' : '']">All Generations</button>
            <template v-if="trackingLevel >= 1"><span class="opacity-50">/</span><button @click="navigateLevel(1)" :class="['hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors', trackingLevel === 1 ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-lg' : '']">{{ selectedGen }}</button></template>
            <template v-if="trackingLevel >= 2"><span class="opacity-50">/</span><button @click="navigateLevel(2)" :class="['hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors', trackingLevel === 2 ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-lg' : '']">ឆ្នាំទី {{ selectedYear }}</button></template>
            <template v-if="trackingLevel >= 3"><span class="opacity-50">/</span><button @click="navigateLevel(3)" :class="['hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors', trackingLevel === 3 ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-lg' : '']">ឆមាសទី {{ selectedSem }}</button></template>
            <template v-if="trackingLevel >= 4"><span class="opacity-50">/</span><button @click="navigateLevel(4)" :class="['hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors', trackingLevel === 4 ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-lg' : '']" class="max-w-[150px] truncate" :title="selectedDept">{{ selectedDept }}</button></template>
            <template v-if="trackingLevel >= 5"><span class="opacity-50">/</span><button @click="navigateLevel(5)" :class="['hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors', trackingLevel === 5 ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-lg font-mono' : 'font-mono']">{{ selectedClass }}</button></template>
          </div>
        </div>

        <div class="p-8 flex-grow overflow-y-auto custom-scrollbar relative z-10">
          
          <div v-if="isFetchingDirectory" class="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
             <div class="w-10 h-10 border-4 border-emerald-100 dark:border-emerald-900 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
             <p class="text-xs font-black uppercase tracking-widest animate-pulse">Scanning Master Sheet...</p>
          </div>

          <transition name="tab-fade" mode="out-in">
            
            <div v-if="trackingLevel === 0 && !isFetchingDirectory" key="lvl0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <button v-for="gen in availableGenerations" :key="gen" @click="selectGen(gen)" class="group text-left bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div class="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-full group-hover:scale-150 transition-transform duration-500 -z-10"></div>
                <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-4">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                </div>
                <h3 class="text-2xl font-black text-slate-800 dark:text-white font-khmer">{{ gen }}</h3>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center justify-between">
                  View Years
                  <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </p>
              </button>
            </div>

            <div v-else-if="trackingLevel === 1 && !isFetchingDirectory" key="lvl1" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <button v-for="year in availableYears" :key="year" @click="selectYear(year)" class="group text-left bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div class="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full group-hover:scale-150 transition-transform duration-500 -z-10"></div>
                <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-4">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <h3 class="text-2xl font-black text-slate-800 dark:text-white font-khmer">ឆ្នាំទី {{ year }}</h3>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center justify-between">
                  View Semesters
                  <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </p>
              </button>
            </div>

            <div v-else-if="trackingLevel === 2 && !isFetchingDirectory" key="lvl2" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <button v-for="sem in availableSemesters" :key="sem" @click="selectSem(sem)" class="group text-left bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div class="absolute -right-4 -top-4 w-24 h-24 bg-amber-50 dark:bg-amber-900/20 rounded-full group-hover:scale-150 transition-transform duration-500 -z-10"></div>
                <div class="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mb-4">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 class="text-2xl font-black text-slate-800 dark:text-white font-khmer">ឆមាសទី {{ sem }}</h3>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center justify-between">
                  View Departments
                  <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </p>
              </button>
            </div>

            <div v-else-if="trackingLevel === 3 && !isFetchingDirectory" key="lvl3" class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button v-for="dept in availableDepartments" :key="dept" @click="selectDept(dept)" class="group text-left bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-5">
                <div class="w-14 h-14 shrink-0 bg-fuchsia-50 dark:bg-fuchsia-900/30 text-fuchsia-600 dark:text-fuchsia-400 rounded-2xl flex items-center justify-center shadow-inner">
                  <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                <div class="flex-grow pr-4">
                  <h3 class="text-lg font-black text-slate-800 dark:text-white font-khmer leading-snug group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors">{{ dept }}</h3>
                  <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">View Classes →</p>
                </div>
              </button>
            </div>

            <div v-else-if="trackingLevel === 4 && !isFetchingDirectory" key="lvl4" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <button v-for="cls in availableClasses" :key="cls.name" @click="selectClass(cls.name)" class="group text-left bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div class="absolute -right-4 -top-4 w-24 h-24 bg-violet-50 dark:bg-violet-900/20 rounded-full group-hover:scale-150 transition-transform duration-500 -z-10"></div>
                <div class="w-12 h-12 bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 rounded-2xl flex items-center justify-center mb-4">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                <h3 class="text-2xl font-black text-slate-800 dark:text-white font-mono mb-1">{{ cls.name }}</h3>
                <p class="text-xs font-bold font-khmer text-slate-500 dark:text-slate-400 line-clamp-1 mb-4">{{ cls.major }}</p>
                <p class="text-[10px] font-black text-violet-500 dark:text-violet-400 uppercase tracking-widest flex items-center justify-between">
                  {{ cls.count }} Assigned Teacher{{ cls.count > 1 ? 's' : '' }}
                  <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </p>
              </button>
            </div>

            <div v-else-if="trackingLevel === 5 && !isFetchingDirectory" key="lvl5" class="space-y-4">
              <div v-for="teacherItem in availableTeachers" :key="teacherItem.teacher + teacherItem.subject" class="bg-white dark:bg-slate-900/60 p-5 sm:p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
                
                <div class="flex items-start gap-4 flex-grow">
                  <div class="relative shrink-0 v-avatar">
                    <img 
                      v-if="teacherItem.avatarUrl" 
                      :src="teacherItem.avatarUrl" 
                      :alt="teacherItem.teacher"
                      class="w-14 h-14 rounded-full object-cover shadow-inner ring-4 ring-emerald-50 dark:ring-emerald-950/50"
                    />
                    <div 
                      v-else 
                      class="w-14 h-14 rounded-full flex items-center justify-center font-black shadow-inner text-xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 fallback-initials"
                    >
                      {{ getInitials(teacherItem.teacher) }}
                    </div>
                  </div>

                  <div class="flex-grow">
                    <p class="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-1">Instructor</p>
                    <h4 class="text-lg font-black font-khmer text-slate-800 dark:text-white leading-none mb-1.5">{{ teacherItem.teacher }}</h4>
                    <p class="text-sm font-bold text-slate-600 dark:text-slate-300 font-khmer">{{ teacherItem.subject }}</p>
                    
                    <div class="flex flex-wrap items-center gap-2 mt-3">
                      <div v-if="teacherItem.department && teacherItem.department !== 'Unknown'" class="flex items-center gap-1.5 px-2.5 py-1 bg-fuchsia-50 dark:bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 rounded-lg text-[10px] font-black font-khmer uppercase tracking-widest border border-fuchsia-100 dark:border-fuchsia-500/20 shadow-sm truncate max-w-[200px]" :title="teacherItem.department">
                        <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        {{ teacherItem.department }}
                      </div>

                      <div v-if="teacherItem.year && teacherItem.year !== '?'" class="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-[10px] font-black font-khmer uppercase tracking-widest border border-blue-100 dark:border-blue-500/20 shadow-sm shrink-0">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        ឆ្នាំទី {{ teacherItem.year }}
                      </div>

                      <div v-if="teacherItem.semester && teacherItem.semester !== '?'" class="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg text-[10px] font-black font-khmer uppercase tracking-widest border border-amber-100 dark:border-amber-500/20 shadow-sm shrink-0">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        ឆមាសទី {{ teacherItem.semester }}
                      </div>
                    </div>

                  </div>
                </div>

                <div class="flex flex-col sm:flex-row items-center gap-4 border-t border-slate-100 dark:border-slate-700/50 md:border-none pt-4 md:pt-0 shrink-0">
                  <div class="bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl text-center md:text-right border border-slate-200 dark:border-slate-700 shadow-sm w-full md:w-auto">
                    <p class="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Sheet Row Id</p>
                    <p class="font-mono font-black text-slate-700 dark:text-slate-300 text-[10px] sm:text-xs truncate max-w-[150px] sm:max-w-[200px]" :title="teacherItem.tab">{{ teacherItem.tab }}</p>
                  </div>

                  <button @click="navigateToHistory(teacherItem)" class="w-full md:w-auto px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 hover:-translate-y-0.5">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    View Class Log
                  </button>
                </div>
                
              </div>
            </div>
          </transition>
        </div>
      </div>

    </main>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// --- DIRECTORY TRACKING STATE ---
const trackingDirectory = ref([]);
const isFetchingDirectory = ref(true);

const trackingLevel = ref(0); 
const selectedGen = ref('');
const selectedYear = ref('');
const selectedSem = ref('');
const selectedDept = ref('');
const selectedClass = ref('');

// --- SMART COHORT EXTRACTOR ---
const getCohortName = (item) => {
  // 🔥 FIX: Added '0-9' so numbers at the end of groups are NOT chopped off!
  const match = item.tab.match(/^(G\d+-[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)?)/i);
  if (match) return match[1].toUpperCase(); 
  return item.tab; 
};

// --- COMPUTED: HIERARCHICAL DIRECTORY ---

// LEVEL 0: Generations
const availableGenerations = computed(() => {
  const gens = new Set(trackingDirectory.value.map(item => item.generation));
  return Array.from(gens).sort();
});

// LEVEL 1: Years
const availableYears = computed(() => {
  const items = trackingDirectory.value.filter(i => i.generation === selectedGen.value);
  const years = new Set(items.map(i => i.year || '?'));
  return Array.from(years).sort();
});

// LEVEL 2: Semesters
const availableSemesters = computed(() => {
  const items = trackingDirectory.value.filter(i => 
    i.generation === selectedGen.value && 
    (i.year || '?') === selectedYear.value
  );
  const sems = new Set(items.map(i => i.semester || '?'));
  return Array.from(sems).sort();
});

// LEVEL 3: Departments
const availableDepartments = computed(() => {
  const items = trackingDirectory.value.filter(i => 
    i.generation === selectedGen.value && 
    (i.year || '?') === selectedYear.value && 
    (i.semester || '?') === selectedSem.value
  );
  const depts = new Set(items.map(i => i.department));
  return Array.from(depts).sort();
});

// LEVEL 4: Classes
const availableClasses = computed(() => {
  const items = trackingDirectory.value.filter(i => 
    i.generation === selectedGen.value && 
    (i.year || '?') === selectedYear.value && 
    (i.semester || '?') === selectedSem.value && 
    i.department === selectedDept.value
  );
  const classMap = {};
  
  items.forEach(i => {
    const cohortName = getCohortName(i);
    if (!classMap[cohortName]) {
      classMap[cohortName] = { name: cohortName, major: i.major, count: 0 };
    }
    classMap[cohortName].count++;
  });
  
  return Object.values(classMap).sort((a, b) => a.name.localeCompare(b.name));
});

// LEVEL 5: Teachers
const availableTeachers = computed(() => {
  return trackingDirectory.value.filter(i => {
    const cohortName = getCohortName(i);
    return i.generation === selectedGen.value && 
           (i.year || '?') === selectedYear.value &&
           (i.semester || '?') === selectedSem.value &&
           i.department === selectedDept.value &&
           cohortName === selectedClass.value;
  });
});

// --- METHODS ---
const getInitials = (name) => {
  if (!name || name === 'Unknown Teacher') return '?';
  const cleanName = name.replace('លោកគ្រូ', '').replace('អ្នកគ្រូ', '').trim();
  const parts = cleanName.split(' ');
  if (parts.length > 1) {
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }
  return cleanName.charAt(0).toUpperCase();
};

onMounted(async () => {
  const savedTheme = localStorage.getItem('theme') || 'system';
  if (savedTheme === 'dark' || (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else { document.documentElement.classList.remove('dark'); }

  if (localStorage.getItem('animations') === 'false') { document.documentElement.classList.add('disable-animations'); }

  isFetchingDirectory.value = true;
  try {
    const res = await fetch('https://duc-teacher-tracking.onrender.com/api/tracking-directory');
    const data = await res.json();
    if (data.success) trackingDirectory.value = data.data;
  } catch (err) {
    console.error('Failed to load tracking directory from server.');
  } finally {
    isFetchingDirectory.value = false;
  }
});

const selectGen = (gen) => { selectedGen.value = gen; trackingLevel.value = 1; };
const selectYear = (year) => { selectedYear.value = year; trackingLevel.value = 2; };
const selectSem = (sem) => { selectedSem.value = sem; trackingLevel.value = 3; };
const selectDept = (dept) => { selectedDept.value = dept; trackingLevel.value = 4; };
const selectClass = (clsName) => { selectedClass.value = clsName; trackingLevel.value = 5; };

const navigateLevel = (level) => {
  trackingLevel.value = level;
  if (level === 0) { selectedGen.value = ''; selectedYear.value = ''; selectedSem.value = ''; selectedDept.value = ''; selectedClass.value = ''; }
  if (level === 1) { selectedYear.value = ''; selectedSem.value = ''; selectedDept.value = ''; selectedClass.value = ''; }
  if (level === 2) { selectedSem.value = ''; selectedDept.value = ''; selectedClass.value = ''; }
  if (level === 3) { selectedDept.value = ''; selectedClass.value = ''; }
  if (level === 4) { selectedClass.value = ''; }
};

const navigateToHistory = (teacherNode) => {
  router.push({
    path: '/history',
    query: { 
      group: teacherNode.tab, 
      subject: teacherNode.subject,
      admin: 'true',
      year: teacherNode.year,
      semester: teacherNode.semester,
      department: teacherNode.department,
      teacher: teacherNode.teacher 
    }
  });
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@700;800&display=swap');

html.disable-animations *, html.disable-animations *::before, html.disable-animations *::after {
  animation-duration: 0s !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0s !important;
  scroll-behavior: auto !important;
}

.font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
.font-khmer { font-family: 'Kantumruy Pro', sans-serif; }
.font-mono { font-family: 'JetBrains Mono', monospace; }

.custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; }

.tab-fade-enter-active, .tab-fade-leave-active { transition: all 0.3s ease; }
.tab-fade-enter-from { opacity: 0; transform: translateY(10px) scale(0.98); }
.tab-fade-leave-to { opacity: 0; transform: translateY(-10px) scale(0.98); }

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

.fallback-initials {
  background: linear-gradient(135deg, #e2e8f0 0%, #f1f5f9 100%);
}
.dark .fallback-initials {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
}
</style>