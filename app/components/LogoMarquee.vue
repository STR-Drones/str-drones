<template>
  <div class="logo-marquee pb-(--lg)" role="group" aria-label="Client and partner logos">
    <div class="logo-marquee__track">
      <ul class="logo-marquee__group">
        <li
          v-for="(logo, index) in marqueeLogos"
          :key="`${logo.src}-${index}`"
          class="logo-marquee__item"
          :class="{ 'logo-marquee__item--duplicate': index >= logos.length }"
          :aria-hidden="index >= logos.length ? 'true' : undefined"
        >
          <img
            :src="logo.src"
            :alt="index >= logos.length ? '' : logo.alt"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const logos = [
  { src: '/images/logos/alight-og-image.png', alt: 'Alight' },
  { src: '/images/logos/cyclone_logo_2025_new.webp', alt: 'Cyclone' },
  { src: '/images/logos/EVSOLAR-removebg-preview.png', alt: 'EV Solar' },
  { src: '/images/logos/Galp-Logo.png', alt: 'Galp' },
  { src: '/images/logos/grupo-cobra-logo-1024x321.png', alt: 'Grupo Cobra' },
  { src: '/images/logos/grupoteclogo-500.png', alt: 'Grupo Tec' },
  { src: '/images/logos/icon.png', alt: 'Partner' },
  { src: '/images/logos/lanzadera.png', alt: 'Lanzadera' },
  { src: '/images/logos/quintoarmonico_logo-removebg-preview.png', alt: 'Quinto Armónico' },
  { src: '/images/logos/Logos TUV Rheinland.png', alt: 'TÜV Rheinland' },
  { src: '/images/logos/t_tuv-rheinland-precisely-right5320.png', alt: 'TÜV Rheinland Precisely Right' },
  { src: '/images/logos/upv_logo.png', alt: 'Universitat Politècnica de València' },
  { src: '/images/logos/Veolia-Logo-500x281.png', alt: 'Veolia' },
]

const marqueeLogos = [...logos, ...logos]
</script>

<style scoped>
.logo-marquee {
  overflow: hidden;
  width: 100%;
}

.logo-marquee__track {
  --logo-gap: clamp(1rem, 6vw, 5rem);

  display: flex;
  width: max-content;
  animation: logo-marquee-scroll 36s linear infinite;
}

.logo-marquee__group {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: var(--logo-gap);
  margin: 0;
  padding: 0 var(--logo-gap) 0 0;
  list-style: none;
}

.logo-marquee__item {
  display: flex;
  flex: 0 0 clamp(6rem, 12vw, 9rem);
  height: clamp(3rem, 6vw, 5rem);
  align-items: center;
  justify-content: center;
}

.logo-marquee__item img {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

@keyframes logo-marquee-scroll {
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .logo-marquee {
    overflow: visible;
  }

  .logo-marquee__track {
    width: 100%;
    animation: none;
  }

  .logo-marquee__group {
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    padding-right: 0;
  }

  .logo-marquee__item--duplicate {
    display: none;
  }
}
</style>
