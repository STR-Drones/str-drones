# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Writing blog posts with Nuxt Studio

Nuxt Studio is available in development. Start the site with `npm run dev`, then use the Studio button in the lower-left corner to edit content. Changes made locally are written to the project files; publish them using the usual Git workflow.

Create a Markdown file in `content/blog/`, for example `content/blog/mi-articulo.md`, with this frontmatter:

```md
---
title: "Título del artículo"
description: "Resumen breve para la página del blog."
date: "2026-10-27"
category: "Proyectos"
cover: "/images/blog/mi-imagen.jpg"
coverAlt: "Descripción de la imagen"
---

## Primer apartado

Escribe aquí el contenido del artículo en Markdown.
```

The title, description, date, category, cover image URL, and image description are required. Put local images in `public/images/blog/` and reference them with a root-relative URL such as `/images/blog/mi-imagen.jpg`; an external `https://` image URL is also supported.

For production editing and publishing from Studio, create a GitHub OAuth App with the callback URL `https://YOUR_DOMAIN/__nuxt_studio/auth/github`, then set `NUXT_STUDIO_AUTH_GITHUB_CLIENT_ID` and `NUXT_STUDIO_AUTH_GITHUB_CLIENT_SECRET` in the deployment environment. Studio is configured to publish to `lecarles/str-drones` on `main`. Do not commit OAuth secrets to the repository. See the [Nuxt Studio authentication documentation](https://nuxt.studio/auth-providers).

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
