import {
  assertValidRangeHeightInput,
  buildRangeHeightMockTargetCoordinates,
  formatRangeHeightMockTargetDescription,
  formatRangeHeightMockTargetName,
} from '../domain/rangeHeightTargetMock'
import type { RangeHeightTargetMockInput } from '../domain/rangeHeightTargetMock.types'
import type { Position } from '../domain/position.types'
import { addTargetUseCase } from './addTarget'
import { loadCurrentPositionUseCase } from './loadCurrentPosition'

export interface CreateRangeHeightTargetMockResult {
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

export function createRangeHeightTargetMockUseCase(
  input: RangeHeightTargetMockInput,
): CreateRangeHeightTargetMockResult {
  const position = loadCurrentPositionUseCase()
  if (!position) {
    throw new Error('לא הוגדרה עמדה נוכחית — הגדר עמדה נוכחית לפני יצירת מטרת בדיקה')
  }
  assertCurrentPositionReady(position)
  assertValidRangeHeightInput(input.rangeMeters, input.heightDifferenceMeters)

  const target = addTargetUseCase({
    targetName: formatRangeHeightMockTargetName(input),
    targetDescription: formatRangeHeightMockTargetDescription(input),
    coordinates: buildRangeHeightMockTargetCoordinates({
      positionCoordinates: position.coordinates,
      rangeMeters: input.rangeMeters,
    }),
    altitude: position.altitude + input.heightDifferenceMeters,
  })

  return { targetId: target.id }
}
