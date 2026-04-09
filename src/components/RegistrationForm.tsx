import { useState } from 'react'

interface FormData {
  nombre: string
  whatsapp: string
  canciones: string
  formato: string
}

interface RegistrationFormProps {
  onSuccess: () => void
}

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL as string | undefined

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    whatsapp: '',
    canciones: '',
    formato: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!APPS_SCRIPT_URL) {
      setError('La URL de envío no está configurada. Contacta al organizador.')
      setLoading(false)
      return
    }

    try {
      // Send as URLSearchParams (works with no-cors mode)
      const params = new URLSearchParams()
      params.append('nombre', formData.nombre)
      params.append('whatsapp', formData.whatsapp)
      params.append('canciones', formData.canciones)
      params.append('formato', formData.formato)

      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: params,
        mode: 'no-cors', // required for Apps Script — response will be opaque
      })

      // With no-cors we can't read the response; assume success if no error thrown
      setSuccess(true)
      onSuccess()
    } catch {
      setError('Hubo un error al enviar. Por favor intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-xl mx-auto">
          <div className="glass rounded-2xl p-8 md:p-12 text-center animate-fadeInUp">
            <div className="text-6xl mb-6">🎤</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">
              ¡Estás inscrito!
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Recibimos tu solicitud. ¡Ven preparado y nos vemos ahí!
            </p>
            <p className="mt-8 text-brand-400/70 text-sm">
              Nos vemos en La Quinta Copa — Calle 13 #78-47, Bogotá
            </p>
            <p className="text-brand-400/50 text-sm tracking-wide">
              Este jueves 16 de abril desde las 7pm ✦
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-xl mx-auto">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <StepDot number="✓" label="Preguarda" dimmed />
          <div className="w-10 h-px bg-brand-700/40" />
          <StepDot number={2} label="Inscripción" active />
        </div>

        <div className="glass rounded-2xl p-8 md:p-12 animate-fadeInUp">
          <h3 className="text-2xl font-bold mb-1 text-center">Formulario de inscripción</h3>
          <p className="text-gray-500 text-sm text-center mb-8">
            Todos los campos son requeridos *
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <Field label="Nombre Completo">
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Tu nombre completo"
                className="form-input px-4 py-3 rounded-xl"
              />
            </Field>

            {/* WhatsApp */}
            <Field label="WhatsApp">
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required
                placeholder="+57 300 000 0000"
                className="form-input px-4 py-3 rounded-xl"
              />
            </Field>

            {/* Canciones */}
            <Field
              label="¿Qué canciones quieres cantar? (Máximo 3)"
              hint="Al enviar quedas como candidato para el Open Mic. Ven preparado, haremos lo posible para que todos participen, pero no garantizamos que puedas cantar todas tus canciones."
            >
              <textarea
                name="canciones"
                value={formData.canciones}
                onChange={handleChange}
                required
                rows={3}
                placeholder={'1. Nombre de la canción — Artista\n2. Nombre de la canción — Artista'}
                className="form-input px-4 py-3 rounded-xl resize-none"
              />
            </Field>

            {/* Formato */}
            <Field label="Formato">
              <input
                type="text"
                name="formato"
                value={formData.formato}
                onChange={handleChange}
                required
                placeholder="Ej: Guitarra y Voz, Pista y Voz, etc."
                className="form-input px-4 py-3 rounded-xl"
              />
            </Field>

            {error && (
              <p className="text-red-400 text-sm text-center bg-red-900/20 border border-red-800/30 rounded-lg py-3 px-4">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 rounded-xl text-white font-bold text-lg tracking-wide"
            >
              {loading ? 'Enviando...' : 'Enviar inscripción →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label} <span className="text-brand-400">*</span>
      </label>
      {hint && <p className="text-xs text-gray-500 mb-2 leading-relaxed">{hint}</p>}
      {children}
    </div>
  )
}

function StepDot({
  number,
  label,
  active,
  dimmed,
}: {
  number: number | string
  label: string
  active?: boolean
  dimmed?: boolean
}) {
  return (
    <div className={`flex items-center gap-2 ${dimmed ? 'opacity-35' : ''}`}>
      <span
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
          active
            ? 'bg-brand-600 text-white'
            : 'border border-brand-600 text-brand-400'
        }`}
      >
        {number}
      </span>
      <span className="text-brand-300 text-sm">{label}</span>
    </div>
  )
}
