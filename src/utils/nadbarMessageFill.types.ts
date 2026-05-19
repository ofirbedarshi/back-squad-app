import type { Indicator } from '../domain/indicator.types'
import type { Position } from '../domain/position.types'
import type { Target } from '../domain/target.types'

export interface NadbarMessageResources {
  indicator?: Indicator
  target?: Target
  position?: Position
}
