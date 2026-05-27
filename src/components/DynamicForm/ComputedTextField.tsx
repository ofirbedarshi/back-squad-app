import { useEffect, useMemo } from 'react'
import FormField from '../FormField'
import Input from '../Input'
import { formatMetric } from '../../utils/metricRounding'
import type { ComputedTextFieldProps } from './computedTextField.types'

function ComputedTextField({ field, metrics, setValue }: ComputedTextFieldProps) {
  const displayValue = useMemo(() => {
    if (!metrics) {
      return ''
    }
    return formatMetric(metrics[field.computedMetric])
  }, [metrics, field.computedMetric])

  useEffect(() => {
    setValue(field.key, displayValue)
  }, [displayValue, field.key, setValue])

  return (
    <FormField label={field.label} infoTooltipText={field.infoTooltipText}>
      <Input type="text" value={displayValue} disabled readOnly />
    </FormField>
  )
}

export default ComputedTextField
