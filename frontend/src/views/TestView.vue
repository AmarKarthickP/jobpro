<template>
  <div class="p-6">
    <div
      @dragenter.prevent="isDragging = true"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="openFilePicker"
      :class="[
        'border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 cursor-pointer',
        isDragging
          ? 'border-blue-500 bg-blue-50 scale-[1.01]'
          : 'border-gray-300 bg-white hover:border-gray-400'
      ]"
    >
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        @change="handleFileSelect"
      />

      <div class="flex flex-col items-center gap-2">
        <div class="text-lg font-semibold">
          Drag & Drop File Here
        </div>

        <div class="text-sm text-gray-500">
          or click to browse
        </div>

        <div
          v-if="selectedFile"
          class="mt-4 text-sm text-green-600 font-medium"
        >
          Selected: {{ selectedFile.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isDragging = ref(false)
const selectedFile = ref(null)
const fileInput = ref(null)

const openFilePicker = () => {
  fileInput.value.click()
}

const handleDrop = (event) => {
  isDragging.value = false

  const files = event.dataTransfer.files

  if (files.length > 0) {
    selectedFile.value = files[0]
    console.log('Dropped File:', files[0])
  }
}

const handleFileSelect = (event) => {
  const files = event.target.files

  if (files.length > 0) {
    selectedFile.value = files[0]
    console.log('Selected File:', files[0])
  }
}
</script>