<template>
  <div class="min-h-screen bg-[#F4F7FA] dark:bg-[#050B14] font-sans text-slate-900 dark:text-slate-50 selection:bg-indigo-500 selection:text-white relative overflow-x-hidden transition-colors duration-700 flex items-center justify-center py-12">
    
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <div class="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1.5px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1.5px)] [background-size:40px_40px] opacity-[0.15] dark:opacity-[0.03] transition-opacity"></div>
      <div class="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-40 dark:opacity-20 animate-blob bg-indigo-300 dark:bg-indigo-600 transition-opacity"></div>
      <div class="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[140px] opacity-40 dark:opacity-20 animate-blob animation-delay-4000 bg-cyan-200 dark:bg-cyan-800 transition-opacity"></div>
    </div>

    <main class="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-12 animate-fade-in-up">
      
      <button @click="goBack" class="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-10 transition-colors">
        <div class="w-8 h-8 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
        </div>
        Cancel & Go Back
      </button>

      <div class="bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2.5rem] shadow-xl shadow-indigo-500/5 dark:shadow-black/50 border border-white dark:border-white/5 p-8 sm:p-12 relative overflow-hidden">
        
        <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div class="relative z-10 mb-10 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            Edit Mode
          </div>
          <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-khmer leading-tight mb-2">Update Week {{ form.week }}</h1>
          <p class="text-sm font-bold text-slate-500 dark:text-slate-400 font-mono tracking-wide">
            {{ classData.subject }} <span class="mx-2 opacity-50">•</span> {{ classData.group }}
          </p>
        </div>

        <form @submit.prevent="submitEdit" class="relative z-10 space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Lesson No</label>
              <input v-model="form.lessonNo" type="text" required class="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-4 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
            </div>
            <div>
              <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Date (ថ្ងៃខែឆ្នាំ)</label>
              <input v-model="form.date" type="date" required class="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-4 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Start Time</label>
              <input v-model="form.startTime" type="time" required class="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-4 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono">
            </div>
            <div>
              <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">End Time</label>
              <input v-model="form.endTime" type="time" required class="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-4 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono">
            </div>
          </div>

          <div>
            <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Lesson Content (ខ្លឹមសារមេរៀន)</label>
            <textarea v-model="form.content" required class="w-full min-h-[160px] bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-khmer resize-none leading-relaxed"></textarea>
          </div>

          <div>
            <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Notes (ផ្សេងៗ) - Optional</label>
            <input v-model="form.notes" type="text" class="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-4 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-khmer">
          </div>

          <button type="submit" :disabled="isSaving" class="w-full mt-4 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-3 disabled:opacity-50 hover:-translate-y-1">
            <span v-if="isSaving" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            {{ isSaving ? 'Saving Changes...' : 'Save & Update Record' }}
          </button>
        </form>

      </div>
    </main>

    <transition name="fade-scale">
      <div v-if="customAlert.show" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xl transition-opacity" @click="closeAlert"></div>

        <div class="relative w-full max-w-sm bg-white dark:bg-[#0A0A0A] rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.3)] overflow-hidden border border-slate-200 dark:border-white/10 flex flex-col z-10 p-8 text-center ring-1 ring-slate-200 dark:ring-white/5">
          
          <div :class="['absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none', customAlert.type === 'success' ? 'bg-emerald-500/20' : 'bg-rose-500/20']"></div>

          <div :class="['w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-2xl relative transition-transform animate-bounce-short', customAlert.type === 'success' ? 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-500/40' : 'bg-gradient-to-br from-rose-400 to-red-500 shadow-rose-500/40']">
            <div class="absolute inset-0 rounded-full border-2 border-white/30 mix-blend-overlay"></div>
            <svg v-if="customAlert.type === 'success'" class="w-10 h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
            <svg v-else class="w-10 h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
          </div>

          <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-2 font-sans tracking-tight">
            {{ customAlert.type === 'success' ? 'Updated!' : 'Error' }}
          </h3>
          <p class="text-sm font-bold text-slate-500 dark:text-slate-400 mb-8 font-khmer">
            {{ customAlert.message }}
          </p>

          <button @click="closeAlert" :class="['w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-lg text-white flex items-center justify-center gap-2 hover:-translate-y-1', customAlert.type === 'success' ? 'bg-slate-900 dark:bg-white dark:text-slate-900 hover:shadow-emerald-500/25 dark:hover:bg-emerald-400' : 'bg-rose-600 hover:shadow-rose-500/25 hover:bg-rose-500']">
            {{ customAlert.type === 'success' ? 'Back to History' : 'Try Again' }}
          </button>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const isSaving = ref(false);

const classData = ref({
  subject: route.query.subject || '',
  group: route.query.group || '',
  room: route.query.room || '',
  day: route.query.day || ''
});

// 🔥 FIX 1: Strict Time Formatter
// This ensures that "8:00" becomes "08:00", which HTML inputs REQUIRE.
const formatTime = (t) => {
  if (!t) return '';
  let trimmed = t.trim();
  if (trimmed.length === 4 && trimmed.indexOf(':') === 1) {
    trimmed = '0' + trimmed; 
  }
  return trimmed.substring(0, 5); // ensures we only take HH:MM
};

let initialStartTime = '';
let initialEndTime = '';

// Check if we passed a specific time through the URL
if (route.query.time) {
  const timeParts = route.query.time.split('-');
  if (timeParts.length === 2) {
    initialStartTime = formatTime(timeParts[0]);
    initialEndTime = formatTime(timeParts[1]);
  }
}

const form = ref({
  week: route.query.week || '',
  lessonNo: route.query.lessonNo || '',
  date: route.query.date || '',
  startTime: initialStartTime, 
  endTime: initialEndTime,    
  content: route.query.content || '',
  notes: route.query.notes || ''
});

const customAlert = ref({ show: false, type: 'success', message: '' });
let alertTimeout = null;

onMounted(() => {
  const theme = localStorage.getItem('theme') || 'system';
  if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

const goBack = () => {
  router.go(-1); 
};

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
  if (customAlert.value.type === 'success') {
    goBack(); 
  }
};

const submitEdit = async () => {
  isSaving.value = true;
  try {
    const token = localStorage.getItem('duc_teacher_token');
    const teacherName = token ? JSON.parse(token).nameKh || '' : '';

    const payload = {
      cohort: classData.value.group,
      subject: classData.value.subject,
      teacher: teacherName,
      week: form.value.week,
      lessonNo: form.value.lessonNo,
      date: form.value.date,
      startTime: form.value.startTime, 
      endTime: form.value.endTime,    
      content: form.value.content,
      notes: form.value.notes
    };

    const res = await fetch('https://duc-teacher-tracking.onrender.com/api/class-history', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const data = await res.json();
    if (data.success) {
      triggerAlert('success', `Week ${form.value.week} record has been successfully updated.`);
    } else {
      triggerAlert('error', data.message || "Failed to update record.");
    }
  } catch (error) {
    triggerAlert('error', "Failed to connect to the server.");
  } finally {
    isSaving.value = false;
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;500;600;700;900&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@700;800&display=swap');

.font-khmer { font-family: 'Kantumruy Pro', sans-serif; }
.font-mono { font-family: 'JetBrains Mono', monospace; }

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