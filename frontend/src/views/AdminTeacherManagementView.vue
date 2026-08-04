<template>
  <div class="min-h-screen bg-[#F4F7FA] dark:bg-[#0B1120] font-sans text-slate-800 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-500 relative pb-24">
    
    <!-- Top Nav / Header -->
    <header class="relative bg-slate-900 pt-16 pb-24 overflow-hidden isolate">
      <div class="absolute top-0 right-0 -mr-20 -mt-20 w-[40rem] h-[40rem] bg-indigo-600 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse-slow"></div>
      <div class="absolute bottom-0 left-10 w-[30rem] h-[30rem] bg-cyan-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-30 mask-image:linear-gradient(to_bottom,white,transparent)"></div>
      
      <div class="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-6">
          <button @click="router.push('/admin')" class="w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md transition-all text-white shadow-lg group">
            <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <div>
            <h1 class="text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-lg">Teacher Management</h1>
            <p class="text-indigo-200 font-khmer font-medium tracking-wider mt-2 flex items-center gap-3 text-sm md:text-base opacity-90">
              <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping-slow shadow-[0_0_10px_#22d3ee]"></span>
              គ្រប់គ្រងគណនី និងទិន្នន័យគ្រូបង្រៀន
            </p>
          </div>
        </div>
        <div class="text-right flex items-center justify-end gap-3 flex-wrap">
          <div class="bg-white/10 border border-white/20 backdrop-blur-md px-5 py-2.5 rounded-2xl flex flex-col items-center">
            <p class="text-[10px] text-pink-300 font-bold tracking-widest uppercase mb-1">Female</p>
            <p class="text-xl font-black text-white leading-none">{{ totalFemale }}</p>
          </div>
          <div class="bg-white/10 border border-white/20 backdrop-blur-md px-5 py-2.5 rounded-2xl flex flex-col items-center">
            <p class="text-[10px] text-cyan-300 font-bold tracking-widest uppercase mb-1">Male</p>
            <p class="text-xl font-black text-white leading-none">{{ totalMale }}</p>
          </div>
          <div class="bg-indigo-500/30 border border-indigo-400/50 backdrop-blur-md px-5 py-2.5 rounded-2xl flex flex-col items-center shadow-lg shadow-indigo-500/20">
            <p class="text-[10px] text-indigo-200 font-bold tracking-widest uppercase mb-1">Total Teachers</p>
            <p class="text-xl font-black text-white leading-none">{{ teachers.length }}</p>
          </div>
          <button @click="openAddModal" class="bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/50 backdrop-blur-md px-5 py-2.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all group active:scale-95">
            <svg class="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            <span class="font-bold text-sm">Add Teacher</span>
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
      
      <!-- Controls -->
      <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl border border-white/60 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full p-2.5 transition-all flex flex-col md:flex-row justify-between items-center w-full mb-8">
        <div class="flex items-center w-full md:w-auto relative pr-4">
          <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search by name, email, phone..." 
            class="w-full md:w-80 pl-12 pr-4 py-3 rounded-full border-none focus:ring-2 focus:ring-indigo-500 text-sm bg-slate-100 dark:bg-slate-900/50 dark:text-white transition-all hover:bg-slate-200 dark:hover:bg-slate-900 focus:bg-white dark:focus:bg-slate-900"
          >
        </div>
        <div class="flex items-center gap-2 mt-4 md:mt-0 pr-2">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-widest mr-2">Filter:</span>
          <button @click="filterStatus = 'ALL'" :class="['px-4 py-2 rounded-full text-xs font-bold transition-all', filterStatus === 'ALL' ? 'bg-slate-800 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300']">All</button>
          <button @click="filterStatus = 'ACTIVE'" :class="['px-4 py-2 rounded-full text-xs font-bold transition-all', filterStatus === 'ACTIVE' ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300']">Active</button>
          <button @click="filterStatus = 'BLOCKED'" :class="['px-4 py-2 rounded-full text-xs font-bold transition-all', filterStatus === 'BLOCKED' ? 'bg-rose-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300']">Blocked</button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="py-32 flex flex-col items-center justify-center">
        <div class="relative w-20 h-20">
          <div class="absolute inset-0 border-4 border-indigo-100 dark:border-indigo-900 rounded-full"></div>
          <div class="absolute inset-0 border-4 border-indigo-600 dark:border-indigo-400 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p class="mt-6 text-indigo-600 dark:text-indigo-400 font-black tracking-widest uppercase text-sm animate-pulse">Loading Teachers...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-900/50 rounded-3xl p-8 text-center text-rose-600 dark:text-rose-400">
        <svg class="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        <p class="font-bold text-lg">{{ error }}</p>
        <button @click="fetchTeachers" class="mt-4 px-6 py-2 bg-rose-100 dark:bg-rose-800 rounded-full text-sm font-bold hover:bg-rose-200 dark:hover:bg-rose-700 transition-colors">Try Again</button>
      </div>

      <!-- Table -->
      <div v-else class="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr class="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                <th class="p-5 pl-8">Teacher Info</th>
                <th class="p-5">Contact Details</th>
                <th class="p-5">Role & Academics</th>
                <th class="p-5">Status</th>
                <th class="p-5 text-right pr-8">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-700/50">
              <tr v-for="teacher in paginatedTeachers" :key="teacher.rowIndex" class="hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors group">
                
                <td class="p-5 pl-8">
                  <div class="flex items-center gap-4">
                    <div class="relative">
                      <img :src="teacher.avatarUrl || 'https://via.placeholder.com/150'" class="w-12 h-12 rounded-2xl object-cover bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm group-hover:shadow-md transition-shadow">
                      <div v-if="teacher.isBlocked" class="absolute -bottom-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white dark:border-slate-800" title="Blocked"></div>
                      <div v-else class="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800" title="Active"></div>
                    </div>
                    <div>
                      <p class="font-khmer font-bold text-slate-800 dark:text-white text-[15px] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{{ teacher.nameKh }}</p>
                      <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{{ teacher.nameEn || 'No Name' }}</p>
                      <div class="flex gap-2 mt-1">
                        <span class="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-slate-500 dark:text-slate-400 font-bold">{{ teacher.gender }}</span>
                      </div>
                    </div>
                  </div>
                </td>

                <td class="p-5">
                  <div class="flex flex-col gap-1">
                    <a :href="`mailto:${teacher.email}`" class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      <span class="truncate max-w-[200px]" :title="teacher.email">{{ teacher.email || 'N/A' }}</span>
                    </a>
                    <a :href="`tel:${teacher.phone}`" class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mt-1">
                      <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                      <span>{{ teacher.phone || 'N/A' }}</span>
                    </a>
                  </div>
                </td>

                <td class="p-5">
                  <div class="flex flex-col gap-1 max-w-[300px]">
                    <p class="text-[13px] font-black font-khmer text-indigo-600 dark:text-indigo-400 leading-tight mb-1" :title="teacher.role">{{ teacher.role || 'No Role Assigned' }}</p>
                    <p class="text-sm font-bold text-slate-700 dark:text-slate-200">{{ teacher.degree || 'N/A' }}</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400">{{ teacher.major || 'N/A' }}</p>
                    <p v-if="teacher.cerNumber" class="text-[10px] font-mono text-indigo-500 mt-1 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded w-max">Cer: {{ teacher.cerNumber }}</p>
                  </div>
                </td>

                <td class="p-5">
                  <span v-if="teacher.isBlocked" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                    <div class="w-1.5 h-1.5 rounded-full bg-rose-500"></div> Blocked
                  </span>
                  <span v-else class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Active
                  </span>
                </td>

                <td class="p-5 pr-8 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button @click="openEditModal(teacher)" class="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-indigo-600 dark:text-indigo-400 flex items-center justify-center hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all shadow-sm group/btn hover:scale-105 active:scale-95" title="Edit">
                      <svg class="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </button>
                    <button @click="deleteTeacher(teacher)" class="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-rose-500 dark:text-rose-400 flex items-center justify-center hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:border-rose-200 dark:hover:border-rose-800 transition-all shadow-sm group/btn hover:scale-105 active:scale-95" title="Delete">
                      <svg class="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="filteredTeachers.length === 0" class="p-12 text-center text-slate-500">
            No teachers found matching your criteria.
          </div>
        </div>
        
        <!-- Pagination UI -->
        <div v-if="totalPages > 1" class="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Showing <span class="font-bold text-slate-800 dark:text-white">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> to 
            <span class="font-bold text-slate-800 dark:text-white">{{ Math.min(currentPage * itemsPerPage, filteredTeachers.length) }}</span> of 
            <span class="font-bold text-slate-800 dark:text-white">{{ filteredTeachers.length }}</span> teachers
          </p>
          <div class="flex items-center gap-2">
            <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <div class="flex items-center gap-1 hidden sm:flex">
              <button v-for="page in totalPages" :key="page" @click="changePage(page)" :class="['w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all', currentPage === page ? 'bg-indigo-600 text-white shadow-md' : 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700']">
                {{ page }}
              </button>
            </div>
            <div class="sm:hidden text-sm font-bold text-slate-600 dark:text-slate-400 px-2">
              Page {{ currentPage }} / {{ totalPages }}
            </div>
            <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </div>

      </div>
    </main>

    <!-- Modal -->
    <AdminTeacherModal 
      :is-open="isModalOpen" 
      :teacher="selectedTeacher" 
      :mode="modalMode"
      @close="isModalOpen = false" 
      @save="saveTeacherDetails" 
    />

    <!-- Toast -->
    <transition name="toast">
      <div v-if="toast.show" class="fixed bottom-8 right-8 z-[300] flex items-center gap-4 px-6 py-4 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl border"
           :class="toast.type === 'success' ? 'bg-emerald-500/95 border-emerald-400/50 text-white' : 'bg-rose-500/95 border-rose-400/50 text-white'">
        <div class="p-2 rounded-full bg-white/20 shrink-0">
          <svg v-if="toast.type === 'success'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </div>
        <div>
          <p class="font-black text-sm uppercase tracking-wider">{{ toast.type === 'success' ? 'Success' : 'Error' }}</p>
          <p class="text-sm opacity-90 mt-0.5">{{ toast.message }}</p>
        </div>
      </div>
    </transition>

    <!-- Delete Confirmation Modal -->
    <transition name="modal-fade">
      <div v-if="deleteModal.show" class="fixed inset-0 z-[150] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" @click="deleteModal.show = false"></div>
        <div class="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-sm relative z-10 overflow-hidden transform transition-all border border-slate-200 dark:border-slate-700 text-center p-8">
          <div class="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-rose-200 dark:border-rose-800/50">
            <svg class="w-8 h-8 text-rose-500 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <h3 class="text-xl font-black text-slate-800 dark:text-white mb-2">Delete Teacher?</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            Are you sure you want to delete <span class="font-bold text-slate-700 dark:text-slate-300">{{ deleteModal.teacherName }}</span>? This action cannot be undone.
          </p>
          <div class="flex gap-3 w-full">
            <button @click="deleteModal.show = false" class="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              Cancel
            </button>
            <button @click="confirmDelete" :disabled="isDeleting" class="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-md shadow-rose-500/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 flex justify-center items-center gap-2">
              <svg v-if="isDeleting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
              {{ isDeleting ? 'Deleting...' : 'Yes, Delete' }}
            </button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AdminTeacherModal from '../components/AdminTeacherModal.vue';

const router = useRouter();
const teachers = ref([]);
const totalMale = computed(() => teachers.value.filter(t => t.gender && (t.gender.includes('ប្រុស') || t.gender.toLowerCase() === 'm' || t.gender.toLowerCase() === 'male')).length);
const totalFemale = computed(() => teachers.value.filter(t => t.gender && (t.gender.includes('ស្រី') || t.gender.toLowerCase() === 'f' || t.gender.toLowerCase() === 'female')).length);
const isLoading = ref(true);
const error = ref('');
const searchQuery = ref('');
const filterStatus = ref('ALL');

const isModalOpen = ref(false);
const selectedTeacher = ref(null);
const modalMode = ref('edit');
const toast = ref({ show: false, message: '', type: 'success' });

const deleteModal = ref({ show: false, teacher: null, teacherName: '' });
const isDeleting = ref(false);

// We try to use same API base URL logic. Since local development port might be 3000
const API_BASE = import.meta.env.VITE_API_URL + '/api';

const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type };
  setTimeout(() => { toast.value.show = false; }, 4000);
};

