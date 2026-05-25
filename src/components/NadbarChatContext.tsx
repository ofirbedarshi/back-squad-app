import { createContext, useContext } from 'react'
import type {
  NadbarBlockFooterAction,
  NadbarUserVarFields,
  NadbarVarInitialFromBlock,
} from '../domain/nadbar.types'
import type { Target } from '../domain/target.types'
import type { NadbarMessageResources } from '../utils/nadbarMessageFill.types'

export interface NadbarChatContextValue {
  userVarFields?: NadbarUserVarFields
  varInitialFromBlock?: NadbarVarInitialFromBlock
  resources: NadbarMessageResources
  blockFooterActions?: readonly (readonly NadbarBlockFooterAction[] | undefined)[]
  onBlockFooterAction?: (blockIndex: number, action: NadbarBlockFooterAction) => void
  blockLoadedTargetIds?: Record<number, string | undefined>
  onBlockLoadTarget?: (blockIndex: number, target: Target) => void
  onBlockClearLoadedTarget?: (blockIndex: number) => void
  onBlockAddObstacle?: (blockIndex: number) => void
}

const NadbarChatContext = createContext<NadbarChatContextValue | null>(null)

interface NadbarChatProviderProps {
  value: NadbarChatContextValue
  children: React.ReactNode
}

export function NadbarChatProvider({ value, children }: NadbarChatProviderProps) {
  return <NadbarChatContext.Provider value={value}>{children}</NadbarChatContext.Provider>
}

export function useNadbarChatContext(): NadbarChatContextValue {
  const ctx = useContext(NadbarChatContext)
  if (!ctx) {
    throw new Error('useNadbarChatContext must be used within NadbarChatProvider')
  }
  return ctx
}
