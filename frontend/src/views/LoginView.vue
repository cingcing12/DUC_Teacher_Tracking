<template>
  <div class="min-h-screen bg-[#02050A] font-sans flex items-center justify-center relative overflow-hidden selection:bg-indigo-500 selection:text-white p-4 sm:p-6 transition-colors duration-1000">
    
    <!-- 🌌 ULTIMATE DEEP SPACE PHYSICS BACKGROUND -->
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <!-- High-res Noise Texture for Depth -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQPSI4Ij4KPHJlY3Qgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPgo8L3N2Zz4=')] opacity-[0.65] mix-blend-overlay z-10"></div>
      
      <!-- Infinite Depth Grid -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_10%,transparent_80%)] z-0"></div>
      
      <!-- Liquid Ambient Orbs (Colors shift based on Teacher/Admin mode) -->
      <div :class="['absolute top-[-20%] left-[-15%] w-[70vw] h-[70vw] rounded-full mix-blend-screen filter blur-[160px] opacity-[0.25] animate-blob transition-colors duration-1000 ease-in-out', isTeacherMode ? 'bg-indigo-600' : 'bg-cyan-600']"></div>
      <div :class="['absolute top-[30%] right-[-15%] w-[55vw] h-[55vw] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.15] animate-blob animation-delay-2000 transition-colors duration-1000 ease-in-out', isTeacherMode ? 'bg-fuchsia-600' : 'bg-emerald-600']"></div>
      <div :class="['absolute bottom-[-30%] left-[20%] w-[80vw] h-[80vw] rounded-full mix-blend-screen filter blur-[180px] opacity-[0.15] animate-blob animation-delay-4000 transition-colors duration-1000 ease-in-out', isTeacherMode ? 'bg-blue-700' : 'bg-teal-700']"></div>
    </div>

    <!-- 💎 LEVITATING EDGE-LIT OBSIDIAN CARD -->
    <div class="w-full max-w-[440px] relative z-10">
      <div class="animate-float">
        
        <!-- Animated Rotating Edge Glow -->
        <div class="relative p-[1.5px] rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] overflow-hidden group/card">
          <!-- The spinning gradient line -->
          <div :class="['absolute inset-[-50%] animate-[spin_4s_linear_infinite] transition-opacity duration-1000', isTeacherMode ? 'bg-[conic-gradient(from_0deg,transparent_70%,rgba(99,102,241,0.8)_100%)]' : 'bg-[conic-gradient(from_0deg,transparent_70%,rgba(6,182,212,0.8)_100%)]']"></div>
          
          <!-- Inner Core Glass -->
          <div class="bg-[#050A14]/90 backdrop-blur-[80px] rounded-[calc(3rem-1.5px)] p-8 sm:p-12 relative overflow-hidden z-10 w-full h-full">
            
            <!-- Internal Ambient Corner Glow -->
            <div :class="['absolute -top-40 -right-40 w-80 h-80 rounded-full blur-[100px] opacity-30 transition-colors duration-1000 pointer-events-none z-0', isTeacherMode ? 'bg-indigo-500' : 'bg-cyan-500']"></div>
            <div class="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none z-0"></div>
            
            <!-- Holographic Logo Chamber -->
            <div class="text-center mb-10 relative z-10 animate-slide-up-stagger-1">
              <div class="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-[2.25rem] bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 shadow-[inset_0_0_30px_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.6)] backdrop-blur-3xl flex items-center justify-center mb-7 relative overflow-hidden group/logo ring-1 ring-white/5">
                <!-- Sweeping Glare -->
                <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent translate-x-[-150%] animate-[shimmer_3s_infinite_ease-in-out] z-20"></div>
                <!-- Interactive Core Light -->
                <div :class="['absolute inset-0 opacity-40 blur-2xl transition-all duration-700 group-hover/logo:scale-150', isTeacherMode ? 'bg-indigo-500' : 'bg-cyan-500']"></div>
                
                <img src="../assets/DUC.png" alt="DUC Logo" class="w-[65%] h-[65%] object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] relative z-30 transition-transform duration-700 ease-out group-hover/logo:scale-110 group-hover/logo:-translate-y-1" />
              </div>
              
              <h1 class="text-3xl sm:text-[2.25rem] font-black text-white tracking-tight drop-shadow-lg leading-tight">
                {{ isTeacherMode ? 'Digital Faculty' : 'System Admin' }}
              </h1>
              <p :class="['text-[11px] font-black mt-3 tracking-[0.25em] uppercase bg-clip-text text-transparent transition-colors duration-1000', isTeacherMode ? 'bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-indigo-400' : 'bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400']">
                {{ isTeacherMode ? 'Workspace Authentication' : 'Secure Admin Access' }}
              </p>
            </div>

            <!-- TEACHER FORM -->
            <form v-if="isTeacherMode" @submit.prevent="handleTeacherLogin" class="space-y-6 relative z-10">
              
              <!-- Email Field -->
              <div class="space-y-2.5 animate-slide-up-stagger-2">
                <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Email Address</label>
                <div class="relative group/input">
                  <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-indigo-400 transition-colors duration-500 z-20">
                    <svg class="h-[1.15rem] w-[1.15rem] drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <input v-model="teacherForm.email" type="email" required class="w-full pl-12 pr-5 py-4.5 bg-[#020408]/60 border border-white/5 rounded-2xl focus:border-indigo-500/50 transition-all duration-300 outline-none text-sm font-bold text-white placeholder-slate-600 shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)] hover:bg-[#020408]/80 focus:bg-[#020408] focus:shadow-[inset_0_2px_15px_rgba(0,0,0,0.8),0_0_25px_rgba(99,102,241,0.15)] relative z-10" placeholder="teacher@duc.edu.kh">
                  
                  <!-- Dynamic Bottom Line -->
                  <div class="absolute bottom-0 left-1/2 right-1/2 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-focus-within/input:opacity-100 group-focus-within/input:left-4 group-focus-within/input:right-4 transition-all duration-500 ease-out z-20"></div>
                </div>
              </div>

              <!-- Password Field -->
              <div class="space-y-2.5 animate-slide-up-stagger-3">
                <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Password</label>
                <div class="relative group/input">
                  <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-indigo-400 transition-colors duration-500 z-20">
                    <svg class="h-[1.15rem] w-[1.15rem] drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </div>
                  
                  <input v-model="teacherForm.password" :type="showTeacherPassword ? 'text' : 'password'" required class="w-full pl-12 pr-12 py-4.5 bg-[#020408]/60 border border-white/5 rounded-2xl focus:border-indigo-500/50 transition-all duration-300 outline-none text-sm font-bold text-white placeholder-slate-600 shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)] hover:bg-[#020408]/80 focus:bg-[#020408] focus:shadow-[inset_0_2px_15px_rgba(0,0,0,0.8),0_0_25px_rgba(99,102,241,0.15)] tracking-widest relative z-10" placeholder="••••••••">
                  
                  <button type="button" @click="showTeacherPassword = !showTeacherPassword" class="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-500 hover:text-indigo-400 transition-colors focus:outline-none z-20">
                    <svg v-if="!showTeacherPassword" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  </button>
                  
                  <div class="absolute bottom-0 left-1/2 right-1/2 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-focus-within/input:opacity-100 group-focus-within/input:left-4 group-focus-within/input:right-4 transition-all duration-500 ease-out z-20"></div>
                </div>
              </div>

              <!-- Haptic Error Banner -->
              <transition name="shake-fade">
                <div v-if="errorMsg" class="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 backdrop-blur-md shadow-[0_10px_20px_rgba(225,29,72,0.15)] animate-slide-up-stagger-3">
                  <div class="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0 border border-rose-500/30">
                    <svg class="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <p class="text-xs font-bold text-rose-300 leading-relaxed">{{ errorMsg }}</p>
                </div>
              </transition>

              <!-- Magnetic Super Button -->
              <div class="pt-2 animate-slide-up-stagger-4">
                <button type="submit" :disabled="isLoading" class="relative w-full py-4.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 bg-[length:200%_auto] hover:bg-right text-white rounded-2xl text-[11px] sm:text-xs font-black tracking-widest uppercase transition-all duration-500 flex items-center justify-center gap-3 group shadow-[0_10px_40px_-10px_rgba(99,102,241,0.8)] hover:shadow-[0_20px_50px_-10px_rgba(99,102,241,1)] hover:-translate-y-1 active:scale-[0.97] active:shadow-none disabled:opacity-70 disabled:hover:translate-y-0 disabled:active:scale-100 overflow-hidden outline-none ring-1 ring-white/20 hover:ring-white/40">
                  <div class="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%] animate-[hologram_2.5s_ease_infinite]"></div>
                  
                  <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white relative z-10" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span class="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{{ isLoading ? 'Authenticating...' : 'Access Portal' }}</span>
                  <svg v-if="!isLoading" class="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>
            </form>

            <!-- ADMIN FORM -->
            <form v-else @submit.prevent="handleAdminLogin" class="space-y-6 relative z-10">
              
              <div class="space-y-2.5 animate-slide-up-stagger-2">
                <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Master Password</label>
                <div class="relative group/input">
                  <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-cyan-400 transition-colors duration-500 z-20">
                    <svg class="h-[1.15rem] w-[1.15rem] drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
                  </div>
                  
                  <input v-model="adminPassword" :type="showAdminPassword ? 'text' : 'password'" required class="w-full pl-12 pr-12 py-4.5 bg-[#020408]/60 border border-white/5 rounded-2xl focus:border-cyan-500/50 transition-all duration-300 outline-none text-sm font-bold text-white placeholder-slate-600 shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)] hover:bg-[#020408]/80 focus:bg-[#020408] focus:shadow-[inset_0_2px_15px_rgba(0,0,0,0.8),0_0_25px_rgba(6,182,212,0.15)] tracking-[0.25em] relative z-10" placeholder="••••••••••••">
                  
                  <button type="button" @click="showAdminPassword = !showAdminPassword" class="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-500 hover:text-cyan-400 transition-colors focus:outline-none z-20">
                    <svg v-if="!showAdminPassword" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  </button>
                  
                  <div class="absolute bottom-0 left-1/2 right-1/2 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-focus-within/input:opacity-100 group-focus-within/input:left-4 group-focus-within/input:right-4 transition-all duration-500 ease-out z-20"></div>
                </div>
              </div>

              <transition name="shake-fade">
                <div v-if="errorMsg" class="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 backdrop-blur-md shadow-[0_10px_20px_rgba(225,29,72,0.15)] animate-slide-up-stagger-3">
                  <div class="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0 border border-rose-500/30">
                    <svg class="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <p class="text-xs font-bold text-rose-300 leading-relaxed">{{ errorMsg }}</p>
                </div>
              </transition>

              <div class="pt-2 animate-slide-up-stagger-4">
                <button type="submit" :disabled="isLoading" class="relative w-full py-4.5 bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-600 bg-[length:200%_auto] hover:bg-right text-white rounded-2xl text-[11px] sm:text-xs font-black tracking-widest uppercase transition-all duration-500 flex items-center justify-center gap-3 group shadow-[0_10px_40px_-10px_rgba(6,182,212,0.8)] hover:shadow-[0_20px_50px_-10px_rgba(6,182,212,1)] hover:-translate-y-1 active:scale-[0.97] active:shadow-none disabled:opacity-70 disabled:hover:translate-y-0 disabled:active:scale-100 overflow-hidden outline-none ring-1 ring-white/20 hover:ring-white/40">
                  <div class="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%] animate-[hologram_2.5s_ease_infinite]"></div>
                  
                  <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white relative z-10" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span class="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{{ isLoading ? 'Authenticating...' : 'Access Dashboard' }}</span>
                  <svg v-if="!isLoading" class="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer Secure Message -->
    <div class="absolute bottom-8 left-0 right-0 text-center pointer-events-none animate-slide-up-stagger-4 opacity-0 [animation-fill-mode:forwards]" style="animation-delay: 0.6s;">
      <p class="text-[9px] font-black text-slate-500/70 uppercase tracking-[0.3em] flex items-center justify-center gap-2">
        <svg class="w-3.5 h-3.5 text-emerald-500/80 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        Military-Grade Encryption
      </p>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// Pure Routing Logic (No Tabs)
const isTeacherMode = computed(() => route.path !== '/admin/login');

const isLoading = ref(false);
const errorMsg = ref('');

// Password Visibility States
const showTeacherPassword = ref(false);
const showAdminPassword = ref(false);

// Form States
const teacherForm = ref({ email: '', password: '' });
const adminPassword = ref('');

// Clear errors and reset eye icons when URL changes
watch(isTeacherMode, () => {
  errorMsg.value = '';
  showTeacherPassword.value = false;
  showAdminPassword.value = false;
});

const handleTeacherLogin = async () => {
  if (!teacherForm.value.email || !teacherForm.value.password) {
    errorMsg.value = "Please fill in all fields.";
    return;
  }

  isLoading.value = true;
  errorMsg.value = '';

  try {
    const response = await fetch('https://duc-teacher-tracking.onrender.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: teacherForm.value.email.trim(),
        password: teacherForm.value.password
      })
    });

    const result = await response.json();

    if (result.success) {
      localStorage.setItem('duc_teacher_token', JSON.stringify(result.teacher));
      router.push('/schedule'); 
    } else {
      errorMsg.value = result.message || "Invalid Email or Password. Please try again.";
    }
  } catch (error) {
    errorMsg.value = "Unable to connect to the server.";
  } finally {
    isLoading.value = false;
  }
};

