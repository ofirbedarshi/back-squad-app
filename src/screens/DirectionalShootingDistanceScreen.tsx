import { useMemo, useState } from 'react'
import DirectionalShootingResultCard from '../components/DirectionalShootingResultCard'
import SegmentedToggle from '../components/base/SegmentedToggle'
import Stepper from '../components/base/Stepper'
import { calculateDirectionalShootingDistanceFromInputs } from '../useCases/calculateDirectionalShootingDistanceFromInputs'
import type {
  DirectionalShootingTargetRangeM,
  DirectionalShootingTrajectory,
} from '../domain/directionalShootingDistance.types'

const TRAJECTORY_OPTIONS = [
  { label: 'flat', value: 'flat' },
  { label: 'lofted', value: 'lofted' },
  { label: 'lofted+', value: 'loftedPlus' },
]

const MIN_TARGET_RANGE_M = 3000
const MAX_TARGET_RANGE_M = 8000
const TARGET_RANGE_STEP_M = 500

function DirectionalShootingDistanceScreen() {
  const [trajectory, setTrajectory] = useState<DirectionalShootingTrajectory>('flat')
  const [targetRangeM, setTargetRangeM] = useState<DirectionalShootingTargetRangeM>(3000)

  const result = useMemo(
    () => calculateDirectionalShootingDistanceFromInputs(trajectory, targetRangeM),
    [trajectory, targetRangeM],
  )

  return (
    <div dir="rtl" className="flex flex-col h-full overflow-y-auto bg-neutral-50">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800 shrink-0">
        מרחק בירי כיווניות
      </header>

      <div className="flex flex-col gap-4 p-4">
        <section className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">נתוני קלט</h2>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700">מסלול ירי</label>
            <SegmentedToggle
              options={TRAJECTORY_OPTIONS}
              value={trajectory}
              onChange={(value) => setTrajectory(value as DirectionalShootingTrajectory)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700">טווח מטרה</label>
            <Stepper
              value={targetRangeM}
              min={MIN_TARGET_RANGE_M}
              max={MAX_TARGET_RANGE_M}
              step={TARGET_RANGE_STEP_M}
              unit="מ׳"
              onChange={(value) => setTargetRangeM(value as DirectionalShootingTargetRangeM)}
            />
          </div>
        </section>

        <DirectionalShootingResultCard
          title="תוצאות מהטבלה"
          rows={[
            {
              label: 'מרחק מהמשגר בסטייה מקסימלית',
              value: result.xAtMaxYM,
              unit: 'מ׳',
              highlight: true,
            },
            {
              label: 'סטייה מקסימלית מציר הקו',
              value: result.meanMaxYM,
              unit: 'מ׳',
              highlight: true,
            },
            {
              label: 'דיוק הסטייה +/-',
              value: result.stdAtMaxYM,
              unit: 'מ׳',
            },
          ]}
        />
      </div>
    </div>
  )
}

export default DirectionalShootingDistanceScreen
