import { useEffect, useMemo } from 'react'
import FormField from '../FormField'
import Input from '../Input'
import { useIndicatorToTargetMetrics } from '../../hooks/useIndicatorToTargetMetrics'
import type { IndicatorToTargetMetrics } from '../../domain/indicatorToTargetMetrics.types'
import type { ComputedTextFieldProps } from './computedTextField.types'

function formatMetricValue(metrics: IndicatorToTargetMetrics, metric: 'azimuth' | 'range'): string {
  return metric === 'azimuth' ? metrics.azimuth.toFixed(1) : metrics.range.toFixed(1)
}

function ComputedTextField({ field, watch, setValue }: ComputedTextFieldProps) {
  const metrics = useIndicatorToTargetMetrics(watch)

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
