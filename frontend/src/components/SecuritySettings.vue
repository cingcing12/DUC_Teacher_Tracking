<template>
  <div class="w-full h-full flex flex-col">
    <!-- Main Content Area -->
    <div class="relative w-full flex-grow">
      <template v-if="view === 'password'">
        <div class="w-full pt-2">
            <div class="flex items-center gap-3 mb-6">
              <button @click="goBack" class="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center transition-colors">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <h3 :class="['font-black text-sm text-slate-900 dark:text-white', language === 'kh' ? 'font-khmer' : '']">{{ t.password }}</h3>
            </div>
            
            <form @submit.prevent="handleChangePassword" class="space-y-4">
              <div class="relative group/input">
                <input v-model="pwdForm.current" :type="showPwdCurrent ? 'text' : 'password'" required placeholder="Current Password" class="w-full pl-4 pr-10 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:text-white transition-all tracking-widest">
                <button type="button" @click="showPwdCurrent = !showPwdCurrent" class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-500 transition-colors focus:outline-none">
                  <svg v-if="!showPwdCurrent" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                </button>
              </div>
              
              <div class="relative group/input">
                <input v-model="pwdForm.new" :type="showPwdNew ? 'text' : 'password'" required placeholder="New Password" class="w-full pl-4 pr-10 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:text-white transition-all tracking-widest">
                <button type="button" @click="showPwdNew = !showPwdNew" class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-500 transition-colors focus:outline-none">
                  <svg v-if="!showPwdNew" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                </button>
              </div>
              
              <div class="px-1">
                <p v-if="pwdForm.new.length === 0" class="text-[9px] sm:text-[10px] text-slate-400 font-medium">Must be at least 8 characters, and include a letter, number, and symbol (e.g. +).</p>
                <div v-else class="animate-fade-in-up mt-1">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-[10px] font-bold text-slate-500 dark:text-slate-400">Password Strength</span>
                    <span :class="['text-[10px] font-black uppercase tracking-wider', 
                      passwordStrength <= 1 ? 'text-rose-500' :
                      passwordStrength === 2 ? 'text-orange-500' :
                      passwordStrength === 3 ? 'text-yellow-500' : 'text-emerald-500'
                    ]">{{ strengthLabel }}</span>
                  </div>
                  <div class="flex gap-1.5 h-1.5">
                    <div v-for="i in 4" :key="i" :class="['flex-1 rounded-full transition-colors duration-500', i <= passwordStrength ? strengthColor : 'bg-slate-200 dark:bg-slate-700/50']"></div>
                  </div>
                  
                  <ul class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[9px] sm:text-[10px] font-bold text-slate-400">
                    <li class="flex items-center gap-2 transition-colors duration-300" :class="pwdForm.new.length >= 8 ? 'text-emerald-500' : ''">
                      <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" :d="pwdForm.new.length >= 8 ? 'M5 13l4 4L19 7' : 'M20 12H4'"></path></svg>
                      8+ characters
                    </li>
                    <li class="flex items-center gap-2 transition-colors duration-300" :class="/[a-zA-Z]/.test(pwdForm.new) ? 'text-emerald-500' : ''">
                      <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" :d="/[a-zA-Z]/.test(pwdForm.new) ? 'M5 13l4 4L19 7' : 'M20 12H4'"></path></svg>
                      1+ letter
                    </li>
                    <li class="flex items-center gap-2 transition-colors duration-300" :class="/\d/.test(pwdForm.new) ? 'text-emerald-500' : ''">
                      <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" :d="/\d/.test(pwdForm.new) ? 'M5 13l4 4L19 7' : 'M20 12H4'"></path></svg>
                      1+ number
                    </li>
                    <li class="flex items-center gap-2 transition-colors duration-300" :class="/[\W_]/.test(pwdForm.new) ? 'text-emerald-500' : ''">
                      <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" :d="/[\W_]/.test(pwdForm.new) ? 'M5 13l4 4L19 7' : 'M20 12H4'"></path></svg>
                      1+ symbol
                    </li>
                  </ul>
                </div>
              </div>

              <button type="submit" :disabled="pwdLoading" class="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity disabled:opacity-50 mt-2">
                {{ pwdLoading ? 'Updating...' : 'Update Password' }}
              </button>
            </form>
        </div>
      </template>

      <!-- TWO-FACTOR AUTH VIEW -->
      <template v-else-if="view === '2fa'">
        <div class="w-full pt-2 animate-fade-in-up">
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-3">
                <button @click="goBack" class="group w-9 h-9 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-center transition-all hover:scale-105 shadow-sm">
                  <svg class="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <h3 :class="['font-black text-base text-slate-900 dark:text-white', language === 'kh' ? 'font-khmer' : '']">{{ t.tfa }}</h3>
              </div>
              <div :class="has2FA ? 'bg-emerald-100/80 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30' : 'bg-slate-100/80 text-slate-500 dark:bg-slate-800/50 dark:text-slate-400 border-slate-200 dark:border-slate-700'" class="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-sm shadow-inner flex items-center gap-1.5">
                <span v-if="has2FA" class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {{ has2FA ? 'Enabled' : 'Disabled' }}
              </div>
            </div>

            <!-- DISABLE 2FA SECTION -->
            <div v-if="has2FA">
              <div class="relative bg-white/60 dark:bg-slate-900/40 backdrop-blur-2xl border border-white dark:border-slate-700/50 rounded-[2rem] p-8 sm:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-none text-center overflow-hidden group">
                <!-- Ambient Glow -->
                <div class="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-rose-500/20 transition-colors duration-700"></div>
                <div class="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-indigo-500/20 transition-colors duration-700"></div>
                
                <div class="relative z-10 flex flex-col items-center">
                  <div class="w-16 h-16 bg-gradient-to-br from-rose-400 to-rose-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-rose-500/30 mb-6 animate-float border border-white/20">
                    <svg class="w-8 h-8 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </div>
                  
                  <h4 class="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight mb-2">Disable Authentication</h4>
                  <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mb-8 max-w-xs leading-relaxed">Enter your 6-digit authenticator code to verify and disable Two-Factor Authentication.</p>
                  
                  <OTPInput v-model="token2FA" @complete="disable2FA" class="mb-10 scale-105 sm:scale-110" />
                  
                  <button @click="disable2FA" :disabled="tfLoading" class="relative inline-flex items-center justify-center px-8 py-3.5 text-xs sm:text-sm font-black text-white uppercase tracking-widest transition-all duration-300 bg-rose-500 hover:bg-rose-600 rounded-xl overflow-hidden shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                    <span class="absolute inset-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity"></span>
                    <span class="relative flex items-center gap-2">
                      <svg v-if="tfLoading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      {{ tfLoading ? 'Verifying...' : 'Disable Two-Factor Auth' }}
                    </span>
                  </button>
                  
                  <transition name="fade-scale">
                    <p v-if="tfMsg" class="text-xs text-rose-600 dark:text-rose-400 font-bold mt-5 text-center bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 px-4 py-2 rounded-lg inline-block animate-fade-in-up">
                      {{ tfMsg }}
                    </p>
                  </transition>
                </div>
              </div>
            </div>

            <!-- ENABLE 2FA SECTION -->
            <div v-else>
              <div v-if="!qrCode" class="relative bg-white/60 dark:bg-slate-900/40 backdrop-blur-2xl border border-white dark:border-slate-700/50 rounded-[2rem] p-8 sm:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-none text-center overflow-hidden group">
                 <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-indigo-500/20 transition-colors duration-700"></div>
                 <div class="relative z-10 flex flex-col items-center">
                    <div class="w-16 h-16 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/30 mb-6 animate-float border border-white/20">
                      <svg class="w-8 h-8 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
                    </div>
                    <h4 class="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight mb-2">Secure Your Account</h4>
                    <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mb-8 max-w-sm leading-relaxed">Add an extra layer of security to your account by enabling Two-Factor Authentication.</p>
                    
                    <button @click="generate2FA" :disabled="tfLoading" class="relative inline-flex items-center justify-center px-8 py-3.5 text-xs sm:text-sm font-black text-white uppercase tracking-widest transition-all duration-300 bg-indigo-500 hover:bg-indigo-600 rounded-xl overflow-hidden shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
                      <span class="absolute inset-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity"></span>
                      <span class="relative flex items-center gap-2">
                        <svg v-if="tfLoading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        {{ tfLoading ? 'Initializing...' : 'Set Up 2FA Now' }}
                      </span>
                    </button>
                 </div>
              </div>
              
              <div v-else class="relative bg-white/60 dark:bg-slate-900/40 backdrop-blur-2xl border border-white dark:border-slate-700/50 rounded-[2rem] p-6 sm:p-10 shadow-xl overflow-hidden animate-fade-in-up">
                <template v-if="!isVerifying">
                  <div class="text-center mb-8">
                    <h4 class="font-black text-slate-800 dark:text-white text-lg">Scan QR Code</h4>
                    <p class="text-xs text-slate-500 mt-1">Open your Authenticator app and scan this code.</p>
                  </div>
                  
                  <div v-if="!showQR" class="bg-slate-50/80 dark:bg-slate-800/80 p-6 rounded-[1.5rem] border border-slate-200/50 dark:border-white/5 text-center space-y-5 shadow-inner">
                    <div class="inline-flex items-center gap-3 bg-white dark:bg-slate-900 px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                      <code class="text-lg font-mono font-black text-indigo-500 tracking-wider">{{ secret }}</code>
                      <button @click="copySecret" class="w-8 h-8 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded-lg flex items-center justify-center hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors" title="Copy Secret">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                      </button>
                    </div>
                    <div>
                      <button @click="showQR = true" class="text-xs font-bold text-slate-400 hover:text-indigo-500 transition-colors flex items-center justify-center gap-1.5 mx-auto">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                        Prefer to scan a QR code?
                      </button>
                    </div>
                  </div>
                  
                  <div v-else class="bg-slate-50/80 dark:bg-slate-800/80 p-8 rounded-[1.5rem] border border-slate-200/50 dark:border-white/5 text-center flex flex-col items-center shadow-inner">
                    <div class="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 mb-5">
                      <img :src="qrCode" alt="2FA QR Code" class="w-40 h-40 rounded-xl" />
                    </div>
                    <button @click="showQR = false" class="text-xs font-bold text-slate-400 hover:text-indigo-500 transition-colors flex items-center gap-1.5">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
                      Use a text setup key instead
                    </button>
                  </div>

                  <div class="flex justify-center pt-6">
                    <button @click="isVerifying = true" class="group relative inline-flex items-center justify-center px-8 py-3.5 text-xs sm:text-sm font-black text-white uppercase tracking-widest transition-all duration-300 bg-indigo-500 hover:bg-indigo-600 rounded-xl overflow-hidden shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 w-full sm:w-auto">
                      <span class="absolute inset-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      Next: Verify Code
                      <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>
                  </div>
                </template>
                
                <template v-else>
                  <div class="text-center mb-8 animate-fade-in-up">
                    <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h4 class="font-black text-slate-800 dark:text-white text-xl">Verify Setup</h4>
                    <p class="text-xs font-medium text-slate-500 mt-2">Enter the 6-digit code from your authenticator app.</p>
                  </div>
                  
                  <OTPInput v-model="token2FA" @complete="enable2FA" class="mb-8 scale-105 sm:scale-110" />
                  
                  <div class="flex flex-col sm:flex-row justify-center gap-3">
                    <button @click="isVerifying = false; token2FA = ''" class="px-6 py-3.5 bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 rounded-xl text-xs sm:text-sm font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors w-full sm:w-auto">
                      Back
                    </button>
                    <button @click="enable2FA" :disabled="tfLoading" class="group relative inline-flex items-center justify-center px-8 py-3.5 text-xs sm:text-sm font-black text-white uppercase tracking-widest transition-all duration-300 bg-emerald-500 hover:bg-emerald-600 rounded-xl overflow-hidden shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto">
                      <span class="absolute inset-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <span class="relative flex items-center gap-2">
                        <svg v-if="tfLoading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        {{ tfLoading ? 'Verifying...' : 'Verify & Enable' }}
                      </span>
                    </button>
                  </div>
                  <transition name="fade-scale">
                    <p v-if="tfMsg" class="text-xs text-rose-600 dark:text-rose-400 font-bold mt-5 text-center bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 px-4 py-2 rounded-lg inline-block mx-auto animate-fade-in-up">
                      {{ tfMsg }}
                    </p>
                  </transition>
                </template>
              </div>
            </div>
          </div>
      </template>

      <!-- SESSIONS VIEW -->
      <template v-else-if="view === 'sessions'">
        <div class="w-full pt-2">
            <div class="flex items-center gap-3 mb-6">
              <button @click="sessionBack" class="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center transition-colors">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <h3 :class="['font-black text-sm text-slate-900 dark:text-white', language === 'kh' ? 'font-khmer' : '']">{{ t.sessions }}</h3>
            </div>
            
            <div class="grid relative w-full overflow-hidden">
              <transition :name="sessionTransition">
                <div v-if="!selectedSession" key="list" class="w-full" style="grid-area: 1 / 1;">
                  <div v-if="sessionLoading" class="text-xs text-slate-400 font-bold">Loading sessions...</div>
                  <div v-else-if="sessions.length === 0" class="text-xs text-slate-400 font-bold">No active sessions found.</div>
                  
                  <div v-else class="space-y-3">
                    <button v-for="s in sessions" :key="s.sessionId" @click="viewSessionDetails(s)" class="w-full text-left flex items-center justify-between p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl group hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all outline-none">
                      <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                          <svg v-if="s.device.toLowerCase().includes('mobile')" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </div>
                        <div>
                          <p class="text-xs font-black text-slate-800 dark:text-white flex items-center gap-2">
                            {{ s.device }}
                            <span v-if="s.sessionId === currentSessionId" class="text-[8px] px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded uppercase tracking-wider font-bold">This Device</span>
                          </p>
                          <p class="text-[9px] font-bold text-slate-400 mt-0.5">{{ s.ip }} • {{ s.location }}</p>
                        </div>
                      </div>
                      <svg class="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                  </div>
                </div>

                <div v-else key="detail" class="w-full" style="grid-area: 1 / 1;">
                  <div class="bg-white dark:bg-slate-800/80 rounded-[1.5rem] p-5 sm:p-6 border border-slate-200/50 dark:border-white/5 shadow-sm text-center">
                    <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-4 border border-indigo-100 dark:border-indigo-500/20 shadow-inner">
                      <svg v-if="selectedSession.device.toLowerCase().includes('mobile')" class="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                      <svg v-else class="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    
                    <h4 class="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center justify-center gap-2 mb-1">
                      {{ selectedSession.device }}
                      <span v-if="selectedSession.sessionId === currentSessionId" class="text-[9px] sm:text-[10px] px-2 py-0.5 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-md uppercase tracking-wider font-bold">This Device</span>
                    </h4>
                    
                    <div class="mt-6 space-y-3 text-left">
                      <div class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3 sm:p-4 border border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
                        <span class="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Location</span>
                        <span class="text-xs font-bold text-slate-700 dark:text-slate-300">{{ selectedSession.location }}</span>
                      </div>
                      <div class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3 sm:p-4 border border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
                        <span class="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">IP Address</span>
                        <span class="text-xs font-bold font-mono text-slate-700 dark:text-slate-300">{{ selectedSession.ip }}</span>
                      </div>
                      <div class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3 sm:p-4 border border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
                        <span class="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Last Active</span>
                        <span class="text-xs font-bold text-slate-700 dark:text-slate-300">{{ new Date(selectedSession.lastActive).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) }}</span>
                      </div>
                      <div class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3 sm:p-4 border border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
                        <span class="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Status</span>
                        <div class="flex items-center gap-1.5">
                          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span class="text-[10px] font-black uppercase tracking-wider text-emerald-500">Active</span>
                        </div>
                      </div>
                    </div>
                    
                    <button v-if="selectedSession.sessionId !== currentSessionId" @click="handleTerminateSession(selectedSession.sessionId)" :disabled="isTerminating" class="mt-6 w-full py-3.5 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all hover:shadow-lg hover:shadow-rose-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      <svg v-if="isTerminating" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      {{ isTerminating ? 'Terminating...' : 'Terminate Session' }}
                    </button>
                  </div>
                </div>
              </transition>
            </div>
        </div>
      </template>
    </div>
    
    <Teleport to="body">
      <transition name="fade-scale">
        <div v-if="customAlert.show" class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xl transition-opacity" @click="closeAlert"></div>
        <div class="relative w-full max-w-sm bg-white dark:bg-[#0A0A0A] rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.3)] overflow-hidden border border-slate-200 dark:border-white/10 flex flex-col z-10 p-6 sm:p-8 text-center ring-1 ring-slate-200 dark:ring-white/5">
          <div :class="['absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none', customAlert.type === 'success' ? 'bg-emerald-500/20' : customAlert.type === 'confirm' ? 'bg-orange-500/20' : 'bg-rose-500/20']"></div>
          <div :class="['w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full flex items-center justify-center mb-5 sm:mb-6 shadow-2xl relative transition-transform animate-bounce-short', customAlert.type === 'success' ? 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-500/40' : customAlert.type === 'confirm' ? 'bg-gradient-to-br from-orange-400 to-amber-500 shadow-orange-500/40' : 'bg-gradient-to-br from-rose-400 to-red-500 shadow-rose-500/40']">
            <div class="absolute inset-0 rounded-full border-2 border-white/30 mix-blend-overlay"></div>
            <svg v-if="customAlert.type === 'success'" class="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
            <svg v-else-if="customAlert.type === 'confirm'" class="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <svg v-else class="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
          </div>
          
          <h3 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2 font-sans tracking-tight">
            {{ customAlert.type === 'success' ? 'Success!' : customAlert.type === 'confirm' ? 'Confirm' : 'Error' }}
          </h3>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 sm:mb-8">{{ customAlert.message }}</p>
          
          <div v-if="customAlert.type === 'confirm'" class="flex gap-2 sm:gap-3">
            <button @click="closeAlert" class="flex-1 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300">
              Cancel
            </button>
            <button @click="executeConfirm" class="flex-1 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all shadow-lg text-white bg-rose-600 hover:bg-rose-50 hover:shadow-rose-500/25">
              {{ customAlert.confirmText }}
            </button>
          </div>
          <button v-else @click="closeAlert" :class="['w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all shadow-lg text-white flex items-center justify-center gap-2 hover:-translate-y-1', customAlert.type === 'success' ? 'bg-slate-900 dark:bg-white dark:text-slate-900 hover:shadow-emerald-500/25 dark:hover:bg-emerald-400' : 'bg-rose-600 hover:shadow-rose-500/25 hover:bg-rose-500']">
            {{ customAlert.type === 'success' ? 'Awesome' : 'Try Again' }}
          </button>
        </div>
      </div>
    </transition>
  </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import OTPInput from './OTPInput.vue';

