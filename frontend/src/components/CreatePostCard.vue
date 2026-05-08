<template>
    <div class="hover-hoverbg bg-white px-5 pt-5 pb-2 rounded-lg">
        <div class="flex gap-5">
            <avatar :img="user" class="h-12" />
            <button class="border border-default hover:bg-hoverbg transition-all duration-500 ease-in-out rounded-full w-full font-medium px-5 text-left text-gray-600">
                Start a post
            </button>
        </div>
        <div class="flex justify-evenly mt-2">
            <button class="hover:bg-hoverbg transition-all duration-500 rounded-md flex gap-2 px-3 pt-2 pb-1">
                <video-icon class="h-5 w-5 text-green-800" />
                <p class="">Video</p>
            </button>
            <button class="hover:bg-hoverbg transition-all duration-500 rounded-md flex gap-2 px-3 pt-2 pb-1">
                <photo-icon class="h-5 w-5 text-blue-800" />
                <p class="">Photo</p>
            </button>
            <button class="hover:bg-hoverbg transition-all duration-500 rounded-md flex gap-2 px-3 pt-2 pb-1">
                <article-icon class="h-5 w-5 text-red-800" />
                <p class="">Write article</p>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Avatar from './Avatar.vue';
import ArticleIcon from './icons/ArticleIcon.vue';
import PhotoIcon from './icons/PhotoIcon.vue';
import VideoIcon from './icons/VideoIcon.vue';

defineProps({
    user: {
        type: Object,
        required: true
    }
})
</script>