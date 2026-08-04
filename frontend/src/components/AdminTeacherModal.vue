<template>
  <transition name="modal-fade">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        @click="$emit('close')"
      ></div>

      <!-- Modal Content -->
      <div class="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-3xl relative z-10 overflow-hidden transform transition-all border border-slate-200 dark:border-slate-700 flex flex-col max-h-[90vh]">
        
        <!-- Header -->
        <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center shrink-0">
          <h3 class="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <svg v-if="mode === 'edit'" class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            <svg v-else class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            {{ mode === 'add' ? 'Add New Teacher' : 'Edit Teacher Profile' }}
          </h3>
          <button @click="$emit('close')" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 overflow-y-auto custom-scrollbar space-y-6 flex-1">
          
          <!-- Avatar Preview & Edit -->
          <div class="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/30 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div class="relative w-16 h-16 rounded-full border-2 border-indigo-100 dark:border-indigo-900 shadow-sm shrink-0 flex items-center justify-center overflow-hidden bg-slate-100 dark:bg-slate-700">
              <img v-if="editData.avatarUrl || avatarPreview" :src="avatarPreview || editData.avatarUrl" class="w-full h-full object-cover" alt="Avatar">
              <svg v-else class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              <div v-if="isUploading" class="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
                <svg class="w-5 h-5 text-white animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
              </div>
            </div>
            <div class="flex-1">
              <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Upload Avatar</label>
              <div class="relative">
                <input type="file" accept="image/*" @change="handleFileUpload" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" :disabled="isUploading">
                <div class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white flex items-center gap-2 transition-all hover:bg-slate-50 dark:hover:bg-slate-800">
                  <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                  <span class="text-sm truncate">{{ uploadFileName || 'Choose an image file...' }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <!-- Name Kh -->
            <div>
              <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Name (Khmer)</label>
              <input v-model="editData.nameKh" type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="ឈ្មោះ...">
            </div>
            <!-- Name En -->
            <div>
              <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Name (English)</label>
              <input v-model="editData.nameEn" type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="English name...">
            </div>
            <!-- Gender -->
            <div>
              <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Gender</label>
              <div class="relative">
                <select v-model="editData.gender" class="w-full px-4 py-2.5 pr-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer">
                  <option value="" disabled>Select Gender...</option>
                  <option value="ប្រុស">ប្រុស</option>
                  <option value="ស្រី">ស្រី</option>
                </select>
                <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
            <!-- DOB -->
            <div>
              <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Date of Birth</label>
              <input v-model="editData.dob" type="date" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
            </div>
            <!-- Phone -->
            <div>
              <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Phone</label>
              <input v-model="editData.phone" type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Phone number...">
            </div>
            <!-- Email -->
            <div>
              <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Email</label>
              <input v-model="editData.email" type="email" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Email address...">
            </div>
            <!-- Role -->
            <div class="md:col-span-2">
              <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Role / Position</label>
              <input v-model="editData.role" type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="តួនាទី...">
            </div>
            <!-- Degree -->
            <div>
              <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Degree</label>
              <input v-model="editData.degree" type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Degree...">
            </div>
            <!-- Major -->
            <div>
              <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">ជំនាញ (Major)</label>
              <input v-model="editData.major" type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Major...">
            </div>
            <!-- Role (Column G) -->
            <div>
              <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">តួនាទី (Role)</label>
              <div class="relative">
                <input list="role-options" v-model="editData.classGrade" type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Select or type role...">
                <datalist id="role-options">
                  <option value="បុគ្គលិក">បុគ្គលិក (Staff)</option>
                  <option value="គ្រូបង្រៀន">គ្រូបង្រៀន (Teacher)</option>
                  <option value="គណៈគ្រប់គ្រង">គណៈគ្រប់គ្រង (Management)</option>
                  <option value="គ្រូ Part time">គ្រូ Part time</option>
                </datalist>
              </div>
            </div>
            <!-- Join Date -->
            <div>
              <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Join Date</label>
              <input v-model="editData.joinDate" type="date" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
            </div>
            <!-- Password -->
            <div>
              <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Password</label>
              <input v-model="editData.password" type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="DUC_Teacher_2026">
            </div>
            <!-- Certificate Number -->
            <div>
              <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Certificate Number</label>
              <input v-model="editData.cerNumber" type="text" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Certificate No...">
            </div>
          </div>

          <!-- Block Toggle -->
          <div class="flex items-center justify-between p-4 rounded-xl border mt-2" :class="editData.isBlocked ? 'bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-900/50' : 'bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700'">
            <div>
              <p class="font-bold text-sm" :class="editData.isBlocked ? 'text-rose-700 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'">Block Account</p>
              <p class="text-xs" :class="editData.isBlocked ? 'text-rose-600/70 dark:text-rose-400/70' : 'text-slate-500'">Prevent this teacher from logging in.</p>
            </div>
            
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="editData.isBlocked" class="sr-only peer">
              <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 dark:peer-focus:ring-rose-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-rose-600"></div>
            </label>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3 shrink-0">
          <button 
            @click="$emit('close')"
            class="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button 
            @click="handleSave"
            :disabled="isUploading"
            class="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue';

const isUploading = ref(false);
const avatarPreview = ref(null);
const uploadFileName = ref('');

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  teacher: { type: Object, default: () => ({}) },
  mode: { type: String, default: 'edit' }
});

