<template>
  <AttachImage
    :modelValue="userData"
    :loading="photoUploading"
    @file-selected="handlePhotoChange"
  />
</template>

<script setup>
import { computed, ref } from 'vue'
import AttachImage from '../components/AttachImage.vue'

const photoUploading = ref(false)

const userData = computed(() => ({
  src: 'https://lh3.googleusercontent.com/a/ACg8ocKekUbg5fNImOpaB0pfTG1B07lebyaoVvUPVNPcH9PVJ4HZN9T0=s96-c',
  alt: 'profile',
  fullName: 'Amar Karthick',
  email: 'amar.p@groupteampro.com',
  mobile_no: '6369606405',
  bio: 'test'
}))

const handlePhotoChange = (file) => {
  console.log(file)
}
</script>