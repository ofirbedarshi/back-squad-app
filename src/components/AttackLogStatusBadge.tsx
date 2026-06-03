interface AttackLogStatusBadgeProps {
  wasAttacked: 'yes' | 'no'
  hit: boolean
}

function getStatusStyle(wasAttacked: 'yes' | 'no', hit: boolean) {
  if (wasAttacked === 'no') {
    return { label: 'לא נתקף', className: 'bg-neutral-100 text-neutral-500' }
  }
  if (hit) {
    return { label: 'נתקף ופגע', className: 'bg-green-100 text-green-700' }
  }
  return { label: 'נתקף ולא פגע', className: 'bg-orange-100 text-orange-600' }
}

function AttackLogStatusBadge({ wasAttacked, hit }: AttackLogStatusBadgeProps) {
  const badge = getStatusStyle(wasAttacked, hit)

  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${badge.className}`}>
      {badge.label}
    </span>
  )
}

export default AttackLogStatusBadge
