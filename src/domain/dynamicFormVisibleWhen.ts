import type { FormValues } from './dynamicForm.types'

export interface FormFieldVisibleCondition {
  field: string
  equals: string | boolean
}

export interface FormFieldVisibleWhenOr {
  or: FormFieldVisibleCondition[]
}

export type FormFieldVisibleWhen = FormFieldVisibleCondition | FormFieldVisibleWhenOr

function matchesVisibleCondition(
  condition: FormFieldVisibleCondition,
  values: FormValues,
): boolean {
  return values[condition.field] === condition.equals
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
