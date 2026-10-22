<template>
  <div class="bg-primary text-base px-(--sm) md:px-(--md) pt-26 text-foreground flex flex-col min-h-screen">
    <div class="footer menu font-mono tracking-wide uppercase gap-2 flex flex-col md:grid grid-cols-3 underline">
      <div class="flex items-baseline gap-(--sm)">
        <div class="h-[1em] bg-foreground aspect-square"></div>
        <div class="flex flex-col">
          <nuxt-link to="terms-and-conditions" class="link">Términos y condiciones generales</nuxt-link>
          <nuxt-link to="terms-specific" class="link">Términos y condiciones particulares</nuxt-link>
        </div>
      </div>
      <div class="flex items-baseline gap-(--sm)">
        <div class="h-[1em] bg-foreground aspect-square"></div>
        <div class="flex flex-col">
            <a class="link" target="_blank" href="https://www.instagram.com/str.drones/">Instagram ↗</a>
            <a class="link" target="_blank" href="https://es.linkedin.com/company/str-drones">Linkedin ↗</a>
        </div>
      </div>
      <div class="flex items-baseline gap-(--sm)">
        <div class="h-[1em] bg-foreground aspect-square"></div>
        <div class="flex flex-col">
          <a class="link" target="_blank" href="tel:+34641147164">+34 641 147 164</a>
          <a class="link" target="_blank" href="mailto:hello@str-drones.com">hello@str-drones.com</a>
        </div>
      </div>
    </div>
  <str-logo class="pt-(--lg) pb-(--sm) md:pb-(--md) mt-auto"/>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>