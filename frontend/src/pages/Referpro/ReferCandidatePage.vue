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
    <!-- Guide Section -->
    <div>
      <h1 class="text-primary font-semibold text-3xl">How To Refer</h1>
      <p class="font-medium text-primary/60">Help your friends start their career in just 4 steps.</p>
      <div class="flex items-center justify-between mt-8">
        <!-- Step 1 -->
        <div class="bg-white rounded-lg font-medium pl-5 pb-5 flex pr-10 relative w-[250px]">
          <div>
            <p class="text-primary/60 text-lg mt-5">STEP 1</p>
            <div class="bg-orange-50 w-12 flex items-center justify-center p-3 rounded-xl mt-2">
              <LinkIcon class="text-orange-600 h-5 w-5" />
            </div>
            <h2 class="text-primary font-semibold text-2xl mt-3">Share Your Link</h2>
            <p class="text-primary/50 text-[13px]">Copy your referral link and share</p>
          </div>
          <img src="@/assets/decoratives/animation_frame_1.avif" class="absolute top-0 right-0 h-[80px] w-[130px]" />
        </div>
        <!-- Step 2 -->
        <div class="bg-white rounded-lg font-medium pl-5 pb-5 flex pr-10 relative w-[250px]">
          <div>
            <p class="text-primary/60 text-lg mt-5">STEP 2</p>
            <div class="bg-indigo-50 w-12 flex items-center justify-center p-3 rounded-xl mt-2">
              <AddUserIcon class="text-indigo-600 h-5 w-5" />
            </div>
            <h2 class="text-primary font-semibold text-2xl mt-3">Registration</h2>
            <p class="text-primary/50 text-[13px]">Candidate completes registration</p>
          </div>
          <img src="@/assets/decoratives/animation_frame_3.avif" class="absolute top-0 right-0 h-[80px] w-[130px]" />
        </div>
        <!-- Step 3 -->
        <div class="bg-white rounded-lg font-medium pl-5 pb-5 flex pr-10 relative w-[250px]">
          <div>
            <p class="text-primary/60 text-lg mt-5">STEP 3</p>
            <div class="bg-fuchsia-50 w-12 flex items-center justify-center p-3 rounded-xl mt-2">
              <StarIcon class="text-fuchsia-600 h-5 w-5" />
            </div>
            <h2 class="text-primary font-semibold text-2xl mt-3">Review</h2>
            <p class="text-primary/50 text-[13px]">Profile is reviewed by recruiters</p>
          </div>
          <img src="https://d14qv6cm1t62pm.cloudfront.net/nxtrewards/animation_frame_2.avif" class="absolute top-0 right-0 h-[80px] w-[130px]" />
        </div>
        <!-- Step 4 -->
        <div class="bg-white rounded-lg font-medium pl-5 pb-5 flex pr-10 relative w-[220px]">
          <div>
            <p class="text-primary/60 text-lg mt-5">STEP 4</p>
            <div class="bg-whatsapp/5 w-12 flex items-center justify-center p-3 rounded-xl mt-2">
              <InrIcon class="text-whatsapp h-5 w-5" />
            </div>
            <h2 class="text-primary font-semibold text-2xl mt-3">Earn Rewards</h2>
            <p class="text-primary/50 text-[13px]">Receive rewards once they placed</p>
          </div>
          <img src="@/assets/decoratives/animation_frame_4.avif" class="absolute top-0 right-0 h-[80px] w-[130px]" />
        </div>
      </div>
    </div>
    <!-- Candidate Guide Section -->
    <div>
      <h1 class="text-primary font-semibold text-3xl">Candidate Placement Process</h1>
      <p class="font-medium text-primary/60">Placement is a 4-Stage Process</p>
      <div class="flex items-center justify-center mt-4 font-medium">
        <div class="flex items-center justify-center mt-5 overflow-x-auto hide-scrollbar">
            <template v-for="(step, index) in steps" :key="step.title">
                <div class="flex flex-col items-center text-center min-w-[150px] relative mb-10">
                    <p class="text-primary/60 text-lg">{{ step.step }}</p>
                    <div :class="[step.bg, 'p-3 rounded-xl mb-3 mt-4']">
                        <component
                            :is="step.icon"
                            :class="[step.color, 'w-6 h-6']"
                        />
                    </div>
                    <h2 class="text-primary font-semibold text-[16px] mt-3">{{ step.title }}</h2>
                    <div v-if="step.reward" class="bg-green-700 mt-2 absolute -bottom-10 rounded-full px-5 py-1 flex gap-2 items-center cu">
                      <GiftIcon class="text-white h-3 w-3" />
                      <p class="text-white text-sm">Earn Reward</p>
                    </div>
                </div>
                
                <div
                    v-if="index < steps.length - 1"
                    class="h-px min-w-[60px] flex-1 bg-primary/20"
                />
            </template>
        </div>
      </div>
    </div>
    <!-- Milestone Section -->
    <div class="bg-nxtwave rounded-xl px-5 pt-5 pb-8 font-medium">
      <h1 class="text-white font-semibold text-3xl">Referral Milestones</h1>
      <p class="font-medium text-white">Earn more as you refer more</p>
      <div class="flex items-center justify-evenly mt-8">
        <div class="bg-highlight/60 rounded-xl p-5">
          <p class="bg-white rounded-full py-1.5 px-5 text-lg text-primary">1st Successful Referral</p>
          <p class="text-white text-3xl mt-3 font-bold">₹ 3,000</p>
          <p class="text-white text-[13px]">Earnings per referral</p>
        </div>
        <div class="bg-highlight/80 rounded-xl p-5">
          <p class="bg-white rounded-full py-1.5 px-5 text-lg text-primary">5th Successful Referral</p>
          <p class="text-white text-3xl mt-3 font-bold">₹ 4,000</p>
          <p class="text-white text-[13px]">Earnings per referral</p>
        </div>
        <div class="bg-highlight rounded-xl p-5 relative">
          <img src="@/assets/decoratives/medal.png" class="absolute h-10 -top-4 right-2" />
          <p class="bg-white rounded-full py-1.5 px-5 text-lg text-primary">10th Successful Referral</p>
          <p class="text-white text-3xl mt-3 font-bold">₹ 5,000</p>
          <p class="text-white text-[13px]">Earnings per referral</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// icons
