import { EMPTY_BACH_REAR_POSITION_FORM_FIELDS } from '../domain/bachRearPosition.types'
import { positionToRearFormFields } from '../domain/bachRearPosition'
import type { BachRearPositionFormFields } from '../domain/bachRearPosition.types'
import { loadCurrentPositionUseCase } from './loadCurrentPosition'

export function loadBachRearPositionFromCurrentUseCase(): BachRearPositionFormFields {
  const currentPosition = loadCurrentPositionUseCase()
  if (!currentPosition) {
    return { ...EMPTY_BACH_REAR_POSITION_FORM_FIELDS }
  }
  return positionToRearFormFields(currentPosition)
}
