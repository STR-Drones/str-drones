<template>
  <div class="process-card-wrapper font-mono text-base text-gray-light max-w-[60ch]">
    <div class="card-icon bg-gray-dark border border-gray"></div>
    <div class="flex flex-col card-content bg-gray-dark border border-gray min-h-[10em] p-(--sm)">
      <div class="flex gap-2">
        <div class="bg-primary aspect-square h-[1.6em] flex items-center justify-center text-foreground"><slot name="number"></slot></div>
        <div class="uppercase">
          <slot></slot>
        </div>
      </div>
      <div class="leading-[1.2] mt-auto">
        <slot name="description"></slot>
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