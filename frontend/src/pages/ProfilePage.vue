<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 bg-white rounded-xl shadow-sm hidden md:block md:relative">
      <div ref="profileCard" class="relative rounded-t-xl overflow-hidden">
        <div
          class="absolute inset-x-0 top-0 h-2/5 bg-primary text-white pr-10 pt-5"
        >
          <!-- Background -->
        </div>
        <div class="relative flex items-center py-10">
          <div
            class="ml-6 relative bg-white rounded-full group w-fit"
          >
            <AttachImage
              :modelValue="userData"
              :loading="photoUploading"
              @file-selected="handlePhotoChange"
            />            
          </div>
          <div class="text-white absolute top-6 left-[225px]">
            <div class="flex">
              <p class="font-semibold text-[25px] uppercase">{{ fullName }}</p>
            </div>
            <p class="font-semibold text-[20px] -mt-1 absolute">#{{ candidate.name }}</p>
          </div>
          <div class="flex justify-start items-center gap-6 ml-10 mt-20">
            <div>
              <p
                class="text-[15px] mt-1.5 text-primary font-medium flex gap-3 items-center capitalize"
              >
                <location-icon class="h-4 w-4 text-gray-500" />
                <span v-if="candidate.country">
                  {{
                    [
                      candidate.location,
                      candidate.temp_state,
                      candidate.country
                    ]
                      .filter(Boolean)
                      .join(', ')
                      .toLowerCase()
                  }}
                </span>
                <span v-else class="text-default"> Current Location </span>
              </p>
              <p
                class="text-[15px] mt-1.5 text-primary font-medium flex gap-3 items-center"
              >
                <suitcase-icon class="h-4 w-4 text-gray-500" />
                <span v-if="candidate.total_experience">
                  {{ candidate.total_experience || 0 }} Years
                </span>
                <span v-else> Fresher </span>
              </p>
              <p
                class="text-[15px] mt-1.5 text-primary font-medium flex gap-3 items-center"
              >
                <wallet-icon class="h-4 w-4 text-gray-500" />
                <span v-if="candidate.current_ctc">
                  {{ ctcCurrency }} {{ currentCtc }} -
                  {{ ctcMentionedIn }}
                </span>
                <span v-else class="text-default"> Current CTC </span>
              </p>
            </div>
            <div class="border-l border-gray-500 pl-6">
              <p
                class="text-[15px] mt-1.5 text-primary font-medium flex gap-3 items-center"
              >
                <phone-icon class="h-4 w-4 text-gray-500" />
                <span v-if="userData.mobile_no">
                  {{ userData.mobile_no }}
                </span>
                <span v-else class="text-default"> Mobile Number </span>
              </p>
              <p
                class="text-[15px] mt-1.5 text-primary font-medium flex gap-3 items-center"
              >
                <mail-icon class="h-4 w-4 text-gray-500" />
                {{ userData.email }}
              </p>
              <p
                class="text-[15px] mt-1.5 text-primary font-medium flex gap-3 items-center"
              >
                <calendar-icon class="h-4 w-4 text-gray-500" />
                <span v-if="candidate.notice_period_months == 1">
                  {{ candidate.notice_period_months }} Month
                </span>
                <span v-else-if="candidate.notice_period_months > 1">
                  {{ candidate.notice_period_months }} Months
                </span>
                <span v-else class="text-default"> Notice Period </span>
              </p>
            </div>
          </div>
          <div class="hidden md:block absolute top-0 right-0 p-5 pt-6">
            <div class="bg-white rounded-lg w-[330px] h-[200px] shadow-lg p-3">
              <div class="flex items-center">
                <h1 class="text-primary font-semibold relative">About me</h1>
                <button>
                  <edit-icon @click="showAboutMeDialog=true" class="h-4 w-4 ml-4 text-primary" />
                </button>
                <!-- <pin-icon class="h-10 w-10 top-0 absolute" /> -->
                <img src="../assets/defaults/pin.png" class="h-12 top-4 right-6 absolute" />
              </div>
              <div class="border-t border-gray-300 my-2"></div>
              <p v-if="bio" class="text-[14px] font-medium text-gray-600">{{ truncateText(bio, 215) }}</p>
              <p v-else class="text-[14px] font-medium text-gray-600">Write a short professional summary about yourself.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md:hidden bg-white col-span-12 rounded-xl">
      <div class="bg-primary h-20 rounded-t-xl w-full">
        <div>
          <AttachImage
            :modelValue="userData"
            :loading="photoUploading"
            @file-selected="handlePhotoChange"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-12 gap-6 mt-6 pb-10">
    <div class="hidden md:block md:col-span-3">
      <div class="bg-white shadow-sm rounded-xl p-5 relative sticky top-24">
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
              :img="userData"
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
          <button @click="scrollToPersonal" class="text-primary font-medium">
            Personal Details
          </button>
          <button @click="showPersonalDetailsDialog=true" class="text-primary ml-auto font-medium text-highlight">
            Add
          </button>
        </div>
        <div
          class="flex mt-4 px-5 text-[15px] hover:bg-hoverbg rounded-lg cursor-pointer py-2"
        >
          <button @click="scrollToContact" class="text-primary font-medium">
            Contact Details
          </button>
          <button @click="showContactDetailsDialog=true" class="text-primary ml-auto font-medium text-highlight">
            Add
          </button>
        </div>
        <div
          class="flex mt-4 px-5 text-[15px] hover:bg-hoverbg rounded-lg cursor-pointer py-2"
        >
          <button @click="scrollToEducation" class="text-primary font-medium">
            Education Details
          </button>
          <button @click="showEducationDetailsDialog=true" class="text-primary ml-auto font-medium text-highlight">
            Add
          </button>
        </div>
        <div
          class="flex mt-4 px-5 text-[15px] hover:bg-hoverbg rounded-lg cursor-pointer py-2"
        >
          <button @click="scrollToExperience" class="text-primary font-medium">
            Experience Details
          </button>
          <button @click="showExperienceDetailsDialog=true" class="text-primary ml-auto font-medium text-highlight">
            Add
          </button>
        </div>
        <div
          class="flex mt-4 px-5 text-[15px] hover:bg-hoverbg rounded-lg cursor-pointer py-2"
        >
          <button @click="scrollToPassport" class="text-primary font-medium">
            Passport Details
          </button>
          <button @click="showPassportDetailsDialog=true" class="text-primary ml-auto font-medium text-highlight">
            Add
          </button>
        </div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-9 mb-10 md:mb-0">
      <!-- Resume Upload -->
      <div ref="resumeSection" class="p-6 bg-white rounded-xl">
        <div class="flex items-center">
          <h1 class="font-semibold text-primary">Resume</h1>
          <div v-show="resumeURL" class="flex gap-5 pr-5 ml-auto">
            <button>
              <download-icon @click="downloadResume" class="h-4 w-4 text-highlight" />
            </button>
            <button>
              <delete-icon @click="deleteResume" class="h-4 w-4 text-red-500" />
            </button>
          </div>
        </div>
        <FileUpload class="mt-3"
          :title="resumeFileName"
          subtitle="Drop your resume here or click to browse"
          :loading="isResumeUploading"
          @file-selected="handleResumeUpload"
        />
      </div>
      <!-- Personal Details -->
      <div ref="personalSection" class="bg-white rounded-xl shadow-sm p-5 mt-6">
        <div class="flex">
          <h1 class="font-semibold text-primary">Personal Details</h1>
          <button
            @click="showPersonalDetailsDialog=true"
            class="text-primary ml-auto text-[14px] font-medium text-highlight"
          >
            Add personal details
          </button>
        </div>
        <div class="text-gray-500 font-medium text-[13px] mt-2">
          This information is important for employers to know you better
        </div>
      </div>
      <!-- Contact Details -->
      <div ref="contactSection" class="bg-white rounded-xl shadow-sm p-5 mt-6">
        <div class="flex">
          <h1 class="font-semibold text-primary">Contact Details</h1>
          <button
            @click="showContactDetailsDialog=true"
            class="text-primary ml-auto text-[14px] font-medium text-highlight"
          >
            Add contact details
          </button>
        </div>
        <div class="text-gray-500 font-medium text-[13px] mt-2">
          Add a contact details so that recruiters can reach you
        </div>
      </div>
      <!-- Education Details -->
      <div
        ref="educationSection"
        class="bg-white rounded-xl shadow-sm p-5 mt-6"
      >
        <div class="flex">
          <h1 class="font-semibold text-primary">Education Details</h1>
          <button
            @click="showEducationDetailsDialog=true"
            class="text-primary ml-auto text-[14px] font-medium text-highlight"
          >
            Add education details
          </button>
        </div>
        <div 
          v-if="candidate.table_28" 
          v-for="edu in candidate.table_28"
          class="px-3 mt-3"
        >
          <div class="py-2">
            <div class="flex items-center gap-5">
              <p class="text-primary/90 font-medium ">{{ edu.school_univ }}</p>
              <button class="ml-auto">
                <edit-icon class="h-4 w-4 text-highlight" />
              </button>
              <button>
                <delete-icon class="h-4 w-4 text-red-500" />
              </button>
            </div>
            <p class="text-primary/80 font-medium text-[14px]">{{ edu.level }} 
              <!-- <span v-if="edu.specialization">, {{ edu.specialization }}</span> -->
              <span v-if="edu.class_per"> - {{ edu.class_per }}%</span>
            </p>
            <p class="text-primary/80 font-medium text-[14px]">{{ edu.specialization }}</p>
            <p class="text-primary/80 font-medium text-[14px]">{{ edu.year_of_passing }}</p>
          </div>
          <div v-if="edu.idx!=candidate.table_28.length" class="border-t border-gray-300 my-2"></div>
        </div>
        <div v-else class="text-gray-500 font-medium text-[13px] mt-2">
          Add your education details to showcase your qualifications
        </div>
      </div>
      
      <!-- Experience Details -->
      <div
        ref="experienceSection"
        class="bg-white rounded-xl shadow-sm p-5 mt-6"
      >
        <div class="flex">
          <h1 class="font-semibold text-primary">Experience Details</h1>
          <button
            @click="showExperienceDetailsDialog=true"
            class="text-primary ml-auto text-[14px] font-medium text-highlight"
          >
            Add experience details
          </button>
        </div>
        <div 
          v-if="candidate.experience_details" 
          v-for="exp in candidate.experience_details"
          class="px-3 mt-3"
        >
          <div class="py-2">
            <div class="flex items-center gap-5">
              <p class="text-primary/90 font-medium ">{{ exp.organization }}</p>
              <button class="ml-auto">
                <edit-icon class="h-4 w-4 text-highlight" />
              </button>
              <button>
                <delete-icon class="h-4 w-4 text-red-500" />
              </button>
            </div>
            <p class="text-primary/80 font-medium text-[14px]">{{ exp.role }}</p>
            <p class="text-primary/80 font-medium text-[14px]">{{ formatMonthYear(exp.from_date) }} - {{ formatMonthYear(exp.to_date) }}</p>
            <p v-if="exp.work_summary" class="text-primary/80 font-medium text-[14px] bg-background p-3 rounded-lg mt-3">{{ exp.work_summary }}</p>
          </div>
          <div v-if="exp.idx!=candidate.experience_details.length" class="border-t border-gray-300 my-2"></div>
        </div>
        <div v-else class="text-gray-500 font-medium text-[13px] mt-2">
          Add your experience details to showcase your professional background
        </div>
      </div>
      <!-- Passport Upload -->
      <div ref="passportAttachSection" class="p-6 bg-white rounded-xl mt-6">
        <div class="flex items-center">
          <h1 class="font-semibold text-primary">Passport</h1>
          <div v-show="passportURL" class="flex gap-5 pr-5 ml-auto">
            <button>
              <download-icon @click="downloadPassport" class="h-4 w-4 text-highlight" />
            </button>
            <button>
              <delete-icon @click="deletePassport" class="h-4 w-4 text-red-500" />
            </button>
          </div>
        </div>
        <FileUpload class="mt-3"
          :title="passportFileName"
          subtitle="Drop your passport here or click to browse"
          :loading="isPassportUploading"
          @file-selected="handlePassportUpload"
        />
      </div>
      <!-- Passport Details -->
      <div ref="passportSection" class="bg-white rounded-xl shadow-sm p-5 mt-6">
        <div class="flex">
          <h1 class="font-semibold text-primary">Passport Details</h1>
          <button
            @click="showPassportDetailsDialog=true"
            class="text-primary ml-auto text-[14px] font-medium text-highlight"
          >
            Add passport details
          </button>
        </div>
        <div class="text-gray-500 font-medium text-[13px] mt-2">
          Add your passport details to verify your identity and facilitate
          international job opportunities
        </div>
      </div>
    </div>
  </div>

  <!-- About Me Dialog -->
  <Dialog v-model="showAboutMeDialog" title="About Me" width="max-w-2xl">
    <div>
      <label class="text-[13px] text-gray-600 font-medium">Write a short professional summary about yourself.</label>
      <textarea v-model="bio" class="bg-background h-40 w-full mb-2 border-0 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"></textarea>
    </div>

    <template #footer>
      <button
        class="px-4 font-medium rounded-lg bg-primary text-white min-w-[90px] max-w-[90px] h-8 flex items-center justify-center gap-2 disabled:opacity-70"
        @click="saveAboutMe"
        :disabled="isSaving"
      >
        <Loader v-if="isSaving" class="text-[24px]" />

        <span>
          {{ saveStatus }}
        </span>
      </button>
    </template>
  </Dialog>

  <!-- Personal Details Dialog -->
  <Dialog v-model="showPersonalDetailsDialog" title="Personal Details" width="max-w-2xl">
    <div class="text-gray-600 flex gap-6">
      <div class="">
        <label class="text-[13px] font-medium">Full Name</label>
        <input
          type="text"
          v-model="fullName"
          placeholder="Enter full name"
          class="bg-background uppercase w-full mb-2 border-0 mt-2 font-medium text-[13px] rounded-lg text-primary outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
        <label class="text-[13px] font-medium">Date of Birth</label>
        <input
          type="date"
          v-model="dateOfBirth"
          placeholder="Select date of birth"
          class="bg-background w-full border-0 mb-2 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
        <label class="text-[13px] font-medium">Gender</label>
        <input
          type="text"
          v-model="gender"
          placeholder="Select gender"
          @focus="showGenderSuggestions = true"
          @blur="hideGenderSuggestions"
          class="bg-background w-full mb-2 border-0 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
        <div
          v-if="showGenderSuggestions && filteredGenderOptions.length"
          class="z-60 mt-1 w-[300px] max-h-[200px] absolute hide-scrollbar overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
        >
          <div
            v-for="option in filteredGenderOptions"
            :key="option"
            @mousedown="selectGenderOption(option)"
            class="px-3 py-1 text-[13px] text-gray-700 cursor-pointer hover:bg-hoverbg transition-all duration-200"
          >
            {{ option }}
          </div>
        </div>
        <label class="text-[13px] font-medium">Vaccination Status</label>
        <input
          type="text"
          v-model="vaccination"
          placeholder="Select vaccination"
          @focus="showVaccinationSuggestions = true"
          @blur="hideVaccinationSuggestions"
          class="bg-background w-full border-0 mb-2 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
        <div
          v-if="showVaccinationSuggestions && filteredVaccinationOptions.length"
          class="z-60 mt-1 w-[300px] max-h-[200px] absolute hide-scrollbar overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
        >
          <div
            v-for="option in filteredVaccinationOptions"
            :key="option"
            @mousedown="selectVaccinationOption(option)"
            class="px-3 py-1 text-[13px] text-gray-700 cursor-pointer hover:bg-hoverbg transition-all duration-200"
          >
            {{ option }}
          </div>
        </div>
      </div>
      <div>
        <label class="text-[13px] font-medium">Nationality</label>
        <input
          type="text"
          v-model="nationality"
          placeholder="Select nationality"
          @focus="showNationalitySuggestions = true"
          @blur="hideNationalitySuggestions"
          class="bg-background w-full border-0 mb-2 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
        <div
          v-if="showNationalitySuggestions && filteredNationalityOptions.length"
          class="z-60 mt-1 w-[300px] max-h-[200px] absolute hide-scrollbar overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
        >
          <div
            v-for="option in filteredNationalityOptions"
            :key="option"
            @mousedown="selectNationalityOption(option)"
            class="px-3 py-1 text-[13px] text-gray-700 cursor-pointer hover:bg-hoverbg transition-all duration-200"
          >
            {{ option }}
          </div>
        </div>
        <label class="text-[13px] font-medium">District</label>
        <input
          type="text"
          v-model="district"
          placeholder="Select district"
          @focus="showDistrictSuggestions = true"
          @blur="hideDistrictSuggestions"
          class="bg-background w-full border-0 mb-2 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
        <div
          v-if="showDistrictSuggestions && filteredDistrictOptions.length"
          class="z-60 mt-1 w-[300px] max-h-[200px] absolute hide-scrollbar overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
        >
          <div
            v-for="option in filteredDistrictOptions"
            :key="option"
            @mousedown="selectDistrictOption(option)"
            class="px-3 py-1 text-[13px] text-gray-700 cursor-pointer hover:bg-hoverbg transition-all duration-200"
          >
            {{ option }}
          </div>
        </div>
        <label class="text-[13px] font-medium">State</label>
        <input
          type="text"
          v-model="state"
          placeholder="Select state"
          @focus="showStateSuggestions = true"
          @blur="hideStateSuggestions"
          class="bg-background w-full border-0 mb-2 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
        <div
          v-if="showStateSuggestions && filteredStateOptions.length"
          class="z-60 mt-1 w-[300px] max-h-[200px] absolute hide-scrollbar overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
        >
          <div
            v-for="option in filteredStateOptions"
            :key="option"
            @mousedown="selectStateOption(option)"
            class="px-3 py-1 text-[13px] text-gray-700 cursor-pointer hover:bg-hoverbg transition-all duration-200"
          >
            {{ option }}
          </div>
        </div>
        <label class="text-[13px] font-medium">Country</label>
        <input
          type="text"
          v-model="country"
          placeholder="Select country"
          @focus="showCountrySuggestions = true"
          @blur="hideCountrySuggestions"
          class="bg-background w-full border-0 mb-2 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
        <div
          v-if="showCountrySuggestions && filteredCountryOptions.length"
          class="z-60 mt-1 w-[300px] max-h-[200px] absolute hide-scrollbar overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
        >
          <div
            v-for="option in filteredCountryOptions"
            :key="option"
            @mousedown="selectCountryOption(option)"
            class="px-3 py-1 text-[13px] text-gray-700 cursor-pointer hover:bg-hoverbg transition-all duration-200"
          >
            {{ option }}
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <button
        class="px-4 font-medium rounded-lg bg-primary text-white min-w-[90px] max-w-[90px] h-8 flex items-center justify-center gap-2 disabled:opacity-70"
        @click="savePersonalDetails"
        :disabled="isSaving"
      >
        <Loader v-if="isSaving" class="text-[24px]" />

        <span>
          {{ saveStatus }}
        </span>
      </button>
    </template>
  </Dialog>

  <!-- Contact Details Dialog -->
  <Dialog v-model="showContactDetailsDialog" title="Contact Details" width="max-w-md">
    <div class="text-gray-600 flex gap-6">
      <div class="">
        <label class="text-[13px] font-medium">Email</label>
        <input
          readonly
          type="email"
          v-model="email"
          placeholder="Enter email"
          class="bg-hoverbg hover:cursor-not-allowed w-full mb-2 border-0 mt-2 font-medium text-[13px] rounded-lg text-primary outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
        <label class="text-[13px] font-medium">Mobile Number</label>
        <input
          type="telephone"
          v-model="mobileNumber"
          placeholder="Enter mobile number"
          class="bg-background w-full border-0 mb-2 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
        <label class="text-[13px] font-medium">Alternate Number</label>
        <input
          type="telephone"
          v-model="alternateNumber"
          placeholder="Enter alternate number"
          class="bg-background w-full border-0 mb-2 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
        <label class="text-[13px] font-medium">Whatsapp Number</label>
        <input
          type="telephone"
          v-model="whatsappNumber"
          placeholder="eg. +91-9677400172"
          class="bg-background w-full border-0 mb-2 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
      </div>
    </div>

    <template #footer>
      <button
        class="px-4 font-medium rounded-lg bg-primary text-white min-w-[90px] max-w-[90px] h-8 flex items-center justify-center gap-2 disabled:opacity-70"
        @click="saveContactDetails"
        :disabled="isSaving"
      >
        <Loader v-if="isSaving" class="text-[24px]" />

        <span>
          {{ saveStatus }}
        </span>
      </button>
    </template>
  </Dialog>

  <!-- Education Details Dialog -->
  <Dialog v-model="showEducationDetailsDialog" title="Education Details" width="max-w-md">
    <div class="text-gray-600 flex gap-6">
      <div class="">
        <label class="text-[13px] font-medium">Highest Degree</label>
        <input
          type="text"
          v-model="highestDegree"
          placeholder="Select highest degree"
          @focus="showHighestDegreeSuggestions = true"
          @blur="hideHighestDegreeSuggestions"
          class="bg-background w-full border-0 mb-2 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
        <div
          v-if="showHighestDegreeSuggestions && filteredHighestDegreeOptions.length"
          class="z-60 mt-1 w-[400px] max-h-[200px] absolute hide-scrollbar overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
        >
          <div
            v-for="option in filteredHighestDegreeOptions"
            :key="option"
            @mousedown="selectHighestDegreeOption(option)"
            class="px-3 py-1 text-[13px] text-gray-700 cursor-pointer hover:bg-hoverbg transition-all duration-200"
          >
            {{ option }}
          </div>
        </div>
        <label class="text-[13px] font-medium">Specialization</label>
        <input
          type="text"
          v-model="specialization"
          placeholder="Select specialization"
          @focus="showSpecializationSuggestions = true"
          @blur="hideSpecializationSuggestions"
          class="bg-background w-full border-0 mb-2 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
        <div
          v-if="showSpecializationSuggestions && filteredSpecializationOptions.length"
          class="z-60 mt-1 w-[400px] max-h-[200px] absolute hide-scrollbar overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
        >
          <div
            v-for="option in filteredSpecializationOptions"
            :key="option"
            @mousedown="selectSpecializationOption(option)"
            class="px-3 py-1 text-[13px] text-gray-700 cursor-pointer hover:bg-hoverbg transition-all duration-200"
          >
            {{ option }}
          </div>
        </div>
        <label class="text-[13px] font-medium">Year of Passing</label>
        <input
          type="text"
          v-model="yearOfPassing"
          placeholder="Select year of passing"
          @focus="showYearOfPassingSuggestions = true"
          @blur="hideYearOfPassingSuggestions"
          class="bg-background w-full border-0 mb-2 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
        <div
          v-if="showYearOfPassingSuggestions && filteredYearOfPassingOptions.length"
          class="z-60 mt-1 w-[400px] max-h-[200px] absolute hide-scrollbar overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
        >
          <div
            v-for="option in filteredYearOfPassingOptions"
            :key="option"
            @mousedown="selectYearOfPassingOption(option)"
            class="px-3 py-1 text-[13px] text-gray-700 cursor-pointer hover:bg-hoverbg transition-all duration-200"
          >
            {{ option }}
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <button
        class="px-4 font-medium rounded-lg bg-primary text-white min-w-[90px] max-w-[90px] h-8 flex items-center justify-center gap-2 disabled:opacity-70"
        @click="saveEducationDetails"
        :disabled="isSaving"
      >
        <Loader v-if="isSaving" class="text-[24px]" />

        <span>
          {{ saveStatus }}
        </span>
      </button>
    </template>
  </Dialog>

  <!-- Experience Details Dialog -->
  <Dialog v-model="showExperienceDetailsDialog" title="Experience Details" width="max-w-2xl">
    <div class="text-gray-600 flex gap-6">
      <div class="">
        <label class="text-[13px] font-medium">India Experience</label>
        <input
          type="text"
          v-model="indiaExperience"
          placeholder="Enter India experience"
          class="bg-background w-full mb-2 border-0 mt-2 font-medium text-[13px] rounded-lg text-primary outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
        <label class="text-[13px] font-medium">Overseas Experience</label>
        <input
          type="text"
          v-model="overseasExperience"
          placeholder="Enter overseas experience"
          class="bg-background w-full border-0 mb-2 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
        <label class="text-[13px] font-medium">Current Employer</label>
        <input
          type="text"
          v-model="currentEmployer"
          placeholder="Enter current employer"
          class="bg-background w-full border-0 mb-2 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
        <label class="text-[13px] font-medium">Notice Period (in months)</label>
        <input
          type="text"
          v-model="noticePeriod"
          placeholder="Enter notice period"
          class="bg-background w-full border-0 mb-2 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
      </div>
      <div>
        <label class="text-[13px] font-medium">CTC Mentioned In</label>
        <input
          type="text"
          v-model="ctcMentionedIn"
          placeholder="Select CTC mentioned in"
          @focus="showCTCMentionedInSuggestions = true"
          @blur="hideCTCMentionedInSuggestions"
          class="bg-background w-full mb-2 border-0 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
        <div
          v-if="showCTCMentionedInSuggestions && filteredCTCMentionedInOptions.length"
          class="z-60 mt-1 w-[288px] max-h-[200px] absolute hide-scrollbar overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
        >
          <div
            v-for="option in filteredCTCMentionedInOptions"
            :key="option"
            @mousedown="selectCTCMentionedInOption(option)"
            class="px-3 py-1 text-[13px] text-gray-700 cursor-pointer hover:bg-hoverbg transition-all duration-200"
          >
            {{ option }}
          </div>
        </div>
        <label class="text-[13px] font-medium">CTC Currency</label>
        <input
          type="text"
          v-model="ctcCurrency"
          placeholder="Select CTC currency"
          @focus="showCTCCurrencySuggestions = true"
          @blur="hideCTCCurrencySuggestions"
          class="bg-background w-full mb-2 border-0 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
        <div
          v-if="showCTCCurrencySuggestions && filteredCTCCurrencyOptions.length"
          class="z-60 mt-1 w-[288px] max-h-[200px] absolute hide-scrollbar overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
        >
          <div
            v-for="option in filteredCTCCurrencyOptions"
            :key="option"
            @mousedown="selectCTCCurrencyOption(option)"
            class="px-3 py-1 text-[13px] text-gray-700 cursor-pointer hover:bg-hoverbg transition-all duration-200"
          >
            {{ option }}
          </div>
        </div>
        <label class="text-[13px] font-medium">Current CTC</label>
        <input
          type="text"
          v-model="currentCtc"
          placeholder="Enter current CTC"
          class="bg-background w-full border-0 mb-2 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
        <label class="text-[13px] font-medium">Expected CTC</label>
        <input
          type="text"
          v-model="expectedCtc"
          placeholder="Enter expected CTC"
          class="bg-background w-full border-0 mb-2 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
      </div>
    </div>

    <template #footer>
      <button
        class="px-4 font-medium rounded-lg bg-primary text-white min-w-[90px] max-w-[90px] h-8 flex items-center justify-center gap-2 disabled:opacity-70"
        @click="saveExperienceDetails"
        :disabled="isSaving"
      >
        <Loader v-if="isSaving" class="text-[24px]" />

        <span>
          {{ saveStatus }}
        </span>
      </button>
    </template>
  </Dialog>

  <!-- Passport Details Dialog -->
  <Dialog v-model="showPassportDetailsDialog" title="Passport Details" width="max-w-md">
    <div class="text-gray-600 flex gap-6">
      <div class="">
        <label class="text-[13px] font-medium">Passport Number</label>
        <input
          type="text"
          v-model="passportNumber"
          placeholder="Enter passport number"
          class="bg-background w-full mb-2 border-0 mt-2 font-medium text-[13px] rounded-lg text-primary outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
        <label class="text-[13px] font-medium">Expiry Date</label>
        <input
          type="date"
          v-model="expiryDate"
          class="bg-background w-full border-0 mb-2 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
        <label class="text-[13px] font-medium">Passport Category</label>
        <input
          type="text"
          v-model="passportCategory"
          placeholder="Select passport category"
          @focus="showPassportCategorySuggestions = true"
          @blur="hidePassportCategorySuggestions"
          class="bg-background w-full border-0 mb-2 mt-2 text-[13px] rounded-lg text-primary font-medium outline-none focus:ring-2 focus:ring-gray-400 px-2 py-1 transition-all duration-300 ease-in-out"
        />
        <div
          v-if="showPassportCategorySuggestions && filteredPassportCategoryOptions.length"
          class="z-60 mt-1 w-[400px] max-h-[200px] absolute hide-scrollbar overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
        >
          <div
            v-for="option in filteredPassportCategoryOptions"
            :key="option"
            @mousedown="selectPassportCategoryOption(option)"
            class="px-3 py-1 text-[13px] text-gray-700 cursor-pointer hover:bg-hoverbg transition-all duration-200"
          >
            {{ option }}
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <button
        class="px-4 font-medium rounded-lg bg-primary text-white min-w-[90px] max-w-[90px] h-8 flex items-center justify-center gap-2 disabled:opacity-70"
        @click="savePassportDetails"
        :disabled="isSaving"
      >
        <Loader v-if="isSaving" class="text-[24px]" />

        <span>
          {{ saveStatus }}
        </span>
      </button>
    </template>
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
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'