import LinkIcon from '@/components/icons/LinkIcon.vue'
import CopyIcon from '@/components/icons/CopyIcon.vue'
import FriendIcon from '@/components/icons/FriendIcon.vue'
import StarShineIcon from '@/components/icons/StarShineIcon.vue'
import InrIcon from '@/components/icons/InrIcon.vue'
import BranchIcon from '@/components/icons/BranchIcon.vue'
import JobIcon from '@/components/icons/JobIcon.vue'
import AddUserIcon from '@/components/icons/AddUserIcon.vue'
import StarIcon from '@/components/icons/StarIcon.vue'
import SendIcon from '@/components/icons/SendIcon.vue'
import GiftIcon from '@/components/icons/GiftIcon.vue'

const steps = [
    {
        step: 'STEP 1',
        title: 'Registration',
        description: 'Candidate completes registration',
        icon: AddUserIcon,
        bg: 'bg-nxtwave',
        color: 'text-white',
        reward: 0
    },
    {
        step: 'STEP 2',
        title: 'Applies for Job',
        description: 'Candidate gets hired',
        icon: JobIcon,
        bg: 'bg-nxtwave',
        color: 'text-white',
        reward: 0
    },
    {
        step: 'STEP 3',
        title: 'Reviewed by Recruiters',
        description: 'Profile is reviewed by recruiters',
        icon: StarIcon,
        bg: 'bg-nxtwave',
        color: 'text-white',
        reward: 0
    },
    {
        step: 'STEP 4',
        title: 'Get Rewarded',
        description: 'Receive your referral reward',
        icon: InrIcon,
        bg: 'bg-nxtwave',
        color: 'text-white',
        reward: 1
    }
]
</script>