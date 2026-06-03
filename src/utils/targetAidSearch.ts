import type { TargetAid } from '../domain/targetAid.types'
import { getTargetAidCardTitle } from './targetAidDisplay'

export function getTargetAidSearchFields(item: TargetAid): string[] {
  return [getTargetAidCardTitle(item).title]
}
