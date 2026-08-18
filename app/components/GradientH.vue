<template>
  <div ref="parent" class="parent-gradient-h relative">
    <div class="gradient-h relative z-1"><slot></slot></div>
    <div class="gradient-h-blur absolute top-0 left-0 right-0"><slot></slot></div>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ref, onMounted } from 'Vue'

gsap.registerPlugin(ScrollTrigger)

const parent = ref(null)

onMounted(() => {
  gsap.from(parent.value, {
    y: 10,
    opacity: 0,
    duration: 1.2,
    stagger: 0.15,
    ease: "power4.out",

    scrollTrigger: {
      trigger: parent.value,
      start: "top 80%",
      end: "bottom 20%",
    }
  })
})
</script>

<style lang="scss" scoped>
.gradient-h {
  text-shadow: 0px 0px 1px #EDFF00AA;
}

.gradient-h-blur {
  color: var(--color-primary);
  filter: blur(3px);
  mask-image: linear-gradient(90deg, transparent 20%, black 50%, transparent 80%);
  mask-size: 200% 100%;
  opacity: .9;
  animation: moveMask 4s infinite linear;
  z-index: 2;
}

@keyframes moveMask {
  0% {
    mask-position: 100% 0;
  }
  100% {
    mask-position: -100% 0;
  }
}
</style>