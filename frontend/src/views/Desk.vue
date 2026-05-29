<template>
  <!-- Navabar -->
  <div class="bg-white py-2 flex justify-center w-full shadow-sm sticky top-0 z-30">
    <div class="flex gap-5 md:gap-10 relative items-center w-full md:justify-center mx-5 md:mx-0 pt-5 md:pt-0">
      <router-link to="/home" class="md:hidden w-[80px]">
        <img src="../assets/logo/jobpro.png" alt="jobpro" />
      </router-link>

      <router-link to="/home" class="hidden md:block">
        <img src="@/assets/logo/teampro.png" class="h-6 z-30" />
      </router-link>
      <!-- extra spacing -->
      <div class="md:min-w-[80px]"></div>
      <router-link to="/home" v-slot="{ isActive }" class="hidden md:block">
        <div :class="navClass(isActive)">
          <home-icon class="h-7 w-7 pt-1" />
          <p class="text-[12px] font-medium">Home</p>
        </div>
      </router-link>
      <router-link
        to="/dashboard"
        v-if="auth.isLoggedIn"
        v-slot="{ isActive }"
        class="hidden md:block"
      >
        <div :class="navClass(isActive)">
          <dasboard-icon class="h-7 w-7 pt-1" />
          <p class="text-[12px] font-medium">Dashboard</p>
        </div>
      </router-link>
      <router-link to="/jobs" v-slot="{ isActive }" class="hidden md:block">
        <div :class="navClass(isActive)">
          <job-icon class="h-7 w-7 pt-1" />
          <p class="text-[12px] font-medium">Jobs</p>
        </div>
      </router-link>
      <router-link
        to="/activity"
        v-slot="{ isActive }"
        class="hidden md:block"
        v-if="auth.isLoggedIn"
      >
        <div :class="navClass(isActive)">
          <activity-icon class="h-7 w-7 pt-1" />
          <p class="text-[12px] font-medium">Activity</p>
        </div>
      </router-link>
      <router-link
        v-if="auth.isLoggedIn"
        to="/refer"
        v-slot="{ isActive }"
        class="hidden md:block"
      >
        <div :class="navClass(isActive)">
          <refer-icon class="h-7 w-7 pt-1" />
          <p class="text-[12px] font-medium">Refer</p>
        </div>
      </router-link>
      <router-link to="/notifications" v-slot="{ isActive }" class="hidden md:block">
        <div :class="navClass(isActive)">
          <notification-icon class="h-7 w-7 pt-1" />
          <p class="text-[12px] font-medium">Alerts</p>
        </div>
      </router-link>
      <div
        v-if="auth.isLoggedIn"
        class="relative"
        @click="viewProfileMenu = true"
        v-click-outside="() => (viewProfileMenu = false)"
      >
        <button to="/profile" class="hidden md:block">
          <div class="flex flex-col items-center text-primary">
            <avatar :img="userData" class="h-7 w-7 rounded-full" />
            <div class="flex">
              <p class="text-[12px] font-medium">Me</p>
              <down-icon class="h-4 w-4 mt-0.5" />
            </div>
          </div>
        </button>
      </div>
      <div class="ml-auto md:mr-10 md:-ml-2">
        <div
          @click="openYoutube"
          class="flex flex-col text-[#ff0000] items-center transition-all duration-500 ease-in-out cursor-pointer"
        >
          <youtube-icon class="h-7 w-7 md:pt-1" />
          <p class="text-[12px] font-medium hidden md:block">Youtube</p>
        </div>
      </div>
      <button
        v-if="!auth.isLoggedIn"
        @click="goToLogin"
        class="bg-primary w-[100px] md:w-[120px] rounded-xl text-white text-sm md:px-8 py-[7px] md:py-2 hover:opacity-50"
      >
        Sign In
      </button>
      <!-- Task AI -->
      <router-link v-if="auth.isLoggedIn" to="/task_ai">
        <!-- <task-a-i-button /> -->
        <img src="@/assets/logo/task_ai.png" class="h-9 md:h-10 -mt-1" />
      </router-link>
      <router-link to="/home" class="hidden md:block">
        <div class="flex flex-col items-center text-primary">
          <img src="../assets/logo/jobpro.png" alt="jobpro" class="w-16" />
        </div>
      </router-link>
    </div>
  </div>
  <div class="mx-5 md:mx-28 mt-6">
    <router-view />
  </div>

  <!-- Profiel Menu -->
  <transition
    enter-active-class="transition duration-400 ease-out"
    enter-from-class="opacity-0 -translate-y-2 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-98"
    leave-to-class="opacity-0 -translate-y-2 scale-100"
  >
    <div
      v-show="viewProfileMenu"
      class="bg-white fixed top-[75px] right-[30%] w-[300px] px-5 pt-5 pb-3 rounded-lg shadow-md shadow-gray-400 z-50"
    >
      <div class="flex gap-2 mb-3 items-center">
        <avatar :img="userData" class="h-10 w-10 rounded-full" />
        <div>
          <p class="font-medium text-md">{{ user.fullName }}</p>
        </div>
      </div>
      <router-link
        to="/profile"
        class="border border-primary rounded-full w-full text-center flex items-center py-1 box-border hover:bg-[#ebf4fd] hover:ring-1 hover:ring-primary transition-all duration-500 ease-in-out"
      >
        <p class="text-[14px] text-primary font-medium w-full">View Profile</p>
      </router-link>

      <div class="border-t border-gray-300 flex my-3"></div>
      <button
        @click="handleSignOut"
        class="text-gray-600 hover:text-red-600 text-[14px] transition-all duration-300 ease-in-out"
      >
        Sign out
      </button>
    </div>
  </transition>

  <!-- Bottom Navbar (Mobile) -->
  <div class="bg-white fixed bottom-0 left-0 w-full flex justify-evenly py-2 z-30 md:hidden border-t shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
    <router-link to="/home" v-slot="{ isActive }">
        <div :class="navClass(isActive)">
          <home-icon class="h-7 w-7" />
          <p class="text-[12px] font-medium">Home</p>
        </div>
      </router-link>
      <router-link to="/jobs" v-slot="{ isActive }">
        <div :class="navClass(isActive)">
          <job-icon class="h-7 w-7" />
          <p class="text-[12px] font-medium">Jobs</p>
        </div>
      </router-link>
      <router-link
        to="/activity"
        v-slot="{ isActive }"
    
        v-if="auth.isLoggedIn"
      >
        <div :class="navClass(isActive)">
          <activity-icon class="h-7 w-7" />
          <p class="text-[12px] font-medium">Activity</p>
        </div>
      </router-link>
      <router-link
        v-if="auth.isLoggedIn"
        to="/refer"
        v-slot="{ isActive }"
    
      >
        <div :class="navClass(isActive)">
          <refer-icon class="h-7 w-7" />
          <p class="text-[12px] font-medium">Refer</p>
        </div>
      </router-link>
      <div
        v-if="auth.isLoggedIn"
        class="relative"
        @click="viewProfileMenu = true"
        v-click-outside="() => (viewProfileMenu = false)"
      >
        <button to="/profile">
          <div class="flex flex-col items-center text-primary">
            <avatar :img="userData" class="h-7 w-7 rounded-full" />
          <p class="text-[12px] font-medium">Me</p>
          </div>
        </button>
      </div>
  </div>
