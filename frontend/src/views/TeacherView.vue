<template>
  <div class="w-full h-full relative">
    
    <main class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-2 pb-24 sm:pb-12">
      
      <div v-if="teacher" class="mb-6 sm:mb-8 animate-fade-in-up" style="animation-delay: 0.1s;">
        <p :class="['text-indigo-500 font-black tracking-widest uppercase text-[9px] sm:text-[10px] mb-1.5 sm:mb-2 flex items-center gap-2', language === 'kh' ? 'font-khmer text-xs' : '']">
          <span class="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
          {{ t.academicTimetable }}
        </p>
        <h1 :class="['text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-none', language === 'kh' ? 'font-khmer leading-snug tracking-normal' : '']">
          {{ t.yourSchedule }}
        </h1>
      </div>

      <div v-if="teacher && !isLoading && !hasError" class="relative z-50 mb-6 sm:mb-10 animate-fade-in-up" style="animation-delay: 0.2s;">
        <div class="flex items-center gap-1 sm:gap-2 bg-white/40 dark:bg-slate-800/40 p-1.5 rounded-[1.25rem] w-max backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
          
          <button 
            @click="activeTab = 'today'; isDropdownOpen = false" 
            :class="['px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-widest transition-all duration-300', activeTab === 'today' ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/25' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50', language === 'kh' ? 'font-khmer' : '']"
          >
            {{ t.todayClasses }}
          </button>

          <button 
            @click="activeTab = 'week'; selectedDayFilter = 'All'; isDropdownOpen = false" 
            :class="['px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-widest transition-all duration-300', activeTab === 'week' ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/25' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50', language === 'kh' ? 'font-khmer' : '']"
          >
            {{ t.fullWeek }}
          </button>

          <div v-if="activeTab === 'week'" class="relative flex items-center border-l border-slate-300/50 dark:border-slate-600/50 pl-1 sm:pl-2 ml-1 sm:ml-0 animate-fade-in">
            <button 
              @click="isDropdownOpen = !isDropdownOpen" 
              :class="['flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-widest transition-all duration-300', selectedDayFilter !== 'All' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50', language === 'kh' ? 'font-khmer' : '']"
            >
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
              <span class="hidden sm:inline">{{ selectedDayFilter === 'All' ? t.filterDays : displayDay(selectedDayFilter) }}</span>
              <span class="sm:hidden">{{ selectedDayFilter === 'All' ? t.all : displayDay(selectedDayFilter).substring(0,3) }}</span>
            </button>

            <transition name="fade-scale">
              <div v-if="isDropdownOpen" class="absolute top-full right-0 mt-2 w-40 sm:w-48 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden py-2 z-[60]">
                <button @click="selectDay('All')" :class="['w-full text-left px-4 sm:px-5 py-2.5 sm:py-3 text-xs font-black uppercase tracking-widest transition-colors', selectedDayFilter === 'All' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50', language === 'kh' ? 'font-khmer text-sm' : '']">
                  {{ t.allDays }}
                </button>
                <button v-for="day in availableDays" :key="day" @click="selectDay(day)" :class="['w-full text-left px-4 sm:px-5 py-2.5 sm:py-3 text-xs font-black uppercase tracking-widest transition-colors border-t border-slate-100 dark:border-slate-700/50', selectedDayFilter === day ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50', language === 'kh' ? 'font-khmer text-sm' : '']">
                  {{ displayDay(day) }}
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <div v-if="isDropdownOpen" @click="isDropdownOpen = false" class="fixed inset-0 z-40"></div>

      <div v-if="isLoading" class="relative mt-6 sm:mt-8">
        <div class="absolute left-[27px] sm:left-[35px] top-6 bottom-10 w-[3px] bg-slate-200/50 dark:bg-slate-700/50 z-0 rounded-full overflow-hidden"></div>
        <div class="space-y-8 sm:space-y-12">
          <div v-for="i in 2" :key="`skeleton-day-${i}`" class="relative">
            <div class="sticky top-[70px] sm:top-[96px] z-30 py-2 sm:py-3 flex items-center gap-4 mb-4 sm:mb-6">
              <div class="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 shrink-0">
                <div class="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse border-[3px] sm:border-[4px] border-[#F1F5F9] dark:border-[#0B1120] shadow-sm z-10"></div>
              </div>
              <div class="h-6 sm:h-8 w-24 sm:w-32 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"></div>
            </div>
            <div class="flex flex-col gap-4 sm:gap-6 pl-10 sm:pl-16 relative z-10">
              <div v-for="j in 2" :key="`skeleton-card-${j}`" class="relative rounded-2xl sm:rounded-[2rem] bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-slate-200/40 dark:border-slate-700/40 overflow-hidden flex flex-col sm:flex-row shadow-sm">
                <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 dark:via-white/5 to-transparent z-20 pointer-events-none"></div>
                <div class="sm:w-40 shrink-0 bg-slate-50/50 dark:bg-slate-800/50 p-4 sm:p-5 flex flex-row sm:flex-col items-center sm:items-start sm:justify-center border-b sm:border-b-0 sm:border-r border-slate-100/50 dark:border-slate-700/50 gap-3 sm:gap-2">
                  <div class="h-6 sm:h-8 w-16 sm:w-20 bg-slate-300 dark:bg-slate-600 rounded-lg animate-pulse"></div>
                  <div class="hidden sm:block h-4 w-4 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse my-1"></div>
                  <div class="h-5 sm:h-6 w-12 sm:w-16 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
                </div>
                <div class="flex-grow p-4 sm:p-6 flex flex-col relative z-10 justify-between">
                  <div>
                    <div class="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                      <div class="h-5 sm:h-6 w-14 sm:w-16 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse"></div>
                      <div class="h-5 sm:h-6 w-20 sm:w-24 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse"></div>
                    </div>
                    <div class="h-6 sm:h-8 w-3/4 bg-slate-300 dark:bg-slate-600 rounded-lg animate-pulse mb-4 sm:mb-6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="hasError" class="relative mt-8 animate-fade-in-up">
        <div class="flex flex-col items-center justify-center py-12 sm:py-16 px-6 text-center rounded-[2rem] bg-white/60 dark:bg-slate-800/40 backdrop-blur-xl border border-red-200/60 dark:border-red-900/30 shadow-sm relative overflow-hidden">
          <div class="w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-5 rounded-2xl bg-gradient-to-br from-red-50 to-white dark:from-red-900/40 dark:to-slate-900 flex items-center justify-center border border-red-100 dark:border-red-800/50 shadow-sm -rotate-3">
            <svg class="w-8 h-8 sm:w-10 sm:h-10 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"></path></svg>
          </div>
          <h3 :class="['text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-2', language === 'kh' ? 'font-khmer' : '']">{{ t.connectionLost }}</h3>
          <p :class="['text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-sm mb-6', language === 'kh' ? 'font-khmer' : '']">{{ t.connectionError }}</p>
          <button @click="refreshTeacherData" :class="['px-5 sm:px-6 py-2 sm:py-2.5 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 text-red-600 dark:text-red-400 rounded-xl text-sm font-bold transition-all shadow-sm flex items-center gap-2 group', language === 'kh' ? 'font-khmer' : '']">
            <svg class="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            {{ t.tryAgain }}
          </button>
        </div>
      </div>

      <div v-else-if="Object.keys(displayedSchedule).length === 0" class="relative mt-8 animate-fade-in-up">
        <div class="flex flex-col items-center justify-center py-12 sm:py-16 px-6 text-center rounded-[2rem] bg-white/60 dark:bg-slate-800/40 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/50 shadow-sm relative overflow-hidden">
          <div class="w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-5 rounded-2xl bg-gradient-to-br from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm rotate-3 relative z-10">
            <svg v-if="activeTab === 'today'" class="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <svg v-else class="w-8 h-8 sm:w-10 sm:h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          <h3 :class="['text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-2', language === 'kh' ? 'font-khmer' : '']">
            {{ activeTab === 'today' ? t.dayOff : (selectedDayFilter !== 'All' ? t.noClasses : t.clearSchedule) }}
          </h3>
          <p :class="['text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-sm mb-6 relative z-10', language === 'kh' ? 'font-khmer' : '']">
            {{ activeTab === 'today' ? t.msgDayOff : (selectedDayFilter !== 'All' ? t.msgNoClasses(displayDay(selectedDayFilter)) : t.msgClear) }}
          </p>
          <button v-if="activeTab === 'week' && selectedDayFilter === 'All'" @click="refreshTeacherData" :class="['px-6 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-900 dark:text-white rounded-xl font-bold transition-all border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-2 group', language === 'kh' ? 'font-khmer' : '']">
            <svg class="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            {{ t.reloadData }}
          </button>
        </div>
      </div>

      <div v-else class="relative mt-6 sm:mt-8">
        <div class="absolute left-[23px] sm:left-[35px] top-6 bottom-10 w-[2px] sm:w-[3px] bg-slate-200/50 dark:bg-slate-700/50 z-0 rounded-full overflow-hidden">
          <div class="w-full h-1/3 bg-gradient-to-b from-transparent via-indigo-500 to-transparent animate-data-flow"></div>
        </div>

        <div class="space-y-8 sm:space-y-12">
          <div v-for="(classes, day, index) in displayedSchedule" :key="day" class="relative animate-fade-in-up" :style="`animation-delay: ${0.1 * index}s;`">
            
            <div class="sticky top-[60px] sm:top-[96px] z-30 py-2 sm:py-3 px-3 sm:px-4 flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 shadow-sm border border-white/50 dark:border-slate-700/50 rounded-xl sm:rounded-2xl w-max ml-0 sm:ml-2">
              <div class="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 shrink-0">
                <div class="absolute inset-0 bg-indigo-400 rounded-full animate-ping opacity-30"></div>
                <div class="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white dark:bg-slate-900 border-[3px] sm:border-[4px] border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] z-10"></div>
              </div>
              <h3 :class="['text-base sm:text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase pr-2', language === 'kh' ? 'font-khmer' : '']">
                {{ displayDay(day) }}
              </h3>
            </div>

            <div class="flex flex-col gap-4 sm:gap-5 pl-10 sm:pl-16 relative z-10">
              <div v-for="cls in classes" :key="cls.time + cls.room" class="group relative rounded-2xl sm:rounded-[2rem] bg-white/80 dark:bg-slate-800/60 backdrop-blur-xl shadow-sm border border-slate-200/60 dark:border-slate-700/50 hover:shadow-lg sm:hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all duration-300 overflow-hidden flex flex-col sm:flex-row">
                
                <div class="sm:w-40 shrink-0 bg-slate-50/80 dark:bg-slate-800/80 p-3.5 sm:p-5 flex flex-row sm:flex-col items-center justify-between sm:items-start sm:justify-center border-b sm:border-b-0 sm:border-r border-slate-100 dark:border-slate-700/50 relative overflow-hidden gap-2 sm:gap-1">
                  <div class="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                  
                  <div class="hidden sm:block">
                    <p :class="['text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2', language === 'kh' ? 'font-khmer text-[10px]' : '']">{{ t.timeblock }}</p>
                  </div>
                  
                  <div class="flex flex-row sm:flex-col items-center sm:items-start gap-1 sm:gap-0">
                    <template v-if="cls.time && cls.time.includes('-')">
                      <p class="text-lg sm:text-3xl font-black tracking-tighter text-slate-900 dark:text-white font-mono leading-none">{{ cls.time.split('-')[0].trim() }}</p>
                      <div class="text-slate-300 dark:text-slate-600 sm:my-1 mx-1 sm:mx-0 opacity-70">
                        <svg class="w-3 h-3 sm:w-4 sm:h-4 rotate-0 sm:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7-7m7-7H3" class="sm:hidden"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 14l-7 7m0 0l-7-7m7-7V3" class="hidden sm:block"></path></svg>
                      </div>
                      <p class="text-base sm:text-2xl font-black tracking-tighter text-slate-500 dark:text-slate-400 font-mono leading-none">{{ cls.time.split('-')[1].trim() }}</p>
                    </template>
                    <template v-else>
                      <p class="text-lg sm:text-3xl font-black tracking-tighter text-slate-900 dark:text-white font-mono">{{ cls.time }}</p>
                    </template>
                  </div>

                  <div class="sm:hidden flex items-center gap-1 px-2 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-md text-[9px] font-black font-mono uppercase tracking-wider shadow-sm">
                    <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {{ cls.room }}
                  </div>
                </div>

                <div class="flex-grow p-4 sm:p-6 flex flex-col relative z-10 justify-between">
                  <div>
                    <div class="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                      <div class="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-md text-[10px] font-black font-mono uppercase tracking-wider shadow-sm">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        {{ cls.room }}
                      </div>

                      <div v-if="cls.department && cls.department !== '?'" class="flex items-center px-2 py-0.5 sm:py-1 bg-fuchsia-50 dark:bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 rounded-md text-[9px] font-black font-khmer uppercase tracking-widest border border-fuchsia-100 dark:border-fuchsia-500/20 truncate max-w-[120px] sm:max-w-[150px]" :title="cls.department">
                        {{ cls.department }}
                      </div>

                      <div v-if="extractGen(cls.group)" class="flex items-center px-2 py-0.5 sm:py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md text-[9px] font-black font-khmer uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20">
                        ជំនាន់ទី {{ extractGen(cls.group) }}
                      </div>
                      
                      <div v-if="cls.year && cls.year !== '?'" class="flex items-center px-2 py-0.5 sm:py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-md text-[9px] font-black font-khmer uppercase tracking-widest border border-blue-100 dark:border-blue-500/20">
                        ឆ្នាំទី {{ cls.year }}
                      </div>

                      <div v-if="cls.semester && cls.semester !== '?'" class="flex items-center px-2 py-0.5 sm:py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-md text-[9px] font-black font-khmer uppercase tracking-widest border border-amber-100 dark:border-amber-500/20">
                        ឆមាសទី {{ cls.semester }}
                      </div>

                      <div v-if="cls.department === '?' || cls.year === '?' || cls.semester === '?'" :class="['flex items-center gap-1 px-2 py-0.5 sm:py-1 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-md text-[9px] font-black uppercase tracking-widest border border-red-200 dark:border-red-500/30 shadow-sm animate-pulse', language === 'kh' ? 'font-khmer' : '']">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        {{ t.incompleteData }}
                      </div>
                    </div>

                    <h4 class="text-xl sm:text-3xl font-black text-slate-900 dark:text-white font-khmer leading-snug sm:leading-tight mb-4 sm:mb-6">
                      {{ cleanSubjectName(cls.subject) }}
                    </h4>
                  </div>
                  
                  <div class="flex flex-row items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-700/50">
                    
                    <button 
                      v-if="cls.department !== '?' && cls.year !== '?' && cls.semester !== '?'"
                      @click="openTrackingForm(cls)" 
                      :class="['flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 bg-indigo-50 dark:bg-indigo-500/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-bold text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition-all duration-300', language === 'kh' ? 'font-khmer' : '']"
                    >
                      <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
                      {{ t.track }}: {{ cls.group }}
                    </button>
                    
                    <button 
                      v-else
                      @click="showDataError(cls)" 
                      :class="['flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 bg-red-50 dark:bg-red-500/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-bold text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30 hover:bg-red-600 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-all duration-300', language === 'kh' ? 'font-khmer' : '']"
                    >
                      <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                      {{ t.contactAdmin }}
                    </button>

                    <button @click="openHistoryView(cls)" :class="['flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 bg-white dark:bg-slate-800 shadow-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-cyan-400 hover:text-cyan-600 dark:hover:border-cyan-500 dark:hover:text-cyan-400 transition-all duration-300', language === 'kh' ? 'font-khmer' : '']">
                      <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      {{ t.history }}
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <transition name="fade-scale">
      <div v-if="customAlert.show" class="fixed inset-0 z-[130] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xl transition-opacity" @click="closeAlert"></div>
        <div class="relative w-full max-w-sm bg-white dark:bg-[#0A0A0A] rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,0.3)] overflow-hidden border border-slate-200 dark:border-white/10 flex flex-col z-10 p-6 sm:p-8 text-center ring-1 ring-slate-200 dark:ring-white/5">
          <div class="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none bg-red-500/20"></div>
          
          <div class="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-5 shadow-2xl relative bg-gradient-to-br from-red-400 to-rose-600 shadow-red-500/40 animate-bounce-short">
            <div class="absolute inset-0 rounded-full border-2 border-white/30 mix-blend-overlay"></div>
            <svg class="w-8 h-8 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          
          <h3 :class="['text-xl font-black text-slate-900 dark:text-white mb-2 tracking-tight', language === 'kh' ? 'font-khmer' : '']">{{ t.dbError }}</h3>
          <p :class="['text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed', language === 'kh' ? 'font-khmer' : '']">
            {{ t.dbErrorMsg }}
          </p>
          
          <button @click="closeAlert" :class="['w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:scale-[1.02]', language === 'kh' ? 'font-khmer' : '']">
            {{ t.understood }}
          </button>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onActivated } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const teacher = ref(null);
