<template>
  <Transition
    enter-active-class="transition-all duration-300"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-300"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <button
      v-if="showButton"
      @click="scrollToTop"
      class="fixed bottom-20 right-10 md:bottom-6 md:right-6 z-50 bg-primary text-white rounded-xl p-3 shadow-lg transition-all duration-300 ease-in-out"
    >
      <RightIcon class="text-white h-4 w-4 -rotate-90" />
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import RightIcon from "./icons/RightIcon.vue";

const showButton = ref(false);

const handleScroll = () => {
  showButton.value = window.scrollY > 500;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
```
