import type { FormValues } from './dynamicForm.types'

export interface BachInput {
  values: FormValues
}

export interface Bach extends BachInput {
  id: string
  updatedAt: string
}
