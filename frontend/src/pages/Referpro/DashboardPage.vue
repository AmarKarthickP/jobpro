<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
        <div
            v-for="card in stats"
            :key="card.label"
            class="bg-white cursor-default rounded-xl hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4 p-3"
        >
            <div
                :class="[card.bg, 'rounded-full p-3 flex items-center justify-center']"
            >
                <component
                    :is="card.icon"
                    :class="[card.color, 'w-6 h-6']"
                />
            </div>

            <div>
                <p class="text-gray-500 text-sm font-medium">
                    {{ card.label }}
                </p>

                <h1 class="font-semibold text-lg text-primary">
                    {{ card.value }}
                </h1>
            </div>
        </div>
    </div>
    <!-- Guide Section -->
    <div class="grid grid-cols-12 mt-8 gap-5">
        <div class="col-span-8 bg-white rounded-xl p-5">
            <div class="flex">
                <h2 class="text-primary text-[16px] font-medium mb-3">
                    Turn referrals into rewards with <span class="text-highlight">REFERPRO</span>
                </h2>
                <img src="@/assets/logo/teampro.png" class="h-6 ml-auto" />
                <img src="@/assets/logo/jobpro.png" class="h-6 ml-2" />
            </div>
            <div class="flex items-center py-8 overflow-x-auto hide-scrollbar">
                <template v-for="(step, index) in steps" :key="step.title">
                    <div class="flex flex-col items-center text-center min-w-[200px]">
                        <div :class="[step.bg, 'p-3 rounded-full mb-3']">
                            <component
                                :is="step.icon"
                                :class="[step.color, 'w-6 h-6']"
                            />
                        </div>

                        <h2 class="text-[13px] font-medium text-primary">
                            {{ step.title }}
                        </h2>

                        <p class="text-gray-500 text-xs mt-1">
                            {{ step.description }}
                        </p>
                    </div>
                    
                    <div
                        v-if="index < steps.length - 1"
                        class="h-px min-w-[60px] flex-1 bg-primary/20"
                    />
                </template>
            </div>
        </div>
        <!-- Invite Friends Section -->
        <div class="col-span-4 bg-white rounded-xl p-5 flex flex-col">
            <h2 class="font-semibold text-primary">
                Invite Friends!
            </h2>

            <p class="text-[14px] mt-3 font-medium text-primary/90">
                At <span class="text-highlight">REFERPRO</span>, we believe in the
                power of connections! Now you can help your friends find their dream
                jobs and earn rewards in the process.
            </p>

            <div class="mt-auto">
                <button
                    class="bg-primary text-[14px] w-full hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                >
                    Invite Friends
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
// icons
import StarShineIcon from '@/components/icons/StarShineIcon.vue'
import InrIcon from '@/components/icons/InrIcon.vue'
import BranchIcon from '@/components/icons/BranchIcon.vue'
import JobIcon from '@/components/icons/JobIcon.vue'
import AddUserIcon from '@/components/icons/AddUserIcon.vue'
import StarIcon from '@/components/icons/StarIcon.vue'
import SendIcon from '@/components/icons/SendIcon.vue'

const stats = [
    {
        label: 'Earnables',
        value: '₹ 5,000 /-',
        icon: InrIcon,
        color: 'text-green-600',
        bg: 'bg-green-100'
    },
    {
        label: 'Referrals',
        value: '5',
        icon: BranchIcon,
        color: 'text-blue-600',
        bg: 'bg-blue-100'
    },
    {
        label: 'Points',
        value: '500',
        icon: StarShineIcon,
        color: 'text-orange-600',
        bg: 'bg-orange-100'
    },
    {
        label: 'Received',
        value: '₹ 0 /-',
        icon: InrIcon,
        color: 'text-green-600',
        bg: 'bg-green-100'
    },
    {
        label: 'Outstanding',
        value: '₹ 0 /-',
        icon: InrIcon,
        color: 'text-green-600',
        bg: 'bg-green-100'
    },
]
const steps = [
    {
        title: 'Send a Invitation',
        description: 'Fill out the referral form',
        icon: SendIcon,
        bg: 'bg-primary/5',
        color: 'text-primary'
    },
    {
        title: 'Registration',
        description: 'Candidate completes registration',
        icon: AddUserIcon,
        bg: 'bg-blue-100',
        color: 'text-blue-600'
    },
    {
        title: 'Review',
        description: 'Profile is reviewed by recruiters',
        icon: StarIcon,
        bg: 'bg-yellow-100',
        color: 'text-yellow-600'
    },
    {
        title: 'Placement',
        description: 'Candidate gets hired',
        icon: JobIcon,
        bg: 'bg-orange-100',
        color: 'text-orange-600'
    },
    {
        title: 'Get Rewarded',
        description: 'Receive your referral reward',
        icon: InrIcon,
        bg: 'bg-green-100',
        color: 'text-green-600'
    }
]
</script>