const handleAdminLogin = async () => {
  if (!adminPassword.value) {
    errorMsg.value = "Please enter the admin password.";
    return;
  }

  isLoading.value = true;
  errorMsg.value = '';

  try {
    const response = await fetch('https://duc-teacher-tracking.onrender.com/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: adminPassword.value })
    });

    const result = await response.json();

    if (result.success) {
      localStorage.setItem('duc_admin_token', 'true');
      router.push('/admin'); 
    } else {
      errorMsg.value = "Incorrect admin password.";
    }
  } catch (error) {
    errorMsg.value = "Unable to connect to the server.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  // Force dark mode on login page for the ultra-premium feel
  document.documentElement.classList.add('dark');
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

.font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }

/* Cinematic Entrance Staggers */
.animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
.animate-slide-up-stagger-1 { animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
.animate-slide-up-stagger-2 { animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both; }
.animate-slide-up-stagger-3 { animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both; }
.animate-slide-up-stagger-4 { animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes slideUpFade {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Haptic Error Shake */
.shake-fade-enter-active { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
.shake-fade-leave-active { transition: all 0.3s ease-in; }
.shake-fade-enter-from, .shake-fade-leave-to { opacity: 0; transform: translateY(-10px); }

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}

/* Ambient Levitating */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
.animate-float { animation: float 8s ease-in-out infinite; }

/* Continuous Slow Spin */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow { animation: spin-slow 10s linear infinite; }

/* Deep Background Physics */
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(40px, -60px) scale(1.15); }
  66% { transform: translate(-30px, 30px) scale(0.85); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob { animation: blob 20s infinite alternate ease-in-out; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

/* Glare & Shimmer */
@keyframes shimmer { 100% { transform: translateX(100%); } }
.animate-shimmer-fast { animation: shimmer 1s ease-out forwards; }

@keyframes hologram { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
</style>