<template>
  <ContentRenderer :value="home" />
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())

useSeoMeta({
  title: () => t('home.seoTitle'),
  description: () => t('home.seoDescription'),
  ogTitle: () => t('home.seoTitle'),
  ogDescription: () => t('home.seoDescription'),
  ogType: 'website',
  twitterTitle: () => t('home.seoTitle'),
  twitterDescription: () => t('home.seoDescription'),
})
</script>

<style>

</style>