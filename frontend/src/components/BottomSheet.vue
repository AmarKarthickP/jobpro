<template>
  <!-- Overlay -->
  <transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 bg-background/20 backdrop-blur-[0.25rem] z-40"
      @click="close"
    />
  </transition>


  <!-- Sheet -->
  <transition name="slide-up">
    <div
      v-if="modelValue"
      class="
        fixed bottom-0 left-0 right-0
        bg-white
        rounded-t-3xl
        z-50
        p-5
        shadow-[0_-10px_30px_rgba(0,0,0,0.05)]
        overflow-y-auto
      "
    >
      <!-- Handle -->
      <div class="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-5"></div>


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


      <!-- Dynamic Content -->
      <slot />
      
      <button @click="close" class="text-primary rounded-lg py-1.5 w-full text-lg font-medium">
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
    type: String,
    default: "Filters"
  }
})


const emit = defineEmits([
  "update:modelValue"
])


const close = () => {
  emit("update:modelValue", false)
}


// Lock background scroll
watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }
)


// Safety cleanup
onUnmounted(() => {
  document.body.style.overflow = ""
})
</script>


<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>