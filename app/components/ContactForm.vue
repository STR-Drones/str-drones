<template>
  <form>
    <!-- Todo: campos del formulario de contacto -->
    <!-- Elementos comunes -->
    <!-- Campo trampa contra bots: tiene que existir, pero invisible para las personas -->
    <div class="hp" aria-hidden="true">
      <label for="website">Website</label>
      <input id="website" v-model="honeypot" name="website" type="text" tabindex="-1" autocomplete="off" />
    </div>

    <!-- Casilla de privacidad (obligatoria) -->
    <label>
      <input v-model="privacyAccepted" type="checkbox" required />
      {{ t('form.privacy') }}
      <NuxtLink :to="localePath('/privacy-policy')" target="_blank">{{ t('form.privacyLink') }}</NuxtLink>
    </label>

    <button type="submit" :disabled="isSubmitting || !privacyAccepted">
      {{ isSubmitting ? t('form.sending') : t('form.submit') }}
    </button>

    <!-- Resultado: success, captcha, rate_limited, invalid o internal. Los textos ya están en form.result.* -->
    <p v-if="result" role="status">{{ t(`form.result.${result}`) }}</p>
  </form>
</template>

<script lang="ts" setup>
const { fields, honeypot, privacyAccepted, isSubmitting, result, submit } = useLeadForm('contact', { name: '', email: '', message: '' })
</script>

<style>

</style>