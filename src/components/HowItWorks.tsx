import { formatCOP } from '../event'

export default function HowItWorks({ price }: { price: number }) {
  const steps = [
    { n: '01', title: 'Inscríbete', text: 'Dinos si vienes a cantar o solo a escuchar. Si cantas, cuéntanos tus canciones y el formato.' },
    { n: '02', title: 'Paga tu boleta', text: `${formatCOP(price)} por persona, en Mercado Pago.` },
    { n: '03', title: 'Quedas en la lista', text: 'Apenas se confirma el pago entras a la lista. En la puerta solo das tu nombre.' },
  ]
  return (
    <section className="border-y border-white/10 bg-negro">
      <div className="mx-auto grid max-w-6xl gap-px px-4 sm:px-6 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="py-10 md:px-6 md:first:pl-0">
            <p className="font-wide text-4xl text-lila">{s.n}</p>
            <h2 className="font-wide mt-3 text-xl uppercase text-hueso">{s.title}</h2>
            <p className="mt-2 leading-relaxed text-hueso/65">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
