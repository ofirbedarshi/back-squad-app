import type { FireFeasibilityResults } from '../domain/fireFeasibility.types'
import { loadCloudHeight } from './loadCloudHeight'

export function calculateFireFeasibility(): FireFeasibilityResults {
  const { heightMeters: cloudHeightMeters } = loadCloudHeight()
  if (cloudHeightMeters === null) {
    throw new Error('יש להגדיר גובה עננים במסך הבית לפני חישוב')
  }
  return { clouds: { enabled: false } }
}
