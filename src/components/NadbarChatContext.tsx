import { createContext, useContext } from 'react'
import type { NadbarMessageUserVars, NadbarUserVarFields } from '../domain/nadbar.types'
import type { NadbarMessageResources } from '../utils/nadbarMessageFill.types'

export interface NadbarChatContextValue {
  messageVars: NadbarMessageUserVars
  userVarFields?: NadbarUserVarFields
  resources: NadbarMessageResources
  onUserVarChange: (varName: string, value: string) => void
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
