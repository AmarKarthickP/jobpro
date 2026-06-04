<template>
  <div>
    <!-- Filters & Sortings -->
    <div ref="stickyTrigger"></div>
    <div
      ref="stickyCard"
      :class="[
        'px-5 pt-5 pb-3 bg-white sticky -top-5 z-30 transition-all duration-300',
        isStuck ? 'rounded-b-none shadow -mx-5 bg-white' : 'rounded-lg'
      ]"
    >
      <div class="flex items-center">
        <div class="flex items-center relative">
          <search-icon class="h-5 w-5 text-gray text-primary absolute left-2.5" />
          <div>
            <input type="text" placeholder="Search position" v-model="position" @focus="showPositionSuggestions = true" @blur="hidePositionSuggestions" class="bg-primary/5 w-full border-0 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 pr-2 pl-10 py-1 transition-all duration-300 ease-in-out" />
            <div v-if="showPositionSuggestions && filteredPositionOptions.length" class="absolute z-50 mt-2 max-h-[200px] hide-scrollbar overflow-y-auto w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
              <div v-for="option in filteredPositionOptions" :key="option" @mousedown="selectPositionOption(option)" class="px-3 py-1 text-[13px] text-gray-700 cursor-pointer hover:bg-gray-100 transition-all duration-200">
                {{ option }}
              </div>
            </div>
          </div>
        </div>
        <div class="relative">
          <input type="text" placeholder="Location" v-model="location" @focus="showJobIdSuggestions = true" @blur="hideJobIdSuggestions" class="bg-primary/5 ml-3 w-[130px] border-0 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 pr-2 pl-4 py-1 transition-all duration-300 ease-in-out" />
          <div v-if="showJobIdSuggestions && filteredJobIdOptions.length" class="absolute z-50 mt-2 max-h-[200px] hide-scrollbar overflow-y-auto left-[5%] w-[133px] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            <div v-for="option in filteredJobIdOptions" :key="option" @mousedown="selectJobIdOption(option)" class="px-3 py-1 text-[13px] text-gray-700 cursor-pointer hover:bg-gray-100 transition-all duration-200">
              {{ option }}
            </div>
          </div>
        </div>
        <div class="relative">
          <input type="text" placeholder="Qualification" v-model="qualification" @focus="showQualificationSuggestions = true" @blur="hideQualificationSuggestions" class="bg-primary/5 ml-3 w-[200px] border-0 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 pr-2 pl-4 py-1 transition-all duration-300 ease-in-out" />
          <div v-if="showQualificationSuggestions && filteredQualificationOptions.length" class="absolute z-50 mt-2 max-h-[200px] hide-scrollbar overflow-y-auto left-[5%] w-[203px] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            <div v-for="option in filteredQualificationOptions" :key="option" @mousedown="selectQualificationOption(option)" class="px-3 py-1 text-[13px] text-gray-700 cursor-pointer hover:bg-gray-100 transition-all duration-200">
              {{ option }}
            </div>
          </div>
        </div>
        <div class="relative">
          <input type="text" placeholder="Experience" v-model="experience" @focus="showExperienceSuggestions = true" @blur="hideExperienceSuggestions" class="bg-primary/5 ml-3 w-[200px] border-0 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 pr-2 pl-4 py-1 transition-all duration-300 ease-in-out" />
          <div v-if="showExperienceSuggestions && filteredExperienceOptions.length" class="absolute z-50 mt-2 max-h-[200px] hide-scrollbar overflow-y-auto left-[5%] w-[203px] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            <div v-for="option in filteredExperienceOptions" :key="option" @mousedown="selectExperienceOption(option)" class="px-3 py-1 text-[13px] text-gray-700 cursor-pointer hover:bg-gray-100 transition-all duration-200">
              {{ option }}
            </div>
          </div>
        </div>
        <p class="font-medium ml-auto text-lg text-red-600"> Showing {{ animatedJobsCount }} jobs </p>
      </div>
      <div class="border-t border-gray-300 my-2"></div>
      <div class="flex flex-wrap items-center gap-10 justify-center relative">
        <button v-for="item in [
              { label: 'Recent', value: 'recent' },
              { label: 'Openings', value: 'vac' },
              { label: 'Salary', value: 'amount' },
              { label: 'Experience', value: 'total_experience' }
            ]" :key="item.value" @click="handleSort(item.value)" :class="[
                    sortBy === item.value
                        ? 'text-primary bg-hoverbg'
                        : 'text-gray-600',
                    'px-5 py-1.5 text-lg flex items-center gap-3 rounded-md font-medium hover:bg-hoverbg transition-all duration-300 ease-in-out'
                ]">
          {{ item.label }}
          <div class="flex">
            <up-arrow-icon v-if="
                            sortBy === item.value &&
                            sortOrder === 'asc'
                        " class="h-5 w-5" />
            <down-arrow-icon v-else class="h-5 w-5" />
          </div>
        </button>
      </div>
    </div>
    <!-- Job Cards & Details -->
    
    <div ref="loadMoreTrigger" class="flex items-center justify-center">
      <Loader v-if="loading || loadingFilters" class="text-[40px] mt-8" />
    </div>
    <div class="grid grid-cols-12 gap-10 mt-8 mx-8">
      <!-- Job Cards -->
      <div class="col-span-5 grid grid-cols-1 gap-5 rounded-lg -mt-5">
        <TransitionGroup tag="div" enter-active-class="transition-all duration-500 ease-out" enter-from-class="opacity-0 translate-y-4 scale-95" enter-to-class="opacity-100 translate-y-0 scale-100" leave-active-class="transition-all duration-400 ease-in-out" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95" move-class="transition-all duration-500 ease-in-out" :class="
              view == 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'
                : 'flex flex-col gap-5'
            ">
          <div v-for="job in jobs" :key="`${job.name}-${job.status}`" @click="selectedJobId = job.name" class="cursor-pointer">
            <job-card :data="job" :view="view" :isLoggedIn="auth.isLoggedIn" :isCVAttached="isCVAttached" :candidateName="candidateName" @show-details="selectedJob = job" page="OpenVacancy" />
          </div>
        </TransitionGroup>
        <div ref="loadMoreTrigger" class="flex items-center justify-center">
          <Loader v-if="(loading || loadingFilters) && jobs.length" class="text-[40px] mt-8" />
        </div>
      </div>
      <!-- Job Details -->
      <div v-if="selectedJob" class="col-span-7 bg-white rounded-lg shadow-sm sticky top-28 max-h-[65vh]  overflow-y-auto hide-scrollbar transition-all duration-300 ease-in-out">
        <!-- Content -->
        <div class="px-5 pb-5 relative">
          <badge class="absolute font-medium top-5 right-10 cursor-default bg-[#ffebdb] text-[#e56700] rounded-lg text-sm px-3 py-1">Job ID: {{ selectedJob.name }}</badge>
          <img v-if="selectedJob.custom_customer_location_image" class="mt-4 h-[250px] w-full bg-cover rounded-lg" :src="selectedJob.custom_customer_location_image" /> &nbsp; <div class="">
            <h1 class="font-semibold text-primary text-xl">Highlights</h1>
            <ul class="font-medium mt-1.5 text-[13px] md:text-[15px] text-gray-600 pl-2 list-disc pl-6">
              <li> Qualification: {{ selectedJob.qualification_type }}
                <span v-if="selectedJob.specialization"> (need specialization in {{ selectedJob.specialization }})</span>
              </li>
              <li v-if="selectedJob.minimum_experience>0"> Experience: <span>{{ selectedJob.minimum_experience }}
                  <span v-if="selectedJob.maximum_experience>0">-{{ selectedJob.maximum_experience }}</span> years of experience </span>
              </li>
              <li v-else>Experience: <span>Fresher</span>
              </li>
              <li v-if="selectedJob.gulf_experience>0"> Gulf Experience: <span class="">{{ selectedJob.gulf_experience }} years of experience</span>
              </li>
            </ul>
          </div>
          <div class="mt-3">
            <h1 class="font-semibold text-primary text-xl">Description</h1>
            <p class="pt-2 pl-2 text-gray-600 text-[13px] md:text-[15px] font-medium text-left" v-html="selectedJob.description"></p>
          </div>
          <div>
            <h1 class="font-semibold text-primary text-xl">About Company</h1>
            <p class="pt-2 pl-2 text-gray-600 text-[13px] md:text-[15px] font-medium text-left">
              {{ selectedJob.customer }}
            </p>
            <div class="flex pl-2 gap-2">
              <img v-if="selectedJob.custom_country_flag" :src="selectedJob.custom_country_flag" :alt="flag-selectedJob.name" class="h-5" />
              <h2 class="text-gray-600 text-[13px] md:text-[15px] font-medium text-left">
                {{ selectedJob.territory }}
              </h2>
            </div>
            <p class="pt-2 pl-2 text-gray-600 text-[13px] md:text-[15px] font-medium text-left">
              {{ selectedJob.custom_about_customer }}
            </p>
            <a :href="selectedJob.custom_customer_website" target="_blank" rel="noopener noreferrer">
              <h2 class="pl-2 text-md font-sans text-[#001d4e] font-semibold pb-2">
                {{ selectedJob.custom_customer_website }}
              </h2>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  // vue
  import {
    ref,
    computed,
    watch,
    onMounted,
    onUnmounted
  } from "vue"
  // icons
  import SearchIcon from '@/components/icons/SearchIcon.vue'
  import UpArrowIcon from '@/components/icons/UpArrowIcon.vue'
  import DownArrowIcon from '@/components/icons/DownArrowIcon.vue'
  // components
  import JobCard from '@/components/JobCard.vue'
  import Loader from '@/components/Loader.vue'
  // data
  import {
    getJobs
  } from "@/data/jobs";
  import {
    getCandidate
  } from "@/data/candidate";
  import {
    getFilterValues
  } from "@/data/jobs.js";
  // Utils
  import {
    timeAgo
  } from '@/utils/date'
  // Session
  import {
    auth
  } from "@/data/auth";
  // state
  const jobs = ref([]);
  const loadingFilters = ref(true)
  const initialized = ref(false)
  const selectedJobId = ref(null);
  const selectedJob = computed(() => {
    return jobs.value.find(job => job.name === selectedJobId.value) || null;
  });
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
  const stickyTrigger = ref(null)
  const stickyCard = ref(null)
  const isStuck = ref(false)
 const checkSticky = () => {
  if (!stickyCard.value) return

  const rect = stickyCard.value.getBoundingClientRect()

  console.log(rect.top)
  isStuck.value = rect.top <= 0
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
  const qualificationOptions = ["Vocational Skills", "SSLC (10th Pass)", "12th Pass", "Post Graduate", "Graduate", "PhD", "Diploma", "ITI", "ITI / Diploma", ];
  const experienceOptions = [{
    label: "Fresher",
    value: 0
  }, ...Array.from({
    length: 30
  }, (_, i) => ({
    label: `${i + 1} Year${i + 1 > 1 ? "s" : ""}`,
    value: i + 1,
  })), ];
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
    return experienceOptions.filter((option) => option.label.toLowerCase().includes(experienceSearch.value.toLowerCase()));
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
      return (options.value || options).filter((option) => option.toLowerCase().includes(model.value.toLowerCase()));
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
        (option) => option.toLowerCase().trim() === model.value.toLowerCase().trim());
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
        (option) => option.label.toLowerCase().trim() === experienceSearch.value.toLowerCase().trim());
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
      const response = await getJobs(additionalFilters, start.value, pageLength)
      if (reset) {
        jobs.value = response
      } else {
        jobs.value.push(...response)
      }
      // Auto-select first job if nothing selected
      if (!selectedJobId.value && jobs.value.length) {
        selectedJobId.value = jobs.value[0].name;
      }
      // If selected job no longer exists after filtering
      if (selectedJobId.value && !jobs.value.some(job => job.name === selectedJobId.value)) {
        selectedJobId.value = jobs.value.length ? jobs.value[0].name : null;
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        isStuck.value = !entry.isIntersecting
      },
      { threshold: 0 }
    )

    if (stickyTrigger.value) {
      observer.observe(stickyTrigger.value)
    }
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
        if (entry.isIntersecting && hasMore.value && !loading.value) {
          loadJobs()
        }
      }, {
        rootMargin: "300px",
      })
    if (loadMoreTrigger.value) {
      observer.observe(loadMoreTrigger.value)
    }
  });
  // watchers
  // filters
  watch([position, qualification, location, experience], () => {
    getFilteredJobs();
  });
  // Counter Animation Watch
  watch(
    () => jobs.value.length,
    (newValue) => {
      animateCounter(newValue);
    },
    { immediate: true }
  );
</script>