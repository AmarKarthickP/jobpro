<template>
    <section class="w-full flex flex-col items-center">
        <div class="flex flex-col items-center mt-16">
            
            <!-- Heading -->
            <h1 class="text-primary text-[35px] font-bold tracking-tight">
                Build Your Career Abroad
            </h1>

            

            <!-- Search Box -->
            <div
                class="mt-10 bg-white rounded-full shadow-lg border border-gray-200 p-3 flex items-center gap-3 w-[800px]"
            >

                <!-- Job Search -->
                <div class="flex items-center flex-1 relative">
                    <search-icon class="text-gray-400 h-6 w-6" />

                    <input
                        v-model="position"
                        type="text"
                        placeholder="Enter skills, designation"
                        @focus="showPositionSuggestions = true"
                        @blur="hidePositionSuggestions"
                        class="w-[230px] text-[15px] border-0 focus:ring-0 text-sm font-medium placeholder:text-gray-400 bg-transparent"
                    />
                    <div
                        v-if="showPositionSuggestions && filteredPositionOptions.length"
                        class="absolute top-12 left-0 mt-3 z-50 w-full max-h-[220px] overflow-y-auto bg-white border border-gray-200 rounded-2xl shadow-xl hide-scrollbar"
                    >
                        <div
                            v-for="option in filteredPositionOptions"
                            :key="option"
                            @mousedown="selectPositionOption(option)"
                            class="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 transition font-medium"
                        >
                            {{ option }}
                        </div>
                    </div>
                </div>
                
                <!-- Divider -->
                <div class="h-10 w-[1px] bg-gray-200"></div>

                <!-- Experience -->
                <div class="flex-1 relative">
                    <input
                        v-model="experience"
                        type="text"
                        placeholder="Select Experience"
                        @focus="showExperienceSuggestions = true"
                        @blur="hideExperienceSuggestions"
                        class="w-[160px] text-[15px] border-0 focus:ring-0 text-sm font-medium placeholder:text-gray-400 bg-transparent"
                    />
                    <div
                        v-if="showExperienceSuggestions && filteredExperienceOptions.length"
                        class="absolute top-12 left-0 mt-3 z-50 w-full max-h-[220px] overflow-y-auto bg-white border border-gray-200 rounded-2xl shadow-xl hide-scrollbar"
                    >
                        <div
                            v-for="option in filteredExperienceOptions"
                            :key="option"
                            @mousedown="selectExperienceOption(option)"
                            class="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 transition font-medium"
                        >
                            {{ option }}
                        </div>
                    </div>
                </div>

                <!-- Divider -->
                <div class="h-10 w-[1px] bg-gray-200"></div>

                <!-- Location -->
                <div class="flex-1 px-3 relative">
                    <input
                        v-model="location"
                        type="text"
                        placeholder="Enter Location"
                        @focus="showLocationSuggestions = true"
                        @blur="hideLocationSuggestions"
                        class="w-[130px] text-[15px] border-0 focus:ring-0 text-sm font-medium placeholder:text-gray-400 bg-transparent"
                    />
                    <div
                        v-if="showLocationSuggestions && filteredLocationOptions.length"
                        class="absolute top-12 left-0 mt-3 z-50 w-full max-h-[220px] overflow-y-auto bg-white border border-gray-200 rounded-2xl shadow-xl hide-scrollbar"
                    >
                        <div
                            v-for="option in filteredLocationOptions"
                            :key="option"
                            @mousedown="selectLocationOption(option)"
                            class="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 transition font-medium"
                        >
                            {{ option }}
                        </div>
                    </div>
                </div>

                <!-- Search Button -->
                <button
                    @click="handleSearch"
                    class="bg-primary text-white px-8 py-2 rounded-full font-medium hover:scale-[1.02] transition-all duration-200"
                >
                    Search
                </button>
            </div>

            <div class="flex items-center justify-center gap-10 mt-10 ">
                <div class="rounded-xl flex items-center py-6 px-5 gap-3 cursor-default">
                    <world-icon class="w-8 h-8 text-blue-600 absolute" />
                    <p class="font-semibold text-primary ml-12"><span class="text-2xl">{{ countries }}</span><span v-if="countries">+</span> Countries</p>
                </div>
                <div class="rounded-xl flex items-center py-6 px-5 gap-3 cursor-default">
                    <company-icon class="w-9 h-9 text-[#333399] absolute" />
                    <p class="font-semibold text-primary ml-12"><span class="text-2xl">{{ companies }}</span><span v-if="companies">+</span> Hiring Companies</p>
                </div>
                <div class="rounded-xl relative flex items-center py-6 px-5 gap-3 cursor-default">
                    <suitcase-icon class="h-7 w-7 absolute text-orange-800"/>
                    <p class="font-semibold text-primary ml-12"><span class="text-2xl">{{ placements }}</span><span v-if="placements">+</span> Successfull Placements</p>
                </div>
            </div>
        
        </div>
    </section>
    

    <!-- Hriring Companies -->
    <section class="text-center mt-16">
        <h1 class="font-bold text-primary text-[25px]">Our Hiring Companies</h1>
        <customer-carousel class="-mt-10" />
    </section>
