export interface UnitConversionCardProps {
  categoryTitle: string
  inputUnitLabel: string
  outputUnitLabel: string
  inputPlaceholder: string
  resultLabel: string
  inputValue: string
  onInputChange: (value: string) => void
  resultValueDisplay: string
  onToggleDirection: () => void
}
