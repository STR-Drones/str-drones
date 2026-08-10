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
    <div class="text-xl max-w-[30ch] text-balance leading-[1.1] mt-(--md)">
      Somos un equipo familiar, apasionado de la tecnología y obsesionado con resolver tus problemas. 
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>