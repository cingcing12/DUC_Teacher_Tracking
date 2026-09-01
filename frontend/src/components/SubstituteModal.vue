<template>
  <transition name="fade-scale">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" style="background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);">
      <div class="relative w-full max-w-4xl flex flex-col max-h-[95vh] sm:max-h-[90vh]">
        <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl blur opacity-30 z-0 pointer-events-none"></div>

        <div class="relative bg-white dark:bg-[#151928] w-full rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200/60 dark:border-slate-700/60 flex flex-col z-10 flex-1 min-h-0">
          
          <div class="relative px-6 py-5 sm:px-8 sm:py-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#1a1e2f]/50 shrink-0">
            <div class="flex justify-between items-center relative z-10">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                </div>
                <div>
                  <h2 class="text-xl sm:text-2xl font-black text-slate-800 dark:text-white font-khmer tracking-wide">
                    ជ្រើសរើសថ្នាក់បង្រៀនជំនួស
                  </h2>
                  <p class="text-slate-500 dark:text-slate-400 text-sm font-medium mt-0.5">Select a class to substitute</p>
                </div>
              </div>
              <button @click="close" class="p-2.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-all focus:outline-none">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
          </div>

          <div class="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 space-y-8 bg-slate-50/30 dark:bg-[#151928]">
            <div class="space-y-3 relative z-50">
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">1</div>
                <label class="text-base font-bold text-slate-800 dark:text-white font-khmer">ជ្រើសរើសថ្នាក់ / Select Sheet Tab</label>
              </div>
              
              <div class="relative w-full sm:w-1/2">
                <select v-model="selectedTab" @change="fetchTabSchedule" class="w-full bg-white dark:bg-[#1E2235] border border-slate-300 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-slate-800 dark:text-white font-semibold shadow-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer">
                  <option value="" disabled>-- ជ្រើសរើសថ្នាក់ទី --</option>
                  <option v-for="tab in tabs" :key="tab" :value="tab">{{ tab }}</option>
                </select>
                <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                </div>
                
                <div v-if="isLoadingTabs" class="absolute -bottom-6 left-2 text-xs font-semibold text-blue-500 flex items-center gap-1.5 animate-pulse">
                  <svg class="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Loading tabs...
                </div>
              </div>
            </div>

            <div v-if="selectedTab" class="w-full h-px bg-slate-200 dark:bg-slate-800/80"></div>

            <div v-if="selectedTab" class="space-y-4">
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold">2</div>
                  <label class="text-base font-bold text-slate-800 dark:text-white font-khmer">កាលវិភាគ / Schedule</label>
                </div>

                <!-- Filters Container -->
                <div class="flex flex-wrap items-center bg-slate-200/50 dark:bg-[#0f111a] p-1 rounded-2xl border border-slate-300/50 dark:border-slate-800 relative z-40 gap-y-1">
                  <!-- Segmented Control: Today / Full Week -->
                  <div class="flex items-center">
                    <button 
                      @click="activeTab = 'today'; activeDropdown = null" 
                      :class="['px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all', activeTab === 'today' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200']"
                    >
                      Today
                    </button>
                    <button 
                      @click="activeTab = 'week'; selectedDayFilter = 'All'; activeDropdown = null" 
                      :class="['px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all', activeTab === 'week' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200']"
                    >
                      Full Week
                    </button>
                  </div>

                  <!-- Divider if week tab -->
                  <div v-if="activeTab === 'week'" class="hidden sm:block w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1"></div>
                  
                  <!-- Dropdowns (Day only on week, Class & Subject always) -->
                  <div class="flex flex-wrap items-center sm:ml-0 w-full sm:w-auto border-t sm:border-t-0 border-slate-300 dark:border-slate-700 mt-1 pt-1 sm:mt-0 sm:pt-0">
                    
                    <!-- Day Filter -->
                    <div v-if="activeTab === 'week'" class="relative flex-1 sm:flex-none">
                      <button 
                        @click="activeDropdown = activeDropdown === 'day' ? null : 'day'" 
                        :class="['w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all', selectedDayFilter !== 'All' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200']"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <span class="truncate max-w-[60px]">{{ selectedDayFilter === 'All' ? 'Day' : displayDay(selectedDayFilter) }}</span>
                      </button>

                      <transition name="fade-scale">
                        <div v-if="activeDropdown === 'day'" class="absolute top-full right-0 mt-2 w-44 bg-white dark:bg-[#1E2235] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl py-2 z-[60]">
                          <button @click="selectedDayFilter = 'All'; activeDropdown = null" :class="['w-full text-left px-5 py-2.5 text-sm font-bold transition-colors', selectedDayFilter === 'All' ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800']">All Days</button>
                          <button v-for="day in availableDaysDropdown" :key="day" @click="selectedDayFilter = day; activeDropdown = null" :class="['w-full text-left px-5 py-2.5 text-sm font-bold transition-colors', selectedDayFilter === day ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800']">
                            {{ displayDay(day) }}
                          </button>
                        </div>
                      </transition>
                    </div>

                    <!-- Divider for Class/Subject if Week tab -->
                    <div v-if="activeTab === 'week'" class="hidden sm:block w-px h-5 bg-slate-300 dark:bg-slate-700 mx-1"></div>

                    <!-- Class Filter -->
                    <div class="relative flex-1 sm:flex-none">
                      <button 
                        @click="activeDropdown = activeDropdown === 'class' ? null : 'class'" 
                        :class="['w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all', selectedClassFilter !== 'All' ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200']"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        <span class="truncate max-w-[60px]">{{ selectedClassFilter === 'All' ? 'Class' : selectedClassFilter }}</span>
                      </button>

                      <transition name="fade-scale">
                        <div v-if="activeDropdown === 'class'" class="absolute top-full right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 mt-2 w-56 max-h-64 overflow-y-auto custom-scrollbar bg-white dark:bg-[#1E2235] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl py-2 z-[60]">
                          <button @click="selectedClassFilter = 'All'; activeDropdown = null" :class="['w-full text-left px-5 py-2.5 text-sm font-bold transition-colors', selectedClassFilter === 'All' ? 'text-cyan-600 bg-cyan-50 dark:bg-cyan-900/20' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800']">All Classes</button>
                          <button v-for="cls in availableClasses" :key="cls" @click="selectedClassFilter = cls; activeDropdown = null" :class="['w-full text-left px-5 py-2.5 text-sm font-bold transition-colors', selectedClassFilter === cls ? 'text-cyan-600 bg-cyan-50 dark:bg-cyan-900/20' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800']">
                            {{ cls }}
                          </button>
                        </div>
                      </transition>
                    </div>

                    <!-- Subject Filter -->
                    <div class="relative flex-1 sm:flex-none">
                      <button 
                        @click="activeDropdown = activeDropdown === 'subject' ? null : 'subject'" 
                        :class="['w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all', selectedSubjectFilter !== 'All' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200']"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                        <span class="truncate max-w-[60px]">{{ selectedSubjectFilter === 'All' ? 'Subject' : selectedSubjectFilter }}</span>
                      </button>

                      <transition name="fade-scale">
                        <div v-if="activeDropdown === 'subject'" class="absolute top-full right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 mt-2 w-64 max-h-64 overflow-y-auto custom-scrollbar bg-white dark:bg-[#1E2235] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl py-2 z-[60]">
                          <button @click="selectedSubjectFilter = 'All'; activeDropdown = null" :class="['w-full text-left px-5 py-2.5 text-sm font-bold transition-colors', selectedSubjectFilter === 'All' ? 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800']">All Subjects</button>
                          <button v-for="subj in availableSubjects" :key="subj" @click="selectedSubjectFilter = subj; activeDropdown = null" :class="['w-full text-left px-5 py-2.5 text-sm font-bold transition-colors', selectedSubjectFilter === subj ? 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800']">
                            {{ subj }}
                          </button>
                        </div>
                      </transition>
                    </div>

                  </div>
                </div>
              </div>
              
              <div v-if="isLoadingSchedule" class="py-12 flex flex-col items-center justify-center">
                <div class="relative w-16 h-16 mb-6">
                  <div class="absolute inset-0 rounded-full border-y-[3px] border-l-[3px] border-transparent border-t-cyan-400 border-l-cyan-400 animate-spin shadow-[0_0_15px_rgba(34,211,238,0.4)]" style="animation-duration: 1.2s;"></div>
                  <div class="absolute inset-2 rounded-full border-y-[3px] border-r-[3px] border-transparent border-b-indigo-500 border-r-indigo-500 animate-spin shadow-[0_0_15px_rgba(99,102,241,0.4)]" style="animation-duration: 0.9s; animation-direction: reverse;"></div>
                </div>
                <p class="mt-4 font-semibold text-slate-500 dark:text-slate-400">Loading schedules...</p>
              </div>
              
              <div v-else-if="schedule.length === 0 || !hasFilteredClasses" class="py-12 bg-slate-100 dark:bg-slate-800/30 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 text-center">
                <div class="w-16 h-16 bg-slate-200 dark:bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg class="w-8 h-8 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 class="text-lg font-bold text-slate-700 dark:text-slate-300 font-khmer mb-1">មិនមានថ្នាក់បង្រៀនទេ</h3>
                <p class="text-slate-500 dark:text-slate-400 text-sm">No classes scheduled for this selection.</p>
              </div>

              <div v-else class="space-y-8">
                <template v-for="day in filteredDays" :key="day">
                  <div v-if="groupedSchedule[day] && groupedSchedule[day].length > 0">
                    <div class="flex items-center gap-3 mb-4">
                      <h3 class="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">{{ day }}</h3>
                      <div class="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div v-for="(cls, idx) in groupedSchedule[day]" :key="idx" 
                           @click="selectClass(cls)"
                           :class="['group relative bg-white dark:bg-[#1E2235] border rounded-2xl p-5 cursor-pointer transition-all duration-300', 
                                    selectedClass === cls ? 'border-blue-500 shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] ring-1 ring-blue-500 scale-[1.02]' : 'border-slate-200 dark:border-slate-700/80 hover:border-blue-400/50 hover:shadow-lg hover:-translate-y-0.5']">
                        
                        <div class="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3">
                          <div v-if="cls.room" class="flex items-center gap-1 px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            {{ cls.room }}
                          </div>
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
                          <div v-if="cls.generation && cls.generation !== '?'" class="flex items-center px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg text-[10px] font-black font-khmer uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20">
                            ជំនាន់ទី {{ cls.generation }}
                          </div>
                          <div v-if="cls.year && cls.year !== '?'" class="flex items-center px-2.5 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-[10px] font-black font-khmer uppercase tracking-widest border border-blue-100 dark:border-blue-500/20">
                            ឆ្នាំទី {{ cls.year }}
                          </div>
                          <div v-if="cls.semester && cls.semester !== '?'" class="flex items-center px-2.5 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg text-[10px] font-black font-khmer uppercase tracking-widest border border-amber-100 dark:border-amber-500/20">
                            ឆមាសទី {{ cls.semester }}
                          </div>
                        </div>

                        <div class="mb-3">
                          <h4 class="font-black text-slate-800 dark:text-white font-khmer text-lg leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{{ cleanSubjectName(cls.subject) }}</h4>
                        </div>
                        
                        <div class="flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50 pt-3 mt-3">
                          <div class="flex items-center gap-2">
                            <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </div>
                            <div>
                              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lecturer</p>
                              <p class="text-sm font-bold text-slate-700 dark:text-slate-300 font-khmer">{{ cls.teacherName }}</p>
                            </div>
                          </div>
                          <div class="text-right">
                            <span class="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-[#0f111a] text-slate-600 dark:text-slate-300 text-xs px-3 py-1.5 rounded-lg font-mono font-bold border border-slate-200 dark:border-slate-700/50 shadow-sm">
                              <svg class="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                              {{ cls.time }}
                            </span>
                          </div>
                        </div>

                        <div v-if="selectedClass === cls" class="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce-short">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <div class="relative px-6 py-5 sm:px-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#1a1e2f]/80 backdrop-blur-md flex justify-between items-center shrink-0">
            <button @click="close" class="px-5 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all">
              Cancel
            </button>
            <button @click="proceedToTrack" :disabled="!selectedClass" class="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2 shadow-lg shadow-blue-500/30 font-khmer">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
              ស្រង់វត្តមានថ្នាក់នេះ
            </button>
          </div>

        </div>
      </div>
    </div>
  </transition>

  <!-- Data Error Modal -->
  <transition name="fade-scale">
    <div v-if="customAlert.show" class="fixed inset-0 z-[110] flex items-center justify-center p-6" style="background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);">
      <div class="bg-[#11131e] border border-slate-700/50 rounded-[2rem] max-w-sm w-full p-8 text-center shadow-2xl">
        <div class="w-20 h-20 mx-auto bg-gradient-to-br from-red-400 to-rose-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-red-500/30">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        </div>
        <h3 class="text-2xl font-black text-white mb-4">Database Error</h3>
        <p class="text-slate-400 text-sm leading-relaxed mb-8">
          This class cannot be tracked because its Department, Year, Semester, or Room is missing from the Master Database. Please contact the administrator to fix the database alignment.
        </p>
        <div class="space-y-3">
          <a href="https://t.me/Vongsokpheak" target="_blank" class="block w-full py-3.5 px-4 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold rounded-xl transition-colors">
            CONTACT ME ON TELEGRAM
          </a>
          <button @click="closeAlert" class="block w-full py-3.5 px-4 text-slate-300 hover:text-white font-bold rounded-xl transition-colors">
            UNDERSTOOD
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({ isOpen: Boolean });
const emit = defineEmits(['close']);
const router = useRouter();

