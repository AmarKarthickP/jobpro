<template>
  <div
    class="mt-5 bg-white rounded-lg px-5 py-3 transition-all duration-300 ease-in-out"
    :class="
    selected
      ? ' shadow-lg scale-[1.01]'
      : 'shadow-sm hover:shadow-md hover:-translate-y-0.5'
  "
  >
  <div v-if="data.already_applied">
    <div v-if="view=='grid'" class="relative">
      <ribbon-right-icon class="h-20 absolute text-red-600 -top-6 -right-[21px]" />
      <p class="text-white text-sm font-medium absolute -right-2 top-1">Applied</p>
    </div> 
    
    <div v-if="view=='list'" class="relative">
      <ribbon-right-icon class="h-24 absolute text-red-600 top-3 -right-[21px]" />
      <p class="text-white text-[14px] font-medium absolute -right-1 top-[47px]">Applied</p>
    </div> 
  </div>

    <div v-if="view=='list'" class="grid grid-cols-12">
      <div class="col-span-10">
        <div class="flex items-center gap-3">
          <badge
            class="relative overflow-hidden text-xs bg-[#ffebdb] rounded-lg px-3 py-1 text-[#e56700]"
          >
            <span class="relative z-10 font-normal"
              >• {{ timeAgo(data.created_on) }}</span
            >
          </badge>
          <badge
            v-if="page=='Activity'"
            class="relative text-xs bg-[#ffebdb] rounded-lg px-3 py-1 text-[#e56700]"
          >
            <span class="relative z-10 font-normal"
              >Applied: {{ timeAgo(data.applied_on) }}</span
            >
          </badge>
        </div>

        <p class="text-xl font-medium text-primary mt-2 capitalize">
          {{ data.subject }}
        </p>
        <p class="text-[14px] text-gray-600 font-medium capitalize">
          {{ data.customer }}
        </p>
        <div class="text-[14px] text-gray-600 font-medium flex gap-1">
          <img :src="data.custom_country_flag" class="h-5" />
          <p>{{ data.territory }}</p>
        </div>

        <div class="border-t border-gray-300 my-3 mr-5"></div>
        <div class="flex items-center gap-3">
          <badge
            v-if="data.custom_free_recruitment == 'Yes'"
            class="group relative inline-flex items-center overflow-hidden bg-[#eef6fd] rounded-full px-2 py-1 text-[#0770e4] cursor-pointer"
          >
            <!-- Shimmer -->
            <span
              class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
            ></span>

            <!-- Icon -->
            <suitcase-icon class="relative z-10 h-4 w-4 shrink-0" />

            <!-- Hidden Text -->
            <span
              class="relative z-10 whitespace-nowrap text-sm font-medium w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:w-[120px] group-hover:opacity-100"
            >
              &nbsp;Free Recruitment
            </span>
          </badge>
          <badge
            v-if="data.food == 'Free'"
            class="group relative inline-flex items-center overflow-hidden bg-[#eef6fd] rounded-full px-2 py-1 text-[#0770e4] cursor-pointer"
          >
            <!-- Shimmer -->
            <span
              class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
            ></span>

            <!-- Icon -->
            <food-icon class="relative z-10 h-4 w-4 shrink-0" />

            <!-- Hidden Text -->
            <span
              class="relative z-10 whitespace-nowrap text-sm font-medium w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:w-[80px] group-hover:opacity-100"
            >
              &nbsp;&nbsp;Free Food
            </span>
          </badge>
          <badge
            v-if="data.food == 'Allowance'"
            class="group relative inline-flex items-center overflow-hidden bg-[#eef6fd] rounded-full px-2 py-1 text-[#0770e4] cursor-pointer"
          >
            <!-- Shimmer -->
            <span
              class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
            ></span>

            <!-- Icon -->
            <food-icon class="relative z-10 h-4 w-4 shrink-0" />

            <!-- Hidden Text -->
            <span
              class="relative z-10 whitespace-nowrap text-sm font-medium w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:w-[125px] group-hover:opacity-100"
            >
              &nbsp;Food Allowance
            </span>
          </badge>
          <badge
            v-if="data.accommodation == 'Free'"
            class="group relative inline-flex items-center overflow-hidden bg-[#eef6fd] rounded-full px-2 py-1 text-[#0770e4] cursor-pointer"
          >
            <!-- Shimmer -->
            <span
              class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
            ></span>

            <!-- Icon -->
            <accommodation-icon class="relative z-10 h-4 w-4 shrink-0" />

            <!-- Hidden Text -->
            <span
              class="relative z-10 whitespace-nowrap text-sm font-medium w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:w-[140px] group-hover:opacity-100"
            >
              &nbsp;Free Accommodation
            </span>
          </badge>
          <badge
            v-if="data.accommodation == 'Allowance'"
            class="group relative inline-flex items-center overflow-hidden bg-[#eef6fd] rounded-full px-2 py-1 text-[#0770e4] cursor-pointer"
          >
            <!-- Shimmer -->
            <span
              class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
            ></span>

            <!-- Icon -->
            <accommodation-icon class="relative z-10 h-4 w-4 shrink-0" />

            <!-- Hidden Text -->
            <span
              class="relative z-10 whitespace-nowrap text-sm font-medium w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:w-[180px] group-hover:opacity-100"
            >
              &nbsp;Accommodation Allowance
            </span>
          </badge>
          <badge
            v-if="data.transportation == 'Free'"
            class="group relative inline-flex items-center overflow-hidden bg-[#eef6fd] rounded-full px-2 py-1 text-[#0770e4] cursor-pointer"
          >
            <!-- Shimmer -->
            <span
              class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
            ></span>

            <!-- Icon -->
            <bus-icon class="relative z-10 h-4 w-4 shrink-0" />

            <!-- Hidden Text -->
            <span
              class="relative z-10 whitespace-nowrap text-sm font-medium w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:w-[95px] group-hover:opacity-100"
            >
              &nbsp;Free Transport
            </span>
          </badge>
          <badge
            v-if="data.transportation == 'Allowance'"
            class="group relative inline-flex items-center overflow-hidden bg-[#eef6fd] rounded-full px-2 py-1 text-[#0770e4] cursor-pointer"
          >
            <!-- Shimmer -->
            <span
              class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
            ></span>

            <!-- Icon -->
            <bus-icon class="relative z-10 h-4 w-4 shrink-0" />

            <!-- Hidden Text -->
            <span
              class="relative z-10 whitespace-nowrap text-sm font-medium w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:w-[175px] group-hover:opacity-100"
            >
              &nbsp;Transport Allowance
            </span>
          </badge>
          <badge
            v-if="data.joining_ticket == 'Company'"
            class="group relative inline-flex items-center overflow-hidden bg-[#eef6fd] rounded-full px-2 py-1 text-[#0770e4] cursor-pointer"
          >
            <!-- Shimmer -->
            <span
              class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
            ></span>

            <!-- Icon -->
            <flight-ticket-icon class="relative z-10 h-4 w-4 shrink-0" />

            <!-- Hidden Text -->
            <span
              class="relative z-10 whitespace-nowrap text-sm font-medium w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:w-[70px] group-hover:opacity-100"
            >
              &nbsp;Free Ticket
            </span>
          </badge>

          <button
            v-if="page!='Activity'"
            @click="showJobDetails=true"
            class="flex items-center gap-2 font-medium pr-10 ml-auto text-[13px] text-gray-600 hover:text-primary"
          >
            Job details
            <down-icon class="h-4 w-4" />
          </button>
        </div>
      </div>
      <div class="col-span-2">
        <div>
          <p class="text-xl font-medium text-primary text-right">
            {{ data.currency }} <span class="text-2xl">{{ data.amount  }}</span>
          </p>
          <!-- <p class="text-xl font-medium text-primary text-right">In INR?<span class="text-2xl">{{ data.amount_inr  }}</span></p> -->
          <button
            @click="handleApplyJob"
            v-if="page!='Activity'"
            :disabled="isSaving"
            class="mt-16 text-center w-full bg-primary py-2 rounded-lg text-white text-[14px] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{
  data.already_applied
    ? 'Check Status'
    : isSaving
      ? 'Applying'
      : 'Apply Now'
            }}
          </button>
          <button
            v-if="page=='Activity' && data.status!='IDB'"
            class="relative cursor-default overflow-hidden mt-16 text-center w-full bg-primary py-2 rounded-lg text-white text-[14px] font-medium"
          >
            <!-- Shimmer -->
            <span
              class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent"
            ></span>

            <!-- Text -->
            <span class="relative z-10">
              {{ getMappedStatus(data.status) }}
            </span>
          </button>
          <button
            v-if="page=='Activity' && data.status=='IDB'"
            class="relative cursor-default overflow-hidden mt-16 text-center w-full bg-primary py-2 rounded-lg text-white text-[14px] font-medium"
          >
            <!-- Shimmer -->
            <span
              class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent"
            ></span>

            <!-- Text -->
            <span class="relative z-10"> Better Luck Next Time </span>
          </button>
        </div>
      </div>
    </div>

    <div v-else class="">
      <div class="flex items-center gap-3">
        <badge
          class="relative overflow-hidden text-xs bg-[#ffebdb] rounded-lg px-2 py-0.5 text-[#e56700]"
        >
          <span class="relative z-10 font-normal"
            >• {{ timeAgo(data.created_on) }}</span
          >
        </badge>
        <badge
          v-if="page=='Activity'"
          class="relative overflow-hidden text-xs bg-[#ffebdb] rounded-lg px-2 py-0.5 text-[#e56700]"
        >
          <span class="relative z-10 font-normal"
            >Applied on: {{ timeAgo(data.applied_on) }}</span
          >
        </badge>
      </div>
      <p class="text-[13px] font-medium text-primary mt-2 capitalize truncate">
        {{ data.subject }}
      </p>
      <p class="text-[12px] text-gray-600 font-medium capitalize truncate">
        {{ data.customer }}
      </p>
      <div
        class="text-[12px] mt-2 text-gray-600 font-medium flex items-center gap-1"
      >
        <img :src="data.custom_country_flag" class="h-4" />
        <p>{{ data.territory }}</p>
      </div>
      <p
        v-if="page!='Activity'"
        class="pt-2 text-gray-600 text-[13px] md:text-[11px] font-medium text-left min-h-[100px]"
      >
        {{ truncateText(data.custom_major_key_skills, 200) }}
      </p>
      <div class="flex items-center gap-3 mt-3 h-6">
        <badge
          v-if="data.custom_free_recruitment == 'Yes'"
          class="group relative inline-flex items-center overflow-hidden bg-[#eef6fd] rounded-full px-2 py-1 text-[#0770e4] cursor-pointer"
        >
          <!-- Shimmer -->
          <span
            class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
          ></span>

          <!-- Icon -->
          <suitcase-icon class="relative z-10 h-4 w-4 shrink-0" />

          <!-- Hidden Text -->
          <span
            class="relative z-10 whitespace-nowrap text-sm font-medium w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:w-[120px] group-hover:opacity-100"
          >
            &nbsp;Free Recruitment
          </span>
        </badge>
        <badge
          v-if="data.food == 'Free'"
          class="group relative inline-flex items-center overflow-hidden bg-[#eef6fd] rounded-full px-2 py-1 text-[#0770e4] cursor-pointer"
        >
          <!-- Shimmer -->
          <span
            class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
          ></span>

          <!-- Icon -->
          <food-icon class="relative z-10 h-4 w-4 shrink-0" />

          <!-- Hidden Text -->
          <span
            class="relative z-10 whitespace-nowrap text-sm font-medium w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:w-[80px] group-hover:opacity-100"
          >
            &nbsp;&nbsp;Free Food
          </span>
        </badge>
        <badge
          v-if="data.food == 'Allowance'"
          class="group relative inline-flex items-center overflow-hidden bg-[#eef6fd] rounded-full px-2 py-1 text-[#0770e4] cursor-pointer"
        >
          <!-- Shimmer -->
          <span
            class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
          ></span>

          <!-- Icon -->
          <food-icon class="relative z-10 h-4 w-4 shrink-0" />

          <!-- Hidden Text -->
          <span
            class="relative z-10 whitespace-nowrap text-sm font-medium w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:w-[125px] group-hover:opacity-100"
          >
            &nbsp;Food Allowance
          </span>
        </badge>
        <badge
          v-if="data.accommodation == 'Free'"
          class="group relative inline-flex items-center overflow-hidden bg-[#eef6fd] rounded-full px-2 py-1 text-[#0770e4] cursor-pointer"
        >
          <!-- Shimmer -->
          <span
            class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
          ></span>

          <!-- Icon -->
          <accommodation-icon class="relative z-10 h-4 w-4 shrink-0" />

          <!-- Hidden Text -->
          <span
            class="relative z-10 whitespace-nowrap text-sm font-medium w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:w-[140px] group-hover:opacity-100"
          >
            &nbsp;Free Accommodation
          </span>
        </badge>
        <badge
          v-if="data.accommodation == 'Allowance'"
          class="group relative inline-flex items-center overflow-hidden bg-[#eef6fd] rounded-full px-2 py-1 text-[#0770e4] cursor-pointer"
        >
          <!-- Shimmer -->
          <span
            class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
          ></span>

          <!-- Icon -->
          <accommodation-icon class="relative z-10 h-4 w-4 shrink-0" />

          <!-- Hidden Text -->
          <span
            class="relative z-10 whitespace-nowrap text-sm font-medium w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:w-[180px] group-hover:opacity-100"
          >
            &nbsp;Accommodation Allowance
          </span>
        </badge>
        <badge
          v-if="data.transportation == 'Free'"
          class="group relative inline-flex items-center overflow-hidden bg-[#eef6fd] rounded-full px-2 py-1 text-[#0770e4] cursor-pointer"
        >
          <!-- Shimmer -->
          <span
            class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
          ></span>

          <!-- Icon -->
          <bus-icon class="relative z-10 h-4 w-4 shrink-0" />

          <!-- Hidden Text -->
          <span
            class="relative z-10 whitespace-nowrap text-sm font-medium w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:w-[95px] group-hover:opacity-100"
          >
            &nbsp;Free Transport
          </span>
        </badge>
        <badge
          v-if="data.transportation == 'Allowance'"
          class="group relative inline-flex items-center overflow-hidden bg-[#eef6fd] rounded-full px-2 py-1 text-[#0770e4] cursor-pointer"
        >
          <!-- Shimmer -->
          <span
            class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
          ></span>

          <!-- Icon -->
          <bus-icon class="relative z-10 h-4 w-4 shrink-0" />

          <!-- Hidden Text -->
          <span
            class="relative z-10 whitespace-nowrap text-sm font-medium w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:w-[175px] group-hover:opacity-100"
          >
            &nbsp;Transport Allowance
          </span>
        </badge>
        <badge
          v-if="data.joining_ticket == 'Company'"
          class="group relative inline-flex items-center overflow-hidden bg-[#eef6fd] rounded-full px-2 py-1 text-[#0770e4] cursor-pointer"
        >
          <!-- Shimmer -->
          <span
            class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
          ></span>

          <!-- Icon -->
          <flight-ticket-icon class="relative z-10 h-4 w-4 shrink-0" />

          <!-- Hidden Text -->
          <span
            class="relative z-10 whitespace-nowrap text-sm font-medium w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:w-[70px] group-hover:opacity-100"
          >
            &nbsp;Free Ticket
          </span>
        </badge>
      </div>
      <div class="flex gap-3 mb-2">
        <button
          v-if="page!='Activity'"
          @click="showJobDetails=true"
          class="text-center mt-3 w-full border border-primary py-1.5 rounded-lg text-primary text-[11px] font-medium"
        >
          Job Details
        </button>
        <button
          @click="handleApplyJob"
          v-if="page!='Activity'"
          :disabled="isSaving"
          class="text-center mt-3 w-full bg-primary py-1.5 rounded-lg text-white text-[11px] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{
  data.already_applied
    ? 'Check Status'
    : isSaving
      ? 'Applying'
      : 'Apply Now'
          }}
        </button>
        <button
          v-if="page=='Activity' && data.status!='IDB'"
          class="relative cursor-default overflow-hidden text-center mt-3 ml-auto w-[50%] bg-primary py-1.5 rounded-lg text-white text-[11px] font-medium"
        >
          <!-- Shimmer -->
          <span
            class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent"
          ></span>

          <!-- Text -->
          <span class="relative z-10">
            {{ getMappedStatus(data.status) }}
          </span>
        </button>
        <button
          v-if="page=='Activity' && data.status=='IDB'"
          class="relative cursor-default overflow-hidden text-center mt-3 ml-auto w-[50%] bg-primary py-1.5 rounded-lg text-white text-[11px] font-medium"
        >
          <!-- Shimmer -->
          <span
            class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent"
          ></span>

          <!-- Text -->
          <span class="relative z-10"> Better Luck Next Time </span>
        </button>
      </div>
    </div>
  </div>

  <!-- Overlay -->
  <div
    v-if="showJobDetails"
    class="fixed inset-0 z-40"
    @click="showJobDetails = false"
  >
    <!-- Backdrop -->
    <div
      class="absolute inset-0 bg-background/20 backdrop-blur-[0.25rem]"
      @click="showJobDetails = false"
    ></div>
  </div>
  <!-- Sidebar -->
  <transition
    enter-active-class="transform transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transform transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <div
      v-if="showJobDetails"
      class="fixed top-0 right-0 h-full w-[500px] bg-white shadow-2xl z-50 rounded-l-2xl transform-gpu"
    >
      <!-- Header -->
      <div class="flex items-center px-5 gap-5 py-4 border-b">
        <p class="text-2xl font-medium text-primary">
          Job details - <span>{{ data.name }}</span>
        </p>
        <badge
          class="relative overflow-hidden text-xs bg-[#ffebdb] rounded-lg px-3 py-1 text-[#e56700]"
        >
          <span class="relative z-10 font-normal"
            >• {{ timeAgo(data.created_on) }}</span
          >

          <span
            class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent"
          ></span>
        </badge>

        <button
          @click="showJobDetails = false"
          class="text-gray-500 hover:text-black ml-auto"
        >
          ✕
        </button>
      </div>

      <!-- Content -->
      <div class="px-5 pb-5 overflow-y-auto h-[calc(100%-70px)]">
        <div
          class="sticky top-0 z-20 relative pt-5 bg-white after:content-[''] after:absolute after:left-0 after:bottom-[-24px] after:w-full after:h-6 after:bg-gradient-to-b after:from-white after:to-transparent after:pointer-events-none"
        >
          <p class="text-xl font-semibold text-primary">{{ data.subject }}</p>
          <p class="mt-1 text-gray-600 font-medium">{{ data.customer }}</p>

          <div class="text-[14px] text-gray-600 font-medium flex gap-1">
            <img :src="data.custom_country_flag" class="h-5" />
            <p>{{ data.territory }}</p>
          </div>
          <div class="flex flex-wrap gap-3 mt-3 pb-2">
            <badge
              v-if="data.custom_free_recruitment == 'Yes'"
              class="relative overflow-hidden text-xs bg-[#eef6fd] rounded-lg px-3 py-1 text-[#0770e4]"
            >
              <span class="relative z-10 font-normal flex gap-2 items-center">
                <suitcase-icon class="w-4 h-4" />
                Free Recruitment</span
              >

              <span
                class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
              ></span>
            </badge>
            <badge
              v-if="data.food == 'Free'"
              class="relative overflow-hidden text-xs bg-[#eef6fd] rounded-lg px-3 py-1 text-[#0770e4]"
            >
              <span class="relative z-10 font-normal flex gap-2 items-center">
                <food-icon class="w-4 h-4" />
                Free Food</span
              >

              <span
                class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
              ></span>
            </badge>
            <badge
              v-if="data.food == 'Allowance'"
              class="relative overflow-hidden text-xs bg-[#eef6fd] rounded-lg px-3 py-1 text-[#0770e4]"
            >
              <span class="relative z-10 font-normal flex gap-2 items-center">
                <food-icon class="w-4 h-4" />
                Food Allowance</span
              >

              <span
                class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
              ></span>
            </badge>
            <badge
              v-if="data.accommodation == 'Free'"
              class="relative overflow-hidden text-xs bg-[#eef6fd] rounded-lg px-3 py-1 text-[#0770e4]"
            >
              <span class="relative z-10 font-normal flex gap-2 items-center">
                <accommodation-icon class="w-4 h-4" />
                Free Accommodation</span
              >

              <span
                class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
              ></span>
            </badge>
            <badge
              v-if="data.accommodation == 'Allowance'"
              class="relative overflow-hidden text-xs bg-[#eef6fd] rounded-lg px-3 py-1 text-[#0770e4]"
            >
              <span class="relative z-10 font-normal flex gap-2 items-center">
                <accommodation-icon class="w-4 h-4" />
                Accommodation Allowance</span
              >

              <span
                class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
              ></span>
            </badge>
            <badge
              v-if="data.transportation == 'Free'"
              class="relative overflow-hidden text-xs bg-[#eef6fd] rounded-lg px-3 py-1 text-[#0770e4]"
            >
              <span class="relative z-10 font-normal flex gap-2 items-center">
                <bus-icon class="w-4 h-4" />
                Free Transport</span
              >

              <span
                class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
              ></span>
            </badge>
            <badge
              v-if="data.transportation == 'Allowance'"
              class="relative overflow-hidden text-xs bg-[#eef6fd] rounded-lg px-3 py-1 text-[#0770e4]"
            >
              <span class="relative z-10 font-normal flex gap-2 items-center">
                <bus-icon class="w-4 h-4" />
                Transport Allowance</span
              >

              <span
                class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
              ></span>
            </badge>
            <badge
              v-if="data.joining_ticket == 'Company'"
              class="relative overflow-hidden text-xs bg-[#eef6fd] rounded-lg px-3 py-1 text-[#0770e4]"
            >
              <span class="relative z-10 font-normal flex gap-2 items-center">
                <flight-ticket-icon class="w-4 h-4" />
                Free Ticket</span
              >

              <span
                class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
              ></span>
            </badge>
          </div>
        </div>
        <img
          class="mt-4 h-[250px] w-full bg-cover rounded-lg"
          src="https://i.postimg.cc/t4mkfwWj/no-image-2.png"
        />
        &nbsp;
        <div class="">
          <div class="">
            <h1 class="font-semibold text-primary text-xl">Highlights</h1>

            <ul
              class="font-medium mt-1.5 text-[13px] md:text-[15px] text-gray-600 pl-2 list-disc pl-6"
            >
              <li>
                Qualification:
                {{ data.qualification_type




                }}<span v-if="data.specialization">
                  (need specialization in {{ data.specialization }})</span
                >
              </li>
              <li v-if="data.minimum_experience>0">
                Experience:
                <span
                  >{{ data.minimum_experience




                  }}<span v-if="data.maximum_experience>0"
                    >-{{ data.maximum_experience }}</span
                  >
                  years of experience</span
                >
              </li>
              <li v-else>Experience: <span>Fresher</span></li>
              <li v-if="data.gulf_experience>0">
                Gulf Experience:
                <span class=""
                  >{{ data.gulf_experience }} years of experience</span
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-3">
          <h1 class="font-semibold text-primary text-xl">Description</h1>
          <p
            class="pt-2 pl-2 text-gray-600 text-[13px] md:text-[15px] font-medium text-left"
            v-html="data.description"
          ></p>
        </div>

        <div class="mt-3 mb-10">
          <h1 class="font-semibold text-primary text-xl">About Company</h1>
          <p
            class="pt-2 pl-2 text-gray-600 text-[13px] md:text-[15px] font-medium text-left"
          >
            {{ data.customer }}
          </p>
          <div class="flex pl-2 gap-2">
            <img
              v-if="data.custom_country_flag"
              :src="data.custom_country_flag"
              :alt="flag-data.name"
              class="h-5"
            />
            <h2
              class="text-gray-600 text-[13px] md:text-[15px] font-medium text-left"
            >
              {{ data.territory }}
            </h2>
          </div>
          <p
            class="pt-2 pl-2 text-gray-600 text-[13px] md:text-[15px] font-medium text-left"
          >
            {{ data.custom_about_customer }}
          </p>

          <a
            :href="data.custom_customer_website"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2
              class="pl-2 text-md font-sans text-[#001d4e] font-semibold pb-2"
            >
              {{ data.custom_customer_website }}
            </h2>
          </a>
        </div>

        <div
          class="flex w-[90%] gap-5 mt-3 fixed bottom-0 bg-white pb-5 pt-1 bg-white after:content-[''] after:absolute after:left-0 after:top-[-24px] after:w-full after:h-6 after:bg-gradient-to-t after:from-white after:to-transparent after:pointer-events-none"
        >
          <button
            @click="handleApplyJob"
            v-if="page!='Activity'"
            :disabled="isSaving"
            class="text-center w-full bg-primary py-2 rounded-lg text-white text-[14px] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{
  data.already_applied
    ? 'Check Status'
    : isSaving
      ? 'Applying'
      : 'Apply Now'
            }}
          </button>
          <!-- <button
            class="text-center w-full bg-primary py-2 rounded-xl text-white text-[14px] font-medium"
          >
            Refer Friend
          </button> -->
        </div>
      </div>
    </div>
  </transition>

  <!-- Attach CV Dialog -->
  <Dialog v-model="showAttachCVDialog" title="Attach Resume" width="max-w-md">
    <div>
      <p class="text-[14px] text-gray-600 font-medium">
        We noticed that your resume is not attached yet. Please upload your
        resume to continue with your job application.
      </p>
      <div class="bg-white rounded-xl">
        <FileUpload
          class="mt-5"
          :title="resumeFileName"
          subtitle="Drop your resume here or click to browse"
          @file-selected="handleResumeUpload"
        />
      </div>
    </div>
  </Dialog>

  <Toast
    :show="showToast"
    @update:show="showToast = $event"
    :type="toastType"
    :title="toastTitle"
    :message="toastMessage"
  />

  <FreezePage
    :show="isSaving"
    title="Saving Details"
    message="Please wait while we save your information"
  />
