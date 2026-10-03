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
    <animated-p class="mb-(--md) p-(--sm) md:p-(--md) text-2xl max-w-[30ch] text-balance leading-[1.05]">
      <slot></slot>
    </animated-p>
    <stories-carousel />
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>