// Data
import { user } from '@/data/user'
import { getCandidate } from '@/data/candidate'
import { getNationality, getDistricts, getState, getCurrency, getCountry, getHighestDegree, getSpecialization } from '@/data/doctype'

// Utils
import { handleSave, uploadFile, deleteFile } from '@/utils/document'
import { formatMonthYear } from '../utils/date'

// Components
import Avatar from '../components/Avatar.vue'
import Dialog from '../components/Dialog.vue'
import Loader from '../components/Loader.vue'
import Toast from '../components/Toast.vue'
import FreezePage from '../components/FreezePage.vue'
import FileUpload from '../components/FileUpload.vue'

// Icons
import EditIcon from '../components/icons/EditIcon.vue'
import PhoneIcon from '../components/icons/PhoneIcon.vue'
import MailIcon from '../components/icons/MailIcon.vue'
import CalendarIcon from '../components/icons/CalendarIcon.vue'
import LocationIcon from '../components/icons/LocationIcon.vue'
import SuitcaseIcon from '../components/icons/SuitcaseIcon.vue'
import WalletIcon from '../components/icons/WalletIcon.vue'
import CameraIcon from '../components/icons/CameraIcon.vue'
import AttachmentIcon from '../components/icons/AttachmentIcon.vue'
import DownloadIcon from '../components/icons/DownloadIcon.vue'
import DeleteIcon from '../components/icons/DeleteIcon.vue'
import AttachImage from '../components/AttachImage.vue'
import PinIcon from '../components/icons/PinIcon.vue'

