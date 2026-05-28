import { evaluateCloudsFeasibility, evaluateCloudsFeasibilityGenB } from '../domain/cloudsFeasibility'
import {
  buildObstacleMockTargetCoordinates,
  formatObstaclesMockTargetDescription,
  formatObstaclesMockTargetName,
  solveObstaclesFeasibilityFixture,
} from '../domain/obstaclesFeasibilityFixture'
import type { ObstaclesFeasibilityFixtureSolveInput } from '../domain/obstaclesFeasibilityFixture.types'
import { evaluateObstaclesFeasibilityGenA } from '../domain/obstaclesFeasibility'
import {
  createMockFlightPathResultsByGeneration,
  createNotImplementedCategoryResultsByGeneration,
} from '../domain/fireFeasibility'
import type { FireFeasibilityFlightPath, FireFeasibilityResults } from '../domain/fireFeasibility.types'
import type { Position } from '../domain/position.types'
import { addTargetUseCase } from './addTarget'
import { loadCloudHeight } from './loadCloudHeight'
import { loadCurrentPositionUseCase } from './loadCurrentPosition'
import { saveFireFeasibilityRecordUseCase } from './saveFireFeasibilityRecord'

export interface CreateObstaclesFeasibilityMockInput {
  desiredGenAEnabled: boolean
  flightPath: FireFeasibilityFlightPath
}

export interface CreateObstaclesFeasibilityMockResult {
  recordId: string
  targetId: string
}

function assertCurrentPositionReady(position: Position): void {
  if (
    position.coordinates.east === '' ||
    position.coordinates.north === '' ||
    position.coordinates.palach === ''
  ) {
    throw new Error('לעמדה הנוכחית חסרים נתוני נ"צ — השלם את העמדה לפני יצירת מטרת בדיקה')
  }
  if (!Number.isFinite(position.altitude)) {
    throw new Error('לעמדה הנוכחית חסר גובה — השלם את העמדה לפני יצירת מטרת בדיקה')
  }
}

export function createObstaclesFeasibilityMockUseCase(
  input: CreateObstaclesFeasibilityMockInput,
): CreateObstaclesFeasibilityMockResult {
  const position = loadCurrentPositionUseCase()
  if (!position) {
    throw new Error('לא הוגדרה עמדה נוכחית — הגדר עמדה נוכחית לפני יצירת מטרת בדיקה')
  }
  assertCurrentPositionReady(position)

  const solveInput: ObstaclesFeasibilityFixtureSolveInput = {
    positionAltitudeMeters: position.altitude,
    desiredGenAEnabled: input.desiredGenAEnabled,
    flightPath: input.flightPath,
  }
  const solution = solveObstaclesFeasibilityFixture(solveInput)

  const target = addTargetUseCase({
    targetName: formatObstaclesMockTargetName({
      genAEnabled: input.desiredGenAEnabled,
      flightPath: input.flightPath,
    }),
    targetDescription: formatObstaclesMockTargetDescription(input.flightPath),
    coordinates: buildObstacleMockTargetCoordinates({
      positionCoordinates: position.coordinates,
      rangeMeters: solution.rangeMeters,
    }),
    altitude: solution.targetAltitudeMeters,
  })

  const { heightMeters: cloudHeightMeters } = loadCloudHeight()
  if (cloudHeightMeters === null) {
    throw new Error('יש להגדיר גובה עננים במסך הבית לפני יצירת מטרת בדיקה')
  }

  const cloudsInput = {
    positionToTargetRangeMeters: solution.rangeMeters,
    positionToTargetHeightDifferenceMeters: solution.heightDifferenceMeters,
    flightPath: solution.flightPath,
    targetHeightMeters: solution.targetAltitudeMeters,
    cloudHeightMeters,
  }
  const cloudsGenA = evaluateCloudsFeasibility(cloudsInput)
  const cloudsGenB = evaluateCloudsFeasibilityGenB(cloudsInput)

  const obstaclesGenA = evaluateObstaclesFeasibilityGenA({
    positionToTargetRangeMeters: solution.rangeMeters,
    positionToTargetHeightDifferenceMeters: solution.heightDifferenceMeters,
    flightPath: solution.flightPath,
    obstacle: {
      positionToObstacleRangeMeters: solution.obstacleRangeMeters,
      positionToObstacleHeightDifferenceMeters: solution.obstacleHeightDifferenceMeters,
      obstacleHeightMeters: solution.obstacleHeightMeters,
    },
  })
  const obstaclesGenB = createNotImplementedCategoryResultsByGeneration().b

  const results: FireFeasibilityResults = {
    clouds: {
      a: cloudsGenA,
      b: cloudsGenB,
    },
    obstacles: {
      a: obstaclesGenA,
      b: obstaclesGenB,
    },
    concealment: createNotImplementedCategoryResultsByGeneration(),
    flightPaths: createMockFlightPathResultsByGeneration(0),
  }

  const record = saveFireFeasibilityRecordUseCase({
    mode: 'coords',
    targetId: target.id,
    positionId: position.id,
    results,
  })

  return { recordId: record.id, targetId: target.id }
}