const mySchedule = ref([]);
const isLoading = ref(true);
const hasError = ref(false);

// 🔥 Dropdown State
const activeTab = ref('today'); // 'today' or 'week'
const selectedDayFilter = ref('All');
const isDropdownOpen = ref(false);

// 🔥 MODAL STATE
const customAlert = ref({ show: false });

const showDataError = (cls) => {
  customAlert.value.show = true;
};

const closeAlert = () => {
  customAlert.value.show = false;
};

// --- LANGUAGE STATE & DICTIONARY ---
const language = ref(localStorage.getItem('app_lang') || 'en');

// Auto-sync if changed in another tab (like Settings)
window.addEventListener('storage', (e) => {
  if (e.key === 'app_lang') {
    language.value = e.newValue || 'en';
  }
});

const khmerDays = {
  'Monday': 'ច័ន្ទ',
  'Tuesday': 'អង្គារ',
  'Wednesday': 'ពុធ',
  'Thursday': 'ព្រហស្បតិ៍',
  'Friday': 'សុក្រ',
  'Saturday': 'សៅរ៍',
  'Sunday': 'អាទិត្យ'
};

const displayDay = (day) => {
  return language.value === 'kh' ? (khmerDays[day] || day) : day;
};

const t = computed(() => {
  if (language.value === 'kh') {
    return {
      academicTimetable: 'កាលវិភាគសិក្សា',
      yourSchedule: 'កាលវិភាគរបស់អ្នក',
      todayClasses: 'ថ្នាក់រៀនថ្ងៃនេះ',
      fullWeek: 'ពេញមួយសប្តាហ៍',
      filterDays: 'ជ្រើសរើសថ្ងៃ',
      all: 'ទាំងអស់',
      allDays: 'គ្រប់ថ្ងៃ',
      timeblock: 'ម៉ោងសិក្សា',
      track: 'ស្រង់វត្តមាន',
      contactAdmin: 'ទាក់ទងរដ្ឋបាល',
      history: 'ប្រវត្តិ',
      incompleteData: 'ទិន្នន័យមិនពេញលេញ',
      dayOff: 'ថ្ងៃសម្រាក!',
      noClasses: 'គ្មានថ្នាក់រៀនទេ',
      clearSchedule: 'កាលវិភាគទទេ',
      msgDayOff: 'អ្នកមិនមានថ្នាក់បង្រៀនទេថ្ងៃនេះ។ រីករាយថ្ងៃសម្រាក!',
      msgNoClasses: (day) => `អ្នកមិនមានថ្នាក់បង្រៀននៅថ្ងៃ ${day} ទេ។`,
      msgClear: 'អ្នកមិនទាន់មានថ្នាក់បង្រៀននៅក្នុងឆមាសនេះទេ។',
      reloadData: 'ទាញយកទិន្នន័យឡើងវិញ',
      connectionLost: 'បាត់បង់ការតភ្ជាប់',
      connectionError: 'មិនអាចភ្ជាប់ទៅកាន់ម៉ាស៊ីនមេបានទេ។ សូមពិនិត្យមើលការតភ្ជាប់អ៊ីនធឺណិតរបស់អ្នក។',
      tryAgain: 'ព្យាយាមម្តងទៀត',
      dbError: 'កំហុសទិន្នន័យ',
      dbErrorMsg: 'ថ្នាក់នេះមិនអាចស្រង់វត្តមានបានទេ ដោយសារតែខ្វះ ជំនាញ ឆ្នាំ ឬឆមាស នៅក្នុងប្រព័ន្ធទិន្នន័យមេ។ សូមទាក់ទងអ្នកគ្រប់គ្រង។',
      understood: 'យល់ព្រម'
    };
  }
  return {
    academicTimetable: 'Academic Timetable',
    yourSchedule: 'Your Schedule',
    todayClasses: 'Today\'s Classes',
    fullWeek: 'Full Week',
    filterDays: 'Filter Days',
    all: 'All',
    allDays: 'All Days',
    timeblock: 'Timeblock',
    track: 'Track',
    contactAdmin: 'Contact Admin',
    history: 'History',
    incompleteData: 'Incomplete Data',
    dayOff: 'Day Off!',
    noClasses: 'No Classes',
    clearSchedule: 'Clear Schedule',
    msgDayOff: 'You don\'t have any classes to teach today. Enjoy your free time!',
    msgNoClasses: (day) => `You have no classes scheduled for ${day}.`,
    msgClear: 'You don\'t have any classes assigned for this semester yet.',
    reloadData: 'Reload Data',
    connectionLost: 'Connection Lost',
    connectionError: 'We couldn\'t reach the server. Please check your internet connection.',
    tryAgain: 'Try Again',
    dbError: 'Database Error',
    dbErrorMsg: 'This class cannot be tracked because its Department, Year, or Semester is missing from the Master Database. Please contact the administrator to fix the database alignment.',
    understood: 'Understood'
  };
});

const englishDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const todayName = computed(() => {
  const dayIndex = new Date().getDay();
  return englishDays[dayIndex];
});

const availableDays = computed(() => {
  const days = new Set();
  mySchedule.value.forEach(cls => {
    if (cls.day && cls.day.trim() !== '') {
      const cleanDay = cls.day.trim();
      const dayName = cleanDay.charAt(0).toUpperCase() + cleanDay.slice(1).toLowerCase();
      days.add(dayName);
    }
  });
  
  const order = { 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6, 'Sunday': 7 };
  return Array.from(days).sort((a, b) => (order[a] || 99) - (order[b] || 99));
});

const selectDay = (day) => {
  selectedDayFilter.value = day;
  activeTab.value = 'week';
  isDropdownOpen.value = false;
};

const cleanSubjectName = (subject) => {
  if (!subject) return '';
  return subject
    .replace(/\s+/g, ' ')          
    .replace(/\s*\(\s*/g, ' (')    
    .replace(/\s*\)\s*/g, ')')      
    .trim();                        
};

const openTrackingForm = (cls) => {
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
      department: cls.department
    }
  });
};

const extractGen = (groupName) => {
  if (!groupName) return '';
  const match = groupName.match(/G(\d+)/i);
  return match ? match[1] : '';
};

const openHistoryView = (cls) => {
  const teacherName = teacher.value?.nameKh || '';
  const cleanTeacherName = teacherName.replace(/លោកគ្រូ|អ្នកគ្រូ/g, '').trim();
  const exactFullTabName = `${cls.group}-${cleanTeacherName}-${cls.subject}`.substring(0, 100);

  router.push({
    path: '/history',
    query: {
      group: exactFullTabName, 
      subject: cls.subject
    }
  });
};

