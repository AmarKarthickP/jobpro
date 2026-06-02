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

                <h1 class="font-semibold text-lg text-gray-800">
                    {{ card.value }}
                </h1>
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
        color: 'text-emerald-600',
        bg: 'bg-emerald-100'
    },
    {
        label: 'Outstanding',
        value: '₹ 0 /-',
        icon: InrIcon,
        color: 'text-emerald-600',
        bg: 'bg-emerald-100'
    },
]
</script>