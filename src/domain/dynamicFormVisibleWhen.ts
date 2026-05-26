import type { FormValues } from './dynamicForm.types'

export type FormFieldVisibleCondition =
  | { field: string; equals: string | boolean }
  | { field: string; greaterThan: number }

export interface FormFieldVisibleWhenOr {
  or: FormFieldVisibleCondition[]
}

export type FormFieldVisibleWhen = FormFieldVisibleCondition | FormFieldVisibleWhenOr

function matchesVisibleCondition(
  condition: FormFieldVisibleCondition,
  values: FormValues,
): boolean {
  const value = values[condition.field]
  if ('equals' in condition) {
    return value === condition.equals
  }
  const numeric =
    typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN
  return Number.isFinite(numeric) && numeric > condition.greaterThan
}

export function isFormFieldVisibleWhen(
  visibleWhen: FormFieldVisibleWhen,
  values: FormValues,
): boolean {
  if ('or' in visibleWhen) {
    return visibleWhen.or.some((condition) => matchesVisibleCondition(condition, values))
  }
  return matchesVisibleCondition(visibleWhen, values)
}

export function collectVisibleWhenWatchKeys(visibleWhen: FormFieldVisibleWhen): string[] {
  if ('or' in visibleWhen) {
    return [...new Set(visibleWhen.or.map((condition) => condition.field))]
  }
  return [visibleWhen.field]
}
