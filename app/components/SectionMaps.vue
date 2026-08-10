<template>
  <div class="p-(--md) h-screen">
    <marker-section>
      <template #title>
        <slot name="section-title"></slot>
      </template>
      <template #number>
        <slot name="section-number"></slot>
      </template>
    </marker-section>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>