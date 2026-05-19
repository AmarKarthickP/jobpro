<template>
  <div class="grid grid-cols-12 gap-6">
    <!-- Profile Grid -->
    <div class="col-span-3">
      <div class="sticky top-24">
        <div class="bg-white shadow-sm rounded-lg pb-4">
          <div class="text-right p-5 flex items-center">
            <h1 class="font-medium text-primary text-[20px]">Filters</h1>
            <button
              @click="removeFilters"
              class="text-gray-500 ml-auto text-[13px] font-medium hover:text-red-600 transition-all duration-300 ease-in-out"
            >
              Clear all
            </button>
          </div>
          <div class="px-5">
            <h1 class="text-center font-medium text-primary">
              <span class="text-[#0770e4]">{{ animatedJobsCount }} Jobs</span>
              Available Now
            </h1>
            <!-- Position -->
            <p class="text-gray-600 mt-3 text-[15px] font-medium">Position</p>
            <input
              type="text"
              placeholder="Position"
              v-model="position"
              @change="getFilteredJobs"
              @focus="showPositionSuggestions = true"
              @blur="hidePositionSuggestions"
              class="bg-background w-full border-0 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
            />
            <div
              v-if="showPositionSuggestions && filteredPositionOptions.length"
              class="z-50 mt-2 max-h-[200px] hide-scrollbar overflow-y-auto left-[5%] w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
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
            <!-- Experience -->
            <input
              type="text"
              placeholder="Experience"
              v-model="experienceSearch"
              @change="getFilteredJobs"
              @focus="showExperienceSuggestions = true"
              @blur="hideExperienceSuggestions"
              class="bg-background w-full border-0 mt-3 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
            />
            <div
              v-if="showExperienceSuggestions && filteredExperienceOptions.length"
              class="z-50 mt-2 max-h-[200px] overflow-y-auto left-[5%] w-full hide-scrollbar bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              <div
                v-for="option in filteredExperienceOptions"
                :key="option.value"
                @mousedown="selectExperienceOption(option)"
                class="px-3 py-1 text-[13px] text-gray-700 cursor-pointer hover:bg-gray-100 transition-all duration-200"
              >
                {{ option.label }}
              </div>
            </div>
            <!-- Location -->
            <p
              v-if="locations.length > 0"
              class="text-gray-600 mt-3 text-[15px] font-medium"
            >
              Location
            </p>
            <div class="flex flex-wrap gap-3 mt-3">
              <div
                v-for="location in locations"
                :key="location"
                @click="selectLocation(location)"
                :class="[
                                    selectedLocation === location
                                        ? 'bg-primary text-white'
                                        : 'bg-background text-gray-600',
                                    'cursor-pointer text-[13px] rounded-lg font-medium px-2 py-1 transition-all duration-300 ease-in-out hover:ring-2 hover:ring-gray-400'
                                ]"
              >
                {{ location }}
              </div>
            </div>
            <!-- Salary Type -->
            <p class="text-gray-600 mt-5 text-[15px] font-medium">Salary</p>
            <div class="flex gap-3 relative">
              <!-- Salary Type -->
              <input
                type="text"
                placeholder="Salary Type"
                v-model="salaryType"
                @focus="showSalaryTypeSuggestions = true"
                @blur="hideSalaryTypeSuggestions"
                class="bg-background w-full border-0 text-[13px] rounded-lg mt-2 text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
              />
              <div
                v-if="showSalaryTypeSuggestions && filteredSalaryTypeOptions.length"
                class="absolute z-50 mt-2 top-10 w-[48%] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
              >
                <div
                  v-for="option in filteredSalaryTypeOptions"
                  :key="option"
                  @mousedown="selectSalaryTypeOption(option)"
                  class="px-3 py-1 text-[13px] text-gray-700 cursor-pointer hover:bg-gray-100 transition-all duration-200"
                >
                  {{ option }}
                </div>
              </div>
              <!-- Currency -->
              <input
                type="text"
                placeholder="Currency"
                v-model="currency"
                @focus="showCurrencySuggestions = true"
                @blur="hideCurrencySuggestions"
                class="bg-background w-full border-0 text-[13px] rounded-lg mt-2 text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
              />
              <div
                v-if="showCurrencySuggestions && filteredCurrencyOptions.length"
                class="absolute z-50 mt-2 top-10 right-0 w-[48%] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
              >
                <div
                  v-for="option in filteredCurrencyOptions"
                  :key="option"
                  @mousedown="selectCurrencyOption(option)"
                  class="px-3 py-1 text-[13px] text-gray-700 cursor-pointer hover:bg-gray-100 transition-all duration-200"
                >
                  {{ option }}
                </div>
              </div>
            </div>
            <Slider
              class="w-full mt-2"
              label="Amount"
              :min="0"
              :max="10000"
              :step="1"
              v-model:minValue="minSalary"
              v-model:maxValue="maxSalary"
              @change="getFilteredJobs"
            />
            <!-- Qualification -->
            <p class="text-gray-600 mt-5 text-[15px] font-medium">
              Qualification
            </p>
            <input
              type="text"
              placeholder="Qualification"
              v-model="qualification"
              @focus="showQualificationSuggestions = true"
              @blur="hideQualificationSuggestions"
              class="bg-background w-full border-0 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
            />
            <div
              v-if="showQualificationSuggestions && filteredQualificationOptions.length"
              class="absolute z-50 mt-2 bottom-28 left-[5%] w-[90%] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              <div
                v-for="option in filteredQualificationOptions"
                :key="option"
                @mousedown="selectQualificationOption(option)"
                class="px-3 py-1 text-[13px] text-gray-700 cursor-pointer hover:bg-gray-100 transition-all duration-200"
              >
                {{ option }}
              </div>
            </div>
            <div class="mt-5 flex gap-5 items-center justify-center">
              <button
                @click="handlePrevPage"
                :disabled="currentPage === 1"
                class="text-center px-5 bg-primary py-2 rounded-xl flex justify-evenly text-white text-[14px] font-medium disabled:opacity-40"
              >
                <left-icon class="h-3 w-3" />
              </button>
              <p class="text-[14px] font-medium">
                {{ currentPage }} / {{ totalPages }}
              </p>
              <button
                @click="handleNextPage"
                :disabled="currentPage === totalPages"
                class="text-center px-5 bg-primary py-2 rounded-xl flex justify-center text-white text-[14px] font-medium disabled:opacity-40"
              >
                <right-icon class="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-9 mb-10">
      <!-- Sorting -->
      <div class="rounded-lg shadow-sm px-5 pt-3 pb-3 bg-white">
        <div class="flex items-center">
          <p class="text-gray-500 font-medium text-lg">Sort by</p>
          <p class="font-medium ml-auto text-lg text-red-600">
            Showing {{ animatedJobsCount }} jobs
          </p>
          <button
            @click="handlePrevPage"
            :disabled="currentPage === 1"
            class="text-center ml-5 px-3 py-2 rounded-xl flex justify-evenly text-primary text-[14px] font-medium disabled:opacity-40"
          >
            <left-icon class="h-3 w-3" />
          </button>
          <button
            @click="handleNextPage"
            :disabled="currentPage === totalPages"
            class="text-center px-3 py-2 rounded-xl flex justify-center text-primary text-[14px] font-medium disabled:opacity-40"
          >
            <right-icon class="h-3 w-3" />
          </button>
        </div>
        <div class="border-t border-gray-300 my-2"></div>
        <div class="flex flex-wrap items-center gap-5 justify-center relative">
          <button
            v-for="item in [
            { label: 'Recent', value: 'recent' },
            { label: 'Openings', value: 'openings' },
            { label: 'Salary', value: 'salary' },
            // { label: 'Relevance', value: 'relevance' },
            { label: 'Experience', value: 'experience' }
        ]"
            :key="item.value"
            @click="handleSort(item.value)"
            :class="[
            sortBy === item.value
                ? 'text-primary bg-hoverbg'
                : 'text-gray-600',
            'px-8 py-1.5 text-lg flex items-center gap-3 rounded-md font-medium hover:bg-hoverbg transition-all duration-300 ease-in-out'
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
      <!-- Sponsored -->
      <sponsored-card class="mt-5" />
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
        ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'
        : 'flex flex-col gap-5'"
      >
        <div v-for="job in paginatedJobs" :key="`${job.name}-${job.status}`">
          <job-card
            :data="job"
            :view="view"
            :isLoggedIn="auth.isLoggedIn"
            :isCVAttached="isCVAttached"
            :candidateName="candidateName"
            @show-details="selectedJob = job"
          />
        </div>
      </TransitionGroup>
      <div
        v-if="jobs.length == 0"
        class="flex items-center justify-center mt-5"
      >
        <loader class="text-[40px]" />
      </div>
    </div>
  </div>
