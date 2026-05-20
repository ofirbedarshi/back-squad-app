import { useCallback, useEffect, useState } from 'react'
import {
  formatCloudHeightInputValue,
  formatCloudHeightWidgetLabel,
} from '../domain/cloudHeight'
import type { CloudHeightSettings, CloudHeightUnit } from '../domain/cloudHeight.types'
import { loadCloudHeight } from '../useCases/loadCloudHeight'

export function useCloudHeight() {
  const [settings, setSettings] = useState<CloudHeightSettings>(() => loadCloudHeight())
  const [viewUnit, setViewUnit] = useState<CloudHeightUnit>(() => loadCloudHeight().displayUnit)

  const refresh = useCallback(() => {
    setSettings(loadCloudHeight())
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  useEffect(() => {
    setViewUnit(settings.displayUnit)
  }, [settings.displayUnit])

  const handleSaved = useCallback((updated: CloudHeightSettings) => {
    setSettings(updated)
    setViewUnit(updated.displayUnit)
  }, [])

  const setViewUnitFromToggle = useCallback((unit: string) => {
    setViewUnit(unit as CloudHeightUnit)
  }, [])

  return {
    settings,
    refresh,
    handleSaved,
    viewUnit,
    setViewUnit: setViewUnitFromToggle,
    inputValue: formatCloudHeightInputValue(settings, viewUnit),
    widgetLabel: formatCloudHeightWidgetLabel(settings),
    hasHeight: settings.heightMeters !== null,
  }
}
