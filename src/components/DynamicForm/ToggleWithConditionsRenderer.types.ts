import type { ReactNode } from 'react'
import type { Control } from 'react-hook-form'
import type { FormFieldDef, FormValues, ToggleWithConditionsField } from '../../domain/dynamicForm.types'

export interface ToggleWithConditionsRendererProps {
  field: ToggleWithConditionsField
  control: Control<FormValues>
  renderConditionalField: (child: FormFieldDef, index: number) => ReactNode
}
