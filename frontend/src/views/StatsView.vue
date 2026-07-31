<template>
  <div class="w-full h-full relative min-h-screen bg-transparent text-slate-900 dark:text-slate-50 transition-colors duration-700">
    
    <!-- ========================================== -->
    <!-- APP UI (HIDDEN DURING PRINT)               -->
    <!-- ========================================== -->
    <div class="print:hidden w-full h-full relative pb-32 sm:pb-0 font-sans selection:bg-indigo-500 selection:text-white">
      
      <!-- MAIN CONTENT AREA -->
      <main class="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-32 sm:pb-12 flex flex-col">
        
        <div class="w-full flex justify-start mb-6 sm:mb-8 animate-fade-in-up">
          <button @click="goBack" :class="['group flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors w-max', language === 'kh' ? 'font-khmer' : '']">
            <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
              <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
            </div>
            {{ t.back }}
          </button>
        </div>

        <div class="mb-6 sm:mb-8 text-center animate-fade-in-up" style="animation-delay: 0.1s;">
          <p :class="['text-indigo-500 font-black tracking-widest uppercase text-[9px] sm:text-[10px] mb-2 flex items-center justify-center gap-2', language === 'kh' ? 'font-khmer text-xs' : '']">
            <span class="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
            {{ t.teachingOverview }}
          </p>
          <h1 :class="['text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-none drop-shadow-sm', language === 'kh' ? 'font-khmer leading-snug' : '']">
            {{ t.analyticsStats }}
          </h1>
        </div>

        <div v-if="isLoading" class="flex flex-col items-center justify-center py-24 animate-pulse">
          <div class="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(99,102,241,0.4)]"></div>
          <p :class="['text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-widest', language === 'kh' ? 'font-khmer' : '']">{{ t.scanningDb }}</p>
        </div>

        <div v-else class="w-full flex flex-col gap-6 sm:gap-8">
          
          <!-- 🔥 MASTER OVERALL CARD -->
          <div class="relative w-full bg-slate-900 dark:bg-[#0B1120] rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_20px_50px_-15px_rgba(99,102,241,0.4)] overflow-hidden p-8 sm:p-12 text-center animate-fade-in-up border border-slate-700/50" style="animation-delay: 0.2s;">
            <div class="absolute top-[-50%] right-[-20%] w-[120%] h-[150%] bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-indigo-500 via-fuchsia-600 to-cyan-400 opacity-40 mix-blend-screen animate-spin-slow origin-center blur-3xl z-0"></div>
            <div class="absolute bottom-[-30%] left-[-10%] w-[80%] h-[100%] bg-blue-600 opacity-30 mix-blend-screen blur-[100px] z-0"></div>
            <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQPSI4Ij4KPHJlY3Qgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE1KSIvPgo8L3N2Zz4=')] opacity-20 mix-blend-overlay z-0"></div>
            
            <div class="relative z-10">
              <p :class="['text-[9px] sm:text-xs font-black text-indigo-300/80 uppercase tracking-widest mb-3', language === 'kh' ? 'font-khmer' : '']">
                {{ t.totalHours }} {{ monthFilter ? t.thisMonth : t.overall }}
              </p>
              <h2 class="text-4xl sm:text-6xl font-black font-khmer text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] leading-tight tracking-tight">
                {{ computedStats.totalHours }}
              </h2>
              <div class="inline-flex mt-5 items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-inner">
                 <span :class="['text-[9px] sm:text-[10px] font-black uppercase text-white tracking-widest', language === 'kh' ? 'font-khmer' : '']">{{ computedStats.totalLessons }} {{ t.lessonsTracked }}</span>
              </div>
            </div>
          </div>

          <!-- 🔥 SMART CONTROL PANEL (FILTERS) -->
          <div class="relative z-40 flex flex-col sm:flex-row gap-3 w-full animate-fade-in-up" style="animation-delay: 0.3s;">
            <div class="relative flex-grow">
              <button @click="showClassMenu = !showClassMenu" class="w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-2xl px-4 py-3.5 flex items-center justify-between shadow-sm outline-none transition-all duration-300 active:scale-[0.98]">
                <div class="flex items-center gap-2 overflow-hidden pr-2">
                  <svg class="w-4 h-4 text-fuchsia-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                  <span :class="['text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 truncate', language === 'kh' ? 'font-khmer' : '']">
                    {{ classFilter ? cleanSubjectName(classFilter) : t.allSubjects }}
                  </span>
                </div>
                <svg :class="['w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300', showClassMenu ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              <transition name="fade-scale">
                <div v-if="showClassMenu" class="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-3xl border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-50 overflow-hidden max-h-60 overflow-y-auto">
                  <button @click="classFilter = ''; showClassMenu = false" :class="['w-full text-left px-4 py-3 text-[10px] sm:text-xs font-black uppercase tracking-widest transition-colors border-b border-slate-100 dark:border-slate-700/50', classFilter === '' ? 'bg-fuchsia-50 dark:bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50', language === 'kh' ? 'font-khmer' : '']">
                    {{ t.allSubjects }}
                  </button>
                  <button v-for="sub in uniqueSubjects" :key="sub" @click="classFilter = sub; showClassMenu = false" :class="['w-full text-left px-4 py-3 text-[10px] sm:text-xs font-black uppercase tracking-widest transition-colors border-b border-slate-100 dark:border-slate-700/50 truncate font-khmer', classFilter === sub ? 'bg-fuchsia-50 dark:bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50']">
                    {{ cleanSubjectName(sub) }}
                  </button>
                </div>
              </transition>
            </div>

            <div class="relative shrink-0">
              <div class="w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl px-4 py-3.5 shadow-sm border border-slate-200 dark:border-slate-700/50 flex items-center justify-between group transition-all duration-300">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  <input type="month" v-model="monthFilter" class="bg-transparent border-none text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 focus:ring-0 outline-none p-0 cursor-pointer w-[110px]" />
                </div>
                <button v-if="monthFilter" @click="monthFilter = ''" class="ml-2 w-5 h-5 bg-rose-100 dark:bg-rose-500/20 text-rose-500 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
            </div>
          </div>
          <div v-if="showClassMenu" @click="showClassMenu = false" class="fixed inset-0 z-30"></div>

          <h3 :class="['text-xs sm:text-sm font-black uppercase tracking-widest text-slate-800 dark:text-white mt-2 flex items-center gap-2 animate-fade-in-up', language === 'kh' ? 'font-khmer' : '']" style="animation-delay: 0.4s;">
            <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            {{ t.breakdownByClass }}
          </h3>

          <div v-if="computedStats.classes.length === 0" class="w-full bg-white/50 dark:bg-slate-800/40 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-[2rem] p-10 text-center shadow-sm animate-fade-in-up" style="animation-delay: 0.5s;">
             <div class="w-16 h-16 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-slate-200 dark:border-slate-700">
               <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
             </div>
             <p :class="['text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest', language === 'kh' ? 'font-khmer' : '']">{{ t.noHoursLogged }}</p>
          </div>

          <!-- Glass Grid of Classes -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pb-6">
            <div v-for="(cls, index) in computedStats.classes" :key="index" class="bg-white/80 dark:bg-[#0B1120]/80 p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[2.5rem] border border-white dark:border-slate-700/50 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 animate-fade-in-up flex flex-col justify-between backdrop-blur-xl" :style="`animation-delay: ${0.5 + (index * 0.1)}s;`">
               
               <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
               
               <div class="relative z-10">
                 <div class="flex items-center justify-between mb-3">
                   <div class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-md text-[9px] font-black uppercase tracking-widest border border-indigo-100 dark:border-indigo-500/20">
                     {{ cls.cohort }}
                   </div>
                   
                   <!-- 🔥 PRINT PDF BUTTON -->
                   <button @click="triggerPrint(cls)" class="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-[0_4px_10px_rgba(16,185,129,0.3)] transition-all duration-300 active:scale-95 hover:-translate-y-0.5">
                     <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                     {{ t.printPDF }}
                   </button>
                 </div>
                 
                 <h4 class="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-khmer leading-snug mb-5 line-clamp-2 pr-2">{{ cleanSubjectName(cls.subject) }}</h4>
               </div>
               
               <div class="pt-4 border-t border-slate-100 dark:border-slate-700/50 flex justify-between items-end relative z-10">
                 <div>
                   <p :class="['text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1', language === 'kh' ? 'font-khmer' : '']">{{ t.classTotal }}</p>
                   <p class="text-xl sm:text-2xl font-black text-cyan-600 dark:text-cyan-400 font-khmer tracking-tight">{{ cls.formattedHours }}</p>
                 </div>
                 <div class="flex items-center gap-2">
                   <div class="min-w-[40px] px-2 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex flex-col items-center justify-center shadow-inner">
                     <span class="text-sm font-black text-indigo-600 dark:text-indigo-400 leading-none mb-1">{{ cls.weeksCount }}</span>
                     <span :class="['text-[7px] font-black text-indigo-400 dark:text-indigo-500 uppercase tracking-widest leading-none', language === 'kh' ? 'font-khmer' : '']">{{ t.weeks }}</span>
                   </div>
                   <div class="min-w-[40px] px-2 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center shadow-inner">
                     <span class="text-sm font-black text-slate-700 dark:text-slate-300 leading-none mb-1">{{ cls.count }}</span>
                     <span :class="['text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none', language === 'kh' ? 'font-khmer' : '']">{{ t.lessons }}</span>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- PRELOAD ASSETS FOR PRINT (Forces browser to cache them instantly) -->
    <img src="../assets/DUC.png" alt="" class="absolute w-0 h-0 opacity-0 pointer-events-none" />

    <!-- ========================================== -->
    <!-- OFFICIAL PDF PRINT TEMPLATE (HIDDEN IN APP)-->
    <!-- ========================================== -->
    <div v-if="printData" id="print-area" class="hidden print:block w-full bg-white text-black font-khmer px-6">
      
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
          <h1 class="font-moul text-[22px] text-black leading-none font-normal">ព្រះរាជាណាចក្រកម្ពុជា</h1>
          <h2 class="font-moul text-[18px] text-black mt-3 leading-none font-normal">ជាតិ សាសនា ព្រះមហាក្សត្រ</h2>
          
          <!-- 🔥 CUSTOM TACTEING FONT ORNAMENT -->
          <div class="flex items-center justify-center mt-2 mb-2 text-black">
            <span class="font-tacteing text-3xl" style="line-height: 1;">3</span>
          </div>
          <!-- END DIVIDER -->
        </div>
      </div>

      <!-- Document Titles -->
      <div class="text-center mb-4 pt-5 text-[14px] font-khmer">
        <h3 class="force-bold mb-1">បញ្ជីតាមដានការបង្រៀនរបស់សាស្ត្រាចារ្យ</h3>
        <h3 class="force-bold mb-1">មហាវិទ្យាល័យ {{ printData.department ? printData.department.replace('មហាវិទ្យាល័យ', '') : '...........................................................' }}</h3>
        <h3 class="force-bold mb-1">កម្រិតបរិញ្ញាបត្រ ជំនាញ {{ printData.major || '...........................................' }}</h3>
        <h3 class="force-bold mb-1">មុខវិជ្ជា {{ cleanSubjectName(printData.subject) }}</h3>
        <h3 class="force-bold mb-1">បង្រៀនដោយ ៖ លោកគ្រូ {{ teacher?.nameKh }}</h3>
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
            <td class="border border-black p-1 font-sans text-[10px]">{{ lesson.time }}</td>
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
            <td colspan="5" class="border border-black p-1 text-right pr-4">ចំនួនម៉ោងសរុប</td>
            <td class="border border-black p-1 font-bold whitespace-nowrap">{{ printData.formattedHours }}</td>
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const teacher = ref(null);
const isLoading = ref(true);
const allHistory = ref([]);
const scheduleData = ref([]); 
const monthFilter = ref('');
const fullMajorName = ref('');
const fullFacultyName = ref('');

