<template>
  <div class="min-h-screen bg-[#F1F5F9] dark:bg-[#0B1120] font-sans text-slate-900 dark:text-slate-50 selection:bg-cyan-500 selection:text-white relative overflow-x-hidden transition-colors duration-500 pb-32">
    
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <div class="absolute inset-0 bg-[radial-gradient(#94A3B8_1px,transparent_1.5px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1.5px)] [background-size:32px_32px] opacity-[0.12] dark:opacity-[0.05] transition-opacity"></div>
      <div class="absolute top-[10%] right-[10%] w-[40vw] h-[40vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-40 dark:opacity-20 animate-blob bg-cyan-300 dark:bg-cyan-700 transition-opacity"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[140px] opacity-40 dark:opacity-20 animate-blob animation-delay-2000 bg-indigo-200 dark:bg-indigo-800 transition-opacity"></div>
    </div>

    <main class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-12 animate-fade-in-up">
      
      <button @click="goBack" class="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 mb-10 transition-colors">
        <div class="w-8 h-8 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
        </div>
        {{ isAdmin ? 'Back to Directory' : 'Back to Schedule' }}
      </button>

      <div class="bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2.5rem] shadow-xl shadow-cyan-500/5 dark:shadow-black/50 border border-white dark:border-white/5 p-8 sm:p-12 mb-12 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div class="relative z-10 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Lesson History Archive
              <span v-if="isAdmin" class="ml-2 bg-rose-500 text-white px-2 py-0.5 rounded text-[8px] tracking-widest uppercase">Admin View</span>
            </div>
            <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-khmer leading-tight mb-4">{{ classData.subject }}</h1>
            
            <div class="flex flex-wrap items-center gap-3 text-sm font-bold text-slate-500 dark:text-slate-400 font-mono tracking-wide">
              <p>Cohort Tab: <span class="text-cyan-500 dark:text-cyan-400">{{ classData.group }}</span></p>
              <span v-if="fullMajorName" class="px-3 py-1 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-lg text-[11px] font-black font-khmer uppercase tracking-widest border border-cyan-100 dark:border-cyan-500/20 shadow-sm">{{ fullMajorName }}</span>
            </div>
          </div>

          <div class="flex flex-col items-end gap-3 w-full md:w-auto">
            <div class="bg-slate-900 dark:bg-black/50 rounded-2xl p-6 text-white border border-slate-700 dark:border-white/10 shadow-inner w-full text-center flex flex-col items-center transition-all duration-300">
               <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                 {{ filterMonthYear ? 'Filtered Hours' : 'Total Hours Logged' }}
               </p>
               <p class="text-3xl font-black font-khmer text-cyan-400">{{ displayedTotalHours }}</p>
            </div>

            <div v-if="isAdmin" class="w-full flex items-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-2.5 shadow-sm transition-all focus-within:ring-2 focus-within:ring-cyan-500/50">
               <svg class="w-4 h-4 text-cyan-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
               <input 
                 type="month" 
                 v-model="filterMonthYear" 
                 class="bg-transparent border-none text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 focus:ring-0 outline-none w-full p-0" 
                 title="Filter by Year and Month"
               />
               <button v-if="filterMonthYear" @click="filterMonthYear = ''" class="ml-2 text-slate-400 hover:text-rose-500 transition-colors p-1" title="Clear Filter">
                 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
               </button>
            </div>
          </div>
        </div>
      </div>

      <div class="relative">
        <div class="absolute left-[39px] top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-800 rounded-full z-0"></div>

        <div class="space-y-10">
          
          <div v-if="isLoading" class="pl-20 text-slate-500 font-bold animate-pulse">Loading history...</div>
          <div v-else-if="filteredHistoryData.length === 0" class="pl-20 text-slate-500 font-bold bg-white/40 dark:bg-slate-800/40 p-6 rounded-2xl border border-white dark:border-white/5 backdrop-blur-md">
            {{ filterMonthYear ? 'No lessons were logged during this specific month.' : 'No lessons have been logged for this cohort yet.' }}
          </div>
          
          <div v-for="(lesson, index) in paginatedHistory" :key="lesson.week + '-' + index" class="relative flex items-start gap-6 sm:gap-10 animate-fade-in-up" :style="`animation-delay: ${0.05 * index}s;`">
            
            <div class="relative z-10 shrink-0 mt-2">
              <div class="w-20 h-20 bg-white dark:bg-slate-900 rounded-full border-4 border-[#F1F5F9] dark:border-[#0B1120] flex flex-col items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-slate-200 dark:ring-slate-700">
                <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Week</span>
                <span class="text-2xl font-black text-cyan-500 dark:text-cyan-400 leading-none">{{ lesson.week }}</span>
              </div>
            </div>

            <div class="flex-grow bg-white/60 dark:bg-slate-800/40 backdrop-blur-xl rounded-[2rem] border border-white dark:border-white/5 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              
              <div class="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-700/50">
                <div>
                  <h3 class="text-lg font-black text-slate-900 dark:text-white mb-1">Lesson {{ lesson.lessonNo }}</h3>
                  <p class="text-xs font-bold text-slate-500 flex items-center gap-2 font-mono">
                    <svg class="w-3.5 h-3.5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    {{ lesson.date }}
                  </p>
                </div>
                
                <div class="flex items-center gap-5">
                  <div class="flex items-center gap-2 border-r border-slate-200 dark:border-slate-700 pr-5">
                    <button @click="goToEditPage(lesson)" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/20 transition-all" title="Edit">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </button>
                    <button @click="promptDelete(lesson)" :disabled="isDeleting === lesson.week" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/20 transition-all disabled:opacity-50" title="Delete">
                      <span v-if="isDeleting === lesson.week" class="w-3 h-3 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></span>
                      <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-black text-cyan-600 dark:text-cyan-400 font-khmer bg-cyan-50 dark:bg-cyan-500/10 px-3 py-1.5 rounded-lg">{{ lesson.hours }}</p>
                    <p class="text-[10px] font-bold text-slate-400 mt-1.5 font-mono">{{ lesson.time }}</p>
                  </div>
                </div>
              </div>

              <div>
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Covered Topics (ខ្លឹមសារមេរៀន)</p>
                <p class="text-sm text-slate-700 dark:text-slate-300 font-khmer leading-relaxed">{{ lesson.content }}</p>
              </div>

              <div v-if="lesson.notes" class="mt-6 pt-4 border-t border-dashed border-slate-200 dark:border-slate-700">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Notes</p>
                <p class="text-xs text-slate-500 dark:text-slate-400 italic font-khmer">{{ lesson.notes }}</p>
              </div>

            </div>
          </div>

          <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 sm:gap-3 mt-12 mb-8 relative z-10 pl-6 sm:pl-10">
            <button @click="prevPage" :disabled="currentPage === 1" class="w-8 h-8 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center rounded-xl bg-white/60 dark:bg-slate-800/60 shadow-sm border border-slate-200 dark:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
            </button>

            <div class="flex items-center gap-1.5 sm:gap-2">
              <template v-for="(item, idx) in visiblePages" :key="idx">
                <span v-if="item === '...'" class="text-slate-400 dark:text-slate-500 font-black px-1 sm:px-2">...</span>
                <button v-else @click="goToPage(item)" :class="['w-8 h-8 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center rounded-xl text-xs sm:text-sm font-black transition-all', currentPage === item ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' : 'bg-white/60 dark:bg-slate-800/60 shadow-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800']">
                  {{ item }}
                </button>
              </template>
            </div>

            <button @click="nextPage" :disabled="currentPage === totalPages" class="w-8 h-8 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center rounded-xl bg-white/60 dark:bg-slate-800/60 shadow-sm border border-slate-200 dark:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>

        </div>
      </div>
    </main>

    <transition name="fade-scale">
      <div v-if="customAlert.show" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xl transition-opacity" @click="closeAlert"></div>

        <div class="relative w-full max-w-sm bg-white dark:bg-[#0A0A0A] rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.3)] overflow-hidden border border-slate-200 dark:border-white/10 flex flex-col z-10 p-8 text-center ring-1 ring-slate-200 dark:ring-white/5">
          
          <div :class="['absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none', 
            customAlert.type === 'success' ? 'bg-emerald-500/20' : 
            customAlert.type === 'error' ? 'bg-rose-500/20' : 
            'bg-amber-500/20']">
          </div>

          <div :class="['w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-2xl relative transition-transform animate-bounce-short', 
            customAlert.type === 'success' ? 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-500/40' : 
            customAlert.type === 'error' ? 'bg-gradient-to-br from-rose-400 to-red-500 shadow-rose-500/40' : 
            'bg-gradient-to-br from-amber-400 to-orange-500 shadow-amber-500/40']">
            
            <div class="absolute inset-0 rounded-full border-2 border-white/30 mix-blend-overlay"></div>
            
            <svg v-if="customAlert.type === 'success'" class="w-10 h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
            <svg v-else-if="customAlert.type === 'error'" class="w-10 h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
            <svg v-else class="w-10 h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </div>

          <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-2 font-sans tracking-tight">
            {{ customAlert.type === 'success' ? 'Success!' : customAlert.type === 'error' ? 'Error Occurred' : 'Are you sure?' }}
          </h3>
          <p class="text-sm font-bold text-slate-500 dark:text-slate-400 mb-8 font-khmer">
            {{ customAlert.message }}
          </p>

          <div v-if="customAlert.type === 'confirm'" class="flex gap-3">
            <button @click="closeAlert" class="flex-1 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300">
              Cancel
            </button>
            <button @click="executeConfirm" class="flex-1 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg text-white bg-rose-600 hover:bg-rose-500 hover:shadow-rose-500/25">
              Delete It
            </button>
          </div>
          
          <button v-else @click="closeAlert" :class="['w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-lg text-white flex items-center justify-center gap-2 hover:-translate-y-1', 
            customAlert.type === 'success' ? 'bg-slate-900 dark:bg-white dark:text-slate-900 hover:shadow-emerald-500/25 dark:hover:bg-emerald-400' : 'bg-rose-600 hover:shadow-rose-500/25 hover:bg-rose-500']">
            {{ customAlert.type === 'success' ? 'Awesome' : 'Try Again' }}
          </button>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// ADMIN MODE DETECTION
