<template>
    <div class="grid grid-cols-12 gap-6 ">
        <!-- Profile Grid -->
        <div class="col-span-3">
            <profile :user="userData" class="mb-4" /> <!--:user injects the data to the component -->
            <!-- Quick Links -->
            <quick-link />
        </div>

        <!-- Main Content Grid -->
        <div class="col-span-6">
            <create-post :user="userData"/>
            <!-- Separator -->
            <div class="my-5 relative">
                <div class="border-t border-gray-300 flex z-0">
                </div>
                <p class="absolute bg-background -mt-2.5 right-0 px-5 text-xs text-gray-600">
                    sort by:
                    <span class="font-medium pl-2">Top </span>
                </p>
            </div>
            <div class="bg-white rounded-lg pt-5 px-5 pb-3">
                <div class="flex gap-5 items-center">
                    <avatar :img="imageData" class="w-12"/>
                    <div>
                        <p class="font-medium">Faris Ansari<span class="text-xs text-gray-500"> • 1d</span></p>
                        <p class="text-xs text-gray-500">Product Engineer @ Frappe</p>
                    </div>
                </div>
                <p class="mt-3 text-[14px] opacity-75">
                    <p>Robust Webhook Integrations in Frappe</p>
                    <p class="mt-2">In this tutorial, we take a naive implementation of a webhook handler in Frappe and use the Webhook Log pattern to make it robust and clean! Learn once, use it across different scenarios. Wait for the bonus tip at the end</p>
                    <p class="mt-2">Let me know your thoughts in comments. Also, check out my upcoming cohort [only 13 seats left] to learn about building integrations for Frappe/ERPNext even more in-depth!</p>
                </p>
                <div class="flex gap-1">
                    <tag class="text-xs mt-2 text-blue-700 font-medium cursor-pointer">#python</tag>
                    <tag class="text-xs mt-2 text-blue-700 font-medium cursor-pointer">frappe</tag>
                </div>
                
                <div class="my-3 relative">
                    <div class="border-t border-gray-200 flex">
                    </div>
                </div>
                <!-- Footer Section -->
                <div class="flex items-center text-center justify-between mx-14">
                    <button class="hover:bg-hoverbg px-5 pt-2 pb-2.5 rounded-md transition-all duration-300 ease-in-out">
                        <like-icon @click="toggleLike"
                            class="w-5 h-5 text-gray-600" 
                        />
                    </button>
                    <button class="hover:bg-hoverbg px-5 pt-1.5 pb-2.5 rounded-md transition-all duration-300 ease-in-out">
                        <comment-icon class="w-6 h-6 text-gray-600" />
                    </button>
                    <button class="hover:bg-hoverbg px-5 pt-2 pb-2.5 rounded-md transition-all duration-300 ease-in-out">
                        <saved-icon class="w-5 h-5 text-gray-600" />
                    </button>
                    <button class="hover:bg-hoverbg px-5 pt-2 pb-2.5 rounded-md transition-all duration-300 ease-in-out">
                        <send-icon class="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>
        </div>

        <!-- Blogs & Ads Grid -->
        <div class="bg-white shadow-sm rounded-md col-span-3">
            hi
        </div>
    </div>
</template>

<script setup>
import Avatar from '@/components/Avatar.vue';
import CreatePost from '@/components/CreatePostCard.vue';
import Profile from '@/components/ProfileCard.vue';
import QuickLink from '@/components/QuickLinkCard.vue';
import LikeIcon from '@/components/icons/LikeIcon.vue';

import farisImage from '@/assets/defaults/faris-ansari.jpg';
import defaultImage from '@/assets/defaults/profile-image.jpeg';
import { ref, computed } from 'vue';
import CommentIcon from '@/components/icons/CommentIcon.vue';
import SendIcon from '@/components/icons/SendIcon.vue';
import SavedIcon from '@/components/icons/SavedIcon.vue';
import { auth } from '../data/auth';
import { user } from '@/data/user';

const userData = computed(() => ({
    name: user.fullName,
    headline: 'Software Developer | Frappe Framework | ERPNext | Vue JS',
    location: 'Chennai, Tamil Nadu',
    company: 'TEAMPRO HR & IT Services Pvt. Ltd.',
    src: user.image,
    alt: 'profile',
}))

const imageData = {
    src: farisImage,
    alt: 'faris-ansari'
}

</script>