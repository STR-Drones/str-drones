<template>
  <div class="relative bg-background text-foreground min-h-screen flex flex-col">
    <marker-section class="relative p-(--sm) md:p-(--md) z-10" color="primary">
      <template #title>
        <slot name="section-title"></slot>
      </template>
      <template #number>
        <slot name="section-number"></slot>
      </template>
    </marker-section>
    <div class="relative max-w-(--max-width) mx-auto text-center flex flex-col items-center z-10 m-auto pb-(--lg)">
      <div class="text-hero leading-[1.1] p-(--sm)"><slot></slot></div>
      <animated-p class="text-lg max-w-[40ch] leading-[1.2] text-balance p-(--sm)">
        <slot name="description"></slot>
      </animated-p>
      <!-- <div class="flex flex-col gap-2">
        <label for="name" class="text-sm font-mono text-gray uppercase mt-(--md)">Introduce tu correo</label>
        <input type="email" id="email" name="name" placeholder="ejemplo@correo.com" class="border border-foreground text-lg px-2 mt-1" />
        <button class="bg-primary text-foreground text-lg flex items-center px-4 text-center">Contactad conmigo</button>
      </div> -->
      <a class="bg-primary text-foreground text-xl flex items-center px-4 text-center mt-(--md)" href="mailto:hello@str-drones.eu">Envianos un correo →</a>
      <div class="text-xs font-mono text-gray opacity-50 uppercase mt-(--md) px-(--md) text-balance">Se abrirá tu gestor de correo. Si lo prefieres, puedes escribir a hello@str-drones.eu</div>
    </div>
    <logo-marquee />
    <div class="z-1 bg-linear absolute top-0 w-full left-0 right-0 bg-linear-to-b from-primary to-transparent h-[50vh]"></div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>