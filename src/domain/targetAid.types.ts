import type { FormValues } from './dynamicForm.types'

export interface TargetAidInput {
  values: FormValues
}

export interface TargetAid extends TargetAidInput {
  id: string
  updatedAt: string
}
