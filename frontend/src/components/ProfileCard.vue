<template>
    <div class="bg-white shadow-sm rounded-lg pb-4">
        <div class="bg-black h-14 rounded-t-lg">
        </div>
        <avatar :img="user" class="w-20 border-2 border-white -mt-8 ml-5"/>
        <div class="px-5 mt-2">
            <p class="font-medium text-md">{{ user.name }}</p>
            <p class="text-sm mt-1">{{ user.headline }}</p>
            <p class="text-gray-600 text-[11px] mt-1">{{ user.location }}</p>
            <p class="text-[13px] font-medium mt-2">{{ user.company }}</p>
        </div>
    </div>
</template>

<script setup>
import Avatar from './Avatar.vue';

defineProps({
    user: {
        type: Object,
        required: true
    }
})
</script>