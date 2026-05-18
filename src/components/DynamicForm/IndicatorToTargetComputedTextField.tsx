import type { UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { useIndicatorToTargetMetrics } from '../../hooks/useIndicatorToTargetMetrics'
import type { FormValues } from '../../domain/dynamicForm.types'
import ComputedTextField from './ComputedTextField'
import type { ComputedTextFieldDef } from './computedTextField.types'

interface IndicatorToTargetComputedTextFieldProps {
  field: ComputedTextFieldDef
  watch: UseFormWatch<FormValues>
  setValue: UseFormSetValue<FormValues>
}

function IndicatorToTargetComputedTextField({ field, watch, setValue }: IndicatorToTargetComputedTextFieldProps) {
  const metrics = useIndicatorToTargetMetrics(watch)

  return <ComputedTextField field={field} metrics={metrics} setValue={setValue} />
}

export default IndicatorToTargetComputedTextField
