<template>
    <div class="flex items-center gap-3 mb-5">
        <sidebar-icon class="w-6 h-6 text-primary" />
        <sidebar-close-icon class="w-6 h-6 text-primary" />
        <h1 class="text-2xl font-medium text-primary">{{ pageTitle }}</h1>
    </div>

    <div class="grid grid-cols-12 gap-5">
        <!-- Sidebar -->
        <div class="col-span-2 flex flex-col gap-2 text-[14.5px]">

            <!-- Dashboard -->
            <router-link
                :to="{ name: 'refer-dashboard' }"
                :class="navClass(route.name === 'refer-dashboard')"
            >
                <dashboard-icon class="w-6 h-6" />
                <p class="font-medium">Dashboard</p>
            </router-link>

            <!-- Refer Candidate -->
            <router-link
                :to="{ name: 'refer-candidate' }"
                :class="navClass(route.name === 'refer-candidate')"
            >
                <branch-icon class="w-6 h-5" />
                <p class="font-medium">Refer Candidate</p>
            </router-link>

            <!-- Open Vacancy -->
            <router-link
                :to="{ name: 'open-vacancy' }"
                :class="navClass(route.name === 'open-vacancy')"
            >
                <job-icon class="w-6 h-6" />
                <p class="font-medium">Open Vacancy</p>
            </router-link>

            <!-- Claim Status -->
            <router-link
                :to="{ name: 'claim-status' }"
                :class="navClass(route.name === 'claim-status')"
            >
                <inr-icon class="w-6 h-6" />
                <p class="font-medium">Claim Status</p>
            </router-link>

            <!-- Bank Details -->
            <router-link
                :to="{ name: 'bank-details' }"
                :class="navClass(route.name === 'bank-details')"
            >
                <bank-icon class="w-6 h-5" />
                <p class="font-medium">Bank Details</p>
            </router-link>

            <!-- Terms -->
            <router-link
                :to="{ name: 'terms' }"
                :class="navClass(route.name === 'terms')"
            >
                <terms-icon class="w-6 h-5" />
                <p class="font-medium">Terms</p>
            </router-link>

        </div>

        <!-- Content -->
        <div class="col-span-10 bg-white h-[80vh] rounded-xl p-5 transition-all duration-300 ease-in-out">
            <router-view />
        </div>
    </div>
</template>

<script setup>
// Vue
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Icons
import SidebarIcon from '../components/icons/SidebarIcon.vue'
import SidebarCloseIcon from '../components/icons/SidebarCloseIcon.vue'
import DashboardIcon from '../components/icons/DashboardIcon.vue'
import JobIcon from '../components/icons/JobIcon.vue'
import InrIcon from '../components/icons/InrIcon.vue'
import BankIcon from '../components/icons/BankIcon.vue'
import TermsIcon from '../components/icons/TermsIcon.vue'
import BranchIcon from '../components/icons/BranchIcon.vue'

const route = useRoute()

const navClass = (isActive) => {
    return `
        flex items-center gap-2 rounded-md py-1.5 px-3 cursor-pointer
        transition-all duration-300 ease-in-out
        ${
            isActive
                ? 'text-primary hover:bg-white'
                : 'text-gray-500 hover:bg-white hover:text-primary'
        }
    `
}

const pageTitle = computed(() => {
    const titles = {
        'refer-dashboard': 'Dashboard',
        'refer-candidate': 'Refer Candidate',
        'open-vacancy': 'Open Vacancy',
        'claim-status': 'Claim Status',
        'bank-details': 'Bank Details',
        'terms': 'Terms & Conditions',
    }

    return titles[route.name] || 'ReferPRO'
})
</script>