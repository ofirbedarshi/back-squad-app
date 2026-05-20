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