const props = defineProps({
  language: {
    type: String,
    default: 'en'
  },
  view: {
    type: String,
    required: true
  },
  has2FA: {
    type: Boolean,
    default: false
  },
  sessions: {
    type: Array,
    default: () => []
  },
  sessionLoading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['go-back', 'update:has2FA', 'update:sessions']);

const t = computed(() => {
  if (props.language === 'kh') {
    return {
      title: 'សុវត្ថិភាពនិងវគ្គ',
      password: 'ប្តូរពាក្យសម្ងាត់',
      passwordDesc: 'ធ្វើបច្ចុប្បន្នភាពពាក្យសម្ងាត់របស់អ្នក',
      tfa: 'ការផ្ទៀងផ្ទាត់កត្តាពីរ',
      tfaDesc: 'បន្ថែមស្រទាប់សុវត្ថិភាពបន្ថែម',
      sessions: 'វគ្គសកម្ម',
      sessionsDesc: 'គ្រប់គ្រងឧបករណ៍ដែលអ្នកបានចូល'
    };
  }
  return {
    title: 'Security & Session',
    password: 'Change Password',
    passwordDesc: 'Update your account password',
    tfa: 'Two-Factor Authentication',
    tfaDesc: 'Add an extra layer of security',
    sessions: 'Active Sessions',
    sessionsDesc: 'Manage devices you\'re logged into'
  };
});

const teacherEmail = ref('');
const currentSessionId = ref('');

const selectedSession = ref(null);
const sessionTransition = ref('slide-left');

const viewSessionDetails = (session) => {
  sessionTransition.value = 'slide-left';
  selectedSession.value = session;
};

const sessionBack = () => {
  if (selectedSession.value) {
    sessionTransition.value = 'slide-right';
    selectedSession.value = null;
  } else {
    emit('go-back');
  }
};

const goBack = () => {
  emit('go-back');
};

// Password States
const pwdForm = ref({ current: '', new: '' });
const pwdLoading = ref(false);
const showPwdCurrent = ref(false);
const showPwdNew = ref(false);

const passwordStrength = computed(() => {
  const pwd = pwdForm.value.new;
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[a-zA-Z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[\W_]/.test(pwd)) score++;
  return score;
});

const strengthLabel = computed(() => {
  const s = passwordStrength.value;
  if (pwdForm.value.new.length === 0) return '';
  if (s <= 1) return 'Weak';
  if (s === 2) return 'Fair';
  if (s === 3) return 'Good';
  return 'Strong';
});

const strengthColor = computed(() => {
  const s = passwordStrength.value;
  if (s <= 1) return 'bg-rose-500';
  if (s === 2) return 'bg-orange-500';
  if (s === 3) return 'bg-yellow-500';
  return 'bg-emerald-500';
});

// Custom Alert States
const customAlert = ref({
  show: false,
  type: 'success', // 'success' | 'error' | 'confirm'
  message: '',
  confirmText: '',
  onConfirm: null
});

const closeAlert = () => {
  customAlert.value.show = false;
  setTimeout(() => {
    customAlert.value.onConfirm = null;
  }, 300);
};

const executeConfirm = () => {
  if (customAlert.value.onConfirm) {
    customAlert.value.onConfirm();
  }
  closeAlert();
};

const showAlert = (type, message, confirmText = '', onConfirm = null) => {
  customAlert.value = {
    show: true,
    type,
    message,
    confirmText,
    onConfirm
  };
};

// 2FA States
const showQR = ref(false);
const qrCode = ref('');
const secret = ref('');
const token2FA = ref('');
const tfLoading = ref(false);
const tfMsg = ref('');
const isVerifying = ref(false);

onMounted(() => {
  const token = localStorage.getItem('duc_teacher_token');
  if (token) {
    const user = JSON.parse(token);
    teacherEmail.value = user.email;
    currentSessionId.value = user.sessionId;
  }
});

const copySecret = () => {
  navigator.clipboard.writeText(secret.value);
};

const handleChangePassword = async () => {
  const newPwd = pwdForm.value.new;
  const isValid = newPwd.length >= 8 && /[a-zA-Z]/.test(newPwd) && /\d/.test(newPwd) && /[\W_]/.test(newPwd);
  
  if (!isValid) {
    showAlert('error', 'Password must be at least 8 characters long and contain at least one letter, one number, and one symbol (e.g. +).');
    return;
  }

  pwdLoading.value = true;
  
  try {
    const res = await fetch(import.meta.env.VITE_API_URL + '/api/security/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: teacherEmail.value,
        currentPassword: pwdForm.value.current,
        newPassword: pwdForm.value.new
      })
    });
    
    const data = await res.json();
    
    showAlert(data.success ? 'success' : 'error', data.message);
    
    if (data.success) {
      pwdForm.value.current = '';
      pwdForm.value.new = '';
    }
  } catch (e) {
    showAlert('error', 'Network error');
  } finally {
    pwdLoading.value = false;
  }
};

