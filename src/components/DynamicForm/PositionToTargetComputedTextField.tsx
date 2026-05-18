import type { UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { usePositionToTargetMetrics } from '../../hooks/usePositionToTargetMetrics'
import type { FormValues } from '../../domain/dynamicForm.types'
import ComputedTextField from './ComputedTextField'
import type { ComputedTextFieldDef } from './computedTextField.types'

interface PositionToTargetComputedTextFieldProps {
  field: ComputedTextFieldDef
  watch: UseFormWatch<FormValues>
  setValue: UseFormSetValue<FormValues>
}

function PositionToTargetComputedTextField({ field, watch, setValue }: PositionToTargetComputedTextFieldProps) {
  const metrics = usePositionToTargetMetrics(watch)

  return <ComputedTextField field={field} metrics={metrics} setValue={setValue} />
}

export default PositionToTargetComputedTextField