const tabs = ref([]);
const schedule = ref([]);
const selectedTab = ref('');
const selectedClass = ref(null);
const isLoadingTabs = ref(false);
const isLoadingSchedule = ref(false);

const activeTab = ref('week');
const activeDropdown = ref(null);
const selectedDayFilter = ref('All');
const selectedClassFilter = ref('All');
const selectedSubjectFilter = ref('All');

const customAlert = ref({ show: false });
const showDataError = () => { customAlert.value.show = true; };
const closeAlert = () => { customAlert.value.show = false; };

const englishDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const todayName = computed(() => {
  const dayIndex = new Date().getDay();
  return englishDays[dayIndex];
});

const displayDay = (dayEn) => {
  const map = {
    'Monday': 'Mon', 'Tuesday': 'Tue', 'Wednesday': 'Wed', 'Thursday': 'Thu',
    'Friday': 'Fri', 'Saturday': 'Sat', 'Sunday': 'Sun'
  };
  return map[dayEn] || dayEn;
};

const cleanSubjectName = (subject) => {
  if (!subject) return 'Unknown Subject';
  const cleaned = String(subject).replace(/\s*\(.*?\)\s*/g, '').trim();
  return cleaned || subject || 'Unknown Subject';
};

const availableClasses = computed(() => {
  let filteredSchedule = schedule.value;
  if (selectedSubjectFilter.value !== 'All') {
    filteredSchedule = filteredSchedule.filter(c => cleanSubjectName(c.subject) === selectedSubjectFilter.value);
  }
  if (selectedDayFilter.value !== 'All') {
    filteredSchedule = filteredSchedule.filter(c => {
       const cd = c.day ? c.day.trim() : null;
       const md = englishDays.find(d => cd && cd.toLowerCase() === d.toLowerCase());
       return md === selectedDayFilter.value;
    });
  }
  const groups = new Set(filteredSchedule.map(c => c.group).filter(Boolean));
  return Array.from(groups).sort();
});