const isAdmin = computed(() => route.query.admin === 'true');

const classData = ref({
  subject: route.query.subject || 'Unknown Subject',
  group: route.query.group || 'Unknown',
  room: route.query.room || 'N/A',
  time: route.query.time || 'N/A',
  day: route.query.day || 'N/A',
  teacher: route.query.teacher || ''
});

const historyData = ref([]);
const totalHours = ref("0 ម៉ោង 00 នាទី");
const isLoading = ref(true);
const isDeleting = ref(null);
const fullMajorName = ref('');

// 🔥 SMART DATE FILTER (Frontend logic)
const filterMonthYear = ref('');

// Reset pagination when filter changes
watch(filterMonthYear, () => {
  currentPage.value = 1;
});

// Filters the history array locally based on the selected YYYY-MM
const filteredHistoryData = computed(() => {
  if (!filterMonthYear.value) return historyData.value;
  return historyData.value.filter(lesson => {
    return lesson.date && lesson.date.startsWith(filterMonthYear.value);
  });
});

// Auto-recalculates total hours from the filtered list using Regex to grab the Khmer strings
const displayedTotalHours = computed(() => {
  if (!filterMonthYear.value) return totalHours.value; // Fallback to initial total if no filter
  
  let totalMins = 0;
  
  filteredHistoryData.value.forEach(lesson => {
    if (lesson.hours) {
      // Matches strings like "2 ម៉ោង 30 នាទី"
      const match = lesson.hours.match(/(\d+)\s*ម៉ោង\s*(\d+)\s*នាទី/);
      if (match) {
        totalMins += parseInt(match[1] || 0) * 60 + parseInt(match[2] || 0);
      }
    }
  });
  
  const hrs = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  const formattedMins = mins < 10 ? `0${mins}` : mins;
  
  return `${hrs} ម៉ោង ${formattedMins} នាទី`;
});