const fetchTeachers = async () => {
  isLoading.value = true;
  error.value = '';
  try {
    const res = await fetch(`${API_BASE}/admin/teachers`);
    const result = await res.json();
    if (result.success) {
      // Filter out empty rows (where nameKh is empty)
      teachers.value = result.data.filter(t => t.nameKh && t.nameKh.trim() !== '');
    } else {
      error.value = result.message || 'Failed to fetch teachers';
    }
  } catch (err) {
    console.error('Fetch error:', err);
    error.value = 'Network error fetching teachers. Ensure backend is running locally on port 3000.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchTeachers();
});

const filteredTeachers = computed(() => {
  let list = teachers.value;
  
  if (filterStatus.value === 'ACTIVE') {
    list = list.filter(t => !t.isBlocked);
  } else if (filterStatus.value === 'BLOCKED') {
    list = list.filter(t => t.isBlocked);
  }

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(t => 
      (t.nameKh && t.nameKh.toLowerCase().includes(q)) || 
      (t.nameEn && t.nameEn.toLowerCase().includes(q)) ||
      (t.email && t.email.toLowerCase().includes(q)) ||
      (t.phone && t.phone.toLowerCase().includes(q))
    );
  }

  return list;
});

// Pagination State
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Reset to page 1 when filter/search changes
import { watch } from 'vue';
watch([searchQuery, filterStatus], () => {
  currentPage.value = 1;
});

