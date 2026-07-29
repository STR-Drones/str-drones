<template>
  <div class="p-(--md) bg-foreground text-gray-light">
    <marker-section number="03" name="El proceso" color="foreground" />
    <div class="max-w-(--max-width) mx-auto">
      <div class="text-2xl text-center my-(--lg)">Nos ocupamos de todo</div>
      <process-card v-for="i in 4" />
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>