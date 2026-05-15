<template>
  <div class="bg-white shadow-sm rounded-xl p-5 relative">
    <transition
      mode="out-in"
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showProfile">
        <div class="bg-primary h-16 -m-5 rounded-t-xl"></div>
        <Avatar
          :img="user.image"
          class="h-20 w-20 border-2 border-white -mt-8"
        />
        <p
          class="text-xl font-medium text-gray-600 text-right absolute top-20 right-10"
        >
          Quick Links
        </p>
      </div>
      <p v-else class="text-xl font-medium text-gray-600">Quick Links</p>
    </transition>
    <div
      class="flex mt-4 px-5 text-[15px] hover:bg-hoverbg rounded-lg cursor-pointer py-2"
    >
      <button class="text-primary font-medium">Resume</button>
      <button class="text-primary ml-auto font-medium text-[#275df5]">
        Attach
      </button>
    </div>
    <div
      class="flex mt-4 px-5 text-[15px] hover:bg-hoverbg rounded-lg cursor-pointer py-2"
    >
      <button class="text-primary font-medium">Personal Details</button>
      <button class="text-primary ml-auto font-medium text-[#275df5]">
        Add
      </button>
    </div>
    <div
      class="flex mt-4 px-5 text-[15px] hover:bg-hoverbg rounded-lg cursor-pointer py-2"
    >
      <button class="text-primary font-medium">Contact Details</button>
      <button class="text-primary ml-auto font-medium text-[#275df5]">
        Add
      </button>
    </div>
    <div
      class="flex mt-4 px-5 text-[15px] hover:bg-hoverbg rounded-lg cursor-pointer py-2"
    >
      <button class="text-primary font-medium">Education Details</button>
      <button class="text-primary ml-auto font-medium text-[#275df5]">
        Add
      </button>
    </div>
    <div
      class="flex mt-4 px-5 text-[15px] hover:bg-hoverbg rounded-lg cursor-pointer py-2"
    >
      <button class="text-primary font-medium">Experience Details</button>
      <button class="text-primary ml-auto font-medium text-[#275df5]">
        Add
      </button>
    </div>
    <div
      class="flex mt-4 px-5 text-[15px] hover:bg-hoverbg rounded-lg cursor-pointer py-2"
    >
      <button class="text-primary font-medium">Passport Details</button>
      <button class="text-primary ml-auto font-medium text-[#275df5]">
        Add
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from './Avatar.vue';
import { user } from '../data/user';

defineProps({
    showProfile: {
        type: Boolean,
        default: true,
    },
});
</script>