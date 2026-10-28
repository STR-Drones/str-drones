import { defineCollection, defineContentConfig } from '@nuxt/content'
import { defineSitemapSchema } from '@nuxtjs/sitemap/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        date: z.string(),
        category: z.string(),
        cover: z.string().min(1).refine(
          (cover) => cover.startsWith('/') || /^https?:\/\//i.test(cover),
          'Cover must be a root-relative local path or an HTTP(S) URL',
        ),
        coverAlt: z.string(),
        sitemap: defineSitemapSchema(),
      }),
    }),
  }
})