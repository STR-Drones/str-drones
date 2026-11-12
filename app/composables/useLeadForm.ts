// Lógica de envío de los formularios de demo y de contacto a Apps Script. No tiene HTML ni estilos:
// el diseño de cada formulario es de la web. Ver el contrato del endpoint en la guía del formulario.
//
//   const { fields, honeypot, privacyAccepted, isSubmitting, result, submit } = useLeadForm('contact')
//   // fields: objeto reactivo con los campos del formulario (name, email, message… o los de la demo)
//   // honeypot: v-model del campo oculto `website` (debe quedar vacío)
//   // submit(): devuelve true si se envió; `result` queda en 'success' o en el código de error
//   // Texto del resultado: t(`form.result.${result}`)
export type LeadFormType = 'demo' | 'contact'
export type LeadResult = 'success' | 'captcha' | 'rate_limited' | 'invalid' | 'internal'

export function useLeadForm(formType: LeadFormType, initialFields: Record<string, string> = {}) {
  const config = useRuntimeConfig()
  const { locale } = useI18n()
  const getRecaptchaToken = useRecaptcha()

  const fields = reactive<Record<string, string>>({ ...initialFields })
  const honeypot = ref('')
  const privacyAccepted = ref(false)
  const isSubmitting = ref(false)
  const result = ref<LeadResult | null>(null)

  function reset() {
    Object.keys(fields).forEach(k => { fields[k] = initialFields[k] ?? '' })
    honeypot.value = ''
    privacyAccepted.value = false
  }

  async function submit(): Promise<boolean> {
    if (isSubmitting.value) return false
    isSubmitting.value = true
    result.value = null
    try {
      let recaptchaToken = ''
      try {
        recaptchaToken = await getRecaptchaToken()
      } catch {
        result.value = 'captcha' // el script de Google no ha cargado (bloqueador, sin red…)
        return false
      }
      // text/plain evita el preflight CORS; Apps Script hace JSON.parse igualmente
      const res = await $fetch<{ status: string; code?: LeadResult }>(config.public.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          ...fields,
          formType,
          language: locale.value === 'es' ? 'es' : 'en',
          privacyAccepted: privacyAccepted.value,
          website: honeypot.value,
          recaptchaToken,
        }),
      })
      // Apps Script responde 200 también en los errores: hay que mirar el cuerpo
      result.value = res?.status === 'success' ? 'success' : (res?.code ?? 'internal')
      if (result.value === 'success') reset()
      return result.value === 'success'
    } catch {
      result.value = 'internal'
      return false
    } finally {
      isSubmitting.value = false
    }
  }

  return { fields, honeypot, privacyAccepted, isSubmitting, result, submit, reset }
}
