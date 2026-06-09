import type { FeasibilityLookupData, FeasibilityLookupTrajectory } from './feasibilityLookup.types'

export function resolveLookupTrajectory(flightPath: string): FeasibilityLookupTrajectory | null {
  if (flightPath === 'low') return 'low'
  if (flightPath === 'lofted') return 'lofted'
  if (flightPath === '+lofted') return 'loftedPlus'
  return null
}

export function buildFeasibilityLookupKey(
  positionToTargetRangeMeters: number,
  positionToTargetHeightDiffMeters: number,
  distFromPositionMeters: number,
): string {
  return `${positionToTargetRangeMeters}|${positionToTargetHeightDiffMeters}|${distFromPositionMeters}`
}

export function roundRangeDownToGrid(
  rangeMeters: number,
  gridValues: number[],
): { value: number; wasRounded: boolean } {
  const sorted = [...gridValues].sort((a, b) => a - b)
  let best: number | undefined
  for (const v of sorted) {
    if (v <= rangeMeters) best = v
    else break
  }
  if (best === undefined) {
    throw new Error(`טווח ${rangeMeters} מ' קטן מהערך המינימלי בטבלה`)
  }
  return { value: best, wasRounded: best !== rangeMeters }
}

export function lookupMissileHeightAbovePosition(
  data: FeasibilityLookupData,
  positionToTargetRangeMeters: number,
  positionToTargetHeightDiffMeters: number,
  distFromPositionMeters: number,
  trajectory: FeasibilityLookupTrajectory,
): number | null {
  const key = buildFeasibilityLookupKey(
    positionToTargetRangeMeters,
    positionToTargetHeightDiffMeters,
    distFromPositionMeters,
  )
  const cell = data.lookup[key]
  const value = cell?.[trajectory]
  return value ?? null
}