</template>

<script setup>
// Vue
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

// Components
import SearchIcon from '../components/icons/SearchIcon.vue'
import WorldIcon from '../components/icons/WorldIcon.vue'
import CompanyIcon from '../components/icons/CompanyIcon.vue'
import PeopleIcon from '../components/icons/PeopleIcon.vue'
import WorkIcon from '../components/icons/WorkIcon.vue'
import SuitcaseIcon from '../components/icons/SuitcaseIcon.vue'

// Data
import { getJobs } from '@/data/jobs'

// Utils
import { animateCounter } from '../utils/animatecounter'
import CustomerCarousel from '../components/CustomerCarousel.vue'

const position = ref("")
const location = ref("")
const experience = ref("")
const jobs = ref([])
const allJobs = ref([])
const countries = ref(0)
const companies = ref(0)
const placements = ref(0)
const router = useRouter()

// Suggestion Dropdown States
const showPositionSuggestions = ref(false)
const showExperienceSuggestions = ref(false)
const showLocationSuggestions = ref(false)

const handleSearch = () => {
    router.push({
        path: '/jobs',
        query: {
            position: position.value || '',
            experience: experience.value || '',
            location: location.value || ''
        }
    })
}

// Fetch Jobs
onMounted(async () => {
    const data = await getJobs()
    allJobs.value = data
    jobs.value = data
    
    animateCounter(10, countries, 500)
    animateCounter(400, companies, 500)
    animateCounter(2000, placements, 500)
})

// Dynamic Options
const positionOptions = computed(() => {
    const subjects = allJobs.value.map(job => job.subject)
    return [...new Set(subjects)]
})
const locationOptions = computed(() => {
    const territories = allJobs.value.map(job => job.territory)
    return [...new Set(territories)]
})
const experienceOptions = [
  "Fresher",
  ...Array.from({ length: 30 }, (_, i) => `${i + 1} Year${i + 1 > 1 ? "s" : ""}`)
]


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

function hideLocationSuggestions() {
    hideSuggestions(
        location,
        locationOptions,
        showLocationSuggestions
    )
}
// Experience
function selectExperienceOption(option) {
    selectOption(
        experience,
        option,
        showExperienceSuggestions
    )
}
function hideExperienceSuggestions() {
    hideSuggestions(
        experience,
        experienceOptions,
        showExperienceSuggestions
    )
}

function selectLocationOption(option) {
    selectOption(
        location,
        option,
        showLocationSuggestions
    )
}

// Filtered Suggestions
const filteredPositionOptions = createFilteredOptions(positionOptions, position)
const filteredExperienceOptions = createFilteredOptions(experienceOptions, experience)
const filteredLocationOptions = createFilteredOptions(locationOptions, location)

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

// Reusable Select Helper
function selectOption(model, value, showRef) {
    model.value = value
    showRef.value = false
}

</script>

<style scoped>
.custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #d1d5db transparent;
}

/* Chrome, Edge, Safari */
.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
    margin-block: 12px;
    border-radius: 9999px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 9999px;
    border: 2px solid transparent;
    background-clip: padding-box;
    transition: background 0.2s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
    border: 2px solid transparent;
    background-clip: padding-box;
}
</style>