<template>
  <div class="w-full h-full relative min-h-screen">
    
    <main class="relative z-10 w-full max-w-[28rem] sm:max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-32 sm:pb-12 flex flex-col">
      
      <div class="w-full flex justify-between items-center mb-6 animate-fade-in-up">
        <button @click="router.push('/schedule')" :class="['group flex items-center gap-2 px-4 py-2 sm:py-2.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 shadow-sm border border-slate-200 dark:border-slate-700/50 hover:scale-105', language === 'kh' ? 'font-khmer' : '']">
          <svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
          {{ t.backToSchedule }}
        </button>
      </div>

      <div class="bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-2xl sm:rounded-[2.5rem] shadow-xl shadow-indigo-500/5 dark:shadow-black/50 border border-white dark:border-white/5 p-5 sm:p-10 mb-6 sm:mb-8 relative overflow-hidden animate-fade-in-up" style="animation-delay: 0.1s;">
        <div class="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div class="relative z-10 flex flex-col md:flex-row gap-5 sm:gap-8 justify-between items-start md:items-center">
          <div>
            <div :class="['inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-3 sm:mb-4', language === 'kh' ? 'font-khmer' : '']">
              <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              {{ t.activeSessionTracker }}
            </div>
            <h1 class="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white font-khmer leading-tight mb-3 sm:mb-4">{{ classData.subject }}</h1>
            
            <div class="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 font-mono tracking-wide">
              <p :class="[language === 'kh' ? 'font-khmer' : '']">{{ t.cohort }}: <span class="text-indigo-500 dark:text-indigo-400">{{ classData.group }}</span></p>
              
              <span v-if="classData.department && classData.department !== 'Unknown Department'" class="px-2 sm:px-3 py-0.5 sm:py-1 bg-fuchsia-50 dark:bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 rounded-md sm:rounded-lg text-[9px] sm:text-[11px] font-black font-khmer uppercase tracking-widest border border-fuchsia-100 dark:border-fuchsia-500/20 shadow-sm">{{ classData.department }}</span>
              <span v-if="extractGen(classData.group)" class="px-2 sm:px-3 py-0.5 sm:py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md sm:rounded-lg text-[9px] sm:text-[11px] font-black font-khmer uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20 shadow-sm">ជំនាន់ទី {{ extractGen(classData.group) }}</span>
              <span v-if="classData.year && classData.year !== '?'" class="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-md sm:rounded-lg text-[9px] sm:text-[11px] font-black font-khmer uppercase tracking-widest border border-blue-100 dark:border-blue-500/20 shadow-sm">ឆ្នាំទី {{ classData.year }}</span>
              <span v-if="classData.semester && classData.semester !== '?'" class="px-2 sm:px-3 py-0.5 sm:py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-md sm:rounded-lg text-[9px] sm:text-[11px] font-black font-khmer uppercase tracking-widest border border-amber-100 dark:border-amber-500/20 shadow-sm">ឆមាសទី {{ classData.semester }}</span>

              <span class="opacity-50 hidden sm:block">•</span> 
              <p :class="[language === 'kh' ? 'font-khmer' : '']">{{ t.room }}: <span class="text-indigo-500 dark:text-indigo-400">{{ classData.room }}</span></p>
            </div>
          </div>

          <div class="bg-slate-900 dark:bg-black/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white border border-slate-700 dark:border-white/10 shadow-inner w-full md:w-auto shrink-0 text-center">
             <p :class="['text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1', language === 'kh' ? 'font-khmer' : '']">{{ t.scheduledTimeblock }}</p>
             <p class="text-xl sm:text-2xl font-black font-mono tracking-wider">{{ classData.time }}</p>
          </div>
        </div>
      </div>

      <form @submit.prevent="submitTrackingData" class="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 animate-fade-in-up" style="animation-delay: 0.2s;">
        
        <div class="lg:col-span-5 space-y-5 sm:space-y-6">
          
          <div class="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] border border-white dark:border-white/5 p-5 sm:p-8 shadow-sm">
            <h3 :class="['text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-800 dark:text-white mb-5 sm:mb-6 flex items-center gap-2', language === 'kh' ? 'font-khmer text-sm' : '']">
              <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              {{ t.sessionDetails }}
            </h3>
            
            <div class="space-y-4 sm:space-y-5">
              <div class="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label :class="['block text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 sm:mb-2', language === 'kh' ? 'font-khmer' : '']">{{ t.week }}</label>
                  <input v-model="form.week" type="number" required class="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-800 rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" :placeholder="t.phWeek">
                </div>
                <div>
                  <label :class="['block text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 sm:mb-2', language === 'kh' ? 'font-khmer' : '']">{{ t.lessonNo }}</label>
                  <input v-model="form.lessonNo" type="text" required class="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-800 rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" :placeholder="t.phLessonNo">
                </div>
              </div>

              <div>
                <label :class="['block text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 sm:mb-2', language === 'kh' ? 'font-khmer' : '']">{{ t.date }}</label>
                <input v-model="form.date" type="date" required class="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-800 rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
              </div>

              <div class="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label :class="['block text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 sm:mb-2', language === 'kh' ? 'font-khmer' : '']">{{ t.startTime }}</label>
                  <input v-model="form.startTime" type="time" required class="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-800 rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono">
                </div>
                <div>
                  <label :class="['block text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 sm:mb-2', language === 'kh' ? 'font-khmer' : '']">{{ t.endTime }}</label>
                  <input v-model="form.endTime" type="time" required class="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-800 rounded-xl px-3 sm:px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono">
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 text-white shadow-lg shadow-indigo-500/30 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>
            <p :class="['text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-indigo-100 mb-1', language === 'kh' ? 'font-khmer' : '']">{{ t.autoComputedDuration }}</p>
            <h2 :class="['text-2xl sm:text-3xl font-black drop-shadow-md', language === 'kh' ? 'font-khmer' : '']">{{ computedHoursStr }}</h2>
          </div>

        </div>

        <div class="lg:col-span-7 space-y-5 sm:space-y-6">
          
          <div class="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] border border-white dark:border-white/5 p-5 sm:p-8 shadow-sm flex flex-col h-full">
            <h3 :class="['text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-800 dark:text-white mb-5 sm:mb-6 flex items-center gap-2', language === 'kh' ? 'font-khmer text-sm' : '']">
              <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              {{ t.curriculumData }}
            </h3>

            <div class="flex-grow flex flex-col gap-5 sm:gap-6">
              <div class="flex-grow flex flex-col">
                <label :class="['block text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 sm:mb-2', language === 'kh' ? 'font-khmer' : '']">{{ t.lessonContent }}</label>
                <textarea v-model="form.content" required :class="['flex-grow min-h-[120px] sm:min-h-[150px] w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-800 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-xs sm:text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-khmer resize-none leading-relaxed']" :placeholder="t.phContent"></textarea>
              </div>

              <div>
                <label :class="['block text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 sm:mb-2', language === 'kh' ? 'font-khmer' : '']">{{ t.notes }}</label>
                <input v-model="form.notes" type="text" :class="['w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-800 rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 text-xs sm:text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-khmer']" :placeholder="t.phNotes">
              </div>
            </div>

            <button type="submit" :disabled="isSubmitting" :class="['w-full mt-6 sm:mt-8 py-4 sm:py-5 bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-indigo-600 dark:hover:bg-indigo-500 text-white rounded-xl sm:rounded-2xl text-[10px] sm:text-sm font-black uppercase tracking-widest transition-all shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(79,70,229,0.3)] flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 hover:-translate-y-1', language === 'kh' ? 'font-khmer' : '']">
              <span v-if="isSubmitting" class="w-4 h-4 sm:w-5 sm:h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
              <svg v-else class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              {{ isSubmitting ? t.syncing : t.saveTrackingData }}
            </button>
            
          </div>
        </div>
      </form>
    </main>

    <transition name="fade-scale">
      <div v-if="customAlert.show" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-xl transition-opacity" @click="closeAlert"></div>

        <div class="relative w-full max-w-sm bg-white dark:bg-[#0A0A0A] rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.2)] overflow-hidden border border-slate-200 dark:border-white/10 flex flex-col z-10 p-6 sm:p-8 text-center ring-1 ring-slate-200 dark:ring-white/5">
          
          <div :class="['absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none', customAlert.type === 'success' ? 'bg-emerald-500/20' : 'bg-rose-500/20']"></div>

          <div :class="['w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full flex items-center justify-center mb-5 sm:mb-6 shadow-2xl relative transition-transform animate-bounce-short', customAlert.type === 'success' ? 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-500/40' : 'bg-gradient-to-br from-rose-400 to-red-500 shadow-rose-500/40']">
            <div class="absolute inset-0 rounded-full border-2 border-white/30 mix-blend-overlay"></div>
            <svg v-if="customAlert.type === 'success'" class="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
            <svg v-else class="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
          </div>

          <h3 :class="['text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight', language === 'kh' ? 'font-khmer' : 'font-sans']">
            {{ customAlert.type === 'success' ? t.dataSynced : t.errorOccurred }}
          </h3>
          <p :class="['text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 mb-6 sm:mb-8 font-khmer']">
            {{ customAlert.message }}
          </p>

          <button @click="closeAlert" :class="['w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl text-[10px] sm:text-sm font-black uppercase tracking-widest transition-all shadow-lg text-white flex items-center justify-center gap-2 hover:-translate-y-1', customAlert.type === 'success' ? 'bg-slate-900 dark:bg-white dark:text-slate-900 hover:shadow-emerald-500/25 dark:hover:bg-emerald-400' : 'bg-rose-600 hover:shadow-rose-500/25 hover:bg-rose-500', language === 'kh' ? 'font-khmer' : '']">
            {{ customAlert.type === 'success' ? t.continueToSchedule : t.tryAgain }}
          </button>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const teacher = ref(null);
