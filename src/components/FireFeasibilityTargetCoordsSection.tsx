import { useEffect } from 'react'
import type { Position } from '../domain/position.types'
import type { Target } from '../domain/target.types'
import { TARGET_FIELD_TOOLTIP } from '../domain/fireFeasibility.constants'
import { useFireFeasibilityPositionTargetMetrics } from '../hooks/useFireFeasibilityPositionTargetMetrics'
import { formatMetric } from '../utils/metricRounding'
import CoordinateInput from './base/CoordinateInput'
import FireFeasibilityRangeField from './FireFeasibilityRangeField'
import FormField from './FormField'
import Input from './Input'
import TargetLoadButton from './TargetLoadButton'

export interface FireFeasibilityTargetMetrics {
  rangeMeters: number | null
  heightDifferenceMeters: number | null
}

interface FireFeasibilityTargetCoordsSectionProps {
  position?: Position
  targetId?: string
  target?: Target
  onTargetChange: (targetId: string | null) => void
  onMetricsChange: (metrics: FireFeasibilityTargetMetrics) => void
}

function FireFeasibilityTargetCoordsSection({
  position,
  targetId,
  target,
  onTargetChange,
  onMetricsChange,
}: FireFeasibilityTargetCoordsSectionProps) {
  const metrics = useFireFeasibilityPositionTargetMetrics(position, target)
  const rangeDisplay = metrics?.range != null ? formatMetric(metrics.range) : ''

  useEffect(() => {
    onMetricsChange({
      rangeMeters: metrics?.range ?? null,
      heightDifferenceMeters: metrics?.altitudeDiff ?? null,
    })
  }, [metrics?.range, metrics?.altitudeDiff, onMetricsChange])

  return (
    <>
      <FormField
        label="שם מטרה"
        infoTooltipText={TARGET_FIELD_TOOLTIP}
        headerAction={
          <TargetLoadButton
            targetId={targetId}
            onSelect={(selected) => onTargetChange(selected.id)}
            onClear={() => onTargetChange(null)}
          />
        }
      >
        <Input type="text" value={target?.targetName ?? ''} disabled />
      </FormField>

      <FormField label='נ"צ מטרה' infoTooltipText={TARGET_FIELD_TOOLTIP}>
        <CoordinateInput value={target?.coordinates} onChange={() => {}} disabled />
      </FormField>

      <FormField label="גובה מטרה" infoTooltipText={TARGET_FIELD_TOOLTIP}>
        <Input
          type="number"
          value={target?.altitude != null ? String(target.altitude) : ''}
          disabled
        />
      </FormField>

      <FireFeasibilityRangeField rangeDisplay={rangeDisplay} />
    </>
  )
}

export default FireFeasibilityTargetCoordsSection
