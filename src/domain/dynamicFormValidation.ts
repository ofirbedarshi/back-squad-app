import type { CoordinateValue } from './dynamicForm.types'
import type {
  FormFieldDef,
  FormSchema,
  FormValues,
  RowableField,
  TextField,
  ToggleWithConditionsField,
} from './dynamicForm.types'

export const REQUIRED_FIELD_MESSAGE = 'שדה חובה'

type ValidatableFieldType =
  | 'text'
  | 'number'
  | 'date'
  | 'time'
  | 'toggle'
  | 'toggleWithConditions'
  | 'coords'
  | 'checkbox'
  | 'targetLoader'
  | 'indicatorLoader'
  | 'currentPositionLoader'

function isComputedTextField(field: TextField): boolean {
  return field.computedFrom === 'indicatorToTarget' && !!field.computedMetric
}

function isCoordsFilled(value: unknown): boolean {
  if (typeof value !== 'object' || value === null) return false
  const coords = value as CoordinateValue
  return (
    coords.east.trim() !== '' &&
    coords.north.trim() !== '' &&
    coords.palach.trim() !== ''
  )
}

export function isFilledFormValue(
  value: unknown,
  fieldType: ValidatableFieldType,
  options?: readonly string[],
): boolean {
  switch (fieldType) {
    case 'text':
    case 'date':
    case 'time':
      return typeof value === 'string' && value.trim() !== ''
    case 'number':
      return typeof value === 'number' && !Number.isNaN(value)
    case 'toggle':
    case 'toggleWithConditions':
      return (
        typeof value === 'string' &&
        value.trim() !== '' &&
        (options === undefined || options.includes(value))
      )
    case 'coords':
      return isCoordsFilled(value)
    case 'checkbox':
      return value === true
    case 'targetLoader':
    case 'indicatorLoader':
    case 'currentPositionLoader':
      return typeof value === 'string' && value.trim() !== ''
    default:
      return false
  }
}

function getToggleWithConditionsParentKeys(
  schema: FormSchema,
): Map<string, ToggleWithConditionsField> {
  const parents = new Map<string, ToggleWithConditionsField>()

  function walkField(field: FormFieldDef): void {
    if (field.type === 'row') {
      for (const child of field.fields) walkRowable(child)
      return
    }
    if (field.type === 'toggleWithConditions') {
      for (const branch of Object.values(field.conditions)) {
        if (!branch) continue
        for (const child of branch) {
          if ('key' in child) {
            parents.set(child.key, field)
          }
          walkField(child)
        }
      }
    }
  }

  function walkRowable(field: RowableField): void {
    if (field.type === 'toggleWithConditions') {
      for (const branch of Object.values(field.conditions)) {
        if (!branch) continue
        for (const child of branch) walkField(child)
      }
    }
  }

  for (const field of schema.fields) {
    walkField(field)
  }

  return parents
}

export function isFieldVisible(
  field: FormFieldDef | RowableField,
  values: FormValues,
  parentByKey: Map<string, ToggleWithConditionsField>,
): boolean {
  if (!('key' in field)) return false

  const parent = parentByKey.get(field.key)
  if (!parent) return true

  const parentValue = values[parent.key]
  if (typeof parentValue !== 'string' || parentValue.trim() === '') return false

  const branch = parent.conditions[parentValue]
  if (!branch) return false

  return branch.some((child) => fieldKeyMatches(child, field.key))
}

function fieldKeyMatches(field: FormFieldDef, key: string): boolean {
  if ('key' in field && field.key === key) return true
  if (field.type === 'row') {
    return field.fields.some((child) => 'key' in child && child.key === key)
  }
  return false
}

export function shouldValidateField(
  field: FormFieldDef | RowableField,
  values: FormValues,
  parentByKey: Map<string, ToggleWithConditionsField>,
): boolean {
  if (!('key' in field)) return false
  if (field.type === 'text' && isComputedTextField(field)) return false
  if ('lockedByRef' in field && field.lockedByRef) return false
  if (field.required !== true) return false
  return isFieldVisible(field, values, parentByKey)
}

export function validateFieldValue(
  field: FormFieldDef | RowableField,
  value: unknown,
): true | string {
  if (!('key' in field) || field.required !== true) return true

  if (field.type === 'text' || field.type === 'date' || field.type === 'time') {
    return isFilledFormValue(value, field.type) || REQUIRED_FIELD_MESSAGE
  }
  if (field.type === 'number') {
    return isFilledFormValue(value, 'number') || REQUIRED_FIELD_MESSAGE
  }
  if (field.type === 'toggle') {
    return isFilledFormValue(value, 'toggle', field.options) || REQUIRED_FIELD_MESSAGE
  }
  if (field.type === 'toggleWithConditions') {
    return isFilledFormValue(value, 'toggleWithConditions', field.options) || REQUIRED_FIELD_MESSAGE
  }
  if (field.type === 'coords') {
    return isFilledFormValue(value, 'coords') || REQUIRED_FIELD_MESSAGE
  }
  if (field.type === 'checkbox') {
    return isFilledFormValue(value, 'checkbox') || REQUIRED_FIELD_MESSAGE
  }
  if (
    field.type === 'targetLoader' ||
    field.type === 'indicatorLoader' ||
    field.type === 'currentPositionLoader'
  ) {
    return isFilledFormValue(value, field.type) || REQUIRED_FIELD_MESSAGE
  }

  return true
}

export function buildParentByKeyMap(schema: FormSchema): Map<string, ToggleWithConditionsField> {
  return getToggleWithConditionsParentKeys(schema)
}

export function makeFieldValidator(
  field: FormFieldDef | RowableField,
  getValues: () => FormValues,
  parentByKey: Map<string, ToggleWithConditionsField>,
): (value: unknown) => true | string {
  return (value: unknown) => {
    const values = getValues()
    if (!shouldValidateField(field, values, parentByKey)) return true
    const result = validateFieldValue(field, value)
    return result === true ? true : result
  }
}

export function validateFormValues(
  schema: FormSchema,
  values: FormValues,
): Record<string, string> {
  const errors: Record<string, string> = {}
  const parentByKey = buildParentByKeyMap(schema)

  function validateField(field: FormFieldDef | RowableField): void {
    if (!shouldValidateField(field, values, parentByKey)) return
    if (!('key' in field)) return

    const result = validateFieldValue(field, values[field.key])
    if (result !== true) {
      errors[field.key] = result
    }
  }

  function walk(field: FormFieldDef): void {
    if (field.type === 'row') {
      for (const child of field.fields) validateField(child)
      return
    }
    if (field.type === 'toggleWithConditions') {
      validateField(field)
      const parentValue = values[field.key]
      if (typeof parentValue === 'string') {
        const branch = field.conditions[parentValue]
        if (branch) {
          for (const child of branch) walk(child)
        }
      }
      return
    }
    validateField(field)
  }

  for (const field of schema.fields) {
    walk(field)
  }

  return errors
}
