<template>
  <div class="relative w-full h-full p-6 md:p-10 font-sans">
    <div class="max-w-7xl mx-auto space-y-6">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-2xl p-6 rounded-3xl shadow-sm border border-white/60 dark:border-slate-700/60">
        <div>
          <h1 class="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Manage Classes</h1>
          <p class="text-slate-500 font-medium mt-1">Close finished classes to hide them from the tracking schedule.</p>
        </div>
        
        <div class="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          
          <!-- Premium Dropdown -->
          <div class="relative w-full md:w-[320px]">
            <svg class="w-5 h-5 absolute left-4 top-3.5 text-emerald-500 pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            <select v-model="selectedSheetName" class="w-full pl-11 pr-10 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/60 dark:border-slate-700/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-sm transition-all text-slate-700 dark:text-slate-300 font-khmer appearance-none cursor-pointer shadow-sm hover:shadow-md relative z-0">
              <option value="" class="font-sans">All Tracking Sheets</option>
              <option v-for="sheet in availableSheetNames" :key="sheet" :value="sheet">{{ sheet }}</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none z-10 bg-gradient-to-l from-white/90 dark:from-slate-800/90 via-white/80 dark:via-slate-800/80 to-transparent rounded-r-2xl pl-2">
                <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
            </div>
          </div>

          <div class="relative w-full md:w-64">
            <input 
              type="text" 
              v-model="searchQuery"
              placeholder="Search by subject, teacher..." 
              class="w-full pl-11 pr-4 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/60 dark:border-slate-700/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-sm transition-all text-slate-700 dark:text-slate-300 shadow-sm hover:shadow-md"
            />
            <svg class="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div v-if="isLoading" class="flex-1 flex flex-col items-center justify-center py-32">
        <div class="relative w-16 h-16 mb-6">
          <div class="absolute inset-0 rounded-full border-y-[3px] border-l-[3px] border-transparent border-t-emerald-400 border-l-emerald-400 animate-spin shadow-[0_0_15px_rgba(52,211,153,0.4)]" style="animation-duration: 1.2s;"></div>
          <div class="absolute inset-2 rounded-full border-y-[3px] border-r-[3px] border-transparent border-b-teal-500 border-r-teal-500 animate-spin shadow-[0_0_15px_rgba(20,184,166,0.4)]" style="animation-duration: 0.9s; animation-direction: reverse;"></div>
        </div>
        <p class="text-xs font-black uppercase tracking-widest animate-pulse text-emerald-600 dark:text-emerald-400">Loading Directory...</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="cls in paginatedClasses" 
          :key="cls.key"
          class="bg-white/70 dark:bg-slate-800/70 backdrop-blur-2xl rounded-3xl p-6 shadow-sm border border-white/60 dark:border-slate-700/60 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 relative overflow-hidden group"
          :class="cls.isClosed ? 'opacity-70 grayscale-[30%]' : ''"
        >
          <!-- Decorative background element for cards -->
          <div class="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>

          <div class="relative z-10">
            <div class="flex justify-between items-start mb-4">
              <span class="px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl text-[11px] font-black tracking-widest uppercase">{{ cls.cohort }}</span>
              <span 
                v-if="cls.isClosed" 
                class="px-3 py-1 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl text-[11px] font-black tracking-widest uppercase flex items-center gap-1"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                Closed
              </span>
              <span 
                v-else
                class="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl text-[11px] font-black tracking-widest uppercase flex items-center gap-1"
              >
                Open
              </span>
            </div>

            <h3 class="text-lg font-black text-slate-800 dark:text-white mb-1 font-khmer">{{ cls.subject }}</h3>
            <p class="text-sm font-bold text-slate-500 dark:text-slate-400 font-khmer flex items-center gap-2 mb-4">
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              {{ cls.teacher }}
            </p>

            <div class="flex flex-wrap gap-2 mb-6">
              <div class="px-3 py-1 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm font-khmer">{{ cls.generation }}</div>
              <div class="px-3 py-1 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm">Year {{ cls.year }}</div>
              <div class="px-3 py-1 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm">Sem {{ cls.semester }}</div>
            </div>
          </div>

          <button 
            @click="confirmToggleStatus(cls)"
            class="relative z-10 w-full py-3.5 rounded-2xl font-black text-sm transition-all duration-300 flex justify-center items-center gap-2 overflow-hidden"
            :class="cls.isClosed ? 'bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white shadow-lg shadow-slate-900/20' : 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-xl shadow-rose-500/30 hover:shadow-rose-500/50 hover:-translate-y-0.5'"
          >
            <svg v-if="cls.isToggling" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <span v-else>{{ cls.isClosed ? 'Re-open Class' : 'Close Class' }}</span>
          </button>
        </div>
      </div>
      
      <div v-if="!isLoading && filteredClasses.length === 0" class="text-center py-20 text-slate-500 font-bold">
        No classes found matching your search.
      </div>

      <!-- Smart Pagination Controls -->
      <div v-if="totalPages > 1 && !isLoading" class="flex justify-center items-center gap-2 mt-12 pb-8">
        <button 
          @click="currentPage > 1 && currentPage--" 
          :disabled="currentPage === 1"
          class="w-10 h-10 rounded-xl flex items-center justify-center bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/60 dark:border-slate-700/60 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-slate-800 hover:shadow-md text-slate-600 dark:text-slate-300"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        
        <div class="flex items-center gap-1 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/60 dark:border-slate-700/60 shadow-sm rounded-xl px-2 py-1">
          <button 
            v-for="page in visiblePages" 
            :key="page"
            @click="currentPage = page"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all"
            :class="currentPage === page ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'"
          >
            {{ page }}
          </button>
        </div>

        <button 
          @click="currentPage < totalPages && currentPage++" 
          :disabled="currentPage === totalPages"
          class="w-10 h-10 rounded-xl flex items-center justify-center bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/60 dark:border-slate-700/60 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-slate-800 hover:shadow-md text-slate-600 dark:text-slate-300"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>

    </div>

    <!-- Custom Confirmation Modal -->
    <div v-if="showConfirmModal" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="cancelToggle"></div>
      <div class="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl w-full max-w-md rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50 transform transition-all">
        <div class="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 shadow-inner"
             :class="classToConfirm?.isClosed ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-500' : 'bg-rose-100 dark:bg-rose-500/20 text-rose-500'">
          <svg v-if="!classToConfirm?.isClosed" class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          <svg v-else class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <h3 class="text-2xl font-black text-center text-slate-800 dark:text-white mb-2">
          {{ classToConfirm?.isClosed ? 'Re-open Class?' : 'Close Class?' }}
        </h3>
        <p class="text-center text-slate-500 dark:text-slate-400 mb-8 font-medium">
          Are you sure you want to {{ classToConfirm?.isClosed ? 're-open' : 'close' }} 
          <span class="font-bold text-slate-700 dark:text-slate-300 font-khmer">"{{ classToConfirm?.subject }}"</span>?
          <br/>
          <span class="text-sm mt-2 block">{{ classToConfirm?.isClosed ? 'It will reappear on the tracking schedule.' : 'It will be hidden from the tracking schedule.' }}</span>
        </p>
        <div class="flex gap-4">
          <button 
            @click="cancelToggle"
            class="flex-1 py-3.5 rounded-2xl font-bold text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 transition-colors"
          >
            Cancel
          </button>
          <button 
            @click="proceedToggleStatus"
            class="flex-1 py-3.5 rounded-2xl font-black text-sm text-white shadow-lg transition-all hover:-translate-y-0.5"
            :class="classToConfirm?.isClosed ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-blue-500/30 hover:shadow-blue-500/50' : 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-rose-500/30 hover:shadow-rose-500/50'"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>

    <!-- Custom Success Toast Notification -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
      enter-to-class="transform translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100 sm:translate-x-0"
      leave-to-class="transform translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
    >
      <div v-if="toast.show" class="fixed bottom-6 right-6 z-[110] max-w-sm w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-2xl pointer-events-auto border border-white/50 dark:border-slate-700/50 overflow-hidden">
        <div class="p-4 flex items-start gap-4">
          <div class="shrink-0">
            <svg v-if="toast.type === 'closed'" class="w-6 h-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            <svg v-else class="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
          </div>
          <div class="flex-1 pt-0.5">
            <p class="text-sm font-bold text-slate-900 dark:text-white">{{ toast.title }}</p>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400 font-khmer">{{ toast.message }}</p>
          </div>
          <button @click="toast.show = false" class="shrink-0 ml-4 flex focus:outline-none text-slate-400 hover:text-slate-500 transition-colors">
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const classes = ref([]);
const isLoading = ref(true);
const searchQuery = ref('');
const selectedSheetName = ref('');