</template>
<script setup>

// Components
import ProfileCard from '@/components/ProfileCard.vue'
import QuickLinkCard from '@/components/QuickLinkCard.vue'
import Avatar from '../components/Avatar.vue'
import SponsoredCard from '@/components/SponsoredCard.vue'
import JobCard from '../components/JobCard.vue'
import Slider from '../components/Slider.vue'
import Loader from '../components/Loader.vue'

// Icons
import UpArrowIcon from '@/components/icons/UpArrowIcon.vue'
import DownArrowIcon from '@/components/icons/DownArrowIcon.vue'
import DownIcon from '@/components/icons/DownIcon.vue'
import RightIcon from '../components/icons/RightIcon.vue'
import LeftIcon from '../components/icons/LeftIcon.vue'
import ListViewIcon from '../components/icons/ListViewIcon.vue'
import GridViewIcon from '../components/icons/GridViewIcon.vue'

// Assets
import defaultImage from '@/assets/defaults/profile-image.jpeg'

// Vue
import {
    ref,
    computed,
    onMounted,
    watch
} from 'vue'
import { useRouter, useRoute } from 'vue-router'

// Session
import { auth } from '@/data/auth'

// Data
import { getJobs } from '@/data/jobs'
import { user } from '@/data/user'
import { getCandidate } from '@/data/candidate'

