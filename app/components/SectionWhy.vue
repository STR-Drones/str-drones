<template>
  <div class="bg-foreground text-background p-(--md)">
    <marker-section name="why" number="01" color="foreground" />
    <div class="max-w-(--max-width) mx-auto">
      <div class="flex mt-(--md) gap-(--md)">
        <div class="text-3xl leading-[0.9]">5%</div>
        <animated-p class="text-lg w-[50ch] leading-tight ml-auto text-balance">
          En España, cada año, un 5% de las placas solares instaladas fallan, lo que genera pérdidas de rentabilidad y riesgos de incendio que ponen en peligro toda la instalación. STR previene, identifica y diagnostica estos fallos.
        </animated-p>
      </div>
      <cells-svg class="mt-(--lg)" />
      <div class="error-card-wrapper">
        <div class="error-card transform -translate-y-20 card mx-auto bg-gray-dark border border-gray text-base text-gray-light uppercase font-mono p-2 max-w-[50ch] leading-[1.1]">
          <div>
            <div class="flex gap-[0.5em] border-b border-dashed items-center pb-2">
              <div class="bg-primary h-[2em] aspect-square"></div>
              <div>TEMPERATURA SUPERIOR A LA PERMITIDA (INVENT)</div>
            </div>
            <div class="pl-[2.5em] py-2">
              <div>DATOS DE LA PLACA</div>
              <div>COORDENADAS</div> 
              <div>34.30N 35.20O</div>
            </div>
            <div class="bg-gray px-2 py-2 mt-2">DIAGNÓSTICO: LO QUE SEA</div>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss">
.error-card-wrapper {
  transition: transform 0.1s ease-in-out;

  &:hover { 
    transform: scale(1.08)
  }
}
</style>