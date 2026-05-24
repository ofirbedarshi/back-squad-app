import { createContext, useContext } from 'react'
import type { NadbarMessageUserVars } from '../domain/nadbar.types'

export interface NadbarBlockChatContextValue {
  messageVars: NadbarMessageUserVars
  onUserVarChange: (varName: string, value: string) => void
}

const NadbarBlockChatContext = createContext<NadbarBlockChatContextValue | null>(null)

interface NadbarBlockChatProviderProps {
  value: NadbarBlockChatContextValue
  children: React.ReactNode
}

export function NadbarBlockChatProvider({ value, children }: NadbarBlockChatProviderProps) {
  return <NadbarBlockChatContext.Provider value={value}>{children}</NadbarBlockChatContext.Provider>
}

export function useNadbarBlockChatContext(): NadbarBlockChatContextValue {
  const ctx = useContext(NadbarBlockChatContext)
  if (!ctx) {
    throw new Error('useNadbarBlockChatContext must be used within NadbarBlockChatProvider')
  }
  return ctx
}