// Main State
const jobs = ref([])
const allJobs = ref([])
const selectedJob = ref(null)

const minSalary = ref(0)
const maxSalary = ref(10000)

const animatedJobsCount = ref(0)
const view = ref("grid")
const isCVAttached = ref(false)
const candidateName = ref('')

const currentPage = ref(1)
const jobsPerPage = 12

const sortBy = ref("recent")
const sortOrder = ref("desc")

const route = useRoute()



// Filters
const position = ref("")
const salaryType = ref("")
const qualification = ref("")
const currency = ref("")
const selectedLocation = ref("")
const experience = ref(null)
const experienceSearch = ref("")



// Suggestion Dropdown States
const showPositionSuggestions = ref(false)
const showSalaryTypeSuggestions = ref(false)
const showQualificationSuggestions = ref(false)
const showCurrencySuggestions = ref(false)
const showExperienceSuggestions = ref(false)



// Static Options
const salaryTypeOptions = [
    "Fixed",
    "Range",
    "Negotiable",
    "Confidential"
]

const qualificationOptions = [
    "Vocational Skills",
    "SSLC (10th Pass)",
    "12th Pass",
    "Post Graduate",
    "Graduate",
    "PhD",
    "Diploma",
    "ITI",
    "ITI / Diploma"
]

const experienceOptions = [
  { label: "Fresher", value: 0 },
  ...Array.from({ length: 30 }, (_, i) => ({
    label: `${i + 1} Year${i + 1 > 1 ? "s" : ""}`,
    value: i + 1
  }))
]



// Fetch Jobs
onMounted(async () => {
    position.value = route.query.position || ''
    experience.value = route.query.experience || ''
    selectedLocation.value = route.query.location || ''

    const data = await getJobs()

    allJobs.value = data
    jobs.value = data

    await getFilteredJobs()
})



// Dynamic Options
const positionOptions = computed(() => {
    const subjects = allJobs.value.map(job => job.subject)
    return [...new Set(subjects)]
})

const currencyOptions = computed(() => {
    const currencies = allJobs.value.map(job => job.currency)
    return [...new Set(currencies)]
})

const locations = computed(() => {
    const territories = allJobs.value.map(job => job.territory)
    return [...new Set(territories)]
})

// Jobs Pagination
const totalPages = computed(() => {
    return Math.ceil(jobs.value.length / jobsPerPage)
})

const paginatedJobs = computed(() => {
    const start = (currentPage.value - 1) * jobsPerPage
    const end = start + jobsPerPage

    return jobs.value.slice(start, end)
})

const candidate = ref([])

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



// Filtered Suggestions
const filteredPositionOptions =
    createFilteredOptions(positionOptions, position)

const filteredCurrencyOptions =
    createFilteredOptions(currencyOptions, currency)

const filteredQualificationOptions =
    createFilteredOptions(qualificationOptions, qualification)

const filteredSalaryTypeOptions =
    createFilteredOptions(salaryTypeOptions, salaryType)

const filteredExperienceOptions = computed(() => {

    if (!experienceSearch.value) {
        return experienceOptions
    }

    return experienceOptions.filter(option =>
        option.label.toLowerCase().includes(
            experienceSearch.value.toLowerCase()
        )
    )

})

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



// Salary Type
function selectSalaryTypeOption(option) {
    selectOption(
        salaryType,
        option,
        showSalaryTypeSuggestions
    )
}

function hideSalaryTypeSuggestions() {
    hideSuggestions(
        salaryType,
        salaryTypeOptions,
        showSalaryTypeSuggestions
    )
}



// Qualification
function selectQualificationOption(option) {
    selectOption(
        qualification,
        option,
        showQualificationSuggestions
    )
}

function hideQualificationSuggestions() {
    hideSuggestions(
        qualification,
        qualificationOptions,
        showQualificationSuggestions
    )
}



// Currency
function selectCurrencyOption(option) {
    selectOption(
        currency,
        option,
        showCurrencySuggestions
    )
}

function hideCurrencySuggestions() {
    hideSuggestions(
        currency,
        currencyOptions,
        showCurrencySuggestions
    )
}

// Currency
function selectExperienceOption(option) {
    experience.value = option.value
    experienceSearch.value = option.label
    showExperienceSuggestions.value = false
}

