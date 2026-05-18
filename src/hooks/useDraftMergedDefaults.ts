import { useMemo } from 'react'
import { shallowMergeBaselineWithDraft } from '../domain/formDraftMerge'
import { loadFormDraftUseCase } from '../useCases/loadFormDraft'

/**
 * Baseline react-hook-form defaults merged with any stored draft for the same key.
 */
export function useDraftMergedDefaults<T extends Record<string, unknown>>(
  draftKey: string | undefined,
  baseline: T,
): T {
  return useMemo(() => {
    if (!draftKey) return baseline
    const stored = loadFormDraftUseCase(draftKey)
    return shallowMergeBaselineWithDraft(baseline, stored) as T
  }, [draftKey, baseline])
}
