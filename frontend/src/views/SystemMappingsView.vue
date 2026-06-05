<template>
  <div class="min-h-screen font-sans selection:bg-indigo-500 selection:text-white relative overflow-x-hidden transition-colors duration-700 pb-32 bg-[#F4F7FA] dark:bg-[#0B1120] text-slate-800 dark:text-slate-100">
    
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#eef2ff] via-[#f8fafc] to-[#e0f2fe] dark:from-[#0B1120] dark:via-[#0f172a] dark:to-[#1e1b4b]">
      <div class="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-50 dark:opacity-20 animate-blob bg-cyan-100 dark:bg-cyan-900/40 transition-colors duration-700"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[140px] opacity-50 dark:opacity-20 animate-blob animation-delay-2000 bg-indigo-100 dark:bg-indigo-900/40 transition-colors duration-700"></div>
      <div class="absolute top-[30%] left-[20%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-40 dark:opacity-20 animate-blob animation-delay-4000 bg-fuchsia-100 dark:bg-fuchsia-900/40 transition-colors duration-700"></div>
    </div>

    <main class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-12 animate-fade-in-up">
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-4">
        <div>
          <button @click="router.push('/admin')" class="group flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-4 transition-colors w-max">
            <div class="w-8 h-8 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
            </div>
            Return to Dashboard
          </button>
        </div>
      </div>

      <div class="flex justify-center mb-10">
        <div class="flex items-center p-1.5 bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl border border-white dark:border-slate-700/50 rounded-2xl shadow-sm overflow-x-auto max-w-full">
          
          <button 
            @click="activeTab = 'majors'" 
            :class="[
              'px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 whitespace-nowrap',
              activeTab === 'majors' ? 'bg-white dark:bg-slate-700 shadow-[0_4px_15px_rgba(79,70,229,0.15)] text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50'
            ]"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
            Cohort Variables (Majors)
          </button>

          <button 
            @click="activeTab = 'faculties'" 
            :class="[
              'px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 whitespace-nowrap',
              activeTab === 'faculties' ? 'bg-white dark:bg-slate-700 shadow-[0_4px_15px_rgba(217,70,239,0.15)] text-fuchsia-600 dark:text-fuchsia-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50'
            ]"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            Faculty Variables
          </button>

        </div>
      </div>

      <transition name="tab-fade" mode="out-in">
        
        <section v-if="activeTab === 'majors'" key="majors" class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white dark:border-white/5 flex flex-col h-[700px] relative overflow-hidden isolate max-w-4xl mx-auto w-full">
          
          <div class="p-8 pb-6 border-b border-slate-100/50 dark:border-slate-700/50 relative z-10 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <h2 class="text-xl font-black text-slate-800 dark:text-white mb-1 flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20 shadow-sm">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
                </div>
                Cohort Variables (Majors)
              </h2>
            </div>
            
            <div class="relative w-full sm:w-64">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input v-model="majorSearch" type="text" placeholder="Filter majors..." class="w-full pl-10 pr-4 py-3 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm">
            </div>
          </div>

          <div class="p-8 flex-grow flex flex-col gap-6 relative z-10 overflow-hidden">
            <form @submit.prevent="addNewMajor" class="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all duration-300">
              <input v-model="newMajorForm.code" type="text" required class="flex-1 bg-transparent border-transparent focus:border-transparent focus:ring-0 outline-none shadow-none px-4 py-3 text-sm font-bold text-slate-700 dark:text-white uppercase placeholder-slate-400 w-full" placeholder="CODES (E.G. G1-DSM, G1-DSM1)">
              <div class="hidden sm:block w-px h-8 bg-slate-100 dark:bg-slate-800 my-auto mx-2"></div>
              <input v-model="newMajorForm.fullName" type="text" required class="flex-[2] bg-transparent border-transparent focus:border-transparent focus:ring-0 outline-none shadow-none px-4 py-3 text-sm font-bold text-slate-700 dark:text-white font-khmer placeholder-slate-400 w-full" placeholder="Full Name in Khmer">
              <button type="submit" :disabled="isSubmittingMajor" class="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center disabled:opacity-50 mt-2 sm:mt-0">
                <span v-if="isSubmittingMajor" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span v-else class="flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4"></path></svg> ADD</span>
              </button>
            </form>

            <div class="flex-grow overflow-y-auto custom-scrollbar pr-2 relative">
              <div v-if="Object.keys(majorMap).length === 0" class="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                 <div class="w-10 h-10 border-4 border-indigo-100 dark:border-indigo-900 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                 <p class="text-xs font-black uppercase tracking-widest animate-pulse">Syncing Map...</p>
              </div>
              
              <div v-else-if="Object.keys(filteredMajorMap).length === 0" class="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <svg class="w-12 h-12 mb-3 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p class="text-xs font-bold">No majors found matching "{{ majorSearch }}"</p>
              </div>

              <transition-group v-else name="list" tag="ul" class="space-y-3 pb-4">
                <li v-for="(fullName, code) in filteredMajorMap" :key="code" class="group bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800/80 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center gap-5 transition-all duration-300 shadow-sm hover:shadow-md">
                  <div class="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-black text-xs px-4 py-2 rounded-xl shrink-0 text-center min-w-[5rem]">
                    {{ code }}
                  </div>
                  <span class="text-slate-700 dark:text-slate-200 text-sm font-khmer font-bold flex-grow leading-relaxed">{{ fullName }}</span>
                  
                  <div class="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button @click="openEdit('majors', code, fullName)" class="p-2.5 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors shadow-sm bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700" title="Edit">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                    <button @click="openDelete('majors', code)" class="p-2.5 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-700 transition-colors shadow-sm bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700" title="Delete">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                </li>
              </transition-group>
            </div>
          </div>
        </section>

        <section v-else-if="activeTab === 'faculties'" key="faculties" class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white dark:border-white/5 flex flex-col h-[700px] relative overflow-hidden isolate max-w-4xl mx-auto w-full">
          
          <div class="p-8 pb-6 border-b border-slate-100/50 dark:border-slate-700/50 relative z-10 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <h2 class="text-xl font-black text-slate-800 dark:text-white mb-1 flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-fuchsia-50 dark:bg-fuchsia-900/50 text-fuchsia-600 dark:text-fuchsia-400 flex items-center justify-center border border-fuchsia-100 dark:border-fuchsia-500/20 shadow-sm">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                Faculty Variables (មហាវិទ្យាល័យ)
              </h2>
            </div>
            
            <div class="relative w-full sm:w-64">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input v-model="facultySearch" type="text" placeholder="Filter faculties..." class="w-full pl-10 pr-4 py-3 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-800 dark:text-white focus:ring-2 focus:ring-fuchsia-500 outline-none transition-all shadow-sm">
            </div>
          </div>

          <div class="p-8 flex-grow flex flex-col gap-6 relative z-10 overflow-hidden">
            <form @submit.prevent="addNewFaculty" class="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] focus-within:ring-2 focus-within:ring-fuchsia-500/20 transition-all duration-300">
              <input v-model="newFacultyForm.code" type="text" required class="flex-1 bg-transparent border-transparent focus:border-transparent focus:ring-0 outline-none shadow-none px-4 py-3 text-sm font-bold text-slate-700 dark:text-white uppercase placeholder-slate-400 w-full" placeholder="CODES (E.G. F-CS, F-IT)">
              <div class="hidden sm:block w-px h-8 bg-slate-100 dark:bg-slate-800 my-auto mx-2"></div>
              <input v-model="newFacultyForm.fullName" type="text" required class="flex-[2] bg-transparent border-transparent focus:border-transparent focus:ring-0 outline-none shadow-none px-4 py-3 text-sm font-bold text-slate-700 dark:text-white font-khmer placeholder-slate-400 w-full" placeholder="Full Name in Khmer">
              <button type="submit" :disabled="isSubmittingFaculty" class="px-8 py-3 bg-fuchsia-500 hover:bg-fuchsia-400 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md shadow-fuchsia-500/20 flex items-center justify-center disabled:opacity-50 mt-2 sm:mt-0">
                <span v-if="isSubmittingFaculty" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span v-else class="flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4"></path></svg> ADD</span>
              </button>
            </form>

            <div class="flex-grow overflow-y-auto custom-scrollbar pr-2 relative">
              <div v-if="Object.keys(facultyMap).length === 0" class="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                 <div class="w-10 h-10 border-4 border-fuchsia-100 dark:border-fuchsia-900 border-t-fuchsia-500 rounded-full animate-spin mb-4"></div>
                 <p class="text-xs font-black uppercase tracking-widest animate-pulse">Syncing Map...</p>
              </div>

              <div v-else-if="Object.keys(filteredFacultyMap).length === 0" class="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <svg class="w-12 h-12 mb-3 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p class="text-xs font-bold">No faculties found matching "{{ facultySearch }}"</p>
              </div>

              <transition-group v-else name="list" tag="ul" class="space-y-3 pb-4">
                <li v-for="(fullName, code) in filteredFacultyMap" :key="code" class="group bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800/80 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center gap-5 transition-all duration-300 shadow-sm hover:shadow-md">
                  <div class="bg-fuchsia-50 dark:bg-fuchsia-900/30 text-fuchsia-600 dark:text-fuchsia-400 font-black text-xs px-4 py-2 rounded-xl shrink-0 text-center min-w-[5rem]">
                    {{ code }}
                  </div>
                  <span class="text-slate-700 dark:text-slate-200 text-sm font-khmer font-bold flex-grow leading-relaxed">{{ fullName }}</span>
                  
                  <div class="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button @click="openEdit('faculties', code, fullName)" class="p-2.5 rounded-xl text-slate-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 hover:bg-fuchsia-50 dark:hover:bg-slate-700 transition-colors shadow-sm bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700" title="Edit">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                    <button @click="openDelete('faculties', code)" class="p-2.5 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-700 transition-colors shadow-sm bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700" title="Delete">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                </li>
              </transition-group>
            </div>
          </div>
        </section>

      </transition>

    </main>

    <transition name="fade-scale">
      <div v-if="editModal.show" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity" @click="closeEdit"></div>
        <div class="relative w-full max-w-md bg-white dark:bg-[#0B1120] rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(0,0,0,0.4)] overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col z-10 p-8">
          
          <h3 class="text-2xl font-black text-slate-800 dark:text-white mb-1 font-sans tracking-tight">Edit Mapping</h3>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Modify code or name</p>

          <div class="space-y-4 mb-8">
            <div>
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Code</label>
              <input 
                v-model="editModal.newCode" 
                type="text" 
                class="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-500/20 outline-none rounded-xl px-4 py-3 text-sm font-bold text-slate-800 dark:text-white uppercase transition-all shadow-inner"
              >
            </div>
            <div>
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Full Name</label>
              <input 
                v-model="editModal.newName" 
                @keyup.enter="submitEdit"
                type="text" 
                class="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-500/20 outline-none rounded-xl px-4 py-3 text-sm font-bold text-slate-800 dark:text-white font-khmer transition-all shadow-inner"
              >
            </div>
          </div>

          <div class="flex gap-3">
            <button @click="closeEdit" class="flex-1 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Cancel</button>
            <button @click="submitEdit" :disabled="editModal.isSubmitting" class="flex-1 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-1 flex justify-center items-center">
              <span v-if="editModal.isSubmitting" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span v-else>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade-scale">
      <div v-if="deleteModal.show" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity" @click="closeDelete"></div>
        <div class="relative w-full max-w-sm bg-white dark:bg-[#0B1120] rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(0,0,0,0.4)] overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col z-10 p-8 text-center">
          
          <div class="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-xl shadow-rose-500/30 bg-gradient-to-br from-rose-400 to-red-500">
            <svg class="w-10 h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>

          <h3 class="text-2xl font-black text-slate-800 dark:text-white mb-2 font-sans tracking-tight">Delete Mapping?</h3>
          <p class="text-sm font-bold text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            Are you sure you want to delete <span class="text-rose-500">{{ deleteModal.code }}</span>? This action cannot be undone.
          </p>

          <div class="flex gap-3">
            <button @click="closeDelete" class="flex-1 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Cancel</button>
            <button @click="confirmDelete" :disabled="deleteModal.isSubmitting" class="flex-1 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-500/30 transition-all hover:-translate-y-1 flex justify-center items-center">
              <span v-if="deleteModal.isSubmitting" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span v-else>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade-scale">
      <div v-if="customAlert.show" class="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity" @click="closeAlert"></div>

        <div class="relative w-full max-w-sm bg-white dark:bg-[#0B1120] rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(0,0,0,0.4)] overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col z-10 p-8 text-center">
          <div :class="['w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-xl relative transition-transform animate-bounce-short', 
            customAlert.type === 'success' ? 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-500/30' : 'bg-gradient-to-br from-rose-400 to-red-500 shadow-rose-500/30']">
            <svg v-if="customAlert.type === 'success'" class="w-10 h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
            <svg v-else class="w-10 h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
          </div>
          <h3 class="text-2xl font-black text-slate-800 dark:text-white mb-2 font-sans tracking-tight">
            {{ customAlert.type === 'success' ? 'Success!' : 'Error' }}
          </h3>
          <p class="text-sm font-bold text-slate-500 dark:text-slate-400 mb-8 font-khmer">
            {{ customAlert.message }}
          </p>
          <button @click="closeAlert" :class="['w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-md text-white flex items-center justify-center gap-2 hover:-translate-y-1', 
            customAlert.type === 'success' ? 'bg-slate-900 dark:bg-white dark:text-slate-900 hover:shadow-slate-900/25' : 'bg-rose-500 hover:shadow-rose-500/25']">
            {{ customAlert.type === 'success' ? 'Awesome' : 'Try Again' }}
          </button>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const activeTab = ref('majors'); 

