<template>
  <transition name="fade-scale">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" style="background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);">
      <div class="relative w-full max-w-2xl flex flex-col max-h-[95vh] sm:max-h-[90vh]">
        <div class="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-3xl blur opacity-30 z-0 pointer-events-none"></div>

        <div class="relative bg-white dark:bg-[#151928] w-full rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200/60 dark:border-slate-700/60 flex flex-col z-10 flex-1 min-h-0">
          
          <div class="relative px-6 py-5 sm:px-8 sm:py-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#1a1e2f]/50 shrink-0">
            <div class="flex justify-between items-center relative z-10">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
                </div>
                <div>
                  <h2 class="text-xl sm:text-2xl font-black text-slate-800 dark:text-white font-khmer tracking-wide">
                    ជ្រើសរើសថ្នាក់ដើម្បីថែមម៉ោង
                  </h2>
                  <p class="text-slate-500 dark:text-slate-400 text-sm font-medium mt-0.5">Select a class for extra hours</p>
                </div>
              </div>
              <button @click="close" class="p-2.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-all focus:outline-none">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
          </div>

          <div class="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 space-y-4 bg-slate-50/30 dark:bg-[#151928]">
            <div v-if="!uniqueClasses.length" class="py-12 text-center">
              <p class="text-slate-500 dark:text-slate-400 font-khmer">មិនមានថ្នាក់បង្រៀនទេ / No classes available</p>
            </div>

            <div v-else class="space-y-3">
              <div v-for="(cls, idx) in uniqueClasses" :key="idx" 
                   @click="selectedClass = cls"
                   :class="['group relative bg-white dark:bg-[#1E2235] border rounded-2xl p-5 cursor-pointer transition-all duration-300', 
                            selectedClass === cls ? 'border-emerald-500 shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] ring-1 ring-emerald-500 scale-[1.02]' : 'border-slate-200 dark:border-slate-700/80 hover:border-emerald-400/50 hover:shadow-lg hover:-translate-y-0.5']">
                
                <div class="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3">
                  <div v-if="cls.group && cls.group !== '?'" class="flex items-center px-2.5 py-1 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-cyan-100 dark:border-cyan-500/20 shadow-sm">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    {{ cls.group }}
                  </div>
                  <div v-if="cls.department && cls.department !== '?'" class="flex items-center px-2.5 py-1 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg text-[10px] font-black font-khmer uppercase tracking-widest border border-purple-100 dark:border-purple-500/20">
                    {{ cls.department }}
                  </div>
                  <div v-if="cls.majorName && cls.majorName !== '?'" class="flex items-center px-2.5 py-1 bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 rounded-lg text-[10px] font-black font-khmer uppercase tracking-widest border border-pink-100 dark:border-pink-500/20">
                    {{ cls.majorName }}
                  </div>
                </div>

                <div class="mb-1">
                  <h4 class="font-black text-slate-800 dark:text-white font-khmer text-lg leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{{ cleanSubjectName(cls.subject) }}</h4>
                </div>

                <div v-if="selectedClass === cls" class="absolute top-4 right-4 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce-short">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
              </div>
            </div>
          </div>

          <div class="relative px-6 py-5 sm:px-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#1a1e2f]/80 backdrop-blur-md flex justify-between items-center shrink-0">
            <button @click="close" class="px-5 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all">
              Cancel
            </button>
            <button @click="proceedToTrack" :disabled="!selectedClass" class="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2 shadow-lg shadow-emerald-500/30 font-khmer">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
              ស្រង់វត្តមានថ្នាក់នេះ
            </button>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  isOpen: Boolean,
  schedule: {
    type: Array,
    default: () => []
  }
});
const emit = defineEmits(['close']);
const router = useRouter();

const selectedClass = ref(null);

const cleanSubjectName = (subject) => {
  if (!subject) return 'Unknown Subject';
  const cleaned = String(subject).replace(/\s*\(.*?\)\s*/g, '').trim();
  return cleaned || subject || 'Unknown Subject';
};

// Remove duplicates based on group and subject since a class might appear multiple times if taught on different days
const uniqueClasses = computed(() => {
  const unique = [];
  const keys = new Set();
  props.schedule.forEach(cls => {
    if (!cls.group || !cls.subject) return;
    const key = `${cls.group}-${cls.subject}`;
    if (!keys.has(key)) {
      keys.add(key);
      unique.push(cls);
    }
  });
  return unique;
});

const close = () => {
  emit('close');
  setTimeout(() => {
    selectedClass.value = null;
  }, 300);
};

const proceedToTrack = () => {
  if (!selectedClass.value) return;
  const cls = selectedClass.value;
  
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
      department: cls.department, 
      majorName: cls.majorName,
      lastWeek: cls.lastWeek,
      lastLessonNo: cls.lastLessonNo,
      isExtraClass: 'true'
    }
  });
  close();
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
.animate-bounce-short { animation: bounce-short 0.5s ease-out 1; }
@keyframes bounce-short { 
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-25%); }
}
</style>
