import { useCallback, type Dispatch, type SetStateAction } from 'react'
import type { Nadbar } from '../domain/nadbar.types'
import { updateNadbarNotes } from '../domain/nadbar'

export function useNadbarNotesChange<T extends Nadbar | null | undefined>(
  setDraftNadbar: Dispatch<SetStateAction<T>>,
) {
  return useCallback(
    (value: string) => {
      setDraftNadbar((current) =>
        current ? (updateNadbarNotes(current, value) as T) : current,
      )
    },
    [setDraftNadbar],
  )
}
