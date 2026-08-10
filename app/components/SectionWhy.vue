<template>
  <div class="bg-foreground text-background p-(--md)">
    <marker-section color="foreground" >
      <template #title>
        <slot name="section-title"></slot>
      </template>
      <template #number>
        <slot name="section-number"></slot>
      </template>
    </marker-section>
    <div class="max-w-(--max-width) mx-auto">
      <div class="flex mt-(--md) gap-(--md)">
        <div class="text-3xl leading-[0.9]">
          <slot></slot>
        </div>
        <animated-p class="text-lg w-[50ch] leading-tight ml-auto text-balance">
          <slot name="description"></slot>
        </animated-p>
      </div>
      <cells-svg class="mt-(--lg)" />
      <error-card>
        <slot name="card-title"></slot>
        <template #body>
          <slot name="card-body"></slot>
        </template>
        <template #footer>
          <slot name="card-footer"></slot>
        </template>
      </error-card>
    </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss">
.error-card-wrapper {
  transition: transform 0.1s ease-in-out;

  &:hover { 
    transform: scale(1.08)
  }
}
</style>