<template>
  <div ref="hero" class="section-hero relative min-h-screen bg-background text-center flex flex-col justify-center items-center overflow-hidden">
    <div class="text-group px-(--md) pt-0 pb-(--lg) z-4 absolute">
      <div class="text-headline text-2xl">
        <slot></slot>
      </div>
      <div class="text-secondary opacity-0 mt-(--sm) text-lg max-w-[50ch] leading-[1.2] text-balance">
        <slot name="description"></slot>
      </div>
    </div>
    <div class="scroll text-sm bg-gray-light tracking-wider uppercase font-mono p-1 leading-[1.1] absolute z-10 bottom-(--md)">SCROLL</div>
    <img src="@/assets/placa-bg.jpg" class="absolute z-1 inset-0 w-full h-screen"/>
    <div class="gradient-bg"></div>
    <div class="gradient-aux"></div>
    <div class="gradient-fixed"></div>
  </div>
</template>

<script setup>
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { onMounted, ref } from 'vue'

gsap.registerPlugin(ScrollTrigger)

let ctx
const hero = ref(null)

onMounted(() => {
  /* gsap.to('.gradient-bg', {
    scale: 1.03,
    x: -400,
    duration: 5,
  }) */

  gsap.set('.text-group', {
    yPercent: 65,
    opacity: 1
  })

  ctx = gsap.context(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero.value,
        pin: true, // pin the trigger element while active
        start: "top top", // when the top of the trigger hits the top of the viewport
        end: "+=1200", // end after scrolling 500px beyond the start
        scrub: .2, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        //markers: true,
        snap: {
          snapTo: "labels", // snap to the closest label in the timeline
          duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
          delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
          ease: "power1.inOut", // the ease of the snap animation ("power3" by default)
        },
      },
    })

    tl.addLabel("start")
    .to(".gradient-bg", { opacity: 0 })
    .to(".gradient-aux", { opacity: 0 }, '<')
    .to(".scroll", { opacity: 0, y: 20 }, '<')
    .to(".text-group", { yPercent: 0, bottom: 40, scale: 0.9 }, "<0.1")
    .to(".text-secondary", { opacity: 1 }, "<0.2")
  })
})

</script>

<style scoped>
.text-group {
  bottom: 50%;
  opacity: 0;
}

.gradient-bg {
  position: absolute;
  bottom: 0;
  width: 250vw;
  height: 280vh;
  z-index: 3;
  opacity: 1;
  background: rgba(247, 245, 237, 0.1);
  background: radial-gradient(circle,rgba(247, 245, 237, 0) 0%, rgba(247, 245, 237, 1) 33%);
}

.gradient-aux {
  position: absolute;
  bottom: 20vh;
  width: 100vw;
  height: 50vh;
  z-index: 5;
  opacity: .8;
  background: linear-gradient(180deg, rgba(247, 245, 237, 0) 0%, rgba(247, 245, 237, 0.8) 43%); 
}

.gradient-fixed {
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 70vh;
  z-index: 2;
  opacity: 1;
  background: linear-gradient(180deg, rgba(247, 245, 237, 0) 0%, rgba(247, 245, 237, 1) 80%); 
}
</style>