<template>
  <div class="bg-background p-(--md) text-foreground min-h-screen">
    <marker-section>
      <template #title>
        <slot name="section-title"></slot>
      </template>
      <template #number>
        <slot name="section-number"></slot>
      </template>
    </marker-section>
    <animated-p class="text-xl max-w-[30ch] text-balance leading-[1.1] mt-(--md)">
      <slot></slot>
    </animated-p>
    <stories-carousel />
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>