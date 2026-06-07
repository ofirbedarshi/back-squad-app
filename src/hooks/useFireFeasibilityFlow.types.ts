export type FireFeasibilityStep = 'form' | 'results'

export function getNextStepAfterForm(): FireFeasibilityStep {
  return 'results'
}
