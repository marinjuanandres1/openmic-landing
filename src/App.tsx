import { useRef, useState } from 'react'
import Hero from './components/Hero'
import RegistrationForm from './components/RegistrationForm'
import PreguardaStep from './components/PreguardaStep'

type Step = 'hero' | 'form' | 'presave'

export default function App() {
  const [step, setStep] = useState<Step>('hero')
  const formRef = useRef<HTMLDivElement>(null)
  const presaveRef = useRef<HTMLDivElement>(null)

  const scrollToForm = () => {
    setStep('form')
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const onFormSubmitted = () => {
    setStep('presave')
    setTimeout(() => {
      presaveRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* ── Hero ── */}
      <Hero onCTAClick={scrollToForm} />

      {/* ── Registration form (always below hero) ── */}
      <div ref={formRef}>
        <RegistrationForm onSuccess={onFormSubmitted} />
      </div>

      {/* ── Presave step (revealed after form submission) ── */}
      <div ref={presaveRef}>
        {step === 'presave' && <PreguardaStep />}
      </div>

      {/* ── Footer ── */}
      <footer className="py-20 px-6 flex flex-col items-center gap-5 border-t border-brand-900/40">
        <img
          src="/siente-logo.png"
          alt="SIENTE"
          className="w-28 h-28 object-contain"
          onError={(e) => {
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
