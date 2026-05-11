import { useMemo, useState } from 'react'
import DocFeedbackModal from '../components/base/DocFeedbackModal'
import HitPenetrationResultCard from '../components/HitPenetrationResultCard'
import HitPenetrationSelect from '../components/HitPenetrationSelect'
import Input from '../components/Input'
import { calculateHitPenetrationFromInputs } from '../useCases/calculateHitPenetrationFromInputs'
import hitPenetrationDocMarkdown from '../../docs/מחשבון-פגיעה-וחדירה.md?raw'
import type {
  HitPenetrationDelay,
  HitPenetrationImpactFace,
  HitPenetrationMunition,
  HitPenetrationRangeKm,
  HitPenetrationTargetMaterial,
  HitPenetrationTrajectory,
} from '../domain/hitPenetration.types'

const TRAJECTORY_OPTIONS = [
  { label: 'לו', value: 'low' },
  { label: 'לופטד', value: 'lofted' },
]

const DELAY_OPTIONS = [
  { label: 'קצר', value: 'short' },
  { label: 'ארוך', value: 'long' },
  { label: 'הקשה', value: 'impact' },
]

const RANGE_OPTIONS = [
  { label: '4 ק״מ', value: '4' },
  { label: '5 ק״מ', value: '5' },
  { label: '6 ק״מ', value: '6' },
  { label: '7 ק״מ', value: '7' },
  { label: '8 ק״מ', value: '8' },
  { label: '9 ק״מ', value: '9' },
  { label: '9.75 ק״מ', value: '9.75' },
]

const TARGET_MATERIAL_OPTIONS = [
  { label: 'בלוקים', value: 'blocks' },
  { label: 'רכב', value: 'vehicle' },
  { label: 'פח', value: 'tin' },
  { label: 'חלון', value: 'window' },
]

const MUNITION_OPTIONS = [
  { label: 'שיח', value: 'bush' },
  { label: 'ראטלר', value: 'rattler' },
  { label: 'ספקטרו', value: 'spectro' },
  { label: 'צור', value: 'zur' },
]

const IMPACT_FACE_OPTIONS = [
  { label: 'חזית', value: 'front' },
  { label: 'גג', value: 'roof' },
]

