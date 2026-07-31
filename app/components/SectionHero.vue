<template>
  <div ref="hero" class="section-hero relative min-h-screen bg-background text-center flex flex-col justify-center items-center overflow-hidden">
    <div class="p-(--md) z-4 absolute top-[50%] transform translate-y-[-50%]">
      <div class="text-headline text-2xl">Despeja la niebla</div>
      <div class="text-secondary opacity-0 text-lg max-w-[50ch] leading-[1.2] text-balance">Visualizamos tu instalación solar con drones. Obtén imágenes y datos detallados para prevenir riesgos, aumentar beneficios y reducir costes.</div>
    </div>
    <img src="@/assets/placa-bg.jpg" class="absolute z-1 inset-0 w-full h-screen"/>
    <div class="gradient-bg"></div>
    <div class="gradient-aux"></div>
  </div>
</template>

<script setup>
import gsap from "gsap";
import { onMounted, ref } from 'vue'

let ctx
const hero = ref(null)

onMounted(() => {
  /* gsap.to('.gradient-bg', {
    scale: 1.03,
    x: -400,
    duration: 5,
  }) */

  ctx = gsap.context(() => {
  let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-hero",
        pin: true, // pin the trigger element while active
        start: "top top", // when the top of the trigger hits the top of the viewport
        end: "+=800", // end after scrolling 500px beyond the start
        scrub: .2, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        markers: true,
        snap: {
          snapTo: "labels", // snap to the closest label in the timeline
          duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
          delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
          ease: "power1.inOut", // the ease of the snap animation ("power3" by default)
        },
      },
    })
  }


  

  // add animations and labels to the timeline
  tl.addLabel("start")
    .to(".gradient-bg", { opacity: 0 })
    .addLabel("appear")
})

</script>

<style scoped>
.gradient-bg {
  position: absolute;
  bottom: 0;
  width: 250vw;
  height: 280vh;
  z-index: 3;
  opacity: 1;
  background: rgba(247, 245, 237, 0.1);
  background: radial-gradient(circle,rgba(247, 245, 237, 0) 0%, rgba(247, 245, 237, 1) 43%);
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
</style>