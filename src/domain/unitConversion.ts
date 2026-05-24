const MILS_PER_FULL_CIRCLE = 6400

const METERS_TO_FEET = 3.28083989501312

export function degreesToMils(degrees: number): number {
  if (!Number.isFinite(degrees)) {
    throw new Error('degrees must be a finite number')
  }
  return (degrees * MILS_PER_FULL_CIRCLE) / 360
}

export function metersToFeet(meters: number): number {
  if (!Number.isFinite(meters)) {
    throw new Error('meters must be a finite number')
  }
  return meters * METERS_TO_FEET
}

export function milsToDegrees(mils: number): number {
  if (!Number.isFinite(mils)) {
    throw new Error('mils must be a finite number')
  }
  return (mils * 360) / MILS_PER_FULL_CIRCLE
}

export function feetToMeters(feet: number): number {
  if (!Number.isFinite(feet)) {
    throw new Error('feet must be a finite number')
  }
  return feet / METERS_TO_FEET
}

export function formatConvertedNumberForDisplay(value: number): string {
  if (!Number.isFinite(value)) {
    throw new Error('value must be a finite number')
  }
  return new Intl.NumberFormat('he-IL', {
    maximumFractionDigits: 4,
    minimumFractionDigits: 0,
  }).format(value)
}
