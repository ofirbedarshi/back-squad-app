import {
  degreesToMils,
  feetToMeters,
  formatConvertedNumberForDisplay,
  metersToFeet,
  milsToDegrees,
} from '../domain/unitConversion'

function parseFiniteNumberFromInput(raw: string): number | null {
  const normalized = raw.trim().replaceAll(',', '.')
  if (normalized === '') {
    return null
  }
  const n = Number(normalized)
  if (!Number.isFinite(n)) {
    return null
  }
  return n
}

export function convertDegreesInputToMilsDisplay(raw: string): string {
  const n = parseFiniteNumberFromInput(raw)
  if (n === null) {
    return '-'
  }
  return formatConvertedNumberForDisplay(degreesToMils(n))
}

export function convertMetersInputToFeetDisplay(raw: string): string {
  const n = parseFiniteNumberFromInput(raw)
  if (n === null) {
    return '-'
  }
  return formatConvertedNumberForDisplay(metersToFeet(n))
}

export function convertMilsInputToDegreesDisplay(raw: string): string {
  const n = parseFiniteNumberFromInput(raw)
  if (n === null) {
    return '-'
  }
  return formatConvertedNumberForDisplay(milsToDegrees(n))
}

export function convertFeetInputToMetersDisplay(raw: string): string {
  const n = parseFiniteNumberFromInput(raw)
  if (n === null) {
    return '-'
  }
  return formatConvertedNumberForDisplay(feetToMeters(n))
}
