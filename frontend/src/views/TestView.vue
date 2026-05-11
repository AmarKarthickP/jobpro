<template>
  <Slider class="w-[200px]"
    label="Amount"
    :min="0"
    :max="10000"
    :step="1"
    v-model:minValue="minPrice"
    v-model:maxValue="maxPrice"
  />
  <Loader />
</template>

<script setup>
import { ref } from "vue"
import Slider from "@/components/Slider.vue"
import Loader from "../components/Loader.vue";

const minPrice = ref(10)
const maxPrice = ref(60)
</script>