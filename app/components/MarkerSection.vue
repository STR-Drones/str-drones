<template>
  <div :class="['flex gap-2 uppercase font-mono text-base tracking-wider', `scheme-${props.color}`]">
    <div class="section-number px-1 h-fit"><slot name="number"></slot></div>
    <div class="section-name px-1 h-fit"><slot name="title"></slot></div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  number: String,
  color: {
    type: String,
    default: "base"
  }
})
</script>

<style>
.scheme-base .section-number {
  background-color: var(--color-primary);
}

.scheme-base .section-name {
  background-color: var(--color-gray-light);
}

.scheme-foreground .section-number {
  background-color: var(--color-primary);
  color: var(--color-foreground);
}

.scheme-foreground .section-name {
  background-color: var(--color-gray);
  color: var(--color-background)
}

.scheme-primary .section-number {
  background-color: var(--color-foreground);
  color: var(--color-primary)
}

.scheme-primary .section-name {
  background-color: var(--color-gray-light);
}
</style>