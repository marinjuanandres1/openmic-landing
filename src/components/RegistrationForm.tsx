import { useEffect, useState } from 'react'
import { BACKOFFICE_URL, formatCOP } from '../event'

/** Which hero button brought the person here (preselects the sing/watch toggle). */
export type Intent = 'sing' | 'watch' | null

const FORMATS = ['Guitarra y voz', 'Pista y voz'] as const

interface Props {
  intent: Intent
  price: number
  maxTickets: number
  closed: boolean
}

export default function RegistrationForm({ intent, price, maxTickets, closed }: Props) {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [canta, setCanta] = useState<boolean | null>(null)
  const [canciones, setCanciones] = useState('')
  const [formato, setFormato] = useState('')
  const [cantidad, setCantidad] = useState(1)
  const [acompanantes, setAcompanantes] = useState<string[]>([])
  const [website, setWebsite] = useState('') // honeypot
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [soldOut, setSoldOut] = useState(false)

  useEffect(() => {
    if (intent) setCanta(intent === 'sing')
  }, [intent])

  const max = Math.max(1, maxTickets)
  const changeQty = (delta: number) => {
    const next = Math.min(max, Math.max(1, cantidad + delta))
    setCantidad(next)
    setAcompanantes((prev) => prev.slice(0, next - 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (canta === null) return setError('Cuéntanos si vienes a cantar o solo a escuchar.')
    if (canta && !canciones.trim()) return setError('Cuéntanos qué canciones quieres cantar.')
    if (canta && !formato.trim()) return setError('Elige el formato: guitarra y voz o pista y voz.')

    setLoading(true)
    try {
      const res = await fetch(`${BACKOFFICE_URL}/api/public/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          email,
          whatsapp,
          canta,
          canciones: canta ? canciones : '',
          formato: canta ? formato : '',
          cantidad,
          acompanantes,
          website,
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string; closed?: boolean }
      if (data.closed) setSoldOut(true)
      if (!res.ok || !data.url) throw new Error(data.error || 'No pudimos abrir el pago. Intenta de nuevo.')
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No pudimos abrir el pago. Intenta de nuevo.')
      setLoading(false)
    }
  }

  if (closed || soldOut) {
    return (
      <section className="bg-hueso px-4 py-20 text-negro sm:px-6">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-linea md:p-12">
          <p className="eyebrow text-morado">Open Mic · Tres60Lab × Siente</p>
          <h2 className="font-wide mt-3 text-3xl uppercase">Aforo completo</h2>
          <p className="mt-3 text-gris">
            Ya no quedan boletas para esta fecha. Síguenos para enterarte del próximo Open Mic.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-hueso px-4 py-20 text-negro sm:px-6">
      <div className="mx-auto max-w-xl">
        <div className="mb-8 text-center">
          <p className="eyebrow text-morado">Inscripciones</p>
          <h2 className="font-wide mt-3 text-3xl uppercase sm:text-4xl">Asegura tu boleta</h2>
          <p className="mt-3 text-gris">{formatCOP(price)} por persona.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-linea sm:p-10"
        >
          <Field label="Nombre completo">
            <input
              className="input"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              minLength={2}
              maxLength={80}
              autoComplete="name"
              placeholder="Tu nombre y apellido"
            />
          </Field>
          <Field label="WhatsApp">
            <input
              className="input"
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
              autoComplete="tel"
              placeholder="300 000 0000"
            />
          </Field>
          <Field label="Correo">
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="tu@correo.com"
            />
          </Field>

          {/* Honeypot: hidden from people, bots fill it */}
          <div className="hidden" aria-hidden>
            <label>
              Website
              <input
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </label>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold">¿Vienes a cantar?</p>
            <div className="grid grid-cols-2 gap-3">
              <Toggle selected={canta === true} onClick={() => setCanta(true)}>
                Sí, quiero cantar
              </Toggle>
              <Toggle selected={canta === false} onClick={() => setCanta(false)}>
                Solo voy a ver
              </Toggle>
            </div>
          </div>

          {canta && (
            <div className="animate-fadeInUp space-y-5 rounded-2xl bg-lila/25 p-5">
              <Field
                label="¿Qué canciones quieres cantar? (máximo 3)"
                hint="Al inscribirte quedas como candidato. Ven preparado: haremos lo posible para que todos participen, pero no garantizamos que puedas cantar todas tus canciones."
              >
                <textarea
                  className="input resize-none"
                  rows={3}
                  value={canciones}
                  onChange={(e) => setCanciones(e.target.value)}
                  maxLength={500}
                  placeholder={'1. Canción — Artista\n2. Canción — Artista'}
                />
              </Field>
              <div>
                <p className="mb-1.5 text-sm font-semibold">Formato</p>
                <p className="mb-3 text-xs leading-relaxed text-gris">Vamos a tener 2 micrófonos y sonido.</p>
                <div className="grid grid-cols-2 gap-3">
                  {FORMATS.map((f) => (
                    <Toggle key={f} selected={formato === f} onClick={() => setFormato(f)}>
                      {f}
                    </Toggle>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="border-t border-linea pt-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">Boletas</p>
                <p className="text-sm text-gris">{formatCOP(price)} c/u</p>
              </div>
              <div className="flex items-center gap-1 rounded-full ring-1 ring-linea">
                <StepButton label="Quitar una boleta" disabled={cantidad <= 1} onClick={() => changeQty(-1)}>
                  −
                </StepButton>
                <span className="w-8 text-center text-lg font-bold tabular-nums" aria-live="polite">
                  {cantidad}
                </span>
                <StepButton label="Agregar una boleta" disabled={cantidad >= max} onClick={() => changeQty(1)}>
                  +
                </StepButton>
              </div>
            </div>

            {cantidad > 1 && (
              <div className="mt-5 space-y-3">
                <p className="text-sm text-gris">
                  Nombres de tus acompañantes (opcional, para la lista de la puerta)
                </p>
                {Array.from({ length: cantidad - 1 }, (_, i) => (
                  <input
                    key={i}
                    className="input"
                    maxLength={80}
                    value={acompanantes[i] ?? ''}
                    onChange={(e) =>
                      setAcompanantes((prev) => {
                        const next = [...prev]
                        next[i] = e.target.value
                        return next
                      })
                    }
                    placeholder={`Acompañante ${i + 1}`}
                  />
                ))}
              </div>
            )}

            <div className="mt-6 flex items-baseline justify-between">
              <span className="eyebrow text-gris">Total</span>
              <span className="font-wide text-2xl tabular-nums">{formatCOP(price * cantidad)}</span>
            </div>
          </div>

          {error && (
            <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm text-red-700">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className="btn btn-primary w-full py-4 text-lg">
            {loading ? 'Abriendo el pago…' : 'Ir a pagar →'}
          </button>
          <p className="text-center text-xs text-gris">
            Pagas de forma segura en Mercado Pago. Apenas se confirme, quedas en la lista.
          </p>
        </form>
      </div>
    </section>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {hint && <span className="mb-2 block text-xs leading-relaxed text-gris">{hint}</span>}
      {children}
    </label>
  )
}

function Toggle({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-2xl border-2 px-3 py-3 text-sm font-semibold transition ${
        selected ? 'border-morado bg-morado text-white' : 'border-linea text-negro hover:border-morado/50'
      }`}
    >
      {children}
    </button>
  )
}

function StepButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string
  disabled: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="h-10 w-10 rounded-full text-xl font-bold text-morado transition hover:bg-lila/30 disabled:opacity-30"
    >
      {children}
    </button>
  )
}
