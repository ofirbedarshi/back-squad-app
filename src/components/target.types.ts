export interface TargetInput {
  targetName: string
  targetDescription?: string
  coordinates: string
  altitude?: number
  azimuth?: number
  range?: number
  altitudeDiff?: number
  results?: string
}

export interface Target extends TargetInput {
  id: string
}
