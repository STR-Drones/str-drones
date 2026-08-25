<template>
  <div class="bg-background text-foreground min-h-screen">
    <div class="p-(--sm) md:p-(--md)">
      <marker-section>
        <template #title>
          <slot name="section-title"></slot>
        </template>
        <template #number>
          <slot name="section-number"></slot>
        </template>
      </marker-section>
    </div>
    <animated-p class="p-(--sm) md:p-(--md) text-lg md:text-xl max-w-[30ch] text-balance leading-[1.1]">
      <slot></slot>
    </animated-p>
    <stories-carousel />
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>