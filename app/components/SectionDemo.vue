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
    <div class="relative max-w-(--max-width) mx-auto text-center flex flex-col items-center z-10 m-auto pt-(--lg) pb-(--xl)">
      <div class="text-hero leading-[1.1] p-(--sm)"><slot></slot></div>
      <animated-p class="text-lg max-w-[40ch] leading-[1.2] text-balance p-(--sm)">
        <slot name="description"></slot>
      </animated-p>
      <form class="demo-form w-full max-w-(--nav-max-width) mx-auto px-(--sm) mt-(--md) text-left" @submit.prevent="submit">
        <div class="bg-background border border-foreground/15">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-(--md) p-(--sm) md:p-(--md)">
            <label class="flex flex-col gap-(--xs)">
              <span class="field-label">{{ t('form.firstName') }} <span class="text-foreground/40">*</span></span>
              <input v-model="fields.firstName" class="field-main" name="firstName" autocomplete="given-name" required />
            </label>
            <label class="flex flex-col gap-(--xs)">
              <span class="field-label">{{ t('form.email') }} <span class="text-foreground/40">*</span></span>
              <input v-model="fields.email" class="field-main" name="email" type="email" autocomplete="email" required />
            </label>
          </div>
          <div class="bg-gray-light/60 border-t border-foreground/10 p-(--sm) md:p-(--md)">
            <p class="flex items-center gap-(--xs) mb-(--sm) font-mono text-xs uppercase tracking-wider text-foreground/60">
              <span class="block size-[1em] bg-primary"></span>
              {{ t('form.optionalInfo') }}
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-(--sm)">
              <label class="flex flex-col gap-1">
                <span class="field-label-sm">{{ t('form.companyName') }}</span>
                <input v-model="fields.companyName" class="field-sm" name="companyName" autocomplete="organization" />
              </label>
              <label class="flex flex-col gap-1">
                <span class="field-label-sm">{{ t('form.country') }}</span>
                <input v-model="fields.country" class="field-sm" name="country" autocomplete="country-name" />
              </label>
              <label class="flex flex-col gap-1">
                <span class="field-label-sm">{{ t('form.phone') }}</span>
                <input v-model="fields.phone" class="field-sm" name="phone" type="tel" autocomplete="tel" />
              </label>
              <label class="flex flex-col gap-1">
                <span class="field-label-sm">{{ t('form.companyType') }}</span>
                <select v-model="fields.companyType" class="field-sm" name="companyType">
                  <option value="">{{ t('form.selectCompanyType') }}</option>
                  <option v-for="v in COMPANY_TYPES" :key="v" :value="v">{{ v }}</option>
                </select>
              </label>
              <label class="flex flex-col gap-1">
                <span class="field-label-sm">{{ t('form.solarCapacity') }}</span>
                <select v-model="fields.solarCapacity" class="field-sm" name="solarCapacity">
                  <option value="">{{ t('form.selectSolarCapacity') }}</option>
                  <option v-for="v in SOLAR_CAPACITIES" :key="v" :value="v">{{ v }}</option>
                </select>
              </label>
              <label class="flex flex-col gap-1">
                <span class="field-label-sm">{{ t('form.leadSource') }}</span>
                <select v-model="fields.leadSource" class="field-sm" name="leadSource">
                  <option value="">{{ t('form.selectLeadSource') }}</option>
                  <option v-for="v in LEAD_SOURCES" :key="v" :value="v">{{ v }}</option>
                </select>
              </label>
              <label class="flex flex-col gap-1 md:col-span-3">
                <span class="field-label-sm">{{ t('form.message') }}</span>
                <textarea v-model="fields.message" class="field-sm min-h-24 resize-y" name="message" rows="3"></textarea>
              </label>
            </div>
          </div>
          <div class="hp" aria-hidden="true">
            <label for="website">Website</label>
            <input id="website" v-model="honeypot" name="website" type="text" tabindex="-1" autocomplete="off" />
          </div>
          <div class="border-t border-foreground/10">
            <label class="flex items-center gap-(--xs) cursor-pointer p-(--sm) md:px-(--md)">
              <input v-model="privacyAccepted" class="size-4 accent-foreground" type="checkbox" required />
              <span class="font-mono text-xs uppercase tracking-wide text-foreground/60">
                {{ t('form.privacy') }}
                <NuxtLink class="underline underline-offset-2 hover:text-foreground" :to="localePath('/privacy-policy')" target="_blank">{{ t('form.privacyLink') }}</NuxtLink>
              </span>
            </label>
            <button class="submit-button group w-full flex items-center justify-between gap-(--md) cursor-pointer bg-primary text-foreground px-(--sm) md:px-(--md) py-(--sm) font-mono uppercase tracking-wider disabled:cursor-not-allowed disabled:bg-gray/50 disabled:text-gray-light" type="submit" :disabled="isSubmitting || !privacyAccepted">
              {{ isSubmitting ? t('form.sending') : t('form.submit') }}
              <span class="transition-transform group-enabled:group-hover:translate-x-1" aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <p v-if="result" :class="['mt-(--sm) px-(--sm) py-(--xs) w-fit font-mono text-sm uppercase tracking-wide', result === 'success' ? 'bg-primary' : 'bg-foreground text-background']" role="status">
          {{ t(`form.result.${result}`) }}
        </p>
      </form>
    </div>
    <logo-marquee />
    <div class="z-1 bg-linear absolute top-0 w-full left-0 right-0 bg-linear-to-b from-primary to-transparent h-[50vh]"></div>
  </div>
</template>

<script setup>
import { COMPANY_TYPES, SOLAR_CAPACITIES, LEAD_SOURCES } from '~/utils/leadOptions'

const { t } = useI18n()
const localePath = useLocalePath()
const { fields, honeypot, privacyAccepted, isSubmitting, result, submit } = useLeadForm('demo', {
  firstName: '', email: '', country: '', phone: '', companyName: '',
  companyType: '', solarCapacity: '', leadSource: '', message: '',
})
</script>

<style>
/* Etiquetas */
.demo-form .field-label {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.demo-form .field-label-sm {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: color-mix(in srgb, var(--color-foreground) 60%, transparent);
}

.demo-form .field-main {
  font-size: var(--text-lg);
  padding: var(--xs) 0;
  background: transparent;
  border-bottom: 2px solid color-mix(in srgb, var(--color-foreground) 25%, transparent);
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.demo-form .field-main:hover {
  border-color: color-mix(in srgb, var(--color-foreground) 50%, transparent);
}

.demo-form .field-main:focus {
  border-color: var(--color-foreground);
  box-shadow: 0 2px 0 0 var(--color-primary);
}

.demo-form .field-sm {
  font-size: var(--text-base);
  padding: 0.6em 0.75em;
  background: var(--color-background);
  border: 1px solid color-mix(in srgb, var(--color-foreground) 12%, transparent);
  outline: none;
  transition: border-color 0.2s ease;
}

.demo-form .field-sm:hover {
  border-color: color-mix(in srgb, var(--color-foreground) 30%, transparent);
}

.demo-form .field-sm:focus {
  border-color: var(--color-foreground);
}

.demo-form select.field-sm {
  appearance: none;
  padding-right: 2.25em;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%2304020F' stroke-width='1.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75em center;
  background-size: 0.7em;
}
</style>