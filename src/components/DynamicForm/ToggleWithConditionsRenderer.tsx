import { Controller } from 'react-hook-form'
import FormField from '../FormField'
import SegmentedToggle from '../base/SegmentedToggle'
import type { ToggleWithConditionsRendererProps } from './ToggleWithConditionsRenderer.types'

export default function ToggleWithConditionsRenderer({
  field,
  control,
  renderConditionalField,
}: ToggleWithConditionsRendererProps) {
  return (
    <Controller
      name={field.key}
      control={control}
      defaultValue={field.defaultValue ?? field.options[0]}
      render={({ field: formField }) => {
        const currentValue =
          typeof formField.value === 'string' ? formField.value : field.options[0]
        const conditionalFields = field.conditions[currentValue] ?? []
        return (
          <div className="flex flex-col gap-3">
            <FormField label={field.label}>
              <SegmentedToggle
                options={field.options.map((opt) => ({ label: opt, value: opt }))}
                value={currentValue}
                onChange={formField.onChange}
              />
            </FormField>
            {conditionalFields.map((child, i) => renderConditionalField(child, i))}
          </div>
        )
      }}
    />
  )
}
