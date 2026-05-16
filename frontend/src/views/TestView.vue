<template>
  <div class="p-6">
    <FileUpload
      title="Upload Resume"
      subtitle="Drop your resume here or click to browse"
      accept=".pdf,.doc,.docx"
      :loading="isUploading"
      @file-selected="handleFile"
    />
  </div>
</template>

<script setup>
import FileUpload from '@/components/FileUpload.vue'
import { ref } from 'vue'

const isUploading = ref(true)

const handleFile = (file) => {
  console.log('Received File:', file)
}
</script>