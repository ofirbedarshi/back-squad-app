import { useEffect, useMemo } from 'react'
import FormField from '../FormField'
import Input from '../Input'
import type { TargetLiveMetrics } from '../../domain/targetLiveMetrics.types'
import type { ComputedTextFieldProps } from './computedTextField.types'

function formatMetricValue(
  metrics: TargetLiveMetrics,
  metric: 'azimuth' | 'range' | 'altitudeDiff',
): string {
  if (metric === 'azimuth') {
    return metrics.azimuth.toFixed(1)
  }
  if (metric === 'range') {
    return metrics.range.toFixed(1)
  }
  return metrics.altitudeDiff.toFixed(1)
}

function ComputedTextField({ field, metrics, setValue }: ComputedTextFieldProps) {
  const displayValue = useMemo(() => {
    if (!metrics) {
      return ''
    }
    return formatMetricValue(metrics, field.computedMetric)
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
