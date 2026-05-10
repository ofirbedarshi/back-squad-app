import type { PositionCoordinates } from './position.types'

export interface TargetInput {
  targetName: string
  targetDescription?: string
  coordinates: PositionCoordinates
  altitude?: number
}

export interface Target extends TargetInput {
  id: string
}
