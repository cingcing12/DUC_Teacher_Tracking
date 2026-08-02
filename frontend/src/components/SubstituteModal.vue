<template>
  <transition name="fade-scale">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div class="bg-white dark:bg-[#1E2235] w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50 flex flex-col max-h-[90vh]">
        
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 flex justify-between items-center shrink-0">
          <div>
            <h2 class="text-white text-xl font-bold font-khmer flex items-center gap-2">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
              </svg>
              ជ្រើសរើសថ្នាក់បង្រៀនជំនួស
            </h2>
            <p class="text-blue-100 text-sm mt-1">Select a class to substitute</p>
          </div>
          <button @click="close" class="text-white hover:bg-white/20 p-2 rounded-full transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          
          <!-- Step 1: Department -->
          <div>
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 font-khmer">1. ផ្នែក / Department</label>
            <select v-model="selectedDept" @change="fetchDepartmentSchedule" class="w-full bg-slate-50 dark:bg-[#0f111a] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer">
              <option value="" disabled>-- ជ្រើសរើសផ្នែក --</option>
              <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
            </select>
            <div v-if="isLoadingDepts" class="text-xs text-blue-500 mt-2 flex items-center gap-1">
              <svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Loading departments...
            </div>
          </div>

          <!-- Step 2: Class Schedule for Today -->
          <div v-if="selectedDept">
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 font-khmer flex justify-between items-end">
              <span>2. ថ្នាក់បង្រៀន / Classes for {{ todayName }}</span>
            </label>
            
            <div v-if="isLoadingSchedule" class="py-8 text-center text-slate-500">
              <svg class="animate-spin w-8 h-8 mx-auto text-blue-500 mb-2" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Fetching schedule...
            </div>
            
            <div v-else-if="todayClasses.length === 0" class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 rounded-xl p-4 text-center text-yellow-700 dark:text-yellow-400 font-khmer">
              គ្មានថ្នាក់បង្រៀនសម្រាប់ថ្ងៃនេះទេ
            </div>

            <div v-else class="space-y-3">
              <div v-for="(cls, idx) in todayClasses" :key="idx" 
                   @click="selectClass(cls)"
                   :class="['border rounded-xl p-4 cursor-pointer transition-all', 
                            selectedClass === cls ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md ring-2 ring-blue-500/20' : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600']">
                <div class="flex justify-between items-start mb-2">
                  <h4 class="font-bold text-slate-800 dark:text-white font-khmer text-lg">{{ cls.subject }}</h4>
                  <span class="bg-slate-100 dark:bg-[#0f111a] text-slate-600 dark:text-slate-300 text-xs px-2 py-1 rounded-md font-mono border border-slate-200 dark:border-slate-700/50 shadow-sm flex items-center gap-1">
                    <svg class="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {{ cls.time }}
                  </span>
                </div>
                <div class="flex items-center gap-2 mb-2 text-sm font-khmer text-slate-500 dark:text-slate-400">
                  <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  គ្រូបង្រៀន: <span class="font-bold text-slate-700 dark:text-slate-300">{{ cls.teacherName }}</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span class="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs px-2 py-1 rounded-md font-medium">{{ cls.group }}</span>
                  <span class="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs px-2 py-1 rounded-md font-medium">{{ cls.room }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-6 bg-slate-50 dark:bg-[#1E2235] border-t border-slate-200 dark:border-slate-700/50 flex justify-end gap-3 shrink-0">
          <button @click="close" class="px-5 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            Cancel
          </button>
          <button @click="proceedToTrack" :disabled="!selectedClass" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2 shadow-lg shadow-blue-500/30 font-khmer">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
            ស្រង់វត្តមានថ្នាក់នេះ
          </button>
        </div>

      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close']);
const router = useRouter();

const departments = ref([]);
const schedule = ref([]);

const selectedDept = ref('');
const selectedClass = ref(null);

const isLoadingDepts = ref(false);
const isLoadingSchedule = ref(false);

const englishDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const todayName = computed(() => {
  const dayIndex = new Date().getDay();
  return englishDays[dayIndex];
});

const todayClasses = computed(() => {
  return schedule.value.filter(cls => 
    cls.day && cls.day.trim().toLowerCase() === todayName.value.toLowerCase()
  ).sort((a, b) => {
    const getHour = (t) => t ? parseInt(t.match(/(\d+):/)?.[1] || 99) : 99;
    return getHour(a.time) - getHour(b.time);
  });
});

const fetchDepartments = async () => {
  if (departments.value.length > 0) return;
  isLoadingDepts.value = true;
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/departments`);
    const data = await res.json();
    if (data.success) {
      departments.value = data.data;
    }
  } catch (e) {
    console.error(e);
  } finally {
    isLoadingDepts.value = false;
  }
};

const fetchDepartmentSchedule = async () => {
  schedule.value = [];
  selectedClass.value = null;
  if (!selectedDept.value) return;

  isLoadingSchedule.value = true;
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/department-schedule?department=${encodeURIComponent(selectedDept.value)}`);
    const data = await res.json();
    if (data.success) {
      schedule.value = data.data;
    }
  } catch (e) {
    console.error(e);
  } finally {
    isLoadingSchedule.value = false;
  }
};

const selectClass = (cls) => {
  selectedClass.value = cls;
};

const close = () => {
  emit('close');
  setTimeout(() => {
    selectedDept.value = '';
    selectedClass.value = null;
    schedule.value = [];
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
      substituteFor: cls.teacherName // Uses the teacherName from the schedule API
    }
  });
  close();
};

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    fetchDepartments();
  }
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; }
</style>
