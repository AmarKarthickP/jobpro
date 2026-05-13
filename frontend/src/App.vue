<template>
  <div class="bg-background min-h-[100vh]">
    <router-view />
  </div>
</template>

<style>
div {
    font-family: "Poppins";
}
.hide-scrollbar {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and old Edge */
}
.hide-scrollbar::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
}
</style>