import type { FormFieldDef, FormSchema, FormValues, RowableField } from './dynamicForm.types'

export function extractDefaultValues(schema: FormSchema): FormValues {
  const values: FormValues = {}

  for (const field of schema.fields) {
    collectDefaultFromFormFieldDef(field, values)
  }

  return values
}

function collectDefaultFromFormFieldDef(field: FormFieldDef, values: FormValues): void {
  if (
    field.type === 'header' ||
    field.type === 'note' ||
    field.type === 'targetLoader' ||
    field.type === 'indicatorLoader'
  ) return
  if (field.type === 'row') {
    for (const child of field.fields) {
      collectDefault(child, values)
    }
    return
  }
  collectDefault(field, values)
}

function collectDefault(field: RowableField, values: FormValues): void {
  if (field.type === 'note') return
  if (field.type === 'toggleWithConditions') {
    if (field.defaultValue !== undefined) {
      values[field.key] = field.defaultValue
    }
    const activeKey = field.defaultValue ?? field.options[0]
    const branch = field.conditions[activeKey]
    if (branch) {
      for (const child of branch) {
        collectDefaultFromFormFieldDef(child, values)
      }
    }
    return
  }
  if (field.defaultValue !== undefined) {
    values[field.key] = field.defaultValue
  }
}