// --- MAPPINGS STATE ---
const majorMap = ref({});
const facultyMap = ref({});
const newMajorForm = ref({ code: '', fullName: '' });
const isSubmittingMajor = ref(false);
const newFacultyForm = ref({ code: '', fullName: '' });
const isSubmittingFaculty = ref(false);
const majorSearch = ref('');
const facultySearch = ref('');

// --- EDIT & DELETE STATE ---
const editModal = ref({ show: false, type: '', originalCode: '', newCode: '', newName: '', isSubmitting: false });
const deleteModal = ref({ show: false, type: '', code: '', isSubmitting: false });

const customAlert = ref({ show: false, type: 'success', message: '' });
let alertTimeout = null;

// --- COMPUTED PROPERTIES ---
const filteredMajorMap = computed(() => {
  if (!majorSearch.value) return majorMap.value;
  const q = majorSearch.value.toLowerCase();
  return Object.fromEntries(
    Object.entries(majorMap.value).filter(([code, name]) => 
      code.toLowerCase().includes(q) || name.toLowerCase().includes(q)
    )
  );
});

const filteredFacultyMap = computed(() => {
  if (!facultySearch.value) return facultyMap.value;
  const q = facultySearch.value.toLowerCase();
  return Object.fromEntries(
    Object.entries(facultyMap.value).filter(([code, name]) => 
      code.toLowerCase().includes(q) || name.toLowerCase().includes(q)
    )
  );
});