// .env
const EXTERNAL_SITE = import.meta.env.VITE_FRAPPE_EXTERNAL_SITE

// State
const showProfile = ref(false)
const profileCard = ref(null)
const candidate = ref({})
const saveStatus = ref('Save')
const isSaving = ref(false)

// File Uploads
const isResumeUploading = ref(false)
const isPassportUploading = ref(false)
const resumeFileName = ref('Attach Resume')
const passportFileName = ref('Attach Passport')
const resumeURL = ref('')
const passportURL = ref('')

// Attach Image
const photoUploading = ref(false)
const profileImage = ref(user.image)

// Toast
const showToast = ref(false)
const toastType = ref('')
const toastTitle = ref('')
const toastMessage = ref('')

// Dialog states
const showAboutMeDialog = ref(false)
const showPersonalDetailsDialog = ref(false)
const showContactDetailsDialog = ref(false)
const showEducationDetailsDialog = ref(false)
const showExperienceDetailsDialog = ref(false)
const showPassportDetailsDialog = ref(false)

const bio = ref('')
// Section refs
const resumeSection = ref(null)
const passportAttachSection = ref(null)
const personalSection = ref(null)
const contactSection = ref(null)
const educationSection = ref(null)
const experienceSection = ref(null)
const passportSection = ref(null)

