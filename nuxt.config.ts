// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },
  site: {
    url: 'https://www.str-drones.eu',
    name: 'STR Drones',
    description: 'Inspección de plantas solares con drones y termografía para detectar averías y mejorar el rendimiento.',
    defaultLocale: 'es',
    trailingSlash: false,
  },
  seo: {
    fallbackTitle: 'Inspección solar con drones',
    meta: {
      description: 'Inspección de plantas solares con drones y termografía para detectar averías y mejorar el rendimiento.',
      author: 'STR Drones',
      ogTitle: 'STR Drones',
      ogDescription: 'Inspección de plantas solares con drones y termografía para detectar averías y mejorar el rendimiento.',
      ogImage: '/images/blog/solar-map.png',
      ogImageAlt: 'Mapa de una instalación solar inspeccionada por STR Drones',
      twitterCard: 'summary_large_image',
      twitterImage: '/images/blog/solar-map.png',
      twitterImageAlt: 'Mapa de una instalación solar inspeccionada por STR Drones',
    },
  },
  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'STR Drones',
      url: 'https://www.str-drones.eu',
      logo: '/apple-touch-icon.png',
      sameAs: [
        'https://www.instagram.com/str.drones/',
        'https://es.linkedin.com/company/str-drones',
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      // Web App de Apps Script que recibe los formularios y clave de sitio de reCAPTCHA (ambas públicas)
      formEndpoint: process.env.NUXT_PUBLIC_FORM_ENDPOINT || '',
      recaptchaSiteKey: process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
    },
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: ['@nuxtjs/i18n', '@nuxtjs/seo', '@nuxt/content', '@nuxt/image', 'nuxt-studio'],
  image: {
    quality: 80,
  },
  studio: {
    repository: {
      provider: 'github',
      owner: 'lecarles',
      repo: 'str-drones',
      branch: 'main',
    },
  },
  content: {
    experimental: {
      sqliteConnector: 'native'
    }
  },
  i18n: {
    defaultLocale: 'es',
    locales: [
      { code: 'en', name: 'English', language: 'en-GB', file: 'en.json' },
      { code: 'es', name: 'Español', language: 'es-ES', file: 'es.json' }
    ]
  }
})