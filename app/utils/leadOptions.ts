// Valores EXACTOS que acepta el script para los desplegables del formulario de demo.
// El texto visible puede ir traducido; el `value` no puede cambiar (si no, el script responde `invalid`).
export const COMPANY_TYPES = [
  'Solar - EPC', 'Solar - O&M', 'Solar - Asset Owner', 'Solar - Technical Advisor', 'Drone Service Provider', 'Other',
] as const
export const SOLAR_CAPACITIES = ['< 20MW', '20MW - 250MW', '250MW - 1GW', '> 1GW'] as const
export const LEAD_SOURCES = [
  'AI/ChatGPT', 'LinkedIn', 'Search Engine (Google)', 'Colleague/Recommendation', 'Event', 'Other',
] as const