const availableSubjects = computed(() => {
  let filteredSchedule = schedule.value;
  if (selectedClassFilter.value !== 'All') {
    filteredSchedule = filteredSchedule.filter(c => c.group === selectedClassFilter.value);
  }
  if (selectedDayFilter.value !== 'All') {
    filteredSchedule = filteredSchedule.filter(c => {
       const cd = c.day ? c.day.trim() : null;
       const md = englishDays.find(d => cd && cd.toLowerCase() === d.toLowerCase());
       return md === selectedDayFilter.value;
    });
  }
  const subjects = new Set(filteredSchedule.map(c => cleanSubjectName(c.subject)).filter(Boolean));
  return Array.from(subjects).sort();
});

const availableDaysDropdown = computed(() => {
  let filteredSchedule = schedule.value;
  if (selectedClassFilter.value !== 'All') {
    filteredSchedule = filteredSchedule.filter(c => c.group === selectedClassFilter.value);
  }
  if (selectedSubjectFilter.value !== 'All') {
    filteredSchedule = filteredSchedule.filter(c => cleanSubjectName(c.subject) === selectedSubjectFilter.value);
  }
  
  const daysWithClasses = new Set();
  filteredSchedule.forEach(cls => {
    const cleanDay = cls.day ? cls.day.trim() : null;
    const matchDay = englishDays.find(d => cleanDay && cleanDay.toLowerCase() === d.toLowerCase());
    if (matchDay && matchDay !== 'Unknown') daysWithClasses.add(matchDay);
  });
  
  return englishDays.filter(d => daysWithClasses.has(d));
});

