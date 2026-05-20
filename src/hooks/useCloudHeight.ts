import { useCallback, useEffect, useState } from 'react'
import {
  formatCloudHeightInputValue,
  formatCloudHeightWidgetLabel,
} from '../domain/cloudHeight'
import type { CloudHeightSettings } from '../domain/cloudHeight.types'
import { loadCloudHeight } from '../useCases/loadCloudHeight'

export function useCloudHeight() {
  const [settings, setSettings] = useState<CloudHeightSettings>(() => loadCloudHeight())

  const refresh = useCallback(() => {
    setSettings(loadCloudHeight())
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const handleSaved = useCallback((updated: CloudHeightSettings) => {
    setSettings(updated)
  }, [])

  return {
    settings,
    refresh,
    handleSaved,
    inputValue: formatCloudHeightInputValue(settings),
    widgetLabel: formatCloudHeightWidgetLabel(settings),
    hasHeight: settings.heightMeters !== null,
  }
}
