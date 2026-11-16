<template>
  <div class="p-(--sm) md:p-(--md) min-h-screen flex flex-col relative">
    <marker-section>
      <template #title>
        <slot name="section-title"></slot>
      </template>
      <template #number>
        <slot name="section-number"></slot>
      </template>
    </marker-section>
    <div class="relative z-3 maps grid items-center justify-center md:grid-cols-[1.33fr_1fr] gap-4 max-w-(--max-width) m-auto pt-20 pb-30">
      <div>
        <div class="relative">
          <div
            ref="imageComparison"
            class="image image-comparison relative aspect-[4/3] select-none overflow-hidden touch-none"
            @pointerdown="startComparisonDrag"
            @pointermove="moveComparisonDrag"
            @pointerup="stopComparisonDrag"
            @pointercancel="stopComparisonDrag"
          >
            <img
              :src="selectedAnomaly.img"
              :alt="`${selectedAnomaly.type} anomaly in the RGB inspection image`"
              class="absolute inset-0 h-full w-full object-cover pointer-events-none"
            />
            <div
              class="absolute inset-0 overflow-hidden"
              :class="!isDragging && 'transition-[clip-path] duration-500 motion-reduce:transition-none'"
              :style="{ clipPath: `inset(0 ${100 - comparisonPosition}% 0 0)` }"
            >
              <img
                :src="selectedAnomaly.thermalImg"
                :alt="`${selectedAnomaly.type} anomaly in the thermal inspection image`"
                class="pointer-events-none absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <img
                :src="selectedAnomaly.squareImg"
                alt=""
                aria-hidden="true"
                class="square-img pointer-events-none absolute inset-0 h-full w-full object-fill"
            />
              <img
              :src="selectedAnomaly.alertImg"
              alt=""
              aria-hidden="true"
              class="alert-img pointer-events-none absolute inset-0 h-full w-full object-fill"
            />
            <div
              class="absolute inset-y-0 z-10 w-0.5 bg-primary"
              :class="!isDragging && 'transition-[left] duration-500 motion-reduce:transition-none'"
              :style="{ left: `${comparisonPosition}%` }"
              aria-hidden="true"
            >
              <div class="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-primary text-foreground">
                <span aria-hidden="true">↔</span>
              </div>
            </div>
            <div
              class="absolute inset-y-0 z-20 w-10 -translate-x-1/2 cursor-ew-resize focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow"
              :style="{ left: `${comparisonPosition}%` }"
              role="slider"
              tabindex="0"
              aria-orientation="horizontal"
              :aria-label="$t('maps.comparisonSlider')"
              :aria-valuemin="0"
              :aria-valuemax="100"
              :aria-valuenow="comparisonPosition"
              :aria-valuetext="comparisonValueText"
              @keydown="handleComparisonKeydown"
            ></div>
          </div>
        </div>
        <div class="grid image-info grid-cols-[1fr_auto] gap-2 mt-2">
          <div class="bg-background info flex border border-gray-light px-3 py-2 items-center">
            <div class="square aspect-square h-[1em] text-lg bg-primary mr-4"></div>
            <div class="text-lg">
              {{ $t(`maps.anomalyTypes.${selectedAnomaly.type}`) }}
            </div>
            <div class="text-lg ml-auto">
              {{ selectedAnomaly.temperature }}
            </div>
          </div>
          <button
              type="button"
              class="text-foreground bg-primary px-4 min-w-[16ch] py-1 font-mono text-sm uppercase tracking-wider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              @click="showOtherImage"
            >
              {{ comparisonPosition < 50 ? $t('maps.showThermal') : $t('maps.showRgb') }}
            </button>
        </div>
      </div>
      <div class="content">
        <div class="grid grid-cols-2 gap-2">
          <div class="info-inspection border border-gray-light px-3 py-2 leading-tight flex flex-col">
            <div class="font-mono text-sm uppercase tracking-wider">
              {{$t('maps.inspection')}}
            </div>
            <div class="text-lg pt-(--sm) mt-auto">
              {{ $t('maps.completed')}}
            </div>
          </div>
          <div class="info-anomalies border border-gray-light px-4 py-3 leading-tight flex flex-col">
            <div class="font-mono text-sm uppercase tracking-wider">
              {{$t('maps.anomalies')}}
            </div>
            <div class="text-lg pt-(--sm) mt-auto">
              {{ anomaliesList.length }}
            </div>
          </div>
        </div>
        <div class="border border-gray-light anomalies-list text-sm flex flex-col mt-2 p-2">
          <div class="anomaly-select p-2 border-b border-gray-light border-dashed">
            <div class="text-sm">
              {{$t('maps.selectAnomaly')}}
            </div>
          </div>
          <button
            v-for="anomaly in anomaliesList"
            :key="anomaly.id"
            type="button"
            :aria-pressed="selectedAnomaly.id === anomaly.id"
            :class="[
              'anomaly-button grid grid-cols-[12ch_1fr] items-center justify-start gap-4  px-2 py-4 text-left uppercase hover:bg-gray-light/50',
              { 'border border-gray/60 border-t-gray/60': selectedAnomaly.id === anomaly.id },
              { 'border border-transparent border-t border-t-gray-light': selectedAnomaly.id !== anomaly.id }
            ]"
            @click="selectedAnomaly = anomaly"
          >
            <div :class="[anomaly.color, 'font-mono border flex w-fit px-2 py-1']">
              {{ anomaly.type }}
            </div>
            <div class="font-mono">
              {{ anomaly.imgName }}
            </div>
          </button>
        </div>
      </div>
    </div>
    <div class="z-1 bg-linear absolute bottom-0 w-full left-0 right-0 bg-linear-to-b from-transparent to-primary h-[15vh]"></div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { computed, onMounted, onUnmounted, ref } from 'vue'

