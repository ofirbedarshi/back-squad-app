export type NadbarType = 'PointerTeam' | 'Katmam' | 'TzurPointer'

export interface NadbarInput {
  type: NadbarType
  data: Record<string, unknown>
}

export interface Nadbar extends NadbarInput {
  id: string
  savedAt: string
}
