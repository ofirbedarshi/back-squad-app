import type { FormDraftValues } from './formDraft.types'

export function shallowMergeBaselineWithDraft<T extends Record<string, unknown>>(
  baseline: T,
  draft: FormDraftValues | null,
): T {
  if (!draft) return baseline
  return { ...baseline, ...draft } as T
}