// Fields
const fullName = ref('')
const dateOfBirth = ref('')
const vaccination = ref('')
const gender = ref('')
const nationality = ref('')
const district = ref('')
const state = ref('')
const country = ref('')
const email = ref('')
const mobileNumber = ref('')
const alternateNumber = ref('')
const whatsappNumber = ref('')
const indiaExperience = ref('')
const overseasExperience = ref('')
const currentEmployer = ref('')
const noticePeriod = ref('')
const ctcMentionedIn = ref('')
const ctcCurrency = ref('')
const currentCtc = ref('')
const expectedCtc = ref('')
const passportNumber = ref('')
const oldPassportNumber = ref('')
const expiryDate = ref('')
const passportCategory = ref('')
const highestDegree = ref('')
const specialization = ref('')
const yearOfPassing = ref('')

// Suggestion Dropdown States
const showVaccinationSuggestions = ref(false)
const showGenderSuggestions = ref(false)
const showNationalitySuggestions = ref(false)
const showDistrictSuggestions = ref(false)
const showStateSuggestions = ref(false)
const showCountrySuggestions = ref(false)
const showCTCMentionedInSuggestions = ref(false)
const showCTCCurrencySuggestions = ref(false)
const showPassportCategorySuggestions = ref(false)
const showHighestDegreeSuggestions = ref(false)
const showSpecializationSuggestions = ref(false)
const showYearOfPassingSuggestions = ref(false)

