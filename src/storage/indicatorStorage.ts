import type { Indicator } from '../domain/indicator.types'

const INDICATORS_KEY = 'indicators'

function readIndicators(): Indicator[] {
  const raw = localStorage.getItem(INDICATORS_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Indicator[]
  } catch {
    return []
  }
}

function writeIndicators(indicators: Indicator[]): void {
  localStorage.setItem(INDICATORS_KEY, JSON.stringify(indicators))
}

export function addIndicator(indicator: Indicator): void {
  const indicators = readIndicators()
  indicators.push(indicator)
  writeIndicators(indicators)
}

export function loadIndicators(): Indicator[] {
  return readIndicators()
}
