import type { SelectHTMLAttributes } from 'react'

export interface SelectInputOption {
  label: string
  value: string
}

export interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectInputOption[]
  hasError?: boolean
  placeholder?: string
}
