import { evaluateCloudsFeasibility, evaluateCloudsFeasibilityGenB } from '../domain/cloudsFeasibility'
import {
  createNotImplementedCategoryResultsByGeneration,
} from '../domain/fireFeasibility'
import {
  buildHitProbabilityLogs,
  calculateHitProbabilityByFlightPath,
} from '../domain/hitProbability'
import {
  evaluateObstaclesFeasibilityGenB,
  evaluateObstaclesFeasibilityWhenMissing,
} from '../domain/obstaclesFeasibility'
import type { CloudsFeasibilityEvaluationInput } from '../domain/cloudsFeasibility.types'
import type {
  FireFeasibilityFlightPathPercentByPath,
  FireFeasibilityFormData,
  FireFeasibilityResults,
} from '../domain/fireFeasibility.types'
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

  const obstaclesGenB = formData.obstacle
    ? evaluateObstaclesFeasibilityGenB({
        positionToTargetRangeMeters: formData.positionToTargetRange,
        positionToTargetHeightDifferenceMeters: formData.positionToTargetHeightDifference,
        flightPath: formData.flightPath,
        obstacle: formData.obstacle,
      })
    : evaluateObstaclesFeasibilityWhenMissing()
  const obstaclesGenA = createNotImplementedCategoryResultsByGeneration().a
  const hitProbabilityGenB = calculateHitProbabilityByFlightPath({
    positionToTargetRangeMeters: formData.positionToTargetRange,
    positionToTargetHeightDifferenceMeters: formData.positionToTargetHeightDifference,
  })
  const hitProbabilityGenA: FireFeasibilityFlightPathPercentByPath = {
    flat: 0,
    low: 0,
    lofted: 0,
    '+lofted': 0,
  }
  const hitProbabilityLogsGenB = buildHitProbabilityLogs(
    hitProbabilityGenB.debug,
    hitProbabilityGenB.percentByFlightPath,
  )

  return {
    clouds: {
      a: { enabled: genA.enabled, notes: genA.notes, logs: genA.logs },
      b: { enabled: genB.enabled, notes: genB.notes, logs: genB.logs },
    },
    obstacles: {
      a: obstaclesGenA,
      b: obstaclesGenB,
    },
    concealment: createNotImplementedCategoryResultsByGeneration(),
    flightPaths: {
      a: {
        percentByFlightPath: hitProbabilityGenA,
        logs: [],
      },
      b: {
        percentByFlightPath: hitProbabilityGenB.percentByFlightPath,
        logs: hitProbabilityLogsGenB,
      },
    },
  }
}