</template>

<script setup>
// vue
import { ref, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

// Utils
import { timeAgo } from '@/utils/date'
import { uploadFile, handleSave } from '@/utils/document'
// Icons
import DownIcon from '@/components/icons/DownIcon.vue';
import SuitcaseIcon from './icons/SuitcaseIcon.vue';
import FoodIcon from './icons/FoodIcon.vue';
import AccommodationIcon from './icons/AccommodationIcon.vue';
import BusIcon from './icons/BusIcon.vue';
import FlightTicketIcon from './icons/FlightTicketIcon.vue';
import RibbonRightIcon from './icons/RibbonRightIcon.vue';
// Components
import Dialog from './Dialog.vue';
import FileUpload from './FileUpload.vue';
import Toast from './Toast.vue';
import FreezePage from './FreezePage.vue';

// Props
const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    view: {
      type: String,
      default: 'grid'
    },
    page: {
      type: String,
      default: ''
    },
    selected: {
      type: Boolean,
      default: false,
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    isCVAttached: {
      type: Boolean,
      default: false,
    },
    candidateName: {
      type: String,
      default: '',
    },
})

// Router
const router = useRouter()

// States
const showJobDetails = ref(false)
const showAttachCVDialog = ref(false)
const localCVAttached = ref(props.isCVAttached)