import cellAlert from '~/assets/img/maps/alerts/cell.svg'
import diodeAlert from '~/assets/img/maps/alerts/diode.svg'
import moduleAlert from '~/assets/img/maps/alerts/module.svg'
import multicellAlert from '~/assets/img/maps/alerts/multicell.svg'
import polarityAlert from '~/assets/img/maps/alerts/polarity.svg'
import cellClean from '~/assets/img/maps/clean/JPG/cell.jpg'
import diodeClean from '~/assets/img/maps/clean/JPG/diode.jpg'
import moduleClean from '~/assets/img/maps/clean/JPG/module.jpg'
import multicellClean from '~/assets/img/maps/clean/JPG/multicell.jpg'
import polarityClean from '~/assets/img/maps/clean/JPG/polarity.jpg'
import cellSquare from '~/assets/img/maps/squares/cell.svg'
import diodeSquare from '~/assets/img/maps/squares/diode.svg'
import moduleSquare from '~/assets/img/maps/squares/module.svg'
import multicellSquare from '~/assets/img/maps/squares/multicell.svg'
import polaritySquare from '~/assets/img/maps/squares/polarity.svg'
import cellThermal from '~/assets/img/maps/thermal/cell.jpg'
import diodeThermal from '~/assets/img/maps/thermal/diode.jpg'
import moduleThermal from '~/assets/img/maps/thermal/module.jpg'
import multicellThermal from '~/assets/img/maps/thermal/multicell.jpg'
import polarityThermal from '~/assets/img/maps/thermal/polarity.jpg'

const anomaliesList = [
  {
    id: 1,
    type: 'diode',
    color: 'text-gold border-gold',
    temperature: '55.6°C',
    imgName: 'DJI_DIODE_0001.jpg',
    alertImg: diodeAlert,
    squareImg: diodeSquare,
    img: diodeClean,
    thermalImg: diodeThermal,
  },
  {
    id: 2,
    type: 'module',
    color: 'text-orange border-orange',
    temperature: '60.2°C',
    imgName: 'DJI_MODULE_0011.jpg',
    alertImg: moduleAlert,
    squareImg: moduleSquare,
    img: moduleClean,
    thermalImg: moduleThermal,
  },
  {
    id: 3,
    type: 'polarity',
    color: 'text-red border-red',
    temperature: '73.9°C',
    imgName: 'DJI_POLARITY_0031.jpg',
    alertImg: polarityAlert,
    squareImg: polaritySquare,
    img: polarityClean,
    thermalImg: polarityThermal,
  },
  {
    id: 4,
    type: 'cell',
    color: 'text-magenta border-magenta',
    temperature: '58.7°C',
    imgName: 'DJI_CELL_0203.jpg',
    alertImg: cellAlert,
    squareImg: cellSquare,
    img: cellClean,
    thermalImg: cellThermal,
  },
  {
    id: 5,
    type: 'multicell',
    color: 'text-purple border-purple',
    temperature: '88.8°C',
    imgName: 'DJI_MULTICELL_0007.jpg',
    alertImg: multicellAlert,
    squareImg: multicellSquare,
    img: multicellClean,
    thermalImg: multicellThermal,
  },
]

