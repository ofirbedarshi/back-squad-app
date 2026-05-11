import { useRef } from 'react'
import type { FocusEvent, MouseEvent } from 'react'
import type { CoordinateInputProps } from './coordinateInput.types'

function CoordinateInput({ value, onChange, hasError = false, disabled = false }: CoordinateInputProps) {
  const eastInputRef = useRef<HTMLInputElement | null>(null)
  const northMainInputRef = useRef<HTMLInputElement | null>(null)
  const checkDigitInputRef = useRef<HTMLInputElement | null>(null)

  const east = value?.east ?? ''
  const north = value?.north ?? '3'
  const checkDigit = north.slice(0, 1) || '3'
  const northMain = north.slice(1, 7)

  function updateCoordinates(nextEast: string, nextNorthMain: string, nextCheckDigit: string) {
    onChange({
      east: nextEast,
      north: `${nextCheckDigit}${nextNorthMain}`,
    })
  }

  function handleEastChange(rawValue: string) {
    const nextEast = rawValue.replace(/\D/g, '').slice(0, 6)
    updateCoordinates(nextEast, northMain, checkDigit)
  }

  function handleNorthMainChange(rawValue: string) {
    const nextNorthMain = rawValue.replace(/\D/g, '').slice(0, 6)
    updateCoordinates(east, nextNorthMain, checkDigit)
  }

  function handleCheckDigitChange(rawValue: string) {
    const nextCheckDigit = rawValue.replace(/\D/g, '').slice(0, 1) || '3'
    updateCoordinates(east, northMain, nextCheckDigit)
  }

  function handleSelectOnFocus(event: FocusEvent<HTMLInputElement> | MouseEvent<HTMLInputElement>) {
    event.currentTarget.select()
  }

  return (
    <div
      className={[
        'w-full rounded-2xl border shadow-sm transition-all',
        disabled ? 'opacity-60 cursor-not-allowed bg-neutral-100 border-neutral-200' :
        hasError
          ? 'border-red-400 bg-red-50 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-400/20'
          : 'border-neutral-200 bg-neutral-50 focus-within:border-blue-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-400/20',
      ].join(' ')}
      dir="rtl"
    >
      <div className="flex items-center px-3 py-2 gap-2">
        <div className="flex-1 min-w-0">
          <label className="block text-xs text-neutral-500 mb-1 text-right">מזרחי</label>
          <input
            ref={eastInputRef}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            maxLength={6}
            value={east}
            onChange={(event) => handleEastChange(event.target.value)}
            disabled={disabled}
            className="w-full bg-transparent text-base font-normal tracking-normal text-neutral-800 text-center outline-none disabled:cursor-not-allowed"
            dir="ltr"
          />
        </div>

        <span className="text-base font-semibold text-neutral-400 self-end pb-1">/</span>

        <div className="flex-1 min-w-0">
          <label className="block text-xs text-neutral-500 mb-1 text-right">צפוני</label>
          <div className="flex items-stretch justify-end" dir="ltr">
            <input
              ref={checkDigitInputRef}
              type="text"
              inputMode="numeric"
              autoComplete="off"
              maxLength={1}
              value={checkDigit}
              onChange={(event) => handleCheckDigitChange(event.target.value)}
              onFocus={handleSelectOnFocus}
              onClick={handleSelectOnFocus}
              disabled={disabled}
              className="w-10 bg-neutral-200 text-neutral-600 text-base font-semibold text-center outline-none rounded-l-xl disabled:cursor-not-allowed"
              dir="ltr"
            />
            <input
              ref={northMainInputRef}
              type="text"
              inputMode="numeric"
              autoComplete="off"
              maxLength={6}
              value={northMain}
              onChange={(event) => handleNorthMainChange(event.target.value)}
              disabled={disabled}
              className="flex-1 min-w-0 bg-transparent text-base font-normal tracking-normal text-neutral-800 text-center outline-none rounded-r-xl disabled:cursor-not-allowed"
              dir="ltr"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoordinateInput
