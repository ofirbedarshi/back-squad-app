import type { ReactNode } from 'react'

export interface SummaryEditCardProps {
  summary: ReactNode
  onEdit: () => void
  editButtonLabel: string
  disabled?: boolean
}
