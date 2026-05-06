export interface CoordinateValue {
  east: string
  north: string
}

export interface CoordinateInputProps {
  value: CoordinateValue
  onChange: (value: CoordinateValue) => void
  hasError?: boolean
}
