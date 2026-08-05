<template>
  <section class="section-what px-(--md) pt-(--xl) pb-(--md) min-h-screen">
    <marker-section name="what" number="01" />
    <div class="flex flex-col gap-(--md)">
      <collapsible-item v-for="i in 4" title="title asfgasfafss" description="asdfgsdgdsgg!!" :i="1"></collapsible-item>
    </div>
  </section>
</template>

<style>
.section-what {
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  gap: var(--md);
}

@media (max-width: 1000px) {
  .section-what {
    grid-template-columns: 1fr;
  }
}
</style>
