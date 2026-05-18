import { useCallback, useEffect, useMemo, useRef } from 'react'
import type { FieldValues, UseFormReset, UseFormWatch } from 'react-hook-form'
import { FORM_DRAFT_DEBOUNCE_MS } from '../domain/formDraft.types'
import type { FormDraftValues } from '../domain/formDraft.types'
import { saveFormDraftUseCase } from '../useCases/saveFormDraft'
import { debounce } from '../utils/debounce'

/**
 * Debounced persistence of react-hook-form values under a stable draft storage key.
 * Clear storage separately (after user confirm), then reset the form to baseline if needed.
 */
export function useFormDraft<T extends FieldValues>({
  draftKey,
  baseline,
  watch,
  reset,
}: {
  draftKey?: string
  baseline: T
  watch: UseFormWatch<T>
  reset: UseFormReset<T>
}) {
  const baselineRef = useRef(baseline)

  useEffect(() => {
    baselineRef.current = baseline
  }, [baseline])

  const debouncedSave = useMemo(() => {
    if (!draftKey) return null
    return debounce((payload: FormDraftValues) => {
      saveFormDraftUseCase(draftKey, payload)
    }, FORM_DRAFT_DEBOUNCE_MS)
  }, [draftKey])

  useEffect(() => () => debouncedSave?.cancel(), [debouncedSave])

  useEffect(() => {
    if (!debouncedSave) return
    const sub = watch((formValues) => {
      debouncedSave(formValues as FormDraftValues)
    })
    return () => {
      debouncedSave.cancel()
      sub.unsubscribe()
    }
  }, [watch, debouncedSave])

  const resetToBaseline = useCallback(() => {
    reset(baselineRef.current)
  }, [reset])

  return {
    resetToBaseline,
  }
}
