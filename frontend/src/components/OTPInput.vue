<template>
  <div class="flex items-center justify-center gap-2 sm:gap-3">
    <input 
      v-for="(digit, index) in digits" 
      :key="index"
      :ref="el => inputRefs[index] = el"
      v-model="digits[index]"
      type="text"
      maxlength="1"
      @input="handleInput($event, index)"
      @keydown="handleKeyDown($event, index)"
      @paste="handlePaste($event)"
      :class="[
        'w-10 h-12 sm:w-12 sm:h-14 bg-white dark:bg-slate-800 border-2 rounded-xl text-center text-lg sm:text-xl font-black transition-all outline-none',
        digits[index] ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 shadow-[0_4px_10px_rgba(99,102,241,0.2)]' : 'border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:border-indigo-500 focus:shadow-[0_0_15px_rgba(99,102,241,0.2)]'
      ]"
    />
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue', 'complete']);

const digits = ref(['', '', '', '', '', '']);
const inputRefs = ref([]);

// Sync initial value if provided
watch(() => props.modelValue, (newVal) => {
  if (newVal === '') {
    digits.value = ['', '', '', '', '', ''];
  } else if (newVal.length === 6 && newVal !== digits.value.join('')) {
    digits.value = newVal.split('');
  }
}, { immediate: true });

const emitValue = () => {
  const val = digits.value.join('');
  emit('update:modelValue', val);
  if (val.length === 6) {
    nextTick(() => {
      emit('complete', val);
    });
  }
};

const handleInput = (e, index) => {
  const value = e.target.value;
  // Ensure only numbers
  if (!/^\d$/.test(value)) {
    digits.value[index] = '';
    return;
  }
  
  if (index < 5 && value) {
    inputRefs.value[index + 1].focus();
  }
  
  emitValue();
};

const handleKeyDown = (e, index) => {
  if (e.key === 'Backspace' && !digits.value[index] && index > 0) {
    inputRefs.value[index - 1].focus();
  } else if (e.key === 'ArrowLeft' && index > 0) {
    inputRefs.value[index - 1].focus();
  } else if (e.key === 'ArrowRight' && index < 5) {
    inputRefs.value[index + 1].focus();
  }
};

const handlePaste = (e) => {
  e.preventDefault();
  const pastedData = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);
  if (pastedData) {
    const chars = pastedData.split('');
    for (let i = 0; i < chars.length; i++) {
      digits.value[i] = chars[i];
    }
    // Focus the next empty input, or the last one
    const focusIndex = Math.min(chars.length, 5);
    if (inputRefs.value[focusIndex]) {
       inputRefs.value[focusIndex].focus();
    } else {
       inputRefs.value[5].focus();
    }
    emitValue();
  }
};
</script>