const filteredDays = computed(() => {
  const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Unknown'];
  if (activeTab.value === 'today') return [todayName.value];
  return selectedDayFilter.value === 'All' ? allDays : [selectedDayFilter.value];
});

const hasFilteredClasses = computed(() => {
  return filteredDays.value.some(day => groupedSchedule.value[day] && groupedSchedule.value[day].length > 0);
});

const groupedSchedule = computed(() => {
  const groups = {};
  ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Unknown'].forEach(day => groups[day] = []);
  schedule.value.forEach(cls => {
    // Apply filters
    if (selectedClassFilter.value !== 'All' && cls.group !== selectedClassFilter.value) return;
    if (selectedSubjectFilter.value !== 'All' && cleanSubjectName(cls.subject) !== selectedSubjectFilter.value) return;

    const cleanDay = cls.day ? cls.day.trim() : null;
    const matchDay = englishDays.find(d => cleanDay && cleanDay.toLowerCase() === d.toLowerCase());
    matchDay ? groups[matchDay].push(cls) : groups['Unknown'].push(cls);
  });
  Object.keys(groups).forEach(day => {
    groups[day].sort((a, b) => {
      const getHour = (t) => {
        if (!t) return 99;
        let h = parseInt(t.match(/(\d+):/)?.[1] || 99);
        if (h >= 1 && h <= 6) h += 12;
        return h;
      };
      return getHour(a.time) - getHour(b.time);
    });
  });
  return groups;
});