const availableSheetNames = ref([]);

const fetchTabs = async () => {
  try {
    const res = await fetch(import.meta.env.VITE_API_URL + '/api/admin/attendance-sheet/tabs');
    const data = await res.json();
    if (data.success) {
      availableSheetNames.value = data.availableTabs.filter(t => t.includes('ជំនាន់ទី'));
    }
  } catch (error) {
    console.error("Error fetching tabs:", error);
  }
};

const fetchClasses = async () => {
  fetchTabs();
  isLoading.value = true;
  try {
    const res = await fetch(import.meta.env.VITE_API_URL + '/api/all-attendance-classes');
    const data = await res.json();
    if (data.success) {
      classes.value = data.data.map(c => ({...c, isToggling: false}));
    }
  } catch (error) {
    console.error("Error fetching classes:", error);
  } finally {
    isLoading.value = false;
  }
};

const toggleStatus = async (cls) => {
  cls.isToggling = true;
  try {
    const res = await fetch(import.meta.env.VITE_API_URL + '/api/admin/closed-classes/toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: cls.key })
    });
    const data = await res.json();
    if (data.success) {
      cls.isClosed = data.isClosed;
    }
  } catch (error) {
    console.error("Error toggling class:", error);
    alert("Failed to toggle class status.");
  } finally {
    cls.isToggling = false;
  }
};