const generate2FA = async () => {
  tfLoading.value = true;
  try {
    const res = await fetch(import.meta.env.VITE_API_URL + '/api/security/2fa/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: teacherEmail.value })
    });
    const data = await res.json();
    if (data.success) {
      qrCode.value = data.qrCodeUrl;
      secret.value = data.secret;
      isVerifying.value = false;
      showQR.value = false;
    }
  } catch (e) {} finally {
    tfLoading.value = false;
  }
};

const enable2FA = async (completedToken = null) => {
  const token = typeof completedToken === 'string' ? completedToken : token2FA.value;
  if (!token || token.length !== 6) return;
  
  tfLoading.value = true;
  tfMsg.value = '';
  
  try {
    const res = await fetch(import.meta.env.VITE_API_URL + '/api/security/2fa/enable', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: teacherEmail.value,
        secret: secret.value,
        token: token
      })
    });
    const data = await res.json();
    if (data.success) {
      tfMsg.value = '';
      token2FA.value = '';
      showAlert('success', 'Two-Factor Authentication has been successfully enabled.');
      emit('update:has2FA', true);
    } else {
      token2FA.value = '';
      showAlert('error', data.message || 'Invalid 2FA code');
    }
  } catch (e) {
    token2FA.value = '';
    showAlert('error', 'Network error');
  } finally {
    tfLoading.value = false;
  }
};

