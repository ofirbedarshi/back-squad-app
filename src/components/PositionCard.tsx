import type { Position } from '../domain/position.types'

interface PositionCardProps {
  position: Position
}

const LAUNCHER_LABEL: Record<string, string> = {
  vehicle: 'משגר רכב',
  infantry: 'משגר רגלי',
}

function PositionCard({ position }: PositionCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 flex flex-col gap-2">
      <div className="font-bold text-neutral-800 text-base">{position.stationName}</div>
      <div className="flex flex-col gap-1 text-sm text-neutral-500">
        <span>נ"צ: {position.coordinates}</span>
        <span>גובה: {position.altitude} מ'</span>
        <span>אק"א: {position.aka}</span>
        <span>{LAUNCHER_LABEL[position.launcherType]}</span>
        {position.vehicleId && <span>צ' רכב: {position.vehicleId}</span>}
        <span>Pitch & Roll: {position.pitchAndRoll}</span>
      </div>
    </div>
  )
}

export default PositionCard
