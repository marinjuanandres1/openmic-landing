/** Event info shown on the page. Price and per-person cap come live from the back office. */
export const EVENT = {
  date: 'Jueves 15 de octubre',
  time: '7:00 pm',
  address: 'Carrera 12a #78-40',
  city: 'Bogotá',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Carrera 12a #78-40, Bogotá'),
  fallbackPrice: 20000,
  fallbackMaxTickets: 10,
}

export const BACKOFFICE_URL = (import.meta.env.VITE_BACKOFFICE_URL ?? 'https://backoffice.siente.live').replace(/\/+$/, '')

export const formatCOP = (n: number) =>
  '$' + new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(n)
