<template>
    <div
        class="group px-2 shimmer py-1 bg-[#f4f5f5] rounded-full flex items-center text-gray-800 w-fit"
    >
    {{ data.icon }}

    <p
        class="text-sm font-medium text-gray-600 max-w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-w-[200px] group-hover:opacity-100"
    >
        &nbsp;Transport
    </p>
</div>
</template>

<script setup>
defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>