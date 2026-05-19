import { createContext, useContext } from 'react'
import { useNadbarMessageResources } from '../hooks/useNadbarMessageResources'
import type { NadbarLinks } from '../domain/nadbar.types'
import type { NadbarMessageResources } from '../utils/nadbarMessageFill.types'

const NadbarMessageResourcesContext = createContext<NadbarMessageResources>({})

export function NadbarMessageResourcesProvider({
  links,
  children,
}: {
  links?: NadbarLinks
  children: React.ReactNode
}) {
  const resources = useNadbarMessageResources(links)
  return (
    <NadbarMessageResourcesContext.Provider value={resources}>
      {children}
    </NadbarMessageResourcesContext.Provider>
  )
}

export function useNadbarMessageResourcesContext(): NadbarMessageResources {
  return useContext(NadbarMessageResourcesContext)
}
