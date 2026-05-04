import type { AttackLog } from '../domain/attackLog.types'

interface AttackLogCardProps {
  log: AttackLog
  onClick?: () => void
}

function getStatusBadge(wasAttacked: 'yes' | 'no', hit: boolean) {
  if (wasAttacked === 'no') {
    return { label: 'לא נתקף', className: 'bg-neutral-100 text-neutral-500' }
  }
  if (hit) {
    return { label: 'נתקף ופגע', className: 'bg-green-100 text-green-700' }
  }
  return { label: 'נתקף ולא פגע', className: 'bg-orange-100 text-orange-600' }
}

function AttackLogCard({ log, onClick }: AttackLogCardProps) {
  const badge = getStatusBadge(log.wasAttacked, log.hit)

  return (
    <div
      className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 flex flex-col gap-2 active:bg-neutral-50 transition-colors touch-manipulation select-none"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      <div className="flex items-center justify-between">
        <span className="font-bold text-neutral-800 text-base">מטרה {log.targetNumber}</span>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badge.className}`}>
          {badge.label}
        </span>
      </div>
      <span className="text-sm text-neutral-500">{log.date} | {log.time}</span>
    </div>
  )
}

export default AttackLogCard
