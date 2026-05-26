import { evaluateCloudsFeasibility } from '../domain/cloudsFeasibility'
import type { FireFeasibilityFormData, FireFeasibilityResults } from '../domain/fireFeasibility.types'
import { loadCloudHeight } from './loadCloudHeight'

export function calculateFireFeasibility(formData: FireFeasibilityFormData): FireFeasibilityResults {
  const { heightMeters: cloudHeightMeters } = loadCloudHeight()
  if (cloudHeightMeters === null) {
    throw new Error('יש להגדיר גובה עננים במסך הבית לפני חישוב')
  }

  if (formData.positionToTargetRange === null) {
    throw new Error('חסר טווח בין עמדה למטרה — ודא שנבחרו עמדה ומטרה עם נתונים מלאים')
  }
  if (formData.positionToTargetHeightDifference === null) {
    throw new Error('חסר הפרש גובה בין עמדה למטרה — ודא שנבחרו עמדה ומטרה עם גובה')
  }

  const clouds = evaluateCloudsFeasibility({
    positionToTargetRangeMeters: formData.positionToTargetRange,
    positionToTargetHeightDifferenceMeters: formData.positionToTargetHeightDifference,
    flightPath: formData.flightPath,
  })

  return { clouds: { enabled: clouds.enabled } }
}
