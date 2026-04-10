import { useState } from 'react'

const PREGUARDA_URL = 'https://sndo.ffm.to/gb5dk0x'

export default function PreguardaStep() {
  const [clicked, setClicked] = useState(false)
  const [done, setDone] = useState(false)

  if (done) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-xl mx-auto">
          <div className="glass rounded-2xl p-8 md:p-12 text-center animate-fadeInUp">
            <div className="text-6xl mb-6">🎤</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">
              ¡Registro completo!
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Te esperamos en{' '}
              <span className="text-white font-semibold">La Quinta Copa</span>
            </p>
            <p className="text-brand-400/70 text-sm mt-2">
              Calle 13 #78-47, Bogotá
            </p>
            <p className="text-brand-400/50 text-sm mt-1 tracking-wide">
              Este jueves 16 de abril desde las 7pm ✦
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-6 topo-bg">
      <div className="max-w-xl mx-auto">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="flex items-center gap-2 opacity-40">
            <span className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-sm font-bold">
              ✓
            </span>
            <span className="text-brand-300 text-sm">Registro</span>
          </div>
          <div className="w-10 h-px bg-brand-700/40" />
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-sm font-bold text-white">
              2
            </span>
            <span className="text-brand-300 text-sm">Preguarda</span>
          </div>
        </div>

        <div className="glass animate-glowPulse rounded-2xl p-8 md:p-12 text-center">
          {/* Icon */}
          <div className="text-5xl mb-6 animate-float">🎵</div>

          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Último paso: preguarda la canción
          </h3>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-sm mx-auto">
            Tu registro está casi listo. Para completarlo, preguarda{' '}
            <span className="text-brand-300 font-medium italic">"Mi obra de arte"</span>{' '}
            de Andrea Prieto &amp; Sotomonte. ¡Es el paso final!
          </p>

          {!clicked ? (
            <a
              href={PREGUARDA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setClicked(true)}
              className="btn-primary block w-full py-4 rounded-xl text-white font-bold text-lg tracking-widest uppercase text-center"
            >
              Preguarda ahora →
            </a>
          ) : (
            <div className="animate-fadeInUp space-y-4">
              <p className="flex items-center justify-center gap-2 text-brand-400 text-sm">
                <span className="text-green-400">✓</span>
                Link abierto — dale preguarda y vuelve aquí
              </p>
              <button
                onClick={() => setDone(true)}
                className="btn-outline w-full py-4 rounded-xl font-bold text-lg tracking-wide"
              >
                ¡Listo! Ya la preguardé ✓ → Completar registro
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
