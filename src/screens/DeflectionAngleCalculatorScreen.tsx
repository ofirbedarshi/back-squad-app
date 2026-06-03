import { useMemo, useState } from 'react'
import Input from '../components/Input'
import MovingTargetResultCard from '../components/MovingTargetResultCard'
import {
  calculateDeflectionAngleFromInputs,
  hasInvalidDeflectionAngleInputs,
} from '../useCases/calculateDeflectionAngleFromInputs'

function DeflectionAngleCalculatorScreen() {
  const [targetObservationAzimuthRaw, setTargetObservationAzimuthRaw] = useState('')
  const [targetLauncherAzimuthRaw, setTargetLauncherAzimuthRaw] = useState('')
  const [wallAzimuthRaw, setWallAzimuthRaw] = useState('')

  const result = useMemo(
    () =>
      calculateDeflectionAngleFromInputs(
        targetObservationAzimuthRaw,
        targetLauncherAzimuthRaw,
        wallAzimuthRaw,
      ),
    [targetObservationAzimuthRaw, targetLauncherAzimuthRaw, wallAzimuthRaw],
  )

  const showInputError = hasInvalidDeflectionAngleInputs(
    targetObservationAzimuthRaw,
    targetLauncherAzimuthRaw,
    wallAzimuthRaw,
  )

  return (
    <div dir="rtl" className="flex flex-col h-full overflow-y-auto bg-neutral-50">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800 shrink-0">
        מחשבון זווית סטיה היסט
      </header>

      <div className="flex flex-col gap-4 p-4">
        <section className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">
            אזימוטים (מעלות)
          </h2>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700">אזימוט תצפית מטרה</label>
            <Input
              type="text"
              inputMode="decimal"
              enterKeyHint="done"
              autoComplete="off"
              placeholder="0–359.9"
              value={targetObservationAzimuthRaw}
              onChange={(e) => setTargetObservationAzimuthRaw(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700">אזימוט משגר מטרה</label>
            <Input
              type="text"
              inputMode="decimal"
              enterKeyHint="done"
              autoComplete="off"
              placeholder="0–359.9"
              value={targetLauncherAzimuthRaw}
              onChange={(e) => setTargetLauncherAzimuthRaw(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700">אזימוט קיר</label>
            <Input
              type="text"
              inputMode="decimal"
              enterKeyHint="done"
              autoComplete="off"
              placeholder="0–359.9"
              value={wallAzimuthRaw}
              onChange={(e) => setWallAzimuthRaw(e.target.value)}
            />
          </div>

          {showInputError && (
            <p className="text-sm font-semibold text-red-600 text-center pt-1">
              הזן שלושה אזימוטים תקינים (0–359.9) לקבלת תוצאות
            </p>
          )}
        </section>

        <MovingTargetResultCard
          layout="grid"
          title="זוויות"
          rows={[
            {
              label: 'זווית ציון לקיר',
              value: result?.designationAngleToWallDeg ?? null,
              unit: '°',
            },
            {
              label: 'זווית הקודקוד',
              value: result?.apexAngleDeg ?? null,
              unit: '°',
              highlight: true,
            },
            {
              label: 'זווית הגעת טיל לקיר',
              value: result?.missileArrivalAngleToWallDeg ?? null,
              unit: '°',
            },
          ]}
        />

        <MovingTargetResultCard
          title="מכפילי מרחק"
          rows={[
            {
              label: 'מרחק נדרש על קיר - פי',
              value: result?.requiredDistanceOnWallFeet ?? null,
              unit: '',
              highlight: true,
            },
            {
              label: 'הגדלת הסטייה בהסט הצידה - פי',
              value: result?.sideDriftDeflectionIncreaseFeet ?? null,
              unit: '',
              highlight: true,
            },
          ]}
        />
      </div>
    </div>
  )
}

export default DeflectionAngleCalculatorScreen
