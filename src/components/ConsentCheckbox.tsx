export type Consents = { marketing: boolean; share: boolean }

/**
 * Optional consents (Ley 1581 de 2012), never pre-checked and separate from buying: news from Siente,
 * and sharing data with the event's artists and partner brands (a transfer, which needs its own box).
 * Same wording as the back office's own forms.
 */
export default function ConsentChecks({
  value,
  onChange,
  privacyUrl,
}: {
  value: Consents
  onChange: (value: Consents) => void
  privacyUrl: string
}) {
  return (
    <div className="space-y-3">
      <MarketingCheck checked={value.marketing} onChange={(marketing) => onChange({ ...value, marketing })} privacyUrl={privacyUrl} />
      <label className="flex items-start gap-3 text-left text-sm text-gris">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 shrink-0 accent-morado"
          checked={value.share}
          onChange={(e) => onChange({ ...value, share: e.target.checked })}
        />
        <span>
          Autorizo a Siente a compartir mi nombre, WhatsApp y correo con los artistas del evento y marcas aliadas para
          recibir invitaciones y beneficios.
        </span>
      </label>
    </div>
  )
}

function MarketingCheck({
  checked,
  onChange,
  privacyUrl,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  privacyUrl: string
}) {
  return (
    <label className="flex items-start gap-3 text-left text-sm text-gris">
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 shrink-0 accent-morado"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>
        Quiero recibir noticias de próximos eventos de Siente por WhatsApp y email, y autorizo el tratamiento de mis datos
        para eso
        {privacyUrl ? (
          <>
            {' '}según la{' '}
            <a href={privacyUrl} target="_blank" rel="noopener noreferrer" className="underline">
              política de privacidad
            </a>
          </>
        ) : null}
        . Puedes darte de baja cuando quieras.
      </span>
    </label>
  )
}
