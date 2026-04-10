import { useState } from 'react'

interface FormData {
  nombre: string
  email: string
  telefono: string
  canta: 'Si' | 'No' | null
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
    email: '',
    telefono: '',
    canta: null,
    canciones: '',
    formato: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError('')
  }

  const setCanta = (val: 'Si' | 'No') => {
    setFormData((prev) => ({
      ...prev,
      canta: val,
      // clear open mic fields when switching to No
      canciones: val === 'No' ? '' : prev.canciones,
      formato: val === 'No' ? '' : prev.formato,
    }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.canta === null) {
      setError('Por favor indica si quieres cantar en el Open Mic.')
      return
    }
    if (formData.canta === 'Si' && !formData.canciones.trim()) {
      setError('Por favor indica qué canciones quieres cantar.')
      return
    }
    if (formData.canta === 'Si' && !formData.formato.trim()) {
      setError('Por favor indica el formato (ej: Guitarra y Voz).')
      return
    }

    setLoading(true)
    setError('')

    if (!APPS_SCRIPT_URL) {
      // In dev without env var, just simulate success
      setTimeout(onSuccess, 800)
      return
    }

    try {
      const params = new URLSearchParams()
      params.append('nombre', formData.nombre)
      params.append('email', formData.email)
      params.append('telefono', formData.telefono)
      params.append('canta', formData.canta === 'Si' ? 'Sí' : 'No')
      params.append('canciones', formData.canciones)
      params.append('formato', formData.formato)

      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: params,
        mode: 'no-cors',
      })

      onSuccess()
    } catch {
      setError('Hubo un error al enviar. Por favor intenta de nuevo.')
      setLoading(false)
    }
  }

  return (
    <section className="py-20 px-6 topo-bg">
      <div className="max-w-xl mx-auto">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <StepDot number={1} label="Registro" active />
          <div className="w-10 h-px bg-brand-700/40" />
          <StepDot number={2} label="Preguarda" active={false} />
        </div>

        <div className="glass rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-1 text-center">Reserva tu lugar</h3>
          <p className="text-brand-400 text-sm text-center mb-8 font-medium">
            🎟️ Entrada sin cover — regístrate aquí
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <Field label="Nombre completo">
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

            {/* Email */}
            <Field label="Correo electrónico">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu@correo.com"
                className="form-input px-4 py-3 rounded-xl"
              />
            </Field>

            {/* Teléfono */}
            <Field label="Teléfono / WhatsApp">
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                placeholder="+57 300 000 0000"
                className="form-input px-4 py-3 rounded-xl"
              />
            </Field>

            {/* Divider */}
            <div className="flex items-center gap-3 py-2">
              <div className="flex-1 h-px bg-brand-800/40" />
              <span className="text-gray-500 text-xs tracking-widest uppercase">Open Mic</span>
              <div className="flex-1 h-px bg-brand-800/40" />
            </div>

            {/* ¿Quieres cantar? */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                ¿Quieres cantar en el Open Mic? <span className="text-brand-400">*</span>
              </label>
              <div className="flex gap-3">
                <ToggleButton
                  selected={formData.canta === 'Si'}
                  onClick={() => setCanta('Si')}
                >
                  🎤 Sí, quiero cantar
                </ToggleButton>
                <ToggleButton
                  selected={formData.canta === 'No'}
                  onClick={() => setCanta('No')}
                >
                  👤 No, solo asistir
                </ToggleButton>
              </div>
            </div>

            {/* Conditional open mic fields */}
            {formData.canta === 'Si' && (
              <div className="space-y-5 animate-fadeInUp">
                <Field
                  label="¿Qué canciones quieres cantar? (Máximo 3)"
                  hint="Al inscribirte quedas como candidato. Ven preparado — haremos lo posible para que todos participen, pero no garantizamos que puedas cantar todas tus canciones."
                >
                  <textarea
                    name="canciones"
                    value={formData.canciones}
                    onChange={handleChange}
                    rows={3}
                    placeholder={'1. Nombre de la canción — Artista\n2. Nombre de la canción — Artista'}
                    className="form-input px-4 py-3 rounded-xl resize-none"
                  />
                </Field>

                <Field label="Formato">
                  <input
                    type="text"
                    name="formato"
                    value={formData.formato}
                    onChange={handleChange}
                    placeholder="Ej: Guitarra y Voz, Pista y Voz, etc."
                    className="form-input px-4 py-3 rounded-xl"
                  />
                </Field>
              </div>
            )}

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
              {loading ? 'Enviando...' : 'Continuar →'}
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

function ToggleButton({
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
      className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
        selected
          ? 'bg-brand-600 border-brand-500 text-white'
          : 'bg-transparent border-brand-800/50 text-gray-400 hover:border-brand-600/60 hover:text-gray-200'
      }`}
    >
      {children}
    </button>
  )
}

function StepDot({
  number,
  label,
  active,
}: {
  number: number
  label: string
  active: boolean
}) {
  return (
    <div className={`flex items-center gap-2 ${active ? '' : 'opacity-35'}`}>
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
