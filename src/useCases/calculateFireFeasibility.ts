import { evaluateCloudsFeasibility, evaluateCloudsFeasibilityGenB } from '../domain/cloudsFeasibility'
import {
  createNotImplementedCategoryResultsByGeneration,
} from '../domain/fireFeasibility'
import {
  buildHitProbabilityLogs,
  calculateHitProbabilityByFlightPath,
} from '../domain/hitProbability'
import {
  evaluateObstaclesFeasibilityGenA,
  evaluateObstaclesFeasibilityWhenMissing,
} from '../domain/obstaclesFeasibility'
import type { CloudsFeasibilityEvaluationInput } from '../domain/cloudsFeasibility.types'
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
  if (formData.targetAltitudeMeters === null) {
    throw new Error('חסר גובה מטרה — ודא שלמטרה שנבחרה הוגדר גובה')
  }

  const cloudsInput: CloudsFeasibilityEvaluationInput = {
    positionToTargetRangeMeters: formData.positionToTargetRange,
    positionToTargetHeightDifferenceMeters: formData.positionToTargetHeightDifference,
    flightPath: formData.flightPath,
    targetHeightMeters: formData.targetAltitudeMeters,
    cloudHeightMeters,
  }

  const genA = evaluateCloudsFeasibility(cloudsInput)
  const genB = evaluateCloudsFeasibilityGenB(cloudsInput)

  const obstaclesGenA = formData.obstacle
    ? evaluateObstaclesFeasibilityGenA({
        positionToTargetRangeMeters: formData.positionToTargetRange,
        positionToTargetHeightDifferenceMeters: formData.positionToTargetHeightDifference,
        flightPath: formData.flightPath,
        obstacle: formData.obstacle,
      })
    : evaluateObstaclesFeasibilityWhenMissing()
  const obstaclesGenB = createNotImplementedCategoryResultsByGeneration().b
  const hitProbability = calculateHitProbabilityByFlightPath({
    positionToTargetRangeMeters: formData.positionToTargetRange,
    positionToTargetHeightDifferenceMeters: formData.positionToTargetHeightDifference,
  })
  const hitProbabilityLogs = buildHitProbabilityLogs(
    hitProbability.debug,
    hitProbability.percentByFlightPath,
  )

  return {
    clouds: {
      a: { enabled: genA.enabled, notes: genA.notes, logs: [...genA.logs, ...hitProbabilityLogs] },
      b: { enabled: genB.enabled, notes: genB.notes, logs: [...genB.logs, ...hitProbabilityLogs] },
    },
    obstacles: {
      a: obstaclesGenA,
      b: obstaclesGenB,
    },
    concealment: createNotImplementedCategoryResultsByGeneration(),
    flightPaths: {
      a: hitProbability.percentByFlightPath,
      b: hitProbability.percentByFlightPath,
    },
  }
}
