import { Controller } from 'react-hook-form'
import CheckboxWithFields from '../base/CheckboxWithFields'
import {
  areAllRowableFieldsFilled,
  makeFieldValidator,
} from '../../domain/dynamicFormValidation'
import type { CheckboxWithFieldsRendererProps } from './CheckboxWithFieldsRenderer.types'

function getNestedFieldKeys(fields: CheckboxWithFieldsRendererProps['field']['fields']): string[] {
  return fields.filter((child): child is typeof child & { key: string } => 'key' in child).map(
    (child) => child.key,
  )
}

export default function CheckboxWithFieldsRenderer({
  field,
  control,
  getValues,
  watch,
  parentByKey,
  renderNestedField,
}: CheckboxWithFieldsRendererProps) {
  const nestedKeys = getNestedFieldKeys(field.fields)
  watch(nestedKeys)

  return (
    <Controller
      name={field.key}
      control={control}
      defaultValue={field.defaultValue ?? false}
      rules={{ validate: makeFieldValidator(field, getValues, parentByKey) }}
      render={({ field: formField }) => (
        <CheckboxWithFields
          label={field.label}
          checked={formField.value === true}
          onChange={formField.onChange}
          allInputsFilled={areAllRowableFieldsFilled(getValues(), field.fields)}
        >
          {field.fields.map((child, index) => renderNestedField(child, index))}
        </CheckboxWithFields>
      )}
    />
  )
}
