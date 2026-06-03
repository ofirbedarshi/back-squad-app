import type { ReactNode } from 'react'
import type { OptionsMenuItem } from './OptionsMenu'

export interface ListCardProps {
  title: ReactNode
  titleClassName?: string
  subheader?: ReactNode
  lastUpdatedAt?: string
  lastUpdatedLabel?: string
  className?: string
  onClick: () => void
  menuTitle?: string
  menuItems?: OptionsMenuItem[]
}
