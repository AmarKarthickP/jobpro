<template>
    <div>
      <!-- Filters & Sortings -->
      <div
        ref="stickyCard"
        :class="['px-5 pt-3 pb-3 bg-white sticky -top-5 z-30 shadow-sm', isStuck ? 'rounded-none -mx-5' : 'rounded-lg']">
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
                class="bg-primary/5 w-full border-0 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 pr-2 pl-10 py-1 transition-all duration-300 ease-in-out"
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
              placeholder="Location"
              v-model="location"
              @focus="showJobIdSuggestions = true"
              @blur="hideJobIdSuggestions"
              class="bg-primary/5 ml-3 w-[130px] border-0 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 pr-2 pl-4 py-1 transition-all duration-300 ease-in-out"
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
              placeholder="Qualification"
              v-model="qualification"
              @focus="showQualificationSuggestions = true"
              @blur="hideQualificationSuggestions"
              class="bg-primary/5 ml-3 w-[200px] border-0 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 pr-2 pl-4 py-1 transition-all duration-300 ease-in-out"
            />
            <div
              v-if="showQualificationSuggestions && filteredQualificationOptions.length"
              class="absolute z-50 mt-2 max-h-[200px] hide-scrollbar overflow-y-auto left-[5%] w-[203px] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
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
          </div>

          <div class="relative">
            <input
              type="text"
              placeholder="Experience"
              v-model="experience"
              @focus="showExperienceSuggestions = true"
              @blur="hideExperienceSuggestions"
              class="bg-primary/5 ml-3 w-[200px] border-0 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 pr-2 pl-4 py-1 transition-all duration-300 ease-in-out"
            />
            <div
              v-if="showExperienceSuggestions && filteredExperienceOptions.length"
              class="absolute z-50 mt-2 max-h-[200px] hide-scrollbar overflow-y-auto left-[5%] w-[203px] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              <div
                v-for="option in filteredExperienceOptions"
                :key="option"
                @mousedown="selectExperienceOption(option)"
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
        <div class="flex flex-wrap items-center gap-10 justify-center relative">
          <button
            v-for="item in [
              { label: 'Recent', value: 'creation' },
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
        </div>
      </div>
      <!-- Job Cards & Details -->
      <div class="grid grid-cols-12 gap-5 mt-8 mx-8">
        <div class="col-span-5 grid grid-cols-1 gap-5 rounded-lg">
          <TransitionGroup
            tag="div"
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 translate-y-4 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition-all duration-400 ease-in-out"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
            move-class="transition-all duration-500 ease-in-out"
            :class="
              view == 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'
                : 'flex flex-col gap-5'
            "
          >
            <div v-for="job in jobs" :key="`${job.name}-${job.status}`">
              <job-card
                :data="job"
                :view="view"
                :isLoggedIn="auth.isLoggedIn"
                :isCVAttached="isCVAttached"
                :candidateName="candidateName"
                @show-details="selectedJob = job"
                page="OpenVacancy"
              />
            </div>
          </TransitionGroup>
          <div
            ref="loadMoreTrigger"
            class="flex items-center justify-center"
          >
            <Loader
              v-if="loading || loadingFilters"
              class="text-[40px] mt-8"
            />
          </div>
        </div>
        <div class="col-span-7 bg-white rounded-lg">
        </div>
      </div>
    </div>
</template>

<script setup>
// vue
import { ref, computed, watch, onMounted, onUnmounted } from "vue"

// icons
import SearchIcon from '@/components/icons/SearchIcon.vue'
import UpArrowIcon from '@/components/icons/UpArrowIcon.vue'
import DownArrowIcon from '@/components/icons/DownArrowIcon.vue'
// components
import JobCard from '@/components/JobCard.vue'
import Loader from '@/components/Loader.vue'

// data
import { getJobs } from "@/data/jobs";
import { getCandidate } from "@/data/candidate";
import { getFilterValues } from "@/data/jobs.js";

// Session
import { auth } from "@/data/auth";

// state
const jobs = ref([]);
const selectedJob = ref(null);
const loadingFilters = ref(true)
const initialized = ref(false)

// variables
const animatedJobsCount = ref(0);
const candidate = ref([]);

// Load jobs on scroll variables
const start = ref(0)
const pageLength = 12
const loading = ref(false)
const hasMore = ref(true)
const loadMoreTrigger = ref(null)
let observer

// sticky filters
const stickyCard = ref(null)
const isStuck = ref(false)
const checkSticky = () => {
  if (!stickyCard.value) return
  isStuck.value = stickyCard.value.getBoundingClientRect().top <= 75
}

// sorting
const sortBy = ref("recent");
const sortOrder = ref("desc");
const filterValues = ref({});

// Filters
const position = ref("");
const qualification = ref("");
const location = ref("");
const experience = ref(null);
const experienceSearch = ref("");


// Suggestion Dropdown States
const showPositionSuggestions = ref(false);
const showQualificationSuggestions = ref(false);
const showLocationSuggestions = ref(false);
const showExperienceSuggestions = ref(false);

// static dropdown options
const qualificationOptions = [
  "Vocational Skills",
  "SSLC (10th Pass)",
  "12th Pass",
  "Post Graduate",
  "Graduate",
  "PhD",
  "Diploma",
  "ITI",
  "ITI / Diploma",
];
const experienceOptions = [
  { label: "Fresher", value: 0 },
  ...Array.from({ length: 30 }, (_, i) => ({
    label: `${i + 1} Year${i + 1 > 1 ? "s" : ""}`,
    value: i + 1,
  })),
];

// dynamic options
// Dynamic Options
const positionOptions = computed(() => {
  return filterValues.value.positions || []
})
const locationOptions = computed(() => {
  return filterValues.value.locations || []
})

