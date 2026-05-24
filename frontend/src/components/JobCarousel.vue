<template>
  <div class="text-left cursor-default">

    <!-- Loader -->
    <div
      v-if="loading"
      class="flex justify-center items-center min-h-[200px]"
    >
      <Loader class="text-[40px] text-center" />
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Row 1 -->
      <div class="carousel">
        <div class="carousel-track left">
          <div class="flex gap-6">
            <div
              v-for="data in leftJobs"
              :key="data.name"
              class="bg-white rounded-xl shadow-sm border p-4 min-w-[250px]"
            >
              <p
                class="text-[15px] font-semibold text-primary capitalize truncate"
              >
                {{ data.subject }}
              </p>

              <p
                class="text-[14px] text-gray-600 font-medium capitalize truncate"
              >
                {{ data.customer }}
              </p>

              <div
                class="text-[14px] mt-1 text-gray-600 font-medium flex items-center gap-1"
              >
                <img :src="data.custom_country_flag" class="h-5" />
                <p>{{ data.territory }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Row 2 -->
      <div class="carousel mt-6">
        <div class="carousel-track right">
          <div class="flex gap-6">
            <div
              v-for="data in rightJobs"
              :key="data.name"
              class="bg-white rounded-xl shadow-sm border p-4 min-w-[250px]"
            >
              <p
                class="text-[15px] font-semibold text-primary capitalize truncate"
              >
                {{ data.subject }}
              </p>

              <p
                class="text-[14px] text-gray-600 font-medium capitalize truncate"
              >
                {{ data.customer }}
              </p>

              <div
                class="text-[14px] mt-1 text-gray-600 font-medium flex items-center gap-1"
              >
                <img :src="data.custom_country_flag" class="h-5" />
                <p>{{ data.territory }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
// vue
import { ref, computed, onMounted } from 'vue'

// data
import { getJobs } from '@/data/jobs'

// component
import Loader from '@/components/Loader.vue'

// variables
const jobs = ref([])
const loading = ref(true)

const leftJobs = computed(() => jobs.value.slice(0, 10))
const rightJobs = computed(() => jobs.value.slice(10, 20))

onMounted(async () => {
  try {
    const data = await getJobs()
    jobs.value = data
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.carousel {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.carousel-track {
  display: flex;
  align-items: center;
  width: max-content;
  gap: 10px;
}

.carousel-track.left {
  animation: scroll-left 15s linear infinite;
}

.carousel-track.right {
  animation: scroll-right 15s linear infinite;
}

/* LEFT */
@keyframes scroll-left {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

/* RIGHT */
@keyframes scroll-right {
  from {
    transform: translateX(-50%);
  }

  to {
    transform: translateX(0);
  }
}

.carousel::before,
.carousel::after {
  content: "";
  position: absolute;
  top: 0;
  width: 120px;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.carousel::before {
  left: 0;
  background: linear-gradient(to right, #f4f2ee, transparent);
}

.carousel::after {
  right: 0;
  background: linear-gradient(to left, #f4f2ee, transparent);
}
</style>
