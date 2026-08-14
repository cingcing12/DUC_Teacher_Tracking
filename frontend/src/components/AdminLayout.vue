<template>
  <div class="min-h-screen print:min-h-0 bg-[#F4F7FA] dark:bg-[#0B1120] font-sans text-slate-800 dark:text-slate-100 flex overflow-hidden print:overflow-visible selection:bg-indigo-500 selection:text-white transition-colors duration-500 print:bg-white">
    
    <!-- 🌌 AMBIENT BACKGROUND -->
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center print:hidden">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-20 mask-image:linear-gradient(to_bottom,white,transparent)"></div>
      <div class="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse-slow bg-indigo-500 transition-opacity"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen filter blur-[140px] opacity-10 animate-pulse-slow bg-cyan-500 transition-opacity" style="animation-delay: 2s;"></div>
    </div>

    <!-- 🔮 PREMIUM SIDEBAR -->
    <aside class="relative z-40 w-72 h-screen flex-shrink-0 border-r border-slate-200/50 dark:border-slate-800/50 bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl flex flex-col shadow-[10px_0_30px_-15px_rgba(0,0,0,0.05)] dark:shadow-[10px_0_30px_-15px_rgba(0,0,0,0.3)] transition-all print:hidden">
      
      <!-- Top Brand Section -->
      <div class="p-8 pb-4">
        <div @click="router.push('/admin')" class="flex items-center gap-4 cursor-pointer group mb-2">
          <div class="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-all duration-300 relative overflow-visible">
            <img src="../assets/DUC.png" class="w-12 h-12 object-contain drop-shadow-lg relative z-10" alt="DUC Logo">
          </div>
          <div>
            <h1 class="text-xl font-black text-slate-800 dark:text-white tracking-tight drop-shadow-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">DUC Admin</h1>
            <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Control Center</p>
          </div>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 px-4 py-6 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
        <p class="px-4 text-[10px] font-black uppercase tracking-widest text-slate-400/80 mb-2">Main Menu</p>
        
        <router-link to="/admin" exact-active-class="active-nav-link" class="nav-link group">
          <div class="nav-icon-wrapper group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 group-[.active-nav-link]:bg-indigo-500 group-[.active-nav-link]:text-white group-[.active-nav-link]:shadow-lg group-[.active-nav-link]:shadow-indigo-500/30">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          </div>
          <span class="font-bold text-sm tracking-wide group-hover:text-slate-800 dark:group-hover:text-white group-[.active-nav-link]:text-indigo-700 dark:group-[.active-nav-link]:text-indigo-300">Dashboard</span>
        </router-link>

        <router-link to="/admin/tracking" active-class="active-nav-link" class="nav-link group">
          <div class="nav-icon-wrapper group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 group-[.active-nav-link]:bg-blue-500 group-[.active-nav-link]:text-white group-[.active-nav-link]:shadow-lg group-[.active-nav-link]:shadow-blue-500/30">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          <span class="font-bold text-sm tracking-wide group-hover:text-slate-800 dark:group-hover:text-white group-[.active-nav-link]:text-blue-700 dark:group-[.active-nav-link]:text-blue-300">Tracking Center</span>
        </router-link>

        <router-link to="/admin/teachers" active-class="active-nav-link" class="nav-link group">
          <div class="nav-icon-wrapper group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20 group-[.active-nav-link]:bg-emerald-500 group-[.active-nav-link]:text-white group-[.active-nav-link]:shadow-lg group-[.active-nav-link]:shadow-emerald-500/30">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          </div>
          <span class="font-bold text-sm tracking-wide group-hover:text-slate-800 dark:group-hover:text-white group-[.active-nav-link]:text-emerald-700 dark:group-[.active-nav-link]:text-emerald-300">Manage Teachers</span>
        </router-link>
        
        <div class="my-4 border-t border-slate-200/50 dark:border-slate-800/50 mx-4"></div>
        <p class="px-4 text-[10px] font-black uppercase tracking-widest text-slate-400/80 mb-2">System</p>

        <router-link to="/admin/system-mappings" active-class="active-nav-link" class="nav-link group">
          <div class="nav-icon-wrapper group-hover:bg-fuchsia-100 dark:group-hover:bg-fuchsia-500/20 group-[.active-nav-link]:bg-fuchsia-500 group-[.active-nav-link]:text-white group-[.active-nav-link]:shadow-lg group-[.active-nav-link]:shadow-fuchsia-500/30">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </div>
          <span class="font-bold text-sm tracking-wide group-hover:text-slate-800 dark:group-hover:text-white group-[.active-nav-link]:text-fuchsia-700 dark:group-[.active-nav-link]:text-fuchsia-300">System Setup</span>
        </router-link>
        
        <router-link to="/admin/settings" active-class="active-nav-link" class="nav-link group">
          <div class="nav-icon-wrapper group-hover:bg-amber-100 dark:group-hover:bg-amber-500/20 group-[.active-nav-link]:bg-amber-500 group-[.active-nav-link]:text-white group-[.active-nav-link]:shadow-lg group-[.active-nav-link]:shadow-amber-500/30">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
          </div>
          <span class="font-bold text-sm tracking-wide group-hover:text-slate-800 dark:group-hover:text-white group-[.active-nav-link]:text-amber-700 dark:group-[.active-nav-link]:text-amber-300">Preferences</span>
        </router-link>

      </nav>

      <!-- Bottom Profile / Logout -->
      <div class="p-4 border-t border-slate-200/50 dark:border-slate-800/50">
        <button @click="showLogoutModal = true" class="w-full flex items-center justify-between p-3 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:border-rose-200 dark:hover:border-rose-500/30 group transition-all duration-300">
           <div class="flex items-center gap-3">
             <div class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-rose-100 dark:group-hover:bg-rose-500/20 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
               <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
             </div>
             <div class="text-left">
               <p class="text-sm font-black text-slate-700 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">Log Out</p>
               <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Admin Session</p>
             </div>
           </div>
        </button>
      </div>
    </aside>

    <!-- 🌌 MAIN CONTENT AREA -->
    <main class="flex-1 relative z-10 h-screen print:h-auto overflow-y-auto print:overflow-visible custom-scrollbar flex flex-col transition-all duration-500 print:bg-white">
       <router-view v-slot="{ Component }">
          <transition name="fade-scale" mode="out-in">
            <component :is="Component" />
          </transition>
       </router-view>
    </main>

    <!-- Logout Confirmation Modal -->
    <transition name="modal-fade">
      <div v-if="showLogoutModal" class="fixed inset-0 z-[150] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" @click="showLogoutModal = false"></div>
        <div class="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(0,0,0,0.4)] w-full max-w-sm relative z-10 overflow-hidden transform transition-all border border-slate-200 dark:border-slate-700 text-center p-8">
          <div class="w-20 h-20 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-rose-200 dark:border-rose-800/50 relative">
            <div class="absolute inset-0 bg-rose-500/20 blur-xl rounded-full animate-pulse"></div>
            <svg class="w-10 h-10 text-rose-500 dark:text-rose-400 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          </div>
          <h3 class="text-2xl font-black text-slate-800 dark:text-white mb-2 tracking-tight">Log Out?</h3>
          <p class="text-sm font-bold text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            Are you sure you want to end your <span class="text-rose-500">Admin Session</span>?
          </p>
          <div class="flex gap-3 w-full">
            <button @click="showLogoutModal = false" class="flex-1 px-4 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm">
              Cancel
            </button>
            <button @click="logoutAdmin" class="flex-1 px-4 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/30 transition-all hover:-translate-y-1 active:scale-95 flex justify-center items-center gap-2">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showLogoutModal = ref(false);

const logoutAdmin = () => {
  localStorage.removeItem("duc_admin_token");
  router.push("/admin/login");
};
</script>

<style scoped>
@reference "../style.css";
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

.font-sans { font-family: 'Inter', sans-serif; }

.nav-link {
  @apply flex items-center gap-4 px-3 py-2.5 rounded-2xl transition-all duration-300 text-slate-500 dark:text-slate-400;
}
.nav-icon-wrapper {
  @apply w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 bg-transparent text-slate-400 dark:text-slate-500;
}

/* Animations */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.2; transform: scale(1.05); }
}
.animate-pulse-slow { animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

.fade-scale-enter-active, .fade-scale-leave-active { transition: all 0.4s ease; }
.fade-scale-enter-from { opacity: 0; transform: scale(0.98) translateY(10px); }
.fade-scale-leave-to { opacity: 0; transform: scale(1.02) translateY(-10px); }

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

.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
</style>
