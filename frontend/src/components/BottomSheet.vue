<template>
  <!-- Overlay -->
  <transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 bg-background/20 backdrop-blur-[0.25rem] z-40"
      @click="close"
    />
  </transition>

  <!-- Bottom Sheet -->
  <transition name="bottom-sheet">
    <div
      v-if="modelValue"
      class="
        fixed bottom-0 left-0 right-0
        bg-white rounded-t-3xl
        z-50 p-5
        shadow-[0_-10px_30px_rgba(0,0,0,0.05)]
        overflow-y-auto
        transform-gpu
        will-change-transform
      "
    >

      <!-- Header -->
      <div class="flex justify-center items-center mb-5">
        <h2 class="text-[15px] font-semibold text-primary">
          <span class="text-highlight">
            {{ title }}
            <span v-if="title > 1">Jobs</span>
            <span v-else>Job</span>
          </span>
          Available Now
        </h2>
      </div>

      <slot />

      <button
        @click="close"
        class="text-primary rounded-lg py-1.5 w-full text-lg font-medium"
      >
        Close
      </button>
    </div>
  </transition>
</template>

<script setup>
import { watch, onUnmounted } from "vue"

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: [String, Number],
    default: "Filters"
  }
})

const emit = defineEmits([
  "update:modelValue"
])

const close = () => {
  emit("update:modelValue", false)
}

watch(
  () => props.modelValue,
  (value) => {
    document.body.style.overflow = value ? "hidden" : ""
  }
)

onUnmounted(() => {
  document.body.style.overflow = ""
})
</script>

<style scoped>
/* Overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 250ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Bottom Sheet */
.bottom-sheet-enter-active {
  transition: transform 350ms cubic-bezier(0.22, 1, 0.36, 1);
}

.bottom-sheet-leave-active {
  transition: transform 280ms cubic-bezier(0.4, 0, 1, 1);
}

.bottom-sheet-enter-from,
.bottom-sheet-leave-to {
  transform: translate3d(0, 100%, 0);
}

.bottom-sheet-enter-to,
.bottom-sheet-leave-from {
  transform: translate3d(0, 0, 0);
}
</style>