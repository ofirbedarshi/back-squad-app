import { Controller } from 'react-hook-form'
import type { Control, FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import FormField from '../FormField'
import Input from '../Input'
import Textarea from '../base/Textarea'
import SegmentedToggle from '../base/SegmentedToggle'
import Checkbox from '../base/Checkbox'
import CoordinateInput from '../base/CoordinateInput'
import TargetLoaderField from './TargetLoaderField'
import IndicatorLoaderField from './IndicatorLoaderField'
import PositionLoaderField from './PositionLoaderField'
import IndicatorToTargetComputedTextField from './IndicatorToTargetComputedTextField'
import PositionToTargetComputedTextField from './PositionToTargetComputedTextField'
import type { ComputedTextFieldDef } from './computedTextField.types'
import type { CoordinateValue, FormFieldDef, FormValues, RowableField, ToggleWithConditionsField } from '../../domain/dynamicForm.types'
import ToggleWithConditionsRenderer from './ToggleWithConditionsRenderer'
import { AZIMUTH_DEGREE_MAX, AZIMUTH_DEGREE_MIN } from '../../domain/azimuthDegree'
import { collectVisibleWhenWatchKeys } from '../../domain/dynamicFormVisibleWhen'
import { isFieldVisible, makeFieldValidator } from '../../domain/dynamicFormValidation'

interface DynamicFormFieldProps {
  field: FormFieldDef
  control: Control<FormValues>
  register: UseFormRegister<FormValues>
  errors: FieldErrors<FormValues>
  setValue: UseFormSetValue<FormValues>
  watch: UseFormWatch<FormValues>
  getValues: UseFormGetValues<FormValues>
  parentByKey: Map<string, ToggleWithConditionsField>
}

function DynamicFormField({
  field,
  control,
  register,
  errors,
  setValue,
  watch,
  getValues,
  parentByKey,
}: DynamicFormFieldProps) {
  const sharedChildProps = {
    control,
    register,
    errors,
    setValue,
    watch,
    getValues,
    parentByKey,
  }

  if (field.type === 'row') {
    return (
      <div className="flex gap-3">
        {field.fields.map((child: RowableField, index: number) => (
          <div
            key={child.type === 'note' ? `note-${index}` : child.key}
            className="flex-1 min-w-0"
          >
            <DynamicFormField field={child as FormFieldDef} {...sharedChildProps} />
          </div>
        ))}
      </div>
    )
  }

  if (field.type === 'note') {
    return (
      <p className="text-sm text-amber-800 bg-amber-100 rounded-xl px-3 py-2 leading-relaxed whitespace-pre-line">
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
        getValues={getValues}
        parentByKey={parentByKey}
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
        getValues={getValues}
        parentByKey={parentByKey}
      />
    )
  }

  if (field.type === 'positionLoader') {
    const currentPositionId = watch(field.key) as string | undefined
    return (
      <PositionLoaderField
        fieldDef={field}
        currentPositionId={currentPositionId || undefined}
        setValue={setValue}
        register={register}
        errors={errors}
        getValues={getValues}
        parentByKey={parentByKey}
      />
    )
  }

  if (field.type === 'text' && field.computedFrom === 'indicatorToTarget' && field.computedMetric) {
    return (
      <IndicatorToTargetComputedTextField
        field={field as ComputedTextFieldDef}
        watch={watch}
        setValue={setValue}
      />
    )
  }

  if (field.type === 'text' && field.computedFrom === 'positionToTarget' && field.computedMetric) {
    return (
      <PositionToTargetComputedTextField
        field={field as ComputedTextFieldDef}
        watch={watch}
        setValue={setValue}
      />
    )
  }

  if (field.type === 'text') {
    const error = errors[field.key]
    const errorMessage = error && 'message' in error ? (error.message as string) : undefined
    const isLocked = !!field.lockedByRef
    const validate = field.lockedByRef
      ? undefined
      : makeFieldValidator(field, getValues, parentByKey)
    const isAzimuthDegree = field.valueKind === 'azimuthDegree'
    return (
      <FormField label={field.label} error={errorMessage} infoTooltipText={field.infoTooltipText}>
        <Input
          type={isAzimuthDegree ? 'number' : 'text'}
          inputMode={isAzimuthDegree ? 'decimal' : undefined}
          min={isAzimuthDegree ? AZIMUTH_DEGREE_MIN : undefined}
          max={isAzimuthDegree ? AZIMUTH_DEGREE_MAX : undefined}
          step={isAzimuthDegree ? 0.1 : undefined}
          placeholder={field.placeholder}
          hasError={!!error}
          disabled={isLocked}
          {...register(
            field.key,
            isAzimuthDegree ? { validate, valueAsNumber: true } : { validate },
          )}
        />
      </FormField>
    )
  }

  if (field.type === 'textarea') {
    const error = errors[field.key]
    const errorMessage = error && 'message' in error ? (error.message as string) : undefined
    const isLocked = !!field.lockedByRef
    const validate = field.lockedByRef
      ? undefined
      : makeFieldValidator(field, getValues, parentByKey)
    return (
      <FormField label={field.label} error={errorMessage} infoTooltipText={field.infoTooltipText}>
        <Textarea
          rows={field.rows ?? 4}
          placeholder={field.placeholder}
          hasError={!!error}
          disabled={isLocked}
          {...register(field.key, { validate })}
        />
      </FormField>
    )
  }

  if (field.type === 'number') {
    const error = errors[field.key]
    const errorMessage = error && 'message' in error ? (error.message as string) : undefined
    return (
      <FormField label={field.label} error={errorMessage} infoTooltipText={field.infoTooltipText}>
        <Input
          type="number"
          placeholder={field.placeholder}
          hasError={!!error}
          {...register(field.key, {
            valueAsNumber: true,
            validate: makeFieldValidator(field, getValues, parentByKey),
          })}
        />
      </FormField>
    )
  }

  if (field.type === 'date') {
    const error = errors[field.key]
    const errorMessage = error && 'message' in error ? (error.message as string) : undefined
    return (
      <FormField label={field.label} error={errorMessage}>
        <Input
          type="date"
          hasError={!!error}
          {...register(field.key, { validate: makeFieldValidator(field, getValues, parentByKey) })}
        />
      </FormField>
    )
  }

  if (field.type === 'time') {
    const error = errors[field.key]
    const errorMessage = error && 'message' in error ? (error.message as string) : undefined
    return (
      <FormField label={field.label} error={errorMessage}>
        <Input
          type="time"
          hasError={!!error}
          {...register(field.key, { validate: makeFieldValidator(field, getValues, parentByKey) })}
        />
      </FormField>
    )
  }

  if (field.type === 'toggle') {
    if (field.visibleWhen) {
      watch(collectVisibleWhenWatchKeys(field.visibleWhen))
    }
    if (!isFieldVisible(field, getValues(), parentByKey)) {
      return null
    }

    const error = errors[field.key]
    const errorMessage = error && 'message' in error ? (error.message as string) : undefined
    return (
      <FormField label={field.label} error={errorMessage}>
        <Controller
          name={field.key}
          control={control}
          defaultValue={field.defaultValue}
          rules={{ validate: makeFieldValidator(field, getValues, parentByKey) }}
          render={({ field: formField }) => (
            <SegmentedToggle
              options={field.options.map((opt) => ({ label: opt, value: opt }))}
              value={typeof formField.value === 'string' ? formField.value : undefined}
              onChange={formField.onChange}
              allowDeselect={field.required !== true}
            />
          )}
        />
      </FormField>
    )
  }

  if (field.type === 'checkbox') {
    if (field.visibleWhen) {
      watch(collectVisibleWhenWatchKeys(field.visibleWhen))
    }
    if (!isFieldVisible(field, getValues(), parentByKey)) {
      return null
    }

    return (
      <Controller
        name={field.key}
        control={control}
        defaultValue={field.defaultValue ?? false}
        rules={{ validate: makeFieldValidator(field, getValues, parentByKey) }}
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
        errors={errors}
        getValues={getValues}
        parentByKey={parentByKey}
        renderConditionalField={(child, i) => (
          <DynamicFormField
            key={'key' in child ? child.key : `cond-${field.key}-${i}`}
            field={child}
            {...sharedChildProps}
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
          rules={
            field.lockedByRef
              ? undefined
              : { validate: makeFieldValidator(field, getValues, parentByKey) }
          }
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
