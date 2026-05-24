<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-8">
      <div class="rounded-lg shadow-sm px-5 pt-3 pb-3 bg-white">
        <div class="flex items-center">
          <div class="flex items-center relative">
            <search-icon
              class="h-5 w-5 text-gray text-primary absolute left-2.5"
            />
            <div>
              <input
                type="text"
                placeholder="Search position"
                v-model="position"
                @focus="showPositionSuggestions = true"
                @blur="hidePositionSuggestions"
                class="bg-background w-full border-0 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 pr-2 pl-10 py-1 transition-all duration-300 ease-in-out"
              />
              <div
                v-if="showPositionSuggestions && filteredPositionOptions.length"
                class="absolute z-50 mt-2 max-h-[200px] hide-scrollbar overflow-y-auto w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
              >
                <div
                  v-for="option in filteredPositionOptions"
                  :key="option"
                  @mousedown="selectPositionOption(option)"
                  class="px-3 py-1 text-[13px] text-gray-700 cursor-pointer hover:bg-gray-100 transition-all duration-200"
                >
                  {{ option }}
                </div>
              </div>
            </div>
          </div>
          <div class="relative">
            <input
              type="text"
              placeholder="Job ID"
              v-model="jobId"
              @focus="showJobIdSuggestions = true"
              @blur="hideJobIdSuggestions"
              class="bg-background ml-3 w-[130px] border-0 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 pr-2 pl-4 py-1 transition-all duration-300 ease-in-out"
            />

            <div
              v-if="showJobIdSuggestions && filteredJobIdOptions.length"
              class="absolute z-50 mt-2 max-h-[200px] hide-scrollbar overflow-y-auto left-[5%] w-[133px] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              <div
                v-for="option in filteredJobIdOptions"
                :key="option"
                @mousedown="selectJobIdOption(option)"
                class="px-3 py-1 text-[13px] text-gray-700 cursor-pointer hover:bg-gray-100 transition-all duration-200"
              >
                {{ option }}
              </div>
            </div>
          </div>
          <div class="relative">
            <input
              type="text"
              placeholder="Status"
              v-model="status"
              @focus="showStatusSuggestions = true"
              @blur="hideStatusSuggestions"
              class="bg-background ml-3 w-[200px] border-0 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 pr-2 pl-4 py-1 transition-all duration-300 ease-in-out"
            />
            <div
              v-if="showStatusSuggestions && filteredStatusOptions.length"
              class="absolute z-50 mt-2 max-h-[200px] hide-scrollbar overflow-y-auto left-[5%] w-[203px] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              <div
                v-for="option in filteredStatusOptions"
                :key="option"
                @mousedown="selectStatusOption(option)"
                class="px-3 py-1 text-[13px] text-gray-700 cursor-pointer hover:bg-gray-100 transition-all duration-200"
              >
                {{ option }}
              </div>
            </div>
          </div>

          <p class="font-medium ml-auto text-lg text-red-600">
            Showing {{ animatedJobsCount }} jobs
          </p>
        </div>
        <div class="border-t border-gray-300 my-2"></div>
        <div class="flex flex-wrap items-center gap-5 justify-center relative">
          <button
            v-for="item in [
              { label: 'Applied On', value: 'applied_on' },
              { label: 'Openings', value: 'vac' },
              { label: 'Salary', value: 'amount' },
              { label: 'Experience', value: 'total_experience' }
            ]"
            :key="item.value"
            @click="handleSort(item.value)"
            :class="[
                    sortBy === item.value
                        ? 'text-primary bg-hoverbg'
                        : 'text-gray-600',
                    'px-5 py-1.5 text-lg flex items-center gap-3 rounded-md font-medium hover:bg-hoverbg transition-all duration-300 ease-in-out'
                ]"
          >
            {{ item.label }}

            <div class="flex">
              <up-arrow-icon
                v-if="
                            sortBy === item.value &&
                            sortOrder === 'asc'
                        "
                class="h-5 w-5"
              />

              <down-arrow-icon v-else class="h-5 w-5" />
            </div>
          </button>

          <div class="relative w-5 h-5 ml-2">
            <transition
              mode="out-in"
              enter-active-class="transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-200 ease-in-out absolute"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <list-view-icon
                v-if="view === 'grid'"
                key="list"
                @click="view = 'list'"
                class="h-5 w-5 text-primary cursor-pointer"
              />

              <grid-view-icon
                v-else
                key="grid"
                @click="view = 'grid'"
                class="h-5 w-5 text-primary cursor-pointer"
              />
            </transition>
          </div>
        </div>
      </div>
      <div v-if="isLoading" class="flex items-center justify-center mt-5">
        <loader class="text-[40px]" />
      </div>
      <div
        v-else-if="appliedJobs.length === 0"
        class="flex items-center justify-center mt-10"
      >
        <p class="text-gray-500 font-medium">No applied jobs found</p>
      </div>
      <TransitionGroup
        tag="div"
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 translate-y-4 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition-all duration-400 ease-in-out"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
        move-class="transition-all duration-500 ease-in-out"
        :class="view == 'grid'
        ? 'grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 mb-10'
        : 'flex flex-col gap-5 mt-5 mb-10'"
      >
        <div
          v-for="job in filteredAndSortedJobs"
          :key="job.name"
          @click="selectedJob = job"
          class="cursor-pointer rounded-xl transition-all duration-300"
          :class="[
    selectedJob?.name === job.name
      ? 'scale-[1.01]'
      : 'hover:scale-[1.005]'
  ]"
        >
          <job-card
            :data="job"
            :view="view"
            :selected="selectedJob?.name === job.name"
            page="Activity"
          />
        </div>
      </TransitionGroup>
    </div>
    <div class="col-span-4">
      <div class="sticky top-20">
      <div class="rounded-lg shadow-sm px-5 pt-2.5 pb-3 bg-white">
        <p class="text-primary font-semibold capitalize truncate text-[17px]">
          {{ selectedJob?.subject || 'Select a Job' }}
        </p>
        <p
          class="text-gray-600 font-medium text-[15px] capitalize truncate mt-1"
        >
          {{ selectedJob?.customer }} &nbsp;
        </p>
        <div
          class="text-[15px] mt-2 text-gray-600 font-medium flex items-center gap-1"
        >
          <img :src="selectedJob?.custom_country_flag" class="h-5" />
          <p>{{ selectedJob?.territory}}&nbsp;</p>
        </div>
      </div>
      <div class="mt-10 cursor-default">
        <div
          v-if="isStatusLoading"
          class="bg-white rounded-xl p-10 flex justify-center items-center shadow-sm"
        >
          <Loader class="text-[35px]" />
        </div>

        <ProgressTracker v-else title="Application Status" :statuses="statuses" />
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Vue
import { ref, watch, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Data
import { user } from '../data/user'
import { getCandidate, getCandidateStatuses } from '../data/candidate'
import { getAppliedJobs } from '../data/jobs'

// Icons
import UpArrowIcon from '@/components/icons/UpArrowIcon.vue'
import DownArrowIcon from '@/components/icons/DownArrowIcon.vue'
import DownIcon from '@/components/icons/DownIcon.vue'
import RightIcon from '../components/icons/RightIcon.vue'
import LeftIcon from '../components/icons/LeftIcon.vue'
import ListViewIcon from '../components/icons/ListViewIcon.vue'
import GridViewIcon from '../components/icons/GridViewIcon.vue'
import SearchIcon from '../components/icons/SearchIcon.vue'
import SuccessIcon from '../components/icons/SuccessIcon.vue'

// Component
import JobCard from '../components/JobCard.vue'
import Loader from '../components/Loader.vue'
import ProgressTracker from '@/components/ProgressTracker.vue'

// States
const isLoading = ref(false)
const route = useRoute()

// Variables
const view = ref('grid')
const animatedJobsCount = ref(0)
const candidate = ref({})
const appliedJobs = ref([])

// Fields
const status = ref('')
const position = ref('')
const jobId = ref('')

// Progress Tracker
const statuses = ref([])
const selectedJob = ref(null)
const isStatusLoading = ref(false)

// Options
const statusOptions = [
  "IDB", "Sourced", "Pending QC", "Submit(SPOC)", "Submitted(Client)", "Shortlisted",
  "Linedup", "Linedup Confirmed", "Reported", "Interviewed", "Proposed PSL", "Result Pending"
]

// Dynamic Options
const positionOptions = computed(() => {
    const subjects = appliedJobs.value.map(job => job.subject)
    return [...new Set(subjects)]
})
const jobIdOptions = computed(() => {
    const subjects = appliedJobs.value.map(job => job.name)
    return [...new Set(subjects)]
})

// Suggestion
const showStatusSuggestions = ref(false)
const showPositionSuggestions = ref(false)
const showJobIdSuggestions = ref(false)

// Sorting
const sortBy = ref('applied_on')
const sortOrder = ref('desc')

// Status
function selectStatusOption(option) {
    selectOption(
        status,
        option,
        showStatusSuggestions
    )
}
function hideStatusSuggestions() {
    hideSuggestions(
        status,
        statusOptions,
        showStatusSuggestions
    )
}
// Position
function selectPositionOption(option) {
    selectOption(
        position,
        option,
        showPositionSuggestions
    )
}
function hidePositionSuggestions() {
    hideSuggestions(
        position,
        positionOptions,
        showPositionSuggestions
    )
}

// Job ID
function selectJobIdOption(option) {
    selectOption(
        jobId,
        option,
        showJobIdSuggestions
    )
}
function hideJobIdSuggestions() {
    hideSuggestions(
        jobId,
        jobIdOptions,
        showJobIdSuggestions
    )
}

// Filtered Suggestions
const filteredStatusOptions =
    createFilteredOptions(statusOptions, status)
const filteredPositionOptions =
    createFilteredOptions(positionOptions, position)
const filteredJobIdOptions =
    createFilteredOptions(jobIdOptions, jobId)

// Reusable Select Helper
function selectOption(model, value, showRef) {
    model.value = value
    showRef.value = false
}

// Reusable Hide Helper
function hideSuggestions(model, options, showRef) {

    setTimeout(() => {

        const validOption = (options.value || options).find(
            option =>
                option.toLowerCase().trim() ===
                model.value.toLowerCase().trim()
        )

        if (validOption) {
            model.value = validOption
        }

        showRef.value = false

    }, 100)

}

// Reusable Filter Helper
function createFilteredOptions(options, model) {

    return computed(() => {

        if (!model.value) {
            return options.value || options
        }

        return (options.value || options).filter(option =>
            option.toLowerCase().includes(
                model.value.toLowerCase()
            )
        )

    })

}
// Animates the no of jobs from 0 to x
function animateCounter(target) {

    const duration = 500
    const start = animatedJobsCount.value
    const startTime = performance.now()

    function update(currentTime) {

        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        animatedJobsCount.value = Math.floor(
            start + (target - start) * progress
        )

        if (progress < 1) {
            requestAnimationFrame(update)
        }

    }

    requestAnimationFrame(update)

}

const filteredAndSortedJobs = computed(() => {

    let jobs = [...appliedJobs.value]

    // Filter by status
    if (status.value) {
        jobs = jobs.filter(job =>
            job.status?.toLowerCase().includes(
                status.value.toLowerCase()
            )
        )
    }

    // Filter by position
    if (position.value) {
        jobs = jobs.filter(job =>
            job.subject?.toLowerCase().includes(
                position.value.toLowerCase()
            )
        )
    }

    // Filter by jobId
    if (jobId.value) {
        jobs = jobs.filter(job =>
            job.name?.toLowerCase().includes(
                jobId.value.toLowerCase()
            )
        )
    }

    // Sorting
    jobs.sort((a, b) => {

        let valA = a[sortBy.value]
        let valB = b[sortBy.value]

        // Handle null values
        if (!valA) return 1
        if (!valB) return -1

        // Date sorting
        if (sortBy.value === 'applied_on') {
            valA = new Date(valA)
            valB = new Date(valB)
        }

        // Number sorting
        if (
            sortBy.value === 'amount' ||
            sortBy.value === 'total_experience' ||
            sortBy.value === 'vac'
        ) {
            valA = Number(valA)
            valB = Number(valB)
        }

        if (valA < valB) {
            return sortOrder.value === 'asc' ? -1 : 1
        }

        if (valA > valB) {
            return sortOrder.value === 'asc' ? 1 : -1
        }

        return 0

    })

    return jobs

})
function handleSort(field) {

    if (sortBy.value === field) {

        sortOrder.value =
            sortOrder.value === 'asc'
                ? 'desc'
                : 'asc'

    } else {

        sortBy.value = field
        sortOrder.value = 'asc'

    }

}

// Candidate fetch
watch(
    () => user.email,
    async (email) => {
        if (!email) return

        candidate.value = await getCandidate(email)
    },
    { immediate: true }
)
// Applied jobs fetch
watch(
    () => candidate.value.name,
    async (name) => {
        if (!name) return

        isLoading.value = true

        try {
            appliedJobs.value = await getAppliedJobs(name)

            if (
              appliedJobs.value.length &&
              !selectedJob.value
            ) {
              selectedJob.value = appliedJobs.value[0]
            }
        } finally {
            isLoading.value = false
        }
    },
    { immediate: true }
)
// Counter Animation Watch
watch(
    () => filteredAndSortedJobs.value.length,
    (newValue) => {
        animateCounter(newValue)
    },
    { immediate: true }
)
// Progress Tracker
watch(
  () => selectedJob.value,
  async (job) => {

    if (!job || !candidate.value.name) {
      statuses.value = []
      return
    }

    isStatusLoading.value = true

    try {

      statuses.value =
        await getCandidateStatuses({

          candidate: candidate.value.name,

          task: job.name,

        })

    } catch (error) {

      console.log(error)

    } finally {

      isStatusLoading.value = false

    }

  },
  { immediate: true }
)
watch(
  () => [jobId.value, filteredAndSortedJobs.value],
  () => {

    if (!jobId.value) return

    const matchedJob = filteredAndSortedJobs.value.find(
      job =>
        job.name?.toLowerCase() ===
        jobId.value.toLowerCase()
    )

    if (matchedJob) {
      selectedJob.value = matchedJob
    }

  },
  { immediate: true, deep: true }
)

onMounted(async () => {
    jobId.value = route.query.jobId || ''
})
</script>
