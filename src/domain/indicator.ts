import type { Indicator, IndicatorInput } from './indicator.types'

export function createIndicator(input: IndicatorInput): Indicator {
  return {
    ...input,
    id: crypto.randomUUID(),
    savedAt: new Date().toISOString(),
  }
}
