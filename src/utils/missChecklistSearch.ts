import type { MissChecklist } from '../domain/missChecklist.types'
import { getMissChecklistCardTitle } from './missChecklistDisplay'

export function getMissChecklistSearchFields(item: MissChecklist): string[] {
  return [getMissChecklistCardTitle(item).title]
}
