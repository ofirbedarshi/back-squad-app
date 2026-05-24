const OBSTACLE_TARGET_OFFSET = 5

interface ObstacleTargetDisplayProps {
  compass: number | undefined
}

function ObstacleTargetDisplay({ compass }: ObstacleTargetDisplayProps) {
  if (compass === undefined) {
    return (
      <span className="py-3.5 text-center text-sm text-neutral-500">
        לא הוזן מצפן
      </span>
    )
  }

  return (
    <span className="py-3.5 text-center text-base text-neutral-800">
      {compass + OBSTACLE_TARGET_OFFSET}
      <span className="text-xs font-bold text-emerald-600"> (+{OBSTACLE_TARGET_OFFSET})</span>
    </span>
  )
}

export default ObstacleTargetDisplay
