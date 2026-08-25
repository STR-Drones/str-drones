<template>
  <div class="section-process p-(--sm) md:p-(--md) bg-foreground text-gray-light">
    <marker-section color="foreground" >
      <template #title>
        <slot name="section-title"></slot>
      </template>
      <template #number>
        <slot name="section-number"></slot>
      </template>
    </marker-section>
    <div class="max-w-(--max-width) mx-auto">
      <gradient-h class="text-lg md:text-2xl text-center my-(--lg)"><slot></slot></gradient-h>
      <div class="relative">
        <div class="trig"></div>
        <div ref="meter" class="hidden md:block progress-meter w-full h-screen absolute top-0 border-red">
          <div class="h-[50%] absolute top-[50%] left-[50%] translate-x-[50%] translate-y-[-50%]">
            <div class="relative top-0 w-[2px] h-full border-gray border-r-2 border-dashed"></div>
            <div class="progress-bar absolute top-0 w-[2px] h-0 border-white border-r-2"></div>
          </div>
        </div>
        <div class="relative cards-wrapper mt-4 md:py-(--xl)" ref="items">
          <slot name="items"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import { onMounted, ref} from 'vue'
import ScrollTrigger from 'gsap/ScrollTrigger'

const items = ref(null)
const meter = ref(null)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  let ctx = gsap.context(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.trig',
        pin: meter.value, // pin the trigger element while active
        start: "top top", // when the top of the trigger hits the top of the viewport
        end: "+=200%", 
        //markers: true,
        scrub: .2, 
      },
    })

    tl.addLabel("start")
    .to(".progress-bar", { height: '100%' })
  })
})
</script>

<style lang="scss">
</style>