<template>
    <div class="grid grid-cols-12 gap-6">
        <!-- Profile Grid -->
        <div class="col-span-3">
            <div class="sticky top-24">
                <profile-card :user="userData" class="mb-4" /> <!--:user injects the data to the component -->
                <!-- Quick Links -->
                <quick-link-card />
            </div>
        </div>
        <div class="col-span-9">
            <!-- Sorting -->
            <div class="rounded-lg shadow-sm px-5 pt-5 pb-3 bg-white">
                <div class="flex">
                    <p class="text-gray-500 font-medium text-lg">Sort by</p>
                    <p class="font-medium ml-auto text-lg text-red-600">Showing 84 jobs</p>
                </div>
                <div class="border-t border-gray-300 my-3">
                </div>
                <div class="flex items-center justify-center">
                    <button class="px-10 py-2 text-lg text-primary flex items-center gap-3 rounded-md font-medium hover:bg-hoverbg transition-all duration-300 ease-in-out">
                        Recent
                        <div class="flex">
                            <up-arrow-icon class="h-5 w-5" />
                            <!-- <down-arrow-icon class="h-5 w-5" /> -->
                        </div>
                    </button>
                    <button class="px-10 py-2 text-lg text-gray-600 flex items-center gap-3 rounded-md font-medium hover:bg-hoverbg transition-all duration-300 ease-in-out">
                        Openings
                        <div class="flex">
                            <up-arrow-icon class="h-5 w-5" />
                            <!-- <down-arrow-icon class="h-5 w-5" /> -->
                        </div>
                    </button>
                    <button class="px-10 py-2 text-lg text-gray-600 flex items-center gap-3 rounded-md font-medium hover:bg-hoverbg transition-all duration-300 ease-in-out">
                        Salary
                        <div class="flex">
                            <up-arrow-icon class="h-5 w-5" />
                            <!-- <down-arrow-icon class="h-5 w-5" /> -->
                        </div>
                    </button>
                    <button class="px-10 py-2 text-lg text-gray-600 flex items-center gap-3 rounded-md font-medium hover:bg-hoverbg transition-all duration-300 ease-in-out">
                        Relevance
                        <div class="flex">
                            <up-arrow-icon class="h-5 w-5" />
                            <!-- <down-arrow-icon class="h-5 w-5" /> -->
                        </div>
                    </button>
                    <button class="px-10 py-2 text-lg text-gray-600 flex items-center gap-3 rounded-md font-medium hover:bg-hoverbg transition-all duration-300 ease-in-out">
                        Experience
                        <div class="flex">
                            <up-arrow-icon class="h-5 w-5" />
                            <!-- <down-arrow-icon class="h-5 w-5" /> -->
                        </div>
                    </button>
                </div>
            </div>
            <!-- Sponsored -->
            <sponsored-card class="mt-5" />
            <!-- Job Card -->
            <div class="mt-5 bg-white shadow-sm rounded-lg hover:shadow-md transition-all duration-300 ease-in-out px-5 py-3">
                <div class="grid grid-cols-12">
                    <div class="col-span-10">
                        <badge class="text-sm bg-[#ffebdb] rounded-lg px-3 py-1 text-[#e56700]">• 2 days ago</badge>
                        <p class="text-xl font-medium text-primary mt-2 capitalize">Clam Shell machine operator</p>
                        <p class="text-[14px] text-gray-600 font-medium capitalize">MIDADPACK MANUFACTURE OF CARDBOARD BOXES AND PAPER BAGS CO</p>
                        <div class="text-[14px] text-gray-600 font-medium flex gap-1">
                            <img src="https://i.postimg.cc/rmFf5T26/saudi-arabia.png" class="h-5" />
                            <p>KSA</p>
                        </div>
                    
                        <div class="border-t border-gray-300 my-3 mr-5">
                        </div>
                        <div class="flex items-center gap-3">
                            <div
                                class="group px-2 py-1 bg-[#f4f5f5] rounded-full flex items-center text-gray-800 w-fit cursor-pointer"
                                >
                                <svg
                                    class="h-4 w-4 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>

                                <p
                                    class="text-sm font-medium text-gray-600 max-w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-w-[200px] group-hover:opacity-100"
                                >
                                    &nbsp;Accommodations
                                </p>
                            </div>
                            <div
                                class="group px-2 py-1 bg-[#f4f5f5] rounded-full flex items-center text-gray-800 w-fit cursor-pointer"
                                >
                                <svg
                                    class="h-4 w-4 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>

                                <p
                                    class="text-sm font-medium text-gray-600 max-w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-w-[200px] group-hover:opacity-100"
                                >
                                    &nbsp;Food
                                </p>
                            </div>
                            <div
                                class="group px-2 py-1 bg-[#f4f5f5] rounded-full flex items-center text-gray-800 w-fit cursor-pointer"
                                >
                                <svg
                                    class="h-4 w-4 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>

                                <p
                                    class="text-sm font-medium text-gray-600 max-w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-w-[200px] group-hover:opacity-100"
                                >
                                    &nbsp;Transport
                                </p>
                            </div>

                            <button class="flex items-center gap-2 font-medium pr-10 ml-auto text-[13px] text-gray-600 hover:text-primary">
                                Job details
                                <down-icon class="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div class="col-span-2">
                        <div>
                        <p class="text-xl font-medium text-primary text-right">SAR <span class="text-3xl">1,800</span></p>
                        <p class="text-xl font-medium text-primary text-right">INR <span class="text-3xl">45,293</span></p>
                        <button class="mt-8 text-center w-full bg-primary py-2 rounded-xl text-white text-lg font-medium">Apply Now</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Demo Repeat -->
            
            <div class="mt-5 bg-white shadow-sm rounded-lg hover:shadow-md transition-all duration-300 ease-in-out px-5 py-3">
                <div class="grid grid-cols-12">
                    <div class="col-span-10">
                        <badge class="text-sm bg-[#ffebdb] rounded-lg px-3 py-1 text-[#e56700]">• 2 days ago</badge>
                        <p class="text-xl font-medium text-primary mt-2 capitalize">Clam Shell machine operator</p>
                        <p class="text-[14px] text-gray-600 font-medium capitalize">MIDADPACK MANUFACTURE OF CARDBOARD BOXES AND PAPER BAGS CO</p>
                        <div class="text-[14px] text-gray-600 font-medium flex gap-1">
                            <img src="https://i.postimg.cc/rmFf5T26/saudi-arabia.png" class="h-5" />
                            <p>KSA</p>
                        </div>
                    
                        <div class="border-t border-gray-300 my-3 mr-5">
                        </div>
                        <div class="flex items-center gap-3">
                            <div
                                class="group px-2 py-1 bg-[#f4f5f5] rounded-full flex items-center text-gray-800 w-fit cursor-pointer"
                                >
                                <svg
                                    class="h-4 w-4 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>

                                <p
                                    class="text-sm font-medium text-gray-600 max-w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-w-[200px] group-hover:opacity-100"
                                >
                                    &nbsp;Accommodations
                                </p>
                            </div>
                            <div
                                class="group px-2 py-1 bg-[#f4f5f5] rounded-full flex items-center text-gray-800 w-fit cursor-pointer"
                                >
                                <svg
                                    class="h-4 w-4 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>

                                <p
                                    class="text-sm font-medium text-gray-600 max-w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-w-[200px] group-hover:opacity-100"
                                >
                                    &nbsp;Food
                                </p>
                            </div>
                            <div
                                class="group px-2 py-1 bg-[#f4f5f5] rounded-full flex items-center text-gray-800 w-fit cursor-pointer"
                                >
                                <svg
                                    class="h-4 w-4 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>

                                <p
                                    class="text-sm font-medium text-gray-600 max-w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-w-[200px] group-hover:opacity-100"
                                >
                                    &nbsp;Transport
                                </p>
                            </div>

                            <button class="flex items-center gap-2 font-medium pr-10 ml-auto text-[13px] text-gray-600 hover:text-primary">
                                Job details
                                <down-icon class="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div class="col-span-2">
                        <div>
                        <p class="text-xl font-medium text-primary text-right">SAR <span class="text-3xl">1,800</span></p>
                        <p class="text-xl font-medium text-primary text-right">INR <span class="text-3xl">45,293</span></p>
                        <button class="mt-8 text-center w-full bg-primary py-2 rounded-xl text-white text-lg font-medium">Apply Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-5 bg-white shadow-sm rounded-lg hover:shadow-md transition-all duration-300 ease-in-out px-5 py-3">
                <div class="grid grid-cols-12">
                    <div class="col-span-10">
                        <badge class="text-sm bg-[#ffebdb] rounded-lg px-3 py-1 text-[#e56700]">• 2 days ago</badge>
                        <p class="text-xl font-medium text-primary mt-2 capitalize">Clam Shell machine operator</p>
                        <p class="text-[14px] text-gray-600 font-medium capitalize">MIDADPACK MANUFACTURE OF CARDBOARD BOXES AND PAPER BAGS CO</p>
                        <div class="text-[14px] text-gray-600 font-medium flex gap-1">
                            <img src="https://i.postimg.cc/rmFf5T26/saudi-arabia.png" class="h-5" />
                            <p>KSA</p>
                        </div>
                    
                        <div class="border-t border-gray-300 my-3 mr-5">
                        </div>
                        <div class="flex items-center gap-3">
                            <div
                                class="group px-2 py-1 bg-[#f4f5f5] rounded-full flex items-center text-gray-800 w-fit cursor-pointer"
                                >
                                <svg
                                    class="h-4 w-4 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>

                                <p
                                    class="text-sm font-medium text-gray-600 max-w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-w-[200px] group-hover:opacity-100"
                                >
                                    &nbsp;Accommodations
                                </p>
                            </div>
                            <div
                                class="group px-2 py-1 bg-[#f4f5f5] rounded-full flex items-center text-gray-800 w-fit cursor-pointer"
                                >
                                <svg
                                    class="h-4 w-4 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>

                                <p
                                    class="text-sm font-medium text-gray-600 max-w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-w-[200px] group-hover:opacity-100"
                                >
                                    &nbsp;Food
                                </p>
                            </div>
                            <div
                                class="group px-2 py-1 bg-[#f4f5f5] rounded-full flex items-center text-gray-800 w-fit cursor-pointer"
                                >
                                <svg
                                    class="h-4 w-4 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>

                                <p
                                    class="text-sm font-medium text-gray-600 max-w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-w-[200px] group-hover:opacity-100"
                                >
                                    &nbsp;Transport
                                </p>
                            </div>

                            <button class="flex items-center gap-2 font-medium pr-10 ml-auto text-[13px] text-gray-600 hover:text-primary">
                                Job details
                                <down-icon class="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div class="col-span-2">
                        <div>
                        <p class="text-xl font-medium text-primary text-right">SAR <span class="text-3xl">1,800</span></p>
                        <p class="text-xl font-medium text-primary text-right">INR <span class="text-3xl">45,293</span></p>
                        <button class="mt-8 text-center w-full bg-primary py-2 rounded-xl text-white text-lg font-medium">Apply Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-5 bg-white shadow-sm rounded-lg hover:shadow-md transition-all duration-300 ease-in-out px-5 py-3">
                <div class="grid grid-cols-12">
                    <div class="col-span-10">
                        <badge class="text-sm bg-[#ffebdb] rounded-lg px-3 py-1 text-[#e56700]">• 2 days ago</badge>
                        <p class="text-xl font-medium text-primary mt-2 capitalize">Clam Shell machine operator</p>
                        <p class="text-[14px] text-gray-600 font-medium capitalize">MIDADPACK MANUFACTURE OF CARDBOARD BOXES AND PAPER BAGS CO</p>
                        <div class="text-[14px] text-gray-600 font-medium flex gap-1">
                            <img src="https://i.postimg.cc/rmFf5T26/saudi-arabia.png" class="h-5" />
                            <p>KSA</p>
                        </div>
                    
                        <div class="border-t border-gray-300 my-3 mr-5">
                        </div>
                        <div class="flex items-center gap-3">
                            <div
                                class="group px-2 py-1 bg-[#f4f5f5] rounded-full flex items-center text-gray-800 w-fit cursor-pointer"
                                >
                                <svg
                                    class="h-4 w-4 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>

                                <p
                                    class="text-sm font-medium text-gray-600 max-w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-w-[200px] group-hover:opacity-100"
                                >
                                    &nbsp;Accommodations
                                </p>
                            </div>
                            <div
                                class="group px-2 py-1 bg-[#f4f5f5] rounded-full flex items-center text-gray-800 w-fit cursor-pointer"
                                >
                                <svg
                                    class="h-4 w-4 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>

                                <p
                                    class="text-sm font-medium text-gray-600 max-w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-w-[200px] group-hover:opacity-100"
                                >
                                    &nbsp;Food
                                </p>
                            </div>
                            <div
                                class="group px-2 py-1 bg-[#f4f5f5] rounded-full flex items-center text-gray-800 w-fit cursor-pointer"
                                >
                                <svg
                                    class="h-4 w-4 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>

                                <p
                                    class="text-sm font-medium text-gray-600 max-w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-w-[200px] group-hover:opacity-100"
                                >
                                    &nbsp;Transport
                                </p>
                            </div>

                            <button class="flex items-center gap-2 font-medium pr-10 ml-auto text-[13px] text-gray-600 hover:text-primary">
                                Job details
                                <down-icon class="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div class="col-span-2">
                        <div>
                        <p class="text-xl font-medium text-primary text-right">SAR <span class="text-3xl">1,800</span></p>
                        <p class="text-xl font-medium text-primary text-right">INR <span class="text-3xl">45,293</span></p>
                        <button class="mt-8 text-center w-full bg-primary py-2 rounded-xl text-white text-lg font-medium">Apply Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-5 bg-white shadow-sm rounded-lg hover:shadow-md transition-all duration-300 ease-in-out px-5 py-3">
                <div class="grid grid-cols-12">
                    <div class="col-span-10">
                        <badge class="text-sm bg-[#ffebdb] rounded-lg px-3 py-1 text-[#e56700]">• 2 days ago</badge>
                        <p class="text-xl font-medium text-primary mt-2 capitalize">Clam Shell machine operator</p>
                        <p class="text-[14px] text-gray-600 font-medium capitalize">MIDADPACK MANUFACTURE OF CARDBOARD BOXES AND PAPER BAGS CO</p>
                        <div class="text-[14px] text-gray-600 font-medium flex gap-1">
                            <img src="https://i.postimg.cc/rmFf5T26/saudi-arabia.png" class="h-5" />
                            <p>KSA</p>
                        </div>
                    
                        <div class="border-t border-gray-300 my-3 mr-5">
                        </div>
                        <div class="flex items-center gap-3">
                            <div
                                class="group px-2 py-1 bg-[#f4f5f5] rounded-full flex items-center text-gray-800 w-fit cursor-pointer"
                                >
                                <svg
                                    class="h-4 w-4 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>

                                <p
                                    class="text-sm font-medium text-gray-600 max-w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-w-[200px] group-hover:opacity-100"
                                >
                                    &nbsp;Accommodations
                                </p>
                            </div>
                            <div
                                class="group px-2 py-1 bg-[#f4f5f5] rounded-full flex items-center text-gray-800 w-fit cursor-pointer"
                                >
                                <svg
                                    class="h-4 w-4 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>

                                <p
                                    class="text-sm font-medium text-gray-600 max-w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-w-[200px] group-hover:opacity-100"
                                >
                                    &nbsp;Food
                                </p>
                            </div>
                            <div
                                class="group px-2 py-1 bg-[#f4f5f5] rounded-full flex items-center text-gray-800 w-fit cursor-pointer"
                                >
                                <svg
                                    class="h-4 w-4 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>

                                <p
                                    class="text-sm font-medium text-gray-600 max-w-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-w-[200px] group-hover:opacity-100"
                                >
                                    &nbsp;Transport
                                </p>
                            </div>

                            <button class="flex items-center gap-2 font-medium pr-10 ml-auto text-[13px] text-gray-600 hover:text-primary">
                                Job details
                                <down-icon class="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div class="col-span-2">
                        <div>
                        <p class="text-xl font-medium text-primary text-right">SAR <span class="text-3xl">1,800</span></p>
                        <p class="text-xl font-medium text-primary text-right">INR <span class="text-3xl">45,293</span></p>
                        <button class="mt-8 text-center w-full bg-primary py-2 rounded-xl text-white text-lg font-medium">Apply Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ProfileCard from '@/components/ProfileCard.vue';
import defaultImage from '@/assets/defaults/profile-image.jpeg';
import QuickLinkCard from '@/components/QuickLinkCard.vue';
import UpArrowIcon from '@/components/icons/UpArrowIcon.vue';
import DownArrowIcon from '@/components/icons/DownArrowIcon.vue';
import DownIcon from '@/components/icons/DownIcon.vue';
import SponsoredCard from '@/components/SponsoredCard.vue';

const userData = {
    name: 'Amar Karthick P',
    headline: 'Software Developer | Frappe Framework | ERPNext | Vue JS',
    location: 'Chennai, Tamil Nadu',
    company: 'TEAMPRO HR & IT Services Pvt. Ltd.',
    src: defaultImage,
    alt: 'profile',
}
</script>