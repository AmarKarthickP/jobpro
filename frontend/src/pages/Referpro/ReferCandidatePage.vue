<template>
  <div class="space-y-10">
    <!-- Share Section -->
    <div class="bg-nxtwave rounded-xl p-5 grid grid-cols-12 items-center justify-center">
      <div class="col-span-7 text-white font-medium space-y-4">
        <h2 class="text-3xl font-semibold">Refer a friend and earn rewards up to ₹ 5,000.</h2>
        <p class="text-2xl">
          Bring your friends to JOBPRO, where career-ready skills<br> meet exclusive job opportunities.
        </p>
        <div class="flex items-center gap-3">
          <div class="flex">
            <img src="@/assets/people/abdulla-pi.jpg" class="h-9 rounded-full border-2 border-nxtwave"/>
            <img src="@/assets/people/faris-ansari.jpg" class="h-9 rounded-full border-2 border-nxtwave -ml-2"/>
            <img src="@/assets/people/hussain-nagaria.jpg" class="h-9 rounded-full border-2 border-nxtwave -ml-2"/>
            <img src="@/assets/people/amar-karthick.jpeg" class="h-9 rounded-full border-2 border-nxtwave -ml-2"/>
          </div>
          <p class="text-[14px]">
            Thousands have already referred their friends.<br> Now it's your turn to benefit!
          </p>
        </div>
      </div>
      <div class="col-span-5 mx-8 bg-white rounded-xl p-5 space-y-3">
        <div class="flex items-center gap-2">
          <link-icon class="text-primary h-6 w-6" />
          <p class="text-primary/70 text-[14px]">Share your referral link and start earning</p>
        </div>
        <button class="rounded-lg w-full flex items-center justify-center text-primary py-1 gap-3 border-2 border-primary">
          <copy-icon class="h-5 w-5" />
          <p class="text-[14px] font-medium">Copy Link</p>
        </button>
        <button class="rounded-lg w-full flex items-center justify-center text-white py-1 gap-3 bg-green-50 border-2 border-whatsapp text-whatsapp">
          <img src="@/assets/logo/whatsapp.png" class="h-6 w-6" />
          <p class="text-[14px] font-medium">Share on Whatsapp</p>
        </button>
        <button class="bg-primary rounded-lg w-full flex items-center justify-center text-white py-1 gap-3 border-2 border-primary text-white">
          <friend-icon class="h-5 w-5" />
          <p class="text-[14px] font-medium">Invite Friends</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// icons
import LinkIcon from '@/components/icons/LinkIcon.vue'
import CopyIcon from '@/components/icons/CopyIcon.vue'
import FriendIcon from '@/components/icons/FriendIcon.vue'
</script>