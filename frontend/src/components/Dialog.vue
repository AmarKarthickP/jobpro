<!-- components/Dialog.vue -->

<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center bg-whitesmoke/20 backdrop-blur-sm px-4"
        @click.self="closeDialog"
      >
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-2"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-2"
        >
          <div
            v-if="modelValue"
            :class="[
              'bg-white w-full rounded-2xl shadow-2xl overflow-hidden',
              width
            ]"
          >
            <!-- Header -->
            <div
              class="flex items-center justify-between px-6 py-4 border-b"
            >
              <h2 class="text-xl font-semibold text-primary">
                {{ title }}
              </h2>

              <button
                class="text-gray-400 hover:text-gray-600 transition"
                @click="closeDialog"
              >
                ✕
              </button>
            </div>

            <!-- Body -->
            <div class="p-6">
              <slot />
            </div>

            <!-- Footer -->
            <div
              v-if="$slots.footer"
              class="flex justify-end gap-3 px-6 py-4 border-t"
            >
              <slot name="footer" />
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>
<script setup>
import { onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },

  title: {
    type: String,
    default: 'Dialog'
  },

  width: {
    type: String,
    default: 'max-w-2xl'
  }
})

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})

const emit = defineEmits(['update:modelValue'])

const closeDialog = () => {
  emit('update:modelValue', false)
}
</script>