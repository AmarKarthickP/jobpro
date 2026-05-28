<template>
    <!-- Hiring Companies -->
  <div class="">

    <!-- Row 1 -->
    <div class="carousel">
      <div class="carousel-track left">

        <img
          v-for="num in 17"
          :key="'r1-' + num"
          :src="getImage(num)"
          class="w-[100px] md:w-[200px] opacity-90"
        />

        <img
          v-for="num in 17"
          :key="'r1-copy-' + num"
          :src="getImage(num)"
          class="w-[100px] md:w-[200px] opacity-90"
        />

      </div>
    </div>

    <!-- Row 2 -->
    <div class="carousel -mt-[30px] md:-mt-[130px]">
      <div class="carousel-track right">

        <img
          v-for="num in 17"
          :key="'r2-' + num"
          :src="getImage(num + 17)"
          class="w-[100px] md:w-[200px] opacity-90"
        />

        <img
          v-for="num in 17"
          :key="'r2-copy-' + num"
          :src="getImage(num + 17)"
          class="w-[100px] md:w-[200px] opacity-90"
        />

      </div>
    </div>

  </div>
</template>

<style>
.carousel {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.carousel-track {
  display: flex;
  align-items: center;
  width: max-content;
  gap: 10px;
}

.carousel-track.left {
  animation: scroll-left 40s linear infinite;
}

.carousel-track.right {
  animation: scroll-right 40s linear infinite;
}


/* LEFT */
@keyframes scroll-left {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

/* RIGHT */
@keyframes scroll-right {
  from {
    transform: translateX(-50%);
  }

  to {
    transform: translateX(0);
  }
}

.carousel::before,
.carousel::after {
  content: "";
  position: absolute;
  top: 0;
  width: 120px;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.carousel::before {
  left: 0;
  background: linear-gradient(
    to right,
    #f4f2ee,
    transparent
  );
}

.carousel::after {
  right: 0;
  background: linear-gradient(
    to left,
    #f4f2ee,
    transparent
  );
}
</style>

<script setup>
function getImage(num) {
  return new URL(
    `../assets/customers/1 (${num}).png`,
    import.meta.url
  ).href
}
</script>