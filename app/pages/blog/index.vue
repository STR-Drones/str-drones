<template>
  <main class="blog-index px-(--sm) md:px-(--md)">
    <header class="blog-heading">
      <p class="eyebrow"><span class="eyebrow-mark" /> {{ t('blog.eyebrow') }}</p>
      <h1 class="text-3xl leading-tight mt-2">Blog</h1>
      <p class="intro">{{ t('blog.intro') }}</p>
    </header>

    <section class="posts-section" aria-labelledby="latest-posts">
      <div class="uppercase font-mono text-sm flex mb-(--md)">
        <h2 id="latest-posts">{{ t('blog.latestPosts') }}</h2>
        <span class="ml-auto">{{ String(posts?.length ?? 0).padStart(2, '0') }} {{ t('blog.articleCount') }}</span>
      </div>

      <div v-if="posts?.length" class="posts-grid">
        <article v-for="(post, index) in posts" :key="post.path" class="post-card">
          <NuxtLink class="post-link" :to="post.path" :aria-label="t('blog.readArticleLabel', { title: post.title })">
            <div class="post-image">
              <NuxtImg
                :src="post.cover"
                :alt="post.coverAlt"
                :provider="post.cover.startsWith('/') ? 'ipx' : 'none'"
                sizes="320px sm:50vw lg:33vw"
                loading="lazy"
              />
              <span class="image-index"><time :datetime="post.date">{{ formatDate(post.date) }}</time></span>
            </div>
            <h3 class="pt-(--md)">{{ post.title }}</h3>
            <p class="text-base leading-[1.3] mt-(--sm)">{{ post.description }}</p>
            <span class="read-more mt-auto">{{ t('blog.readArticle') }} <span aria-hidden="true">→</span></span>
          </NuxtLink>
        </article>
      </div>
      <p v-else class="empty-state">{{ t('blog.emptyState') }}</p>
    </section>
  </main>
  <section-footer class="mt-(--lg)" />
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const { data: posts } = await useAsyncData('blog-posts', () =>
  queryCollection('content')
    .where('path', 'LIKE', '/blog/%')
    .order('date', 'DESC')
    .all(),
)

useSeoMeta({
  title: () => t('blog.seoTitle'),
  description: () => t('blog.seoDescription'),
  ogTitle: () => t('blog.seoTitle'),
  ogDescription: () => t('blog.seoDescription'),
  ogType: 'website',
  twitterTitle: () => t('blog.seoTitle'),
  twitterDescription: () => t('blog.seoDescription'),
})

const formatDate = (date: string) =>
  new Intl.DateTimeFormat(locale.value === 'en' ? 'en-GB' : 'es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
    .format(new Date(`${date}T12:00:00`))
</script>

<style lang="scss" scoped>
.blog-index {
  max-width: var(--max-width);
  margin: 0 auto;
  padding-top: calc(var(--nav-height) + var(--lg));
}

.blog-heading {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--md) 0 var(--lg);
  border-bottom: 1px solid var(--color-gray);
}

.eyebrow,
.section-heading,
.post-meta,
.read-more,
.blog-footer p {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  letter-spacing: 0;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: var(--sm);
}

.eyebrow-mark {
  display: inline-block;
  width: 0.65em;
  height: 0.65em;
  background: var(--color-primary);
}

.intro {
  max-width: 42ch;
  margin-top: var(--md);
  font-size: var(--text-lg);
  line-height: 1.35;
}

.posts-section {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--sm) 0;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  gap: var(--sm);
  padding-bottom: var(--sm);
  border-bottom: 1px solid var(--color-foreground);
}

.section-heading h2 {
  font: inherit;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--md) var(--sm);
  padding-top: var(--md);
}

.post-link {
  display: block;
  height: 100%;
}

.post-image {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1.35;
  background: var(--color-gray-light);
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.post-link:hover .post-image img {
  transform: scale(1.035);
}

.post-card h3 {
  margin-top: var(--xs);
  font-size: var(--text-xl);
  line-height: 1.02;
  letter-spacing: -0.055em;
}

.read-more {
  display: inline-flex;
  gap: var(--xs);
  margin-top: var(--sm);
  border-bottom: 1px solid var(--color-foreground);
  padding-bottom: 0.25em;
}

.read-more span {
  transition: transform 0.2s ease;
}

.post-link:hover .read-more span {
  transform: translateX(0.2em);
}

.empty-state {
  padding: var(--md) 0;
}

@media (max-width: 54rem) {
  .blog-index {
    padding-top: calc(var(--nav-height) + var(--md));
  }

  .posts-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 38rem) {
  .posts-grid {
    grid-template-columns: 1fr;
    gap: var(--md);
  }

  .post-image {
    aspect-ratio: 1.5;
  }

  .blog-footer {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