// Print State
const printData = ref(null);

// Custom Class Filter State
const classFilter = ref('');
const showClassMenu = ref(false);

// --- LANGUAGE STATE & DICTIONARY ---
const language = ref(localStorage.getItem('app_lang') || 'en');

window.addEventListener('storage', (e) => {
  if (e.key === 'app_lang') {
    language.value = e.newValue || 'en';
  }
});

const cleanSubjectName = (name) => {
  if (!name) return '';
  return String(name).replace(/\s*\(.*?\)\s*/g, '').trim();
};

const t = computed(() => {
  if (language.value === 'kh') {
    return {
      back: 'ត្រឡប់ក្រោយ',
      teachingOverview: 'ទិដ្ឋភាពទូទៅនៃការបង្រៀន',
      analyticsStats: 'វិភាគ និងស្ថិតិ',
      scanningDb: 'កំពុងស្កេនទិន្នន័យ...',
      totalHours: 'ម៉ោងសរុបដែលបានបង្រៀន',
      thisMonth: 'ប្រចាំខែនេះ',
      overall: 'សរុបទាំងអស់',
      lessonsTracked: 'មេរៀនត្រូវបានកត់ត្រា',
      allSubjects: 'មុខវិជ្ជាទាំងអស់',
      breakdownByClass: 'ការវិភាគតាមថ្នាក់',
      noHoursLogged: 'គ្មានទិន្នន័យម៉ោងបង្រៀនសម្រាប់ការកំណត់នេះទេ។',
      classTotal: 'សរុបប្រចាំថ្នាក់',
      weeks: 'សប្តាហ៍',
      lessons: 'មេរៀន',
      printPDF: 'ព្រីនឯកសារ (PDF)'
    };
  }
  return {
    back: 'Go Back',
    teachingOverview: 'Teaching Overview',
    analyticsStats: 'Analytics & Stats',
    scanningDb: 'Scanning Database...',
    totalHours: 'Total Hours Logged',
    thisMonth: 'This Month',
    overall: 'Overall',
    lessonsTracked: 'Lessons Tracked',
    allSubjects: 'All Subjects',
    breakdownByClass: 'Breakdown by Class',
    noHoursLogged: 'No hours logged for these filters.',
    classTotal: 'Class Total',
    weeks: 'Weeks',
    lessons: 'Lessons',
    printPDF: 'Print PDF'
  };
});

