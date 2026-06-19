<template>
  <div class="min-h-screen bg-[#F4F7FA] font-sans flex items-center justify-center relative overflow-hidden selection:bg-indigo-500 selection:text-white p-6">
    
    <div class="absolute top-0 right-0 -mr-20 -mt-20 w-[40rem] h-[40rem] bg-indigo-600 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse-slow"></div>
    <div class="absolute bottom-0 left-10 w-[30rem] h-[30rem] bg-cyan-500 rounded-full mix-blend-screen filter blur-[100px] opacity-30"></div>
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMikiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-50"></div>

    <div class="w-full max-w-md relative z-10">
      
      <div class="text-center mb-8 animate-fade-in-up">
        <div :class="['w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6']">
          <img src="../assets/DUC.png" alt="DUC Logo" class="w-full h-full object-contain drop-shadow-md" />
        </div>
        <h1 class="text-3xl font-black text-slate-800 tracking-tight">
          {{ isTeacherMode ? 'Digital Faculty' : 'System Administration' }}
        </h1>
        <p class="text-slate-500 font-bold mt-1 tracking-wide text-sm">
          {{ isTeacherMode ? 'Workspace Authentication' : 'Secure Admin Access' }}
        </p>
      </div>

      <div class="bg-white/70 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white p-8 relative overflow-hidden animate-fade-in-up" style="animation-delay: 0.1s;">
        <div class="absolute top-0 right-0 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <form v-if="isTeacherMode" @submit.prevent="handleTeacherLogin" class="space-y-5 relative z-10">
          <div>
            <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 pl-2">Full Name (Khmer or English)</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <input v-model="teacherForm.name" type="text" required class="w-full pl-11 pr-4 py-3.5 bg-white/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-sm font-bold text-slate-800 placeholder-slate-300" placeholder="e.g. សុខភ័ក្ត">
            </div>
          </div>

          <div>
            <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 pl-2">PIN / Phone Number</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
              
              <input v-model="teacherForm.phone" :type="showTeacherPassword ? 'text' : 'password'" required class="w-full pl-11 pr-12 py-3.5 bg-white/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-sm font-bold text-slate-800 placeholder-slate-300" placeholder="••••••••">
              
              <button type="button" @click="showTeacherPassword = !showTeacherPassword" class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-indigo-500 transition-colors focus:outline-none">
                <svg v-if="!showTeacherPassword" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              </button>
            </div>
          </div>

          <div v-if="errorMsg" class="p-4 rounded-2xl bg-red-50 border border-red-100 flex items-start gap-3">
            <svg class="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p class="text-xs font-bold text-red-600 leading-relaxed">{{ errorMsg }}</p>
          </div>

          <button type="submit" :disabled="isLoading" class="w-full py-4 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl text-sm font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 group hover:shadow-lg hover:shadow-indigo-500/30 disabled:opacity-70">
            <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-else>Access Portal</span>
            <svg v-if="!isLoading" class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </form>

        <form v-else @submit.prevent="handleAdminLogin" class="space-y-5 relative z-10">
          <div>
            <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 pl-2">Master Password</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-500 transition-colors">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
              </div>
              
              <input v-model="adminPassword" :type="showAdminPassword ? 'text' : 'password'" required class="w-full pl-11 pr-12 py-3.5 bg-white/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none text-sm font-bold text-slate-800 placeholder-slate-300" placeholder="••••••••••••">
              
              <button type="button" @click="showAdminPassword = !showAdminPassword" class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-cyan-500 transition-colors focus:outline-none">
                <svg v-if="!showAdminPassword" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              </button>
            </div>
          </div>

          <div v-if="errorMsg" class="p-4 rounded-2xl bg-red-50 border border-red-100 flex items-start gap-3">
            <svg class="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p class="text-xs font-bold text-red-600 leading-relaxed">{{ errorMsg }}</p>
          </div>

          <button type="submit" :disabled="isLoading" class="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl text-sm font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 group hover:shadow-lg hover:shadow-cyan-500/30 disabled:opacity-70">
            <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-else>Access Dashboard</span>
            <svg v-if="!isLoading" class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const isTeacherMode = computed(() => route.path !== '/admin/login');

const isLoading = ref(false);
const errorMsg = ref('');

// Password Visibility States
const showTeacherPassword = ref(false);
const showAdminPassword = ref(false);

const teacherForm = ref({ name: '', phone: '' });
const adminPassword = ref('');

// Clear errors and reset eye icons when URL changes
watch(isTeacherMode, () => {
  errorMsg.value = '';
  showTeacherPassword.value = false;
  showAdminPassword.value = false;
});

const handleTeacherLogin = async () => {
  if (!teacherForm.value.name || !teacherForm.value.phone) {
    errorMsg.value = "Please fill in all fields.";
    return;
  }

  isLoading.value = true;
  errorMsg.value = '';

  // 🔥 Format phone: Automatically strips out any spaces the user typed
  const formattedPhone = teacherForm.value.phone.replace(/\s+/g, '');

  try {
    const response = await fetch('https://duc-teacher-tracking.onrender.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: teacherForm.value.name.trim(),
        phone: formattedPhone
      })
    });

    const result = await response.json();

    if (result.success) {
      localStorage.setItem('duc_teacher_token', JSON.stringify(result.teacher));
      router.push('/schedule'); 
    } else {
      errorMsg.value = "Invalid Name or Phone Number. Please check your details.";
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
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }

.animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.05); }
}
.animate-pulse-slow { animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
</style>