// Pagination Logic
const currentPage = ref(1);
const itemsPerPage = 12;

watch([searchQuery, selectedSheetName], () => {
  currentPage.value = 1;
});

const totalPages = computed(() => Math.ceil(filteredClasses.value.length / itemsPerPage));

const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, 4, 5];
  if (current >= total - 2) return [total - 4, total - 3, total - 2, total - 1, total];
  return [current - 2, current - 1, current, current + 1, current + 2];
});

const paginatedClasses = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredClasses.value.slice(start, end);
});

// Modal Logic
const showConfirmModal = ref(false);
const classToConfirm = ref(null);

const confirmToggleStatus = (cls) => {
  classToConfirm.value = cls;
  showConfirmModal.value = true;
};

const cancelToggle = () => {
  showConfirmModal.value = false;
  classToConfirm.value = null;
};

const toast = ref({ show: false, title: '', message: '', type: 'closed' });
let toastTimeout = null;

const showToast = (title, message, type) => {
  if (toastTimeout) clearTimeout(toastTimeout);
  toast.value = { show: true, title, message, type };
  toastTimeout = setTimeout(() => {
    toast.value.show = false;
  }, 4000);
};

const proceedToggleStatus = async () => {
  if (!classToConfirm.value) return;
  const cls = classToConfirm.value;
  showConfirmModal.value = false;
  
  const wasClosed = cls.isClosed; // Remember state before toggling
  
  await toggleStatus(cls);
  
  // If toggled successfully
  if (cls.isClosed !== wasClosed) {
      if (cls.isClosed) {
          showToast("Class Closed", `"${cls.subject}" is now hidden from schedules.`, 'closed');
      } else {
          showToast("Class Re-opened", `"${cls.subject}" is visible on schedules again.`, 'open');
      }
  }

  classToConfirm.value = null;
};

const filteredClasses = computed(() => {
  let result = classes.value;

  if (selectedSheetName.value) {
    result = result.filter(cls => cls.attendanceTabName === selectedSheetName.value);
  }

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(c => 
      (c.subject && c.subject.toLowerCase().includes(q)) ||
      (c.teacher && c.teacher.toLowerCase().includes(q)) ||
      (c.cohort && c.cohort.toLowerCase().includes(q))
    );
  }
  // Sort by open first, then alphabetically by subject
  return result.sort((a, b) => {
    if (a.isClosed === b.isClosed) {
        return a.subject.localeCompare(b.subject);
    }
    return a.isClosed ? 1 : -1;
  });
});

onMounted(() => {
  fetchClasses();
});
</script>
