<template>
  <div class="app-nav-wrapper w-full relative mt-(--sm) flex flex-col z-100 px-(--sm) gap-[1px]">
    <div class="font-mono text-base w-full max-w-(--nav-max-width) gap-2 mx-auto bg-background border border-gray-light flex p-2 items-center justify-end">
      <nuxt-link class="mr-auto" to="/"><str-logo-animated /></nuxt-link>
      <a href="https://maps.str-drones.eu" target="_blank" class="bg-yellow flex leading-[1.1] h-[2em] px-3 py-2 items-center tracking-wide uppercase">STR Maps</a>
      <button @click="toggleNav" :class="['toggle flex items-center justify-center aspect-square h-[2em] p-2 bg-gray-light text-foreground', showNav ? 'open' : '' ]">
        <svg class="w-full stroke-current stroke-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.74 47.74">
          <line class="cls-1" y1="23.87" x2="47.74" y2="23.87"/><line class="cls-1" x1="23.87" y1="47.74" x2="23.87"/>
        </svg>
      </button>
    </div>
    <Transition name="nav">
      <div class="nav-expanded w-full max-w-(--nav-max-width) mx-auto bg-background border border-gray-light flex flex-col p-3" v-show="showNav" @click="showNav = false">
        <div class="menu-main text-md py-(--sm) flex flex-col gap-1">
          <nuxt-link class="link text-lg" to="/blog">Blog</nuxt-link>
          <nuxt-link class="link text-lg" to="/thermal-flight-configuration-dji">Configuración de vuelo térmico (DJI)</nuxt-link>
        </div>
        <div class="grid md:grid-cols-3 gap-3 w-full items-baseline mt-2">
          <div class="flex flex-col gap-1">
            <div class="bg-gray-light w-full px-2 mb-2 font-mono leading-wider">CONTACTO</div>
            <a class="text-md link" href="tel:+34641147164">+34 641 147 164</a>
            <a class="text-md link" href="mailto:hello@str-drones.com">hello@str-drones.com</a>
          </div>
          <div class="flex flex-col gap-1">
            <div class="bg-gray-light w-full px-2 mb-2 font-mono leading-wider">REDES</div>
            <a class="text-md link" target="_blank" href="https://www.instagram.com/str.drones/">Instagram ↗</a>
            <a class="text-md link" target="_blank" href="https://es.linkedin.com/company/str-drones">Linkedin ↗</a>
          </div>
          <div class="flex flex-col gap-1">
            <div class="bg-gray-light w-full px-2 mb-2 font-mono leading-wider">LEGAL</div>
            <nuxt-link to="/terms-and-conditions" class="text-md link">Términos y condiciones generales</nuxt-link>
            <nuxt-link to="/terms-specific" class="text-md link">Términos y condiciones particulares</nuxt-link>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const showNav = ref(false)

const toggleNav = () => {
  showNav.value = !showNav.value
}
</script>

<style lang="scss" scoped>
.app-nav-wrapper {
  position: fixed;
  top: 0;
}

.toggle {
  &.open svg {
    transform: rotate(45deg);
  }

  svg {
    transition: transform 0.25s cubic-bezier(.6,-0.39,.16,1.01);
  }
}

.nav-enter-active {
  transition: all 0.2s cubic-bezier(0,.71,.2,1.94);
}

.nav-leave-active {
  transition: all 0.2s cubic-bezier(.6,-0.39,.16,1.01);
}

.nav-enter-from {
  transform: translateY(-10px);
}

.nav-leave-to {
  transform: translateY(5px);
}

.link {
  position: relative;
  display: flex;
  width: fit-content;
  z-index: 2;
  transition: all 0.3s cubic-bezier(.6,-0.39,.16,1.01);
  line-height: 1.4;
}

.link::after {
  /* content: '';
  display: flex;
  position: absolute;
  bottom: .1em;
  width: 100%;
  height: 0;
  background: var(--color-primary);
  z-index: 1;
  mix-blend-mode: multiply; */
}

.link::before {
  content: '';
  display: flex;
  position: absolute;
  left: -.2em;
  top: 45%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  background: var(--color-primary);
  z-index: 1;
  mix-blend-mode: multiply;
  transition: all 0.3s cubic-bezier(.6,-0.39,.16,1.01);
}

.link:hover {
  padding-left: 1.2em;

  &::after {
    /* height: 5px; 
    bottom: .3em; */
  }

  &::before {
    height: 1em; 
    width: 1em; 
    left: 0;
  }    
}
</style>