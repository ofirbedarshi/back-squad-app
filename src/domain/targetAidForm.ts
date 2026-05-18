import { extractDefaultValues } from './dynamicForm'
import type { CoordinateValue, FormValues } from './dynamicForm.types'
import { targetAidFormSchema } from './targetAidForm.schema'

function isCoordinateValueShape(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && 'east' in v && 'north' in v && 'palach' in v
}

function normalizeCoordinateValue(raw: unknown): CoordinateValue {
  if (!isCoordinateValueShape(raw)) {
    return { east: '', north: '', palach: '' }
  }
  return {
    east: typeof raw.east === 'string' ? raw.east : '',
    north: typeof raw.north === 'string' ? raw.north : '',
    palach: typeof raw.palach === 'string' ? raw.palach : '',
  }
}

export function createDefaultTargetAidForm(): FormValues {
  return extractDefaultValues(targetAidFormSchema)
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

export function normalizeTargetAidForm(raw: unknown): FormValues {
  const defaults = extractDefaultValues(targetAidFormSchema)
  if (raw === null || raw === undefined || typeof raw !== 'object' || Array.isArray(raw)) {
    return defaults
  }

  const input = raw as Record<string, unknown>
  const result: FormValues = { ...defaults }

  for (const key of Object.keys(input)) {
    const incoming = input[key]
    if (incoming === undefined) continue

    if (key === 'timeOfFlight') {
      const n = optionalNumberFromUnknown(incoming)
      if (n !== undefined) {
        result[key] = n
      }
      continue
    }

    const template = result[key]

    if (template !== undefined) {
      if (typeof template === 'object' && template !== null && 'east' in template) {
        result[key] = normalizeCoordinateValue(incoming)
        continue
      }
      if (typeof template === 'number') {
        result[key] = typeof incoming === 'number' && !Number.isNaN(incoming) ? incoming : template
        continue
      }
      if (typeof template === 'boolean') {
        result[key] = typeof incoming === 'boolean' ? incoming : template
        continue
      }
      if (typeof template === 'string') {
        result[key] = typeof incoming === 'string' ? incoming : template
        continue
      }
    }

    if (typeof incoming === 'string' || typeof incoming === 'number' || typeof incoming === 'boolean') {
      result[key] = incoming
      continue
    }
    if (isCoordinateValueShape(incoming)) {
      result[key] = normalizeCoordinateValue(incoming)
    }
  }

  return result
}
