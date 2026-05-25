<template>
  <div class="relative inline-flex items-center justify-center">

    <!-- Animated Border -->
    <svg
      class="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
    >
      <defs>
        <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#22d3ee" />
          <stop offset="50%" stop-color="#3b82f6" />
          <stop offset="100%" stop-color="#d946ef" />
        </linearGradient>

        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Base Border -->
      <rect
        x="1"
        y="1"
        width="98%"
        height="94%"
        rx="12"
        ry="12"
        class="fill-transparent stroke-gray-200 stroke-[1px]"
      />

      <!-- Animated Border -->
      <rect
        x="1"
        y="1"
        width="98%"
        height="94%"
        rx="12"
        ry="12"
        pathLength="100"
        filter="url(#glow)"
        class="animating-rect fill-transparent"
      />
    </svg>
    <!-- Content -->
    <div class="relative bg-white/50 overflow-hidden rounded-xl px-5 py-1 flex items-center">
    <span class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent"></span>

      <h4 class="text-center font-semibold text-[17px] text-primary">
        Task
        <span
          class="bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent"
        >
          AI
        </span>
      </h4>
    </div>

  </div>
</template>

<style scoped>
.animating-rect {
  stroke: url(#borderGradient);
  stroke-width: 2;
  stroke-dasharray: 100 100;
  stroke-linecap: round;
  animation: border-run 3s linear infinite;
}

@keyframes border-run {
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: 0;
  }
}
</style>