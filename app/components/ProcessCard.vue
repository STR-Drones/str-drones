<template>
  <div ref="card" class="process-card-wrapper font-mono text-sm md:text-base text-gray-light max-w-[60ch]">
    <div ref="icon" class="card-icon bg-gray-dark border border-gray"></div>
    <div ref="content" class="flex flex-col card-content bg-gray-dark border border-gray min-h-[10em] p-(--sm)">
      <div class="flex gap-2">
        <div class="bg-primary aspect-square h-[1.6em] flex items-center justify-center text-foreground"><slot name="number"></slot></div>
        <div class="uppercase">
          <slot></slot>
        </div>
      </div>
      <div class="leading-[1.3] mt-auto pt-(--xl)">
        <slot name="description"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const card = ref(null)
const icon = ref(null)
const content = ref(null)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: card.value,
      start: 'center center',
      pin: true,
      end: '+=400',
      //markers: true
    }
  })
  tl.to(content.value, {
    opacity: 1,
    duration: 0.1
  })
  tl.to(content.value, {
    y: -20,
    duration: .2
  })
  tl.to(icon.value, {
    y: -50,
    opacity: 1
  })
})
</script>

<style lang="scss">
.process-card-wrapper {
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  gap: 4px;

  .card-icon {
    aspect-ratio: 4/5;
    transform: translateY(-20%);
  }

  .card-content, .card-icon {
    opacity: 0;
    transform: translateY(-20)
  }

  &:nth-child(even) {
    grid-template-columns: 2.5fr 1fr;
    margin-left: auto;

    .card-icon {
      grid-column: 2;
      grid-row: 1;
    }
  }
}
</style>