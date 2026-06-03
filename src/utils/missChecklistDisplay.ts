import type { MissChecklist } from '../domain/missChecklist.types'

export function getMissChecklistCardTitle(item: MissChecklist): { title: string; menuTitle: string } {
  const targetType =
    typeof item.values.targetType === 'string' ? item.values.targetType.trim() : ''
  const fallback = "צ'קליסט החטאה"
  return {
    title: targetType ? `סוג מטרה: ${targetType}` : fallback,
    menuTitle: targetType || fallback,
  }
}
