<template>
  <div class="animated-p" ref="animp">
    <slot></slot>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import SplitText from 'gsap/SplitText'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(SplitText, ScrollTrigger)

const animp = ref(null)

onMounted(() => {
  let split = new SplitText(animp.value, { type: "words" })

  gsap.from(split.words, {
    background: 'white',
    opacity: 0,
    duration: 0.01,
    stagger: 0.03,
    scrollTrigger: {
      trigger: animp.value,
      start: "top 80%",
      end: "bottom 20%",
      markers: true
    }
  })
})
</script>

<style>

</style>