const emit = defineEmits(['close', 'save']);

const editData = ref({
  nameKh: '',
  nameEn: '',
  gender: '',
  dob: '',
  phone: '',
  email: '',
  role: '',
  degree: '',
  major: '',
  classGrade: '',
  joinDate: '',
  avatarUrl: '',
  password: 'DUC_Teacher_2026',
  cerNumber: '',
  isBlocked: false
});

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.mode === 'add') {
      editData.value = {
        nameKh: '', nameEn: '', gender: '', dob: '', phone: '', email: '', role: '', degree: '', major: '', classGrade: '', joinDate: '', avatarUrl: '', password: 'DUC_Teacher_2026', cerNumber: '', isBlocked: false
      };
    } else if (props.teacher) {
      editData.value = {
        nameKh: props.teacher.nameKh || '',
        nameEn: props.teacher.nameEn || '',
        gender: props.teacher.gender || '',
        dob: props.teacher.dob || '',
        phone: props.teacher.phone || '',
        email: props.teacher.email || '',
        role: props.teacher.role || '',
        degree: props.teacher.degree || '',
        major: props.teacher.major || '',
        classGrade: props.teacher.classGrade || '',
        joinDate: props.teacher.joinDate || '',
        avatarUrl: props.teacher.avatarUrl || '',
        password: props.teacher.password || '',
        cerNumber: props.teacher.cerNumber || '',
        isBlocked: props.teacher.isBlocked === true
      };
    }
    
    // Reset local upload states when modal opens
    avatarPreview.value = null;
    uploadFileName.value = '';
    isUploading.value = false;
  }
});

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  uploadFileName.value = file.name;
  avatarPreview.value = URL.createObjectURL(file);
  isUploading.value = true;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'duc_avatar_upload');

  try {
    const res = await fetch('https://api.cloudinary.com/v1_1/dsruankj0/image/upload', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    if (data.secure_url) {
      editData.value.avatarUrl = data.secure_url;
    } else {
      console.error('Cloudinary upload failed', data);
      alert('Failed to upload image to Cloudinary.');
    }
  } catch (err) {
    console.error('Error uploading to Cloudinary:', err);
    alert('Network error while uploading image.');
  } finally {
    isUploading.value = false;
  }
};

const handleSave = () => {
  if (props.mode === 'add') {
    emit('save', { ...editData.value });
  } else {
    emit('save', {
      rowIndex: props.teacher.rowIndex,
      ...editData.value
    });
  }
};
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active .bg-white,
.modal-fade-leave-active .bg-white {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-fade-enter-from .bg-white,
.modal-fade-leave-to .bg-white {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
/* For custom scrollbar in modal body if needed */
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; }
</style>
