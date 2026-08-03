<template>
  <div class="min-h-screen font-sans selection:bg-indigo-500 selection:text-white relative overflow-x-hidden transition-colors duration-700 pb-32 bg-[#F4F7FA] dark:bg-[#0B1120] text-slate-800 dark:text-slate-100 print:bg-white print:text-black">
    
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#eef2ff] via-[#f8fafc] to-[#e0f2fe] dark:from-[#0B1120] dark:via-[#0f172a] dark:to-[#1e1b4b] print:hidden">
      <div class="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-50 dark:opacity-20 animate-blob bg-cyan-100 dark:bg-cyan-900/40 transition-colors duration-700"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[140px] opacity-50 dark:opacity-20 animate-blob animation-delay-2000 bg-indigo-100 dark:bg-indigo-900/40 transition-colors duration-700"></div>
      <div class="absolute top-[30%] left-[20%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-40 dark:opacity-20 animate-blob animation-delay-4000 bg-emerald-100 dark:bg-emerald-900/40 transition-colors duration-700"></div>
    </div>

    <main class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-12 animate-fade-in-up print:hidden">
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-4">
        <div>
          <button @click="router.push('/admin')" class="group flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-4 transition-colors w-max">
            <div class="w-8 h-8 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
            </div>
            Return to Dashboard
          </button>
        </div>
      </div>

      <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white dark:border-white/5 flex flex-col h-auto min-h-[500px] relative overflow-hidden isolate max-w-6xl mx-auto w-full">
        
        <div class="p-6 sm:p-8 pb-6 border-b border-slate-100/50 dark:border-slate-700/50 relative z-10 flex flex-col gap-4 bg-white/40 dark:bg-slate-900/40">
          
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 class="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-100 dark:border-emerald-500/20 shadow-sm shrink-0">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </div>
              Master Tracking Directory
            </h2>
          </div>
          
          <div class="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 font-khmer mt-2">
            <button @click="navigateLevel(0)" :class="['hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors', trackingLevel === 0 ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-lg' : '']">All Generations</button>
            <template v-if="trackingLevel >= 1"><span class="opacity-50">/</span><button @click="navigateLevel(1)" :class="['hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors', trackingLevel === 1 ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-lg' : '']">{{ selectedGen }}</button></template>
            <template v-if="trackingLevel >= 2"><span class="opacity-50">/</span><button @click="navigateLevel(2)" :class="['hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors', trackingLevel === 2 ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-lg' : '']">ឆ្នាំទី {{ selectedYear }}</button></template>
            <template v-if="trackingLevel >= 3"><span class="opacity-50">/</span><button @click="navigateLevel(3)" :class="['hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors', trackingLevel === 3 ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-lg' : '']">ឆមាសទី {{ selectedSem }}</button></template>
          </div>
        </div>

        <div class="p-8 flex-grow overflow-y-auto custom-scrollbar relative z-10">
          
          <div v-if="isFetchingDirectory" class="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
             <div class="w-10 h-10 border-4 border-emerald-100 dark:border-emerald-900 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
             <p class="text-xs font-black uppercase tracking-widest animate-pulse">Scanning Master Sheet...</p>
          </div>

          <transition name="tab-fade" mode="out-in">
            
            <div v-if="trackingLevel === 0 && !isFetchingDirectory" key="lvl0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <button v-for="gen in availableGenerations" :key="gen" @click="selectGen(gen)" class="group text-left bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div class="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-full group-hover:scale-150 transition-transform duration-500 -z-10"></div>
                <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-4">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                </div>
                <h3 class="text-2xl font-black text-slate-800 dark:text-white font-khmer">{{ gen }}</h3>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center justify-between">
                  View Years
                  <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </p>
              </button>
            </div>

            <div v-else-if="trackingLevel === 1 && !isFetchingDirectory" key="lvl1" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <button v-for="year in availableYears" :key="year" @click="selectYear(year)" class="group text-left bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div class="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full group-hover:scale-150 transition-transform duration-500 -z-10"></div>
                <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-4">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <h3 class="text-2xl font-black text-slate-800 dark:text-white font-khmer">ឆ្នាំទី {{ year }}</h3>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center justify-between">
                  View Semesters
                  <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </p>
              </button>
            </div>

            <div v-else-if="trackingLevel === 2 && !isFetchingDirectory" key="lvl2" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <button v-for="sem in availableSemesters" :key="sem" @click="selectSem(sem)" class="group text-left bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div class="absolute -right-4 -top-4 w-24 h-24 bg-amber-50 dark:bg-amber-900/20 rounded-full group-hover:scale-150 transition-transform duration-500 -z-10"></div>
                <div class="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mb-4">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 class="text-2xl font-black text-slate-800 dark:text-white font-khmer">ឆមាសទី {{ sem }}</h3>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center justify-between">
                  View Departments
                  <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </p>
              </button>
            </div>

            <div v-else-if="trackingLevel === 3 && !isFetchingDirectory" key="lvl3" class="flex flex-col h-full">
              <!-- Search Bar with Dropdown -->
              <div class="mb-6 relative max-w-md z-20">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input 
                  v-model="searchQuery" 
                  @focus="isSearchDropdownOpen = true"
                  @blur="closeSearchDropdown"
                  type="text" 
                  placeholder="Search teachers by name..." 
                  class="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-bold text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 transition-all shadow-sm relative z-20"
                >
                <button v-if="searchQuery" @click="clearSearch" class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors z-20">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                
                <!-- Autocomplete Dropdown -->
                <transition name="fade">
                  <ul v-if="isSearchDropdownOpen && filteredTeachers.length > 0" class="absolute w-full mt-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl max-h-60 overflow-y-auto z-50 py-2">
                    <li 
                      v-for="teacher in filteredTeachers" 
                      :key="teacher.teacher"
                      @click="selectTeacherFromDropdown(teacher.teacher)"
                      class="px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer flex items-center gap-3 transition-colors"
                    >
                      <div v-if="teacher.avatarUrl" class="w-6 h-6 rounded-full overflow-hidden shrink-0">
                        <img :src="teacher.avatarUrl" class="w-full h-full object-cover">
                      </div>
                      <div v-else class="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[9px] font-black shrink-0 text-slate-500">
                        {{ getInitials(teacher.teacher) }}
                      </div>
                      <span class="text-sm font-bold text-slate-700 dark:text-slate-200 font-khmer truncate">{{ teacher.teacher }}</span>
                    </li>
                  </ul>
                </transition>
              </div>

              <div v-if="paginatedTeachers.length === 0" class="flex-grow flex flex-col items-center justify-center py-12 text-slate-400">
                <svg class="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p class="text-lg font-black tracking-widest uppercase">No teachers found</p>
                <p class="text-sm font-bold mt-2">Try adjusting your search</p>
              </div>

              <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="teacherItem in paginatedTeachers" :key="teacherItem.teacher" class="bg-white dark:bg-slate-900/60 p-5 sm:p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
                
                <div class="flex items-start gap-4 flex-grow">
                  <div class="relative shrink-0 v-avatar">
                    <img 
                      v-if="teacherItem.avatarUrl" 
                      :src="teacherItem.avatarUrl" 
                      :alt="teacherItem.teacher"
                      class="w-14 h-14 rounded-full object-cover shadow-inner ring-4 ring-emerald-50 dark:ring-emerald-950/50"
                    />
                    <div 
                      v-else 
                      class="w-14 h-14 rounded-full flex items-center justify-center font-black shadow-inner text-xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 fallback-initials"
                    >
                      {{ getInitials(teacherItem.teacher) }}
                    </div>
                  </div>

                  <div class="flex-grow">
                    <div class="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <p class="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-1">Instructor</p>
                        <h4 class="text-lg font-black font-khmer text-slate-800 dark:text-white leading-none">{{ teacherItem.teacher }}</h4>
                      </div>
                      <button 
                        @click="triggerTeacherPrint(teacherItem)" 
                        title="Print Teacher Summary"
                        class="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors shrink-0"
                      >
                        <svg v-if="printingSubjectId === teacherItem.teacher" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                      </button>
                    </div>
                    
                    <div class="flex flex-col gap-2 mb-1">
                      <div 
                        v-for="cls in teacherItem.classes" 
                        :key="cls.tab + cls.subject"
                        class="flex items-center gap-1 group/subject w-max"
                      >
                        <button 
                          @click="navigateToHistory(cls)"
                          class="text-left flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 font-khmer hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                        >
                          <svg class="w-4 h-4 opacity-50 group-hover/subject:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                          <span class="underline decoration-dashed decoration-slate-300 dark:decoration-slate-600 group-hover/subject:decoration-emerald-500 transition-colors">{{ cls.subject }}</span>
                          <span class="text-[9px] font-mono font-normal bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 group-hover/subject:text-emerald-500 group-hover/subject:bg-emerald-50 dark:group-hover/subject:bg-emerald-500/10 transition-colors">{{ getCohortName(cls) }}</span>
                        </button>
                        <button 
                          @click="triggerInlinePrint(cls)" 
                          title="Print PDF"
                          class="opacity-0 group-hover/subject:opacity-100 flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 transition-all ml-1.5"
                        >
                          <svg v-if="printingSubjectId === cls.tab + cls.subject" class="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        </button>
                      </div>
                    </div>
                    
                    <div class="flex flex-wrap items-center gap-2 mt-3">
                      <div v-for="dept in teacherItem.departments.filter(d => d && d !== 'Unknown')" :key="dept" class="flex items-center gap-1.5 px-2.5 py-1 bg-fuchsia-50 dark:bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 rounded-lg text-[10px] font-black font-khmer uppercase tracking-widest border border-fuchsia-100 dark:border-fuchsia-500/20 shadow-sm truncate max-w-[200px]" :title="dept">
                        <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        {{ dept }}
                      </div>

                      <div v-if="teacherItem.year && teacherItem.year !== '?'" class="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-[10px] font-black font-khmer uppercase tracking-widest border border-blue-100 dark:border-blue-500/20 shadow-sm shrink-0">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        ឆ្នាំទី {{ teacherItem.year }}
                      </div>

                      <div v-if="teacherItem.semester && teacherItem.semester !== '?'" class="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg text-[10px] font-black font-khmer uppercase tracking-widest border border-amber-100 dark:border-amber-500/20 shadow-sm shrink-0">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        ឆមាសទី {{ teacherItem.semester }}
                      </div>
                    </div>

                  </div>
                </div>


                
              </div>
              </div>
              
              <!-- Pagination Controls -->
              <div v-if="totalPages > 1" class="flex items-center justify-between mt-8 pt-6 border-t border-slate-200 dark:border-slate-700/50">
                <p class="text-xs font-bold text-slate-500">
                  Showing <span class="text-slate-800 dark:text-white">{{ filteredTeachers.length ? (currentPage - 1) * itemsPerPage + 1 : 0 }}</span> to 
                  <span class="text-slate-800 dark:text-white">{{ Math.min(currentPage * itemsPerPage, filteredTeachers.length) }}</span> of 
                  <span class="text-slate-800 dark:text-white">{{ filteredTeachers.length }}</span> teachers
                </p>
                <div class="flex items-center gap-2">
                  <button @click="prevPage" :disabled="currentPage === 1" class="w-8 h-8 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
                  </button>
                  <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="['w-8 h-8 flex items-center justify-center rounded-xl text-xs font-black transition-colors', currentPage === page ? 'bg-emerald-500 text-white shadow-md border-transparent' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700']">
                    {{ page }}
                  </button>
                  <button @click="nextPage" :disabled="currentPage === totalPages" class="w-8 h-8 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>

    </main>

    <!-- PRINT OPTIONS MODAL -->
    <transition name="fade">
      <div v-if="isPrintModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
         <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="isPrintModalOpen = false"></div>
         <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 w-full max-w-sm shadow-2xl border border-slate-200 dark:border-slate-700 relative z-10 font-sans animate-fade-in-up">
            <h3 class="text-xl font-black text-slate-800 dark:text-white mb-2 text-center">Print Options</h3>
            <p class="text-sm font-bold text-slate-500 text-center mb-6">Select a month to print.</p>
            
            <select v-model="selectedPrintMonth" class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-khmer font-bold text-slate-700 dark:text-slate-200">
               <option value="">All Months (ប្រចាំឆមាស)</option>
               <option v-for="m in printModalMonths" :key="m.value" :value="m.value">{{ m.label }}</option>
            </select>
            
            <div class="flex items-center gap-3">
                <button @click="isPrintModalOpen = false" class="flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 transition-colors">Cancel</button>
                <button @click="executePrint" class="flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                    Print
                </button>
            </div>
         </div>
      </div>
    </transition>

    <!-- PRELOAD ASSETS FOR PRINT (Forces browser to cache them instantly) -->
    <img src="../assets/DUC.png" alt="" class="absolute w-0 h-0 opacity-0 pointer-events-none" />

    <!-- ========================================== -->
    <!-- OFFICIAL PDF PRINT TEMPLATE (HIDDEN IN APP)-->
    <!-- ========================================== -->
    <div v-if="printData && printMode === 'class'" id="print-area" class="hidden print:block w-full bg-white text-black font-khmer px-6">
      <!-- Header Section -->
      <div class="relative w-full mb-6 min-h-[120px]">
        <!-- Left: Logo & University Name -->
        <div class="absolute left-0 top-9 flex flex-col items-center w-64 text-center">
          <img src="../assets/DUC.png" alt="DUC Logo" class="h-20 w-auto mb-1 object-contain" />
          <h2 class="font-moul text-[15px] text-black leading-none mt-2 font-normal">សាកលវិទ្យាល័យឌីជីថលកម្ពុជា</h2>
          <h3 class="text-[10px] font-black font-sans mt-1">DIGITAL UNIVERSITY OF CAMBODIA</h3>
        </div>

        <!-- Center: Nation Religion King -->
        <div class="w-full flex flex-col items-center text-center pt-2">
          <!-- 🔥 NO FONT-BOLD to match Google Sheets Moul format -->
          <h1 class="font-moul text-[20px] text-black leading-none font-normal">ព្រះរាជាណាចក្រកម្ពុជា</h1>
          <h2 class="font-moul text-[18px] text-black mt-3 leading-none font-normal">ជាតិ សាសនា ព្រះមហាក្សត្រ</h2>
          
          <!-- 🔥 CUSTOM TACTEING FONT ORNAMENT -->
          <div class="flex items-center justify-center mt-2 mb-2 text-black">
            <span class="font-tacteing text-3xl" style="line-height: 1;">3</span>
          </div>
          <!-- END DIVIDER -->
        </div>
      </div>

      <!-- Document Titles -->
      <div class="text-center mb-4 pt-6 text-[14px] font-khmer">
        <p style="-webkit-text-stroke: 0.5px white;" class="font-moul font-normal mb-1 text-[16px]">បញ្ជីតាមដានការបង្រៀនរបស់សាស្ត្រាចារ្យ</p>
        <p style="-webkit-text-stroke: 0.5px white;" class="font-moul font-normal mb-1">មហាវិទ្យាល័យ {{ printData.department ? printData.department.replace('មហាវិទ្យាល័យ', '') : '...........................................................' }}</p>
        <p style="-webkit-text-stroke: 0.5px white;" class="font-moul font-normal mb-1">កម្រិតបរិញ្ញាបត្រ ជំនាញ {{ printData.major || '...........................................' }}</p>
        <p style="-webkit-text-stroke: 0.5px white;" class="font-moul font-normal mb-1">មុខវិជ្ជា {{ cleanSubjectName(printData.subject) }}</p>
        <p style="-webkit-text-stroke: 0.5px white;" class="font-moul font-normal mb-1">បង្រៀនដោយ ៖ លោកគ្រូ {{ printData.teacher || '........................' }}</p>
      </div>

      <!-- Meta Row -->
      <div class="flex justify-between font-bold text-[12px] mb-1 px-1">
        <div>ថ្នាក់ ៖ {{ printData.cohort }}</div>
        <div>រៀងរាល់ថ្ងៃ {{ printData.daysStr || '..............' }} បន្ទប់ {{ printData.room || '......' }}</div>
      </div>

      <!-- Main Data Table -->
      <table class="w-full border-collapse border border-black text-[11px] text-center mb-6">
        <thead>
          <tr>
            <th colspan="2" class="border border-black p-1 align-middle font-bold">កាលបរិច្ឆេទ</th>
            <th rowspan="2" class="border border-black p-1 align-middle font-bold w-[12%] leading-tight">ម៉ោងបង្រៀន</th>
            <th colspan="2" class="border border-black p-1 align-middle font-bold">ការបរិយាយខ្លឹមសារមេរៀន</th>
            <th rowspan="2" class="border border-black p-1 align-middle font-bold w-[8%]">ម៉ោងសរុប</th>
          </tr>
          <tr>
            <th class="border border-black p-1 align-middle font-bold w-[6%]">សប្តាហ៍</th>
            <th class="border border-black p-1 align-middle font-bold w-[12%]">ថ្ងៃខែឆ្នាំ</th>
            <th class="border border-black p-1 align-middle font-bold w-[12%]">មេរៀន</th>
            <th class="border border-black p-1 align-middle font-bold">ខ្លឹមសារមេរៀន</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lesson in printData.lessons" :key="lesson.week" class="break-inside-avoid page-break-inside-avoid">
            <td class="border border-black p-1">{{ lesson.week }}</td>
            <td class="border border-black p-1">{{ formatDateKhmer(lesson.date) }}</td>
            <td class="border border-black p-1 font-sans text-[10px]">{{ lesson.time || '0:00 - 0:00' }}</td>
            <td class="border border-black p-1">{{ lesson.lessonNo || '' }}</td>
            <td class="border border-black p-1 text-left px-2 leading-relaxed">{{ lesson.content }}</td>
            <td class="border border-black p-1 whitespace-nowrap">{{ parseNumericHours(lesson.hours) }}</td>
          </tr>
          
          <!-- Ensure 20 rows total like the screenshot padding with empty rows -->
          <template v-if="printData.lessons.length < 20">
             <tr v-for="i in (20 - printData.lessons.length)" :key="'empty'+i" class="break-inside-avoid page-break-inside-avoid">
               <td class="border border-black p-1">{{ printData.lessons.length + i }}</td>
               <td class="border border-black p-1"></td>
               <td class="border border-black p-1 font-sans text-[10px]">0:00 - 0:00</td>
               <td class="border border-black p-1"></td>
               <td class="border border-black p-1"></td>
               <td class="border border-black p-1">0</td>
             </tr>
          </template>

          <tr class="break-inside-avoid page-break-inside-avoid">
            <td colspan="5" class="border border-black p-1 text-center">ចំនួនម៉ោងសរុប</td>
            <td class="border border-black p-1 text-center font-bold whitespace-nowrap">{{ printData.formattedHours }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Signatures Footer -->
      <div class="flex justify-between mt-8 px-4 text-[12px] break-inside-avoid page-break-inside-avoid">
        <!-- Admin/Head Signature -->
        <div class="text-center flex flex-col items-center pt-20">
          <div class="font-moul font-normal mb-16 leading-[1.6]">បានឃើញ និងឯកភាព<br>ប្រធានដេប៉ាតឺម៉ង់</div>
        </div>
        
        <!-- Teacher Signature -->
        <div class="text-center flex flex-col items-center">
          <div class="mb-2">ថ្ងៃ ........................... ខែ .............................. ឆ្នាំរោង ឆស័ក ព.ស ២៥៧០</div>
          <div class="mb-16">កំពង់ស្ពឺ ថ្ងៃទី......... ខែ .................... ឆ្នាំ២០២....<br><span class="font-moul font-normal mt-2 inline-block">ហត្ថលេខាគ្រូបង្រៀន</span></div>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- TEACHER MONTHLY SUMMARY PDF TEMPLATE       -->
    <!-- ========================================== -->
    <div v-if="printData && printMode === 'teacher'" id="print-teacher-area" class="hidden print:block w-full bg-white text-black font-khmer px-2 pb-10">
      <!-- Header Section -->
      <div class="relative w-full mb-6 min-h-[120px]">
        <!-- Left: Logo & University Name -->
        <div class="absolute left-0 top-9 flex flex-col items-center w-64 text-center">
          <h2 class="font-moul text-[15px] text-black leading-none mt-2 font-normal">សាកលវិទ្យាល័យឌីជីថលកម្ពុជា</h2>
          <h3 class="text-[10px] font-black font-sans mt-1">DIGITAL UNIVERSITY OF CAMBODIA</h3>
        </div>

        <!-- Center: Nation Religion King -->
        <div class="w-full flex flex-col items-center text-center pt-2">
          <h1 class="font-moul text-[18px] text-black leading-none font-normal">ព្រះរាជាណាចក្រកម្ពុជា</h1>
          <h2 class="font-moul text-[16px] text-black mt-3 leading-none font-normal">ជាតិ សាសនា ព្រះមហាក្សត្រ</h2>
          
          <div class="flex items-center justify-center mt-2 mb-2 text-black">
            <span class="font-tacteing text-3xl" style="line-height: 1;">3</span>
          </div>

          <!-- Document Title -->
          <div class="flex flex-col items-center text-center mt-4">
            <h2 class="font-moul text-[15px] text-black leading-normal font-normal">
              សរុបម៉ោងបង្រៀនគ្រូបង្រៀន ប្រចាំខែ{{ printData.selectedMonthLabel !== 'ទាំងអស់' ? printData.selectedMonthLabel : '...........' }}<br>
              {{ printData.headerYear === 'ឆ្នាំសិក្សាមូលដ្ឋាន' ? 'ថ្នាក់' + printData.headerYear : (printData.headerYear === 'ថ្នាក់មូលដ្ឋាន' ? printData.headerYear : 'ឆ្នាំទី ' + (printData.headerYear || '...')) }} ឆមាសទី {{ printData.headerSemester || '......' }} {{ printData.headerGeneration || '.....................' }}<br>
              កម្រិតបរិញ្ញាបត្រ
            </h2>
          </div>
        </div>
      </div>

      <!-- Teacher Name Label -->
      <div class="w-full text-left mb-2 text-[14px]">
        <span class="font-bold font-moul">បង្រៀនដោយ៖ លោកគ្រូ </span>
        <span class="font-bold font-moul inline-block px-2">{{ printData.teacher }}</span>
      </div>

      <!-- Table Section -->
      <table class="w-full border-collapse border-2 border-black text-[12px] mt-2 page-break-inside-auto">
        <thead>
          <tr class="bg-[#0b3d60] text-white">
            <th class="border border-black font-moul font-normal p-2 w-10 text-center text-[11px]">ល.រ</th>
            <th class="border border-black font-moul font-normal p-2 w-28 text-center text-[11px]">កាលបរិច្ឆេទ</th>
            <th class="border border-black font-moul font-normal p-2 w-28 text-center text-[11px]">ម៉ោងបង្រៀន</th>
            <th class="border border-black font-moul font-normal p-2 w-20 text-center text-[11px]">ចំនួនម៉ោង</th>
            <th class="border border-black font-moul font-normal p-2 w-24 text-center text-[11px]">ជំនាន់</th>
            <th class="border border-black font-moul font-normal p-2 text-center text-[11px]">ជំនាញ</th>
            <th class="border border-black font-moul font-normal p-2 w-32 text-center text-[11px]">ថ្នាក់</th>
            <th class="border border-black font-moul font-normal p-2 w-48 text-center text-[11px]">មុខវិជ្ជា</th>
            <th class="border border-black font-moul font-normal p-2 w-20 text-center text-[11px]">សរុប</th>
          </tr>
        </thead>
        <tbody>
          <!-- Real Data Rows -->
          <tr v-for="lesson in printData.lessons" :key="lesson.index" class="break-inside-avoid page-break-inside-avoid text-center">
            <td class="border border-black p-1">{{ lesson.index }}</td>
            <td class="border border-black p-1">{{ formatDateKhmer(lesson.date) }}</td>
            <td class="border border-black p-1 font-sans text-[11px]">{{ lesson.startTime && lesson.endTime ? lesson.startTime + ' - ' + lesson.endTime : '' }}</td>
            <td class="border border-black p-1">{{ lesson.parsedHours > 0 ? lesson.parsedHours : '' }}</td>
            <td class="border border-black p-1">{{ lesson.generation }}</td>
            <td class="border border-black p-1">{{ lesson.major }}</td>
            <td class="border border-black p-1 font-sans text-[11px]">{{ lesson.cohort }}</td>
            <td class="border border-black p-1 text-left px-2">{{ cleanSubjectName(lesson.subject) }}</td>
            <td class="border border-black p-1">{{ lesson.parsedHours > 0 ? lesson.parsedHours : '' }}</td>
          </tr>

          <!-- Fill Empty Rows if less than 12 (to match screenshot style) -->
          <template v-if="printData.lessons.length < 12">
             <tr v-for="i in (12 - printData.lessons.length)" :key="'empty-'+i" class="break-inside-avoid page-break-inside-avoid h-7 text-center">
               <td class="border border-black p-1">{{ printData.lessons.length + i }}</td>
               <td class="border border-black p-1"></td>
               <td class="border border-black p-1"></td>
               <td class="border border-black p-1"></td>
               <td class="border border-black p-1"></td>
               <td class="border border-black p-1"></td>
               <td class="border border-black p-1"></td>
               <td class="border border-black p-1"></td>
               <td class="border border-black p-1"></td>
             </tr>
          </template>

          <tr class="break-inside-avoid page-break-inside-avoid">
            <td colspan="8" class="border border-black p-1.5 text-center font-bold">ម៉ោងសរុប</td>
            <td class="border border-black p-1.5 text-center font-bold">{{ printData.totalHours }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// --- INLINE PRINT LOGIC ---
const printData = ref(null);
const printingSubjectId = ref(null);

const cleanSubjectName = (subject) => {
  if (!subject) return '';
  return String(subject).replace(/\s*\(.*?\)\s*/g, '').trim();
};

const parseNumericHours = (hourStr) => {
  if (!hourStr) return '0';
  const hMatch = hourStr.match(/(\d+)\s*(?:ម៉ោង|hrs|hr|h)/i);
  const mMatch = hourStr.match(/(\d+)\s*(?:នាទី|mins|min|m)/i);
  if (hMatch || mMatch) {
    const h = hMatch ? parseInt(hMatch[1]) : 0;
    const m = mMatch ? parseInt(mMatch[1]) : 0;
    if (m === 0) return h.toString();
    return (h + m/60).toPrecision(2).replace(/\.0$/, ''); 
  }
  const num = parseFloat(hourStr);
  if (!isNaN(num)) return num.toString();
  return hourStr;
};

const formatDateKhmer = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3 && parts[0].length === 4) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`; 
  }
  return dateStr;
};

const formatMins = (m) => {
  const h = Math.floor(m / 60);
  const rM = m % 60;
  const fM = rM < 10 ? `0${rM}` : rM;
  return `${h} ម៉ោង ${fM} នាទី`;
};

// --- SMART COHORT EXTRACTOR ---
const getCohortName = (item) => {
  // 🔥 FIX: Added '0-9' so numbers at the end of groups are NOT chopped off!
  const match = item.tab.match(/^(G\d+-[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)?)/i);
  if (match) return match[1].toUpperCase(); 
  return item.tab; 
};

// --- PRINT MODAL STATE ---
const isPrintModalOpen = ref(false);
const printMode = ref('class'); // 'class' or 'teacher'
const printModalData = ref(null);
const printModalMonths = ref([]);
const selectedPrintMonth = ref('');
const khmerMonthsMap = {
  '01': 'មករា', '02': 'កុម្ភៈ', '03': 'មីនា', '04': 'មេសា',
  '05': 'ឧសភា', '06': 'មិថុនា', '07': 'កក្កដា', '08': 'សីហា',
  '09': 'កញ្ញា', '10': 'តុលា', '11': 'វិច្ឆិកា', '12': 'ធ្នូ'
};

const executePrint = async () => {
    isPrintModalOpen.value = false;
    const { teacherNode, historyData, fullMajorName, room, daysStr } = printModalData.value;
    
    let filteredHistory = historyData;
    if (selectedPrintMonth.value) {
        const [targetMM, targetYYYY] = selectedPrintMonth.value.split('-');
        filteredHistory = historyData.filter(l => {
            if (!l.date || l.date.trim() === '') return false;
            const parts = l.date.trim().split(/[-/ ]+/);
            if (parts.length >= 3) {
                if (parts[2].length === 4) {
                    return parts[1] === targetMM && parts[2] === targetYYYY;
                } else if (parts[0].length === 4) {
                    return parts[1] === targetMM && parts[0] === targetYYYY;
                }
            }
            return false;
        });
    }

    if (printMode.value === 'class') {
        let totalMins = 0;
        filteredHistory.forEach(lesson => {
            if (lesson.hours) {
                const parsedStr = parseNumericHours(lesson.hours);
                const num = parseFloat(parsedStr);
                if (!isNaN(num)) totalMins += Math.round(num * 60);
            }
        });
        const displayedTotalHours = formatMins(totalMins);

        const sortedLessons = [...filteredHistory].sort((a,b) => a.week - b.week);
        printData.value = {
          cohort: getCohortName(teacherNode),
          department: teacherNode.department,
          major: fullMajorName,
          subject: teacherNode.subject,
          teacher: teacherNode.teacher,
          lessons: sortedLessons,
          formattedHours: displayedTotalHours,
          room,
          daysStr
        };
    } else if (printMode.value === 'teacher') {
        let totalHoursNumber = 0;
        const processedLessons = filteredHistory.map((lesson, index) => {
            let parsedHours = 0;
            if (lesson.hours) {
                const parsedStr = parseNumericHours(lesson.hours);
                const num = parseFloat(parsedStr);
                if (!isNaN(num)) {
                    parsedHours = num;
                    totalHoursNumber += num;
                }
            }
            return {
                ...lesson,
                index: index + 1,
                parsedHours
            };
        });
        
        let headerGeneration = '...........................................';
        let headerSemester = '..................';
        let headerYear = '........';
        
        if (processedLessons.length > 0) {
            // Find most frequent generation and semester or just pick the first valid one
            const gen = processedLessons.find(l => l.generation && l.generation.trim() !== '')?.generation;
            if (gen) headerGeneration = gen;
            // Assuming semester might not be directly in history, we can fetch from teacherNode.classes
            if (teacherNode && teacherNode.classes && teacherNode.classes.length > 0) {
                const sem = teacherNode.classes[0].semester;
                if (sem && sem !== '?') headerSemester = sem;
                const yr = teacherNode.classes[0].year;
                if (yr && yr !== '?') headerYear = yr;
            }
        }
        
        const monthLabel = selectedPrintMonth.value 
            ? printModalMonths.value.find(m => m.value === selectedPrintMonth.value)?.label 
            : 'ទាំងអស់';

        printData.value = {
            teacher: teacherNode.teacher,
            lessons: processedLessons,
            totalHours: totalHoursNumber,
            selectedMonthLabel: monthLabel,
            headerGeneration,
            headerSemester,
            headerYear
        };
    }

    await nextTick();
    
    const style = document.createElement('style');
    const orientation = printMode.value === 'class' ? 'A4 portrait' : 'A4 landscape';
    style.innerHTML = `@page { size: ${orientation} !important; margin: 1.5cm 1cm 1cm 1cm; }`;
    document.head.appendChild(style);
    
    window.print();
    
    setTimeout(() => {
        if (document.head.contains(style)) {
            document.head.removeChild(style);
        }
    }, 1000);
};

const triggerInlinePrint = async (teacherNode) => {
  printingSubjectId.value = teacherNode.tab + teacherNode.subject;
  
  try {
    const url = new URL(import.meta.env.VITE_API_URL + '/api/class-history');
    url.searchParams.append('cohort', teacherNode.tab);
    url.searchParams.append('subject', teacherNode.subject);
    url.searchParams.append('teacher', teacherNode.teacher);

    const res = await fetch(url);
    const data = await res.json();
    
    let historyData = [];
    let displayedTotalHours = '0';
    if (data.success) {
      historyData = data.data || [];
      let totalMins = 0;
      historyData.forEach(lesson => {
        if (lesson.hours) {
           const parsedStr = parseNumericHours(lesson.hours);
           const num = parseFloat(parsedStr);
           if (!isNaN(num)) {
             totalMins += Math.round(num * 60);
           }
        }
      });
      displayedTotalHours = formatMins(totalMins);
    }
    
    let fullMajorName = '';
    try {
      const mRes = await fetch(import.meta.env.VITE_API_URL + '/api/majors');
      const mData = await mRes.json();
      if (mData.success) {
        const majorsMap = mData.data;
        const normalize = (str) => (str || '').replace(/\s+/g, '').replace(/[\u2013\u2014\u2011_]/g, '-').toUpperCase();
        const stripNumbersAndSuffixes = (str) => str.replace(/\d+$/, '').replace(/-[A-Z]$/, '');
        const cohortCode = normalize(teacherNode.tab);
        const cohortParts = cohortCode.split('-');
        let coreCode = cohortCode;
        if (cohortParts.length >= 3) coreCode = cohortParts[1];
        else if (cohortParts.length === 2) coreCode = cohortParts[1];
        else coreCode = cohortParts[0];
        coreCode = stripNumbersAndSuffixes(coreCode);
        
        const rows = Object.entries(majorsMap).sort((a, b) => b[0].length - a[0].length);
        for (const [code, name] of rows) {
          const sheetCode = normalize(code);
          if (cohortCode === sheetCode || cohortCode.includes(sheetCode) || sheetCode.includes(cohortCode)) {
              fullMajorName = name.trim(); break;
          }
          if (coreCode.length >= 2 && sheetCode.includes(coreCode)) {
              fullMajorName = name.trim(); break;
          }
        }
      }
    } catch (e) {}

    let room = 'N/A';
    let daysStr = 'N/A';

    try {
      const schedUrl = new URL(import.meta.env.VITE_API_URL + '/api/teacher-schedule');
      schedUrl.searchParams.append('name', teacherNode.teacher);
      const schedRes = await fetch(schedUrl);
      const schedData = await schedRes.json();
      
      if (schedData.success) {
         const pureCohort = getCohortName(teacherNode);
         const matchingClass = schedData.data.find(c => 
            (c.tab === pureCohort || c.tab.includes(pureCohort) || pureCohort.includes(c.tab)) 
            && c.subject === teacherNode.subject
         );
         if (matchingClass) {
            room = matchingClass.room || 'N/A';
            daysStr = matchingClass.daysStr || 'N/A';
         }
      }
    } catch (e) {
       console.log('Failed to fetch schedule for room/day');
    }

    if ((!room || room === 'N/A') && historyData.length > 0) {
       const lessonWithRoom = historyData.find(l => l.room && l.room.trim() !== '');
       if (lessonWithRoom) room = lessonWithRoom.room;
    }

    if ((!daysStr || daysStr === 'N/A') && historyData.length > 0) {
       const uniqueDays = new Set();
       const daysMap = ['អាទិត្យ', 'ចន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'];
       
       historyData.forEach(l => {
          if (l.date && l.date.trim() !== '') {
             let d;
             const parts = l.date.trim().split(/[-/ ]+/);
             if (parts.length >= 3) {
                 if (parts[2].length === 4) {
                     // Assume DD-MM-YYYY as per user input "04-07-2026"
                     d = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
                     if (isNaN(d.getTime())) d = new Date(l.date); // fallback
                 } else if (parts[0].length === 4) {
                     d = new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
                 } else {
                     d = new Date(l.date);
                 }
             } else {
                 d = new Date(l.date);
             }
             
             if (d && !isNaN(d.getTime())) {
                 uniqueDays.add(daysMap[d.getDay()]);
             }
          }
       });
       
       if (uniqueDays.size > 0) {
           const daysArray = Array.from(uniqueDays);
           // Sort by day of week
           daysArray.sort((a, b) => daysMap.indexOf(a) - daysMap.indexOf(b));
           daysStr = daysArray.join(' - ');
       }
    }

    const monthsSet = new Set();
    historyData.forEach(l => {
        if (l.date && l.date.trim() !== '') {
            const parts = l.date.trim().split(/[-/ ]+/);
            if (parts.length >= 3) {
                if (parts[2].length === 4) {
                    monthsSet.add(`${parts[1]}-${parts[2]}`);
                } else if (parts[0].length === 4) {
                    monthsSet.add(`${parts[1]}-${parts[0]}`);
                }
            }
        }
    });

    const monthsArray = Array.from(monthsSet).sort();
    printModalMonths.value = monthsArray.map(m => {
        const [mm, yyyy] = m.split('-');
        return { value: m, label: `${khmerMonthsMap[mm] || mm} ${yyyy}` };
    });
    
    printModalData.value = { teacherNode, historyData, fullMajorName, room, daysStr };
    printMode.value = 'class';
    selectedPrintMonth.value = '';
    isPrintModalOpen.value = true;
    
  } catch (error) {
    console.error("Failed to prepare print", error);
    alert("Failed to load print data");
  } finally {
    printingSubjectId.value = null;
  }
};

const triggerTeacherPrint = async (teacherItem) => {
  printingSubjectId.value = teacherItem.teacher;
  
  try {
    const url = new URL(import.meta.env.VITE_API_URL + '/api/teacher-history');
    url.searchParams.append('teacher', teacherItem.teacher);

    const res = await fetch(url);
    const data = await res.json();
    
    let historyData = [];
    if (data.success) {
      let rawHistory = data.data || [];
      if (selectedGen.value) {
          rawHistory = rawHistory.filter(l => l.generation === selectedGen.value);
      }
      historyData = rawHistory;
    }
    
    const monthsSet = new Set();
    historyData.forEach(l => {
        if (l.date && l.date.trim() !== '') {
            const parts = l.date.trim().split(/[-/ ]+/);
            if (parts.length >= 3) {
                if (parts[2].length === 4) {
                    monthsSet.add(`${parts[1]}-${parts[2]}`);
                } else if (parts[0].length === 4) {
                    monthsSet.add(`${parts[1]}-${parts[0]}`);
                }
            }
        }
    });

    const monthsArray = Array.from(monthsSet).sort();
    printModalMonths.value = monthsArray.map(m => {
        const [mm, yyyy] = m.split('-');
        return { value: m, label: `${khmerMonthsMap[mm] || mm} ${yyyy}` };
    });
    
    printModalData.value = { teacherNode: teacherItem, historyData };
    printMode.value = 'teacher';
    selectedPrintMonth.value = '';
    isPrintModalOpen.value = true;
    
  } catch (error) {
    console.error("Failed to prepare teacher print", error);
    alert("Failed to load teacher print data");
  } finally {
    printingSubjectId.value = null;
  }
};

// --- DIRECTORY TRACKING STATE ---
const trackingDirectory = ref([]);
const isFetchingDirectory = ref(true);

const trackingLevel = ref(0); 
const selectedGen = ref('');
const selectedYear = ref('');
const selectedSem = ref('');

// --- PAGINATION & SEARCH STATE ---
const currentPage = ref(1);
const itemsPerPage = ref(10);
const searchQuery = ref('');
const isSearchDropdownOpen = ref(false);

// --- COMPUTED: HIERARCHICAL DIRECTORY ---

// LEVEL 0: Generations
const availableGenerations = computed(() => {
  const gens = new Set(trackingDirectory.value.map(item => item.generation));
  return Array.from(gens).sort();
});

// LEVEL 1: Years
const availableYears = computed(() => {
  const items = trackingDirectory.value.filter(i => i.generation === selectedGen.value);
  const years = new Set(items.map(i => i.year || '?'));
  return Array.from(years).sort();
});

// LEVEL 2: Semesters
const availableSemesters = computed(() => {
  const items = trackingDirectory.value.filter(i => 
    i.generation === selectedGen.value && 
    (i.year || '?') === selectedYear.value
  );
  const sems = new Set(items.map(i => i.semester || '?'));
  return Array.from(sems).sort();
});
// LEVEL 3: Teachers
const availableTeachers = computed(() => {
  const filtered = trackingDirectory.value.filter(i => {
    return i.generation === selectedGen.value && 
           (i.year || '?') === selectedYear.value &&
           (i.semester || '?') === selectedSem.value;
  });

  const teacherMap = {};
  filtered.forEach(item => {
    const teacherKey = (item.teacher || 'Unknown').trim();
    if (!teacherMap[teacherKey]) {
      teacherMap[teacherKey] = { 
        teacher: teacherKey, 
        avatarUrl: item.avatarUrl,
        classes: [],
        departments: new Set(),
        year: item.year,
        semester: item.semester
      };
    }
    if (!teacherMap[teacherKey].classes.some(c => c.tab === item.tab && c.subject === item.subject)) {
      teacherMap[teacherKey].classes.push(item);
    }
    if (item.department) teacherMap[teacherKey].departments.add(item.department);
  });

  return Object.values(teacherMap).map(t => ({
    ...t,
    departments: Array.from(t.departments)
  })).sort((a, b) => a.teacher.localeCompare(b.teacher));
});

// --- PAGINATION COMPUTED & METHODS ---
const filteredTeachers = computed(() => {
  let teachers = availableTeachers.value;
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    teachers = teachers.filter(t => t.teacher.toLowerCase().includes(q));
  }
  return teachers;
});

const totalPages = computed(() => {
  return Math.ceil(filteredTeachers.value.length / itemsPerPage.value);
});

const paginatedTeachers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredTeachers.value.slice(start, start + itemsPerPage.value);
});

const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };
const goToPage = (page) => { currentPage.value = page; };

// --- METHODS ---
const getInitials = (name) => {
  if (!name || name === 'Unknown Teacher') return '?';
  const cleanName = name.replace('លោកគ្រូ', '').replace('អ្នកគ្រូ', '').trim();
  const parts = cleanName.split(' ');
  if (parts.length > 1) {
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }
  return cleanName.charAt(0).toUpperCase();
};

const clearSearch = () => {
  searchQuery.value = '';
  currentPage.value = 1;
};

const closeSearchDropdown = () => {
  setTimeout(() => {
    isSearchDropdownOpen.value = false;
  }, 200);
};

const selectTeacherFromDropdown = (name) => {
  searchQuery.value = name;
  isSearchDropdownOpen.value = false;
  currentPage.value = 1;
};

onMounted(async () => {
  const savedTheme = localStorage.getItem('theme') || 'system';
  if (savedTheme === 'dark' || (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else { document.documentElement.classList.remove('dark'); }

  if (localStorage.getItem('animations') === 'false') { document.documentElement.classList.add('disable-animations'); }

  isFetchingDirectory.value = true;
  try {
    const res = await fetch(import.meta.env.VITE_API_URL + '/api/tracking-directory');
    const data = await res.json();
    if (data.success) trackingDirectory.value = data.data;
  } catch (err) {
    console.error('Failed to load tracking directory from server.');
  } finally {
    isFetchingDirectory.value = false;
  }
});

const selectGen = (gen) => { selectedGen.value = gen; trackingLevel.value = 1; };
const selectYear = (year) => { selectedYear.value = year; trackingLevel.value = 2; };
const selectSem = (sem) => { selectedSem.value = sem; trackingLevel.value = 3; currentPage.value = 1; searchQuery.value = ''; };

const navigateLevel = (level) => {
  trackingLevel.value = level;
  if (level === 0) { selectedGen.value = ''; selectedYear.value = ''; selectedSem.value = ''; }
  if (level === 1) { selectedYear.value = ''; selectedSem.value = ''; }
  if (level === 2) { selectedSem.value = ''; }
  currentPage.value = 1;
  searchQuery.value = '';
};

const navigateToHistory = (teacherNode, autoPrint = false) => {
  const query = { 
    group: teacherNode.tab, 
    subject: teacherNode.subject,
    admin: 'true',
    year: teacherNode.year,
    semester: teacherNode.semester,
    department: teacherNode.department,
    teacher: teacherNode.teacher 
  };
  
  if (autoPrint) {
    query.print = 'true';
    const routeData = router.resolve({ path: '/history', query });
    window.open(routeData.href, '_blank');
  } else {
    router.push({
      path: '/history',
      query
    });
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@700;800&display=swap');

/* Load the local Tacteing font from the public folder to bypass Vite cache */
@font-face {
  font-family: 'Tacteing';
  src: url('/Tacteing.ttf') format('truetype');
}
.font-tacteing { font-family: 'Tacteing', sans-serif; }

.font-moul { 
  font-family: 'Moul', 'Khmer OS Muol Light', 'Moul', 'Kantumruy Pro', sans-serif !important; 
  font-weight: 400 !important;
}

/* 🔥 PRINT CSS MAGIC */
@media print {
  html, body {
    background-color: white !important;
    color: black !important;
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    height: 100% !important;
  }
  
  /* Hide UI elements */
  .z-10, .z-20, .z-30, .z-40, .z-50, main, nav, header, footer, button, .animate-fade-in-up, .w-full.h-full.relative.z-10 {
    display: none !important;
  }
  
  /* Show print template */
  #print-area, #print-teacher-area {
    display: block !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: auto !important;
    margin: 0 !important;
    padding: 0 !important;
    z-index: 999999 !important;
  }

  /* Force print styles */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  /* Handle fonts for print */
  .font-moul { 
    font-family: 'Moul', serif !important; 
    font-weight: normal !important;
    -webkit-text-stroke: 0px !important;
    text-shadow: none !important;
  }

  .font-sans, .font-khmer, td {
    font-family: 'Kantumruy Pro', sans-serif !important;
  }

  table {
    page-break-inside: auto;
  }
  tr {
    page-break-inside: avoid;
    page-break-after: auto;
  }

  @page {
    size: A4 landscape;
    margin: 1.5cm 1cm 1cm 1cm;
  }
}

html.disable-animations *, html.disable-animations *::before, html.disable-animations *::after {
  animation-duration: 0s !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0s !important;
  scroll-behavior: auto !important;
}

.font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
.font-khmer { font-family: 'Kantumruy Pro', sans-serif; }
.font-mono { font-family: 'JetBrains Mono', monospace; }

.custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; }

.tab-fade-enter-active, .tab-fade-leave-active { transition: all 0.3s ease; }
.tab-fade-enter-from { opacity: 0; transform: translateY(10px) scale(0.98); }
.tab-fade-leave-to { opacity: 0; transform: translateY(-10px) scale(0.98); }

.animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob { animation: blob 15s infinite alternate; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

.fallback-initials {
  background: linear-gradient(135deg, #e2e8f0 0%, #f1f5f9 100%);
}
.dark .fallback-initials {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
}
</style>