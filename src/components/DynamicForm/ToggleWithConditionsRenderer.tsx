import { Controller } from 'react-hook-form'
import FormField from '../FormField'
import SegmentedToggle from '../base/SegmentedToggle'
import { makeFieldValidator } from '../../domain/dynamicFormValidation'
import type { ToggleWithConditionsRendererProps } from './ToggleWithConditionsRenderer.types'

export default function ToggleWithConditionsRenderer({
  field,
  control,
  errors,
  getValues,
  parentByKey,
  renderConditionalField,
}: ToggleWithConditionsRendererProps) {
  const error = errors[field.key]
  const errorMessage = error && 'message' in error ? (error.message as string) : undefined

  return (
    <Controller
      name={field.key}
      control={control}
      defaultValue={field.defaultValue}
      rules={{ validate: makeFieldValidator(field, getValues, parentByKey) }}
      render={({ field: formField }) => {
        const currentValue =
          typeof formField.value === 'string' && formField.value.trim() !== ''
            ? formField.value
            : undefined
        const conditionalFields = currentValue ? (field.conditions[currentValue] ?? []) : []
        return (
          <div className="flex flex-col gap-3">
            <FormField label={field.label} error={errorMessage}>
              <SegmentedToggle
                options={field.options.map((opt) => ({ label: opt, value: opt }))}
                value={currentValue}
                onChange={formField.onChange}
                allowDeselect={field.required !== true}
              />
            </FormField>
            {conditionalFields.map((child, i) => renderConditionalField(child, i))}
          </div>
        )
      }}
    />
  )
}
