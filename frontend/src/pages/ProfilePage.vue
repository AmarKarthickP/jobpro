<template>
    <div class="grid grid-cols-12 gap-6">
        <div class="col-span-9 bg-white rounded-xl shadow-sm relative">
            <div ref="profileCard" class="relative rounded-t-xl overflow-hidden">
                <div class="absolute inset-x-0 top-0 h-2/5 bg-primary text-white pr-10 pt-5">
                    <!-- Background -->
                </div>
                <div class="relative flex items-center py-10">
                    <Avatar :img="userData" class="h-40 w-40 border-4 border-white ml-10 " />
                    <div class="flex  text-white absolute top-12 left-[240px]">
                        <p class="font-semibold text-[25px]">{{ userData.fullName }}</p>
                        <edit-icon class="h5 w-5 ml-4 mt-1" />
                    </div>
                    <div class="flex justify-start items-center gap-10 ml-10 mt-20">
                        <div>
                            <p class="text-[15px] mt-1.5 text-primary font-medium flex gap-3 items-center">
                                <location-icon class="h-4 w-4 text-gray-500" />
                                Tamil Nadu, India
                            </p>
                            <p class="text-[15px] mt-1.5 text-primary font-medium flex gap-3 items-center">
                                <suitcase-icon class="h-4 w-4 text-gray-500" />
                                2 Years
                            </p>
                            <p class="text-[15px] mt-1.5 text-primary font-medium flex gap-3 items-center">
                                <wallet-icon class="h-4 w-4 text-gray-500" />
                                20,000
                            </p>
                        </div>
                        <div class="border-l border-gray-500 pl-10">
                            <p class="text-[15px] mt-1.5 text-primary font-medium flex gap-3 items-center">
                                <phone-icon class="h-4 w-4 text-gray-500" />
                                {{ userData.mobile_no }}
                            </p>
                            <p class="text-[15px] mt-1.5 text-primary font-medium flex gap-3 items-center">
                                <mail-icon class="h-4 w-4 text-gray-500" />
                                {{ userData.email }}
                            </p>
                            <p class="text-[15px] mt-1.5 text-primary font-medium flex gap-3 items-center">
                                <calendar-icon class="h-4 w-4 text-gray-500" />
                                1 Month
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-3 bg-white rounded-xl shadow-sm p-5">
            hi
        </div>
    </div>

    <div class="grid grid-cols-12 gap-6 mt-6">
        <div class="col-span-3 ">
            <quick-link-card :showProfile="showProfile" class="sticky top-24" />
        </div>
        <div class="col-span-9">
            <div class=" bg-white rounded-xl shadow-sm p-5">
                <h1 class="font-semibold text-primary">Resume</h1>
                <div class="border-2 border-dashed border-gray-500 text-center rounded-lg flex justify-center items-center gap-4 mt-5">
                    <div class="py-5">
                        <button class="border border-[#275df5] px-5 py-1.5 font-medium text-[14px] rounded-full text-[#275df5]">
                            Attach Resume
                        </button>
                        <p class="text-sm font-medium text-gray-500 mt-2">
                            Supported Formats: doc, docx, rtf, pdf, upto 2 MB
                        </p>
                    </div>
                </div>
            </div>
            <!-- Personal Details -->
            <div class=" bg-white rounded-xl shadow-sm p-5 mt-6">
                <div class="flex">
                    <h1 class="font-semibold text-primary">Personal Details</h1>
                    <button class="text-primary ml-auto font-medium text-[#275df5]">
                        Add personal details
                    </button>
                </div>
                <div class="text-gray-500 font-medium text-[13px] mt-2">
                    This information is important for employers to know you better
                </div>
            </div>
            <!-- Contact Details -->
            <div class=" bg-white rounded-xl shadow-sm p-5 mt-6">
                <div class="flex">
                    <h1 class="font-semibold text-primary">Contact Details</h1>
                    <button class="text-primary ml-auto font-medium text-[#275df5]">
                        Add contact details
                    </button>
                </div>
                <div class="text-gray-500 font-medium text-[13px] mt-2">
                    Add a contact details so that recruiters can reach you
                </div>
            </div>
            <!-- Education Details -->
            <div class=" bg-white rounded-xl shadow-sm p-5 mt-6">
                <div class="flex">
                    <h1 class="font-semibold text-primary">Education Details</h1>
                    <button class="text-primary ml-auto font-medium text-[#275df5]">
                        Add education details
                    </button>
                </div>
                <div class="text-gray-500 font-medium text-[13px] mt-2">
                    Add your education details to showcase your qualifications
                </div>
            </div>
            <!-- Experience Details -->
            <div class=" bg-white rounded-xl shadow-sm p-5 mt-6">
                <div class="flex">
                    <h1 class="font-semibold text-primary">Experience Details</h1>
                    <button class="text-primary ml-auto font-medium text-[#275df5]">
                        Add experience details
                    </button>
                </div>
                <div class="text-gray-500 font-medium text-[13px] mt-2">
                    Add your experience details to showcase your professional background
                </div>
            </div>
            <!-- Passport Details -->
            <div class=" bg-white rounded-xl shadow-sm p-5 mt-6">
                <div class="flex">
                    <h1 class="font-semibold text-primary">Passport Details</h1>
                    <button class="text-primary ml-auto font-medium text-[#275df5]">
                        Add passport details
                    </button>
                </div>
                <div class="text-gray-500 font-medium text-[13px] mt-2">
                    Add your passport details to verify your identity and facilitate international job opportunities
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// vue
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';

// Data
import { user } from '@/data/user'
import { getCandidate } from '@/data/candidate'

// Icons
import Avatar from '../components/Avatar.vue';
import EditIcon from '../components/icons/EditIcon.vue';
import PhoneIcon from '../components/icons/PhoneIcon.vue';
import MailIcon from '../components/icons/MailIcon.vue';
import CalendarIcon from '../components/icons/CalendarIcon.vue';
import LocationIcon from '../components/icons/LocationIcon.vue';
import SuitcaseIcon from '../components/icons/SuitcaseIcon.vue';
import WalletIcon from '../components/icons/WalletIcon.vue';

// Components
import QuickLinkCard from '../components/QuickLinkCard.vue';

// Declarations
const showProfile = ref(false)
const profileCard = ref(null)
const candidate = ref(null)

// Dynamic data
const userData = computed(() => ({
    src: user.image,
    alt: 'profile',
    fullName: user.fullName,
    email: user.email,
    mobile_no: user.mobileNo,
}))


let observer = null

onMounted(async () => {
    observer = new IntersectionObserver(
        ([entry]) => {
            // If div is NOT visible
            showProfile.value = !entry.isIntersecting
        },
        {
            threshold: 0.5
        }
    )

    if (profileCard.value) {
        observer.observe(profileCard.value)
    }
})

onBeforeUnmount(() => {
    if (observer && profileCard.value) {
        observer.unobserve(profileCard.value)
    }
})

watch(
    () => user.email,
    async (email) => {
        if (!email) return

        candidate.value = await getCandidate(email)
    },
    { immediate: true }
)
</script>
