<template>
  <div class="min-h-screen bg-[#F4F7FA] dark:bg-[#0B1120] font-sans text-slate-800 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-500">
    
    <header class="relative bg-slate-900 pt-16 pb-32 overflow-hidden isolate">
      <div class="absolute top-0 right-0 -mr-20 -mt-20 w-[40rem] h-[40rem] bg-indigo-600 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse-slow"></div>
      <div class="absolute bottom-0 left-10 w-[30rem] h-[30rem] bg-cyan-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-30 mask-image:linear-gradient(to_bottom,white,transparent)"></div>
      
      <div class="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-6">
          <div class="w-20 h-20  from-indigo-500 via-purple-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl">
            <img src="../assets/DUC.png" class="w-20 h-20 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></img>
          </div>
          <div>
            <h1 class="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg">Digital University</h1>
            <p class="text-indigo-200 font-khmer font-medium tracking-wider mt-2 flex items-center gap-3 text-lg opacity-90">
              <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping-slow shadow-[0_0_10px_#22d3ee]"></span>
              ប្រព័ន្ធគ្រប់គ្រងទិន្នន័យសាស្ត្រាចារ្យ
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3 flex-wrap">
          <button @click="router.push('/admin/tracking')" class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 backdrop-blur-md text-white px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all hover:scale-105 shadow-[0_10px_20px_-10px_rgba(79,70,229,0.6)]">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            Tracking Center
          </button>

          <button @click="router.push('/admin/system-mappings')" class="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all hover:scale-105 shadow-lg">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            System Setup
          </button>

          <button @click="router.push('/admin/settings')" class="flex items-center justify-center p-3 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white rounded-2xl transition-all hover:scale-105 shadow-lg hover:rotate-90">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </button>
        </div>

      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 -mt-16 relative z-20 pb-24">
      
      <section class="mb-10">
        <div v-if="isLoadingDepartments" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="i in 3" :key="i" class="h-32 bg-white/60 dark:bg-slate-800/60 backdrop-blur rounded-3xl animate-pulse border border-white/50 dark:border-white/5"></div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button 
            v-for="(dept, index) in departments" 
            :key="dept"
            @click="selectDepartment(dept)"
            :class="[
              'group relative flex items-center p-6 rounded-3xl font-khmer text-left transition-all duration-500 overflow-hidden',
              activeDepartment === dept ? 'bg-white dark:bg-slate-800 shadow-[0_20px_40px_-15px_rgba(79,70,229,0.3)] transform -translate-y-2 ring-2 ring-indigo-500' : 'bg-white/70 dark:bg-slate-800/40 backdrop-blur-xl shadow-sm hover:shadow-xl hover:bg-white dark:hover:bg-slate-800 hover:-translate-y-1 border border-white dark:border-white/5'
            ]"
          >
            <div :class="`w-16 h-16 rounded-2xl flex items-center justify-center mr-5 shrink-0 transition-transform duration-500 group-hover:scale-110 shadow-lg ${getColorClass(index)}`">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>
            
            <div class="flex-grow z-10">
              <h3 :class="['font-bold text-lg leading-snug transition-colors', activeDepartment === dept ? 'text-indigo-900 dark:text-white' : 'text-slate-600 dark:text-slate-300 group-hover:text-indigo-800 dark:group-hover:text-white']">
                {{ dept }}
              </h3>
            </div>
            
            <div v-if="activeDepartment === dept" class="absolute -right-10 -bottom-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
          </button>
        </div>
      </section>

      <transition name="slide-up">
        <div v-if="activeDepartment && uniqueClassGroups.length > 0" class="mb-10 grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div class="bg-white dark:bg-slate-800/80 backdrop-blur-md rounded-3xl p-7 shadow-sm border border-slate-200 dark:border-slate-700/50 xl:col-span-6 flex flex-col justify-center relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-slate-50 dark:bg-slate-700/20 rounded-bl-full -z-10"></div>
            <h4 class="text-xs font-black uppercase text-slate-400 tracking-widest mb-5 flex items-center gap-2">
              <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              Class Groups / Sections
            </h4>
            <div class="flex flex-wrap gap-2.5 z-10">
              <button @click="activeClassGroup = 'ALL'" :class="['px-5 py-2.5 rounded-xl font-khmer font-bold transition-all text-sm', activeClassGroup === 'ALL' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700']">
                បង្ហាញទាំងអស់ (All)
              </button>
              <button v-for="group in uniqueClassGroups" :key="group" @click="activeClassGroup = group" :class="['px-5 py-2.5 rounded-xl font-khmer font-bold transition-all text-sm', activeClassGroup === group ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400']">
                {{ group }}
              </button>
            </div>
          </div>

          <div class="bg-slate-900 rounded-3xl p-7 shadow-xl shadow-slate-900/10 xl:col-span-6 border border-slate-800 relative overflow-hidden flex flex-col justify-center">
            <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQPSI4Ij4KPHJlY3Qgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPgo8L3N2Zz4=')]"></div>
            
            <h4 class="text-xs font-black uppercase text-cyan-400 tracking-widest mb-5 flex items-center gap-2 relative z-10">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              Academic Timeframe Filter
            </h4>
            
            <div class="space-y-5 relative z-10">
              <div class="flex items-center gap-4">
                <span class="text-xs font-bold text-slate-400 w-16 shrink-0">YEAR</span>
                <div class="flex bg-slate-800 p-1.5 rounded-2xl w-full overflow-x-auto no-scrollbar">
                  <button @click="activeYear = 'ALL'" :class="['flex-1 px-4 py-2 rounded-xl text-sm font-bold transition-all min-w-max', activeYear === 'ALL' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200']">All Years</button>
                  <button v-for="y in 4" :key="y" @click="activeYear = y" :class="['flex-1 px-4 py-2 rounded-xl text-sm font-bold transition-all min-w-max', activeYear === y ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200']">Year {{ y }}</button>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <span class="text-xs font-bold text-slate-400 w-16 shrink-0">SEMESTER</span>
                <div class="flex bg-slate-800 p-1.5 rounded-2xl w-full">
                  <button @click="activeSemester = 'ALL'" :class="['flex-1 px-4 py-2 rounded-xl text-sm font-bold transition-all', activeSemester === 'ALL' ? 'bg-cyan-500 text-slate-900 shadow-md' : 'text-slate-400 hover:text-slate-200']">Both</button>
                  <button v-for="s in 2" :key="s" @click="activeSemester = s" :class="['flex-1 px-4 py-2 rounded-xl text-sm font-bold transition-all', activeSemester === s ? 'bg-cyan-500 text-slate-900 shadow-md' : 'text-slate-400 hover:text-slate-200']">Semester {{ s }}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <transition name="slide-up">
        <div v-if="activeDepartment" class="sticky top-4 z-50 mb-10">
          <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl border border-white/60 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full p-2.5 transition-all flex flex-col lg:flex-row gap-2 justify-between items-center w-full">
            
            <div class="flex-grow w-full min-w-0 overflow-x-auto custom-scrollbar pb-1 lg:pb-0">
              <div class="flex items-center gap-1.5 w-max px-2">
                <div class="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                </div>
                
                <button 
                  @click="activeMajor = 'ALL'"
                  :class="[
                    'px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2',
                    activeMajor === 'ALL' ? 'bg-slate-900 dark:bg-indigo-500 text-white shadow-md' : 'bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  ]"
                >
                  All Majors
                  <span :class="activeMajor === 'ALL' ? 'bg-slate-700 dark:bg-indigo-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'" class="px-2 py-0.5 rounded-full text-[10px]">{{ teachersInSelectedTime.length }}</span>
                </button>

                <div class="h-5 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>

                <button 
                  v-for="major in majorStats" 
                  :key="major.name"
                  @click="activeMajor = major.name"
                  :class="[
                    'px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2',
                    activeMajor === major.name ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  ]"
                >
                  {{ major.name }}
                  <span :class="activeMajor === major.name ? 'bg-indigo-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'" class="px-2 py-0.5 rounded-full text-[10px]">{{ major.count }}</span>
                </button>
              </div>
            </div>

            <div class="flex items-center gap-2 w-full lg:w-auto shrink-0 pr-1">
              <div class="flex bg-slate-100 dark:bg-slate-900/50 p-1 rounded-full border border-slate-200/50 dark:border-slate-700/50">
                <button @click="viewMode = 'grid'" :class="['p-2 rounded-full transition-all', viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200']">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z"></path></svg>
                </button>
                <button @click="viewMode = 'list'" :class="['p-2 rounded-full transition-all', viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200']">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 4h18v2H3zm0 7h18v2H3zm0 7h18v2H3z"></path></svg>
                </button>
              </div>

              <div class="relative w-full lg:w-64">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input 
                  v-model="searchQuery" 
                  type="text" 
                  placeholder="Search name or subject..." 
                  class="w-full pl-10 pr-4 py-2.5 rounded-full border-none focus:ring-2 focus:ring-indigo-500 text-sm bg-slate-100 dark:bg-slate-900 dark:text-white transition-all hover:bg-slate-200 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-800"
                >
              </div>
            </div>

          </div>
        </div>
      </transition>

      <transition name="fade-scale" mode="out-in">
        <div v-if="isLoadingTeachers" class="py-40 flex flex-col items-center justify-center">
          <div class="relative w-24 h-24">
            <div class="absolute inset-0 border-4 border-indigo-100 dark:border-indigo-900 rounded-full"></div>
            <div class="absolute inset-0 border-4 border-indigo-600 dark:border-indigo-400 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p class="mt-6 text-indigo-600 dark:text-indigo-400 font-black tracking-widest uppercase text-sm animate-pulse">Syncing Database...</p>
        </div>

        <div v-else-if="activeMajor">
          
          <div v-if="filteredTeachers.length === 0" class="py-32 text-center bg-white dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm backdrop-blur-md">
            <div class="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-12 h-12 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h2 class="text-2xl text-slate-800 dark:text-white font-black mb-2">No profiles match criteria</h2>
            <p class="text-slate-500 dark:text-slate-400">Try adjusting your Year, Semester, or searching for a different name.</p>
          </div>

          <div v-else-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <TeacherCard 
              v-for="teacher in filteredTeachers" 
              :key="teacher.id" 
              :teacher="teacher" 
            />
          </div>

          <div v-else-if="viewMode === 'list'" class="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    <th class="p-6 pl-8">Instructor Profile</th>
                    <th class="p-6">Department & Major</th>
                    <th class="p-6">Assigned Curriculum</th>
                    <th class="p-6 text-right pr-8">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-700/50">
                  <TeacherRow 
                    v-for="teacher in filteredTeachers" 
                    :key="teacher.id" 
                    :teacher="teacher" 
                  />
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </transition>

    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'; 
