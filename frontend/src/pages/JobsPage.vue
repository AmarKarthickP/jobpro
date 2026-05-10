<template>
    <div class="grid grid-cols-12 gap-6">
        <!-- Profile Grid -->
        <div class="col-span-3">
            <div class="sticky top-24">
                <profile-card :user="userData" class="mb-4" /> <!--:user injects the data to the component -->
                <!-- Quick Links -->
                <quick-link-card />
            </div>
        </div>
        <div class="col-span-9">
            <!-- Sorting -->
            <div class="rounded-lg shadow-sm px-5 pt-5 pb-3 bg-white">
                <div class="flex">
                    <p class="text-gray-500 font-medium text-lg">Sort by</p>
                    <p class="font-medium ml-auto text-lg text-red-600">Showing {{ jobs.length }} jobs</p>
                </div>
                <div class="border-t border-gray-300 my-3">
                </div>
                <div class="flex items-center justify-center">
                    <button class="px-10 py-2 text-lg text-primary flex items-center gap-3 rounded-md font-medium hover:bg-hoverbg transition-all duration-300 ease-in-out">
                        Recent
                        <div class="flex">
                            <up-arrow-icon class="h-5 w-5" />
                            <!-- <down-arrow-icon class="h-5 w-5" /> -->
                        </div>
                    </button>
                    <button class="px-10 py-2 text-lg text-gray-600 flex items-center gap-3 rounded-md font-medium hover:bg-hoverbg transition-all duration-300 ease-in-out">
                        Openings
                        <div class="flex">
                            <up-arrow-icon class="h-5 w-5" />
                            <!-- <down-arrow-icon class="h-5 w-5" /> -->
                        </div>
                    </button>
                    <button class="px-10 py-2 text-lg text-gray-600 flex items-center gap-3 rounded-md font-medium hover:bg-hoverbg transition-all duration-300 ease-in-out">
                        Salary
                        <div class="flex">
                            <up-arrow-icon class="h-5 w-5" />
                            <!-- <down-arrow-icon class="h-5 w-5" /> -->
                        </div>
                    </button>
                    <button class="px-10 py-2 text-lg text-gray-600 flex items-center gap-3 rounded-md font-medium hover:bg-hoverbg transition-all duration-300 ease-in-out">
                        Relevance
                        <div class="flex">
                            <up-arrow-icon class="h-5 w-5" />
                            <!-- <down-arrow-icon class="h-5 w-5" /> -->
                        </div>
                    </button>
                    <button class="px-10 py-2 text-lg text-gray-600 flex items-center gap-3 rounded-md font-medium hover:bg-hoverbg transition-all duration-300 ease-in-out">
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
                <job-card :data=job @show-details="selectedJob = job" />
            </div>
            <job-sidebar
                v-if="selectedJob"
                :job="selectedJob"
                @close="selectedJob = null"
            />
        </div>
    </div>
</template>

<script setup>
import ProfileCard from '@/components/ProfileCard.vue';
import defaultImage from '@/assets/defaults/profile-image.jpeg';
import QuickLinkCard from '@/components/QuickLinkCard.vue';
import UpArrowIcon from '@/components/icons/UpArrowIcon.vue';
import DownArrowIcon from '@/components/icons/DownArrowIcon.vue';
import DownIcon from '@/components/icons/DownIcon.vue';
import SponsoredCard from '@/components/SponsoredCard.vue';
import JobCard from '../components/JobCard.vue';

const userData = {
    name: 'Amar Karthick P',
    headline: 'Software Developer | Frappe Framework | ERPNext | Vue JS',
    location: 'Chennai, Tamil Nadu',
    company: 'TEAMPRO HR & IT Services Pvt. Ltd.',
    src: defaultImage,
    alt: 'profile',
}

import {ref, onMounted} from 'vue'
import getJobs from '@/data/jobs'

const jobs = ref([])
onMounted(async ()=> {
    jobs.value = await getJobs()
})

const selectedJob = ref(null)

</script>