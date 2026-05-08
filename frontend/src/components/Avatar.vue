<template>
    <img class="rounded-full"
        :src=img.src 
        :alt=img.alt 
    />
</template>

<script setup>
defineProps({
    img: {
        type: Object,
        required: true
    }
})
</script>