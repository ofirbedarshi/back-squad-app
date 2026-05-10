import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import FormField from './FormField'
import Input from './Input'
import ReferencePositionSummarySelector from './ReferencePositionSummarySelector'
import type { TargetInput } from '../domain/target.types'
import { useReferencePosition } from '../hooks/useReferencePosition'
import { calculateTargetLiveMetricsUseCase } from '../useCases/calculateTargetLiveMetrics'
import CoordinateInput from './base/CoordinateInput'
import { coordinateValueSchema, parseCoordinateString } from './base/coordinateInput.utils'

const requiredTextField = z.string().min(1, 'שדה חובה')
const optionalTextField = z.string().optional()
const optionalNumberField = z.nan().transform((): undefined => undefined).or(z.number().optional())

const schema = z.object({
  targetName: requiredTextField,
  targetDescription: optionalTextField,
  coordinates: coordinateValueSchema,
  altitude: optionalNumberField,
})

type TargetFormValues = z.infer<typeof schema>

interface TargetFormProps {
  onSubmit: (data: TargetInput) => void
  submitLabel?: string
  initialValues?: TargetInput
}

function TargetForm({ onSubmit, submitLabel = 'שמור', initialValues }: TargetFormProps) {
  const referencePosition = useReferencePosition()
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<TargetFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...initialValues,
      coordinates: parseCoordinateString(initialValues?.coordinates),
    },
  })

  const watchedCoordinates = watch('coordinates')
  const watchedAltitude = watch('altitude')
  const normalizedWatchedCoordinates = watchedCoordinates
    ? `${watchedCoordinates.east}/${watchedCoordinates.north}`
    : ''

  const liveMetrics = useMemo(
    () =>
      calculateTargetLiveMetricsUseCase({
        targetCoordinates: normalizedWatchedCoordinates,
        targetHeight: watchedAltitude,
      }),
    [referencePosition, normalizedWatchedCoordinates, watchedAltitude]
  )

  const displayAzimuth = liveMetrics ? liveMetrics.azimuth.toFixed(1) : ''
  const displayRange = liveMetrics ? liveMetrics.range.toFixed(1) : ''
  const displayAltitudeDiff = liveMetrics ? liveMetrics.altitudeDiff.toFixed(1) : ''

  function handleFormSubmit(data: TargetFormValues) {
    onSubmit({
      ...data,
      coordinates: `${data.coordinates.east}/${data.coordinates.north}`,
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="flex flex-col gap-4">
      <ReferencePositionSummarySelector />

      <FormField label="שם מטרה" error={errors.targetName?.message}>
        <Input type="text" hasError={!!errors.targetName} {...register('targetName')} />
      </FormField>

      <FormField label="תיאור מטרה" error={errors.targetDescription?.message}>
        <Input type="text" hasError={!!errors.targetDescription} {...register('targetDescription')} />
      </FormField>

      <FormField label='נ.צ' error={errors.coordinates?.east?.message || errors.coordinates?.north?.message}>
        <Controller
          name="coordinates"
          control={control}
          render={({ field }) => (
            <CoordinateInput
              value={{
                east: field.value?.east ?? '',
                north: field.value?.north ?? '3',
              }}
              onChange={field.onChange}
              hasError={!!errors.coordinates}
            />
          )}
        />
      </FormField>

      <FormField label="גובה" error={errors.altitude?.message}>
        <Input type="number" hasError={!!errors.altitude} {...register('altitude', { valueAsNumber: true })} />
      </FormField>

      <FormField label="אזימוט" infoTooltipText='ערך מחושב אוטומטית לפי הנ"צ והגובה של המטרה ביחס לעמדת הייחוס.'>
        <Input type="number" value={displayAzimuth} disabled />
      </FormField>

      <FormField label="טווח" infoTooltipText="ערך מחושב אוטומטית כטווח בין עמדת הייחוס לבין המטרה.">
        <Input type="number" value={displayRange} disabled />
      </FormField>

      <FormField label="הפרש גובה" infoTooltipText="ערך מחושב אוטומטית כהפרש בין גובה המטרה לגובה עמדת הייחוס.">
        <Input type="number" value={displayAltitudeDiff} disabled />
      </FormField>

      <FormField label="תוצאות">
        <p className="text-sm font-bold text-amber-700">TODO: שדה זה יתווסף בהמשך.</p>
      </FormField>

      <button
        type="submit"
        className="mt-2 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-200 active:scale-95 transition-transform touch-manipulation select-none"
      >
        {submitLabel}
      </button>
    </form>
  )
}

export default TargetForm
