import type { Bach } from '../domain/bach.types'

export function getBachCardTitle(bach: Bach): { title: string; menuTitle: string } {
  const { values } = bach
  const targetName = typeof values.targetName === 'string' ? values.targetName.trim() : ''
  const indicatorName = typeof values.indicatorName === 'string' ? values.indicatorName.trim() : ''
  const title = targetName ? `מטרה: ${targetName}` : 'ללא שם מטרה'
  const menuTitle = targetName || indicatorName || 'בדח'
  return { title, menuTitle }
}
