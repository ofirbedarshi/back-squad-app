import { useMemo, useState } from 'react'
import DeflectionAngleAzimuthFields from '../components/DeflectionAngleAzimuthFields'
import DeflectionAngleCoordinatesFields from '../components/DeflectionAngleCoordinatesFields'
import MovingTargetResultCard from '../components/MovingTargetResultCard'
import SegmentedControl from '../components/base/SegmentedControl'
import type { DeflectionAngleInputMode } from '../domain/deflectionAngle.types'
import {
  calculateDeflectionAngleFromCoordinateInputs,
  calculateDeflectionAngleFromInputs,
  hasDuplicateWallCorners,
  hasInvalidDeflectionAngleCoordinateInputs,
  hasInvalidDeflectionAngleInputs,
} from '../useCases/calculateDeflectionAngleFromInputs'

const INPUT_MODE_OPTIONS = [
  { value: 'azimuth' as const, label: 'אזימוטים' },
  { value: 'coordinates' as const, label: 'קואורדינטות' },
]

function DeflectionAngleCalculatorScreen() {
  const [inputMode, setInputMode] = useState<DeflectionAngleInputMode>('azimuth')

  const [targetObservationAzimuthRaw, setTargetObservationAzimuthRaw] = useState('')
  const [targetLauncherAzimuthRaw, setTargetLauncherAzimuthRaw] = useState('')
  const [wallAzimuthRaw, setWallAzimuthRaw] = useState('')

  const [indicatorEastRaw, setIndicatorEastRaw] = useState('')
  const [indicatorNorthRaw, setIndicatorNorthRaw] = useState('')
  const [launcherEastRaw, setLauncherEastRaw] = useState('')
  const [launcherNorthRaw, setLauncherNorthRaw] = useState('')
  const [wallCorner1EastRaw, setWallCorner1EastRaw] = useState('')
  const [wallCorner1NorthRaw, setWallCorner1NorthRaw] = useState('')
  const [wallCorner2EastRaw, setWallCorner2EastRaw] = useState('')
  const [wallCorner2NorthRaw, setWallCorner2NorthRaw] = useState('')

  const result = useMemo(() => {
    if (inputMode === 'azimuth') {
      return calculateDeflectionAngleFromInputs(
        targetObservationAzimuthRaw,
        targetLauncherAzimuthRaw,
        wallAzimuthRaw,
      )
    }
    return calculateDeflectionAngleFromCoordinateInputs(
      indicatorEastRaw,
      indicatorNorthRaw,
      launcherEastRaw,
      launcherNorthRaw,
      wallCorner1EastRaw,
      wallCorner1NorthRaw,
      wallCorner2EastRaw,
      wallCorner2NorthRaw,
    )
  }, [
    inputMode,
    targetObservationAzimuthRaw,
    targetLauncherAzimuthRaw,
    wallAzimuthRaw,
    indicatorEastRaw,
    indicatorNorthRaw,
    launcherEastRaw,
    launcherNorthRaw,
    wallCorner1EastRaw,
    wallCorner1NorthRaw,
    wallCorner2EastRaw,
    wallCorner2NorthRaw,
  ])

  const showAzimuthInputError = hasInvalidDeflectionAngleInputs(
    targetObservationAzimuthRaw,
    targetLauncherAzimuthRaw,
    wallAzimuthRaw,
  )

  const showCoordinateInvalidError = hasInvalidDeflectionAngleCoordinateInputs(
    indicatorEastRaw,
    indicatorNorthRaw,
    launcherEastRaw,
    launcherNorthRaw,
    wallCorner1EastRaw,
    wallCorner1NorthRaw,
    wallCorner2EastRaw,
    wallCorner2NorthRaw,
  )

  const showDuplicateWallCorners = hasDuplicateWallCorners(
    wallCorner1EastRaw,
    wallCorner1NorthRaw,
    wallCorner2EastRaw,
    wallCorner2NorthRaw,
  )

  const coordinateErrorMessage = showDuplicateWallCorners
    ? 'פינות הקיר חייבות להיות שונות'
    : 'הזן קואורדינטות תקינות (מזרח וצפון) לכל הנקודות'

  return (
    <div dir="rtl" className="flex flex-col h-full overflow-y-auto bg-neutral-50">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800 shrink-0">
        מחשבון זווית סטיה היסט
      </header>

      <div className="flex flex-col gap-4 p-4">
        <section className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 flex flex-col gap-4">
          <SegmentedControl<DeflectionAngleInputMode>
            value={inputMode}
            options={INPUT_MODE_OPTIONS}
            onChange={setInputMode}
            ariaLabel="אופן הזנת נתונים"
          />

          {inputMode === 'azimuth' ? (
            <DeflectionAngleAzimuthFields
              targetObservationAzimuthRaw={targetObservationAzimuthRaw}
              targetLauncherAzimuthRaw={targetLauncherAzimuthRaw}
              wallAzimuthRaw={wallAzimuthRaw}
              onTargetObservationAzimuthChange={setTargetObservationAzimuthRaw}
              onTargetLauncherAzimuthChange={setTargetLauncherAzimuthRaw}
              onWallAzimuthChange={setWallAzimuthRaw}
              showInputError={showAzimuthInputError}
            />
          ) : (
            <DeflectionAngleCoordinatesFields
              indicatorEastRaw={indicatorEastRaw}
              indicatorNorthRaw={indicatorNorthRaw}
              launcherEastRaw={launcherEastRaw}
              launcherNorthRaw={launcherNorthRaw}
              wallCorner1EastRaw={wallCorner1EastRaw}
              wallCorner1NorthRaw={wallCorner1NorthRaw}
              wallCorner2EastRaw={wallCorner2EastRaw}
              wallCorner2NorthRaw={wallCorner2NorthRaw}
              onIndicatorEastChange={setIndicatorEastRaw}
              onIndicatorNorthChange={setIndicatorNorthRaw}
              onLauncherEastChange={setLauncherEastRaw}
              onLauncherNorthChange={setLauncherNorthRaw}
              onWallCorner1EastChange={setWallCorner1EastRaw}
              onWallCorner1NorthChange={setWallCorner1NorthRaw}
              onWallCorner2EastChange={setWallCorner2EastRaw}
              onWallCorner2NorthChange={setWallCorner2NorthRaw}
              showInputError={showCoordinateInvalidError || showDuplicateWallCorners}
              inputErrorMessage={coordinateErrorMessage}
            />
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
