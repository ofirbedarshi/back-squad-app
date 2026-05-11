import { Controller } from 'react-hook-form'
import type { Control, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import FormField from '../FormField'
import Input from '../Input'
import SegmentedToggle from '../base/SegmentedToggle'
import Checkbox from '../base/Checkbox'
import CoordinateInput from '../base/CoordinateInput'
import TargetLoaderField from './TargetLoaderField'
import IndicatorLoaderField from './IndicatorLoaderField'
import type { CoordinateValue, FormFieldDef, FormValues, RowableField } from '../../domain/dynamicForm.types'
import ToggleWithConditionsRenderer from './ToggleWithConditionsRenderer'

interface DynamicFormFieldProps {
  field: FormFieldDef
  control: Control<FormValues>
  register: UseFormRegister<FormValues>
  errors: FieldErrors<FormValues>
  setValue: UseFormSetValue<FormValues>
  watch: UseFormWatch<FormValues>
}

function DynamicFormField({ field, control, register, errors, setValue, watch }: DynamicFormFieldProps) {
  if (field.type === 'row') {
    return (
      <div className="flex gap-3">
        {field.fields.map((child: RowableField, index: number) => (
          <div
            key={child.type === 'note' ? `note-${index}` : child.key}
            className="flex-1 min-w-0"
          >
            <DynamicFormField field={child} control={control} register={register} errors={errors} setValue={setValue} watch={watch} />
          </div>
        ))}
      </div>
    )
  }

  if (field.type === 'note') {
    return (
      <p className="text-sm text-neutral-500 bg-neutral-100 rounded-xl px-3 py-2 leading-relaxed whitespace-pre-line">
        {field.text}
      </p>
    )
  }

  if (field.type === 'header') {
    return field.bold
      ? <h2 className="text-base font-bold underline text-neutral-800 pt-2">{field.text}</h2>
      : <h3 className="text-sm font-semibold text-neutral-500">{field.text}</h3>
  }

  if (field.type === 'targetLoader') {
    const currentTargetId = watch(field.key) as string | undefined
    return (
      <TargetLoaderField
        fieldDef={field}
        currentTargetId={currentTargetId || undefined}
        setValue={setValue}
        register={register}
        errors={errors}
      />
    )
  }

  if (field.type === 'indicatorLoader') {
    const currentIndicatorId = watch(field.key) as string | undefined
    return (
      <IndicatorLoaderField
        fieldDef={field}
        currentIndicatorId={currentIndicatorId || undefined}
        setValue={setValue}
        register={register}
        errors={errors}
      />
    )
  }

  if (field.type === 'text') {
    const error = errors[field.key]
    const errorMessage = error && 'message' in error ? (error.message as string) : undefined
    const isLocked = !!field.lockedByRef
    return (
      <FormField label={field.label} error={errorMessage} infoTooltipText={field.infoTooltipText}>
        <Input
          type="text"
          placeholder={field.placeholder}
          hasError={!!error}
          disabled={isLocked}
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

  if (field.type === 'toggleWithConditions') {
    return (
      <ToggleWithConditionsRenderer
        field={field}
        control={control}
        renderConditionalField={(child, i) => (
          <DynamicFormField
            key={'key' in child ? child.key : `cond-${field.key}-${i}`}
            field={child}
            control={control}
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />
        )}
      />
    )
  }

  if (field.type === 'coords') {
    const error = errors[field.key]
    const errorMessage = error && 'message' in error ? (error.message as string) : undefined
    const isLocked = !!field.lockedByRef
    return (
      <FormField label={field.label} error={errorMessage} infoTooltipText={field.infoTooltipText}>
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
                disabled={isLocked}
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
