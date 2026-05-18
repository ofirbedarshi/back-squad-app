interface PositionCurrentArchiveBadgeProps {
  /** True when the selected position is the device current station. */
  isCurrentStation: boolean
}

/** Same labels as בחירת עמדת ייחוס: נוכחית (ירוק) / מאגר (כתום). */
function PositionCurrentArchiveBadge({ isCurrentStation }: PositionCurrentArchiveBadgeProps) {
  return isCurrentStation ? (
    <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full shrink-0">
      עמדה נוכחית
    </span>
  ) : (
    <span className="text-xs font-semibold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full shrink-0">
      עמדת מאגר
    </span>
  )
}

export default PositionCurrentArchiveBadge
