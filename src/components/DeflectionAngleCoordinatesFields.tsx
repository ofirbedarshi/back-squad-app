import Input from './Input'

interface CoordinatePairProps {
  title: string
  eastRaw: string
  northRaw: string
  onEastChange: (value: string) => void
  onNorthChange: (value: string) => void
}

function CoordinatePair({
  title,
  eastRaw,
  northRaw,
  onEastChange,
  onNorthChange,
}: CoordinatePairProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-100 bg-neutral-50/80 p-3">
      <h3 className="text-sm font-semibold text-neutral-700">{title}</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-neutral-500">מזרח (E)</label>
          <Input
            type="text"
            inputMode="decimal"
            enterKeyHint="done"
            autoComplete="off"
            value={eastRaw}
            onChange={(e) => onEastChange(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-neutral-500">צפון (N)</label>
          <Input
            type="text"
            inputMode="decimal"
            enterKeyHint="done"
            autoComplete="off"
            value={northRaw}
            onChange={(e) => onNorthChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

interface DeflectionAngleCoordinatesFieldsProps {
  indicatorEastRaw: string
  indicatorNorthRaw: string
  launcherEastRaw: string
  launcherNorthRaw: string
  wallCorner1EastRaw: string
  wallCorner1NorthRaw: string
  wallCorner2EastRaw: string
  wallCorner2NorthRaw: string
  onIndicatorEastChange: (value: string) => void
  onIndicatorNorthChange: (value: string) => void
  onLauncherEastChange: (value: string) => void
  onLauncherNorthChange: (value: string) => void
  onWallCorner1EastChange: (value: string) => void
  onWallCorner1NorthChange: (value: string) => void
  onWallCorner2EastChange: (value: string) => void
  onWallCorner2NorthChange: (value: string) => void
  showInputError: boolean
  inputErrorMessage: string
}

function DeflectionAngleCoordinatesFields({
  indicatorEastRaw,
  indicatorNorthRaw,
  launcherEastRaw,
  launcherNorthRaw,
  wallCorner1EastRaw,
  wallCorner1NorthRaw,
  wallCorner2EastRaw,
  wallCorner2NorthRaw,
  onIndicatorEastChange,
  onIndicatorNorthChange,
  onLauncherEastChange,
  onLauncherNorthChange,
  onWallCorner1EastChange,
  onWallCorner1NorthChange,
  onWallCorner2EastChange,
  onWallCorner2NorthChange,
  showInputError,
  inputErrorMessage,
}: DeflectionAngleCoordinatesFieldsProps) {
  return (
    <>
      <CoordinatePair
        title="מציין"
        eastRaw={indicatorEastRaw}
        northRaw={indicatorNorthRaw}
        onEastChange={onIndicatorEastChange}
        onNorthChange={onIndicatorNorthChange}
      />
      <CoordinatePair
        title="משגר"
        eastRaw={launcherEastRaw}
        northRaw={launcherNorthRaw}
        onEastChange={onLauncherEastChange}
        onNorthChange={onLauncherNorthChange}
      />
      <CoordinatePair
        title="פינת קיר 1"
        eastRaw={wallCorner1EastRaw}
        northRaw={wallCorner1NorthRaw}
        onEastChange={onWallCorner1EastChange}
        onNorthChange={onWallCorner1NorthChange}
      />
      <CoordinatePair
        title="פינת קיר 2"
        eastRaw={wallCorner2EastRaw}
        northRaw={wallCorner2NorthRaw}
        onEastChange={onWallCorner2EastChange}
        onNorthChange={onWallCorner2NorthChange}
      />

      {showInputError && (
        <p className="text-sm font-semibold text-red-600 text-center pt-1">{inputErrorMessage}</p>
      )}
    </>
  )
}

export default DeflectionAngleCoordinatesFields
