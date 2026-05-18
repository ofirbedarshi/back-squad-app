import type { FormValues } from '../domain/dynamicForm.types'
import { createDefaultTargetAidForm, normalizeTargetAidForm } from '../domain/targetAidForm'
import {
  loadTargetAidFormRaw,
  removeTargetAidForm,
  saveTargetAidForm,
} from '../storage/targetAidFormStorage'

export function loadTargetAidFormUseCase(): FormValues {
  return normalizeTargetAidForm(loadTargetAidFormRaw())
}

export function saveTargetAidFormUseCase(state: FormValues): void {
  saveTargetAidForm(state)
}

export function clearTargetAidFormUseCase(): FormValues {
  removeTargetAidForm()
  return createDefaultTargetAidForm()
}
