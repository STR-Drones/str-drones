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
      <form class="text-base grid w-full grid-cols-1 gap-(--md) px-(--sm) text-left mt-(--md) md:grid-cols-2" @submit.prevent="submit">
        <label class="flex flex-col gap-1">
          <span class="text-sm uppercase font-mono tracking-wide text-foreground">{{ t('form.firstName') }}</span>
          <input v-model="fields.firstName" class="border border-current/30 bg-foreground/1 p-3" name="firstName" autocomplete="given-name" required />
        </label>
        <label class="flex flex-col gap-1">
          <span class="text-sm uppercase font-mono tracking-wide text-foreground">{{ t('form.lastName') }}</span>
          <input v-model="fields.lastName" class="border border-current/30 bg-foreground/1 p-3" name="lastName" autocomplete="family-name" required />
        </label>
        <label class="flex flex-col gap-1">
          <span class="text-sm uppercase font-mono tracking-wide text-foreground">{{ t('form.email') }}</span>
          <input v-model="fields.email" class="border border-current/30 bg-foreground/1 p-3" name="email" type="email" autocomplete="email" required />
        </label>
        <label class="flex flex-col gap-1">
          <span class="text-sm uppercase font-mono tracking-wide text-foreground">{{ t('form.country') }}</span>
          <input v-model="fields.country" class="border border-current/30 bg-foreground/1 p-3" name="country" autocomplete="country-name" required />
        </label>
        <label class="flex flex-col gap-1">
          <span class="text-sm uppercase font-mono tracking-wide text-foreground">{{ t('form.companyName') }}</span>
          <input v-model="fields.companyName" class="border border-current/30 bg-foreground/1 p-3" name="companyName" autocomplete="organization" required />
        </label>
        <label class="flex flex-col gap-1">
          <span class="text-sm uppercase font-mono tracking-wide text-foreground">{{ t('form.companyType') }}</span>
          <select v-model="fields.companyType" class="border border-current/30 bg-foreground/1 p-3" name="companyType" required>
            <option disabled value="">{{ t('form.selectCompanyType') }}</option>
            <!-- El value tiene que ser exactamente el de la lista -->
            <option v-for="v in COMPANY_TYPES" :key="v" :value="v">{{ v }}</option>
          </select>
        </label>
        <label class="flex flex-col gap-1">
          <span class="text-sm uppercase font-mono tracking-wide text-foreground">{{ t('form.solarCapacity') }}</span>
          <select v-model="fields.solarCapacity" class="border border-current/30 bg-foreground/1 p-3" name="solarCapacity" required>
            <option disabled value="">{{ t('form.selectSolarCapacity') }}</option>
            <option v-for="v in SOLAR_CAPACITIES" :key="v" :value="v">{{ v }}</option>
          </select>
        </label>
        <label class="flex flex-col gap-1">
          <span class="text-sm uppercase font-mono tracking-wide text-foreground">{{ t('form.leadSource') }}</span>
          <select v-model="fields.leadSource" class="border border-current/30 bg-foreground/1 p-3" name="leadSource" required>
            <option disabled value="">{{ t('form.selectLeadSource') }}</option>
            <option v-for="v in LEAD_SOURCES" :key="v" :value="v">{{ v }}</option>
          </select>
        </label>
        <label class="flex flex-col gap-1 md:col-span-2">
          <span class="text-sm uppercase font-mono tracking-wide text-foreground">{{ t('form.message') }}</span>
          <textarea v-model="fields.message" class="min-h-32 resize-y border border-current/30 bg-foreground/1 p-3" name="message" rows="4"></textarea>
        </label>
        <div class="hp" aria-hidden="true">
          <label for="website">Website</label>
          <input id="website" v-model="honeypot" name="website" type="text" tabindex="-1" autocomplete="off" />
        </div>
        <label class="flex items-start gap-2 md:col-span-2">
          <input v-model="privacyAccepted" type="checkbox" required />
          <span class="text-sm uppercase font-mono tracking-wide text-foreground/50">{{ t('form.privacy') }} <NuxtLink :to="localePath('/privacy-policy')" target="_blank">{{ t('form.privacyLink') }}</NuxtLink></span>
        </label>
        <button class="bg-foreground px-6 py-3 text-background disabled:cursor-not-allowed disabled:opacity-50 md:col-span-2" type="submit" :disabled="isSubmitting || !privacyAccepted">
          {{ isSubmitting ? t('form.sending') : t('form.submit') }}
        </button>
        <p v-if="result" class="md:col-span-2" role="status">{{ t(`form.result.${result}`) }}</p>
      </form>
    </div>
    <logo-marquee />
    <div class="z-1 bg-linear absolute top-0 w-full left-0 right-0 bg-linear-to-b from-primary to-transparent h-[50vh]"></div>
  </div>
</template>

<script lang="ts" setup>
import { COMPANY_TYPES, SOLAR_CAPACITIES, LEAD_SOURCES } from '~/utils/leadOptions'

const { t } = useI18n()
const localePath = useLocalePath()
const { fields, honeypot, privacyAccepted, isSubmitting, result, submit } = useLeadForm('demo', {
  firstName: '', lastName: '', email: '', country: '', companyName: '',
  companyType: '', solarCapacity: '', leadSource: '', message: '',
})
</script>

<style>

</style>