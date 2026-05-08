<template>
    <div class="grid grid-cols-12 gap-6">
        <!-- Profile Grid -->
        <div class="col-span-3">
            <profile-card :user="userData" class="mb-4" /> <!--:user injects the data to the component -->
            <!-- Quick Links -->
            <quick-link-card />
        </div>
        <div class="col-span-9">
            <div class="rounded-md bg-white shadow-sm">
                hi
            </div>
        </div>
    </div>
</template>

<script setup>
import ProfileCard from '@/components/ProfileCard.vue';
import defaultImage from '@/assets/defaults/profile-image.jpeg';
import QuickLinkCard from '@/components/QuickLinkCard.vue';

const userData = {
    name: 'Amar Karthick P',
    headline: 'Software Developer | Frappe Framework | ERPNext | Vue JS',
    location: 'Chennai, Tamil Nadu',
    company: 'TEAMPRO HR & IT Services Pvt. Ltd.',
    src: defaultImage,
    alt: 'profile',
}
</script>