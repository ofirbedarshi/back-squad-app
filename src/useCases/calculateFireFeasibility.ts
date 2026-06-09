import { evaluateCloudsFeasibility, evaluateCloudsFeasibilityGenB } from '../domain/cloudsFeasibility'
import {
  evaluateConcealmentFeasibility,
  evaluateConcealmentFeasibilityWhenMissing,
} from '../domain/concealmentFeasibility'
import {
  createNotImplementedCategoryResultsByGeneration,
} from '../domain/fireFeasibility'
import { buildHitProbabilityFlightPathResultsByGeneration } from './buildHitProbabilityFlightPathResultsByGeneration'
import {
  evaluateObstaclesFeasibilityGenB,
  evaluateObstaclesFeasibilityWhenMissing,
} from '../domain/obstaclesFeasibility'
import type { CloudsFeasibilityEvaluationInput } from '../domain/cloudsFeasibility.types'
import type {
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
  const flightPaths = buildHitProbabilityFlightPathResultsByGeneration({
    positionToTargetRangeMeters: formData.positionToTargetRange,
    positionToTargetHeightDifferenceMeters: formData.positionToTargetHeightDifference,
  })
  const concealmentResult = formData.concealment
    ? evaluateConcealmentFeasibility({
        positionToTargetRangeMeters: formData.positionToTargetRange,
        positionToTargetHeightDifferenceMeters: formData.positionToTargetHeightDifference,
        flightPath: formData.flightPath,
        concealment: formData.concealment,
      })
    : evaluateConcealmentFeasibilityWhenMissing()

  return {
    clouds: {
      a: { enabled: genA.enabled, notes: genA.notes, logs: genA.logs },
      b: { enabled: genB.enabled, notes: genB.notes, logs: genB.logs },
    },
    obstacles: {
      a: obstaclesGenA,
      b: obstaclesGenB,
    },
    concealment: {
      a: concealmentResult,
      b: concealmentResult,
    },
    flightPaths,
  }
}