const selectedAnomaly = ref<(typeof anomaliesList)[number]>(anomaliesList[0]!)
const imageComparison = ref<HTMLDivElement | null>(null)
const comparisonPosition = ref(50)
const isDragging = ref(false)
const activePointerId = ref<number | null>(null)
let alertPulse: gsap.core.Tween | undefined
let startAnimation: gsap.core.Timeline | undefined
const comparisonValueText = computed(() => (
  comparisonPosition.value < 50 ? 'RGB' : 'Thermal'
))

onMounted(() => {
  const alertImage = imageComparison.value?.querySelector('.alert-img')
  if (!alertImage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  alertPulse = gsap.to(alertImage.value, {
    opacity: 0.15,
    duration: 0.2,
    ease: 'steps(1)',
    repeat: -1,
    yoyo: true,
    repeatDelay: 0.45,
  })

  startAnimation = gsap.timeline({ scrollTrigger: { trigger: alertImage.value, start: 'top 60%' } })
  startAnimation.fromTo(".info-inspection", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power4.inOut' })
  startAnimation.fromTo(".info-anomalies", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power4.inOut' })
  startAnimation.fromTo(".anomaly-button, .anomaly-select", { opacity: 0, x: 10 }, { opacity: 1, x: 0, duration: 0.15, ease: 'power4.inOut', stagger: 0.1 }, '<')
  startAnimation.fromTo(".image-comparison", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power4.inOut' }, '<0.1')
  startAnimation.fromTo(".image-info", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power4.inOut' }, '<0.1')
})

onUnmounted(() => {
  alertPulse?.kill()
  startAnimation?.kill()
})

function updateComparisonPosition(clientX: number, element: HTMLElement) {
  const bounds = element.getBoundingClientRect()
  if (bounds.width === 0) return

  comparisonPosition.value = Math.round(
    Math.min(100, Math.max(0, ((clientX - bounds.left) / bounds.width) * 100)),
  )
}

function startComparisonDrag(event: PointerEvent) {
  if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return

  const element = event.currentTarget as HTMLElement
  activePointerId.value = event.pointerId
  isDragging.value = true
  element.setPointerCapture(event.pointerId)
  updateComparisonPosition(event.clientX, element)
}

function moveComparisonDrag(event: PointerEvent) {
  if (!isDragging.value || event.pointerId !== activePointerId.value) return
  updateComparisonPosition(event.clientX, event.currentTarget as HTMLElement)
}

function stopComparisonDrag(event: PointerEvent) {
  if (event.pointerId !== activePointerId.value) return
  isDragging.value = false
  activePointerId.value = null
}

function handleComparisonKeydown(event: KeyboardEvent) {
  const increments: Record<string, number> = {
    ArrowLeft: -5,
    ArrowDown: -5,
    ArrowRight: 5,
    ArrowUp: 5,
    PageDown: -10,
    PageUp: 10,
  }

  if (event.key === 'Home') {
    comparisonPosition.value = 0
  } else if (event.key === 'End') {
    comparisonPosition.value = 100
  } else if (event.key in increments) {
    event.preventDefault()
    comparisonPosition.value = Math.min(100, Math.max(0, comparisonPosition.value + increments[event.key]!))
  }
}

function showOtherImage() {
  comparisonPosition.value = comparisonPosition.value < 50 ? 100 : 0
}
</script>

<style>

</style>