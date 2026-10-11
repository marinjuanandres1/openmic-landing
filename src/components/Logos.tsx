/** TRES60LAB × SIENTE lockup. The Tres60Lab logo is an inline-colorable SVG (currentColor). */
export default function Logos({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 sm:gap-6 ${className}`}>
      <img src="/tres60lab.svg" alt="TRES60LAB" className="h-14 w-auto sm:h-16" />
      <span className="text-lila text-xl font-light" aria-hidden>
        ×
      </span>
      <img src="/siente-crema.png" alt="SIENTE" className="h-7 w-auto sm:h-8" />
    </div>
  )
}
