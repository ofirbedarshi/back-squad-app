import type { EntityLinkIds } from './entityLinks.types'

export type NadbarType = 'PointerTeam' | 'PointerTeamUpdated' | 'Katmam' | 'TzurPointer'

export const NADBAR_TYPES: readonly NadbarType[] = [
  'PointerTeam',
  'PointerTeamUpdated',
  'Katmam',
  'TzurPointer',
]

export type NadbarMessageSource = 'Me' | 'They'

export const NADBAR_MESSAGE_SOURCES: readonly NadbarMessageSource[] = ['Me', 'They']

export interface NadbarMessage {
  source: NadbarMessageSource
  content: string
}

/** One sub-conversation block inside a nadbar script */
export interface NadbarMessageBlock {
  messages: NadbarMessage[]
}

/** Saved indicator (מציין), target, and position references */
export type NadbarLinks = EntityLinkIds

export interface Nadbar {
  id: string
  createdAt: string
  updatedAt: string
  type: NadbarType
  messageBlocks: NadbarMessageBlock[]
  links?: NadbarLinks
  /** User-filled template fields in Me messages (var name → value) */
  messageVars?: NadbarMessageUserVars
}

/** Supported input kinds for template user vars (`userVarFields` in template JSON). */
export type NadbarUserVarInputKind = 'numeric'

export interface NadbarUserVarFieldSpec {
  input: NadbarUserVarInputKind
}

/** Per-var input rules declared in template JSON (not stored on saved nadbar). */
export type NadbarUserVarFields = Record<string, NadbarUserVarFieldSpec>

/** Template JSON shape — no id/timestamps */
export interface NadbarTemplate {
  blocks: NadbarMessageBlock[]
  userVarFields?: NadbarUserVarFields
}

/** Per-nadbar user-filled message field values (keyed by template var name) */
export type NadbarMessageUserVars = Record<string, string>

/** Partial update for {@link Nadbar.links}; `null` clears a field */
export interface NadbarLinksUpdate {
  pointerId?: string | null
  targetId?: string | null
  positionId?: string | null
}
