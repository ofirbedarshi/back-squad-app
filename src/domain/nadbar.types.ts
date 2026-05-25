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

/** Show message only when a user var equals a specific value. */
export interface NadbarMessageVisibleWhen {
  var: string
  equals: string
}

export interface NadbarMessage {
  source: NadbarMessageSource
  content: string
  visibleWhen?: NadbarMessageVisibleWhen
}

/** One sub-conversation block inside a nadbar script */
export interface NadbarMessageBlock {
  messages: NadbarMessage[]
}

/** Block-level footer actions declared in template JSON (not stored on saved nadbar). */
export const NADBAR_BLOCK_FOOTER_ACTIONS = ['createTargetFromVars', 'loadTarget', 'addObstacle'] as const

export type NadbarBlockFooterAction = (typeof NADBAR_BLOCK_FOOTER_ACTIONS)[number]

/** Block shape in template JSON — may include UI actions beyond messages. */
export interface NadbarTemplateBlock extends NadbarMessageBlock {
  footerActions?: NadbarBlockFooterAction[]
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
  /** Per-block user-filled template fields (index aligns with `messageBlocks`) */
  blockMessageVars?: NadbarMessageUserVars[]
  /** Free-text notes below the conversation (not part of message templates). */
  notes?: string
}

/** Supported input kinds for template user vars (`userVarFields` in template JSON). */
export type NadbarUserVarInputKind = 'numeric' | 'choice'

export interface NadbarUserVarFieldSpec {
  input: NadbarUserVarInputKind
  /** Required when `input` is `choice`. */
  options?: readonly string[]
}

/** Per-var input rules declared in template JSON (not stored on saved nadbar). */
export type NadbarUserVarFields = Record<string, NadbarUserVarFieldSpec>

/** User var name → block index that seeds initial display value in later blocks. */
export type NadbarVarInitialFromBlock = Record<string, number>

/** Template JSON shape — no id/timestamps */
export interface NadbarTemplate {
  blocks: NadbarTemplateBlock[]
  userVarFields?: NadbarUserVarFields
  varInitialFromBlock?: NadbarVarInitialFromBlock
}

/** Per-nadbar user-filled message field values (keyed by template var name) */
export type NadbarMessageUserVars = Record<string, string>

/** Partial update for {@link Nadbar.links}; `null` clears a field */
export interface NadbarLinksUpdate {
  pointerId?: string | null
  targetId?: string | null
  positionId?: string | null
}

/** Chat UI config resolved from template JSON (not stored on saved nadbar). */
export interface NadbarChatTemplateConfig {
  userVarFields?: NadbarUserVarFields
  varInitialFromBlock?: NadbarVarInitialFromBlock
  blockFooterActions: readonly (readonly NadbarBlockFooterAction[] | undefined)[]
}