// Options
const vaccinationOptions = [
  "Dose 1",
  "Dose 2",
  "Dose 3",
  "Not Vaccinated"
]
const genderOptions = [
  "Male",
  "Female",
  "Prefer Not to say"
]
const nationalityOptions = ref([])
const districtOptions = ref([])
const stateOptions = ref([])
const countryOptions = ref([])
const CTCMentionedInOptions = [
  "Monthly",
  "Yearly"
]
const CTCCurrencyOptions = ref([])
const passportCategoryOptions = [
  "ECR",
  "ECNR"
]
const highestDegreeOptions = ref([])
const specializationOptions = ref([])
const yearOfPassingOptions = Array.from(
  { length: new Date().getFullYear() - 1960 + 1 },
  (_, index) => String(new Date().getFullYear() - index)
)

// Reusable smooth scroll
const scrollToSection = (sectionRef) => {
    if (!sectionRef.value) return

    const yOffset = -100

    const y =
        sectionRef.value.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset

    window.scrollTo({
        top: y,
        behavior: 'smooth'
    })
}

// Scroll handlers
const scrollToResume = () => scrollToSection(resumeSection)
const scrollToPassportAttach = () => scrollToSection(passportAttachSection)
const scrollToPersonal = () => scrollToSection(personalSection)
const scrollToContact = () => scrollToSection(contactSection)
const scrollToEducation = () => scrollToSection(educationSection)
const scrollToExperience = () => scrollToSection(experienceSection)
const scrollToPassport = () => scrollToSection(passportSection)

