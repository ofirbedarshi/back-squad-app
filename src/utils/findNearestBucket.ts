import type { FindNearestBucketResult } from './findNearestBucket.types.ts'

export function findNearestBucket(value: number, buckets: number[]): FindNearestBucketResult {
  let nearestIndex = 0
  let nearestDistance = Number.POSITIVE_INFINITY
  let tieUsed = false

  for (let index = 0; index < buckets.length; index += 1) {
    const bucket = buckets[index]
    const distance = Math.abs(bucket - value)

    if (distance < nearestDistance) {
      nearestDistance = distance
      nearestIndex = index
      tieUsed = false
      continue
    }

    if (distance === nearestDistance) {
      tieUsed = true
      if (bucket > buckets[nearestIndex]) {
        nearestIndex = index
      }
    }
  }

  return {
    rawValue: value,
    selectedValue: buckets[nearestIndex],
    selectedIndex: nearestIndex,
    tieUsed,
  }
}
