import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '../views/AdminView.vue'
import LoginView from '../views/LoginView.vue'
import TeacherView from '../views/TeacherView.vue'
import SettingsView from '../views/SettingsView.vue'
import ClassTrackingView from '../views/ClassTrackingView.vue'
import ClassHistoryView from '../views/ClassHistoryView.vue'
import EditLessonView from '../views/EditLessonView.vue'
import ProfileView from '../views/ProfileView.vue'
import SystemMappingsView from '../views/SystemMappingsView.vue';
import AdminTrackingCenterView from '../views/AdminTrackingCenterView.vue';
import AdminSettingsView from '../views/AdminSettingsView.vue';

const routes = [
  { 
    path: '/', 
    redirect: '/login' 
  },
  { 
    path: '/login', 
    name: 'Login',
    component: LoginView 
  },
  // 🔥 NEW: Hidden Admin Login Route
  { 
    path: '/admin/login', 
    name: 'AdminLogin',
    component: LoginView 
  },

  // ==========================================
  // TEACHER ROUTES
  // ==========================================
  { 
    path: '/schedule', 
    name: 'TeacherSchedule',
    component: TeacherView,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/settings', 
    name: 'TeacherSettings',
    component: SettingsView,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/tracking', 
    name: 'ClassTracking',
    component: ClassTrackingView,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/history', 
    name: 'ClassHistory',
    component: ClassHistoryView,
    meta: { requiresAuth: true } 
  },
  {
    path: '/edit-lesson',
    name: 'edit-lesson',
    component: EditLessonView,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: { requiresAuth: true }
  },

  // ==========================================
  // ADMIN ROUTES (Protected by requiresAdmin)
  // ==========================================
  { 
    path: '/admin', 
    name: 'AdminDashboard',
    component: AdminView,
    meta: { requiresAdmin: true } 
  },
  {
    path: '/admin/system-mappings',
    name: 'admin-system-mappings',
    component: SystemMappingsView,
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/tracking',
    name: 'admin-tracking',
    component: AdminTrackingCenterView,
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/settings',
    name: 'admin-settings',
    component: AdminSettingsView,
    meta: { requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// SECURITY GUARD: Route users to the correct login page
router.beforeEach((to, from, next) => {
  const isTeacherAuth = localStorage.getItem('duc_teacher_token');
  const isAdminAuth = localStorage.getItem('duc_admin_token');
  
  if (to.meta.requiresAdmin && !isAdminAuth) {
    next('/admin/login'); // Kick admins to admin login
  } else if (to.meta.requiresAuth && !isTeacherAuth) {
    next('/login'); // Kick teachers to teacher login
  } else if (to.path === '/login' && isTeacherAuth) {
    next('/schedule'); // Teacher already logged in
  } else if (to.path === '/admin/login' && isAdminAuth) {
    next('/admin'); // Admin already logged in
  } else {
    next();
  }
})

export default router