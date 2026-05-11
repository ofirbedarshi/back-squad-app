import type { FormValues } from './dynamicForm.types'

export interface MissChecklistInput {
  values: FormValues
}

export interface MissChecklist extends MissChecklistInput {
  id: string
  createdAt: number
}