</template>

<script setup>
import DasboardIcon from "@/components/icons/DasboardIcon.vue";
import HomeIcon from "@/components/icons/HomeIcon.vue";
import JobIcon from "@/components/icons/JobIcon.vue";
import MessagingIcon from "@/components/icons/MessagingIcon.vue";
import NotificationIcon from "@/components/icons/NotificationIcon.vue";
import Avatar from "@/components/Avatar.vue";
import YoutubeIcon from "@/components/icons/YoutubeIcon.vue";

const goToLogin = () => {
  window.location.replace("/login");
};

import { computed, ref } from "vue";
import { auth } from "@/data/auth";
import { user } from "@/data/user";

const userData = computed(() => ({
  src: user.image,
  alt: "profile",
  bio: user.bio,
}));

function handleSignOut() {
  localStorage.clear();
  sessionStorage.clear();

  window.location.replace("/logout");
}

const viewProfileMenu = ref(false);

import clickOutside from "@/directives/clickOutside";
import DownIcon from "../components/icons/DownIcon.vue";
import router from "../router";
import ActivityIcon from "../components/icons/ActivityIcon.vue";
import ReferIcon from "../components/icons/ReferIcon.vue";
import TaskAIButton from "../components/TaskAIButton.vue";
const vClickOutside = clickOutside;

const navClass = (isActive) => [
  "flex flex-col items-center transition-all duration-500 ease-in-out",
  isActive ? "text-primary" : "text-default hover:text-primary",
];

const openYoutube = () => {
  if (typeof window !== "undefined") {
    window.open("https://www.youtube.com/@JOBPROTEAMPRO/shorts", "_blank");
  }
};
</script>