const isSubmitting = ref(false);

const customAlert = ref({ show: false, type: 'success', message: '' });
let alertTimeout = null;

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
      backToSchedule: 'ត្រឡប់ទៅកាលវិភាគវិញ',
      activeSessionTracker: 'កត់ត្រាវគ្គសិក្សា',
      cohort: 'ជំនាន់',
      room: 'បន្ទប់',
      scheduledTimeblock: 'ម៉ោងសិក្សាដែលបានកំណត់',
      sessionDetails: 'ព័ត៌មានលម្អិតនៃវគ្គសិក្សា',
      week: 'សប្តាហ៍ (Week)',
      phWeek: 'ឧ. ១',
      lessonNo: 'មេរៀនទី',
      phLessonNo: 'ឧ. ១',
      date: 'កាលបរិច្ឆេទ (Date)',
      startTime: 'ម៉ោងចាប់ផ្តើម',
      endTime: 'ម៉ោងបញ្ចប់',
      autoComputedDuration: 'រយៈពេលគណនាដោយស្វ័យប្រវត្តិ',
      curriculumData: 'ទិន្នន័យកម្មវិធីសិក្សា',
      lessonContent: 'ខ្លឹមសារមេរៀន (Lesson Content)',
      phContent: 'វាយបញ្ចូលប្រធានបទដែលបានបង្រៀនថ្ងៃនេះ...',
      notes: 'ផ្សេងៗ (Notes) - ស្រេចចិត្ត',
      phNotes: 'បន្ថែមចំណាំផ្សេងៗនៅទីនេះ...',
      saveTrackingData: 'រក្សាទុកទិន្នន័យ',
      syncing: 'កំពុងបញ្ជូនទៅប្រព័ន្ធ...',
      dataSynced: 'ទិន្នន័យត្រូវបានរក្សាទុក!',
      errorOccurred: 'មានកំហុសកើតឡើង',
      continueToSchedule: 'បន្តទៅកាលវិភាគ',
      tryAgain: 'ព្យាយាមម្តងទៀត',
      alertSuccessMsg: 'មេរៀនត្រូវបានកត់ត្រាដោយជោគជ័យ!',
      alertFailMsg: 'បរាជ័យក្នុងការភ្ជាប់ទៅកាន់ប្រព័ន្ធ។ សូមពិនិត្យអ៊ីនធឺណិតរបស់អ្នក។'
    };
  }
  return {
    backToSchedule: 'Back to Schedule',
    activeSessionTracker: 'Active Session Tracker',
    cohort: 'Cohort',
    room: 'Room',
    scheduledTimeblock: 'Scheduled Timeblock',
    sessionDetails: 'Session Details',
    week: 'Week (សប្តាហ៍)',
    phWeek: 'e.g., 1',
    lessonNo: 'Lesson No',
    phLessonNo: 'e.g., 1',
    date: 'Date (ថ្ងៃខែឆ្នាំ)',
    startTime: 'Start Time',
    endTime: 'End Time',
    autoComputedDuration: 'Auto-Computed Duration',
    curriculumData: 'Curriculum Data',
    lessonContent: 'Lesson Content (ខ្លឹមសារមេរៀន)',
    phContent: 'Type the topics covered today...',
    notes: 'Notes (ផ្សេងៗ) - Optional',
    phNotes: 'Add any extra notes here...',
    saveTrackingData: 'Save Tracking Data',
    syncing: 'Syncing to Database...',
    dataSynced: 'Data Synced!',
    errorOccurred: 'Error Occurred',
    continueToSchedule: 'Continue to Schedule',
    tryAgain: 'Try Again',
    alertSuccessMsg: 'Lesson recorded successfully!',
    alertFailMsg: 'Failed to connect to the server. Please check your internet connection.'
  };
});

