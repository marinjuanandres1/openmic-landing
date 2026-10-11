import Logos from './Logos'
import { EVENT, formatCOP } from '../event'

interface HeroProps {
  price: number
  closed: boolean
  onBuy: () => void
  onSing: () => void
}

const MARQUEE = ['Open Mic', 'Tres60Lab × Siente', EVENT.date, EVENT.time, EVENT.address]

export default function Hero({ price, closed, onBuy, onSing }: HeroProps) {
  return (
    <header className="relative overflow-hidden">
      {/* Top bar, like the flyer */}
      <div className="bg-lila text-negro overflow-hidden whitespace-nowrap py-2" aria-hidden>
        <div className="flex w-max animate-marquee">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0">
              {[...MARQUEE, ...MARQUEE].map((t, i) => (
                <span key={i} className="font-wide px-5 text-sm uppercase sm:text-base">
                  {t} <span className="pl-5 text-morado">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Brand shapes */}
      <img
        src="/ea/ea5-morado.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-32 top-24 w-[520px] opacity-40 md:-right-20 md:w-[640px]"
      />
      <img
        src="/ea/ea4-naranja.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-10 w-72 opacity-80 md:w-96"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-10 sm:px-6 md:grid-cols-[1.15fr_1fr] md:pb-28 md:pt-16">
        <div className="animate-fadeInUp">
          <Logos className="mb-10" />

          <p className="eyebrow mb-4 text-lila">Tres60Lab × Siente presentan</p>
          <h1 className="font-wide text-[clamp(3.5rem,12vw,7.5rem)] uppercase leading-[0.9] text-hueso">
            Open
            <br />
            Mic
          </h1>

          <div className="mt-8 flex flex-col items-start gap-2 text-lg sm:text-xl">
            <span className="tag uppercase">
              {EVENT.date} · {EVENT.time}
            </span>
            <a href={EVENT.mapsUrl} target="_blank" rel="noopener noreferrer" className="tag hover:bg-hueso">
              {EVENT.address}, {EVENT.city} ↗
            </a>
            <span className="tag uppercase">Cover {formatCOP(price)}</span>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            {closed ? (
              <span className="btn btn-ghost px-8 py-4 text-lg">Aforo completo</span>
            ) : (
              <>
                <button onClick={onBuy} className="btn btn-lila px-8 py-4 text-lg">
                  Comprar boleta →
                </button>
                <button onClick={onSing} className="btn btn-ghost px-8 py-4 text-lg">
                  Quiero cantar
                </button>
              </>
            )}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm md:max-w-md">
          <img
            src="/ea/ea1-lila.png"
            alt=""
            aria-hidden
            className="pointer-events-none absolute -left-10 -top-8 w-56 -rotate-6"
          />
          <img
            src="/flyer.jpg"
            alt={`Flyer Open Mic Tres60Lab × Siente, ${EVENT.date}, ${EVENT.address}, 7pm, cover ${formatCOP(price)}`}
            width={1080}
            height={1350}
            className="relative w-full rotate-2 rounded-sm shadow-[0_30px_80px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
          />
        </div>
      </div>
    </header>
  )
}