const goBack = () => router.go(-1);

// Helper Formatting
const formatMins = (m) => {
  const h = Math.floor(m / 60);
  const rM = m % 60;
  const fM = rM < 10 ? `0${rM}` : rM;
  return language.value === 'kh' 
    ? `${h} ម៉ោង ${fM} នាទី`
    : `${h} hrs ${fM} mins`;
};

// Returns just the number "2" or "1.5" for the official print table
const parseNumericHours = (hourStr) => {
  if (!hourStr) return '0';
  
  const hMatch = hourStr.match(/(\d+)\s*(?:ម៉ោង|hrs|hr|h)/i);
  const mMatch = hourStr.match(/(\d+)\s*(?:នាទី|mins|min|m)/i);
  
  if (hMatch || mMatch) {
    const h = hMatch ? parseInt(hMatch[1]) : 0;
    const m = mMatch ? parseInt(mMatch[1]) : 0;
    if (m === 0) return h.toString();
    // Convert minutes to decimal (e.g. 30 mins -> 0.5)
    return (h + m/60).toPrecision(2).replace(/\.0$/, ''); 
  }
  
  const num = parseFloat(hourStr);
  if (!isNaN(num)) return num.toString();
  
  return hourStr;
};

// Formats YYYY-MM-DD to DD-MM-YYYY for the print table
const formatDateKhmer = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3 && parts[0].length === 4) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`; 
  }
  return dateStr;
};

const khmerDays = {
  'Monday': 'ច័ន្ទ', 'Tuesday': 'អង្គារ', 'Wednesday': 'ពុធ',
  'Thursday': 'ព្រហស្បតិ៍', 'Friday': 'សុក្រ', 'Saturday': 'សៅរ៍', 'Sunday': 'អាទិត្យ'
};

const displayDay = (day) => {
  if(!day) return '';
  const cleanDay = day.trim().charAt(0).toUpperCase() + day.trim().slice(1).toLowerCase();
  return khmerDays[cleanDay] || cleanDay;
};

const extractYYYYMM = (dateString) => {
  if (!dateString) return null;
  let match = dateString.match(/^(\d{4})[-/](\d{1,2})/);
  if (match) return `${match[1]}-${match[2].padStart(2, '0')}`;
  
  match = dateString.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
  if (match) {
    const p1 = parseInt(match[1]);
    const p2 = parseInt(match[2]);
    const year = match[3];
    let month;
    if (p1 > 12) month = match[2];
    else if (p2 > 12) month = match[1];
    else month = match[2]; 
    return `${year}-${month.padStart(2, '0')}`;
  }
  const d = new Date(dateString);
  if (!isNaN(d.getTime())) return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  return null;
};

const fetchAllData = async () => {
  isLoading.value = true;
  try {
    const token = localStorage.getItem('duc_teacher_token');
    if (!token) return;
    teacher.value = JSON.parse(token);
    const teacherName = teacher.value.nameKh;

    // Fetch the new full history route instead of the schedule
    const histRes = await fetch(`https://duc-teacher-tracking.onrender.com/api/my-full-history?teacher=${encodeURIComponent(teacherName)}`);
    const histData = await histRes.json();
    
    if (histData.success) {
      allHistory.value = histData.data; // This now contains EVERYTHING they ever taught
    }

    // Fetch Majors for printing
    try {
      const majorsRes = await fetch('https://duc-teacher-tracking.onrender.com/api/majors');
      const majorsData = await majorsRes.json();
      if (majorsData.success) {
        fullMajorName.value = majorsData.data; 
      }
    } catch(err) { console.error(err); }

    // Fetch Faculties for printing
    try {
      const facsRes = await fetch('https://duc-teacher-tracking.onrender.com/api/faculties');
      const facsData = await facsRes.json();
      if (facsData.success) {
        fullFacultyName.value = facsData.data; 
      }
    } catch(err) { console.error(err); }

  } catch (error) {
    console.error("Failed to fetch analytics", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchAllData();
});

