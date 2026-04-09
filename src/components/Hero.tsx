interface HeroProps {
  onCTAClick: () => void
}

export default function Hero({ onCTAClick }: HeroProps) {
  return (
    <section className="topo-bg relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      {/* Radial purple glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(124,58,237,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-600 to-transparent opacity-60" />

      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center gap-0">
        {/* Eyebrow */}
        <p className="text-brand-400 text-xs tracking-[0.35em] uppercase mb-8 font-medium">
          Siente Live presenta
        </p>

        {/* Main title */}
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-[0.2em] uppercase mb-8">
          Open Mic
        </h1>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8 w-full max-w-xs">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-brand-600 opacity-50" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-brand-600 opacity-50" />
        </div>

        {/* Hosts */}
        <p className="text-gray-400 text-base mb-10 tracking-wide">
          Invitan:{' '}
          <span className="text-white font-semibold">Sotomonte y Andrea Prieto</span>
        </p>

        {/* Description card */}
        <div className="glass rounded-2xl px-8 py-6 mb-12 max-w-lg text-left">
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            Vamos a celebrar el lanzamiento de "Mi obra de arte", la nueva canción de Andrea Prieto con Sotomonte, con un Open Mic en La Quinta Copa, apoyado por Siente Live.
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={onCTAClick}
          className="btn-primary px-12 py-4 rounded-full text-white font-bold text-lg tracking-wide"
        >
          Quiero participar ↓
        </button>

        {/* Scroll hint */}
        <div className="mt-12 flex flex-col items-center gap-2 animate-float opacity-40">
          <div className="w-px h-8 bg-brand-500" />
        </div>
      </div>
    </section>
  )
}
