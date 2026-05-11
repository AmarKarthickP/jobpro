<template>
    <div class="bg-white shadow-sm rounded-md py-3">
        <p class="text-xs font-medium text-gray-600 pb-2 px-5">Quick Links</p>
        <router-link to="#" class="flex items-center px-5 gap-4 hover:bg-hoverbg py-1 transition-all duration-300 ease-in-out">
            <resume-icon class="h-4 w-4 text-gray-600" />
            <p class="text-[14px] font-medium">Attach CV</p>
        </router-link>
        <router-link to="#" class="flex items-center px-5 gap-4 hover:bg-hoverbg py-1 transition-all duration-300 ease-in-out">
            <preference-icon class="h-4 w-4 text-gray-600" />
            <p class="text-[14px] font-medium">Preferences</p>
        </router-link>
        <router-link to="#" class="flex items-center px-5 gap-4 hover:bg-hoverbg py-1 transition-all duration-300 ease-in-out">
            <business-icon class="h-4 w-4 text-gray-600" />
            <p class="text-[14px] font-medium">Job Tracker</p>
        </router-link>
        <router-link to="#" class="flex items-center px-5 gap-4 hover:bg-hoverbg py-1 transition-all duration-300 ease-in-out">
            <saved-icon class="h-4 w-4 text-gray-600" />
            <p class="text-[14px] font-medium">Saved Items</p>
        </router-link>
    </div>
</template>

<script setup lang="ts">
import BusinessIcon from './icons/BusinessIcon.vue';
import PreferenceIcon from './icons/PreferenceIcon.vue';
import ResumeIcon from './icons/ResumeIcon.vue';
import SavedIcon from './icons/SavedIcon.vue';

</script>