const uniqueSubjects = computed(() => {
  const subs = new Map();
  allHistory.value.forEach(h => {
    if (h.subject) {
      const lower = h.subject.trim().toLowerCase();
      if (!subs.has(lower)) {
        subs.set(lower, h.subject.trim());
      }
    }
  });
  return Array.from(subs.values()).sort();
});

const getEnglishDayFromDate = (dateString) => {
  if (!dateString) return '';
  const parts = dateString.split('-');
  let dateObj = null;
  if (parts.length === 3 && parts[0].length <= 2) {
    dateObj = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
  } else {
    dateObj = new Date(dateString);
  }
  if (isNaN(dateObj.getTime())) return '';
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dateObj.getDay()];
};

const computedStats = computed(() => {
  let totalMins = 0;
  let totalLessons = 0;
  const breakdown = {};

  allHistory.value.forEach(lesson => {
    if (monthFilter.value) {
      const lessonMonth = extractYYYYMM(lesson.date);
      if (lessonMonth !== monthFilter.value) return; 
    }

    if (classFilter.value && (lesson.subject || '').trim().toLowerCase() !== classFilter.value.trim().toLowerCase()) return;

    let mins = 0;
    if (lesson.hours) {
      const hMatch = lesson.hours.match(/(\d+)\s*(?:ម៉ោង|hrs|hr|h)/i);
      const mMatch = lesson.hours.match(/(\d+)\s*(?:នាទី|mins|min|m)/i);
      
      let h = 0;
      let m = 0;
      
      if (hMatch || mMatch) {
         if (hMatch) h = parseInt(hMatch[1] || 0);
         if (mMatch) m = parseInt(mMatch[1] || 0);
      } else {
         const num = parseFloat(lesson.hours);
         if (!isNaN(num)) {
             h = Math.floor(num);
             m = Math.round((num - h) * 60);
         }
      }
      mins = (h * 60) + m;
    }
    
    totalMins += mins;
    totalLessons++;

    // Normalize key to group "Strength of material II" and "Strength of Material II" together
    const normSubject = (lesson.subject || '').trim().toLowerCase();
    const key = `${normSubject}|${lesson.cohort}`;
    
    if (!breakdown[key]) {
      breakdown[key] = { 
        subject: lesson.subject.trim(), // Use the first encountered case formatting as the display name

        cohort: lesson.cohort, 
        room: lesson.room || '',
        daysSet: new Set(),
        daysStr: '',
        mins: 0, 
        count: 0, 
        weeks: new Set(),
        lessons: [] // Keep lessons for printing
      };
    }
    
    if (lesson.room) breakdown[key].room = lesson.room;
    
    const engDay = getEnglishDayFromDate(lesson.date);
    if (engDay) breakdown[key].daysSet.add(displayDay(engDay));
    breakdown[key].daysStr = Array.from(breakdown[key].daysSet).join(' & ');

    
    breakdown[key].mins += mins;
    breakdown[key].count += 1;
    
    if (lesson.week) breakdown[key].weeks.add(lesson.week);
    
    breakdown[key].lessons.push(lesson);
  });

  const formattedBreakdown = Object.values(breakdown)
    .map(b => ({ 
      ...b, 
      formattedHours: formatMins(b.mins),
      weeksCount: b.weeks.size,
      // Sort lessons by date/week for printing
      lessons: b.lessons.sort((a, b) => a.week - b.week)
    }))
    .sort((a,b) => b.mins - a.mins); 

  return {
    totalHours: formatMins(totalMins),
    totalLessons: totalLessons,
    classes: formattedBreakdown
  };
});