// User data
const userData = computed(() => ({
    src: profileImage.value,
    alt: 'profile',
    fullName: user.fullName,
    email: user.email,
    mobile_no: user.mobileNo,
    bio: bio.value
}))

// Observer
let observer = null

onMounted(async () => {
    observer = new IntersectionObserver(
        ([entry]) => {
            showProfile.value = !entry.isIntersecting
        },
        {
            threshold: 0.5
        }
    )

    if (profileCard.value) {
        observer.observe(profileCard.value)
    }
    // options
    nationalityOptions.value = await getNationality()
    districtOptions.value = await getDistricts()
    stateOptions.value = await getState()
    countryOptions.value = await getCountry()
    CTCCurrencyOptions.value = await getCurrency()
    highestDegreeOptions.value = await getHighestDegree()
    specializationOptions.value = await getSpecialization()
})

onBeforeUnmount(() => {
    if (observer && profileCard.value) {
        observer.unobserve(profileCard.value)
    }
})

// Candidate fetch
watch(
    () => user.email,
    async (email) => {
        if (!email) return

        candidate.value = await getCandidate(email)
    },
    { immediate: true }
)

// Set value for fields
watch(candidate, (val) => {
    // Personal Details
    fullName.value = val?.given_name || ''
    dateOfBirth.value = val?.date_of_birth || ''
    vaccination.value = val?.vaccination_status || ''
    gender.value = val?.gender || ''
    nationality.value = val?.nationality || ''
    district.value = val?.location || ''
    state.value = val?.temp_state || ''
    country.value = val?.country || ''
    // Contact Details
    email.value = val?.mail_id || ''
    mobileNumber.value = val?.mobile_number || ''
    alternateNumber.value = val?.mobile || ''
    whatsappNumber.value = val?.whatsapp_number || ''
    // Education Details
    highestDegree.value = val?.highest_degree || ''
    specialization.value = val?.specialization || ''
    yearOfPassing.value = val?.year_of_passing || ''
    // Experience Details
    indiaExperience.value = val?.india_experience || ''
    overseasExperience.value = val?.overseas_experience || ''
    currentEmployer.value = val?.current_employer || ''
    noticePeriod.value = val?.notice_period_months || ''
    ctcMentionedIn.value = val?.ctc_mentioned_in || ''
    ctcCurrency.value = val?.currency_ctc || ''
    currentCtc.value = val?.current_ctc || ''
    expectedCtc.value = val?.expected_ctc || ''
    // Passport Details
    passportNumber.value = val?.passport_number || ''
    oldPassportNumber.value = val?.custom_old_passport_number || ''
    expiryDate.value = val?.passport_expiry_date || ''
    passportCategory.value = val?.ecr_status_candidate || ''
    // File
    resumeURL.value =
        val?.custom_updated__un_masked_cv
            ? `${EXTERNAL_SITE}${val.custom_updated__un_masked_cv}`
            : ''
    passportURL.value =
        val?.passport
            ? `${EXTERNAL_SITE}${val.passport}`
            : ''
    resumeFileName.value =
        val?.custom_updated__un_masked_cv
            ? `Resume: ${fullName.value}`
            : 'Attach Resume'
    passportFileName.value =
        val?.passport
            ? `Passport: ${fullName.value}`
            : 'Attach Passport'
    profileImage.value =
      val?.candidate_image
        ? val.candidate_image.startsWith('/file')
          ? `${EXTERNAL_SITE}${val.candidate_image}`
          : val.candidate_image
        : user.image

    bio.value = user.bio

})

// Field Suggestions
function selectVaccinationOption(option) {
    selectOption(
        vaccination,
        option,
        showVaccinationSuggestions
    )
}
function selectGenderOption(option) {
    selectOption(
        gender,
        option,
        showGenderSuggestions
    )
}
function selectNationalityOption(option) {
    selectOption(
        nationality,
        option,
        showNationalitySuggestions
    )
}
function selectDistrictOption(option) {
    selectOption(
        district,
        option,
        showDistrictSuggestions
    )
}
function selectStateOption(option) {
    selectOption(
        state,
        option,
        showStateSuggestions
    )
}
function selectCTCMentionedInOption(option) {
    selectOption(
        ctcMentionedIn,
        option,
        showCTCMentionedInSuggestions
    )
}
function selectCTCCurrencyOption(option) {
    selectOption(
        ctcCurrency,
        option,
        showCTCCurrencySuggestions
    )
}
function selectPassportCategoryOption(option) {
    selectOption(
        passportCategory,
        option,
        showPassportCategorySuggestions
    )
}
function selectCountryOption(option) {
    selectOption(
        country,
        option,
        showCountrySuggestions
    )
}
function selectHighestDegreeOption(option) {
    selectOption(
        highestDegree,
        option,
        showHighestDegreeSuggestions
    )
}
function selectSpecializationOption(option) {
    selectOption(
        specialization,
        option,
        showSpecializationSuggestions
    )
}
function selectYearOfPassingOption(option) {
    selectOption(
        yearOfPassing,
        option,
        showYearOfPassingSuggestions
    )
}

function hideVaccinationSuggestions() {
    hideSuggestions(
        vaccination,
        vaccinationOptions,
        showVaccinationSuggestions
    )
}
function hideGenderSuggestions() {
    hideSuggestions(
        gender,
        genderOptions,
        showGenderSuggestions
    )
}
function hideNationalitySuggestions() {
    hideSuggestions(
        nationality,
        nationalityOptions,
        showNationalitySuggestions
    )
}
function hideDistrictSuggestions() {
    hideSuggestions(
        district,
        districtOptions,
        showDistrictSuggestions
    )
}
function hideStateSuggestions() {
    hideSuggestions(
        state,
        stateOptions,
        showStateSuggestions
    )
}
function hideCTCMentionedInSuggestions() {
    hideSuggestions(
        ctcMentionedIn,
        CTCMentionedInOptions,
        showCTCMentionedInSuggestions
    )
}
function hideCTCCurrencySuggestions() {
    hideSuggestions(
        ctcCurrency,
        CTCCurrencyOptions,
        showCTCCurrencySuggestions
    )
}
function hidePassportCategorySuggestions() {
    hideSuggestions(
        passportCategory,
        passportCategoryOptions,
        showPassportCategorySuggestions
    )
}
function hideCountrySuggestions() {
    hideSuggestions(
        country,
        countryOptions,
        showCountrySuggestions
    )
}
function hideHighestDegreeSuggestions() {
    hideSuggestions(
        highestDegree,
        highestDegreeOptions,
        showHighestDegreeSuggestions
    )
}
function hideSpecializationSuggestions() {
    hideSuggestions(
        specialization,
        specializationOptions,
        showSpecializationSuggestions
    )
}
function hideYearOfPassingSuggestions() {
    hideSuggestions(
        yearOfPassing,
        yearOfPassingOptions,
        showYearOfPassingSuggestions
    )
}

