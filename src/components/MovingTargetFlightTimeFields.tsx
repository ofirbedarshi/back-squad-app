import { useMemo } from 'react'
import Input from './Input'
import { getComputedFlightTimeDisplayForRange } from '../useCases/calculateMovingTargetFromInputs'
import type { MovingTargetRange } from '../domain/movingTarget.types'

type MovingTargetFlightTimeFieldsProps = {
  rangeKm: MovingTargetRange
  flightTimeRaw: string
  onFlightTimeChange: (value: string) => void
}

function MovingTargetFlightTimeFields({
  rangeKm,
  flightTimeRaw,
  onFlightTimeChange,
}: MovingTargetFlightTimeFieldsProps) {
  const computedFlightTime = useMemo(
    () => getComputedFlightTimeDisplayForRange(rangeKm),
    [rangeKm],
  )

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3">
        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-sm font-medium text-neutral-700">
            זמן מעוף ידני (שניות)
          </label>
          <Input
            type="text"
            inputMode="decimal"
            enterKeyHint="done"
            autoComplete="off"
            placeholder="לדוגמה: 30"
            value={flightTimeRaw}
            onChange={(e) => onFlightTimeChange(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-sm font-medium text-neutral-700">
            זמן מעוף מחושב (שניות)
          </label>
          <Input
            type="text"
            readOnly
            disabled
            value={computedFlightTime}
          />
        </div>
      </div>
      <p className="text-xs text-neutral-400">
        כאשר השדה הידני ריק — החישוב משתמש בזמן המחושב מהטבלה.
      </p>
    </div>
  )
}

export default MovingTargetFlightTimeFields
