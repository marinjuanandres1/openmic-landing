/** Event info shown on the page. Price and per-person cap come live from the back office. */
export const EVENT = {
  /** Event slug in Siente Ticket (sign-ups and payments go to this event). */
  slug: 'openmic-tres60lab-2026-10-15',
  date: 'Jueves 15 de octubre',
  time: '7:00 pm',
  address: 'Carrera 12a #78-40',
  city: 'Bogotá',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Carrera 12a #78-40, Bogotá'),
  fallbackPrice: 20000,
  fallbackMaxTickets: 10,
  /** true = the web form stays closed (door sales only), whatever the back office says. */
  formClosed: true,
}

export const BACKOFFICE_URL = (import.meta.env.VITE_BACKOFFICE_URL ?? 'https://backoffice.siente.live').replace(/\/+$/, '')

export const formatCOP = (n: number) =>
  '$' + new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(n)
