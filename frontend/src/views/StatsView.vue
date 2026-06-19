<template>
  <div class="w-full h-full relative min-h-screen">
    
    <main class="relative z-10 w-full max-w-[28rem] sm:max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-32 sm:pb-12 flex flex-col">
      
      <!-- Top Action Bar -->
      <div class="w-full flex justify-between items-center mb-6 animate-fade-in-up">
        <button @click="router.push('/schedule')" class="group flex items-center gap-2 px-4 py-2 sm:py-2.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 shadow-sm border border-slate-200 dark:border-slate-700/50 hover:scale-105">
          <svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
          Back
        </button>
      </div>

      <!-- Header -->
      <div class="mb-6 sm:mb-8 text-center animate-fade-in-up" style="animation-delay: 0.1s;">
        <p class="text-indigo-500 font-black tracking-widest uppercase text-[9px] sm:text-[10px] mb-2 flex items-center justify-center gap-2">
          <span class="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
          Teaching Overview
        </p>
        <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-none drop-shadow-sm">Analytics & Stats</h1>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-24 animate-pulse">
        <div class="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(99,102,241,0.4)]"></div>
        <p class="text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-widest">Scanning Database...</p>
      </div>

      <div v-else class="w-full flex flex-col gap-6 sm:gap-8">
        
        <!-- 🔥 MASTER OVERALL CARD -->
        <div class="relative w-full bg-slate-900 dark:bg-[#0B1120] rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_20px_50px_-15px_rgba(99,102,241,0.4)] overflow-hidden p-8 sm:p-12 text-center animate-fade-in-up border border-slate-700/50" style="animation-delay: 0.2s;">
          <!-- Holographic Gradients -->
          <div class="absolute top-[-50%] right-[-20%] w-[120%] h-[150%] bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-indigo-500 via-fuchsia-600 to-cyan-400 opacity-40 mix-blend-screen animate-spin-slow origin-center blur-3xl z-0"></div>
          <div class="absolute bottom-[-30%] left-[-10%] w-[80%] h-[100%] bg-blue-600 opacity-30 mix-blend-screen blur-[100px] z-0"></div>
          <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQPSI4Ij4KPHJlY3Qgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE1KSIvPgo8L3N2Zz4=')] opacity-20 mix-blend-overlay z-0"></div>
          
          <div class="relative z-10">
            <p class="text-[9px] sm:text-xs font-black text-indigo-300/80 uppercase tracking-widest mb-3">
              Total Hours Logged {{ monthFilter ? 'This Month' : 'Overall' }}
            </p>
            <h2 class="text-4xl sm:text-6xl font-black font-khmer text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] leading-tight tracking-tight">
              {{ computedStats.totalHours }}
            </h2>
            <div class="inline-flex mt-5 items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-inner">
               <span class="text-[9px] sm:text-[10px] font-black uppercase text-white tracking-widest">{{ computedStats.totalLessons }} Lessons Tracked</span>
            </div>
          </div>
        </div>

        <!-- 🔥 SMART CONTROL PANEL (FILTERS) -->
        <div class="relative z-40 flex flex-col sm:flex-row gap-3 w-full animate-fade-in-up" style="animation-delay: 0.3s;">
          
          <!-- Filter by Class Dropdown -->
          <div class="relative flex-grow">
            <button @click="showClassMenu = !showClassMenu" class="w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-2xl px-4 py-3.5 flex items-center justify-between shadow-sm outline-none transition-all duration-300 active:scale-[0.98]">
              <div class="flex items-center gap-2 overflow-hidden pr-2">
                <svg class="w-4 h-4 text-fuchsia-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                <span class="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 truncate">
                  {{ classFilter || 'All Subjects' }}
                </span>
              </div>
              <svg :class="['w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300', showClassMenu ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            <!-- Dropdown Menu -->
            <transition name="fade-scale">
              <div v-if="showClassMenu" class="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-3xl border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-50 overflow-hidden max-h-60 overflow-y-auto">
                <button @click="classFilter = ''; showClassMenu = false" :class="['w-full text-left px-4 py-3 text-[10px] sm:text-xs font-black uppercase tracking-widest transition-colors border-b border-slate-100 dark:border-slate-700/50', classFilter === '' ? 'bg-fuchsia-50 dark:bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50']">
                  All Subjects
                </button>
                <button v-for="sub in uniqueSubjects" :key="sub" @click="classFilter = sub; showClassMenu = false" :class="['w-full text-left px-4 py-3 text-[10px] sm:text-xs font-black uppercase tracking-widest transition-colors border-b border-slate-100 dark:border-slate-700/50 truncate', classFilter === sub ? 'bg-fuchsia-50 dark:bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50']">
                  {{ sub }}
                </button>
              </div>
            </transition>
          </div>

          <!-- Filter by Month -->
          <div class="relative shrink-0">
            <div class="w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl px-4 py-3.5 shadow-sm border border-slate-200 dark:border-slate-700/50 flex items-center justify-between group transition-all duration-300">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <input type="month" v-model="monthFilter" class="bg-transparent border-none text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 focus:ring-0 outline-none p-0 cursor-pointer w-[110px]" />
              </div>
              <button v-if="monthFilter" @click="monthFilter = ''" class="ml-2 w-5 h-5 bg-rose-100 dark:bg-rose-500/20 text-rose-500 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
          </div>

        </div>

        <!-- Invisible overlay to close dropdown if user clicks outside -->
        <div v-if="showClassMenu" @click="showClassMenu = false" class="fixed inset-0 z-30"></div>

        <h3 class="text-xs sm:text-sm font-black uppercase tracking-widest text-slate-800 dark:text-white mt-2 flex items-center gap-2 animate-fade-in-up" style="animation-delay: 0.4s;">
          <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
          Breakdown by Class
        </h3>

        <!-- Empty State -->
        <div v-if="computedStats.classes.length === 0" class="w-full bg-white/50 dark:bg-slate-800/40 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-[2rem] p-10 text-center shadow-sm animate-fade-in-up" style="animation-delay: 0.5s;">
           <div class="w-16 h-16 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-slate-200 dark:border-slate-700">
             <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
           </div>
           <p class="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">No hours logged for these filters.</p>
        </div>

        <!-- Glass Grid of Classes -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pb-6">
          <div v-for="(cls, index) in computedStats.classes" :key="index" class="bg-white/80 dark:bg-[#0B1120]/80 p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[2.5rem] border border-white dark:border-slate-700/50 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 animate-fade-in-up flex flex-col justify-between backdrop-blur-xl" :style="`animation-delay: ${0.5 + (index * 0.1)}s;`">
             
             <!-- Card Hover Glow -->
             <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
             
             <div>
               <div class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-md text-[9px] font-black uppercase tracking-widest mb-3 border border-indigo-100 dark:border-indigo-500/20">
                 {{ cls.cohort }}
               </div>
               <h4 class="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-khmer leading-snug mb-5 line-clamp-2 pr-2">{{ cls.subject }}</h4>
             </div>
             
             <!-- 🔥 METRICS FOOTER -->
             <div class="pt-4 border-t border-slate-100 dark:border-slate-700/50 flex justify-between items-end relative z-10">
               <div>
                 <p class="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Class Total</p>
                 <p class="text-xl sm:text-2xl font-black text-cyan-600 dark:text-cyan-400 font-khmer tracking-tight">{{ cls.formattedHours }}</p>
               </div>
               
               <div class="flex items-center gap-2">
                 <!-- WEEKS Metric Pill -->
                 <div class="min-w-[40px] px-2 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex flex-col items-center justify-center shadow-inner">
                   <span class="text-sm font-black text-indigo-600 dark:text-indigo-400 leading-none mb-1">{{ cls.weeksCount }}</span>
                   <span class="text-[7px] font-black text-indigo-400 dark:text-indigo-500 uppercase tracking-widest leading-none">Weeks</span>
                 </div>
                 <!-- LESSONS Metric Pill -->
                 <div class="min-w-[40px] px-2 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center shadow-inner">
                   <span class="text-sm font-black text-slate-700 dark:text-slate-300 leading-none mb-1">{{ cls.count }}</span>
                   <span class="text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none">Lessons</span>
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
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const teacher = ref(null);
const isLoading = ref(true);
const allHistory = ref([]);
const monthFilter = ref('');

