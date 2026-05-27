import {
  evaluateCloudsFeasibility,
  evaluateCloudsFeasibilityGenB,
} from '../domain/cloudsFeasibility'
import {
  buildTargetCoordinatesForFixture,
  formatCloudsMockTargetDescription,
  formatCloudsMockTargetName,
  solveCloudsFeasibilityFixture,
} from '../domain/cloudsFeasibilityFixture'
import type { CloudsFeasibilityFixtureSolveInput } from '../domain/cloudsFeasibilityFixture.types'
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

export interface CreateCloudsFeasibilityMockInput {
  desiredGenAEnabled: boolean
  desiredGenBEnabled: boolean
  flightPath: FireFeasibilityFlightPath
}

export interface CreateCloudsFeasibilityMockResult {
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

export function createCloudsFeasibilityMockUseCase(
  input: CreateCloudsFeasibilityMockInput,
): CreateCloudsFeasibilityMockResult {
  const position = loadCurrentPositionUseCase()
  if (!position) {
    throw new Error('לא הוגדרה עמדה נוכחית — הגדר עמדה נוכחית לפני יצירת מטרת בדיקה')
  }
  assertCurrentPositionReady(position)

  const { heightMeters: cloudHeightMeters } = loadCloudHeight()
  if (cloudHeightMeters === null) {
    throw new Error('יש להגדיר גובה עננים במסך הבית לפני יצירת מטרת בדיקה')
  }

  const solveInput: CloudsFeasibilityFixtureSolveInput = {
    cloudHeightMeters,
    positionAltitudeMeters: position.altitude,
    desiredGenAEnabled: input.desiredGenAEnabled,
    desiredGenBEnabled: input.desiredGenBEnabled,
    flightPath: input.flightPath,
  }

  const solution = solveCloudsFeasibilityFixture(solveInput)

  const target = addTargetUseCase({
    targetName: formatCloudsMockTargetName({
      genAEnabled: input.desiredGenAEnabled,
      genBEnabled: input.desiredGenBEnabled,
      flightPath: input.flightPath,
    }),
    targetDescription: formatCloudsMockTargetDescription(input.flightPath),
    coordinates: buildTargetCoordinatesForFixture({
      positionCoordinates: position.coordinates,
      rangeMeters: solution.rangeMeters,
    }),
    altitude: solution.targetAltitudeMeters,
  })

  const cloudsEvaluationInput = {
    positionToTargetRangeMeters: solution.rangeMeters,
    positionToTargetHeightDifferenceMeters: solution.heightDifferenceMeters,
    flightPath: solution.flightPath,
    targetHeightMeters: solution.targetAltitudeMeters,
    cloudHeightMeters,
  }

  const genA = evaluateCloudsFeasibility(cloudsEvaluationInput)
  const genB = evaluateCloudsFeasibilityGenB(cloudsEvaluationInput)

  const results: FireFeasibilityResults = {
    clouds: {
      a: { enabled: genA.enabled, notes: genA.notes, logs: genA.logs },
      b: { enabled: genB.enabled, notes: genB.notes, logs: genB.logs },
    },
    obstacles: createNotImplementedCategoryResultsByGeneration(),
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