// Helper to map Group Code to Major Name
const getMajorName = (cohortCode) => {
  if (!fullMajorName.value) return '';
  const normalize = (str) => (str || '').replace(/\s+/g, '').replace(/[\u2013\u2014\u2011_]/g, '-').toUpperCase();
  const stripNumbers = (str) => str.replace(/\d+$/, '').replace(/-[A-Z]$/, '');
  
  const code = normalize(cohortCode);
  const parts = code.split('-');
  let coreCode = code;
  if (parts.length >= 3) coreCode = parts[1];
  else if (parts.length === 2) coreCode = parts[1];
  else coreCode = parts[0];
  coreCode = stripNumbers(coreCode);
  
  const rows = Object.entries(fullMajorName.value);
  
  // 1. Try EXACT MATCH first
  for (const [k, v] of rows) {
    if (normalize(k) === code) return v.trim();
  }
  
  // 2. Try EXACT CORE MATCH next (e.g. 'DE' === 'DE')
  for (const [k, v] of rows) {
    if (normalize(k) === coreCode) return v.trim();
  }

  // 3. Try fallback substring matching (safe mode)
  let matched = null;
  const sortedRows = [...rows].sort((a, b) => b[0].length - a[0].length);
  for (const [k, v] of sortedRows) {
    const sheetCode = normalize(k);
    if (code.includes(sheetCode) || (coreCode.length >= 2 && sheetCode.includes(coreCode))) {
        matched = v.trim(); 
        break;
    }
  }
  return matched || '';
};

