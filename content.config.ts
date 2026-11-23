import { defineCollection, defineContentConfig } from '@nuxt/content'
import { defineSitemapSchema } from '@nuxtjs/sitemap/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: {
        include: '**/*.md',
        // Los documentos legales versionados tienen su propia colección y páginas
        exclude: ['legal/**'],
      },
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
    // Documentos legales versionados: content/legal/<documento>/v<N>.md
    // La versión vigente es la de mayor `version`.
    legal: defineCollection({
      type: 'page',
      source: 'legal/**/*.md',
      schema: z.object({
        version: z.number().int().positive(),
        // Fecha de entrada en vigor (AAAA-MM-DD)
        effectiveDate: z.string().optional(),
      }),
    }),
  }
})
