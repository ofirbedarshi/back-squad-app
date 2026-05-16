import type { ReactNode } from 'react'
import type { Control, FieldErrors, UseFormGetValues } from 'react-hook-form'
import type { FormFieldDef, FormValues, ToggleWithConditionsField } from '../../domain/dynamicForm.types'

export interface ToggleWithConditionsRendererProps {
  field: ToggleWithConditionsField
  control: Control<FormValues>
  errors: FieldErrors<FormValues>
  getValues: UseFormGetValues<FormValues>
  parentByKey: Map<string, ToggleWithConditionsField>
  renderConditionalField: (child: FormFieldDef, index: number) => ReactNode
}
