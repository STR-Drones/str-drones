<template>
  <div class="error-card-wrapper">
        <div class="error-card transform -translate-y-20 card mx-auto bg-gray-dark border border-gray text-sm md:text-base text-gray-light uppercase font-mono p-2 max-w-[30ch]  md:max-w-[50ch] leading-[1.1]">
          <div>
            <div class="flex gap-[0.5em] border-b border-dashed items-center pb-2">
              <div class="bg-primary h-[2em] aspect-square"></div>
              <div><slot></slot></div>
            </div>
            <div class="pl-[2.5em] py-2">
              <slot name="body"></slot>
            </div>
            <div class="bg-gray px-2 py-2 mt-2">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>