const experienceDisplay = computed(() => {
    const option = experienceOptions.find(
        item => item.value === experience.value
    )

    return option ? option.label : ""
})

function hideExperienceSuggestions() {

    setTimeout(() => {

        const validOption = experienceOptions.find(
            option =>
                option.label.toLowerCase().trim() ===
                experienceSearch.value.toLowerCase().trim()
        )

        if (validOption) {
            experience.value = validOption.value
            experienceSearch.value = validOption.label
        }

        showExperienceSuggestions.value = false

    }, 100)

}


// Location
function selectLocation(location) {

    if (selectedLocation.value !== location) {
        selectedLocation.value = location
    } else {
        selectedLocation.value = ""
    }

}



// Filter Jobs
async function getFilteredJobs() {
    if (!allJobs.value.length) return
    
    let additionalFilters = []

    if (position.value) {
        additionalFilters.push([
            "subject",
            "like",
            `%${position.value}%`
        ])
    }

    if (salaryType.value) {
        additionalFilters.push([
            "salary_type",
            "=",
            salaryType.value
        ])
    }

    if (qualification.value) {
        additionalFilters.push([
            "qualification_type",
            "=",
            qualification.value
        ])
    }

    if (currency.value) {
        additionalFilters.push([
            "currency",
            "=",
            currency.value
        ])
    }

    if (selectedLocation.value) {
        additionalFilters.push([
            "territory",
            "=",
            selectedLocation.value
        ])
    }

    additionalFilters.push([
        "amount",
        ">=",
        minSalary.value
    ])
    
    if (experience.value !== null && experience.value !== "") {
        additionalFilters.push([
            "total_experience",
            "=",
            experience.value
        ])
    }

    additionalFilters.push([
        "amount",
        "<=",
        maxSalary.value
    ])
    jobs.value = await getJobs(additionalFilters, candidateName.value)

}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

function handlePrevPage() {

    if (currentPage.value > 1) {
        currentPage.value--
        scrollToTop()
    }

}

function handleNextPage() {

    if (currentPage.value < totalPages.value) {
        currentPage.value++
        scrollToTop()
    }

}

function handleSort(type) {

    if (sortBy.value === type) {

        sortOrder.value =
            sortOrder.value === "asc"
                ? "desc"
                : "asc"

    } else {

        sortBy.value = type
        sortOrder.value = "desc"

    }

    sortJobs()

}

function sortJobs() {

    jobs.value.sort((a, b) => {

        let valueA
        let valueB

        switch (sortBy.value) {

            case "recent":
                valueA = new Date(a.created_on)
                valueB = new Date(b.created_on)
                break

            case "openings":
                valueA = a.vac || 0
                valueB = b.vac || 0
                break

            case "salary":
                valueA = a.amount || 0
                valueB = b.amount || 0
                break

            case "relevance":
                valueA = a.relevance || 0
                valueB = b.relevance || 0
                break

            case "experience":
                valueA = a.total_experience || 0
                valueB = b.total_experience || 0
                break

            default:
                valueA = 0
                valueB = 0

        }

        if (sortOrder.value === "asc") {
            return valueA > valueB ? 1 : -1
        }

        return valueA < valueB ? 1 : -1

    })

}

function removeFilters() {
    position.value = ""
    salaryType.value = ""
    qualification.value = ""
    currency.value = ""
    selectedLocation.value = ""
    experience.value = null
    experienceSearch.value = ""

    getFilteredJobs()
}

// Filter Watch
watch(
    [
        salaryType,
        qualification,
        currency,
        selectedLocation,
    ],
    () => {
        getFilteredJobs()
    }
)


// Counter Animation Watch
watch(
    () => jobs.value.length,
    (newValue) => {
        animateCounter(newValue)
    },
    { immediate: true }
)
// URL Query Watch
watch(
    () => route.query,
    (query) => {

        position.value = query.position || ''
        selectedLocation.value = query.location || ''

        experience.value =
            query.experience !== undefined &&
            query.experience !== ''
                ? Number(query.experience)
                : null

        const selectedExperience = experienceOptions.find(
            item => item.value === experience.value
        )

        experienceSearch.value =
            selectedExperience?.label || ''

        getFilteredJobs()

    },
    { immediate: true }
)
// Candidate fetch
watch(
    () => user.email,
    async (email) => {
        if (!email) return

        candidate.value = await getCandidate(email)
    },
    { immediate: true }
)
// Set value for fields
watch(candidate, (val) => {
  candidateName.value = val?.name || '',
  isCVAttached.value =
        val?.custom_updated__un_masked_cv
            ? true
            : false
})
watch(
  candidateName,
  async (value) => {
    await getFilteredJobs()
  },
  { immediate: true }
)
</script>
