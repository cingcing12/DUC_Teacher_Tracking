<template>
  <div class="w-full h-full relative">
    
    <main class="relative z-10 w-full max-w-[28rem] sm:max-w-3xl mx-auto px-4 sm:px-6 pt-2 pb-24 sm:pb-12 flex flex-col">
      
      <!-- Top Action Bar -->
      <div class="w-full flex justify-between items-center mb-6 sm:mb-8 animate-fade-in-up">
        <button @click="router.push('/schedule')" class="group flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 bg-white/60 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 backdrop-blur-xl rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 shadow-sm border border-white/80 dark:border-slate-700/50 hover:scale-105">
          <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
          Back
        </button>

        <!-- 🔥 FIXED Month Filter -->
        <div class="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-full px-3 py-1.5 shadow-sm border border-white/50 dark:border-slate-700/50 flex items-center group">
          <svg class="w-4 h-4 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <input type="month" v-model="monthFilter" class="bg-transparent border-none text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 focus:ring-0 outline-none p-0 cursor-pointer" />
          <button v-if="monthFilter" @click="monthFilter = ''" class="ml-2 w-5 h-5 bg-rose-100 dark:bg-rose-500/20 text-rose-500 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      </div>

      <!-- Header -->
      <div class="mb-6 sm:mb-8 text-center animate-fade-in-up" style="animation-delay: 0.1s;">
        <p class="text-indigo-500 font-black tracking-widest uppercase text-[9px] sm:text-[10px] mb-1.5 sm:mb-2 flex items-center justify-center gap-2">
          <span class="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
          Teaching Overview
        </p>
        <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-none">Analytics & Stats</h1>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-20 animate-pulse">
        <div class="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p class="text-xs font-black text-slate-500 uppercase tracking-widest">Calculating Total Hours...</p>
      </div>

      <div v-else class="w-full flex flex-col gap-6 sm:gap-8">
        
        <!-- MASTER OVERALL CARD -->
        <div class="relative w-full bg-slate-900 rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_20px_50px_-15px_rgba(99,102,241,0.4)] overflow-hidden p-8 sm:p-12 text-center animate-fade-in-up" style="animation-delay: 0.2s;">
          <div class="absolute top-[-50%] right-[-20%] w-[120%] h-[150%] bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-indigo-500 via-fuchsia-600 to-cyan-400 opacity-50 mix-blend-screen animate-spin-slow origin-center blur-3xl z-0"></div>
          <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQPSI4Ij4KPHJlY3Qgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE1KSIvPgo8L3N2Zz4=')] opacity-20 mix-blend-overlay z-0"></div>
          
          <div class="relative z-10">
            <p class="text-[10px] sm:text-xs font-black text-indigo-300 uppercase tracking-widest mb-2">Total Hours Logged {{ monthFilter ? 'This Month' : 'Overall' }}</p>
            <h2 class="text-4xl sm:text-[3.5rem] font-black font-khmer text-white drop-shadow-xl leading-tight">
              {{ computedStats.totalHours }}
            </h2>
            <div class="inline-flex mt-4 items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
               <span class="text-[9px] font-black uppercase text-white tracking-widest">{{ computedStats.totalLessons }} Lessons Tracked</span>
            </div>
          </div>
        </div>

        <h3 class="text-xs sm:text-sm font-black uppercase tracking-widest text-slate-800 dark:text-white mt-4 flex items-center gap-2 animate-fade-in-up" style="animation-delay: 0.3s;">
          <svg class="w-4 h-4 text-fuchsia-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
          Breakdown by Class
        </h3>

        <!-- Empty State -->
        <div v-if="computedStats.classes.length === 0" class="w-full bg-white/50 dark:bg-slate-800/40 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-[2rem] p-10 text-center shadow-sm animate-fade-in-up" style="animation-delay: 0.4s;">
           <p class="text-sm font-bold text-slate-500 dark:text-slate-400">No hours logged for this period.</p>
        </div>

        <!-- Glass Grid of Classes -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pb-10">
          <div v-for="(cls, index) in computedStats.classes" :key="index" class="bg-white/70 dark:bg-[#0B1120]/60 p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border border-white dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 animate-fade-in-up flex flex-col justify-between" :style="`animation-delay: ${0.4 + (index * 0.1)}s;`">
             <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
             
             <div>
               <p class="text-[9px] font-black text-indigo-500 uppercase tracking-widest mb-1">{{ cls.cohort }}</p>
               <h4 class="text-base sm:text-lg font-black text-slate-900 dark:text-white font-khmer leading-snug mb-5 line-clamp-2">{{ cls.subject }}</h4>
             </div>
             
             <!-- 🔥 UPGRADED METRICS FOOTER -->
             <div class="pt-4 border-t border-slate-200/60 dark:border-slate-700/50 flex justify-between items-end">
               <div>
                 <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Class Total</p>
                 <p class="text-lg font-black text-cyan-600 dark:text-cyan-400 font-khmer">{{ cls.formattedHours }}</p>
               </div>
               
               <div class="flex items-center gap-1.5">
                 <!-- WEEKS Metric -->
                 <div class="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex flex-col items-center justify-center">
                   <span class="text-sm font-black text-indigo-600 dark:text-indigo-400 leading-none mb-0.5">{{ cls.weeksCount }}</span>
                   <span class="text-[6.5px] font-black text-indigo-400 dark:text-indigo-500 uppercase tracking-widest leading-none">Weeks</span>
                 </div>
                 <!-- LESSONS Metric -->
                 <div class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
                   <span class="text-sm font-black text-slate-600 dark:text-slate-300 leading-none mb-0.5">{{ cls.count }}</span>
                   <span class="text-[6.5px] font-black text-slate-400 uppercase tracking-widest leading-none">Lessons</span>
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

