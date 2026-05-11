<template>
    <div class="grid grid-cols-12 gap-6">
        <!-- Profile Grid -->
        <div class="col-span-3">
            <div class="sticky top-24">
                <div class="bg-white shadow-sm rounded-lg pb-4">
                    <div class="bg-black h-14 rounded-t-lg">
                    </div>
                    <avatar :img="userData" class="w-20 border-2 border-white -mt-8 ml-5"/>
                    <div class="text-right -mt-8 mr-5">
                        <button
                            @click="" 
                            class="text-gray-500 text-[13px] font-medium hover:text-red-600 transition-all duration-300 ease-in-out">
                            Clear all
                        </button>
                    </div>
                    <div class="mt-8 px-5">
                        <h1 class="text-center font-medium text-primary"><span class="text-[#0770e4]">{{ animatedJobsCount }} Jobs</span> Available Now</h1>
                        <!-- Position -->
                        <p class="text-gray-600 mt-5 text-[15px] font-medium">Position</p>
                        <input type="text" placeholder="Position" 
                                v-model="position"
                            @focus="showPositionSuggestions = true"
                            @blur="hidePositionSuggestions"
                                class="bg-background w-full border-0 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out" 
                            />
                            <div
                            v-if="showPositionSuggestions && filteredPositionOptions.length"
                                class="absolute z-50 mt-2 top-[235px] max-h-[200px] overflow-y-auto left-[5%] w-[90%] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
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
                        <!-- Location -->
                        <p v-if="locations.length > 0" class="text-gray-600 mt-3 text-[15px] font-medium">Location</p>
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
                            <input type="text" placeholder="Salary Type" 
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
                            <input type="text" placeholder="Currency" 
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
                        <Slider class="w-full mt-2"
                            label="Amount"
                            :min="0"
                            :max="10000"
                            :step="1"
                            v-model:minValue="minSalary"
                            v-model:maxValue="maxSalary"
                            @change="getFilteredJobs"
                        />
                    <!-- Qualification -->
                        <p class="text-gray-600 mt-5 text-[15px] font-medium">Qualification</p>
                        <input type="text" placeholder="Qualification" 
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
                        class="text-center px-5 bg-primary py-2 rounded-xl flex justify-evenly text-white text-[14px] font-medium"
                    >
                        <left-icon class="h-3 w-3" />
                    </button>
                    <p class="text-[14px] font-medium">1 / 20</p>
                    <button
                        class="text-center px-5 bg-primary py-2 rounded-xl flex justify-center text-white text-[14px] font-medium"
                    >
                        <right-icon class="h-3 w-3" />
                    </button>
                </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="col-span-9">
            <!-- Sorting -->
            <div class="rounded-lg shadow-sm px-5 pt-5 pb-3 bg-white">
                <div class="flex">
                    <p class="text-gray-500 font-medium text-lg">Sort by</p>
                    <p class="font-medium ml-auto text-lg text-red-600">Showing {{ animatedJobsCount }} jobs</p>
                </div>
                <div class="border-t border-gray-300 my-3">
                </div>
                <div class="flex flex-wrap items-center justify-center">
                    <button class="px-8 py-2 text-lg text-primary flex items-center gap-3 rounded-md font-medium hover:bg-hoverbg transition-all duration-300 ease-in-out">
                        Recent
                        <div class="flex">
                            <up-arrow-icon class="h-5 w-5" />
                            <!-- <down-arrow-icon class="h-5 w-5" /> -->
                        </div>
                    </button>
                    <button class="px-8 py-2 text-lg text-gray-600 flex items-center gap-3 rounded-md font-medium hover:bg-hoverbg transition-all duration-300 ease-in-out">
                        Openings
                        <div class="flex">
                            <up-arrow-icon class="h-5 w-5" />
                            <!-- <down-arrow-icon class="h-5 w-5" /> -->
                        </div>
                    </button>
                    <button class="px-8 py-2 text-lg text-gray-600 flex items-center gap-3 rounded-md font-medium hover:bg-hoverbg transition-all duration-300 ease-in-out">
                        Salary
                        <div class="flex">
                            <up-arrow-icon class="h-5 w-5" />
                            <!-- <down-arrow-icon class="h-5 w-5" /> -->
                        </div>
                    </button>
                    <button class="px-8 py-2 text-lg text-gray-600 flex items-center gap-3 rounded-md font-medium hover:bg-hoverbg transition-all duration-300 ease-in-out">
                        Relevance
                        <div class="flex">
                            <up-arrow-icon class="h-5 w-5" />
                            <!-- <down-arrow-icon class="h-5 w-5" /> -->
                        </div>
                    </button>
                    <button class="px-8 py-2 text-lg text-gray-600 flex items-center gap-3 rounded-md font-medium hover:bg-hoverbg transition-all duration-300 ease-in-out">
                        Experience
                        <div class="flex">
                            <up-arrow-icon class="h-5 w-5" />
                            <!-- <down-arrow-icon class="h-5 w-5" /> -->
                        </div>
                    </button>
                </div>
            </div>
            <!-- Sponsored -->
            <sponsored-card class="mt-5" />
            <div v-for="job in jobs" :key="job.name">
                <transition
                    enter-active-class="transition duration-400 ease-out"
                    enter-from-class="opacity-0 -translate-y-2 scale-95"
                    enter-to-class="opacity-100 translate-y-0 scale-100"
                    leave-active-class="transition duration-200 ease-in"
                    leave-from-class="opacity-100 translate-y-0 scale-98"
                    leave-to-class="opacity-0 -translate-y-2 scale-100"
                >
                    <job-card :data=job @show-details="selectedJob = job" />
                </transition>
            </div>
            <div v-if="jobs.length == 0" class="flex items-center justify-center mt-5">
                <loader />
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

// Assets
import defaultImage from '@/assets/defaults/profile-image.jpeg'

// Vue
import {
    ref,
    computed,
    onMounted,
    watch
} from 'vue'

// API
import { getJobs } from '@/data/jobs'



// User Data
const userData = {
    name: 'Amar Karthick P',
    headline: 'Software Developer | Frappe Framework | ERPNext | Vue JS',
    location: 'Chennai, Tamil Nadu',
    company: 'TEAMPRO HR & IT Services Pvt. Ltd.',
    src: defaultImage,
    alt: 'profile',
}



// Main State
const jobs = ref([])
const allJobs = ref([])
const selectedJob = ref(null)

const minSalary = ref(0)
const maxSalary = ref(10000)

const animatedJobsCount = ref(0)



// Filters
const position = ref("")
const salaryType = ref("")
const qualification = ref("")
const currency = ref("")
const selectedLocation = ref("")



// Suggestion Dropdown States
const showPositionSuggestions = ref(false)
const showSalaryTypeSuggestions = ref(false)
const showQualificationSuggestions = ref(false)
const showCurrencySuggestions = ref(false)



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



// Fetch Jobs
onMounted(async () => {
    const data = await getJobs()

    allJobs.value = data
    jobs.value = data
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

    additionalFilters.push([
        "amount",
        "<=",
        maxSalary.value
    ])

    console.log([minSalary.value, maxSalary.value])

    jobs.value = await getJobs(additionalFilters)

}


// Filter Watch
watch(
    [
        position,
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
</script>