// --- METHODS ---
const triggerAlert = (type, message) => {
  customAlert.value = { show: true, type, message };
  if (type === 'success') {
    alertTimeout = setTimeout(() => {
      if (customAlert.value.show) closeAlert();
    }, 2500);
  }
};

const closeAlert = () => {
  customAlert.value.show = false;
  if (alertTimeout) clearTimeout(alertTimeout);
};

onMounted(async () => {
  // Respect user theme preferences on load
  const savedTheme = localStorage.getItem('theme') || 'system';
  if (savedTheme === 'dark' || (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  if (localStorage.getItem('animations') === 'false') {
    document.documentElement.classList.add('disable-animations');
  }

  try {
    const response = await fetch('http://localhost:3000/api/majors');
    const result = await response.json();
    if (result.success) majorMap.value = result.data;
  } catch (error) {
    console.error("Failed to load major mappings", error);
  }

  try {
    const response = await fetch('http://localhost:3000/api/faculties');
    const result = await response.json();
    if (result.success) facultyMap.value = result.data;
  } catch (error) {
    console.error("Failed to load faculty mappings", error);
  }
});

const addNewMajor = async () => {
  if (!newMajorForm.value.code || !newMajorForm.value.fullName) {
    return triggerAlert('error', 'Please fill in both the code and full name.');
  }
  isSubmittingMajor.value = true;
  try {
    const codes = newMajorForm.value.code.split(',').map(c => c.trim().toUpperCase()).filter(c => c !== '');
    const fullName = newMajorForm.value.fullName;
    for (const code of codes) {
      const res = await fetch('http://localhost:3000/api/majors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code, fullName: fullName })
      });
      const data = await res.json();
      if (data.success) majorMap.value[code] = fullName;
    }
    newMajorForm.value = { code: '', fullName: '' };
    triggerAlert('success', `Successfully mapped ${codes.length} cohort code(s)!`);
  } catch (error) { 
    triggerAlert('error', "Server connection failed."); 
  } finally { isSubmittingMajor.value = false; }
};

const addNewFaculty = async () => {
  if (!newFacultyForm.value.code || !newFacultyForm.value.fullName) {
    return triggerAlert('error', 'Please fill in both the code and full name.');
  }
  isSubmittingFaculty.value = true;
  try {
    const codes = newFacultyForm.value.code.split(',').map(c => c.trim().toUpperCase()).filter(c => c !== '');
    const fullName = newFacultyForm.value.fullName;
    for (const code of codes) {
      const res = await fetch('http://localhost:3000/api/faculties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code, fullName: fullName })
      });
      const data = await res.json();
      if (data.success) facultyMap.value[code] = fullName;
    }
    newFacultyForm.value = { code: '', fullName: '' };
    triggerAlert('success', `Successfully mapped ${codes.length} faculty code(s)!`);
  } catch (error) { 
    triggerAlert('error', "Server connection failed."); 
  } finally { isSubmittingFaculty.value = false; }
};

