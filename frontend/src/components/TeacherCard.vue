<template>
  <div class="group bg-white rounded-[2rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col overflow-hidden isolate relative">
    
    <div class="absolute top-5 left-5 z-20">
      <span class="px-3 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[10px] font-black text-white uppercase tracking-wider shadow-lg font-khmer">
        {{ teacher.classGroup }}
      </span>
    </div>

    <div class="h-32 w-full relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500"></div>
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQPSI4Ij4KPHJlY3Qgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjIpIi8+Cjwvc3ZnPg==')] opacity-50"></div>
      <div class="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-white/20 blur-2xl rounded-full"></div>
    </div>
    
    <div class="px-7 relative flex justify-between items-end -mt-12 mb-5">
      <div class="h-24 w-24 rounded-3xl bg-white shadow-xl flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform duration-500">
        <div class="w-full h-full bg-slate-100 rounded-2xl flex items-center justify-center overflow-hidden">
          <img v-if="teacher.avatarUrl" :src="teacher.avatarUrl" class="w-full h-full object-cover" alt="Teacher Avatar" />
          <span v-else class="text-indigo-700 font-black text-3xl">{{ getInitials(teacher.nameEn, teacher.nameKh) }}</span>
        </div>
      </div>
      <a :href="'tel:' + teacher.phone" class="mb-2 bg-slate-900 text-white p-3 rounded-full hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/40 transition-all duration-300 cursor-pointer group-hover:-translate-y-1">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
      </a>
    </div>
    
    <div class="px-7 flex-grow flex flex-col">
      <h3 class="text-2xl font-black text-slate-800 font-khmer leading-tight mb-1 group-hover:text-indigo-600 transition-colors">{{ teacher.nameKh }}</h3>
      <p class="text-xs font-bold text-slate-400 tracking-widest uppercase mb-5">{{ teacher.nameEn || 'N/A' }}</p>

      <div class="flex flex-wrap gap-2 mb-6">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600">
          {{ teacher.degree }}
        </span>
        <span class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-600">
          {{ teacher.gender || 'U' }}
        </span>
      </div>

      <div class="mb-6">
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Major Specialization</p>
        <p class="font-khmer text-slate-800 font-bold text-sm">{{ teacher.major }}</p>
      </div>

      <div class="bg-slate-50 p-5 rounded-2xl border border-slate-100 mt-auto mb-5">
        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center justify-between">
          Subjects Taught
          <span class="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full text-[10px]">{{ teacher.displayedSubjects.length }}</span>
        </p>
        
        <div v-if="teacher.displayedSubjects.length > 0" class="max-h-40 overflow-y-auto custom-scrollbar pr-2 space-y-3">
          <div v-for="(sub, idx) in teacher.displayedSubjects" :key="idx" class="flex gap-3 relative">
            <div class="mt-1 w-2 h-2 rounded-full bg-cyan-400 ring-4 ring-cyan-100 shrink-0 relative z-10"></div>
            <div v-if="idx !== teacher.displayedSubjects.length - 1" class="absolute left-[3px] top-4 bottom-[-16px] w-0.5 bg-slate-200 z-0"></div>
            
            <div class="pb-1">
              <p v-if="sub.eng" class="text-sm font-bold text-slate-800 leading-tight">{{ sub.eng }}</p>
              <p v-if="sub.kh" class="text-xs text-slate-500 font-khmer mt-1">{{ sub.kh }}</p>
              <span class="inline-block mt-1.5 px-2 py-0.5 bg-white border border-slate-200 text-slate-400 text-[9px] font-black rounded uppercase tracking-wider shadow-sm">
                Year {{ sub.year }} • Sem {{ sub.sem }}
              </span>
            </div>
          </div>
        </div>
        <p v-else class="text-xs text-slate-400 italic">No classes in this timeframe</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  teacher: {
    type: Object,
    required: true
  }
});

const getInitials = (nameEn, nameKh) => {
  if (nameEn && nameEn !== 'N/A') return nameEn.charAt(0).toUpperCase();
  if (nameKh) return nameKh.charAt(0);
  return '?';
};
</script>