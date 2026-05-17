<!-- ProgressTracker.vue -->

<script setup>
import { computed } from 'vue'
import SuccessIcon from './icons/SuccessIcon.vue'
import CloseIcon from './icons/CloseIcon.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Progress',
  },

  statuses: {
    type: Array,
    default: () => [],
  },
})

const getStatusStyles = (status) => {
  switch (status.state) {
    case 'completed':
      return {
        line: 'bg-green-500',
        card: 'bg-green-50',
        text: 'text-green-600',
        icon: 'bg-green-600',
      }

    case 'current':
      return {
        line: 'bg-highlight/30',
        card: 'bg-blue-50',
        text: 'text-highlight',
        icon: 'border-2 border-highlight bg-white',
      }

    case 'failed':
      return {
        line: 'bg-red-300',
        card: 'bg-red-50',
        text: 'text-red-600',
        icon: 'bg-red-600',
      }

    default:
      return {
        line: 'bg-gray-300',
        card: 'bg-background',
        text: 'text-gray-600',
        icon: 'border-2 border-gray-300 bg-white',
      }
  }
}
</script>

<template>
  <div class="rounded-lg shadow-sm bg-primary">
    
    <!-- Header -->
    <h1 class="text-white font-medium text-[17px] px-5 pt-3 pb-2">
      {{ title }}
    </h1>

    <!-- Body -->
    <div
      class="bg-white rounded-lg px-5 py-4 max-h-[450px] overflow-y-auto hide-scrollbar"
    >
      <div
        v-for="(status, index) in statuses"
        :key="index"
        class="relative flex items-start gap-4"
        :class="index !== statuses.length - 1 ? 'pb-5' : ''"
      >

        <!-- Line -->
        <div
          v-if="index !== statuses.length - 1"
          class="absolute left-[14px] top-7 h-full w-[2px]"
          :class="getStatusStyles(status).line"
        ></div>

        <!-- Icon -->
        <div
          class="z-10 h-7 w-7 rounded-full flex items-center justify-center shrink-0"
          :class="getStatusStyles(status).icon"
        >

          <!-- Completed -->
          <template v-if="status.state === 'completed'">
            <success-icon class="h-4 w-4 text-white" />
          </template>

          <!-- Current -->
          <template v-else-if="status.state === 'current'">
            <div
              class="h-3 w-3 rounded-full bg-highlight animate-pulse"
            ></div>
          </template>

          <!-- Failed -->
          <template v-else-if="status.state === 'failed'">
            <close-icon class="h-4 w-4 text-white" />
          </template>

        </div>

        <!-- Content -->
        <div
          class="flex-1 rounded-lg px-4 py-2"
          :class="getStatusStyles(status).card"
        >
          <div class="flex items-center gap-3">

            <p
              class="font-medium text-[13px]"
              :class="getStatusStyles(status).text"
            >
              {{ status.label }}
            </p>

            <p
              v-if="status.datetime"
              class="ml-auto text-default text-[12px] font-medium"
            >
              {{ status.datetime }}
            </p>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>