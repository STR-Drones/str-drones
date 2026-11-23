<template>
  <div v-if="current" class="slug-page legal-document w-full text-base mx-auto pt-(--md)">
    <div class="legal-meta font-mono text-sm uppercase tracking-wide">
      <span>
        {{ t('legal.version', { n: current.version }) }}
        <template v-if="current.effectiveDate"> · {{ periodLabel(current) }}</template>
      </span>

      <details v-if="versions.length > 1" ref="dropdown" class="legal-versions">
        <summary>{{ t('legal.otherVersions') }}</summary>
        <ul>
          <li v-for="v in versions" :key="v.slug">
            <NuxtLink
              :to="v.slug === latest?.slug ? basePath : `${basePath}/${v.slug}`"
              :aria-current="v.slug === current.slug ? 'page' : undefined"
            >
              {{ t('legal.version', { n: v.version }) }}
              <template v-if="v.slug === latest?.slug"> ({{ t('legal.current') }})</template>
              <span v-if="v.effectiveDate" class="legal-versions-date">{{ formatDate(v.effectiveDate) }}</span>
            </NuxtLink>
          </li>
        </ul>
      </details>
    </div>

    <p v-if="!isLatest" class="legal-outdated" role="note">
      {{ t('legal.outdatedNotice') }}
      <NuxtLink :to="basePath">{{ t('legal.seeCurrent') }}</NuxtLink>
    </p>

    <ContentRenderer v-if="page" :value="page" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  /** Carpeta dentro de content/legal/, p. ej. 'terms-specific' */
  document: string
}>()

const route = useRoute()
const { t, locale } = useI18n()

const basePath = `/${props.document}`
const versionParam = computed(() => (route.params.version as string | undefined) || undefined)

const { data: versions } = await useAsyncData(
  `legal-versions-${props.document}`,
  async () => {
    const rows = await queryCollection('legal')
      .where('path', 'LIKE', `/legal/${props.document}/%`)
      .select('path', 'title', 'version', 'effectiveDate')
      .order('version', 'DESC')
      .all()
    return rows.map(r => ({ ...r, slug: r.path.split('/').pop()! }))
  },
  { default: () => [] },
)

const latest = computed(() => versions.value[0])
const current = computed(() =>
  versionParam.value ? versions.value.find(v => v.slug === versionParam.value) : latest.value,
)
const isLatest = computed(() => current.value?.slug === latest.value?.slug)

if (!current.value) {
  await navigateTo('/', { redirectCode: 302 })
}

const { data: page } = await useAsyncData(
  () => `legal-${props.document}-${current.value?.slug}`,
  () => current.value ? queryCollection('legal').path(current.value.path).first() : Promise.resolve(null),
)

// Las versiones anteriores (y los enlaces permanentes /vN) no se indexan:
// solo la URL base, que siempre muestra la versión vigente.
if (versionParam.value) useRobotsRule('noindex, follow')

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
  ogTitle: () => page.value?.title,
  ogDescription: () => page.value?.description,
})

// Cierra el desplegable al cambiar de versión
const dropdown = ref<HTMLDetailsElement>()
watch(() => route.fullPath, () => { if (dropdown.value) dropdown.value.open = false })

const formatDate = (date: string) =>
  new Intl.DateTimeFormat(locale.value === 'en' ? 'en-GB' : 'es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
    .format(new Date(`${date}T12:00:00`))

type Version = (typeof versions.value)[number]
const periodLabel = (v: Version) => {
  const idx = versions.value.indexOf(v)
  const next = versions.value[idx - 1] // la lista va de más reciente a más antigua
  return next?.effectiveDate
    ? t('legal.inForceBetween', { from: formatDate(v.effectiveDate!), to: formatDate(next.effectiveDate) })
    : t('legal.inForceSince', { date: formatDate(v.effectiveDate!) })
}
</script>

<style lang="scss" scoped>
.legal-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--xs) var(--sm);
  padding-bottom: var(--xs);
  border-bottom: 1px solid var(--color-foreground);
}

.legal-versions {
  position: relative;

  summary {
    cursor: pointer;
    text-decoration: underline;
    list-style: none;

    &::-webkit-details-marker { display: none; }
    &::after { content: ' ▾'; }
  }

  &[open] summary::after { content: ' ▴'; }

  ul {
    position: absolute;
    right: 0;
    z-index: 10;
    min-width: 100%;
    margin: var(--xs) 0 0;
    padding: var(--xs) 0;
    list-style: none;
    white-space: nowrap;
    background: var(--color-background);
    border: 1px solid var(--color-foreground);
  }

  a {
    display: flex;
    gap: var(--sm);
    justify-content: space-between;
    padding: calc(var(--xs) / 2) var(--sm);

    &:hover { background: var(--color-gray-light); }
    &[aria-current='page'] { background: var(--color-primary); }
  }

  .legal-versions-date { opacity: 0.6; }
}

.legal-outdated {
  margin-top: var(--sm);
  padding: var(--sm);
  background: var(--color-primary);

  a { text-decoration: underline; }
}
</style>
