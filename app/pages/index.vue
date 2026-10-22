<template>
  <ContentRenderer :value="home" />
</template>

<script lang="ts" setup>
const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())
</script>

<style>

</style>