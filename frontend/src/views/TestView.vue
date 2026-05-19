<template>
  <div class="flex items-center justify-center min-h-[400px] bg-slate-100 p-6">
    <!-- Modern SaaS Card Container -->
    <div class="relative w-full max-w-sm bg-white rounded-xl p-6 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.08)]">
      
      <!-- Real-Look Push Pin Anchor -->
      <div class="absolute -top-3 left-1/2 -translate-x-1/2 z-50 pointer-events-none select-none">
        <svg 
          width="64" 
          height="64" 
          viewBox="0 0 64 64" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          class="transform rotate-[12deg]" 
        >
          <defs>
            <!-- Soft, diffuse physical shadow cast by the pin body on the paper -->
            <filter id="pin-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="2" dy="5" stdDeviation="3.5" flood-color="#0b0f19" flood-opacity="0.28" />
              <feDropShadow dx="1" dy="2" stdDeviation="1" flood-color="#0b0f19" flood-opacity="0.15" />
            </filter>

            <!-- Ultra-sharp, dark shadow for the exact point where the needle enters the paper -->
            <filter id="insertion-shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.75" result="blur" />
              <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0"/>
            </filter>

            <!-- Matte Red Plastic Base Gradient -->
            <radialGradient id="pin-body" cx="46%" cy="44%" r="48%" fx="35%" fy="35%">
              <stop offset="0%" stop-color="#ff4d4d" />
              <stop offset="55%" stop-color="#dc2626" />
              <stop offset="85%" stop-color="#b91c1c" />
              <stop offset="100%" stop-color="#851212" />
            </radialGradient>

            <!-- Subtle top glare for flattened pin head -->
            <linearGradient id="pin-cap-glare" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.3" />
              <stop offset="40%" stop-color="#ffffff" stop-opacity="0.05" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
            </linearGradient>

            <!-- Metallic Needle Gradient -->
            <linearGradient id="needle-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#94a3b8" />
              <stop offset="35%" stop-color="#e2e8f0" />
              <stop offset="65%" stop-color="#cbd5e1" />
              <stop offset="100%" stop-color="#64748b" />
            </linearGradient>
          </defs>

          <!-- 1. Paper Compression / Indentation Distortion Effect -->
          <!-- Ambient shadow ring simulating the paper dipping slightly inward -->
          <circle cx="31.5" cy="33.5" r="5" fill="#000000" opacity="0.06" filter="blur(1px)" />
          <circle cx="31.5" cy="33.5" r="3.5" fill="none" stroke="#000000" stroke-opacity="0.1" stroke-width="0.75" />

          <!-- 2. The Needle Entry Point -->
          <!-- Dark entry hole shadow -->
          <ellipse cx="31.5" cy="33.5" rx="1.5" ry="1.2" fill="#1e293b" filter="url(#insertion-shadow)" />
          <!-- Visible portion of the metallic needle catching top-down light -->
          <path d="M30.8 24 L32.2 24 L31.8 33 L31.2 33 Z" fill="url(#needle-grad)" />

          <!-- 3. Main Pin Body Stack (With Filter Shadow) -->
          <g filter="url(#pin-shadow)">
            <!-- Lower Rim of the plastic head -->
            <circle cx="32" cy="22" r="10" fill="url(#pin-body)" />
            <circle cx="32" cy="22" r="10" fill="none" stroke="#991b1b" stroke-width="0.5" stroke-opacity="0.4" />
            
            <!-- Mid-section taper step -->
            <circle cx="32" cy="21.5" r="7.5" fill="#b91c1c" opacity="0.8" />
            <circle cx="32" cy="21.2" r="7.5" fill="url(#pin-body)" />

            <!-- Flattened Top Cap Surface -->
            <circle cx="32" cy="20.5" r="5.5" fill="url(#pin-body)" />
            <!-- Micro-texture: Highlight ring on the cap edge -->
            <circle cx="32" cy="20.5" r="5.5" fill="url(#pin-cap-glare)" />
            <circle cx="31.8" cy="20.2" r="5.1" fill="none" stroke="#ffffff" stroke-width="0.3" stroke-opacity="0.25" />
          </g>

          <!-- 4. Subtle Micro-imperfection Glare (Slightly offset to break perfect symmetry) -->
          <ellipse cx="30.2" cy="18.2" rx="1.2" ry="0.6" fill="#ffffff" opacity="0.35" transform="rotate(-15 30.2 18.2)" />
        </svg>
      </div>

      <!-- Card Content Placeholder -->
      <div class="pt-4">
        <div class="flex items-center justify-between mb-4">
          <span class="text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 px-2.5 py-1 rounded-md">
            SaaS Metrics
          </span>
          <span class="text-xs text-slate-400 font-medium">Updated just now</span>
        </div>
        <h3 class="text-lg font-bold text-slate-800 tracking-tight">Monthly Active Users</h3>
        <p class="text-3xl font-extrabold text-slate-900 my-2 tracking-tight">32,841</p>
        
        <div class="mt-4 pt-4 border-t border-slate-100 flex items-center text-sm text-slate-500">
          <svg class="w-4 h-4 text-emerald-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span class="text-emerald-600 font-semibold mr-1">+12.3%</span> from last month
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
// Pure presentation component, no extra logic required.
</script>