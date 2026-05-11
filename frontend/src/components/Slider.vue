<!-- components/PriceRangeSlider.vue -->

<template>
  <div class="w-full">
    
    <!-- Header -->
    <div
      v-if="label || showValues"
      class="flex items-center justify-between mb-2"
    >
      <h2
        v-if="label"
        class="text-lg font-medium text-[#98a1a9]"
      >
        {{ label }}
      </h2>

      <p
        v-if="showValues"
        class="text-sm text-[#98a1a9]"
      >
        {{ localMin }} - {{ localMax }}
      </p>
    </div>

    <!-- Slider -->
    <div class="relative h-5">

      <!-- Background Track -->
      <div
        class="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full"
      ></div>

      <!-- Active Track -->
      <div
        class="absolute top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full"
        :style="rangeStyle"
      ></div>

      <!-- Min Slider -->
<input
  type="range"
  v-model="localMin"
  :min="min"
  :max="max"
  :step="step"
  class="slider"
  :class="localMin > max - 100 ? 'z-50' : 'z-30'"
/>

<!-- Max Slider -->
<input
  type="range"
  v-model="localMax"
  :min="min"
  :max="max"
  :step="step"
  class="slider z-40"
/>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue"

const props = defineProps({
  min: {
    type: Number,
    default: 0,
  },

  max: {
    type: Number,
    default: 10000,
  },

  step: {
    type: Number,
    default: 1,
  },

  minValue: {
    type: Number,
    default: 0,
  },

  maxValue: {
    type: Number,
    default: 10000,
  },

  label: {
    type: String,
    default: "",
  },

  showValues: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits([
  "update:minValue",
  "update:maxValue",
  "change",
])

const localMin = ref(props.minValue)
const localMax = ref(props.maxValue)

watch(
  () => props.minValue,
  (val) => {
    localMin.value = val
  }
)

watch(
  () => props.maxValue,
  (val) => {
    localMax.value = val
  }
)

watch(localMin, (val) => {
  if (val > localMax.value - props.step) {
    localMin.value = localMax.value - props.step
  }

  emit("update:minValue", Number(localMin.value))

  emit("change", {
    min: Number(localMin.value),
    max: Number(localMax.value),
  })
})

watch(localMax, (val) => {
  if (val < localMin.value + props.step) {
    localMax.value = localMin.value + props.step
  }

  emit("update:maxValue", Number(localMax.value))

  emit("change", {
    min: Number(localMin.value),
    max: Number(localMax.value),
  })
})

const rangeStyle = computed(() => {
  const left =
    ((localMin.value - props.min) /
      (props.max - props.min)) *
    100

  const width =
    ((localMax.value - localMin.value) /
      (props.max - props.min)) *
    100

  return {
    left: `${left}%`,
    width: `${width}%`,
  }
})
</script>

<style scoped>
.slider {
  position: absolute;
  width: 100%;
  height: 20px;
  background: transparent;
  -webkit-appearance: none;
  pointer-events: none;
}

/* Chrome */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: auto;
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  background: white;
  border: 0;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  box-shadow: 1px 1px 10px 3px rgba(0,0,0,0.08);
}

.slider::-webkit-slider-thumb:hover,
.slider::-webkit-slider-thumb:active {
  box-shadow:
    0 0 0 6px rgba(0,0,0,0.08),
    0 2px 8px rgba(0,0,0,0.15);
}

/* Firefox */
.slider::-moz-range-thumb {
  pointer-events: auto;
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  background: white;
  border: 0;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  box-shadow: 1px 1px 10px 3px rgba(0,0,0,0.08);
}

.slider::-moz-range-thumb:hover,
.slider::-moz-range-thumb:active {
  box-shadow:
    0 0 0 6px rgba(0,0,0,0.08),
    0 2px 8px rgba(0,0,0,0.15);
}
</style>