// Filtered suggestions
const filteredNationalityOptions = computed(() => {
    return nationalityOptions.value.filter(option =>
        option.toLowerCase().includes(
            nationality.value.toLowerCase()
        )
    )
})
const filteredDistrictOptions = computed(() => {
    return districtOptions.value.filter(option =>
        option.toLowerCase().includes(
            district.value.toLowerCase()
        )
    )
})
const filteredGenderOptions = computed(() => {
    return genderOptions.filter(option =>
        option.toLowerCase().includes(
            gender.value.toLowerCase()
        )
    )
})
const filteredVaccinationOptions = computed(() => {
    return vaccinationOptions.filter(option =>
        option.toLowerCase().includes(
            vaccination.value.toLowerCase()
        )
    )
})
const filteredStateOptions = computed(() => {
    return stateOptions.value.filter(option =>
        option.toLowerCase().includes(
            state.value.toLowerCase()
        )
    )
})
const filteredCTCMentionedInOptions = computed(() => {
    return CTCMentionedInOptions.filter(option =>
        option.toLowerCase().includes(
            ctcMentionedIn.value.toLowerCase()
        )
    )
})
const filteredCTCCurrencyOptions = computed(() => {
    return CTCCurrencyOptions.value.filter(option =>
        option.toLowerCase().includes(
            ctcCurrency.value.toLowerCase()
        )
    )
})
const filteredPassportCategoryOptions = computed(() => {
  return passportCategoryOptions.filter(option =>
    option.toLowerCase().includes(passportCategory.value.toLowerCase())
  )
})
const filteredCountryOptions = computed(() => {
    return countryOptions.value.filter(option =>
        option.toLowerCase().includes(
            country.value.toLowerCase()
        )
    )
})
const filteredHighestDegreeOptions = computed(() => {
    return highestDegreeOptions.value.filter(option =>
        option.toLowerCase().includes(
            highestDegree.value.toLowerCase()
        )
    )
})
const filteredSpecializationOptions = computed(() => {
    return specializationOptions.value.filter(option =>
        option.toLowerCase().includes(
            specialization.value.toLowerCase()
        )
    )
})
const filteredYearOfPassingOptions = computed(() => {
    return yearOfPassingOptions.filter(option =>
        option.toLowerCase().includes(
            yearOfPassing.value.toLowerCase()
        )
    )
})

// Reusable Hide Helper
function hideSuggestions(model, options, showRef) {

    setTimeout(() => {

        const validOption = (options.value || options).find(
            option =>
                option.toLowerCase().trim() ===
                model.value.toLowerCase().trim()
        )

        if (validOption) {
            model.value = validOption
        } else {
            model.value = ''
        }

        showRef.value = false

    }, 100)

}

// Reusable Select Helper
function selectOption(model, value, showRef) {
    model.value = value
    showRef.value = false
}

// Save Dialog
const saveAboutMe = async () => {
    await handleSave({
      endpoint: '/api/method/jobpro.api.update_user_details',
        payload: {
            name: userData.value.email,
            bio: bio.value,
        },

        onStart: () => {
            isSaving.value = true
            saveStatus.value = ''
        },

        onSuccess: () => {
            showAboutMeDialog.value = false
            toastType.value = 'success'
            toastTitle.value = 'Saved Successfully'
            toastMessage.value = 'Your details have been updated.'
            showToast.value = true
        },

        onError: () => {
            toastType.value = 'error'
            toastTitle.value = 'Save Failed'
            toastMessage.value = 'There was an error saving your details'
            showToast.value = true
        },

        onFinally: () => {
            isSaving.value = false
            saveStatus.value = 'Save'
        }
    })
}
const savePersonalDetails = async () => {
    await handleSave({
      endpoint: '/api/method/jobpro.api.update_candidate_details',
        payload: {
            given_name: (fullName.value || '').toUpperCase(),
            date_of_birth: dateOfBirth.value,
            gender: gender.value,
            vaccination_status: vaccination.value,
            nationality: nationality.value,
            location: district.value,
            temp_state: state.value,
            country: country.value,
            name: candidate.value.name,
            mail_id: email.value,
        },

        onStart: () => {
            isSaving.value = true
            saveStatus.value = ''
        },

        onSuccess: () => {
            showPersonalDetailsDialog.value = false
            toastType.value = 'success'
            toastTitle.value = 'Saved Successfully'
            toastMessage.value = 'Your personal details have been updated.'
            showToast.value = true
        },

        onError: () => {
            toastType.value = 'error'
            toastTitle.value = 'Save Failed'
            toastMessage.value = 'There was an error saving your details'
            showToast.value = true
        },

        onFinally: () => {
            isSaving.value = false
            saveStatus.value = 'Save'
        }
    })
}
const saveContactDetails = async () => {
    await handleSave({
      endpoint: '/api/method/jobpro.api.update_candidate_details',
        payload: {
            mail_id: email.value,
            mobile_number: mobileNumber.value,
            mobile: alternateNumber.value,
            whatsapp_number: whatsappNumber.value,
            name: candidate.value.name,
        },

        onStart: () => {
            isSaving.value = true
            saveStatus.value = ''
        },

        onSuccess: () => {
            showContactDetailsDialog.value = false
            toastType.value = 'success'
            toastTitle.value = 'Saved Successfully'
            toastMessage.value = 'Your contact details have been updated.'
            showToast.value = true
        },

        onError: () => {
            toastType.value = 'error'
            toastTitle.value = 'Save Failed'
            toastMessage.value = 'There was an error saving your details'
            showToast.value = true
        },

        onFinally: () => {
            isSaving.value = false
            saveStatus.value = 'Save'
        }
    })
}
const saveEducationDetails = async () => {
    await handleSave({
      endpoint: '/api/method/jobpro.api.update_candidate_details',
        payload: {
            highest_degree: highestDegree.value,
            specialization: specialization.value,
            year_of_passing: yearOfPassing.value,
            name: candidate.value.name,
            mail_id: email.value,
        },

        onStart: () => {
            isSaving.value = true
            saveStatus.value = ''
        },

        onSuccess: () => {
            showEducationDetailsDialog.value = false
            toastType.value = 'success'
            toastTitle.value = 'Saved Successfully'
            toastMessage.value = 'Your education details have been updated.'
            showToast.value = true
        },

        onError: () => {
            toastType.value = 'error'
            toastTitle.value = 'Save Failed'
            toastMessage.value = 'There was an error saving your details'
            showToast.value = true
        },

        onFinally: () => {
            isSaving.value = false
            saveStatus.value = 'Save'
        }
    })
}
const saveExperienceDetails = async () => {
    await handleSave({
      endpoint: '/api/method/jobpro.api.update_candidate_details',
        payload: {
            india_experience: indiaExperience.value || 0,
            overseas_experience: overseasExperience.value || 0,
            current_employer: currentEmployer.value,
            notice_period_months: noticePeriod.value || 0,
            ctc_mentioned_in: ctcMentionedIn.value,
            currency_ctc: ctcCurrency.value,
            current_ctc: currentCtc.value || 0,
            expected_ctc: expectedCtc.value || 0,
            name: candidate.value.name,
            mail_id: email.value,
        },

        onStart: () => {
            isSaving.value = true
            saveStatus.value = ''
        },

        onSuccess: () => {
            showExperienceDetailsDialog.value = false
            toastType.value = 'success'
            toastTitle.value = 'Saved Successfully'
            toastMessage.value = 'Your experience details have been updated.'
            showToast.value = true
        },

        onError: () => {
            toastType.value = 'error'
            toastTitle.value = 'Save Failed'
            toastMessage.value = 'There was an error saving your details'
            showToast.value = true
        },

        onFinally: () => {
            isSaving.value = false
            saveStatus.value = 'Save'
        }
    })
}
const savePassportDetails = async () => {
    await handleSave({
      endpoint: '/api/method/jobpro.api.update_candidate_details',
        payload: {
            passport_number: passportNumber.value,
            passport_expiry_date: expiryDate.value,
            ecr_status_candidate: passportCategory.value,
            ecr_status: passportCategory.value,
            name: candidate.value.name,
            mail_id: email.value,
        },

        onStart: () => {
            isSaving.value = true
            saveStatus.value = ''
        },

        onSuccess: () => {
            showPassportDetailsDialog.value = false
            toastType.value = 'success'
            toastTitle.value = 'Saved Successfully'
            toastMessage.value = 'Your passport details have been updated.'
            showToast.value = true
        },

        onError: () => {
            toastType.value = 'error'
            toastTitle.value = 'Save Failed'
            toastMessage.value = 'There was an error saving your details'
            showToast.value = true
        },

        onFinally: () => {
            isSaving.value = false
            saveStatus.value = 'Save'
        }
    })
}

