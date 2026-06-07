<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" @click="close"></div>

    <!-- Modal Content: Made wider (max-w-4xl) and flex-col to allow scrolling body -->
    <div class="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-fade-in-up">
      
      <!-- Header (Sticky) -->
      <div class="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50 shrink-0">
        <div>
          <h3 class="text-xl font-black text-slate-800 dark:text-white">Edit Full Profile</h3>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Teacher Database</p>
        </div>
        <button @click="close" class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <!-- Form Body (Scrollable Area) -->
      <div class="p-8 overflow-y-auto custom-scrollbar flex-grow space-y-8">
        
        <!-- SECTION 1: PERSONAL INFORMATION -->
        <div>
          <h4 class="text-xs font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            Personal Information
          </h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 pl-2">Name (Khmer)</label>
              <input v-model="form.nameKh" type="text" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold font-khmer text-slate-800 dark:text-white transition-all">
            </div>

            <div>
              <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 pl-2">Name (English)</label>
              <input v-model="form.nameEn" type="text" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold text-slate-800 dark:text-white transition-all">
            </div>

            <div>
              <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 pl-2">Phone Number / PIN</label>
              <input v-model="form.phone" type="text" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold text-slate-800 dark:text-white transition-all">
            </div>

            <div>
              <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 pl-2">Degree</label>
              <input v-model="form.degree" type="text" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold font-khmer text-slate-800 dark:text-white transition-all">
            </div>

            <div class="md:col-span-2">
              <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 pl-2">Major Specialization</label>
              <input v-model="form.major" type="text" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold font-khmer text-slate-800 dark:text-white transition-all">
            </div>
          </div>
        </div>

        <hr class="border-slate-100 dark:border-slate-800" />

        <!-- SECTION 2: SUBJECTS & CURRICULUM -->
        <div>
          <div class="flex justify-between items-center mb-4">
            <h4 class="text-xs font-black text-cyan-500 dark:text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477-4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              Assigned Subjects
            </h4>
            <!-- Optional Add Button -->
            <button @click="addSubject" class="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4"></path></svg>
              Add Subject
            </button>
          </div>

          <div class="space-y-4">
            <div v-for="(sub, idx) in form.subjects" :key="idx" class="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 relative group shadow-sm">
              
              <!-- Delete Button -->
              <button @click="removeSubject(idx)" class="absolute -top-2 -right-2 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 p-1.5 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>

              <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
                
                <div class="md:col-span-6">
                  <label class="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5 pl-1">Subject (English)</label>
                  <input v-model="sub.eng" type="text" placeholder="e.g. Mathematics" class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-xs font-bold text-slate-800 dark:text-white transition-all">
                </div>

                <div class="md:col-span-6">
                  <label class="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5 pl-1">Subject (Khmer)</label>
                  <input v-model="sub.kh" type="text" placeholder="e.g. គណិតវិទ្យា" class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-xs font-bold font-khmer text-slate-800 dark:text-white transition-all">
                </div>

                <div class="md:col-span-3">
                  <label class="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5 pl-1">Year</label>
                  <input v-model="sub.year" type="text" placeholder="e.g. 1" class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-xs font-bold text-slate-800 dark:text-white text-center transition-all">
                </div>

                <div class="md:col-span-3">
                  <label class="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5 pl-1">Semester</label>
                  <input v-model="sub.sem" type="text" placeholder="e.g. 2" class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-xs font-bold text-slate-800 dark:text-white text-center transition-all">
                </div>

                <div class="md:col-span-3">
                  <label class="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5 pl-1">Credit</label>
                  <input v-model="sub.credit" type="text" placeholder="e.g. 3" class="w-full px-3 py-2 bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-xs font-bold text-emerald-700 dark:text-emerald-400 text-center transition-all">
                </div>

                <div class="md:col-span-3">
                  <label class="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5 pl-1">Hours</label>
                  <input v-model="sub.hour" type="text" placeholder="e.g. 45" class="w-full px-3 py-2 bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/30 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-xs font-bold text-amber-700 dark:text-amber-400 text-center transition-all">
                </div>

              </div>
            </div>

            <div v-if="!form.subjects || form.subjects.length === 0" class="text-center py-6 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
              <p class="text-sm font-bold text-slate-400">No subjects currently assigned.</p>
            </div>
          </div>
        </div>

      </div>

      <!-- Footer Actions (Sticky) -->
      <div class="px-8 py-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-end gap-3 shrink-0">
        <button @click="close" class="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">Cancel</button>
        <button @click="saveChanges" class="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2">
          Save Full Profile
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  teacherData: Object
});

const emit = defineEmits(['close', 'save']);

const form = ref({ subjects: [] });

// 🔥 DEEP COPY: Ensures we don't accidentally edit the real UI until we hit "Save"
watch(() => props.isOpen, (newVal) => {
  if (newVal && props.teacherData) {
    form.value = JSON.parse(JSON.stringify(props.teacherData));
    // Fallback if subjects array is missing
    if (!form.value.subjects) form.value.subjects = [];
  }
});

const addSubject = () => {
  form.value.subjects.push({
    eng: '',
    kh: '',
    year: '',
    sem: '',
    credit: '',
    hour: ''
  });
};

const removeSubject = (idx) => {
  form.value.subjects.splice(idx, 1);
};

const close = () => emit('close');

const saveChanges = () => {
  // Pass the deep-copied, modified object back to AdminDashboard
  emit('save', form.value);
  close();
};
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* Custom Scrollbar for the form body */
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; }
</style>