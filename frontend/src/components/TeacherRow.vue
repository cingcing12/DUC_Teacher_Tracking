<template>
  <tr class="hover:bg-slate-50/80 transition-colors group align-top">
    <td class="p-6 pl-8">
      <div class="flex items-center gap-4">
        <div class="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center text-indigo-600 font-black text-lg border border-indigo-100 shrink-0 shadow-sm">
          {{ getInitials(teacher.nameEn, teacher.nameKh) }}
        </div>
        <div>
          <p class="font-black text-slate-800 font-khmer">{{ teacher.nameKh }}</p>
          <div class="flex items-center gap-2 mt-1">
            <p class="text-[11px] font-bold text-slate-400 tracking-wider uppercase">{{ teacher.nameEn || 'N/A' }}</p>
            <span class="w-1 h-1 rounded-full bg-slate-300"></span>
            <p class="text-[10px] font-black text-indigo-500 uppercase tracking-wider">{{ teacher.degree }}</p>
          </div>
        </div>
      </div>
    </td>
    <td class="p-6">
      <div class="space-y-2">
        <span class="px-2.5 py-1 bg-slate-800 text-white text-[10px] font-bold rounded-md block w-max font-khmer shadow-sm">
          {{ teacher.classGroup }}
        </span>
        <span class="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg font-khmer block w-max shadow-sm">
          {{ teacher.major }}
        </span>
      </div>
    </td>
    <td class="p-6">
      <div v-if="teacher.displayedSubjects.length > 0" class="flex flex-col gap-2">
        <div v-for="(sub, idx) in teacher.displayedSubjects" :key="idx" class="flex items-start gap-2">
          <span class="mt-0.5 text-[9px] font-black text-cyan-700 bg-cyan-50 border border-cyan-100 px-1.5 py-0.5 rounded shadow-sm shrink-0">Y{{sub.year}}S{{sub.sem}}</span>
          <span class="text-xs font-bold text-slate-700">{{ sub.eng || sub.kh }}</span>
        </div>
      </div>
      <p v-else class="text-xs text-slate-400 italic">Unassigned</p>
    </td>
    <td class="p-6 text-right pr-8">
      <a :href="'tel:' + teacher.phone" class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:text-white hover:bg-emerald-500 transition-all shadow-sm">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
      </a>
    </td>
  </tr>
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