import { useState } from 'react'

const PREGUARDA_URL = 'https://sndo.ffm.to/gb5dk0x'

interface PreguardaStepProps {
  onConfirmed: () => void
}

export default function PreguardaStep({ onConfirmed }: PreguardaStepProps) {
  const [clicked, setClicked] = useState(false)

  const handlePreguardaClick = () => {
    window.open(PREGUARDA_URL, '_blank', 'noopener,noreferrer')
    setClicked(true)
  }

  return (
    <section className="py-20 px-6 topo-bg">
      <div className="max-w-xl mx-auto">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <StepDot number={1} label="Preguarda" active />
          <div className="w-10 h-px bg-brand-700/40" />
          <StepDot number={2} label="Inscripción" active={false} />
        </div>

        <div className="glass animate-glowPulse rounded-2xl p-8 md:p-12 text-center">
          {/* Icon */}
          <div className="text-5xl mb-6 animate-float">🎵</div>

          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Primero, preguarda la canción
          </h3>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-sm mx-auto">
            Para inscribirte al Open Mic, necesitamos que preguardes{' '}
            <span className="text-brand-300 font-medium italic">"Mi obra de arte"</span>{' '}
            de Andrea Prieto &amp; Sotomonte. Solo toma un segundo.
          </p>

          {!clicked ? (
            <button
              onClick={handlePreguardaClick}
              className="btn-primary w-full py-4 rounded-xl text-white font-bold text-lg tracking-widest uppercase"
            >
              Preguarda ahora →
            </button>
          ) : (
            <div className="animate-fadeInUp space-y-4">
              <p className="flex items-center justify-center gap-2 text-brand-400 text-sm">
                <span className="text-green-400">✓</span>
                Link abierto — dale preguarda y vuelve aquí
              </p>
              <button
                onClick={onConfirmed}
                className="btn-outline w-full py-4 rounded-xl font-bold text-lg tracking-wide"
              >
                ¡Ya la preguardé! → Ir al formulario ✓
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
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
