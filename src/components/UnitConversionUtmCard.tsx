import Input from './Input'
import type { UnitConversionUtmCardProps } from './unitConversionUtmCard.types'

function UnitConversionUtmCard({
  reversed,
  easting,
  northing,
  latitude,
  longitude,
  zone,
  resultView,
  onToggleDirection,
  onEastingChange,
  onNorthingChange,
  onLatitudeChange,
  onLongitudeChange,
  onZoneChange,
}: UnitConversionUtmCardProps) {
  const inputUnitLabel = reversed ? 'קו רוחב / אורך' : 'UTM'
  const outputUnitLabel = reversed ? 'UTM' : 'קו רוחב / אורך'

  return (
    <section className="bg-white rounded-2xl border border-neutral-200 p-4 shadow-sm">
      <h2 className="text-center font-bold text-neutral-900 mb-3">קואורדינטות</h2>

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

      <div className="flex flex-col gap-3">
        {reversed ? (
          <>
            <div>
              <label className="block text-xs text-neutral-500 mb-1 text-right">קו רוחב</label>
              <Input
                type="text"
                inputMode="decimal"
                enterKeyHint="done"
                autoComplete="off"
                placeholder="קו רוחב"
                value={latitude}
                onChange={(e) => onLatitudeChange(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-500 mb-1 text-right">קו אורך</label>
              <Input
                type="text"
                inputMode="decimal"
                enterKeyHint="done"
                autoComplete="off"
                placeholder="קו אורך"
                value={longitude}
                onChange={(e) => onLongitudeChange(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-xs text-neutral-500 mb-1 text-right">מזרח (Easting)</label>
              <Input
                type="text"
                inputMode="decimal"
                enterKeyHint="done"
                autoComplete="off"
                placeholder="מזרח"
                value={easting}
                onChange={(e) => onEastingChange(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-500 mb-1 text-right">צפון (Northing)</label>
              <Input
                type="text"
                inputMode="decimal"
                enterKeyHint="done"
                autoComplete="off"
                placeholder="צפון"
                value={northing}
                onChange={(e) => onNorthingChange(e.target.value)}
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-xs text-neutral-500 mb-1 text-right">פלח (אזור UTM)</label>
          <Input
            type="text"
            inputMode="numeric"
            enterKeyHint="done"
            autoComplete="off"
            placeholder="36"
            value={zone}
            onChange={(e) => onZoneChange(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-3 text-sm text-center">
        {resultView.kind === 'error' ? (
          <p className="text-red-600">{resultView.message}</p>
        ) : resultView.kind === 'placeholder' ? (
          <p className="text-neutral-600">-</p>
        ) : (
          <div className="flex flex-col gap-1 text-neutral-600">
            {resultView.lines.map((line) => (
              <p key={line.label}>
                {line.label}: {line.value}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default UnitConversionUtmCard
