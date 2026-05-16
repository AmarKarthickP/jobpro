<template>
  <div
    @dragenter.prevent="isDragging = true"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="handleDrop"
    @click="!loading && openFilePicker()"
    :class="[
      'relative border-2 border-dashed rounded-xl p-5 text-center transition-all duration-200',
      loading
        ? 'cursor-not-allowed opacity-80'
        : 'cursor-pointer',
      isDragging || loading
        ? 'border-blue-500 bg-blue-50 scale-[1.01]'
        : 'border-gray-300 bg-white hover:border-gray-400'
    ]"
  >
    <input
      ref="fileInput"
      type="file"
      class="hidden"
      :accept="accept"
      @change="handleFileSelect"
    />

    <!-- Loading Overlay -->
    <div
      v-if="loading"
      class="absolute inset-0 bg-white/80 backdrop-blur-[1px] rounded-xl flex flex-col items-center justify-center z-10"
    >
      <loader class="text-[40px]" />
    </div>

    <div class="flex flex-col items-center gap-2">
      <div class="text-lg font-medium text-[#275df5] flex items-center gap-1">
        <attachment-icon class="h-4 w-4" />
        {{ title }}
      </div>

      <div class="text-sm text-gray-500">
        {{ subtitle }}
      </div>

      <div
        v-if="selectedFile && loading"
        class="mt-2 text-sm text-green-600 font-medium break-all"
      >
        Selected: {{ selectedFile.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AttachmentIcon from '../components/icons/AttachmentIcon.vue'
import Loader from './Loader.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Drag & Drop File Here',
  },
  subtitle: {
    type: String,
    default: 'or click to browse',
  },
  accept: {
    type: String,
    default: '*',
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['file-selected'])

const isDragging = ref(false)
const selectedFile = ref(null)
const fileInput = ref(null)

const openFilePicker = () => {
  fileInput.value.click()
}

const handleDrop = (event) => {
  if (props.loading) return

  isDragging.value = false

  const files = event.dataTransfer.files

  if (files.length > 0) {
    selectedFile.value = files[0]
    emit('file-selected', files[0])
  }
}

const handleFileSelect = (event) => {
  if (props.loading) return

  const files = event.target.files

  if (files.length > 0) {
    selectedFile.value = files[0]
    emit('file-selected', files[0])
  }
}
</script>