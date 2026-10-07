<template>
  <div class="bg-primary px-(--md) pt-26 text-foreground flex flex-col min-h-screen">
    <div class="footer menu text-base font-mono tracking-wide uppercase grid grid-cols-3 underline">
      <div class="flex items-baseline gap-(--sm)">
        <div class="h-[1em] bg-foreground aspect-square"></div>
        <div class="flex flex-col">
          <nuxt-link to="terms-and-conditions" class="text-md link">Términos y condiciones generales</nuxt-link>
          <nuxt-link to="terms-image-processing" class="text-md link">Procesado de imágenes</nuxt-link>
          <nuxt-link to="terms-image-retrieval" class="text-md link">Recogida de imágenes</nuxt-link>
        </div>
      </div>
      <div class="flex items-baseline gap-(--sm)">
        <div class="h-[1em] bg-foreground aspect-square"></div>
        <div class="flex flex-col">
            <a class="text-md link" target="_blank" href="https://www.instagram.com/str.drones/">Instagram ↗</a>
            <a class="text-md link" target="_blank" href="https://es.linkedin.com/company/str-drones">Linkedin ↗</a>
        </div>
      </div>
      <div class="flex items-baseline gap-(--sm)">
        <div class="h-[1em] bg-foreground aspect-square"></div>
        <div class="flex flex-col">
          <a class="text-md link" target="_blank" href="tel:+34641147164">+34 641 147 164</a>
          <a class="text-md link" target="_blank" href="mailto:ellop@str-drones.com">ellop@str-drones.com</a>
        </div>
      </div>
    </div>
  <str-logo class="pt-(--lg) pb-(--md) mt-auto"/>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>