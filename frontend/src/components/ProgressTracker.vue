<!-- ProgressTracker.vue -->

<script setup>
import { computed, ref } from 'vue'
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

const selectedFilter = ref('Overview')

const filters = [
  'Overview',
  'Completed',
  'Pending',
]

const filteredStatuses = computed(() => {

  switch (selectedFilter.value) {

    case 'Completed':
      return props.statuses.filter(
        row => row.state === 'completed'
      )

    case 'Pending':
      return props.statuses.filter(
        row =>
          row.state === 'current' ||
          row.state === 'pending'
      )

    default:
      return visibleStatuses.value
  }
})

const getStatusClasses = (status) => {
  switch (status.state) {

    case 'completed':
      return {
        card: 'bg-green-50',
        text: 'text-green-600',
        icon: 'bg-green-600',
      }

    case 'current':
      return {
        card: 'bg-blue-50',
        text: 'text-highlight',
        icon: 'border-2 border-highlight bg-white',
      }

    case 'failed':
      return {
        card: 'bg-red-50',
        text: 'text-red-600',
        icon: 'bg-red-600',
      }

    default:
      return {
        card: 'bg-background',
        text: 'text-gray-600',
        icon: 'bg-white ring-2 ring-gray-200',
      }
  }
}

const getLineClass = (current, next) => {

  if (!next) {
    return 'bg-transparent'
  }

  if (next.state === 'failed') {
    return 'bg-red-300'
  }

  if (
    current.state === 'completed' &&
    (
      next.state === 'completed' ||
      next.state === 'current'
    )
  ) {
    return 'bg-green-500'
  }

  return 'bg-gray-300'
}

const visibleStatuses = computed(() => {

  const currentIndex = props.statuses.findIndex(
    row =>
      row.state === 'current' ||
      row.state === 'failed'
  )

  if (currentIndex === -1) {

    const lastCompletedIndex = props.statuses
      .map((row, index) =>
        row.state === 'completed' ? index : -1
      )
      .filter(index => index !== -1)
      .at(-1)

    return props.statuses.slice(
      Math.max((lastCompletedIndex ?? 0) - 1, 0),
      (lastCompletedIndex ?? 0) + 2
    )
  }

  return props.statuses.slice(
    Math.max(currentIndex - 1, 0),
    currentIndex + 2
  )
})
</script>

<template>
  <div class="rounded-xl shadow-sm bg-primary overflow-hidden">

    <!-- Header -->
    <div class="px-5 py-3">
      <h1 class="text-white font-semibold text-[17px]">
        {{ title }}
      </h1>
    </div>

    <!-- Body -->
    <div
      class="bg-white rounded-t-lg px-5 py-4 max-h-[450px] overflow-y-auto hide-scrollbar"
    >
      <!-- Filters -->
<div class="flex flex-wrap items-center gap-2 mb-5">

  <button
    v-for="filter in filters"
    :key="filter"
    @click="selectedFilter = filter"
    class="px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 border"
    :class="selectedFilter === filter
      ? 'bg-primary text-white border-primary shadow-sm'
      : 'bg-white text-default border-gray-200 hover:border-primary hover:text-primary'"
  >
    {{ filter }}
  </button>

</div>
      <div
        v-for="(status, index) in filteredStatuses"
        :key="index"
        class="relative flex items-start gap-4"
        :class="index !== filteredStatuses.length - 1 ? 'pb-5' : ''"
      >

        <!-- Timeline Line -->
        <div
          v-if="index !== filteredStatuses.length - 1"
          class="absolute left-[14px] top-7 h-full w-[2px]"
          :class="getLineClass(status, filteredStatuses[index + 1])"
        ></div>

        <!-- Timeline Icon -->
        <div
          class="z-10 h-7 w-7 rounded-full flex items-center justify-center shrink-0 overflow-visible transition-all duration-300"
          :class="getStatusClasses(status).icon"
        >

          <!-- Completed -->
          <template v-if="status.state === 'completed'">
            <SuccessIcon class="h-4 w-4 text-white" />
          </template>

          <!-- Current -->
          <template v-else-if="status.state === 'current'">

            <div class="relative flex items-center justify-center">

              <!-- Ping -->
              <div
                class="absolute h-3 w-3 rounded-full bg-highlight animate-ping"
              ></div>

              <!-- Dot -->
              <div
                class="h-3 w-3 rounded-full bg-highlight"
              ></div>

            </div>

          </template>

          <!-- Failed -->
          <template v-else-if="status.state === 'failed'">
            <CloseIcon class="h-4 w-4 text-white" />
          </template>

        </div>

        <!-- Content Card -->
        <div
          class="flex-1 rounded-lg px-4 py-2 transition-all duration-300 hover:shadow-sm"
          :class="getStatusClasses(status).card"
        >

          <!-- Header Row -->
          <div
            class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3"
          >

            <!-- Label -->
            <p
              class="font-medium text-[13px]"
              :class="getStatusClasses(status).text"
            >
              {{ status.label }}
            </p>

            <!-- Datetime -->
            <p
              v-if="status.datetime"
              class="sm:ml-auto text-default text-[11px] sm:text-[12px] font-medium shrink-0"
              :class="status.state === 'failed'
                ? 'text-red-500'
                : 'text-default'"
            >
              {{ status.datetime }}
            </p>

          </div>

          <!-- Remarks -->
          <div
            v-if="status.remarks"
            class="mt-1.5 border-t border-black/5 pt-1.5"
          >

            <p
              class="text-[11px]"
              :class="status.state === 'failed'
                ? 'font-medium text-red-500'
                : 'font-medium text-default'"
            >
              {{ status.remarks }}
            </p>

          </div>

        </div>

      </div>

    </div>
  </div>
</template>