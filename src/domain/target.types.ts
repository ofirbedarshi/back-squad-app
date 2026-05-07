export interface TargetInput {
  targetName: string
  targetDescription?: string
  coordinates: string
  altitude?: number
}

export interface Target extends TargetInput {
  id: string
}
