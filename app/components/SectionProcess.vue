<template>
  <div class="p-(--md) bg-foreground text-gray-light">
    <marker-section color="foreground" >
      <template #title>
        <slot name="section-title"></slot>
      </template>
      <template #number>
        <slot name="section-number"></slot>
      </template>
    </marker-section>
    <div class="max-w-(--max-width) mx-auto">
      <div class="text-2xl text-center my-(--lg)"><slot></slot></div>
      <slot name="items"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>