<template>
  <div>
    <section-hero />
    <section-what />
    <section-why />
    <section-process />
    <section-maps />
    <section-demo />
    <section-us />
    <section-footer />
  </div>
</template>

<script lang="ts" setup>
const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())
</script>

<style>

</style>