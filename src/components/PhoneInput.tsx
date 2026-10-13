import { useMemo, useState } from 'react'
import { getCountries, getCountryCallingCode, type CountryCode } from 'libphonenumber-js'

/** Shown first: where the Open Mic audience comes from. */
const PINNED: CountryCode[] = ['CO', 'MX', 'AR', 'CL', 'PE', 'EC', 'VE', 'PA', 'US', 'ES']

const flag = (code: string) => String.fromCodePoint(...[...code].map((c) => 0x1f1a5 + c.charCodeAt(0)))

type Option = { code: CountryCode; dial: string; name: string; flag: string }

function countryOptions(): { pinned: Option[]; rest: Option[] } {
  const names = new Intl.DisplayNames(['es'], { type: 'region' })
  const option = (code: CountryCode): Option => ({
    code,
    dial: getCountryCallingCode(code),
    name: names.of(code) ?? code,
    flag: flag(code),
  })
  return {
    pinned: PINNED.map(option),
    rest: getCountries()
      .filter((c) => !PINNED.includes(c))
      .map(option)
      .sort((a, b) => a.name.localeCompare(b.name, 'es')),
  }
}

/**
 * WhatsApp field: country dropdown (Colombia by default) + national number.
 * `onChange` gets "+<code> <number>", so the back office parses it with the chosen country
 * and never guesses. A number typed starting with + wins over the dropdown.
 */
export default function PhoneInput({ onChange }: { onChange: (value: string) => void }) {
  const { pinned, rest } = useMemo(countryOptions, [])
  const [country, setCountry] = useState<CountryCode>('CO')
  const [number, setNumber] = useState('')
  const find = (c: CountryCode) => pinned.find((o) => o.code === c) ?? rest.find((o) => o.code === c)
  const selected = find(country)

  const emit = (c: CountryCode, n: string) => {
    const t = n.trim()
    onChange(!t ? '' : t.startsWith('+') ? t : `+${find(c)?.dial ?? '57'} ${t}`)
  }

  return (
    <div className="flex gap-2">
      {/* Closed it shows only flag + code; the native list (full names) opens on top */}
      <div className="input relative flex w-auto shrink-0 items-center gap-1 whitespace-nowrap pr-7">
        <span aria-hidden>{selected?.flag}</span>
        <span aria-hidden>+{selected?.dial}</span>
        <span aria-hidden className="pointer-events-none absolute right-3 text-xs opacity-60">▾</span>
        <select
          className="absolute inset-0 cursor-pointer opacity-0"
          value={country}
          onChange={(e) => {
            const c = e.target.value as CountryCode
            setCountry(c)
            emit(c, number)
          }}
          aria-label={`País del WhatsApp: ${selected?.name} +${selected?.dial}`}
        >
          {pinned.map((o) => (
            <option key={o.code} value={o.code}>{`${o.flag} +${o.dial} ${o.name}`}</option>
          ))}
          <option disabled>──────────</option>
          {rest.map((o) => (
            <option key={o.code} value={o.code}>{`${o.flag} +${o.dial} ${o.name}`}</option>
          ))}
        </select>
      </div>
      <input
        className="input min-w-0 flex-1"
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder="300 000 0000"
        aria-label="Número de WhatsApp"
        value={number}
        required
        onChange={(e) => {
          setNumber(e.target.value)
          emit(country, e.target.value)
        }}
      />
    </div>
  )
}
