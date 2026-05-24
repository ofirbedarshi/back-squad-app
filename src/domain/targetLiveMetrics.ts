import type { TargetLiveMetrics, TargetLiveMetricsInput } from './targetLiveMetrics.types'

export function calculateTargetLiveMetrics(input: TargetLiveMetricsInput): TargetLiveMetrics | null {
  if (input.targetHeight === undefined || Number.isNaN(input.targetHeight)) {
    return null
  }

  const sourceEast = Number(input.sourceEast)
  const sourceNorth = Number(input.sourceNorth)
  const sourceHeight = Number(input.sourceHeight)
  if (Number.isNaN(sourceEast) || Number.isNaN(sourceNorth) || Number.isNaN(sourceHeight)) {
    return null
  }

  const targetEast = Number(input.targetCoordinates.east)
  const targetNorth = Number(input.targetCoordinates.north)
  if (Number.isNaN(targetEast) || Number.isNaN(targetNorth)) {
    return null
  }

  const dE = targetEast - sourceEast
  const dN = targetNorth - sourceNorth
  const altitudeDiff = input.targetHeight - sourceHeight

  const range = Math.sqrt(dE ** 2 + dN ** 2)

  let theta = Math.atan2(dE, dN)
  if (theta < 0) {
    theta += 2 * Math.PI
  }
  const azimuth = (theta / (2 * Math.PI)) * 360

  return {
    azimuth,
    range,
    altitudeDiff,
  }
}
