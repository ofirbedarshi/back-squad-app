import type { Indicator } from './indicator.types'
import type { Position } from './position.types'
import type { Target } from './target.types'

/** Saved link ids (indicator / target / position). */
export interface EntityLinkIds {
  pointerId?: string
  targetId?: string
  positionId?: string
}

/** Entities resolved from {@link EntityLinkIds}. */
export interface EntityLinkResources {
  indicator?: Indicator
  target?: Target
  position?: Position
}

export interface EntityLinksUpdate {
  pointerId?: string | null
  targetId?: string | null
  positionId?: string | null
}

export type EntityLoadLinksSection = 'indicator' | 'target' | 'position'

export interface EntityLoadLinksStepHeaderConfig {
  stepLabel?: string
  title: string
  subtitle?: string
}
