export type NadbarType = 'PointerTeam' | 'Katmam' | 'TzurPointer'

export const NADBAR_TYPES: readonly NadbarType[] = ['PointerTeam', 'Katmam', 'TzurPointer']

export type NadbarMessageSource = 'Me' | 'They'

export const NADBAR_MESSAGE_SOURCES: readonly NadbarMessageSource[] = ['Me', 'They']

export interface NadbarMessage {
  source: NadbarMessageSource
  content: string
}

export interface Nadbar {
  id: string
  createdAt: string
  updatedAt: string
  type: NadbarType
  messages: NadbarMessage[]
}

/** Template JSON shape — no id/timestamps */
export interface NadbarTemplate {
  messages: NadbarMessage[]
}