// --- EDIT LOGIC ---
const openEdit = (type, code, currentName) => {
  editModal.value = { show: true, type, originalCode: code, newCode: code, newName: currentName, isSubmitting: false };
};
const closeEdit = () => { editModal.value.show = false; };

const submitEdit = async () => {
  const { type, originalCode, newCode, newName } = editModal.value;
  if (!newCode.trim() || !newName.trim()) return triggerAlert('error', 'Fields cannot be empty.');
  editModal.value.isSubmitting = true;
  
  const endpoint = type === 'majors' ? '/api/majors' : '/api/faculties';
  try {
    const res = await fetch(`http://localhost:3000${endpoint}/${originalCode}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newCode: newCode.toUpperCase().trim(), fullName: newName.trim() })
    });
    const data = await res.json();
    if (data.success) {
      const map = type === 'majors' ? majorMap : facultyMap;
      if (originalCode !== data.newCode) { 
        delete map.value[originalCode]; 
      }
      map.value[newCode.toUpperCase().trim()] = newName.trim();
      closeEdit();
      triggerAlert('success', `Mapping updated successfully!`);
    } else {
      triggerAlert('error', data.message || "Failed to update.");
    }
  } catch (e) {
    triggerAlert('error', "Server connection failed.");
  } finally { editModal.value.isSubmitting = false; }
};

// --- DELETE LOGIC ---
const openDelete = (type, code) => {
  deleteModal.value = { show: true, type, code, isSubmitting: false };
};
const closeDelete = () => { deleteModal.value.show = false; };

const confirmDelete = async () => {
  deleteModal.value.isSubmitting = true;
  const endpoint = deleteModal.value.type === 'majors' ? '/api/majors' : '/api/faculties';
  try {
    const res = await fetch(`http://localhost:3000${endpoint}/${deleteModal.value.code}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      if (deleteModal.value.type === 'majors') delete majorMap.value[deleteModal.value.code];
      else delete facultyMap.value[deleteModal.value.code];
      closeDelete();
      triggerAlert('success', `Mapping deleted successfully!`);
    } else {
      triggerAlert('error', data.message || "Failed to delete.");
    }
  } catch (e) {
    triggerAlert('error', "Server connection failed.");
  } finally { deleteModal.value.isSubmitting = false; }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

/* Global Override to instantly kill all animations when toggle is off */
html.disable-animations *, html.disable-animations *::before, html.disable-animations *::after {
  animation-duration: 0s !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0s !important;
  scroll-behavior: auto !important;
}

.font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
.font-khmer { font-family: 'Kantumruy Pro', sans-serif; }

.custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; }

.list-enter-active,
.list-leave-active { transition: all 0.4s ease; }
.list-enter-from { opacity: 0; transform: translateX(-30px); }
.list-leave-to { opacity: 0; transform: translateX(30px); }

.tab-fade-enter-active,
.tab-fade-leave-active { transition: all 0.3s ease; }
.tab-fade-enter-from { opacity: 0; transform: translateY(10px) scale(0.98); }
.tab-fade-leave-to { opacity: 0; transform: translateY(-10px) scale(0.98); }

.fade-scale-enter-active, .fade-scale-leave-active { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.fade-scale-enter-from, .fade-scale-leave-to { opacity: 0; transform: scale(0.9) translateY(15px); }

@keyframes bounce-short {
  0% { transform: scale(0.8); opacity: 0; }
  60% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-bounce-short { animation: bounce-short 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

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
</style>