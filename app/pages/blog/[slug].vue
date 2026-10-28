<template>
  <main v-if="post" class="blog-post">
    <header class="post-header pt-(--lg)">
      <p class="post-date">{{ formatDate(post.date) }}</p>
      <h1 class="text-3xl leading-[.95] tracking-tight pt-(--md)">{{ post.title }}</h1>
      <p class="post-description mt-(--md)">{{ post.description }}</p>
    </header>

    <figure class="post-cover pt-(--md)">
      <NuxtImg
        :src="post.cover"
        :alt="post.coverAlt"
        :provider="post.cover.startsWith('/') ? 'ipx' : 'none'"
        sizes="320px sm:100vw md:80vw"
      />
      <figcaption class="text-gray/50">{{ post.coverAlt }}</figcaption>
    </figure>

    <article class="post-body">
      <ContentRenderer :value="post" />
      <NuxtLink to="/blog" class="back-link bottom-link">← {{ t('blog.backToAllPosts') }}</NuxtLink>
    </article>
  </main>
  <section-footer></section-footer>
</template>

<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()
const slug = computed(() => String(route.params.slug))

const { data: post } = await useAsyncData(
  () => `blog-post-${slug.value}`,
  () => queryCollection('content').path(`/blog/${slug.value}`).first(),
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: t('blog.articleNotFound') })
}

useSeoMeta({
  title: () => post.value?.title ?? t('blog.seoTitle'),
  description: () => post.value?.description,
  ogTitle: () => post.value?.title,
  ogDescription: () => post.value?.description,
  ogImage: () => post.value?.cover,
  ogImageAlt: () => post.value?.coverAlt,
  ogType: 'article',
  twitterTitle: () => post.value?.title,
  twitterDescription: () => post.value?.description,
  twitterImage: () => post.value?.cover,
  twitterImageAlt: () => post.value?.coverAlt,
})

const formatDate = (date: string) =>
  new Intl.DateTimeFormat(locale.value === 'en' ? 'en-GB' : 'es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
    .format(new Date(`${date}T12:00:00`))
</script>

<style lang="scss" scoped>
.blog-post {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: calc(var(--nav-height) + var(--md)) var(--sm) var(--lg);
}

.post-topline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--sm);
  max-width: var(--nav-max-width);
  margin: 0 auto var(--md);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0;
}

.back-link {
  width: fit-content;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.25em;
}

.post-header {
  max-width: var(--nav-max-width);
  margin: 0 auto;
}

.post-date {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0;
  text-transform: uppercase;
}

.post-description {
  max-width: 62ch;
  margin-bottom: var(--md);
  font-size: var(--text-lg);
  line-height: 1.35;
}

.post-cover {
  max-width: var(--nav-max-width);
  margin: 0 auto;
}

.post-cover img {
  display: block;
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  background: var(--color-gray-light);
}

.post-cover figcaption {
  margin-top: var(--xs);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0;
}

.post-body {
  max-width: 72ch;
  margin: var(--lg) auto 0;
  font-size: var(--text-base);
  line-height: 1.6;
}

.post-body :deep(h2) {
  margin: var(--md) 0 var(--xs);
  font-size: var(--text-xl);
  line-height: 1.05;
  letter-spacing: -0.05em;
}

.post-body :deep(h3) {
  margin: var(--md) 0 var(--xs);
  font-size: var(--text-lg);
  line-height: 1.1;
}

.post-body :deep(p) {
  margin: var(--sm) 0;
}

.post-body :deep(ul) {
  margin: var(--sm) 0;
  padding-left: 1.3em;
  list-style: disc;
}

.post-body :deep(li) {
  padding-left: 0.25em;
  margin: 0.35em 0;
}

.bottom-link {
  display: inline-block;
  margin-top: var(--md);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
}

@media (max-width: 38rem) {
  .blog-post {
    padding-top: calc(var(--nav-height) + var(--sm));
  }

  .post-topline {
    align-items: flex-start;
  }

  .post-number {
    text-align: right;
  }

  .post-cover img {
    aspect-ratio: 1.2;
  }
}
</style>
