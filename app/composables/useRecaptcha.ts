// Carga reCAPTCHA (clave por puntuación, invisible) solo en las páginas que usan este composable.
// Devuelve una función que pide un token nuevo para la acción 'submit_lead' (la que verifica Apps Script).
// El token caduca a los 2 minutos y sirve una sola vez: pídelo justo al enviar.
export function useRecaptcha() {
  const siteKey = useRuntimeConfig().public.recaptchaSiteKey
  if (siteKey) {
    useHead({
      script: [{ src: `https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`, async: true, defer: true }],
    })
  }

  return () => new Promise<string>((resolve, reject) => {
    const g = (window as any).grecaptcha?.enterprise
    if (!siteKey || !g) return reject(new Error('reCAPTCHA not loaded'))
    g.ready(() => g.execute(siteKey, { action: 'submit_lead' }).then(resolve, reject))
  })
}
