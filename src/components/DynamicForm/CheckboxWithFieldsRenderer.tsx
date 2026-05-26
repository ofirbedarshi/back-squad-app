import { Controller } from 'react-hook-form'
import CheckboxWithFields from '../base/CheckboxWithFields'
import { shouldHighlightCheckboxWithFieldsBorder } from '../../domain/dynamicFormHighlight'
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

function getHighlightBorderWatchKeys(
  highlightBorderWhen: CheckboxWithFieldsRendererProps['field']['highlightBorderWhen'],
): string[] {
  if (!highlightBorderWhen?.length) return []
  return [...new Set(highlightBorderWhen.map((rule) => rule.field))]
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
  const highlightWatchKeys = getHighlightBorderWatchKeys(field.highlightBorderWhen)
  watch([...nestedKeys, ...highlightWatchKeys])

  const highlightBorder = shouldHighlightCheckboxWithFieldsBorder(
    field.highlightBorderWhen,
    getValues(),
  )

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
          highlightBorder={highlightBorder}
        >
          {field.fields.map((child, index) => renderNestedField(child, index))}
        </CheckboxWithFields>
      )}
    />
  )
}
