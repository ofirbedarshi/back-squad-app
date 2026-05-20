import type { EntityLinkIds } from './entityLinks.types'

export type NadbarType = 'PointerTeam' | 'Katmam' | 'TzurPointer'

export const NADBAR_TYPES: readonly NadbarType[] = ['PointerTeam', 'Katmam', 'TzurPointer']

export type NadbarMessageSource = 'Me' | 'They'

export const NADBAR_MESSAGE_SOURCES: readonly NadbarMessageSource[] = ['Me', 'They']

export interface NadbarMessage {
  source: NadbarMessageSource
  content: string
}

/** Saved indicator (מציין), target, and position references */
export type NadbarLinks = EntityLinkIds

export interface Nadbar {
  id: string
  createdAt: string
  updatedAt: string
  type: NadbarType
  messages: NadbarMessage[]
  links?: NadbarLinks
  /** User-filled template fields in Me messages (var name → value) */
  messageVars?: NadbarMessageUserVars
}

/** Template JSON shape — no id/timestamps */
export interface NadbarTemplate {
  messages: NadbarMessage[]
}

/** Per-nadbar user-filled message field values (keyed by template var name) */
export type NadbarMessageUserVars = Record<string, string>

/** Partial update for {@link Nadbar.links}; `null` clears a field */
export interface NadbarLinksUpdate {
  pointerId?: string | null
  targetId?: string | null
  positionId?: string | null
}
