<template>
    <img class="rounded-full"
        :src="img.src || defaultImage" 
        :alt="img.alt" 
    />
</template>

<script setup>
import defaultImage from '@/assets/defaults/empty-male-avatar.jpg';

defineProps({
    img: {
        type: Object,
        required: true
    }
})
</script>