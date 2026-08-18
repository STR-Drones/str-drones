<template>
<svg class="spinning-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 126.08 126.08">
  <g class="aspes aspes-rect" id="x-br-rect">
    <line class="cls-1" x1="99.96" y1="126.08" x2="99.96" y2="73.85"/>
    <line class="cls-1" x1="126.08" y1="99.96" x2="73.85" y2="99.96"/>
  </g>
  <g class="aspes aspes-rect" id="x-bl-rect">
    <line class="cls-1" x1="26.11" y1="73.85" x2="26.11" y2="126.08"/>
    <line class="cls-1" x1="52.22" y1="99.96" y2="99.96"/>
  </g>
  <g class="aspes aspes-rect" id="x-tr-rect">
    <line class="cls-1" x1="126.08" y1="26.11" x2="73.85" y2="26.11"/>
    <line class="cls-1" x1="99.96" y1="0" x2="99.96" y2="52.22"/>
  </g>
  <g class="aspes aspes-rect" id="x-tl-rect">
    <line class="cls-1" x1="26.11" y1="52.22" x2="26.11"/>
    <line class="cls-1" x1="0" y1="26.11" x2="52.22" y2="26.11"/>
  </g>
  <g class="aspes aspes-cross" id="x-br">
    <line class="cls-1" x1="81.5" y1="118.43" x2="118.43" y2="81.5"/>
    <line class="cls-1" x1="118.43" y1="118.43" x2="81.5" y2="81.5"/>
  </g>
  <g class="aspes aspes-cross" id="x-bl">
    <line class="cls-1" x1="44.57" y1="81.5" x2="7.65" y2="118.43"/>
    <line class="cls-1" x1="44.57" y1="118.43" x2="7.65" y2="81.5"/>
  </g>
  <g id="x-center">
    <line class="cls-1" x1="81.5" y1="44.57" x2="44.57" y2="81.5"/>
    <line class="cls-1" x1="81.5" y1="81.5" x2="44.57" y2="44.57"/>
  </g>
  <g class="aspes aspes-cross" id="x-tr">
    <line class="cls-1" x1="118.43" y1="44.57" x2="81.5" y2="7.65"/>
    <line class="cls-1" x1="118.43" y1="7.65" x2="81.5" y2="44.57"/>
  </g>
  <g class="aspes aspes-cross" id="x-tl">
    <line class="cls-1" x1="7.65" y1="44.57" x2="44.57" y2="7.65"/>
    <line class="cls-1" x1="7.65" y1="7.65" x2="44.57" y2="44.57"/>
  </g>
</svg>
</template>

<script setup>
import gsap from 'gsap'
import { onMounted } from 'vue'
import ScrollTrigger from 'gsap/ScrollTrigger'

onMounted(() => {
  gsap.utils.toArray('.aspes').forEach((group) => {
    const box = group.getBBox()
    const cx = box.x + box.width / 2
    const cy = box.y + box.height / 2

    gsap.set(group, {
      svgOrigin: `${cx} ${cy}`,
      transformOrigin: 'center center'
    })
  })

  gsap.set('.spinning-logo', {
    opacity: 1,
  })

  let tl = gsap.timeline({ ease: 'none',
    scrollTrigger: {
      trigger: '.section-hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      invalidateOnRefresh: true,
    }
  })

  tl.fromTo('.aspes-rect', {
    rotation: -45
  }, {
    rotation: 0,
    duration: .2,
  })
  tl.to('.aspes', {
    rotation: 360,
    duration: 2
  })
})
</script>

<style scoped>
.cls-1 {
  fill: none;
  stroke: var(--color-foreground);
  stroke-miterlimit: 10;
  stroke-width: 9px;
}

.spinning-logo {
  opacity: 0;
}
</style>