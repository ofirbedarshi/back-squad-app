import type { TargetLiveMetrics, TargetLiveMetricsInput } from './targetLiveMetrics.types'

function parseCoordinatePair(coordinates: string): { east: number; north: number } | null {
  const numericParts = coordinates.match(/-?\d+(?:\.\d+)?/g)
  if (!numericParts || numericParts.length < 2) {
    return null
  }

  const east = Number(numericParts[0])
  const north = Number(numericParts[1])
  if (Number.isNaN(east) || Number.isNaN(north)) {
    return null
  }

  return { east, north }
}

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

  const targetCoordinates = parseCoordinatePair(input.targetCoordinates)
  if (!targetCoordinates) {
    return null
  }

  const dE = targetCoordinates.east - sourceEast
  const dN = targetCoordinates.north - sourceNorth
  const altitudeDiff = input.targetHeight - sourceHeight

  const range = Math.sqrt(dE ** 2 + dN ** 2 + altitudeDiff ** 2)

  let theta = Math.atan2(dE, dN)
  if (theta < 0) {
    theta += 2 * Math.PI
  }
  const azimuth = (theta / (2 * Math.PI)) * 6400

  return {
    azimuth,
    range,
    altitudeDiff,
  }
}
