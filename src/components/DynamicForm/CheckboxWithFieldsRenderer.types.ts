import type { ReactNode } from 'react'
import type { Control, UseFormGetValues, UseFormWatch } from 'react-hook-form'
import type {
  CheckboxWithFieldsField,
  FormValues,
  RowableField,
  ToggleWithConditionsField,
} from '../../domain/dynamicForm.types'

export interface CheckboxWithFieldsRendererProps {
  field: CheckboxWithFieldsField
  control: Control<FormValues>
  getValues: UseFormGetValues<FormValues>
  watch: UseFormWatch<FormValues>
  parentByKey: Map<string, ToggleWithConditionsField>
  renderNestedField: (child: RowableField, index: number) => ReactNode
}