function HitPenetrationCalculatorScreen() {
  const [trajectory, setTrajectory] = useState<HitPenetrationTrajectory>('low')
  const [delay, setDelay] = useState<HitPenetrationDelay>('short')
  const [rangeKm, setRangeKm] = useState<HitPenetrationRangeKm>(6)
  const [targetMaterial, setTargetMaterial] = useState<HitPenetrationTargetMaterial>('blocks')
  const [horizontalAttackAngleRaw, setHorizontalAttackAngleRaw] = useState('80')
  const [designationRangeRaw, setDesignationRangeRaw] = useState('6')
  const [munition, setMunition] = useState<HitPenetrationMunition>('rattler')
  const [verticalDesignationAngleRaw, setVerticalDesignationAngleRaw] = useState('30')
  const [horizontalDesignationAngleToWallRaw, setHorizontalDesignationAngleToWallRaw] = useState('90')
  const [impactFace, setImpactFace] = useState<HitPenetrationImpactFace>('roof')

  const result = useMemo(
    () =>
      calculateHitPenetrationFromInputs(
        trajectory,
        delay,
        rangeKm,
        targetMaterial,
        horizontalAttackAngleRaw,
        designationRangeRaw,
        munition,
        verticalDesignationAngleRaw,
        horizontalDesignationAngleToWallRaw,
        impactFace,
      ),
    [
      trajectory,
      delay,
      rangeKm,
      targetMaterial,
      horizontalAttackAngleRaw,
      designationRangeRaw,
      munition,
      verticalDesignationAngleRaw,
      horizontalDesignationAngleToWallRaw,
      impactFace,
    ],
  )

  return (
    <div dir="rtl" className="relative flex flex-col h-full overflow-y-auto bg-neutral-50">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800 shrink-0">
        מחשבון פגיעה וחדירה
      </header>

      <div className="flex flex-col gap-4 p-4">
        <section className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">נתוני חדירה</h2>

          <div className="grid grid-cols-2 gap-3">
            <HitPenetrationSelect
              label="מסלול"
              value={trajectory}
              options={TRAJECTORY_OPTIONS}
              onChange={(value) => setTrajectory(value as HitPenetrationTrajectory)}
            />

            <HitPenetrationSelect
              label="השהיה"
              value={delay}
              options={DELAY_OPTIONS}
              onChange={(value) => setDelay(value as HitPenetrationDelay)}
            />

            <HitPenetrationSelect
              label="טווח"
              value={rangeKm}
              options={RANGE_OPTIONS}
              onChange={(value) => setRangeKm(Number(value) as HitPenetrationRangeKm)}
            />

            <HitPenetrationSelect
              label="מטרה"
              value={targetMaterial}
              options={TARGET_MATERIAL_OPTIONS}
              onChange={(value) => setTargetMaterial(value as HitPenetrationTargetMaterial)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700">זווית תקיפה אופקית</label>
            <Input
              type="text"
              inputMode="decimal"
              enterKeyHint="done"
              autoComplete="off"
              value={horizontalAttackAngleRaw}
              onChange={(event) => setHorizontalAttackAngleRaw(event.target.value)}
            />
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">נתוני כתם</h2>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-neutral-700">טווח ציון</label>
              <Input
                type="text"
                inputMode="decimal"
                enterKeyHint="done"
                autoComplete="off"
                value={designationRangeRaw}
                onChange={(event) => setDesignationRangeRaw(event.target.value)}
              />
            </div>

            <HitPenetrationSelect
              label="אמצעי"
              value={munition}
              options={MUNITION_OPTIONS}
              onChange={(value) => setMunition(value as HitPenetrationMunition)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-neutral-700">זווית ציון אנכית</label>
              <Input
                type="text"
                inputMode="decimal"
                enterKeyHint="done"
                autoComplete="off"
                value={verticalDesignationAngleRaw}
                onChange={(event) => setVerticalDesignationAngleRaw(event.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-neutral-700">זווית ציון ביחס לדופן</label>
              <Input
                type="text"
                inputMode="decimal"
                enterKeyHint="done"
                autoComplete="off"
                value={horizontalDesignationAngleToWallRaw}
                onChange={(event) => setHorizontalDesignationAngleToWallRaw(event.target.value)}
              />
            </div>
          </div>

          <HitPenetrationSelect
            label="מפנה"
            value={impactFace}
            options={IMPACT_FACE_OPTIONS}
            onChange={(value) => setImpactFace(value as HitPenetrationImpactFace)}
          />
        </section>

        <HitPenetrationResultCard
          title="נתוני טבלה"
          rows={[
            { label: 'זווית מסלול', value: result?.trajectoryAngleDeg ?? null, unit: '°' },
            { label: 'השהיה', value: result?.delayMs ?? null, unit: 'אלפיות שנייה' },
            { label: 'מהירות בטווח', value: result?.speedMs ?? null, unit: 'מ/ש' },
            { label: 'מהירות אחרי חדירה', value: result?.speedAfterPenetrationMs ?? null, unit: 'מ/ש' },
            { label: 'התבדרות אמצעי', value: result?.munitionDivergence ?? null, unit: '' },
          ]}
        />

        <HitPenetrationResultCard
          title="תוצאות חדירה"
          rows={[
            {
              label: 'מרחק אלכסוני מחדירה לפיצוץ',
              value: result?.penetrationToBurstDiagonalM ?? null,
              unit: 'מ׳',
              highlight: true,
            },
            {
              label: 'מרחק אופקי מחדירה לפיצוץ',
              value: result?.penetrationToBurstHorizontalM ?? null,
              unit: 'מ׳',
              highlight: true,
            },
            {
              label: 'מרחק אנכי מחדירה לפיצוץ',
              value: result?.penetrationToBurstVerticalM ?? null,
              unit: 'מ׳',
              highlight: true,
            },
            {
              label: 'מרחק מינימלי מפינת בית לפגיעה בחזית',
              value: result?.minCornerToFacadeHitM ?? null,
              unit: 'מ׳',
            },
          ]}
        />

        <HitPenetrationResultCard
          title="תוצאות כתם"
          rows={[
            {
              label: 'גודל כתם נומינלי',
              value: result?.nominalSpotSizeM ?? null,
              unit: 'מ׳',
              highlight: true,
            },
            {
              label: 'מריחה',
              value: result?.smearSizeM ?? null,
              unit: 'מ׳',
              highlight: true,
            },
          ]}
        />

        {result === null && (
          <p className="text-center text-sm text-neutral-400">הכנס נתונים תקינים בטווח 0-90 מעלות לקבלת תוצאה</p>
        )}
      </div>

      <DocFeedbackModal
        markdown={hitPenetrationDocMarkdown}
        modalTitle="מידע על מחשבון פגיעה וחדירה"
        shareTitle="מחשבון פגיעה וחדירה"
        openButtonAriaLabel="פתח מידע על מחשבון פגיעה וחדירה"
      />
    </div>
  )
}

export default HitPenetrationCalculatorScreen
