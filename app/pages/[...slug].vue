<template>
  <div class="slug-page w-full text-base mx-auto p-(--md)">
    <ContentRenderer v-if="page" :value="page" />
  </div>
  <section-footer />
</template>

<script lang="ts" setup>
const route = useRoute()
const path = computed(() => `/${(route.params.slug as string[]).join('/')}`)

const { data: page } = await useAsyncData(
  () => `content-${path.value}`,
  () => queryCollection('content').path(path.value).first()
)

useSeoMeta({
  title: () => page.value?.title ?? 'STR Drones',
  description: () => page.value?.description,
  ogTitle: () => page.value?.title,
  ogDescription: () => page.value?.description,
})
</script>

<style lang="scss">
.slug-page {
  max-width: 80ch;
  padding: calc(var(--nav-height) + var(--md)) var(--sm);

  ul {
    list-style: disc;
    padding-left: var(--md);
    margin-top: var(--md);
  }

  ul ul {
    list-style: circle;
    margin-top: 0;
    margin-bottom: var(--xs);
  }

  ol {
    list-style: decimal;
    padding-left: var(--md);
  }

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
    font-size: var(--text-3xl);
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

  figure {
    margin: var(--md) 0;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  figcaption {
    padding-top: var(--xs);
    font-size: var(--text-sm);
  }

  .figure-images {
    display: flex;
    gap: var(--sm);
    align-items: flex-start;

    img {
      width: calc(50% - var(--xs));
    }
  }
}
</style>