// 🔥 PAGINATION
const currentPage = ref(1);
const itemsPerPage = 10;

const totalPages = computed(() => Math.ceil(filteredHistoryData.value.length / itemsPerPage));

const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 1;

  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = [];
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  pages.push(1);
  if (left > 2) pages.push('...');
  
  for (let i = left; i <= right; i++) {
    pages.push(i);
  }
  
  if (right < total - 1) pages.push('...');
  pages.push(total);

  return pages;
});

const paginatedHistory = computed(() => {
  if (currentPage.value > totalPages.value && totalPages.value > 0) {
    currentPage.value = totalPages.value;
  }
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredHistoryData.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const goToPage = (page) => {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


const customAlert = ref({ show: false, type: 'success', message: '', confirmAction: null });
let alertTimeout = null;

const goBack = () => {
  if (isAdmin.value) {
    router.go(-1); 
  } else {
    router.replace('/schedule'); 
  }
};

const fetchHistory = async () => {
  isLoading.value = true;
  try {
    const token = localStorage.getItem('duc_teacher_token');
    const teacherName = token ? JSON.parse(token).nameKh || '' : '';

    const url = new URL('https://duc-teacher-tracking.onrender.com/api/class-history');
    url.searchParams.append('cohort', classData.value.group);
    url.searchParams.append('subject', classData.value.subject);
    
    // 🔥 If the teacher JUST saved data, send the fresh override signal!
    if (localStorage.getItem('force_fresh') === 'true') {
      url.searchParams.append('fresh', 'true');
      localStorage.removeItem('force_fresh'); // Clean it up so it uses RAM next time
    }

    if (isAdmin.value && classData.value.teacher) {
      url.searchParams.append('teacher', classData.value.teacher);
    } else if (!isAdmin.value) {
      url.searchParams.append('teacher', teacherName);
    }

    const res = await fetch(url, {
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
      }
    });
    
    const data = await res.json();
    if (data.success) {
      historyData.value = data.data;
      totalHours.value = data.totalHours;
      currentPage.value = 1;
    }
  } catch (error) {
    console.error("Failed to load history", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  const theme = localStorage.getItem('theme') || 'system';
  if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  fetchHistory();

  try {
    const res = await fetch('https://duc-teacher-tracking.onrender.com/api/majors');
    const data = await res.json();
    if (data.success) {
      const majorsMap = data.data;
      const normalize = (str) => (str || '').replace(/\s+/g, '').replace(/[\u2013\u2014\u2011_]/g, '-').toUpperCase();
      const stripNumbersAndSuffixes = (str) => str.replace(/\d+$/, '').replace(/-[A-Z]$/, '');
      
      const cohortCode = normalize(classData.value.group);
      const cohortParts = cohortCode.split('-');
      
      let coreCode = cohortCode;
      if (cohortParts.length >= 3) coreCode = cohortParts[1];
      else if (cohortParts.length === 2) coreCode = cohortParts[1];
      else coreCode = cohortParts[0];
      
      coreCode = stripNumbersAndSuffixes(coreCode);
      
      let matchedName = null;
      const rows = Object.entries(majorsMap).sort((a, b) => b[0].length - a[0].length);
      
      for (const [code, name] of rows) {
        const sheetCode = normalize(code);
        if (cohortCode === sheetCode || cohortCode.includes(sheetCode) || sheetCode.includes(cohortCode)) {
            matchedName = name.trim(); break;
        }
        if (coreCode.length >= 2 && sheetCode.includes(coreCode)) {
            matchedName = name.trim(); break;
        }
      }
      if (matchedName) fullMajorName.value = matchedName;
    }
  } catch (err) { 
    console.error("Could not fetch majors", err); 
  }
});

const goToEditPage = (lesson) => {
  router.push({
    path: '/edit-lesson',
    query: {
      subject: classData.value.subject,
      group: classData.value.group,
      room: classData.value.room,
      time: lesson.time, 
      day: classData.value.day,
      week: lesson.week,
      lessonNo: lesson.lessonNo,
      date: lesson.date,
      content: lesson.content,
      notes: lesson.notes,
      admin: isAdmin.value ? 'true' : undefined,
      teacher: classData.value.teacher 
    }
  });
};

const triggerAlert = (type, message, onConfirm = null) => {
  customAlert.value = { show: true, type, message, confirmAction: onConfirm };
  if (type === 'success') {
    alertTimeout = setTimeout(() => {
      if (customAlert.value.show) closeAlert();
    }, 2500);
  }
};

const closeAlert = () => {
  customAlert.value.show = false;
  if (alertTimeout) clearTimeout(alertTimeout);
};

const executeConfirm = () => {
  if (customAlert.value.confirmAction) {
    customAlert.value.confirmAction();
  }
  closeAlert();
};

const promptDelete = (lesson) => {
  triggerAlert(
    'confirm', 
    `You are about to delete Lesson ${lesson.lessonNo} on ${lesson.date}. This action cannot be undone.`,
    () => executeDelete(lesson)
  );
};

const executeDelete = async (lesson) => {
  isDeleting.value = lesson.week;
  try {
    const token = localStorage.getItem('duc_teacher_token');
    const teacherName = token ? JSON.parse(token).nameKh || '' : '';

    const url = new URL('https://duc-teacher-tracking.onrender.com/api/class-history');
    url.searchParams.append('cohort', classData.value.group);
    url.searchParams.append('week', lesson.week);
    
    // 🔥 Sends the exact date to the backend!
    url.searchParams.append('date', lesson.date); 
    
    url.searchParams.append('subject', classData.value.subject);
    
    if (isAdmin.value && classData.value.teacher) {
      url.searchParams.append('teacher', classData.value.teacher);
    } else if (!isAdmin.value) {
      url.searchParams.append('teacher', teacherName); 
    }

    const res = await fetch(url, { method: 'DELETE' });
    const data = await res.json();
    
    if (data.success) {
      triggerAlert('success', `The lesson on ${lesson.date} was successfully deleted.`);
      
      // 🔥 THE FIX: Tell the fetcher to bypass cache, and give Google 1.5 seconds to actually delete it!
      localStorage.setItem('force_fresh', 'true');
      setTimeout(() => {
        fetchHistory(); 
        isDeleting.value = null; // Stop the loading spinner after the new data arrives
      }, 1500);
      
    } else {
      triggerAlert('error', data.message || "Failed to delete the record.");
      isDeleting.value = null;
    }
  } catch (error) {
    triggerAlert('error', "Failed to connect to the server.");
    isDeleting.value = null;
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;500;600;700;900&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@700;800&display=swap');

.font-khmer { font-family: 'Kantumruy Pro', sans-serif; }
.font-mono { font-family: 'JetBrains Mono', monospace; }

/* Properly formats the date/month picker icons for light and dark modes */
input[type="month"]::-webkit-calendar-picker-indicator {
  filter: invert(0.5);
  cursor: pointer;
}
.dark input[type="month"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

.animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-scale-enter-active, .fade-scale-leave-active { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.fade-scale-enter-from, .fade-scale-leave-to { opacity: 0; transform: scale(0.9) translateY(15px); }

@keyframes bounce-short {
  0% { transform: scale(0.8); opacity: 0; }
  60% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-bounce-short { animation: bounce-short 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
</style>