<template>
  <div class="w-full h-full flex flex-col items-center justify-center relative p-8">
    <div class="text-center animate-fade-in-up max-w-2xl">
      <div class="w-24 h-24 mx-auto mb-8 relative">
        <div class="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full animate-pulse-slow"></div>
        <img src="../assets/DUC.png" class="w-full h-full object-contain drop-shadow-2xl relative z-10" alt="DUC Logo">
      </div>
      
      <h2 class="text-4xl md:text-5xl font-black text-slate-800 dark:text-white tracking-tight mb-4 drop-shadow-sm">
        Welcome to Control Center
      </h2>
      <p class="text-slate-500 dark:text-slate-400 text-lg">
        Select a module from the sidebar to manage university data, track teacher performance, or configure system settings.
      </p>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>