import { useFormContext, Controller } from 'react-hook-form'
import FormField from './FormField'
import Input from './Input'
import CoordinateInput from './base/CoordinateInput'
import type { PositionFormValues } from './positionForm.schema'

function PositionBaseFields() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<PositionFormValues>()

  return (
    <>
      <FormField label="שם עמדה" error={errors.stationName?.message}>
        <Input
          type="text"
          placeholder="הכנס שם..."
          hasError={!!errors.stationName}
          {...register('stationName')}
        />
      </FormField>

      <FormField
        label='נ"צ'
        error={
          errors.coordinates?.east?.message ||
          errors.coordinates?.north?.message ||
          errors.coordinates?.palach?.message
        }
      >
        <Controller
          name="coordinates"
          control={control}
          render={({ field }) => (
            <CoordinateInput value={field.value} onChange={field.onChange} hasError={!!errors.coordinates} />
          )}
        />
      </FormField>

      <FormField label="גובה עמדה" error={errors.altitude?.message}>
        <Input
          type="number"
          placeholder="במטרים"
          hasError={!!errors.altitude}
          {...register('altitude', { valueAsNumber: true })}
        />
      </FormField>
    </>
  )
}

export default PositionBaseFields