// Handle file uploads
const handlePhotoChange = async (file) => {

    // instant preview
    profileImage.value = URL.createObjectURL(file)

    await uploadFile({
        endpoint: '/api/method/jobpro.api.upload_file',
        file,
        doctype: "Candidate",
        docname: candidate.value.name,
        fieldname: 'candidate_image',
        user: candidate.value.mail_id,

        onStart: () => {
            photoUploading.value = true
        },

        onSuccess: (data) => {

            profileImage.value =
                data?.message?.file_url
                    ? `${EXTERNAL_SITE}${data.message.file_url}`
                    : profileImage.value

            toastType.value = 'success'
            toastTitle.value = 'Uploaded Successfully'
            toastMessage.value = 'Your profile image has been changed.'
            showToast.value = true
        },

        onError: () => {
            toastType.value = 'error'
            toastTitle.value = 'Upload Failed'
            toastMessage.value = 'There was an error uploading your profile image'
            showToast.value = true
        },

        onFinally: () => {
            photoUploading.value = false
        },
    })
}
const handleResumeUpload = async (file) => {
    await uploadFile({
        endpoint: '/api/method/jobpro.api.upload_file',
        file,
        doctype: "Candidate",
        docname: candidate.value.name,
        fieldname: 'custom_updated__un_masked_cv',

        onStart: () => {
            isResumeUploading.value = true
        },

        onSuccess: (data) => {
            toastType.value = 'success'
            toastTitle.value = 'Uploaded Successfully'
            toastMessage.value = 'Your remsume has been uploaded.'
            showToast.value = true
            resumeFileName.value = `Resume: ${fullName.value}`
        },

        onError: (error) => {
            toastType.value = 'error'
            toastTitle.value = 'Upload Failed'
            toastMessage.value = 'There was an error uploading your remsume'
            showToast.value = true
        },

        onFinally: () => {
            isResumeUploading.value = false
        },
    })
}
// Passport Upload
const handlePassportUpload = async (file) => {
    await uploadFile({
        endpoint: '/api/method/jobpro.api.upload_file',
        file,
        doctype: 'Candidate',
        docname: candidate.value.name,
        fieldname: 'passport',

        onStart: () => {
            isPassportUploading.value = true
        },

        onSuccess: () => {
            toastType.value = 'success'
            toastTitle.value = 'Uploaded Successfully'
            toastMessage.value = 'Your passport has been uploaded.'
            showToast.value = true
            passportFileName.value = `Passport: ${fullName.value}`
        },

        onError: () => {
            toastType.value = 'error'
            toastTitle.value = 'Upload Failed'
            toastMessage.value = 'There was an error uploading your passport.'
            showToast.value = true
        },

        onFinally: () => {
            isPassportUploading.value = false
        },
    })
}

const downloadResume = () => {
    if (!resumeURL.value) return

    window.open(resumeURL.value, '_blank')
}

const deleteResume = async () => {

    await deleteFile({
        endpoint: '/api/method/jobpro.api.delete_file',
        doctype: "Candidate",
        docname: candidate.value.name,
        fieldname: 'custom_updated__un_masked_cv',

        onStart: () => {
            isResumeUploading.value = true
        },

        onSuccess: (data) => {
            toastType.value = 'success'
            toastTitle.value = 'Deleted Successfully'
            toastMessage.value = 'Your resume has been removed.'
            showToast.value = true
            resumeFileName.value = `Attach File`
        },

        onError: (error) => {
            toastType.value = 'error'
            toastTitle.value = 'Upload Failed'
            toastMessage.value = 'There was an error deleting your resume'
            showToast.value = true
        },

        onFinally: () => {
            isResumeUploading.value = false
        },
    })
}

const downloadPassport = () => {
    if (!passportURL.value) return

    window.open(passportURL.value, '_blank')
}

const deletePassport = async () => {
    await deleteFile({
        endpoint: '/api/method/jobpro.api.delete_file',
        doctype: "Candidate",
        docname: candidate.value.name,
        fieldname: 'passport',

        onStart: () => {
            isPassportUploading.value = true
        },

        onSuccess: (data) => {
            toastType.value = 'success'
            toastTitle.value = 'Deleted Successfully'
            toastMessage.value = 'Your passport has been removed.'
            showToast.value = true
            passportFileName.value = `Attach File`
        },

        onError: (error) => {
            toastType.value = 'error'
            toastTitle.value = 'Upload Failed'
            toastMessage.value = 'There was an error deleting your passport'
            showToast.value = true
        },

        onFinally: () => {
            isPassportUploading.value = false
        },
    })
}
function truncateText(text, length) {
    return text && text.length > length
      ? text.substring(0, length) + "..."
      : text;
}
</script>
