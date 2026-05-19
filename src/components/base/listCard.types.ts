import type { ReactNode } from 'react'
import type { OptionsMenuItem } from './OptionsMenu'

export interface ListCardProps {
  title: ReactNode
  subheader?: ReactNode
  lastUpdatedAt?: string
  lastUpdatedLabel?: string
  onClick: () => void
  menuTitle?: string
  menuItems?: OptionsMenuItem[]
}