const fetchTabs = async () => {
  if (tabs.value.length > 0) return;
  isLoadingTabs.value = true;
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/attendance-tabs`);
    const data = await res.json();
    if (data.success) tabs.value = data.data;
  } catch (e) { console.error(e); } finally { isLoadingTabs.value = false; }
};

const fetchTabSchedule = async () => {
  schedule.value = [];
  selectedClass.value = null;
  if (!selectedTab.value) return;
  isLoadingSchedule.value = true;
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tab-schedule?tabName=${encodeURIComponent(selectedTab.value)}`);
    const data = await res.json();
    if (data.success) schedule.value = data.data;
  } catch (e) { console.error(e); } finally { isLoadingSchedule.value = false; }
};

const selectClass = (cls) => { selectedClass.value = cls; };

const close = () => {
  emit('close');
  setTimeout(() => {
    selectedTab.value = '';
    selectedClass.value = null;
    schedule.value = [];
  }, 300);
};

const proceedToTrack = () => {
  if (!selectedClass.value) return;
  const cls = selectedClass.value;
  
  if (!cls.department || cls.department === '?' || !cls.majorName || cls.majorName === '?' || !cls.year || cls.year === '?' || !cls.semester || cls.semester === '?' || !cls.room || cls.room === '?') {
    showDataError();
    return;
  }

  router.push({
    path: '/tracking',
    query: {
      subject: cls.subject, group: cls.group, room: cls.room, time: cls.time, day: cls.day,
      year: cls.year, semester: cls.semester, department: cls.department, majorName: cls.majorName, substituteFor: cls.teacherName
    }
  });
  close();
};

watch(() => props.isOpen, (newVal) => { if (newVal) fetchTabs(); });

const handleSSEUpdate = () => {
  if (props.isOpen && selectedTab.value) {
    fetchTabSchedule();
  }
};

onMounted(() => {
  window.addEventListener('class-toggled', handleSSEUpdate);
  window.addEventListener('mapping-updated', handleSSEUpdate);
});

onUnmounted(() => {
  window.removeEventListener('class-toggled', handleSSEUpdate);
  window.removeEventListener('mapping-updated', handleSSEUpdate);
});
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
