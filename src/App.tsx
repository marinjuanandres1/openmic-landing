import { useEffect, useRef, useState } from 'react'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import RegistrationForm, { type Intent } from './components/RegistrationForm'
import Logos from './components/Logos'
import { BACKOFFICE_URL, EVENT } from './event'

type Status = { closed: boolean; price: number; maxTickets: number; privacyUrl: string }

export default function App() {
  const [status, setStatus] = useState<Status>({
    closed: false,
    price: EVENT.fallbackPrice,
    maxTickets: EVENT.fallbackMaxTickets,
    privacyUrl: '',
  })
  const [intent, setIntent] = useState<Intent>(null)
  const formRef = useRef<HTMLDivElement>(null)

  // Live price, cap and sold-out state from the back office (keeps the defaults if it can't be reached)
  useEffect(() => {
    fetch(`${BACKOFFICE_URL}/api/public/status?event=${EVENT.slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((s) => {
        if (!s) return
        setStatus((prev) => ({
          closed: Boolean(s.closed),
          price: Number(s.price) > 0 ? Number(s.price) : prev.price,
          maxTickets: Number(s.maxTickets) > 0 ? Number(s.maxTickets) : prev.maxTickets,
          privacyUrl: typeof s.privacyUrl === 'string' && s.privacyUrl.startsWith('https://') ? s.privacyUrl : '',
        }))
      })
      .catch(() => {})
  }, [])

  const goToForm = (next: Intent) => {
    setIntent(next)
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-tinta font-sans text-hueso">
      <Hero
        price={status.price}
        closed={status.closed}
        onBuy={() => goToForm('watch')}
        onSing={() => goToForm('sing')}
      />
      <HowItWorks price={status.price} />

      <div ref={formRef} className="scroll-mt-4">
        <RegistrationForm
          intent={intent}
          price={status.price}
          maxTickets={status.maxTickets}
          privacyUrl={status.privacyUrl}
          closed={status.closed}
        />
      </div>

      <footer className="flex flex-col items-center gap-6 border-t border-white/10 px-4 py-16 text-center">
        <Logos />
        <p className="eyebrow text-hueso/50">Siente Live · {EVENT.city}</p>
      </footer>
    </div>
  )
}
