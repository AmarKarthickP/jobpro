<template>
  <div
    class="relative group w-fit"
    @dragenter.prevent="isDragging = true"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="handleDrop"
  >
    <!-- Avatar -->
    <div @click="!loading && openFilePicker()" class="relative cursor-pointer">
      <Avatar
        :img="previewImage"
        class="h-40 w-40 rounded-full border-4 border-white object-cover transition-all duration-300"
        :class="[
          isDragging
            ? 'opacity-40 scale-105'
            : 'group-hover:opacity-50'
        ]"
      />

      <!-- Overlay -->
      <!-- Overlay -->
      <div
        class="absolute inset-0 flex items-center justify-center rounded-full transition-all duration-300"
        :class="[
    isDragging
      ? 'opacity-100'
      : 'opacity-0 group-hover:opacity-100'
  ]"
      >
        <div class="font-semibold text-primary">
          {{ isDragging ? 'Drop Photo' : 'Change Photo' }}
        </div>
      </div>

      <!-- Loader -->
      <div
        v-if="loading"
        class="absolute inset-0 rounded-full bg-white/70 flex items-center justify-center"
      >
        <Loader class="text-[35px]" />
      </div>
    </div>

    <!-- Hidden Input -->
    <input
      ref="fileInput"
      type="file"
      class="hidden"
      accept="image/*"
      @change="handleFileSelect"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Avatar from './Avatar.vue'
import Loader from './Loader.vue'

const props = defineProps({
  modelValue: {
    type: [String, Object],
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['file-selected'])

const fileInput = ref(null)
const selectedFile = ref(null)
const isDragging = ref(false)

const openFilePicker = () => {
  if (props.loading) return
  fileInput.value?.click()
}

const processFile = (file) => {
  if (!file) return

  selectedFile.value = file
  emit('file-selected', file)
}

const handleDrop = (event) => {
  if (props.loading) return

  isDragging.value = false

  const file = event.dataTransfer.files?.[0]

  if (file && file.type.startsWith('image/')) {
    processFile(file)
  }
}

const handleFileSelect = (event) => {
  if (props.loading) return

  const file = event.target.files?.[0]

  if (file) {
    processFile(file)
  }
}

const previewImage = computed(() => {
  if (selectedFile.value) {
    return {
      src: URL.createObjectURL(selectedFile.value),
      alt: 'Preview Image',
    }
  }

  return props.modelValue
})
</script>