const goBack = () => router.push('/schedule');

const formatMins = (m) => {
  const h = Math.floor(m / 60);
  const rM = m % 60;
  const fM = rM < 10 ? `0${rM}` : rM;
  return `${h} ម៉ោង ${fM} នាទី`;
};

// 🔥 ULTRA-ROBUST DATE PARSER
// Forces ANY date format (DD/MM/YYYY, YYYY-MM-DD, M/D/YYYY) cleanly into "YYYY-MM"
const extractYYYYMM = (dateString) => {
  if (!dateString) return null;
  
  // 1. Check for standard YYYY-MM-DD
  let match = dateString.match(/^(\d{4})[-/](\d{1,2})/);
  if (match) return `${match[1]}-${match[2].padStart(2, '0')}`;
  
  // 2. Check for DD-MM-YYYY or MM-DD-YYYY
  match = dateString.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
  if (match) {
    const p1 = parseInt(match[1]);
    const p2 = parseInt(match[2]);
    const year = match[3];
    let month;
    
    // In Cambodia/EU, it is usually DD-MM-YYYY. 
    // If the first number is > 12, it's definitely the day.
    if (p1 > 12) {
      month = match[2];
    } else if (p2 > 12) {
      month = match[1];
    } else {
      // If ambiguous (like 06/05/2026), default to treating index 2 as the month (DD/MM)
      month = match[2]; 
    }
    return `${year}-${month.padStart(2, '0')}`;
  }
  
  // 3. Absolute Fallback (Standard JS Date parsing)
  const d = new Date(dateString);
  if (!isNaN(d.getTime())) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  }
  
  return null;
};

// Fetch everything logic!
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

// Compute Stats magically!
const computedStats = computed(() => {
  let totalMins = 0;
  let totalLessons = 0;
  const breakdown = {};

  allHistory.value.forEach(lesson => {
    // 🔥 Use the robust Date Extractor to compare the month
    if (monthFilter.value) {
      const lessonMonth = extractYYYYMM(lesson.date);
      if (lessonMonth !== monthFilter.value) return; // Skip if it doesn't match the filter!
    }

    // Parse the Khmer Hours string
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
    
    // Add week number to Set to count unique weeks!
    if (lesson.week) {
      breakdown[key].weeks.add(lesson.week);
    }
  });

  const formattedBreakdown = Object.values(breakdown)
    .map(b => ({ 
      ...b, 
      formattedHours: formatMins(b.mins),
      weeksCount: b.weeks.size // The size of the Set is the total unique weeks!
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
  filter: invert(0.5); cursor: pointer;
}
.dark input[type="month"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

.animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.animate-spin-slow { animation: spin-slow 12s linear infinite; }
</style>