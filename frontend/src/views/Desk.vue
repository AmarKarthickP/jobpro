<template>
    <!-- Navabar -->
    <div class="bg-white py-2 flex justify-center w-full shadow-sm">
        <div class="flex gap-10 items-center justify-center">
            <img src="@/assets/logo/teampro.png" class="h-6" />
            <!-- Search-box -->
            <div class="w-[350px]">
                <div class="flex border-2 border-default hover:bg-hoverbg rounded-full px-3 w-[200px] focus-within:w-full transition-all duration-500 ease-in-out">
                    <svg class="w-5 text-primary"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input class="outline-none bg-transparent rounded-full pl-2 h-8 text-sm w-[90%]"
                        placeholder="Search" 
                    />
                </div>
            </div>
        <router-link to="/home"
            class="flex flex-col items-center text-default hover:text-primary transition-all duration-500 ease-in-out"
            exact-active-class="text-primary"
        >
            <home-icon class="h-7 w-7"/>
            <p class="text-[12px] font-medium">Home</p>
        </router-link>
        <router-link to="/dashboard"
            class="flex flex-col items-center text-default hover:text-primary transition-all duration-500 ease-in-out"
            exact-active-class="text-primary"
        >
            <dasboard-icon class="h-7 w-7 pt-1" />
            <p class="text-[12px] font-medium">Dashboard</p>
        </router-link>
        <router-link to="/jobs"
            class="flex flex-col items-center text-default hover:text-primary transition-all duration-500 ease-in-out"
            exact-active-class="text-primary"
        >
            <job-icon class="h-7 w-7 pt-1" />
            <p class="text-[12px] font-medium">Jobs</p>
        </router-link>
        <router-link to="/messaging"
            class="flex flex-col items-center text-default hover:text-primary transition-all duration-500 ease-in-out"
            exact-active-class="text-primary"
        >
            <messaging-icon class="h-7 w-7 pt-1" />
            <p class="text-[12px] font-medium">Messaging</p>
        </router-link>
        <router-link to="/notifications"
            class="flex flex-col items-center text-default hover:text-primary transition-all duration-500 ease-in-out"
            exact-active-class="text-primary"
        >
            <notification-icon class="h-7 w-7 pt-1" />
            <p class="text-[12px] font-medium">Notifications</p>
        </router-link>
        <router-link to="/profile">
            <div class="flex flex-col items-center text-primary pr-10">
                <img src="../assets/defaults/profile-image.jpeg" alt="user-image"
                    class="h-7 w-7 rounded-full"
                />
                <p class="text-[12px] font-medium">Me</p>
            </div>
        </router-link>
        <router-link to="/home">
            <div class="flex flex-col items-center text-primary pr-10">
                <img src="../assets/logo/jobpro.png" alt="jobpro"
                    class="h-14 w-14"
                />
            </div>
        </router-link>
        </div>
    </div>
    <div class="mx-28 mt-6">
        <router-view />
    </div>
</template>

<script setup>
import DasboardIcon from '@/components/icons/DasboardIcon.vue';
import HomeIcon from '@/components/icons/HomeIcon.vue'
import JobIcon from '@/components/icons/JobIcon.vue';
import MessagingIcon from '@/components/icons/MessagingIcon.vue';
import NotificationIcon from '@/components/icons/NotificationIcon.vue';
</script>