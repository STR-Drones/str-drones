<template>
  <section class="section-what px-(--sm) md:px-(--md) pt-(--xl) pb-(--md) min-h-screen">
    <marker-section>
      <template #title>
        <slot name="section-title"></slot>
      </template>
      <template #number>
        <slot name="section-number"></slot>
      </template>
    </marker-section>
    <div class="flex flex-col gap-(--md)">
      <slot name="list"></slot>
    </div>
  </section>
</template>

<style>
.section-what {
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  gap: var(--md);
}

@media (max-width: 52rem) {
  .section-what {
    grid-template-columns: 1fr;
  }
}
</style>
