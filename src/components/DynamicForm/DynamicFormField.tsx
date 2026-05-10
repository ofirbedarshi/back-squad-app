import { Controller } from 'react-hook-form'
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form'
import FormField from '../FormField'
import Input from '../Input'
import SegmentedToggle from '../base/SegmentedToggle'
import Checkbox from '../base/Checkbox'
import CoordinateInput from '../base/CoordinateInput'
import type { CoordinateValue, FormFieldDef, FormValues, RowableField } from '../../domain/dynamicForm.types'

interface DynamicFormFieldProps {
  field: FormFieldDef
  control: Control<FormValues>
  register: UseFormRegister<FormValues>
  errors: FieldErrors<FormValues>
}

function DynamicFormField({ field, control, register, errors }: DynamicFormFieldProps) {
  if (field.type === 'row') {
    return (
      <div className="flex gap-3">
        {field.fields.map((child: RowableField) => (
          <div key={child.key} className="flex-1 min-w-0">
            <DynamicFormField field={child} control={control} register={register} errors={errors} />
          </div>
        ))}
      </div>
    )
  }

  if (field.type === 'header') {
    return field.bold
      ? <h2 className="text-base font-bold underline text-neutral-800 pt-2">{field.text}</h2>
      : <h3 className="text-sm font-semibold text-neutral-500">{field.text}</h3>
  }

  if (field.type === 'text') {
    const error = errors[field.key]
    const errorMessage = error && 'message' in error ? (error.message as string) : undefined
    return (
      <FormField label={field.label} error={errorMessage}>
        <Input
          type="text"
          placeholder={field.placeholder}
          hasError={!!error}
          {...register(field.key)}
        />
      </FormField>
    )
  }

  if (field.type === 'date') {
    const error = errors[field.key]
    const errorMessage = error && 'message' in error ? (error.message as string) : undefined
    return (
      <FormField label={field.label} error={errorMessage}>
        <Input type="date" hasError={!!error} {...register(field.key)} />
      </FormField>
    )
  }

  if (field.type === 'time') {
    const error = errors[field.key]
    const errorMessage = error && 'message' in error ? (error.message as string) : undefined
    return (
      <FormField label={field.label} error={errorMessage}>
        <Input type="time" hasError={!!error} {...register(field.key)} />
      </FormField>
    )
  }

  if (field.type === 'toggle') {
    return (
      <FormField label={field.label}>
        <Controller
          name={field.key}
          control={control}
          defaultValue={field.defaultValue ?? field.options[0]}
          render={({ field: formField }) => (
            <SegmentedToggle
              options={field.options.map(opt => ({ label: opt, value: opt }))}
              value={typeof formField.value === 'string' ? formField.value : field.options[0]}
              onChange={formField.onChange}
            />
          )}
        />
      </FormField>
    )
  }

  if (field.type === 'checkbox') {
    return (
      <Controller
        name={field.key}
        control={control}
        defaultValue={field.defaultValue ?? false}
        render={({ field: formField }) => (
          <Checkbox
            label={field.label}
            checked={formField.value === true}
            onChange={formField.onChange}
          />
        )}
      />
    )
  }

  if (field.type === 'coords') {
    const error = errors[field.key]
    const errorMessage = error && 'message' in error ? (error.message as string) : undefined
    return (
      <FormField label={field.label} error={errorMessage}>
        <Controller
          name={field.key}
          control={control}
          render={({ field: formField }) => {
            const coordValue =
              typeof formField.value === 'object' && formField.value !== null
                ? (formField.value as CoordinateValue)
                : undefined
            return (
              <CoordinateInput
                value={coordValue}
                onChange={formField.onChange}
                hasError={!!error}
              />
            )
          }}
        />
      </FormField>
    )
  }

  return null
}

export default DynamicFormField
