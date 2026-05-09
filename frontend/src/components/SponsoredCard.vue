<template>
    <div v-show="!hide" class="rounded-lg shadow h-[100px] bg-gradient-to-r from-[#d9ebff] via-[#eaebe9] to-[#ffebcd] relative flex items-center justify-center">
        <p class="text-gray-500">Sponsored</p>
        <close-icon @click="hide=true"
            class="h-4 w-4 text-gray-600 absolute top-3 right-3"
        />
    </div>
</template>

<script setup>
import CloseIcon from '@/components/icons/CloseIcon.vue';
import { ref } from 'vue'

const hide = ref(false)
</script>