// Helper to map Group Code to Faculty Name
const getFacultyName = (cohortCode) => {
  if (!fullFacultyName.value) return '';
  const normalize = (str) => (str || '').replace(/\s+/g, '').replace(/[\u2013\u2014\u2011_]/g, '-').toUpperCase();
  const stripNumbers = (str) => str.replace(/\d+$/, '').replace(/-[A-Z]$/, '');
  
  const code = normalize(cohortCode);
  const parts = code.split('-');
  let coreCode = code;
  if (parts.length >= 3) coreCode = parts[1];
  else if (parts.length === 2) coreCode = parts[1];
  else coreCode = parts[0];
  coreCode = stripNumbers(coreCode);
  
  const rows = Object.entries(fullFacultyName.value);
  
  // 1. Try EXACT MATCH first
  for (const [k, v] of rows) {
    if (normalize(k) === code) return v.trim();
  }
  
  // 2. Try EXACT CORE MATCH next
  for (const [k, v] of rows) {
    if (normalize(k) === coreCode) return v.trim();
  }

  // 3. Try fallback substring matching
  let matched = null;
  const sortedRows = [...rows].sort((a, b) => b[0].length - a[0].length);
  for (const [k, v] of sortedRows) {
    const sheetCode = normalize(k);
    if (code.includes(sheetCode) || (coreCode.length >= 2 && sheetCode.includes(coreCode))) {
        matched = v.trim(); 
        break;
    }
  }
  return matched || '';
};

