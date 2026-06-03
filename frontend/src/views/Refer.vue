<template>
    <div class="-mx-16">
    <div class="flex items-center gap-3 mb-5 pl-3">
        <Transition :name="transitionName" mode="out-in">
    <SidebarIcon
        v-if="!sidebarOpen"
        key="open"
        @click="sidebarOpen = true"
        class="w-6 h-6 text-primary cursor-pointer"
        title="open sidebar"
    />

    <SidebarCloseIcon
        v-else
        key="close"
        @click="sidebarOpen = false"
        class="w-6 h-6 text-primary cursor-pointer"
        title="close sidebar"
    />
</Transition>

        <h1 class="text-2xl font-medium text-primary">
            {{ pageTitle }}
        </h1>
    </div>

    <div class="flex md:gap-5">
        <!-- Sidebar -->
        <aside
            class="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            :class="sidebarOpen ? 'w-60 opacity-100' : 'w-0 opacity-0'"
        >
            <div class="w-60 flex flex-col gap-2 text-[14.5px]">
                <!-- Dashboard -->
                <router-link
                    :to="{ name: 'refer-dashboard' }"
                    :class="navClass(route.name === 'refer-dashboard')"
                >
                    <DashboardIcon class="w-6 h-6" />
                    <p class="font-medium whitespace-nowrap">Dashboard</p>
                </router-link>

                <!-- Refer Candidate -->
                <router-link
                    :to="{ name: 'refer-candidate' }"
                    :class="navClass(route.name === 'refer-candidate')"
                >
                    <BranchIcon class="w-6 h-5" />
                    <p class="font-medium whitespace-nowrap">
                        Refer Candidate
                    </p>
                </router-link>

                <!-- Open Vacancy -->
                <router-link
                    :to="{ name: 'open-vacancy' }"
                    :class="navClass(route.name === 'open-vacancy')"
                >
                    <JobIcon class="w-6 h-6" />
                    <p class="font-medium whitespace-nowrap">
                        Open Vacancy
                    </p>
                </router-link>

                <!-- Claim Status -->
                <router-link
                    :to="{ name: 'claim-status' }"
                    :class="navClass(route.name === 'claim-status')"
                >
                    <InrIcon class="w-6 h-6" />
                    <p class="font-medium whitespace-nowrap">
                        Claim Status
                    </p>
                </router-link>

                <!-- Bank Details -->
                <router-link
                    :to="{ name: 'bank-details' }"
                    :class="navClass(route.name === 'bank-details')"
                >
                    <BankIcon class="w-6 h-5" />
                    <p class="font-medium whitespace-nowrap">
                        Bank Details
                    </p>
                </router-link>

                <!-- Terms -->
                <router-link
                    :to="{ name: 'terms' }"
                    :class="navClass(route.name === 'terms')"
                >
                    <TermsIcon class="w-6 h-5" />
                    <p class="font-medium whitespace-nowrap">
                        Terms & Conditions
                    </p>
                </router-link>
            </div>
        </aside>

        <!-- Content -->
        <main
            class="flex-1 bg-primary/5 h-[80vh] rounded-xl p-10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-auto hide-scrollbar"
        >
            <router-view />
        </main>
    </div>
    </div>
</template>

<script setup>
// Vue
import { computed, ref } from 'vue'
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

const sidebarOpen = ref(true)

const transitionName = computed(() =>
    sidebarOpen.value ? "sidebar-close" : "sidebar-open"
);

const route = useRoute()

const navClass = (isActive) => {
    return `
        flex items-center gap-2 rounded-md py-2 px-3 cursor-pointer
        transition-all duration-300 ease-in-out
        ${
            isActive
                ? 'text-primary bg-primary/5'
                : 'text-gray-500 hover:bg-gray-50 hover:text-primary'
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

<style scoped>
/* Open Sidebar */
/* Hamburger -> Close */
.sidebar-open-enter-active,
.sidebar-open-leave-active {
    transition: all 0.3s ease;
}

.sidebar-open-enter-from {
    opacity: 0;
    transform: scale(1) rotate(0deg);
    transform: scale(0.75) rotate(90deg);
}

.sidebar-open-enter-to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
}

.sidebar-open-leave-from {
    opacity: 1;
    transform: scale(1) rotate(0deg);
}

.sidebar-open-leave-to {
    opacity: 0;
    transform: scale(0.75) rotate(-90deg);
}

/* Close Sidebar */
/* Close -> Hamburger */
.sidebar-close-enter-active,
.sidebar-close-leave-active {
    transition: all 0.3s ease;
}

.sidebar-close-enter-from {
    opacity: 0;
    transform: scale(0.75) rotate(-90deg);
}

.sidebar-close-enter-to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
}

.sidebar-close-leave-from {
    opacity: 1;
    transform: scale(1) rotate(0deg);
}

.sidebar-close-leave-to {
    opacity: 0;
    transform: scale(0.75) rotate(90deg);
}
</style>