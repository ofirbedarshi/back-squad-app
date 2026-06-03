import type { Bach } from '../domain/bach.types'
import { getBachCardTitle } from './bachDisplay'

export function getBachSearchFields(bach: Bach): string[] {
  return [getBachCardTitle(bach).title]
}