// 🔥 NATIVE PDF PRINT GENERATOR
const triggerPrint = (clsData) => {
  const maj = getMajorName(clsData.cohort);
  const dept = getFacultyName(clsData.cohort);

  printData.value = {
    ...clsData,
    major: maj,
    department: dept
  };
  
  // Wait for Vue to render the HTML, then trigger native browser print
  nextTick(() => {
    window.print();
  });
};

</script>

<style scoped>
/* Load the local Tacteing font from the public folder to bypass Vite cache */
@font-face {
  font-family: 'Tacteing';
  src: url('/Tacteing.ttf') format('truetype');
}
.font-tacteing { font-family: 'Tacteing', sans-serif; }

.font-sans { font-family: 'Inter', sans-serif; }
.font-khmer { font-family: 'Kantumruy Pro', sans-serif; }
.font-mono { font-family: 'JetBrains Mono', monospace; }

.force-bold {
  font-weight: bold !important;
  -webkit-text-stroke: 0.6px black;
}

/* 🔥 MOUL FONT SETUP */
.font-moul { 
  font-family: 'Moul', 'Khmer OS Muol', 'Khmer OS Muol Light', cursive !important; 
  font-weight: normal !important;
}

input[type="month"]::-webkit-calendar-picker-indicator {
  filter: invert(0.5); cursor: pointer; opacity: 0.6; transition: 0.3s;
}
input[type="month"]::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}
.dark input[type="month"]::-webkit-calendar-picker-indicator {
  filter: invert(1); opacity: 0.8;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
.dark ::-webkit-scrollbar-thumb { background: #475569; }

.animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.animate-spin-slow { animation: spin-slow 12s linear infinite; }

.fade-scale-enter-active, .fade-scale-leave-active { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
.fade-scale-enter-from, .fade-scale-leave-to { opacity: 0; transform: scale(0.95) translateY(-10px); }

/* 🔥 PRINT CSS MAGIC */
@media print {
  @page {
    size: A4;
    margin: 1cm;
  }
  
  :global(nav), 
  :global(div[class*="fixed bottom-"]) {
    display: none !important;
  }

  /* Force background colors to print */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  
  /* CRITICAL: Forbid print engine from synthetic bolding of Moul font */
  h1, h2, h3, h4, h5, h6, .font-moul {
    font-weight: 400 !important;
    -webkit-text-stroke: 0 !important;
    text-shadow: none !important;
  }

  /* Reset margins for A4 Paper */
  @page {
    size: A4 portrait;
    margin: 15mm;
  }

  /* Collapse the app's outer min-h-screen / h-full wrappers during print
     so they don't reserve a full viewport of empty space above #print-area */
  :global(.min-h-screen) {
    min-height: 0 !important;
    height: auto !important;
  }
  :global(.h-full) {
    height: auto !important;
  }

  /* Bulletproof fix: pull #print-area completely out of normal document flow
     so it can NEVER be pushed down by sibling/ancestor height, margin, or
     flex/grid context, no matter what the hidden app UI wrapper does.
     We also strip the root wrapper's "relative" positioning context so
     #print-area's absolute position resolves against the printed page
     itself, not a leftover relative ancestor. */
  :global(.min-h-screen.relative) {
    position: static !important;
  }
  :global(#print-area) {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    margin: 0 !important;
  }
  
  /* Ensure the body takes full width and resets any dark mode quirks */
  body {
    background-color: white !important;
    color: black !important;
  }
  
  /* Guarantee the table borders are solid black */
  table, th, td {
    border-color: black !important;
    border-style: solid !important;
    border-width: 1px !important;
  }
  th {
    background-color: #f9fafb !important; /* light gray for headers */
  }
}
</style>