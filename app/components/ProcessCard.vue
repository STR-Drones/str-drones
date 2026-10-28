<template>
  <div ref="card" class="process-card-wrapper py-(--sm) md:py-0 font-mono text-base text-gray-light max-w-[60ch]">
    <div ref="icon" class="card-icon bg-gray-dark border border-gray">
      <slot name="number"></slot>
    </div>
    <div ref="content" class="flex flex-col card-content bg-gray-dark border border-gray md:min-h-[10em] p-(--sm) max-w-[42ch]">
      <div class="flex gap-2">
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
  tl.to(icon.value, {
    y: -20,
    opacity: 1,
    duration: 0.2
  })
  tl.to(content.value, {
    opacity: 1,
    duration: 0.1
  })
  tl.to(content.value, {
    y: -20,
    duration: .2
  })
})
</script>

<style lang="scss">
.process-card-wrapper {
  display: grid;
  grid-template-columns: 3em 2.5fr;
  gap: 4px;

  .card-icon {
    aspect-ratio: 1;
    background: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-foreground);
  }

  .card-content, .card-icon {
    opacity: 0;
  }

  &:nth-child(even) {
    grid-template-columns: 2.5fr 3em;
    margin-left: auto;

    .card-icon {
      grid-column: 2;
      grid-row: 1;
    }
  }
}

@media (max-width: 52rem) {
  .process-card-wrapper {
      width: 100%;
    .card-content, .card-icon {
      opacity: 0;
      transform: unset !important;
    }
  }
}
</style>