<template>
    <div class="flex">
        <img src="../assets/icons/nexara_ai.gif" alt="nexara-logo" class="w-20 mix-blend-darken top-0.5 absolute" />

        <h4 class="font-medium text-xl pl-16 text-[#1b2133]">
            Nexara
        </h4>
        <h1 class="text-xl font-medium bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent">
            .ai
        </h1>

        <div class="flex gap-1 pl-6">
            <div v-show="!showSidebar" @click="showSidebar=true" class="cursor-pointer hover:bg-white hover:rounded-md p-1 transition-all duration-300 ease-in-out">
                <img src="../assets/icons/sidebar.png" alt="side-bar" class="h-5" />
            </div>

            <div v-show="showSidebar" @click="showSidebar=false" class="cursor-pointer hover:bg-white hover:rounded-md p-1 transition-all duration-300 ease-in-out">
                <img src="../assets/icons/sidebar-close.png" alt="side-bar" class="h-5" />
            </div>

            <router-link to="chat" class="cursor-pointer hover:bg-white hover:rounded-md p-1 transition-all duration-300 ease-in-out">
                <img src="../assets/icons/home.png" alt="side-bar" class="h-5" />
            </router-link>

            <div v-show="!showDropdown" @click="showDropdown=!showDropdown" class="cursor-pointer hover:bg-white hover:rounded-md p-1 transition-all duration-300 ease-in-out">
                <img src="../assets/icons/down.png" alt="side-bar" class="h-5" />
            </div>

            <div v-show="showDropdown" @click="showDropdown=!showDropdown" class="cursor-pointer hover:bg-white hover:rounded-md p-1 transition-all duration-300 ease-in-out">
                <img src="../assets/icons/arrowhead-up.png" alt="side-bar" class="h-5" />
            </div>
        </div>
    </div>

    <div class="flex">
        <!-- Sidebar -->
        <div class="w-[18.5%]">
            <!-- New Dropdown -->
            <transition name="bounce">
                <div v-if="showDropdown" ref="dropdownRef" class="bg-white rounded-lg  ml-7 mt-5 px-3 py-3">
                    <button class="flex gap-3 hover:bg-[#f5f4f2] w-full transition-all duration-300 ease-in-out px-2 py-1 rounded-lg cursor-pointer">
                        <img src="../assets/icons/pen.png" alt="new-conversation" class="h-5" />
                        New Conversation
                    </button>
                    <button class="flex gap-3 w-full mt-1 hover:bg-[#f5f4f2] transition-all duration-300 ease-in-out px-2 py-1 rounded-lg cursor-pointer">
                        <img src="../assets/icons/copy-writing.png" alt="new-conversation" class="h-5" />
                        New Page
                    </button>
                </div>
            </transition>

            <!-- History -->
            <transition name="nested">
                <div v-if="showSidebar">
                    <div class="bg-white rounded-lg  ml-7 mt-5 px-3 py-3 outer text-[#1b2133]">
                        <div>
                            <p class="font-medium mt-2">Pages</p>
                            <div class="inner mt-1">
                                <p class="hover:bg-[#f5f4f2] transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer rounded-lg">page 1</p>
                                <p class="hover:bg-[#f5f4f2] transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer rounded-lg">page 2</p>
                                <p class="hover:bg-[#f5f4f2] transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer rounded-lg">page 3</p>
                                <p class="hover:bg-[#f5f4f2] transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer rounded-lg">page 4</p>
                            </div>
                        </div>

                        <div>
                            <p class="font-medium mt-3">Conversions</p>
                            <div class="inner mt-1">
                                <!-- Today -->
                                <p class="text-sm text-gray-600 transition-all duration-300 ease-in-out py-1 px-2 rounded-lg">Today</p>
                                <p class="hover:bg-[#f5f4f2] transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer rounded-lg">conversation 1</p>
                                <p class="hover:bg-[#f5f4f2] transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer rounded-lg">conversation 2</p>

                                <!-- Yesterday -->
                                <p class="text-sm text-gray-600 transition-all duration-300 ease-in-out py-1 px-2 rounded-lg">Yesterday</p>
                                <p class="hover:bg-[#f5f4f2] transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer rounded-lg">conversation 3</p>
                                <p class="hover:bg-[#f5f4f2] transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer rounded-lg">conversation 4</p>

                                <!-- Older -->
                                <p class="text-sm text-gray-600 transition-all duration-300 ease-in-out py-1 px-2 rounded-lg">Older</p>
                                <p class="hover:bg-[#f5f4f2] transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer rounded-lg">conversation 5</p>
                                <p class="hover:bg-[#f5f4f2] transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer rounded-lg">conversation 6</p>
                                <p class="hover:bg-[#f5f4f2] transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer rounded-lg">conversation 7</p>
                                <p class="hover:bg-[#f5f4f2] transition-all duration-300 ease-in-out py-1 px-2 cursor-pointer rounded-lg">conversation 8</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg  ml-7 mt-5 px-3 py-3 outer text-[#1b2133]">
                        <div class="flex gap-3 cursor-pointer rounded-lg inner">
                            <img class="w-10 h-10 rounded-full" src="../assets/icons/empty-male-avatar.jpg" alt="profile" />
                            <div>
                                <p>Amar Karthick P</p>
                                <p class="text-sm">Free Plan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>

        <!-- Chat section -->
        <div class="flex items-center justify-center w-3/5 h-[80vh] transition-all duration-300 ease-in-out" :class="showSidebar ? 'ml-16' : 'ml-8'">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import HomePage from '@/pages/HomePage.vue';
import { ref } from 'vue';
import { RouterView } from 'vue-router';

const showDropdown = ref(false);
const showSidebar = ref(false);
</script>

<style scoped>
/* Dropdown bounce in animation */
.bounce-enter-active {
    animation: bounce-in 0.5s;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1);
    }
    100% {
        transform: scale(1);
    }
}

/* Nested Fade */

.nested-enter-active,
.nested-leave-active {
    transition: all 0.3s ease-in-out;
}

/* delay leave of parent element */
.nested-leave-active {
    transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
    transform: translateY(30px);
    opacity: 0;
}

/* we can also transition nested elements using nested selectors */
.nested-enter-active .inner,
.nested-leave-active .inner {
    transition: all 0.3s ease-in-out;
}

/* delay enter of nested element */
.nested-enter-active .inner {
    transition-delay: 0.25s;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
    transform: translateX(30px);
    /*
Hack around a Chrome 96 bug in handling nested opacity transitions.
This is not needed in other browsers or Chrome 99+ where the bug
has been fixed.
*/
    opacity: 0.001;
}
</style>