// Toast
const showToast = ref(false)
const toastType = ref('')
const toastTitle = ref('')
const toastMessage = ref('')

// Freeze
const isSaving = ref(false)

// File Uploads
const isResumeUploading = ref(false)
const resumeFileName = ref('Attach Resume')

// Status Mapping
const statusMapping = {
  "Sourced": "Received CV",
  "Pending QC": "Under Review",
  "Submit(SPOC)": "Shared with Recruiter",
  "Submitted(Client)": "Sent to Employer",
  "Shortlisted": "Shortlisted",
  "Linedup": "Interview Scheduled",
  "Linedup Confirmed": "Interview Confirmed",
  "Reported": "Joined Interview",
  "Interviewed": "Interview Completed",
  "Proposed PSL": "Offer in Progress",
  "Result Pending": "Awaiting Feedback",
}

function getMappedStatus(status) {
  return statusMapping[status] || status
}

function truncateText(text, length) {
    return text && text.length > length
      ? text.substring(0, length) + "..."
      : text;
}

// Methods
async function handleApplyJob() {
  if (props.data.already_applied) {
    router.push({
        path: '/activity',
        query: {
            jobId: props.data.name,
        }
    })
    return
  }
  if (!props.isLoggedIn) {
    const currentPath =
      window.location.pathname + window.location.search
    const redirectUrl = encodeURIComponent(currentPath)
    window.location.href = `/login?redirect-to=${redirectUrl}`
    return
  }
  else {
    if (!localCVAttached.value) {
      showAttachCVDialog.value = true
    }
    else {
      await handleSave({
        endpoint: '/api/method/jobpro.api.apply_job',
          payload: {
              candidate: props.candidateName,
              task: props.data.name,
          },

          onStart: () => {
              isSaving.value = true
          },

          onSuccess: () => {
              toastType.value = 'success'
              toastTitle.value = 'Applied'
              toastMessage.value = 'Application has been registered successfully'
              showToast.value = true
              props.data.already_applied = 1
          },

          onError: () => {
              toastType.value = 'error'
              toastTitle.value = 'Application Failed'
              toastMessage.value = 'There was an error applying for the job'
              showToast.value = true
          },

          onFinally: () => {
              isSaving.value = false
          }
      })
    }
  }
}

// Handle file uploads
const handleResumeUpload = async (file) => {
    await uploadFile({
        endpoint: '/api/method/jobpro.api.upload_file',
        file,
        doctype: "Candidate",
        docname: props.candidateName,
        fieldname: 'custom_updated__un_masked_cv',

        onStart: () => {
            isResumeUploading.value = true
            isSaving.value = true
        },

        onSuccess: async (data) => {
            toastType.value = 'success'
            toastTitle.value = 'Uploaded Successfully'
            toastMessage.value = 'Your CV has been uploaded.'
            showToast.value = true
            showAttachCVDialog.value = false

            localCVAttached.value = true

            await handleApplyJob()
        },

        onError: (error) => {
            toastType.value = 'error'
            toastTitle.value = 'Upload Failed'
            toastMessage.value = 'There was an error uploading your CV'
            showToast.value = true
        },

        onFinally: () => {
            isResumeUploading.value = false
            isSaving.value = false
        },
    })
}

watch(showJobDetails, (value) => {
    document.body.style.overflow = value ? 'hidden' : ''
})
watch(
  () => props.isCVAttached,
  (value) => {
    localCVAttached.value = value
  }
)
onUnmounted(() => {
    document.body.style.overflow = ''
})
</script>
