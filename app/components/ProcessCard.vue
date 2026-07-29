<template>
  <div class="process-card-wrapper font-mono text-base text-gray-light max-w-[60ch]">
    <div class="card-icon bg-gray-dark border border-gray"></div>
    <div class="flex flex-col card-content bg-gray-dark border border-gray min-h-[10em] p-(--sm)">
      <div class="flex gap-2">
        <div class="bg-primary aspect-square h-[1.6em] flex items-center justify-center text-foreground">01</div>
        <div class="uppercase">Gestionamos los permisos</div>
      </div>
      <div class="leading-[1.2] mt-auto">
        Gestionamos toda la burocracia necesaria para volar por ti, o te ayudamos a hacerlo si prefieres encargarte tú mismo.
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>
.process-card-wrapper {
  display: grid;
  grid-template-columns: 1fr 3.25fr;
  gap: 4px;
}
</style>