const disable2FA = async (completedToken = null) => {
  const token = typeof completedToken === 'string' ? completedToken : token2FA.value;
  if (!token || token.length !== 6) return;
  
  tfLoading.value = true;
  tfMsg.value = '';
  
  try {
    const res = await fetch(import.meta.env.VITE_API_URL + '/api/security/2fa/disable', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: teacherEmail.value,
        token: token
      })
    });
    const data = await res.json();
    if (data.success) {
      tfMsg.value = '';
      token2FA.value = '';
      showAlert('success', 'Two-Factor Authentication has been successfully disabled.');
      emit('update:has2FA', false);
    } else {
      token2FA.value = '';
      showAlert('error', data.message || 'Invalid 2FA code');
    }
  } catch (e) {
    token2FA.value = '';
    showAlert('error', 'Network error');
  } finally {
    tfLoading.value = false;
  }
};

const isTerminating = ref(false);

const terminateSession = async (id) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/security/sessions/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      emit('update:sessions', props.sessions.filter(s => s.sessionId !== id));
      return { success: true };
    }
    return { success: false, message: data.message };
  } catch (e) {
    return { success: false, message: 'Network error' };
  }
};

const handleTerminateSession = (id) => {
  showAlert('confirm', 'Are you sure you want to terminate this session?', 'Terminate', async () => {
    isTerminating.value = true;
    const result = await terminateSession(id);
    isTerminating.value = false;
    if (result && result.success) {
      sessionBack();
    } else {
      setTimeout(() => showAlert('error', result.message || 'Failed to terminate session'), 350);
    }
  });
};
</script>

<style>
.fade-scale-enter-active, .fade-scale-leave-active { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.fade-scale-enter-from, .fade-scale-leave-to { opacity: 0; transform: scale(0.9) translateY(15px); }

@keyframes bounce-short { 0% { transform: scale(0.8); opacity: 0; } 60% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
.animate-bounce-short { animation: bounce-short 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
</style>

<style scoped>
.shake-fade-enter-active { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
.shake-fade-leave-active { transition: all 0.3s ease-in; }
.shake-fade-enter-from, .shake-fade-leave-to { opacity: 0; transform: translateY(-10px); }

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}


</style>
