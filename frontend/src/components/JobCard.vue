<template>
    <div class="mt-5 bg-white shadow-sm rounded-lg hover:shadow-md transition-all duration-300 ease-in-out px-5 py-3">
        <div class="grid grid-cols-12">
            <div class="col-span-10">
                <badge
                    class="relative inline-flex items-center overflow-hidden text-xs bg-[#ffebdb] rounded-lg px-3 py-1 text-[#e56700]"
                >
                    <span class="relative z-10 font-normal">
                        • {{ timeAgo(data.created_on) }}
                    </span>

                    <span
                        class="absolute top-0 left-0 h-full w-[50%] -translate-x-[150%] animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    ></span>
                </badge>
                <p class="text-xl font-medium text-primary mt-2 capitalize">{{ data.subject }}</p>
                <p class="text-[14px] text-gray-600 font-medium capitalize">{{ data.customer }}</p>
                <div class="text-[14px] text-gray-600 font-medium flex gap-1">
                    <img :src="data.custom_country_flag" class="h-5" />
                    <p>{{ data.territory }}</p>
                </div>
            
                <div class="border-t border-gray-300 my-3 mr-5">
                </div>
                <div class="flex items-center gap-3">
                    <div
                        class="group px-2 py-1 bg-[#f4f5f5] rounded-full flex items-center text-gray-800 w-fit cursor-pointer"
                        >
                        <suitcase-icon class="h-4 w-4 shrink-0" />

                        <p
                            class="text-sm font-medium text-gray-600 max-w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-w-[200px] group-hover:opacity-100"
                        >
                            &nbsp;Transport
                        </p>
                    </div>
                    <badge v-if="data.custom_free_recruitment == 'Yes'"
                        class="relative inline-flex items-center overflow-hidden text-xs bg-[#eef6fd] rounded-lg px-3 py-1 text-[#0770e4]"
                    >
                        <span class="relative z-10 font-normal flex gap-2 items-center">
                            <suitcase-icon class="h-4 w-4" />
                            Free Recruitment
                        </span>

                        <span
                            class="absolute top-0 left-0 h-full w-[50%] -translate-x-[150%] animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"
                        ></span>
                    </badge>
                    <badge v-if="data.food == 'Free'"
                        class="relative inline-flex items-center overflow-hidden text-xs bg-[#eef6fd] rounded-lg px-3 py-1 text-[#0770e4]"
                    >
                        <span class="relative z-10 font-normal flex gap-2 items-center">
                            <food-icon class="h-4 w-4" />
                            Free Food
                        </span>

                        <span
                            class="absolute top-0 left-0 h-full w-[50%] -translate-x-[150%] animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"
                        ></span>
                    </badge>
                    <badge v-if="data.food == 'Allowance'"
                        class="relative inline-flex items-center overflow-hidden text-xs bg-[#eef6fd] rounded-lg px-3 py-1 text-[#0770e4]"
                    >
                        <span class="relative z-10 font-normal flex gap-2 items-center">
                            <food-icon class="h-4 w-4" />
                            Food Allowance
                        </span>

                        <span
                            class="absolute top-0 left-0 h-full w-[50%] -translate-x-[150%] animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"
                        ></span>
                    </badge>
                    <badge v-if="data.accommodation == 'Free'"
                        class="relative inline-flex items-center overflow-hidden text-xs bg-[#eef6fd] rounded-lg px-3 py-1 text-[#0770e4]"
                    >
                        <span class="relative z-10 font-normal flex gap-2 items-center">
                            <accomodation-icon class="h-4 w-4" />
                            Accomodation Allowance
                        </span>

                        <span
                            class="absolute top-0 left-0 h-full w-[50%] -translate-x-[150%] animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"
                        ></span>
                    </badge>
                    <badge v-if="data.accommodation == 'Allowance'"
                        class="relative inline-flex items-center overflow-hidden text-xs bg-[#eef6fd] rounded-lg px-3 py-1 text-[#0770e4]"
                    >
                        <span class="relative z-10 font-normal flex gap-2 items-center">
                            <accomodation-icon class="h-4 w-4" />
                            Free Accommodation
                        </span>

                        <span
                            class="absolute top-0 left-0 h-full w-[50%] -translate-x-[150%] animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"
                        ></span>
                    </badge>

                    <button @click="showJobDetails=true"
                        class="flex items-center gap-2 font-medium pr-10 ml-auto text-[13px] text-gray-600 hover:text-primary"
                    >
                        Job details
                        <down-icon class="h-4 w-4" />
                    </button>
                </div>
            </div>
            <div class="col-span-2">
                <div>
                <p class="text-xl font-medium text-primary text-right">{{ data.currency }} <span class="text-2xl">{{ data.amount  }}</span></p>
                <!-- <p class="text-xl font-medium text-primary text-right">In INR?<span class="text-2xl">{{ data.amount_inr  }}</span></p> -->
                <button class="mt-16 text-center w-full bg-primary py-2 rounded-xl text-white text-[14px] font-medium">Apply Now</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Overlay -->
    <div
        v-if="showJobDetails"
            class="fixed inset-0 bg-black/40 z-40"
            @click="showJobDetails = false"
        >
    </div>
    <!-- Sidebar -->
    <transition
        enter-active-class="transform transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transform transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
    >
        <div
            v-if="showJobDetails"
            class="fixed top-0 right-0 h-full w-[500px] bg-white shadow-2xl z-50 rounded-l-xl transform-gpu"
        >
            <!-- Header -->
            <div class="flex items-center justify-between px-5 py-4 border-b">
                <p class="text-2xl font-medium text-primary">
                    Job details - <span>{{ data.name }}</span>
                </p>

                <button
                    @click="showJobDetails = false"
                    class="text-gray-500 hover:text-black"
                >
                    ✕
                </button>
            </div>

            <!-- Content -->
            <div class="p-5 overflow-y-auto h-[calc(100%-70px)]">
                <p class="text-xl font-semibold text-primary">{{ data.subject }}</p>
                <p class="mt-1 text-gray-600">{{ data.customer }}</p>
                
                <div class="text-[14px] text-gray-600 font-medium flex gap-1">
                    <img :src="data.custom_country_flag" class="h-5" />
                    <p>{{ data.territory }}</p>
                </div>
                <div class="flex gap-3 mt-2">
                    <badge
                        class="relative overflow-hidden text-xs bg-[#ffebdb] rounded-lg px-3 py-1 text-[#e56700]"
                    >
                        <span class="relative z-10 font-normal">• {{ timeAgo(data.created_on) }}</span>

                        <span
                            class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
                        ></span>
                    </badge>
                    <badge v-if="data.custom_free_recruitment == 'Yes'"
                        class="relative overflow-hidden text-xs bg-[#eef6fd] rounded-lg px-3 py-1 text-[#0770e4]"
                    >
                        <span class="relative z-10 font-normal flex gap-2 items-center">
                            <suitcase-icon class="w-4 h-4" /> 
                            Free Recruitment</span>

                        <span
                            class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
                        ></span>
                    </badge>
                    <badge v-if="data.food == 'Free'"
                        class="relative overflow-hidden text-xs bg-[#eef6fd] rounded-lg px-3 py-1 text-[#0770e4]"
                    >
                        <span class="relative z-10 font-normal flex gap-2 items-center">
                            <food-icon class="w-4 h-4" /> 
                            Free Food</span>

                        <span
                            class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
                        ></span>
                    </badge>
                    <badge v-if="data.food == 'Allowance'"
                        class="relative overflow-hidden text-xs bg-[#eef6fd] rounded-lg px-3 py-1 text-[#0770e4]"
                    >
                        <span class="relative z-10 font-normal flex gap-2 items-center">
                            <food-icon class="w-4 h-4" /> 
                            Free Allowance</span>

                        <span
                            class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
                        ></span>
                    </badge>
                </div>
                

                
            </div>
        </div>
    </transition>
</template>

<script setup>
import DownIcon from '@/components/icons/DownIcon.vue';
import { timeAgo } from '@/utils/date'

defineProps({
    data: {
        type: Object,
        required: true
    }
})

import { ref, watch, onUnmounted } from 'vue'
import SuitcaseIcon from './icons/SuitcaseIcon.vue';
import FoodIcon from './icons/FoodIcon.vue';
import AccomodationIcon from './icons/AccomodationIcon.vue';
const showJobDetails = ref(false)

watch(showJobDetails, (value) => {
    document.body.style.overflow = value ? 'hidden' : ''
})
onUnmounted(() => {
    document.body.style.overflow = ''
})

</script>
