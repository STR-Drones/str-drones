<template>
  <div class="app-nav-wrapper w-full mt-(--sm) flex flex-col z-100 px-(--sm) gap-[1px]">
    <div class="font-mono text-base w-full max-w-(--max-width) gap-2 mx-auto bg-background border border-gray-light flex p-2 items-center justify-end">
      <str-logo class="h-[1.25em] mr-auto" />
      <a href="#" class="bg-yellow flex leading-[1.1] h-[2em] px-3 py-2 items-center tracking-wide uppercase">STR Maps</a>
      <button @click="toggleNav" :class="['toggle flex items-center justify-center aspect-square h-[2em] p-2 bg-gray-light text-foreground', showNav ? 'open' : '' ]">
        <svg class="w-full stroke-current stroke-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.74 47.74">
          <line class="cls-1" y1="23.87" x2="47.74" y2="23.87"/><line class="cls-1" x1="23.87" y1="47.74" x2="23.87"/>
        </svg>
      </button>
    </div>
    <Transition name="nav">
      <div class="font-mono leading-wider nav-expanded w-[70%] max-w-(--max-width) mx-auto bg-background border border-gray-light flex flex-col p-3 items-center" v-show="showNav">
        <div class="grid grid-cols-2 gap-3 w-full">
          <div class="flex flex-col gap-1">
            <div class="bg-gray-light w-full px-2 mb-2">WEB</div>
            <a href="" class="link">Enlace 1 Enlace 2</a>
            <a href="" class="link">Enlace 1 Enlace 2</a>
          </div>
          <div class="flex flex-col gap-1">
            <div class="bg-gray-light w-full px-2 mb-2">LEGAL</div>
            <a href="" class="link">Enlace 1</a>
            <a href="" class="link">Enlace 2</a>
            <a href="" class="link">Enlace 3</a>
          </div>
        </div>
        <div class="flex flex-col w-full gap-2 mt-(--sm)">
          <div class="bg-gray-light w-full px-2">CONTACTO</div>
          <div class="flex gap-2 uppercase">
            <a href="">Instagram</a>
            <a href="">Linkedin</a>
            <a href="mailto:info@str-drones.com">info@str-drones.com</a>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'Vue'
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
  transition: all 0.3s cubic-bezier(.6,-0.39,.16,1.01);
}

.nav-enter-from {
  transform: translateY(-10px);
}

.nav-leave-to {
  transform: translateY(5px);
  opacity: 0;
}
</style>