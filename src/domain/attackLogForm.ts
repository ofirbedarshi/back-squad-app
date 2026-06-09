import { extractDefaultValues } from './dynamicForm'
import type { CoordinateValue, FormValues } from './dynamicForm.types'
import type { AttackLogInput } from './attackLog.types'
import type { PositionCoordinates } from './position.types'
import { attackLogFormSchema } from './attackLogForm.schema'

const WAS_ATTACKED_TO_FORM: Record<NonNullable<AttackLogInput['wasAttacked']>, string> = {
  yes: 'כן',
  no: 'לא',
}

const WAS_ATTACKED_FROM_FORM: Record<string, AttackLogInput['wasAttacked']> = {
  כן: 'yes',
  לא: 'no',
}

const GENERATION_TO_FORM: Record<NonNullable<AttackLogInput['generation']>, string> = {
  a: 'דור א׳',
  b: 'דור ב׳',
}

const GENERATION_FROM_FORM: Record<string, AttackLogInput['generation']> = {
  'דור א׳': 'a',
  'דור ב׳': 'b',
}

function isCoordinateValueShape(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && 'east' in v && 'north' in v && 'palach' in v
}

function normalizeCoordinateValue(raw: unknown): CoordinateValue | undefined {
  if (!isCoordinateValueShape(raw)) {
    return undefined
  }
  const east = typeof raw.east === 'string' ? raw.east : ''
  const north = typeof raw.north === 'string' ? raw.north : ''
  const palach = typeof raw.palach === 'string' ? raw.palach : ''
  if (east === '' && north === '' && palach === '') {
    return undefined
  }
  return { east, north, palach }
}

function toPositionCoordinates(value: CoordinateValue | undefined): PositionCoordinates | undefined {
  if (!value || (value.east === '' && value.north === '')) {
    return undefined
  }
  return {
    east: value.east,
    north: value.north,
    palach: value.palach,
  }
}

function optionalNumberFromUnknown(raw: unknown): number | undefined {
  if (typeof raw === 'number' && !Number.isNaN(raw)) {
    return raw
  }
  if (typeof raw === 'string' && raw.trim() !== '') {
    const n = Number(raw.replace(',', '.'))
    if (!Number.isNaN(n)) {
      return n
    }
  }
  return undefined
}

function optionalStringFromUnknown(raw: unknown): string | undefined {
  if (typeof raw === 'string' && raw.trim() !== '') {
    return raw
  }
  return undefined
}

function optionalToggleChoice<T extends string>(raw: unknown): T | undefined {
  if (typeof raw !== 'string' || raw.trim() === '' || raw === 'ללא') {
    return undefined
  }
  return raw as T
}

function optionalCloudBaseAltitudeUnit(
  raw: unknown,
): AttackLogInput['cloudBaseAltitudeUnit'] | undefined {
  if (raw === 'מטר' || raw === 'רגל') {
    return raw
  }
  return undefined
}

function optionalStringArrayFromUnknown(raw: unknown): string[] | undefined {
  if (!Array.isArray(raw)) {
    return undefined
  }
  const values = raw.filter((v): v is string => typeof v === 'string' && v.trim() !== '')
  return values.length > 0 ? values : undefined
}

function optionalLoaderId(raw: unknown): string | undefined {
  if (typeof raw === 'string' && raw.trim() !== '') {
    return raw
  }
  return undefined
}

function numberToFormString(value: number | undefined): string {
  if (value === undefined || Number.isNaN(value)) {
    return ''
  }
  return String(value)
}

export function formValuesToAttackLogInput(values: FormValues): AttackLogInput {
  const wasAttackedRaw = values.wasAttacked
  const wasAttacked =
    typeof wasAttackedRaw === 'string' ? WAS_ATTACKED_FROM_FORM[wasAttackedRaw] ?? 'no' : 'no'

  const generationRaw = values.generation
  const generation =
    typeof generationRaw === 'string' ? GENERATION_FROM_FORM[generationRaw] ?? 'a' : 'a'

  const stationCoordinates = normalizeCoordinateValue(values.stationCoordinates)
  const targetCoordinates = normalizeCoordinateValue(values.targetCoordinates)
  const indicatorCoordinates = normalizeCoordinateValue(values.indicatorCoordinates)

  return {
    targetId: optionalLoaderId(values.targetId),
    stationPositionId: optionalLoaderId(values.stationPositionId),
    indicatorId: optionalLoaderId(values.indicatorId),
    targetName: typeof values.targetName === 'string' ? values.targetName : '',
    date: typeof values.date === 'string' ? values.date : '',
    wasAttacked,
    hit: values.hit === true,
    result: optionalStringFromUnknown(values.result),
    time: optionalStringFromUnknown(values.time),
    launcherType: optionalStringFromUnknown(values.launcherType),
    launcherId: optionalNumberFromUnknown(values.launcherId),
    aka: optionalStringFromUnknown(values.aka),
    pitch: optionalNumberFromUnknown(values.pitch),
    roll: optionalNumberFromUnknown(values.roll),
    vehicleEncryptionMethod: optionalStringArrayFromUnknown(values.vehicleEncryptionMethod),
    hivePosition: optionalNumberFromUnknown(values.hivePosition),
    generation,
    stationCoordinates: toPositionCoordinates(stationCoordinates),
    altitude: optionalNumberFromUnknown(values.altitude),
    targetCoordinates: toPositionCoordinates(targetCoordinates),
    stationTargetRange: optionalNumberFromUnknown(values.stationTargetRange),
    stationTargetAzimuth: optionalNumberFromUnknown(values.stationTargetAzimuth),
    stationTargetAltitudeDiff: optionalNumberFromUnknown(values.stationTargetAltitudeDiff),
    indicatorFactor: optionalNumberFromUnknown(values.indicatorFactor),
    indicatorMeans: optionalStringFromUnknown(values.indicatorMeans),
    indicatorCoordinates: toPositionCoordinates(indicatorCoordinates),
    indicatorTargetAzimuth: optionalNumberFromUnknown(values.indicatorTargetAzimuth),
    indicatorRange: optionalNumberFromUnknown(values.indicatorRange),
    apexAngle: optionalNumberFromUnknown(values.apexAngle),
    spotSizeWithoutSpread: optionalNumberFromUnknown(values.spotSizeWithoutSpread),
    targetFront: optionalStringFromUnknown(values.targetFront),
    wallAzimuth: optionalNumberFromUnknown(values.wallAzimuth),
    spotSizeWithSpread: optionalNumberFromUnknown(values.spotSizeWithSpread),
    cloudBaseAltitude: optionalNumberFromUnknown(values.cloudBaseAltitude),
    cloudBaseAltitudeUnit: optionalCloudBaseAltitudeUnit(values.cloudBaseAltitudeUnit),
    windSpeed: optionalNumberFromUnknown(values.windSpeed),
    flightPath: optionalStringFromUnknown(values.flightPath),
    offset: optionalToggleChoice<NonNullable<AttackLogInput['offset']>>(values.offset),
    directionality: optionalToggleChoice<NonNullable<AttackLogInput['directionality']>>(
      values.directionality,
    ),
    fuseType: optionalStringFromUnknown(values.fuseType),
  }
}

