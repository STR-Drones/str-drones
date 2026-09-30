<template>
  <div class="slug-page w-full text-base mx-auto p-(--md)">
    <ContentRenderer v-if="page" :value="page" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const path = computed(() => `/${(route.params.slug as string[]).join('/')}`)

const { data: page } = await useAsyncData(
  () => `content-${path.value}`,
  () => queryCollection('content').path(path.value).first()
)
</script>

<style lang="scss">
.slug-page {
  max-width: 80ch;
  padding: calc(var(--nav-height) + var(--md)) var(--sm);

  tr {
    border-bottom: 1px solid var(--color-foreground);
    line-height: 1.2;
  }

  td, th {
    padding: 0.3em var(--sm);
    text-align: left;
  }

  p {
    font-size: var(--text-base);
    padding-top: var(--sm);
  }

  h1 {
    font-size: var(--text-xl);
    line-height: 1;
    text-wrap: balance;
    padding: var(--md) 0;
  }

  h2 {
    font-size: var(--text-lg);
    line-height: 1;
    padding-top: var(--md);
    text-wrap: balance;
  }

  h3 {
    font-size: var(--text-md);
    line-height: 1;
    padding-top: var(--md);
    text-wrap: balance;
  }
}
</style>