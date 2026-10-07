<template>
  <section class="relative section-what px-(--sm) md:px-(--md) pt-(--xl) pb-(--md) min-h-screen">
    <marker-section class="absolute top-0 left-0 px-(--sm) md:px-(--md) pt-(--xl)">
      <template #title>
        <slot name="section-title"></slot>
      </template>
      <template #number>
        <slot name="section-number"></slot>
      </template>
    </marker-section>
    <div class="flex flex-col gap-(--md) w-full max-w-(--max-width) align-end mx-auto justify-end">
      <slot name="list"></slot>
    </div>
  </section>
</template>
