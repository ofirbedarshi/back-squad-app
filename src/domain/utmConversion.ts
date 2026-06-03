import proj4 from 'proj4'
import type {
  LatLngCoordinateInput,
  LatLngResult,
  UtmCoordinateInput,
  UtmResult,
} from './utmConversion.types'

const WGS84 = 'EPSG:4326'

export function buildUtmProj4Definition(zone: number, northernHemisphere: boolean): string {
  validateZone(zone)
  const south = northernHemisphere ? '' : ' +south'
  return `+proj=utm +zone=${zone} +datum=WGS84 +units=m +no_defs${south}`
}

function validateZone(zone: number): void {
  if (!Number.isFinite(zone) || !Number.isInteger(zone) || zone < 1 || zone > 60) {
    throw new Error('פלח UTM חייב להיות מספר שלם בין 1 ל-60')
  }
}

function validateEastingNorthing(value: number, label: string): void {
  if (!Number.isFinite(value)) {
    throw new Error(`${label}: יש להזין מספר תקין`)
  }
}

function validateLatitude(latitude: number): void {
  if (!Number.isFinite(latitude)) {
    throw new Error('קו רוחב: יש להזין מספר תקין')
  }
  if (latitude < -90 || latitude > 90) {
    throw new Error('קו רוחב חייב להיות בין 90- ל-90')
  }
}

function validateLongitude(longitude: number): void {
  if (!Number.isFinite(longitude)) {
    throw new Error('קו אורך: יש להזין מספר תקין')
  }
  if (longitude < -180 || longitude > 180) {
    throw new Error('קו אורך חייב להיות בין 180- ל-180')
  }
}

export function utmToLatLng(input: UtmCoordinateInput): LatLngResult {
  validateEastingNorthing(input.easting, 'מזרח')
  validateEastingNorthing(input.northing, 'צפון')
  validateZone(input.zone)

  const utmDef = buildUtmProj4Definition(input.zone, input.northernHemisphere)
  const [longitude, latitude] = proj4(utmDef, WGS84, [input.easting, input.northing])

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    throw new Error('המרה נכשלה — בדוק את הערכים שהוזנו')
  }

  return { latitude, longitude }
}

export function latLngToUtm(input: LatLngCoordinateInput): UtmResult {
  validateLatitude(input.latitude)
  validateLongitude(input.longitude)
  validateZone(input.zone)

  const utmDef = buildUtmProj4Definition(input.zone, input.northernHemisphere)
  const [easting, northing] = proj4(WGS84, utmDef, [input.longitude, input.latitude])

  if (!Number.isFinite(easting) || !Number.isFinite(northing)) {
    throw new Error('המרה נכשלה — בדוק את הערכים שהוזנו')
  }

  return {
    easting,
    northing,
    zone: input.zone,
    northernHemisphere: input.northernHemisphere,
  }
}
