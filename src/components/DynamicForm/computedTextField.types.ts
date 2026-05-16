import type { UseFormSetValue, UseFormWatch } from 'react-hook-form'
import type { FormValues, TextField } from '../../domain/dynamicForm.types'

export type ComputedTextFieldDef = TextField & {
  computedFrom: 'indicatorToTarget'
  computedMetric: 'azimuth' | 'range'
}

export interface ComputedTextFieldProps {
  field: ComputedTextFieldDef
  watch: UseFormWatch<FormValues>
  setValue: UseFormSetValue<FormValues>
}
