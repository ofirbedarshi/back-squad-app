import Input from './Input'
import type { UnitConversionCardProps } from './unitConversionCard.types'

function UnitConversionCard({
  categoryTitle,
  inputUnitLabel,
  outputUnitLabel,
  inputPlaceholder,
  resultLabel,
  inputValue,
  onInputChange,
  resultValueDisplay,
  onToggleDirection,
}: UnitConversionCardProps) {
  const resultText = resultValueDisplay

  return (
    <section className="bg-white rounded-2xl border border-neutral-200 p-4 shadow-sm">
      <h2 className="text-center font-bold text-neutral-900 mb-3">{categoryTitle}</h2>

      <div
        dir="rtl"
        className="flex items-center justify-center gap-2 mb-3 text-sm text-neutral-700"
      >
        <span>{inputUnitLabel}</span>
        <button
          type="button"
          onClick={onToggleDirection}
          className={[
            'min-w-10 min-h-10 shrink-0 inline-flex items-center justify-center rounded-xl',
            'border border-blue-200 bg-white text-blue-600 text-base font-semibold shadow-sm',
            'touch-manipulation select-none transition-[transform,background-color,border-color,box-shadow] duration-150',
            'hover:bg-blue-50/90 hover:border-blue-300 hover:shadow',
            'active:scale-[0.94] active:bg-blue-100/80 active:border-blue-300',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
          ].join(' ')}
          aria-label="החלפת כיוון המרה"
        >
          <span aria-hidden>←</span>
        </button>
        <span>{outputUnitLabel}</span>
      </div>

      <Input
        type="text"
        inputMode="decimal"
        enterKeyHint="done"
        autoComplete="off"
        placeholder={inputPlaceholder}
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
      />

      <p className="mt-3 text-sm text-neutral-600 text-center">
        {resultLabel}: {resultText}
      </p>
    </section>
  )
}

export default UnitConversionCard