const classData = ref({
  subject: route.query.subject || 'Unknown Subject',
  group: route.query.group || 'Unknown',
  room: route.query.room || 'N/A',
  time: route.query.time || 'N/A',
  day: route.query.day || 'N/A',
  year: route.query.year || '?',
  semester: route.query.semester || '?',
  department: route.query.department || 'Unknown Department'
});

const getLocalDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const form = ref({
  week: '',
  date: getLocalDate(), 
  startTime: '',
  endTime: '',
  lessonNo: '',
  content: '',
  notes: ''
});

const extractGen = (groupName) => {
  if (!groupName) return '';
  const match = groupName.match(/G(\d+)/i);
  return match ? match[1] : '';
};

onMounted(async () => {
  const token = localStorage.getItem('duc_teacher_token');
  if (!token) {
    router.push('/login');
    return;
  }
  teacher.value = JSON.parse(token);

  if (classData.value.time.includes('-')) {
    const parts = classData.value.time.split('-');
    
    const formatTime = (t) => {
      if (!t) return '';
      let val = t.trim();
      const match = val.match(/(\d{1,2})[.:](\d{2})\s*(AM|PM|am|pm)?/);
      
      if (match) {
        let hours = parseInt(match[1], 10);
        const mins = match[2];
        const ampm = match[3] ? match[3].toUpperCase() : null;
        
        if (ampm === 'PM' && hours < 12) hours += 12;
        if (ampm === 'AM' && hours === 12) hours = 0;
        
        return `${hours.toString().padStart(2, '0')}:${mins}`;
      }
      return '';
    };

    form.value.startTime = formatTime(parts[0]);
    form.value.endTime = formatTime(parts[1]);
  }
});

const computedHoursStr = computed(() => {
  if (!form.value.startTime || !form.value.endTime) {
    return language.value === 'kh' ? '០ ម៉ោង ០០ នាទី' : '0 hrs 00 mins';
  }

  const start = new Date(`1970-01-01T${form.value.startTime}:00`);
  const end = new Date(`1970-01-01T${form.value.endTime}:00`);
  
  let diffMs = end - start;
  if (diffMs < 0) diffMs += 24 * 60 * 60 * 1000; 

  const diffHrs = Math.floor(diffMs / 3600000);
  const diffMins = Math.round((diffMs % 3600000) / 60000);

  const formattedMins = diffMins < 10 ? `0${diffMins}` : diffMins;

  return language.value === 'kh' 
    ? `${diffHrs} ម៉ោង ${formattedMins} នាទី`
    : `${diffHrs} hrs ${formattedMins} mins`;
});

const triggerAlert = (type, message) => {
  customAlert.value = { show: true, type, message };
  if (type === 'success') {
    alertTimeout = setTimeout(() => {
      if (customAlert.value.show) closeAlert();
    }, 2500);
  }
};

const closeAlert = () => {
  customAlert.value.show = false;
  if (alertTimeout) clearTimeout(alertTimeout);
  if (customAlert.value.type === 'success') router.push('/schedule'); 
};

const submitTrackingData = async () => {
  isSubmitting.value = true;
  
  const payload = {
    teacherNameKh: teacher.value.nameKh,
    department: classData.value.department,
    subject: classData.value.subject,
    cohort: classData.value.group,
    room: classData.value.room,
    day: classData.value.day,
    week: form.value.week,
    date: form.value.date,
    startTime: form.value.startTime,
    endTime: form.value.endTime,
    lessonNo: form.value.lessonNo,
    hours: computedHoursStr.value, 
    content: form.value.content,
    notes: form.value.notes,
    year: classData.value.year,
    semester: classData.value.semester
  };

  try {
    const res = await fetch('https://duc-teacher-tracking.onrender.com/api/track-lesson', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const data = await res.json();
    isSubmitting.value = false; 

    if (data.success) {
      localStorage.setItem('force_fresh', 'true');
      triggerAlert('success', t.value.alertSuccessMsg);
    } else {
      triggerAlert('error', data.message || 'Something went wrong.');
    }
  } catch (err) {
    isSubmitting.value = false;
    triggerAlert('error', t.value.alertFailMsg);
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;500;600;700;900&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@700;800&display=swap');

.font-sans { font-family: 'Inter', sans-serif; }
.font-khmer { font-family: 'Kantumruy Pro', sans-serif; }
.font-mono { font-family: 'JetBrains Mono', monospace; }

input[type="time"]::-webkit-calendar-picker-indicator,
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(0.5);
  cursor: pointer;
}
.dark input[type="time"]::-webkit-calendar-picker-indicator,
.dark input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

.animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-scale-enter-active, .fade-scale-leave-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.fade-scale-enter-from, .fade-scale-leave-to { opacity: 0; transform: scale(0.9) translateY(15px); }

@keyframes bounce-short {
  0% { transform: scale(0.8); opacity: 0; }
  60% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-bounce-short { animation: bounce-short 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
</style>