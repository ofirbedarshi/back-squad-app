import { useMemo, useState } from 'react'
import Input from '../components/Input'
import Stepper from '../components/base/Stepper'
import MovingTargetResultCard from '../components/MovingTargetResultCard'
import { VALID_RANGES } from '../domain/movingTarget'
import {
  calculateMovingTargetFromInputs,
  getLookupDisplayForRange,
} from '../useCases/calculateMovingTargetFromInputs'
import type { MovingTargetRange } from '../domain/movingTarget.types'
const DEFAULT_FLIGHT_TIME = '30'

function MovingTargetCalculatorScreen() {
  const [rangeKm, setRangeKm] = useState<MovingTargetRange>(4)
  const [targetSpeedRaw, setTargetSpeedRaw] = useState('')
  const [flightTimeRaw, setFlightTimeRaw] = useState(DEFAULT_FLIGHT_TIME)

  const lookup = useMemo(() => getLookupDisplayForRange(rangeKm), [rangeKm])

  const result = useMemo(
    () => calculateMovingTargetFromInputs(rangeKm, targetSpeedRaw, flightTimeRaw),
    [rangeKm, targetSpeedRaw, flightTimeRaw],
  )

  return (
    <div dir="rtl" className="flex flex-col h-full overflow-y-auto bg-neutral-50">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800 shrink-0">
        מחשבון מטרה בתנועה
      </header>

      <div className="flex flex-col gap-4 p-4">
        {/* Inputs */}
        <section className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">נתוני קלט</h2>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700">
              טווח (ק״מ)
            </label>
            <Stepper
              value={rangeKm}
              values={VALID_RANGES}
              onChange={(v) => setRangeKm(v as MovingTargetRange)}
            />
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-sm font-medium text-neutral-700">
                מהירות מטרה (קמ״ש)
              </label>
              <Input
                type="text"
                inputMode="decimal"
                enterKeyHint="done"
                autoComplete="off"
                placeholder="לדוגמה: 80"
                value={targetSpeedRaw}
                onChange={(e) => setTargetSpeedRaw(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-sm font-medium text-neutral-700">
                זמן מעוף (שניות)
              </label>
              <Input
                type="text"
                inputMode="decimal"
                enterKeyHint="done"
                autoComplete="off"
                placeholder="לדוגמה: 30"
                value={flightTimeRaw}
                onChange={(e) => setFlightTimeRaw(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Lookup results — always shown based on range alone */}
        <MovingTargetResultCard
          layout="grid"
          title="נתוני טבלה"
          rows={[
            {
              label: 'גילוי מינימלי',
              value: lookup.minDetectionKm,
              unit: 'ק״מ',
            },
            {
              label: 'מהירות מעוף',
              value: lookup.flightSpeedMs,
              unit: 'מ/ש',
            },
            {
              label: 'זמן מגילוי לפגיעה',
              value: lookup.minDetectionTimeSec,
              unit: 'ש׳',
            },
          ]}
        />

        {/* Calculated results — depend on target speed and flight time */}
        <MovingTargetResultCard
          layout="grid"
          title="תוצאות חישוב"
          rows={[
            {
              label: 'מרחק מפגיעה לפקודת אש',
              value: result?.fireCommandDistanceM ?? null,
              unit: 'מ׳',
              highlight: true,
            },
            {
              label: 'מרחק מינימלי ללא הסתרים',
              value: result?.minClearDistanceM ?? null,
              unit: 'מ׳',
              highlight: true,
            },
          ]}
        />

        {result === null && (targetSpeedRaw !== '' || flightTimeRaw !== DEFAULT_FLIGHT_TIME) && (
          <p className="text-center text-sm text-neutral-400">הכנס נתוני קלט תקינים לקבלת תוצאות</p>
        )}
      </div>
    </div>
  )
}

export default MovingTargetCalculatorScreen
