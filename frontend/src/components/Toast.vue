<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-2 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-2 scale-95"
  >
    <div
      v-if="show"
      :class="[
        'fixed bottom-10 right-5 z-[9999] min-w-[300px] max-w-[400px] rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-3 backdrop-blur-md',
        toastStyles
      ]"
    >
      <!-- Icon -->
      <div
        :class="[
          'h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
          iconStyles
        ]"
      >
        {{ icon }}
      </div>

      <!-- Content -->
      <div class="flex-1">
        <p class="font-semibold text-[14px]">
          {{ title }}
        </p>

        <p class="text-[13px] font-medium mt-0.5 opacity-80 whitespace-pre-line">
          {{ message }}
        </p>
      </div>

      <!-- Close -->
      <button
        class="text-gray-400 right-5 top-2 absolute hover:text-gray-600 transition"
        @click="closeToast"
      >
        ✕
      </button>
    </div>
  </transition>
</template>

<script setup>
import { computed, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },

  type: {
    type: String,
    default: 'success'
  },

  title: {
    type: String,
    default: 'Success'
  },

  message: {
    type: String,
    default: ''
  },

  duration: {
    type: Number,
    default: 3000
  }
})

const emit = defineEmits(['update:show'])

const toastStyles = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-50 text-green-700'

    case 'error':
      return 'bg-red-50 text-red-700'

    case 'warning':
      return 'bg-yellow-50 text-yellow-700'

    default:
      return 'bg-blue-50 text-blue-700'
  }
})

const iconStyles = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-100 text-green-700'

    case 'error':
      return 'bg-red-100 text-red-700'

    case 'warning':
      return 'bg-yellow-100 text-yellow-700'

    default:
      return 'bg-blue-100 text-blue-700'
  }
})

const icon = computed(() => {
  switch (props.type) {
    case 'success':
      return '✓'

    case 'error':
      return '!'

    case 'warning':
      return '⚠'

    default:
      return 'i'
  }
})

const closeToast = () => {
  emit('update:show', false)
}

watch(
  () => props.show,
  (value) => {
    if (value) {
      setTimeout(() => {
        closeToast()
      }, props.duration)
    }
  }
)
</script>