// Custom Class Filter State
const classFilter = ref('');
const showClassMenu = ref(false);

const goBack = () => router.push('/schedule');

const formatMins = (m) => {
  const h = Math.floor(m / 60);
  const rM = m % 60;
  const fM = rM < 10 ? `0${rM}` : rM;
  return `${h} ម៉ោង ${fM} នាទី`;
};

// 🔥 ULTRA-ROBUST DATE PARSER
const extractYYYYMM = (dateString) => {
  if (!dateString) return null;
  let match = dateString.match(/^(\d{4})[-/](\d{1,2})/);
  if (match) return `${match[1]}-${match[2].padStart(2, '0')}`;
  
  match = dateString.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
  if (match) {
    const p1 = parseInt(match[1]);
    const p2 = parseInt(match[2]);
    const year = match[3];
    let month;
    if (p1 > 12) month = match[2];
    else if (p2 > 12) month = match[1];
    else month = match[2]; 
    return `${year}-${month.padStart(2, '0')}`;
  }
  const d = new Date(dateString);
  if (!isNaN(d.getTime())) return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  return null;
};

const fetchAllData = async () => {
  isLoading.value = true;
  try {
    const token = localStorage.getItem('duc_teacher_token');
    if (!token) return;
    teacher.value = JSON.parse(token);
    const teacherName = teacher.value.nameKh;

    const schedRes = await fetch(`https://duc-teacher-tracking.onrender.com/api/my-schedule?name=${encodeURIComponent(teacherName)}`);
    const schedData = await schedRes.json();
    const classes = schedData.data || [];

    const uniqueClasses = [];
    const seen = new Set();
    classes.forEach(c => {
       if(!c.group || !c.subject) return;
       const key = c.group + '|' + c.subject;
       if(!seen.has(key)) { seen.add(key); uniqueClasses.push(c); }
    });

    const promises = uniqueClasses.map(async (cls) => {
       const url = new URL('https://duc-teacher-tracking.onrender.com/api/class-history');
       url.searchParams.append('cohort', cls.group);
       url.searchParams.append('subject', cls.subject);
       url.searchParams.append('teacher', teacherName);
       
       const res = await fetch(url);
       const hist = await res.json();
       if(hist.success && hist.data) {
          return hist.data.map(lesson => ({ ...lesson, subject: cls.subject, cohort: cls.group }));
       }
       return [];
    });

    const results = await Promise.all(promises);
    allHistory.value = results.flat();

  } catch (error) {
    console.error("Failed to fetch analytics", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchAllData();
});

// Extract unique subjects for the dropdown!
const uniqueSubjects = computed(() => {
  const subs = new Set();
  allHistory.value.forEach(h => {
    if (h.subject) subs.add(h.subject);
  });
  return Array.from(subs).sort();
});

// Compute Stats magically based on BOTH filters!
const computedStats = computed(() => {
  let totalMins = 0;
  let totalLessons = 0;
  const breakdown = {};

  allHistory.value.forEach(lesson => {
    // 1. Month Filter Check
    if (monthFilter.value) {
      const lessonMonth = extractYYYYMM(lesson.date);
      if (lessonMonth !== monthFilter.value) return; 
    }

    // 2. Class/Subject Filter Check
    if (classFilter.value && lesson.subject !== classFilter.value) return;

    // Parse the Khmer Hours
    let mins = 0;
    if (lesson.hours) {
      const match = lesson.hours.match(/(\d+)\s*ម៉ោង\s*(\d+)\s*នាទី/);
      if (match) {
        mins = parseInt(match[1] || 0) * 60 + parseInt(match[2] || 0);
      }
    }
    
    totalMins += mins;
    totalLessons++;

    // Group by Class
    const key = `${lesson.subject}|${lesson.cohort}`;
    if (!breakdown[key]) {
      breakdown[key] = { subject: lesson.subject, cohort: lesson.cohort, mins: 0, count: 0, weeks: new Set() };
    }
    breakdown[key].mins += mins;
    breakdown[key].count += 1;
    
    // Add week number to Set to count unique weeks
    if (lesson.week) {
      breakdown[key].weeks.add(lesson.week);
    }
  });

  const formattedBreakdown = Object.values(breakdown)
    .map(b => ({ 
      ...b, 
      formattedHours: formatMins(b.mins),
      weeksCount: b.weeks.size
    }))
    .sort((a,b) => b.mins - a.mins); 

  return {
    totalHours: formatMins(totalMins),
    totalLessons: totalLessons,
    classes: formattedBreakdown
  };
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;500;600;700;900&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@700;800&display=swap');

.font-sans { font-family: 'Inter', sans-serif; }
.font-khmer { font-family: 'Kantumruy Pro', sans-serif; }

input[type="month"]::-webkit-calendar-picker-indicator {
  filter: invert(0.5); cursor: pointer; opacity: 0.6; transition: 0.3s;
}
input[type="month"]::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}
.dark input[type="month"]::-webkit-calendar-picker-indicator {
  filter: invert(1); opacity: 0.8;
}

/* Custom Scrollbar for Dropdown */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
.dark ::-webkit-scrollbar-thumb { background: #475569; }

.animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.animate-spin-slow { animation: spin-slow 12s linear infinite; }

.fade-scale-enter-active, .fade-scale-leave-active { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
.fade-scale-enter-from, .fade-scale-leave-to { opacity: 0; transform: scale(0.95) translateY(-10px); }
</style>