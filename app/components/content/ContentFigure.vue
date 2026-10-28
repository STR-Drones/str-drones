<script setup lang="ts">
const props = defineProps<{
  src: string
  alt: string
  caption: string
  width: number
  height: number
  sizes?: string
  secondSrc?: string
  secondAlt?: string
  secondWidth?: number
  secondHeight?: number
}>()

const isPair = computed(() => Boolean(props.secondSrc))
</script>

<template>
  <figure :class="{ 'figure-pair': isPair }">
    <div v-if="secondSrc" class="figure-images">
      <NuxtImg :src="src" :alt="alt" :sizes="sizes" :width="width" :height="height" />
      <NuxtImg
        :src="secondSrc"
        :alt="secondAlt ?? ''"
        :sizes="sizes"
        :width="secondWidth ?? width"
        :height="secondHeight ?? height"
      />
    </div>
    <NuxtImg v-else :src="src" :alt="alt" :sizes="sizes" :width="width" :height="height" />
    <figcaption class="text-foreground/50">{{ caption }}</figcaption>
  </figure>
</template>
