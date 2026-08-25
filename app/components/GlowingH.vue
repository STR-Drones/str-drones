<template>
  <div ref="parent" class="parent-glowing-h relative">
    <div class="glowing-h relative z-1"><slot></slot></div>
    <div class="glowing-h-blur absolute top-0 left-0 right-0"><slot></slot></div>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ref, onMounted } from 'Vue'

gsap.registerPlugin(ScrollTrigger)


const mask = ref(null)
const h = ref(null)

onMounted(() => {

  gsap.from(parent.value, {
    y: 10,
    opacity: 0,
    duration: 1.2,
    stagger: 0.15,
    ease: "power4.out",
  })
})
</script>

<style lang="scss" scoped>
.glowing-h {
  text-shadow: 0px 0px 4px #ffffffdd;
}

.glowing-h-blur {
  color: var(--color-primary);
  filter: blur(4px);
  mask-image: linear-gradient(90deg, transparent 20%, black 50%, transparent 80%);
  mask-size: 200% 100%;
  opacity: .8;
  animation: moveMask 3s infinite linear;
  z-index: -1;
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