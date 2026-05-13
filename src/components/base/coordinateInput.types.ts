export interface CoordinateValue {
  east: string
  north: string
  palach: string
}

export interface CoordinateInputProps {
  value: CoordinateValue | undefined
  onChange: (value: CoordinateValue) => void
  hasError?: boolean
  disabled?: boolean
}
