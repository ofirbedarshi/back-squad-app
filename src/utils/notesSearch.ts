import { getNoteCardTitleText } from '../domain/notes'
import type { UserNote } from '../domain/notes.types'

export function getNoteSearchFields(note: UserNote): string[] {
  return [getNoteCardTitleText(note)]
}
