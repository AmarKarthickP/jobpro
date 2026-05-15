<template>
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      class="fixed inset-0 z-[9999] bg-background/30 backdrop-blur-[2px] flex items-center justify-center"
    >
      <div
        class="px-6 py-4 rounded-2xl flex items-center gap-3"
      >
        <Loader class="text-[40px]" />

        <!-- <div>
          <p class="text-sm font-semibold text-primary">
            {{ title }}
          </p>

          <p
            v-if="message"
            class="text-[13px] text-gray-500 mt-0.5"
          >
            {{ message }}
          </p>
        </div> -->
      </div>
    </div>
  </transition>
</template>

<script setup>
import Loader from './Loader.vue'

defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Saving...'
  },
  message: {
    type: String,
    default: ''
  }
})
</script>