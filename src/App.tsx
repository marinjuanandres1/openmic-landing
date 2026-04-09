import { useRef, useState } from 'react'
import Hero from './components/Hero'
import PreguardaStep from './components/PreguardaStep'
import RegistrationForm from './components/RegistrationForm'

type Step = 'hero' | 'preguarda' | 'form'

export default function App() {
  const [step, setStep] = useState<Step>('hero')
  const preguardaRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const scrollToPreguarda = () => {
    setStep('preguarda')
    setTimeout(() => {
      preguardaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const onPreguardaConfirmed = () => {
    setStep('form')
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* ── Hero ── */}
      <Hero onCTAClick={scrollToPreguarda} />

      {/* ── Preguarda step ── */}
      <div ref={preguardaRef}>
        <PreguardaStep onConfirmed={onPreguardaConfirmed} />
      </div>

      {/* ── Registration form (revealed after preguarda) ── */}
      <div ref={formRef}>
        {step === 'form' && (
          <RegistrationForm onSuccess={() => {}} />
        )}
      </div>

      {/* ── Footer ── */}
      <footer className="py-20 px-6 flex flex-col items-center gap-5 border-t border-brand-900/40">
        <img
          src="/siente-logo.png"
          alt="SIENTE"
          className="w-28 h-28 object-contain"
          onError={(e) => {
            // fallback if logo not yet placed in /public
            ;(e.target as HTMLImageElement).style.display = 'none'
          }}
        />
        <div className="flex items-center gap-3">
          <div className="w-12 h-px bg-brand-700/40" />
          <p className="text-brand-500/60 text-xs tracking-[0.4em] uppercase">Siente Live</p>
          <div className="w-12 h-px bg-brand-700/40" />
        </div>
      </footer>
    </div>
  )
}
