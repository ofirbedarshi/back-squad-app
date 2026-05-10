export interface UserNote {
  id: string
  text: string
  createdAtIso: string
  /** Set when the note text was edited after creation */
  updatedAtIso?: string
}
