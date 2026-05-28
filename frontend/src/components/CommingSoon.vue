<template>
    <div class="fixed inset-0 flex items-center bg-background justify-center px-4">

        <transition
            mode="out-in"
            enter-active-class="transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in-out absolute"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
        >
            <img
                v-if="showImage"
                src="../assets/defaults/comming-soon-funny.png"
                class="h-16 md:h-24"
            />
        </transition>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showImage = ref(false)

onMounted(() => {
    showImage.value = true
})
</script>