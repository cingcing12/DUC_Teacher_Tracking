<template>
  <div class="h-full print:h-auto flex flex-col print:block p-6 print:p-0 overflow-hidden print:overflow-visible">
    <!-- Header Section (Hidden on Print) -->
    <div class="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-6 flex-shrink-0 animate-fade-in-down print:hidden">
      <div>
        <h1 class="text-3xl font-black text-slate-800 dark:text-white tracking-tight drop-shadow-sm flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          Attendance Sheet Master
        </h1>
        <p class="text-slate-500 dark:text-slate-400 font-medium mt-1">Live sync with Google Sheets</p>
      </div>

      <div class="flex flex-wrap items-center gap-4">
        <!-- Sheet Selector -->
        <div class="flex items-center gap-3 bg-white dark:bg-slate-800 p-2 pl-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <label class="text-sm font-bold text-slate-600 dark:text-slate-300">Sheet:</label>
          <select v-model="selectedTab" @change="fetchSheetData" class="px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-khmer text-sm font-bold text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all min-w-[200px] max-w-[250px] truncate">
            <option v-for="tab in availableTabs" :key="tab" :value="tab">{{ tab }}</option>
          </select>
        </div>

        <!-- Month Selector -->
        <div class="flex items-center gap-2">
          <label class="text-sm font-bold text-slate-600 dark:text-slate-300">Month:</label>
          <select v-model="selectedMonth" class="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-khmer font-bold text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-all min-w-[120px]">
            <option v-for="month in availableMonths" :key="month" :value="month">{{ month }}</option>
          </select>
        </div>
        
        <!-- Refresh Button -->
        <button @click="fetchSheetData" class="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20 transition-colors">
          <svg class="w-5 h-5" :class="{ 'animate-spin': loading }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        </button>
      </div>
    </div>

    <div v-if="loading" class="flex-1 flex flex-col items-center justify-center print:hidden">
      <div class="relative w-16 h-16 mb-6">
        <div class="absolute inset-0 rounded-full border-y-[3px] border-l-[3px] border-transparent border-t-cyan-400 border-l-cyan-400 animate-spin shadow-[0_0_15px_rgba(34,211,238,0.4)]" style="animation-duration: 1.2s;"></div>
        <div class="absolute inset-2 rounded-full border-y-[3px] border-r-[3px] border-transparent border-b-indigo-500 border-r-indigo-500 animate-spin shadow-[0_0_15px_rgba(99,102,241,0.4)]" style="animation-duration: 0.9s; animation-direction: reverse;"></div>
      </div>
      <p class="text-xs font-black uppercase tracking-widest animate-pulse text-indigo-600 dark:text-indigo-400">Syncing with Google Sheets...</p>
    </div>

    <div v-else-if="error" class="flex-1 flex items-center justify-center print:hidden">
      <div class="bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 p-6 rounded-2xl border border-rose-200 dark:border-rose-500/30 max-w-lg text-center">
        <svg class="w-12 h-12 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h3 class="font-bold text-lg mb-2">Sync Failed</h3>
        <p>{{ error }}</p>
      </div>
    </div>

    <div v-else class="flex-1 flex flex-col lg:flex-row gap-8 min-h-0 print:hidden pb-2">
      <!-- Main Table Area -->
      <div class="flex-[3] flex flex-col bg-white dark:bg-slate-800 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.4)] border border-slate-200/50 dark:border-slate-700/50 overflow-hidden relative animate-fade-in-up">
        
        <div class="overflow-auto custom-scrollbar flex-1 p-2">
          <table class="w-full text-left border-collapse min-w-max">
            <thead>
              <tr class="sticky top-0 z-20 bg-slate-100 dark:bg-slate-900 shadow-sm">
                <th class="px-4 py-3 text-xs font-black uppercase tracking-wider text-slate-500 border-b border-r border-slate-200 dark:border-slate-700 sticky left-0 z-30 bg-slate-100 dark:bg-slate-900 w-12 text-center">No.</th>
                <th class="px-4 py-3 text-xs font-black uppercase tracking-wider text-slate-500 border-b border-r border-slate-200 dark:border-slate-700 sticky left-[48px] z-30 bg-slate-100 dark:bg-slate-900">Time</th>
                <th class="px-4 py-3 text-xs font-black uppercase tracking-wider text-slate-500 border-b border-r border-slate-200 dark:border-slate-700">Subject</th>
                <th class="px-4 py-3 text-xs font-black uppercase tracking-wider text-slate-500 border-b border-r border-slate-200 dark:border-slate-700">Teacher</th>
                <th class="px-4 py-3 text-xs font-black uppercase tracking-wider text-slate-500 border-b border-r border-slate-200 dark:border-slate-700">Class</th>
                <th class="px-4 py-3 text-xs font-black uppercase tracking-wider text-slate-500 border-b border-r border-slate-200 dark:border-slate-700">DUC</th>
                <th v-for="(col, idx) in selectedMonthColumns" :key="idx" class="px-4 py-3 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-slate-200 dark:border-slate-700 text-center min-w-[60px] bg-indigo-50/50 dark:bg-indigo-900/20">
                  W{{ idx + 1 }}
                </th>
              </tr>
            </thead>
            <tbody class="text-sm font-khmer">
              <template v-for="(group, dayIndex) in filteredDataByDay" :key="dayIndex">
                <!-- Day Header Row with Dates -->
                <tr class="bg-indigo-100 dark:bg-indigo-900/40 border-y border-indigo-200 dark:border-indigo-800">
                  <td colspan="6" class="px-4 py-2.5 font-black text-indigo-800 dark:text-indigo-200">
                    {{ group.dayName }}
                  </td>
                  <td v-for="colIdx in selectedMonthColumns" :key="'date-'+colIdx" class="px-2 py-2.5 text-center font-black text-indigo-700 dark:text-indigo-300">
                    {{ group.dates[colIdx] || '-' }}
                  </td>
                </tr>
                
                <!-- Data Rows -->
                <tr v-for="(row, rIndex) in group.rows" :key="rIndex" class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td class="px-4 py-2 border-b border-r border-slate-100 dark:border-slate-700/50 text-slate-400 text-center sticky left-0 z-10 bg-white dark:bg-slate-800 group-hover:bg-slate-50 dark:group-hover:bg-slate-800/80">{{ row.no }}</td>
                  <td class="px-4 py-2 border-b border-r border-slate-100 dark:border-slate-700/50 font-sans text-slate-600 dark:text-slate-300 sticky left-[48px] z-10 bg-white dark:bg-slate-800 group-hover:bg-slate-50 dark:group-hover:bg-slate-800/80">{{ row.time }}</td>
                  <td class="px-4 py-2 border-b border-r border-slate-100 dark:border-slate-700/50 font-bold text-slate-700 dark:text-slate-200">{{ row.subject }}</td>
                  <td class="px-4 py-2 border-b border-r border-slate-100 dark:border-slate-700/50 text-slate-600 dark:text-slate-300">{{ row.teacher }}</td>
                  <td class="px-4 py-2 border-b border-r border-slate-100 dark:border-slate-700/50 font-bold text-slate-600 dark:text-slate-300">{{ row.className }}</td>
                  <td class="px-4 py-2 border-b border-r border-slate-100 dark:border-slate-700/50 font-sans font-bold text-slate-500">{{ row.classCode }}</td>
                  
                  <td v-for="(status, cIndex) in row.attendance" :key="cIndex" 
                      class="px-2 py-2 border-b border-slate-100 dark:border-slate-700/50 text-center font-sans font-black transition-all"
                      :class="{
                        'text-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10': isVerifyStatus(String(status).trim().toUpperCase()),
                        'text-amber-500 bg-amber-50/50 dark:bg-amber-500/10': String(status).trim().toUpperCase() === 'P',
                        'text-rose-600 bg-rose-100 dark:bg-rose-900/40 border border-rose-200 dark:border-rose-800': String(status).trim().toUpperCase() === 'A',
                        'text-slate-300': !String(status).trim() || String(status).trim().toUpperCase() === 'FALSE' || String(status).trim() === '-'
                      }">
                    <template v-if="isVerifyStatus(String(status).trim().toUpperCase())">
                      <svg class="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                    </template>
                    <template v-else>
                      {{ (String(status).trim().toUpperCase() === 'FALSE' ? '-' : String(status).trim().toUpperCase()) || '-' }}
                    </template>
                  </td>
                </tr>
              </template>
              
              <tr v-if="filteredDataByDay.length === 0">
                <td :colspan="6 + selectedMonthColumns.length" class="px-4 py-12 text-center text-slate-400 font-bold">
                  No data found for this month.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Summary Panel -->
      <div class="w-full lg:w-96 flex-shrink-0 flex flex-col min-h-0 bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div class="p-6 border-b border-slate-100 dark:border-slate-700/50 flex-shrink-0">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="p-2.5 rounded-xl transition-colors" :class="statusStyles[selectedStatusFilter]?.bg || 'bg-slate-100 dark:bg-slate-700'">
                <component :is="statusStyles[selectedStatusFilter]?.icon || 'div'" class="w-6 h-6" :class="statusStyles[selectedStatusFilter]?.text || 'text-slate-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="!statusStyles[selectedStatusFilter]?.icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </component>
              </div>
              <h2 class="text-xl font-black text-slate-800 dark:text-white" :class="statusStyles[selectedStatusFilter]?.text || ''">
                {{ selectedStatusFilter === 'A' ? 'Absences (A)' : `Status: ${formatStatusName(selectedStatusFilter)}` }}
              </h2>
            </div>
            <button @click="printReport" class="p-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl transition-all shadow-sm active:scale-95" title="Export PDF">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            </button>
          </div>
          
          <!-- Status Filter Pills -->
          <div class="flex flex-wrap gap-2 mb-4">
            <button 
              v-for="status in availableStatuses" 
              :key="status"
              @click="selectedStatusFilter = status"
              class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all border"
              :class="selectedStatusFilter === status 
                ? (statusStyles[status]?.activeClass || 'bg-slate-500 text-white border-slate-500') 
                : 'bg-transparent text-slate-500 border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600'"
            >
              {{ formatStatusName(status) }}
            </button>
          </div>

          <!-- Teacher Dropdown -->
          <div class="relative mb-3">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </div>
            <select 
              v-model="searchQuery" 
              class="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-khmer appearance-none cursor-pointer"
            >
              <option value="">All Teachers</option>
              <option v-for="teacher in uniqueTeachers" :key="teacher" :value="teacher">
                {{ teacher }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          <p class="text-sm font-bold text-slate-500 dark:text-slate-400">
            {{ filteredRecords.length }} records found in <span class="text-slate-700 dark:text-slate-300">{{ selectedMonth }}</span>
          </p>
        </div>

        <div class="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50 dark:bg-slate-800/50 custom-scrollbar">
          <template v-if="filteredRecords.length > 0">
            <div v-for="(record, idx) in filteredRecords" :key="idx" class="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
              <div class="absolute top-0 left-0 w-1 h-full transition-colors" :class="statusStyles[selectedStatusFilter]?.border || 'bg-slate-400'"></div>
              <div class="flex justify-between items-start mb-2 pl-2">
                <h3 class="font-bold text-slate-800 dark:text-white font-khmer">{{ record.teacher }}</h3>
                <span class="text-xs font-black px-2 py-1 rounded-md" :class="statusStyles[selectedStatusFilter]?.badge || 'bg-slate-100 text-slate-600'">
                  DATE: {{ record.date }}
                </span>
              </div>
              <p class="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 pl-2">{{ record.subject }}</p>
              <div class="flex items-center gap-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-2">
                <span>{{ record.className }}</span>
                <span>•</span>
                <span>{{ record.classCode }}</span>
                <span>•</span>
                <span>{{ record.time }}</span>
              </div>
            </div>
          </template>
          <div v-else class="h-full flex flex-col items-center justify-center text-center opacity-60">
            <div class="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 class="text-lg font-black text-slate-800 dark:text-white mb-1">All clear!</h3>
            <p class="text-sm font-bold text-slate-500 dark:text-slate-400">No {{ formatStatusName(selectedStatusFilter) }} records for this month.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 🖨️ PREMIUM PRINT VIEW (ONLY VISIBLE ON PRINT) -->
    <div class="hidden print:block w-full max-w-5xl mx-auto bg-white min-h-screen pt-8">
      
      <!-- Official Header -->
      <div class="mb-8">
        <div class="flex justify-between items-start relative">
          <!-- Left: University Name -->
          <div class="text-center pt-20">
            <h1 class="text-[15px] text-slate-900 mb-1" style="font-family: 'Moul', serif;">សាកលវិទ្យាល័យឌីជីថលកម្ពុជា</h1>
            <h2 class="text-[9px] font-black text-slate-900 uppercase tracking-widest">Digital University of Cambodia</h2>
          </div>
          
          <!-- Center: Kingdom of Cambodia -->
          <div class="text-center absolute left-1/2 -translate-x-1/2">
            <h1 class="text-lg text-slate-900 mb-1" style="font-family: 'Moul', serif;">ព្រះរាជាណាចក្រកម្ពុជា</h1>
            <h1 class="text-slate-900" style="font-family: 'Moul', serif;">ជាតិ សាសនា ព្រះមហាក្សត្រ</h1>
            <!-- Decorative line -->
            <div class="flex items-center justify-center mt-2">
              <span class="font-tacteing text-[28px] text-slate-900" style="line-height: 1;">3</span>
            </div>
          </div>
        </div>

        <!-- Report Title & Filters -->
        <div class="text-center mt-16 pb-2">
           <h2 class="text-[17px] text-slate-900 mb-3" style="font-family: 'Moul', serif;">
             {{ selectedTab }}
           </h2>
           <h3 class="text-[15px] tracking-widest uppercase text-slate-900 mb-4" style="font-family: 'Moul', serif;">
              របាយការណ៍ / Report: {{ formatStatusName(selectedStatusFilter) }}
           </h3>
           <div class="flex justify-center items-center gap-10 text-slate-800 text-[13px]" style="font-family: 'Moul', serif;">
             <span class="flex items-center gap-2">ខែ ៖ <span class="text-slate-900">{{ selectedMonth }}</span></span>
             <span v-if="searchQuery" class="flex items-center gap-2">គ្រូបង្រៀន ៖ <span class="text-slate-900">{{ searchQuery }}</span></span>
             <span class="flex items-center gap-2">សរុប ៖ <span class="text-slate-900">{{ filteredRecords.length }}</span></span>
           </div>
        </div>
      </div>

      <div class="mt-8 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-900 text-white text-[11px] uppercase tracking-widest font-black">
              <th class="px-5 py-4 border-b-4 border-slate-900 text-center w-12">No.</th>
              <th v-if="!searchQuery" class="px-5 py-4 border-b-4 border-slate-900">Teacher</th>
              <th class="px-5 py-4 border-b-4 border-slate-900">Subject</th>
              <th class="px-5 py-4 border-b-4 border-slate-900">Class</th>
              <th class="px-5 py-4 border-b-4 border-slate-900 text-center">DUC</th>
              <th class="px-5 py-4 border-b-4 border-slate-900 text-center">Time</th>
              <th class="px-5 py-4 border-b-4 border-slate-900 text-center">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, idx) in filteredRecords" :key="'print-tbl-'+idx" class="border-b border-slate-200/80 text-sm even:bg-slate-50 transition-colors" style="page-break-inside: avoid;">
              <td class="px-5 py-4 text-slate-400 font-black text-center">{{ idx + 1 }}</td>
              <td v-if="!searchQuery" class="px-5 py-4 font-black text-slate-900 font-khmer text-[15px]">{{ record.teacher }}</td>
              <td class="px-5 py-4 font-bold text-slate-700">{{ record.subject }}</td>
              <td class="px-5 py-4 font-bold">
                <span class="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs tracking-wider border border-slate-200 inline-block">{{ record.className }}</span>
              </td>
              <td class="px-5 py-4 font-bold text-center">
                <span class="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-xs tracking-widest border border-indigo-100 inline-block">{{ record.classCode }}</span>
              </td>
              <td class="px-5 py-4 font-black text-slate-600 text-center whitespace-nowrap">{{ record.time }}</td>
              <td class="px-5 py-4 font-black text-center whitespace-nowrap">
                <div class="inline-flex items-center justify-center px-3 min-w-[36px] h-9 rounded-full border-[2.5px] bg-white shadow-sm" :class="statusStyles[selectedStatusFilter]?.text ? statusStyles[selectedStatusFilter].text + ' ' + (statusStyles[selectedStatusFilter]?.border || 'border-slate-200') : 'text-slate-800 border-slate-200'">
                  {{ record.date }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="filteredRecords.length === 0" class="text-center py-20 text-slate-400 font-black text-2xl uppercase tracking-widest">
        No records found.
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const rawRows = ref([]);
const currentTabTitle = ref('');
const availableTabs = ref([]);
const selectedTab = ref('');
const loading = ref(true);
const error = ref(null);

const availableMonths = ref([]);
const selectedMonth = ref('');
const selectedStatusFilter = ref('A');
const searchQuery = ref('');

// Core parsed data structures
const monthMap = ref({}); // { colIndex: 'MonthName' }
const parsedDayBlocks = ref([]); // [{ dayName: '...', dates: {colIndex: date}, rows: [...] }]

// Styles for different statuses
const statusStyles = {
  'A': {
    bg: 'bg-rose-100 dark:bg-rose-500/20',
    text: 'text-rose-500',
    border: 'bg-rose-400 dark:bg-rose-500',
    badge: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
    activeClass: 'bg-rose-500 text-white border-rose-500',
    icon: { template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>` }
  },
  'P': {
    bg: 'bg-amber-100 dark:bg-amber-500/20',
    text: 'text-amber-500',
    border: 'bg-amber-400 dark:bg-amber-500',
    badge: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    activeClass: 'bg-amber-500 text-white border-amber-500',
    icon: { template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>` }
  },
  'VERIFY': {
    bg: 'bg-emerald-100 dark:bg-emerald-500/20',
    text: 'text-emerald-500',
    border: 'bg-emerald-400 dark:bg-emerald-500',
    badge: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    activeClass: 'bg-emerald-500 text-white border-emerald-500',
    icon: { template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>` }
  }
};

const formatStatusName = (status) => {
  if (status === 'VERIFY') return 'Verify (Checked)';
  if (status === 'A') return 'Absent (A)';
  if (status === 'P') return 'Permission (P)';
  return status;
};

const isVerifyStatus = (s) => {
  if (!s || s === 'FALSE' || s === '-' || s === 'A' || s === 'P') return false;
  return true; // Any other non-empty string is considered a checkmark/verify
};

const fetchSheetData = async () => {
  loading.value = true;
  error.value = null;
  try {
    const url = new URL(`${import.meta.env.VITE_API_URL}/api/admin/attendance-sheet`);
    if (selectedTab.value) {
      url.searchParams.append('tab', selectedTab.value);
    }
    const res = await fetch(url.toString());
    const data = await res.json();
    if (data.success) {
      rawRows.value = data.data;
      currentTabTitle.value = data.tabTitle;
      availableTabs.value = data.availableTabs || [];
      if (!selectedTab.value) {
        selectedTab.value = data.tabTitle;
      }
      selectedMonth.value = ''; // Reset month so it picks a valid one for the new sheet
      processSheetData();
    } else {
      error.value = data.message || "Failed to load sheet data.";
    }
  } catch (err) {
    error.value = "Network error. Make sure the backend is running.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const normalizeText = (str) => String(str || "").replace(/[\s\u200B-\u200D\uFEFF]/g, '').toLowerCase();

const processSheetData = () => {
  if (!rawRows.value || rawRows.value.length < 8) return;

  // 1. Find the Month Row (usually around row 5-7, 0-indexed)
  let monthRowIndex = -1;
  const khmerMonths = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];
  
  for (let r = 0; r < 8; r++) {
    const row = rawRows.value[r];
    if (row && row.some(cell => khmerMonths.some(m => normalizeText(cell).includes(normalizeText(m))))) {
      monthRowIndex = r;
      break;
    }
  }

  // 2. Build Month Map & Available Months
  const tempMonthMap = {};
  const foundMonths = new Set();
  
  if (monthRowIndex !== -1) {
    let currentMonth = "";
    const monthRow = rawRows.value[monthRowIndex];
    for (let c = 6; c < Math.max(monthRow.length, 50); c++) {
      const cellVal = String(monthRow[c] || "").trim();
      if (cellVal !== "") {
        const isMonth = khmerMonths.some(m => normalizeText(cellVal).includes(normalizeText(m)));
        if (isMonth) {
          currentMonth = cellVal;
          foundMonths.add(currentMonth);
        } else {
          currentMonth = ""; // Reset if we hit a non-empty cell that is not a month (like "ថ្នាក់")
        }
      }
      if (currentMonth) {
        tempMonthMap[c] = currentMonth;
      }
    }
  }
  
  monthMap.value = tempMonthMap;
  availableMonths.value = Array.from(foundMonths);
  
  // Select first month automatically if not selected
  if (availableMonths.value.length > 0 && !selectedMonth.value) {
    selectedMonth.value = availableMonths.value[availableMonths.value.length - 1]; // Default to latest
  }

  // 3. Parse Day Blocks & Dates
  const tempBlocks = [];
  let currentBlock = null;
  
  // Scan for actual data
  for (let r = 6; r < rawRows.value.length; r++) {
    const row = rawRows.value[r];
    if (!row) continue;

    const checkStr = normalizeText(row[0]) + normalizeText(row[1]) + normalizeText(row[2]);
    const isDayHeader = checkStr.includes("ថ្ងៃ") || /monday|tuesday|wednesday|thursday|friday|saturday|sunday/i.test(checkStr);

    if (isDayHeader) {
      if (currentBlock) tempBlocks.push(currentBlock);
      
      const blockDates = {};
      // Dates are embedded in the day header row
      for (let c = 6; c < 50; c++) {
         const dateVal = String(row[c] || "").trim();
         if (dateVal && !isNaN(parseInt(dateVal))) {
             blockDates[c] = dateVal;
         }
      }

      currentBlock = {
        dayName: String(row[0] || row[1] || row[2] || "Unknown Day").trim(),
        dates: blockDates,
        rows: []
      };
      continue;
    }

    // It's a data row if it has a teacher and subject
    const subject = String(row[2] || "").trim();
    const teacher = String(row[3] || "").trim();
    
    if (subject && teacher && currentBlock) {
      // Store ALL data, we will filter by month in computed property
      currentBlock.rows.push({
        no: String(row[0] || "").trim(),
        time: String(row[1] || "").trim(),
        subject: subject,
        teacher: teacher,
        classCode: String(row[4] || "").trim(),
        major: String(row[5] || "").trim(),
        className: String(row[6] || "").trim(),
        rawRowData: row // Keep full row to extract attendance later based on selected month columns
      });
    }
  }
  
  if (currentBlock) tempBlocks.push(currentBlock);
  parsedDayBlocks.value = tempBlocks;
};

// --- COMPUTED: Filtered Data based on Selection ---

// Get the column indices that belong to the selected month
const selectedMonthColumns = computed(() => {
  const cols = [];
  if (!selectedMonth.value) return cols;
  
  // We determine a column belongs to a month if it is in the monthMap
  // AND at least one block has a date for this column.
  for (const [colIndex, monthName] of Object.entries(monthMap.value)) {
    if (monthName === selectedMonth.value) {
      // Check if any block has a date for this column to confirm it's an active column
      const hasDate = parsedDayBlocks.value.some(b => b.dates[colIndex]);
      if (hasDate) {
        cols.push(parseInt(colIndex));
      }
    }
  }
  return cols;
});

// The final filtered structure to render
const filteredDataByDay = computed(() => {
  if (selectedMonthColumns.value.length === 0) return [];
  
  return parsedDayBlocks.value.map(block => {
    const rowsWithAttendance = block.rows.map(row => {
      const attendanceStatuses = selectedMonthColumns.value.map(colIdx => {
        return String(row.rawRowData[colIdx] || "").trim();
      });
      return { ...row, attendance: attendanceStatuses };
    });
    return { dayName: block.dayName, dates: block.dates, rows: rowsWithAttendance };
  }).filter(block => block.rows.length > 0);
});

// Find all available statuses
const availableStatuses = computed(() => {
  return ['A', 'P', 'VERIFY'];
});

// Extract unique teachers for the dropdown
const uniqueTeachers = computed(() => {
  const teachers = new Set();
  filteredDataByDay.value.forEach(block => {
    block.rows.forEach(row => {
      if (row.teacher) {
        let hasMatch = false;
        row.attendance.forEach(status => {
          const s = String(status).trim().toUpperCase();
          if (selectedStatusFilter.value === 'A' && s === 'A') hasMatch = true;
          if (selectedStatusFilter.value === 'P' && s === 'P') hasMatch = true;
          if (selectedStatusFilter.value === 'VERIFY' && isVerifyStatus(s)) hasMatch = true;
        });
        
        if (hasMatch) {
          teachers.add(row.teacher);
        }
      }
    });
  });
  return Array.from(teachers).sort();
});

// Keep current teacher if they still have records, otherwise reset to 'All Teachers'
watch(uniqueTeachers, (newTeachers) => {
  if (searchQuery.value && !newTeachers.includes(searchQuery.value)) {
    searchQuery.value = '';
  }
});

// Find records matching selected filter and group by class
const filteredRecords = computed(() => {
  const grouped = new Map();
  filteredDataByDay.value.forEach(block => {
    block.rows.forEach(row => {
      // Filter by teacher dropdown
      if (searchQuery.value && row.teacher !== searchQuery.value) {
        return; // Skip this row if it doesn't match the selected teacher
      }

      row.attendance.forEach((status, idx) => {
        const s = String(status).trim().toUpperCase();
        
        let matches = false;
        if (selectedStatusFilter.value === 'A' && s === 'A') matches = true;
        if (selectedStatusFilter.value === 'P' && s === 'P') matches = true;
        if (selectedStatusFilter.value === 'VERIFY' && isVerifyStatus(s)) matches = true;

        if (matches) {
          const colIdx = selectedMonthColumns.value[idx];
          const dateStr = String(block.dates[colIdx] || '?').trim();
          
          const key = `${row.teacher}|${row.subject}|${row.className}|${row.classCode}|${row.time}`;
          
          if (!grouped.has(key)) {
            grouped.set(key, {
              teacher: row.teacher,
              subject: row.subject,
              time: row.time,
              classCode: row.classCode,
              className: row.className,
              dates: [dateStr]
            });
          } else {
            const existing = grouped.get(key);
            if (!existing.dates.includes(dateStr)) {
              existing.dates.push(dateStr);
            }
          }
        }
      });
    });
  });
  
  return Array.from(grouped.values()).map(record => {
    // Sort dates numerically
    const sortedDates = record.dates.sort((a, b) => {
      const numA = parseInt(a);
      const numB = parseInt(b);
      if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
      return a.localeCompare(b);
    });
    
    return {
      ...record,
      date: sortedDates.join(', ')
    };
  });
});

const printReport = () => {
  let style = document.getElementById('print-page-style');
  if (!style) {
    style = document.createElement('style');
    style.id = 'print-page-style';
    document.head.appendChild(style);
  }
  // Force landscape orientation, overriding any other global view styles
  style.innerHTML = `@page { size: landscape !important; margin: 1cm !important; }`;
  
  // Wait briefly for the browser to apply the style before opening the print dialog
  setTimeout(() => {
    window.print();
  }, 100);
};

onMounted(() => {
  fetchSheetData();
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; border: 2px solid transparent; background-clip: content-box; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #475569; }

.animate-fade-in-down { animation: fadeInDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.animate-fade-in-left { animation: fadeInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

/* Load the local Tacteing font from the public folder to bypass Vite cache */
@font-face {
  font-family: 'Tacteing';
  src: url('/Tacteing.ttf') format('truetype');
}
.font-tacteing { font-family: 'Tacteing', sans-serif; }
</style>