// Filtered Suggestions
const filteredPositionOptions = createFilteredOptions(positionOptions, position);
const filteredQualificationOptions = createFilteredOptions(qualificationOptions, qualification);
const filteredExperienceOptions = computed(() => {
  if (!experienceSearch.value) {
    return experienceOptions;
  }
  return experienceOptions.filter((option) =>
    option.label.toLowerCase().includes(experienceSearch.value.toLowerCase())
  );
});

// methods
// Animates the no of jobs from 0 to x
function animateCounter(target) {
  const duration = 500;
  const start = animatedJobsCount.value;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    animatedJobsCount.value = Math.floor(start + (target - start) * progress);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
// Reusable Filter Helper
function createFilteredOptions(options, model) {
  return computed(() => {
    if (!model.value) {
      return options.value || options;
    }

    return (options.value || options).filter((option) =>
      option.toLowerCase().includes(model.value.toLowerCase())
    );
  });
}
// Reusable Select Helper
function selectOption(model, value, showRef) {
  model.value = value;
  showRef.value = false;
}
// Reusable Hide Helper
function hideSuggestions(model, options, showRef) {
  setTimeout(() => {
    const validOption = (options.value || options).find(
      (option) => option.toLowerCase().trim() === model.value.toLowerCase().trim()
    );

    if (validOption) {
      model.value = validOption;
    }

    showRef.value = false;
  }, 100);
}
// Position
function selectPositionOption(option) {
  selectOption(position, option, showPositionSuggestions);
}
function hidePositionSuggestions() {
  hideSuggestions(position, positionOptions, showPositionSuggestions);
}
// Qualification
function selectQualificationOption(option) {
  selectOption(qualification, option, showQualificationSuggestions);
}
function hideQualificationSuggestions() {
  hideSuggestions(qualification, qualificationOptions, showQualificationSuggestions);
}
// Experience
function selectExperienceOption(option) {
  experience.value = option.value;
  experienceSearch.value = option.label;
  showExperienceSuggestions.value = false;
}

const experienceDisplay = computed(() => {
  const option = experienceOptions.find((item) => item.value === experience.value);

  return option ? option.label : "";
});
function hideExperienceSuggestions() {
  setTimeout(() => {
    const validOption = experienceOptions.find(
      (option) =>
        option.label.toLowerCase().trim() === experienceSearch.value.toLowerCase().trim()
    );

    if (validOption) {
      experience.value = validOption.value;
      experienceSearch.value = validOption.label;
    }

    showExperienceSuggestions.value = false;
  }, 100);
}
// get jobs
async function getFilteredJobs() {
  start.value = 0
  hasMore.value = true

  await loadJobs(true)
}
// scrolls to the top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
// handles sorting
function handleSort(type) {
  if (sortBy.value === type) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortBy.value = type;
    sortOrder.value = "desc";
  }
  sortJobs();
}
// sorts jobs based on the selected criteria
function sortJobs() {
  jobs.value.sort((a, b) => {
    let valueA;
    let valueB;

    switch (sortBy.value) {
      case "recent":
        valueA = new Date(a.created_on);
        valueB = new Date(b.created_on);
        break;

      case "openings":
        valueA = a.vac || 0;
        valueB = b.vac || 0;
        break;

      case "salary":
        valueA = a.amount || 0;
        valueB = b.amount || 0;
        break;

      case "relevance":
        valueA = a.relevance || 0;
        valueB = b.relevance || 0;
        break;

      case "experience":
        valueA = a.total_experience || 0;
        valueB = b.total_experience || 0;
        break;

      default:
        valueA = 0;
        valueB = 0;
    }

    if (sortOrder.value === "asc") {
      return valueA > valueB ? 1 : -1;
    }

    return valueA < valueB ? 1 : -1;
  });
}
// removes all filters
function removeFilters() {
  position.value = "";
  salaryType.value = "";
  qualification.value = "";
  currency.value = "";
  selectedLocation.value = "";
  experience.value = null;
  experienceSearch.value = "";
  minSalary.value = 0;
  maxSalary.value = 10000;
  getFilteredJobs();
}
// load filtered jobs
const loadJobs = async (reset = false) => {
  if (loading.value) return

  loading.value = true

  try {
    let additionalFilters = []

    if (position.value) {
      additionalFilters.push(["subject", "like", `%${position.value}%`])
    }

    if (qualification.value) {
      additionalFilters.push(["qualification_type", "=", qualification.value])
    }

    if (location.value) {
      additionalFilters.push(["territory", "=", location.value])
    }

    if (experience.value !== null && experience.value !== "") {
      additionalFilters.push(["total_experience", "=", experience.value])
    }

    const response = await getJobs(
      additionalFilters,
      start.value,
      pageLength
    )
    
    if (reset) {
      jobs.value = response
    } else {
      jobs.value.push(...response)
    }

    if (response.length < pageLength) {
      hasMore.value = false
    } else {
      start.value += pageLength
    }
  } finally {
    loading.value = false
  }
}

// events
onMounted(() => {
  window.addEventListener("scroll", checkSticky)
})

onUnmounted(() => {
  window.removeEventListener("scroll", checkSticky)
  observer?.disconnect()
})

onMounted(async () => {
  try {
    filterValues.value = await getFilterValues()
  } finally {
    loadingFilters.value = false
  }
  initialized.value = true

  await loadJobs(true)
  observer = new IntersectionObserver(
    ([entry]) => {
      if (
        entry.isIntersecting &&
        hasMore.value &&
        !loading.value
      ) {
        loadJobs()
      }
    },
    {
      rootMargin: "300px",
    }
  )

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value)
  }
});

// watchers
// filters
watch([position, qualification, location, experience], () => {
  getFilteredJobs();
});
</script>