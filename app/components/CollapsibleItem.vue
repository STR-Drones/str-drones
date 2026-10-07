<template>
  <div class="collapsible-item max-w-[72em] text-foreground w-full ml-auto">
    <div class="bg-primary text-xl w-[2em] aspect-square"></div>  
    <button class="collapsible-item-header" 
      @click="handleToggle()"
      :aria-expanded="open"
      :aria-controls="`${props.i}-ctnt`"
      :id="`${props.i}-button`"
    >
      <div class="border-t border-b border-gray-light ml-(--md)">
        <div class="flex pt-2 md:pt-0 text-xl leading-[1.3] text-left md:leading-[2em] items-start md:items-center">
          <div><slot></slot></div>
          <div :class="['toggle ml-auto flex items-center justify-center aspect-square h-[1.5em] md.h-[1.1em] p-2 md:p-4 bg-gray-light text-foreground', { open }]">
            <svg class="w-full stroke-current stroke-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.74 47.74">
              <line class="cls-1" y1="23.87" x2="47.74" y2="23.87"/><line class="cls-1" x1="23.87" y1="47.74" x2="23.87"/>
            </svg>
          </div>
        </div>
        <Transition name="slide">
          <div class="collapsible-item-content text-lg text-left" v-show="open" :id="`${props.i}-ctnt`" :aria-labelledby="`${props.i}-button`">
            <div class="leading-[1.3] pt-2 md:pt-0 pr-(--text-3xl) pb-(--md)">
              <slot name="description"></slot>
            </div>
          </div>
        </Transition>
      </div>
    </button>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'

let open = ref(true)

const props = defineProps({
  title: String,
  description: String,
  i: Number
})

function handleToggle() {
  open.value = !open.value
}

</script>

<style lang="scss">
.collapsible-item {
  display: grid;
  color: var(--color-foreground);
  grid-template-columns: auto 1fr;
  gap: var(--sm);

  .collapsible-item-header {
    cursor: pointer;
    width: 100%;
    border: none;
    background: none;
    appearance: none;
    outline: none;
    margin: 0;
    gap: 1.25rem;
  }

  .toggle {
    &.open svg {
      transform: rotate(45deg);
    }

    svg {
      transition: transform 0.2s ease-in-out;
    }
  }
}
</style>