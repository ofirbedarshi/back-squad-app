export type FireFeasibilityStep = 'links' | 'form' | 'results'

export function getNextStepAfterForm(): FireFeasibilityStep {
  return 'results'
}