const refreshTeacherData = async (showLoader = true) => {
  const token = localStorage.getItem('duc_teacher_token');
  if (token) teacher.value = JSON.parse(token);
  
  if (teacher.value) {
    if (showLoader) isLoading.value = true;
    hasError.value = false;
    
    try {
      const res = await fetch(`https://duc-teacher-tracking.onrender.com/api/my-schedule?name=${encodeURIComponent(teacher.value.nameKh)}`);
      if (!res.ok) throw new Error('Network response was not ok');
      
      const data = await res.json();
      if (data.success) {
        mySchedule.value = data.data;
      } else {
        throw new Error('API returned unsuccessful response');
      }
    } catch (err) {
      if (showLoader) hasError.value = true;
    } finally {
      if (showLoader) isLoading.value = false;
    }
  }
};

onActivated(() => { 
  refreshTeacherData(false); 
});

onMounted(() => {
  const token = localStorage.getItem('duc_teacher_token');
  if (!token) {
    router.push('/login');
    return;
  }
  refreshTeacherData(true);
});

const displayedSchedule = computed(() => {
  const groups = {};
  const validClasses = mySchedule.value.filter(cls => {
    return (cls.subject && cls.subject.trim() !== '') || (cls.time && cls.time.trim() !== '');
  });

  let classesToShow = validClasses;

  if (activeTab.value === 'today') {
    classesToShow = validClasses.filter(cls => 
      cls.day && cls.day.trim().toLowerCase() === todayName.value.toLowerCase()
    );
    if (classesToShow.length === 0) return {}; 
  } 
  else if (activeTab.value === 'week' && selectedDayFilter.value !== 'All') {
    classesToShow = validClasses.filter(cls => 
      cls.day && cls.day.trim().toLowerCase() === selectedDayFilter.value.toLowerCase()
    );
    if (classesToShow.length === 0) return {};
  }

  classesToShow.forEach(cls => {
    const cleanDay = cls.day.trim();
    const dayKey = cleanDay.charAt(0).toUpperCase() + cleanDay.slice(1).toLowerCase();
    if (!groups[dayKey]) groups[dayKey] = [];
    groups[dayKey].push(cls);
  });

  Object.keys(groups).forEach(day => {
    groups[day].sort((a, b) => {
      const getHour = (t) => t ? parseInt(t.match(/(\d+):/)?.[1] || 99) : 99;
      return getHour(a.time) - getHour(b.time);
    });
  });

  return groups;
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Siemreap&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@700;800&family=Kantumruy+Pro:wght@400;500;600;700&display=swap');
.font-sans { font-family: 'Inter', sans-serif; }
.font-khmer { font-family: 'Kantumruy Pro', 'Siemreap', sans-serif; }
.font-mono { font-family: 'JetBrains Mono', monospace; }

@keyframes dataFlow {
  0% { transform: translateY(-100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(300%); opacity: 0; }
}
.animate-data-flow { animation: dataFlow 3s ease-in-out infinite; }
.animate-fade-in-up { animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }

@keyframes shimmer {
  100% { transform: translateX(100%); }
}

@keyframes bounce-short { 
  0% { transform: scale(0.8); opacity: 0; } 
  60% { transform: scale(1.1); opacity: 1; } 
  100% { transform: scale(1); opacity: 1; } 
}
.animate-bounce-short { animation: bounce-short 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

.fade-scale-enter-active, .fade-scale-leave-active { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
.fade-scale-enter-from, .fade-scale-leave-to { opacity: 0; transform: scale(0.9) translateY(-10px); }
</style>