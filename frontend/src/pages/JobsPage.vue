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
                        <button class="text-gray-500 text-[13px] font-medium hover:text-red-600 transition-all duration-300 ease-in-out">
                            Clear all
                        </button>
                    </div>
                    <div class="mt-8 px-5">
                        <h1 class="text-center font-medium text-primary"><span class="text-[#0770e4]">{{ jobs.length }} Jobs</span> Available Now</h1>
                        <!-- Position -->
                        <p class="text-gray-600 mt-5 text-[15px] font-medium">Position</p>
                        <input type="select" placeholder="Select Position" 
                            class="bg-background w-full text-[13px] rounded-lg mt-2 text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out" 
                        />
                        <!-- Location -->
                        <p class="text-gray-600 mt-3 text-[15px] font-medium">Location</p>
                        <div class="flex flex-wrap gap-3 mt-3">
                            <div class="bg-background cursor-pointer text-[13px] rounded-lg text-gray-600 font-medium outline-none hover:ring-2 hover:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out">
                                India
                            </div>
                            <div class="bg-background cursor-pointer text-[13px] rounded-lg text-gray-600 font-medium outline-none hover:ring-2 hover:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out">
                                KSA
                            </div>
                            <div class="bg-background cursor-pointer text-[13px] rounded-lg text-gray-600 font-medium outline-none hover:ring-2 hover:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out">
                                Oman
                            </div>
                            <div class="bg-background cursor-pointer text-[13px] rounded-lg text-gray-600 font-medium outline-none hover:ring-2 hover:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out">
                                Kuwait
                            </div>
                            <div class="bg-background cursor-pointer text-[13px] rounded-lg text-gray-600 font-medium outline-none hover:ring-2 hover:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out">
                                UAE
                            </div>
                            <div class="bg-background cursor-pointer text-[13px] rounded-lg text-gray-600 font-medium outline-none hover:ring-2 hover:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out">
                                Qatar
                            </div>
                        </div>
                        <!-- Salary Type -->
                        <p class="text-gray-600 mt-5 text-[15px] font-medium">Salary</p>
                        <div class="flex gap-3">
                            <input type="select" placeholder="Salary Type" 
                                class="bg-background w-full text-[13px] rounded-lg mt-2 text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out" 
                            />
                            <input type="select" placeholder="Currency" 
                                class="bg-background w-full text-[13px] rounded-lg mt-2 text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out" 
                            />
                        </div> 
                        <Slider class="w-full mt-2"
                            label="Amount"
                            :min="0"
                            :max="10000"
                            :step="1"
                            v-model:minValue="minPrice"
                            v-model:maxValue="maxPrice"
                        />
                        <!-- Qualification -->
                        <p class="text-gray-600 mt-5 text-[15px] font-medium">Qualification</p>
                        <input type="select" placeholder="Select Qualification" 
                            class="bg-background w-full text-[13px] rounded-lg mt-2 text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out" 
                        /><div class="mt-5 flex gap-5 items-center justify-center">
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
                    <p class="font-medium ml-auto text-lg text-red-600">Showing {{ jobs.length }} jobs</p>
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
                <job-card :data=job @show-details="selectedJob = job" />
            </div>
        </div>
    </div>
</template>

<script setup>
import ProfileCard from '@/components/ProfileCard.vue';
import defaultImage from '@/assets/defaults/profile-image.jpeg';
import QuickLinkCard from '@/components/QuickLinkCard.vue';
import Avatar from '../components/Avatar.vue';
import UpArrowIcon from '@/components/icons/UpArrowIcon.vue';
import DownArrowIcon from '@/components/icons/DownArrowIcon.vue';
import DownIcon from '@/components/icons/DownIcon.vue';
import SponsoredCard from '@/components/SponsoredCard.vue';
import JobCard from '../components/JobCard.vue';
import RightIcon from '../components/icons/RightIcon.vue';

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

import Slider from '../components/Slider.vue';
import LeftIcon from '../components/icons/LeftIcon.vue';
const minSalary = ref(0)
const maxSalary = ref(10000)

</script>