import type { UtmConversionDisplayLine } from '../useCases/convertUtmFromInput'

export type UtmConversionResultView =
  | { kind: 'placeholder' }
  | { kind: 'error'; message: string }
  | { kind: 'ok'; lines: UtmConversionDisplayLine[] }

export interface UnitConversionUtmCardProps {
  reversed: boolean
  easting: string
  northing: string
  latitude: string
  longitude: string
  zone: string
  resultView: UtmConversionResultView
  onToggleDirection: () => void
  onEastingChange: (value: string) => void
  onNorthingChange: (value: string) => void
  onLatitudeChange: (value: string) => void
  onLongitudeChange: (value: string) => void
  onZoneChange: (value: string) => void
}