export function attackLogInputToFormValues(input: AttackLogInput): FormValues {
  const defaults = extractDefaultValues(attackLogFormSchema)
  const wasAttacked = input.wasAttacked ?? 'no'
  const generation = input.generation ?? 'a'

  const stationCoordinates: CoordinateValue = input.stationCoordinates
    ? {
        east: input.stationCoordinates.east,
        north: input.stationCoordinates.north,
        palach: input.stationCoordinates.palach,
      }
    : { east: '', north: '', palach: '' }

  const targetCoordinates: CoordinateValue = input.targetCoordinates
    ? {
        east: input.targetCoordinates.east,
        north: input.targetCoordinates.north,
        palach: input.targetCoordinates.palach,
      }
    : { east: '', north: '', palach: '' }

  const indicatorCoordinates: CoordinateValue = input.indicatorCoordinates
    ? {
        east: input.indicatorCoordinates.east,
        north: input.indicatorCoordinates.north,
        palach: input.indicatorCoordinates.palach,
      }
    : { east: '', north: '', palach: '' }

  return {
    ...defaults,
    targetId: input.targetId ?? '',
    stationPositionId: input.stationPositionId ?? '',
    indicatorId: input.indicatorId ?? '',
    targetName: input.targetName,
    date: input.date,
    wasAttacked: WAS_ATTACKED_TO_FORM[wasAttacked],
    hit: input.hit ?? false,
    result: input.result ?? '',
    time: input.time ?? '',
    launcherType: input.launcherType ?? '',
    launcherId: input.launcherId ?? defaults.launcherId,
    aka: input.aka ?? '',
    pitch: input.pitch ?? defaults.pitch,
    roll: input.roll ?? defaults.roll,
    vehicleEncryptionMethod: input.vehicleEncryptionMethod ?? [],
    hivePosition: input.hivePosition ?? defaults.hivePosition,
    generation: GENERATION_TO_FORM[generation],
    stationCoordinates,
    altitude: numberToFormString(input.altitude),
    targetCoordinates,
    targetAltitude: '',
    stationTargetRange: numberToFormString(input.stationTargetRange),
    stationTargetAzimuth: numberToFormString(input.stationTargetAzimuth),
    stationTargetAltitudeDiff: numberToFormString(input.stationTargetAltitudeDiff),
    indicatorFactor: numberToFormString(input.indicatorFactor),
    indicatorMeans: input.indicatorMeans ?? '',
    indicatorCoordinates,
    indicatorAltitude: '',
    indicatorTargetAzimuth: numberToFormString(input.indicatorTargetAzimuth),
    indicatorRange: numberToFormString(input.indicatorRange),
    apexAngle: input.apexAngle ?? defaults.apexAngle,
    spotSizeWithoutSpread: input.spotSizeWithoutSpread ?? defaults.spotSizeWithoutSpread,
    targetFront: input.targetFront ?? '',
    wallAzimuth: numberToFormString(input.wallAzimuth),
    spotSizeWithSpread: input.spotSizeWithSpread ?? defaults.spotSizeWithSpread,
    cloudBaseAltitude: input.cloudBaseAltitude ?? defaults.cloudBaseAltitude,
    cloudBaseAltitudeUnit: input.cloudBaseAltitudeUnit ?? defaults.cloudBaseAltitudeUnit,
    windSpeed: input.windSpeed ?? defaults.windSpeed,
    flightPath: input.flightPath ?? '',
    offset: input.offset ?? defaults.offset,
    directionality: input.directionality ?? '',
    fuseType: input.fuseType ?? '',
  }
}
