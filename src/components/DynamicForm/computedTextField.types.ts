import type { UseFormSetValue } from 'react-hook-form'
import type { FormValues, IndicatorToTargetWatchKeyOverrides, TextField } from '../../domain/dynamicForm.types'
import type { TargetLiveMetrics } from '../../domain/targetLiveMetrics.types'

export type ComputedTextFieldDef = TextField & {
  computedFrom: 'indicatorToTarget' | 'positionToTarget'
  computedMetric: 'azimuth' | 'range' | 'altitudeDiff'
  indicatorToTargetWatchKeys?: IndicatorToTargetWatchKeyOverrides
}

export interface ComputedTextFieldProps {
  field: Pick<ComputedTextFieldDef, 'key' | 'label' | 'computedMetric' | 'infoTooltipText'>
  metrics: TargetLiveMetrics | null
  setValue: UseFormSetValue<FormValues>
}
