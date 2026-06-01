<template>
  <div class="relative overflow-hidden">
    <!-- Page Content -->
    <div
      :class="[
        'min-h-screen transition-transform duration-300 ease-in-out',
        modelValue ? `-${translateClass}` : '',
      ]"
    >
      <slot name="content" />
    </div>

    <!-- Menu -->
    <aside
      :class="[
        'fixed top-0 right-0 h-full bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out',
        width,
        modelValue ? 'translate-x-0' : 'translate-x-full',
      ]"
    >
      <slot name="menu" />
    </aside>

    <!-- Overlay -->
    <transition name="fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-40"
        @click="close"
      />
    </transition>
  </div>
</template>

<script setup>
import { watch, onUnmounted } from "vue";

const props = defineProps({
  modelValue: Boolean,
  width: {
    type: String,
    default: "w-72",
  },
  translateClass: {
    type: String,
    default: "translate-x-72",
  },
});

const emit = defineEmits(["update:modelValue"]);

const close = () => {
  emit("update:modelValue", false);
};

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>