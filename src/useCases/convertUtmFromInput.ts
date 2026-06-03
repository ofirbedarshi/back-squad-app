import { latLngToUtm, utmToLatLng } from '../domain/utmConversion'
import { parseFiniteNumberFromInput } from './convertUnitsFromInput'

function formatUtmMetersForDisplay(value: number): string {
  return String(Math.round(value))
}

function formatLatLngDegreesForDisplay(value: number): string {
  const rounded = Math.round(value * 1e6) / 1e6
  return Number(rounded.toFixed(6)).toString()
}

function formatUtmZoneForDisplay(zone: number): string {
  return `${zone}N`
}

export type UtmConversionDisplayLine = {
  label: string
  value: string
}

export type UtmConversionDisplayResult =
  | { status: 'empty' }
  | { status: 'error'; message: string }
  | { status: 'ok'; lines: UtmConversionDisplayLine[] }

function parseRequiredNumber(raw: string): number | 'missing' | 'invalid' {
  const trimmed = raw.trim()
  if (trimmed === '') {
    return 'missing'
  }
  const n = parseFiniteNumberFromInput(raw)
  if (n === null) {
    return 'invalid'
  }
  return n
}

function parseZone(raw: string): number | 'missing' | 'invalid' {
  const trimmed = raw.trim()
  if (trimmed === '') {
    return 'missing'
  }
  const n = parseFiniteNumberFromInput(raw)
  if (n === null || !Number.isInteger(n)) {
    return 'invalid'
  }
  return n
}

const NORTHERN_HEMISPHERE = true

function runConversion<T>(fn: () => T): T | UtmConversionDisplayResult {
  try {
    return fn()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'המרה נכשלה'
    return { status: 'error', message }
  }
}

export interface UtmToLatLngInput {
  easting: string
  northing: string
  zone: string
}

export function convertUtmToLatLngDisplay(input: UtmToLatLngInput): UtmConversionDisplayResult {
  const easting = parseRequiredNumber(input.easting)
  const northing = parseRequiredNumber(input.northing)
  const zone = parseZone(input.zone)

  if (easting === 'missing' && northing === 'missing' && zone === 'missing') {
    return { status: 'empty' }
  }

  if (easting === 'missing' || northing === 'missing' || zone === 'missing') {
    return { status: 'error', message: 'יש למלא מזרח, צפון ופלח UTM' }
  }
  if (easting === 'invalid') {
    return { status: 'error', message: 'מזרח: יש להזין מספר תקין' }
  }
  if (northing === 'invalid') {
    return { status: 'error', message: 'צפון: יש להזין מספר תקין' }
  }
  if (zone === 'invalid') {
    return { status: 'error', message: 'פלח UTM חייב להיות מספר שלם בין 1 ל-60' }
  }

  const result = runConversion(() =>
    utmToLatLng({
      easting,
      northing,
      zone,
      northernHemisphere: NORTHERN_HEMISPHERE,
    })
  )

  if ('status' in result) {
    return result
  }

  return {
    status: 'ok',
    lines: [
      { label: 'קו רוחב', value: formatLatLngDegreesForDisplay(result.latitude) },
      { label: 'קו אורך', value: formatLatLngDegreesForDisplay(result.longitude) },
    ],
  }
}

export interface LatLngToUtmInput {
  latitude: string
  longitude: string
  zone: string
}

export function convertLatLngToUtmDisplay(input: LatLngToUtmInput): UtmConversionDisplayResult {
  const latitude = parseRequiredNumber(input.latitude)
  const longitude = parseRequiredNumber(input.longitude)
  const zone = parseZone(input.zone)

  if (latitude === 'missing' && longitude === 'missing' && zone === 'missing') {
    return { status: 'empty' }
  }

  if (latitude === 'missing' || longitude === 'missing' || zone === 'missing') {
    return { status: 'error', message: 'יש למלא קו רוחב, קו אורך ופלח UTM' }
  }
  if (latitude === 'invalid') {
    return { status: 'error', message: 'קו רוחב: יש להזין מספר תקין' }
  }
  if (longitude === 'invalid') {
    return { status: 'error', message: 'קו אורך: יש להזין מספר תקין' }
  }
  if (zone === 'invalid') {
    return { status: 'error', message: 'פלח UTM חייב להיות מספר שלם בין 1 ל-60' }
  }

  const result = runConversion(() =>
    latLngToUtm({
      latitude,
      longitude,
      zone,
      northernHemisphere: NORTHERN_HEMISPHERE,
    })
  )

  if ('status' in result) {
    return result
  }

  return {
    status: 'ok',
    lines: [
      { label: 'מזרח', value: formatUtmMetersForDisplay(result.easting) },
      { label: 'צפון', value: formatUtmMetersForDisplay(result.northing) },
      { label: 'פלח', value: formatUtmZoneForDisplay(result.zone) },
    ],
  }
}

export function utmConversionResultToView(
  result: UtmConversionDisplayResult
): { kind: 'placeholder' } | { kind: 'error'; message: string } | { kind: 'ok'; lines: UtmConversionDisplayLine[] } {
  if (result.status === 'empty') {
    return { kind: 'placeholder' }
  }
  if (result.status === 'error') {
    return { kind: 'error', message: result.message }
  }
  return { kind: 'ok', lines: result.lines }
}
