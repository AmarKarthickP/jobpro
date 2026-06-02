<template>
  <div
    :class="[
      route.path.startsWith('/refer')
        ? 'bg-white'
        : 'bg-background',
      'min-h-screen'
    ]"
  >
    <router-view />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style>
div {
  font-family: "Poppins";
}

.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>