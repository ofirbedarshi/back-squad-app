import Input from './Input'

interface DeflectionAngleAzimuthFieldsProps {
  targetObservationAzimuthRaw: string
  targetLauncherAzimuthRaw: string
  wallAzimuthRaw: string
  onTargetObservationAzimuthChange: (value: string) => void
  onTargetLauncherAzimuthChange: (value: string) => void
  onWallAzimuthChange: (value: string) => void
  showInputError: boolean
}

function DeflectionAngleAzimuthFields({
  targetObservationAzimuthRaw,
  targetLauncherAzimuthRaw,
  wallAzimuthRaw,
  onTargetObservationAzimuthChange,
  onTargetLauncherAzimuthChange,
  onWallAzimuthChange,
  showInputError,
}: DeflectionAngleAzimuthFieldsProps) {
  return (
    <>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-neutral-700">אזימוט תצפית מטרה</label>
        <Input
          type="text"
          inputMode="decimal"
          enterKeyHint="done"
          autoComplete="off"
          placeholder="0–359.9"
          value={targetObservationAzimuthRaw}
          onChange={(e) => onTargetObservationAzimuthChange(e.target.value)}
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
          onChange={(e) => onTargetLauncherAzimuthChange(e.target.value)}
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
          onChange={(e) => onWallAzimuthChange(e.target.value)}
        />
      </div>

      {showInputError && (
        <p className="text-sm font-semibold text-red-600 text-center pt-1">
          הזן שלושה אזימוטים תקינים (0–359.9) לקבלת תוצאות
        </p>
      )}
    </>
  )
}

export default DeflectionAngleAzimuthFields
