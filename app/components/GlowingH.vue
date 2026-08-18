<template>
  <div @mousemove="onMove" class="parent-glowing-h relative">
    <div ref="h" class="glowing-h relative z-1"><slot></slot></div>
    <div ref="mask" class="glowing-h-blur absolute top-0 left-0 right-0"><slot></slot></div>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ref, onMounted } from 'Vue'

gsap.registerPlugin(SplitText, ScrollTrigger)


const mask = ref(null)
const h = ref(null)

onMounted(() => {
let split = new SplitText(h.value, { type: "words" })

  gsap.from(split.words, {
    y: 10,
    opacity: 0,
    duration: 1.2,
    stagger: 0.15,
    ease: "power4.out",
  })
})

const onMove = (e) => {
  gsap.to(mask.value, {
    maskPosition: `${e.layerX}px ${e.layerY}px`,
    duration: .5,
    ease: "power2.out",
  })
}
</script>

<style lang="scss" scoped>
.glowing-h {
  text-shadow: 0px 0px 1px #EDFF00AA;
}

.glowing-h-blur {
  color: var(--color-primary);
  filter: blur(3px);
  mask-image: linear-gradient(90deg, black 0%, transparent 50%, black 100%);
  mask-size: 150% 100%;
  opacity: .6;
  //animation: moveMask 3s infinite linear;
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