const totalPages = computed(() => Math.ceil(filteredTeachers.value.length / itemsPerPage.value));

const paginatedTeachers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredTeachers.value.slice(start, end);
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const openAddModal = () => {
  modalMode.value = 'add';
  selectedTeacher.value = null;
  isModalOpen.value = true;
};

const openEditModal = (teacher) => {
  modalMode.value = 'edit';
  selectedTeacher.value = teacher;
  isModalOpen.value = true;
};

const saveTeacherDetails = async (updateData) => {
  if (modalMode.value === 'add') {
    try {
      const res = await fetch(`${API_BASE}/admin/teachers/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      const result = await res.json();
      
      if (result.success) {
        showToast('Teacher added successfully!');
        isModalOpen.value = false;
        fetchTeachers(); // Refetch to get new data and rowIndex
      } else {
        showToast(result.message || 'Failed to add', 'error');
      }
    } catch (err) {
      console.error('Add error:', err);
      showToast('Network error while adding.', 'error');
    }
  } else {
    try {
      const res = await fetch(`${API_BASE}/admin/teachers/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      const result = await res.json();
      
      if (result.success) {
        showToast('Teacher details updated successfully!');
        isModalOpen.value = false;
        
        // Update local state so we don't have to refetch all
        const index = teachers.value.findIndex(t => t.rowIndex === updateData.rowIndex);
        if (index !== -1) {
          Object.assign(teachers.value[index], updateData);
        }
      } else {
        showToast(result.message || 'Failed to update', 'error');
      }
    } catch (err) {
      console.error('Update error:', err);
      showToast('Network error while updating.', 'error');
    }
  }
};

const deleteTeacher = (teacher) => {
  deleteModal.value = {
    show: true,
    teacher: teacher,
    teacherName: teacher.nameKh || teacher.nameEn || 'this teacher'
  };
};

const confirmDelete = async () => {
  const teacher = deleteModal.value.teacher;
  if (!teacher) return;
  
  isDeleting.value = true;
  try {
    const res = await fetch(`${API_BASE}/admin/teachers/delete/${teacher.rowIndex}`, {
      method: 'DELETE',
    });
    const result = await res.json();
    
    if (result.success) {
      showToast('Teacher deleted successfully!');
      deleteModal.value.show = false;
      fetchTeachers(); // Refetch to ensure rowIndices match Google Sheets
    } else {
      showToast(result.message || 'Failed to delete', 'error');
    }
  } catch (err) {
    console.error('Delete error:', err);
    showToast('Network error while deleting.', 'error');
  } finally {
    isDeleting.value = false;
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Siemreap&family=Inter:wght@400;500;600;700;800;900&display=swap');

.font-sans { font-family: 'Inter', sans-serif; }
.font-khmer { font-family: 'Siemreap', sans-serif; }

.toast-enter-active, .toast-leave-active { transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
.toast-enter-from { opacity: 0; transform: translateX(50px) scale(0.9); }
.toast-leave-to { opacity: 0; transform: translateX(50px) scale(0.9); }

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active > div:nth-child(2),
.modal-fade-leave-active > div:nth-child(2) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-fade-enter-from > div:nth-child(2),
.modal-fade-leave-to > div:nth-child(2) {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>
