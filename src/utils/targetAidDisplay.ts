import type { TargetAid } from '../domain/targetAid.types'

export function getTargetAidCardTitle(item: TargetAid): { title: string; menuTitle: string } {
  const targetNumber =
    typeof item.values.targetNumber === 'string' ? item.values.targetNumber.trim() : ''
  const fallback = 'עזר מטרות למפקד משימה'
  return {
    title: targetNumber ? `שם מטרה: ${targetNumber}` : fallback,
    menuTitle: targetNumber || fallback,
  }
}