import { useRouter } from 'vue-router';

import TeacherCard from '../components/TeacherCard.vue';
import TeacherRow from '../components/TeacherRow.vue';

const router = useRouter();

const viewMode = ref('grid'); 
const departments = ref([]);
const activeDepartment = ref(null);

const allTeachersInDept = ref([]);
const activeClassGroup = ref('ALL');
const activeYear = ref('ALL');     
const activeSemester = ref('ALL'); 
const activeMajor = ref(null);
const searchQuery = ref('');

const isLoadingDepartments = ref(true);
const isLoadingTeachers = ref(false);

const getColorClass = (index) => {
  const colors = [
    'bg-gradient-to-br from-indigo-500 to-purple-600',
    'bg-gradient-to-br from-emerald-400 to-teal-600',
    'bg-gradient-to-br from-rose-400 to-orange-500',
    'bg-gradient-to-br from-fuchsia-500 to-pink-600',
    'bg-gradient-to-br from-cyan-400 to-blue-600'
  ];
  return colors[index % colors.length];
};

onMounted(async () => {
  // Ensure theme logic applies globally on load so nothing resets unexpectedly
  const savedTheme = localStorage.getItem('theme') || 'system';
  if (savedTheme === 'dark' || (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  if (localStorage.getItem('animations') === 'false') {
    document.documentElement.classList.add('disable-animations');
  } else {
    document.documentElement.classList.remove('disable-animations');
  }

  try {
    const response = await fetch('https://duc-teacher-tracking.onrender.com/api/departments');
    const result = await response.json();
    if (result.success) departments.value = result.data;
  } catch (error) {
    console.error("Failed to load departments", error);
  } finally {
    isLoadingDepartments.value = false;
  }
});

const selectDepartment = async (deptName) => {
  if (activeDepartment.value === deptName) return; 
  
  activeDepartment.value = deptName;
  activeClassGroup.value = 'ALL';
  activeYear.value = 'ALL';       
  activeSemester.value = 'ALL';   
  activeMajor.value = null; 
  searchQuery.value = ''; 
  isLoadingTeachers.value = true;
  allTeachersInDept.value = [];

  try {
    const response = await fetch(`https://duc-teacher-tracking.onrender.com/api/teachers?tab=${encodeURIComponent(deptName)}`);
    const result = await response.json();
    if (result.success) allTeachersInDept.value = result.data;
  } catch (error) {
    console.error("Failed to fetch teachers", error);
  } finally {
    isLoadingTeachers.value = false;
  }
};

const uniqueClassGroups = computed(() => {
  const groups = allTeachersInDept.value
    .map(t => t.classGroup)
    .filter(g => g && g !== 'General'); 
  return [...new Set(groups)];
});

const teachersInSelectedGroup = computed(() => {
  if (activeClassGroup.value === 'ALL') return allTeachersInDept.value;
  return allTeachersInDept.value.filter(t => t.classGroup === activeClassGroup.value);
});

const teachersInSelectedTime = computed(() => {
  let list = teachersInSelectedGroup.value;

  if (activeYear.value === 'ALL' && activeSemester.value === 'ALL') {
    return list.map(t => ({ ...t, displayedSubjects: t.subjects }));
  }

  return list.map(t => {
    const filteredSubs = t.subjects.filter(s => {
      const matchYear = activeYear.value === 'ALL' || String(s.year) === String(activeYear.value);
      const matchSem = activeSemester.value === 'ALL' || String(s.sem) === String(activeSemester.value);
      return matchYear && matchSem;
    });
    return { ...t, displayedSubjects: filteredSubs };
  }).filter(t => t.displayedSubjects.length > 0); 
});

const majorStats = computed(() => {
  const counts = {};
  teachersInSelectedTime.value.forEach(t => {
    const m = t.major;
    if (m && m !== 'N/A' && m.trim() !== '') {
      counts[m] = (counts[m] || 0) + 1;
    }
  });
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
});

watch(majorStats, (newStats) => {
  if (activeMajor.value !== 'ALL' && activeMajor.value !== null) {
    const majorStillExists = newStats.some(m => m.name === activeMajor.value);
    if (!majorStillExists) {
      activeMajor.value = 'ALL';
    }
  }
});

const displayedTeachers = computed(() => {
  if (!activeMajor.value) return [];
  if (activeMajor.value === 'ALL') return teachersInSelectedTime.value;
  return teachersInSelectedTime.value.filter(t => t.major === activeMajor.value);
});

const filteredTeachers = computed(() => {
  const query = searchQuery.value.toLowerCase();
  if (!query) return displayedTeachers.value;

  return displayedTeachers.value.filter(teacher => {
    const matchName = teacher.nameKh.includes(query) || (teacher.nameEn && teacher.nameEn.toLowerCase().includes(query));
    const matchSubject = teacher.displayedSubjects.some(sub => 
      (sub.eng && sub.eng.toLowerCase().includes(query)) || 
      (sub.kh && sub.kh.includes(query))
    );
    return matchName || matchSubject;
  });
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Siemreap&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@700;800&display=swap');

.font-sans { font-family: 'Inter', sans-serif; }

/* 2. Updated the font-khmer class to apply Siemreap */
.font-khmer { font-family: 'Siemreap', sans-serif; }

.font-mono { font-family: 'JetBrains Mono', monospace; }

/* Global Override to instantly kill all animations when toggle is off */
html.disable-animations *, html.disable-animations *::before, html.disable-animations *::after {
  animation-duration: 0s !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0s !important;
  scroll-behavior: auto !important;
}

body {
  background-color: #F4F7FA;
}
html.dark body {
  background-color: #0B1120;
}

/* Scrollbar */
.custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; }
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* Animations */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.05); }
}
.animate-pulse-slow { animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

@keyframes ping-slow {
  0% { transform: scale(1); opacity: 1; }
  75%, 100% { transform: scale(2.5); opacity: 0; }
}
.animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }

.slide-up-enter-active, .slide-up-leave-active { transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-up-enter-from { opacity: 0; transform: translateY(30px); }
.slide-up-leave-to { opacity: 0; transform: translateY(-30px); }

.fade-scale-enter-active, .fade-scale-leave-active { transition: all 0.4s ease; }
.fade-scale-enter-from { opacity: 0; transform: scale(0.97) translateY(10px); }
.fade-scale-leave-to { opacity: 0; transform: scale(1.03) translateY(-10px); }
</style>