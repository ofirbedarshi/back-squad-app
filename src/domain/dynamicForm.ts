import type { FormSchema, FormValues, RowableField } from './dynamicForm.types'

export function extractDefaultValues(schema: FormSchema): FormValues {
  const values: FormValues = {}

  for (const field of schema.fields) {
    if (field.type === 'header') continue

    if (field.type === 'row') {
      for (const child of field.fields) {
        collectDefault(child, values)
      }
      continue
    }

    collectDefault(field, values)
  }

  return values
}

function collectDefault(field: RowableField, values: FormValues): void {
  if (field.defaultValue !== undefined) {
    values[field.key] = field.defaultValue
  }
}
