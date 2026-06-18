<template>
  <component :is="layoutComponent">
    
    <router-view v-slot="{ Component }">
      <transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

  </component>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from './components/MainLayout.vue';

const route = useRoute();

const layoutComponent = computed(() => {
  // Hide the teacher navbar for login pages
  if (route.path.includes('/login') || route.name === 'login') {
    return 'div';
  }

  // 🔥 FIX: Hide the navbar for the entire admin section 
  // AND hide it if the admin is viewing a shared page (like History) using ?admin=true
  if (route.path.includes('/admin') || route.query.admin === 'true') {
    return 'div';
  }

  // Standard teacher pages use MainLayout
  return MainLayout;
});
</script>
<style>
/* 🔥 FIX: Sped up transitions so clicks feel instant and responsive! */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.15s ease-out, transform 0.15s ease-out;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Base styles for standardizing scrollbars across the app */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.dark ::-webkit-scrollbar-thumb { background: #475569; }
</style>