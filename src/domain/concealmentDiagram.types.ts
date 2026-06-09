export interface ConcealmentDiagramPoint {
  label: string
  distanceFromTargetMeters: number
  heightAboveTargetMeters: number
}

export interface ConcealmentDiagramModel {
  target: ConcealmentDiagramPoint
  concealment: ConcealmentDiagramPoint
  missile: ConcealmentDiagramPoint
  concealmentAngleDeg: number
  missileAngleDeg: number
  enabled: boolean
}
