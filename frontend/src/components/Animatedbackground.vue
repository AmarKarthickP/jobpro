<template>
  <div class="background-lines bg-background">
    <div class="line line1"></div>
    <div class="line line2"></div>
    <div class="line line3"></div>
    <div class="line line4"></div>
    <div class="line line5"></div>
  </div>
</template>

<style scoped>
.background-lines {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
}

/* Vertical lines */
.line {
  position: absolute;
  top: 0;
  width: 1px;
  height: 100%;
  background: rgba(255,255,255,0.08);
}
.line::after {
  content: "";
  position: absolute;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);

  width: 1px;
  height: 90px;
  border-radius: 999px;

  background: linear-gradient(
    to bottom,
    transparent,
    #221a4d,
    #221a4d,
    #221a4d,
    #221a4d,
    transparent
  );

  filter: blur(2px);

  box-shadow:
    0 0 10px rgba(41,182,255,.7),
    0 0 20px rgba(14,140,255,.5),
    0 0 30px rgba(0,102,255,.4);

  animation: fall 6s linear infinite;
}

/* Positions */
.line1 {
  left: 10%;
}
.line2 {
  left: 30%;
}
.line3 {
  left: 50%;
}
.line4 {
  left: 70%;
}
.line5 {
  left: 90%;
}

/* Different speeds */
.line1::after {
  animation-delay: 0s;
  animation-duration: 5s;
}

.line2::after {
  animation-delay: 1s;
  animation-duration: 7s;
}

.line3::after {
  animation-delay: 2s;
  animation-duration: 4s;
}

.line4::after {
  animation-delay: 0.5s;
  animation-duration: 6s;
}

.line5::after {
  animation-delay: 1.5s;
  animation-duration: 5.5s;
}

@keyframes fall {
  0% {
    transform: translateX(-50%) translateY(-200px);
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  100% {
    transform: translateX(-50%) translateY(120vh);
    opacity: 0;
  }
}
</style>