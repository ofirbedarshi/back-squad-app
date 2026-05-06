import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import FormField from './FormField'
import Input from './Input'
import SegmentedToggle from './base/SegmentedToggle'
import Checkbox from './base/Checkbox'
import type { AttackLogInput } from '../domain/attackLog.types'

const requiredTextField = z.string().min(1, 'שדה חובה')
const optionalTextField = z.string().optional()
const optionalNumberField = z.nan().transform((): undefined => undefined).or(z.number().optional())

const schema = z.object({
  targetName: requiredTextField,
  date: requiredTextField,
  wasAttacked: z.enum(['yes', 'no']).optional(),
  hit: z.boolean().optional(),
  result: optionalTextField,
  time: optionalTextField,
  launcherType: optionalTextField,
  launcherId: optionalNumberField,
  aka: optionalTextField,
  pitch: optionalTextField,
  roll: optionalTextField,
  vehicleEncryptionMethod: optionalTextField,
  hivePosition: optionalTextField,
  generation: z.enum(['a', 'b']).optional(),
  stationCoordinates: optionalNumberField,
  altitude: optionalNumberField,
  targetCoordinates: optionalNumberField,
  stationTargetRange: optionalNumberField,
  stationTargetAzimuth: optionalNumberField,
  stationTargetAltitudeDiff: optionalNumberField,
  indicatorFactor: optionalNumberField,
  indicatorMeans: optionalTextField,
  indicatorCoordinates: optionalNumberField,
  indicatorTargetAzimuth: optionalNumberField,
  indicatorRange: optionalNumberField,
  apexAngle: optionalNumberField,
  spotSizeWithoutSpread: optionalNumberField,
  targetFront: optionalTextField,
  wallAzimuth: optionalNumberField,
  spotSizeWithSpread: optionalNumberField,
  cloudBaseAltitude: optionalNumberField,
  windSpeed: optionalNumberField,
  flightPath: optionalTextField,
  offset: optionalNumberField,
  directionality: optionalTextField,
  fuseType: optionalTextField,
})

type AttackLogFormValues = z.infer<typeof schema>

const WAS_ATTACKED_OPTIONS: [{ label: string; value: string }, { label: string; value: string }] = [
  { label: 'כן', value: 'yes' },
  { label: 'לא', value: 'no' },
]

const GENERATION_OPTIONS: [{ label: string; value: string }, { label: string; value: string }] = [
  { label: 'דור א׳', value: 'a' },
  { label: 'דור ב׳', value: 'b' },
]

interface AttackLogFormProps {
  onSubmit: (data: AttackLogInput) => void
  submitLabel?: string
  initialValues?: AttackLogInput
}

function AttackLogForm({ onSubmit, submitLabel = 'שמור', initialValues }: AttackLogFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<AttackLogFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      wasAttacked: 'no',
      hit: false,
      generation: 'a',
      ...initialValues,
    },
  })

  const wasAttacked = watch('wasAttacked')

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <FormField label="שם מטרה" error={errors.targetName?.message}>
        <Input type="text" hasError={!!errors.targetName} {...register('targetName')} />
      </FormField>

      <FormField label="נתקפה" error={errors.wasAttacked?.message}>
        <Controller
          name="wasAttacked"
          control={control}
          render={({ field }) => (
            <SegmentedToggle
              options={WAS_ATTACKED_OPTIONS}
              value={field.value ?? 'no'}
              onChange={field.onChange}
            />
          )}
        />
      </FormField>

      {wasAttacked === 'yes' && (
        <Controller
          name="hit"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="פגע"
              checked={field.value ?? false}
              onChange={field.onChange}
            />
          )}
        />
      )}

      <FormField label="תוצאה" error={errors.result?.message}>
        <Input type="text" hasError={!!errors.result} {...register('result')} />
      </FormField>

      <FormField label="תאריך" error={errors.date?.message}>
        <Input type="date" hasError={!!errors.date} {...register('date')} />
      </FormField>

      <FormField label="שעה" error={errors.time?.message}>
        <Input type="time" hasError={!!errors.time} {...register('time')} />
      </FormField>

      <FormField label="סוג משגר" error={errors.launcherType?.message}>
        <Input type="text" hasError={!!errors.launcherType} {...register('launcherType')} />
      </FormField>

      <FormField label="צ׳ משגר" error={errors.launcherId?.message}>
        <Input type="number" hasError={!!errors.launcherId} {...register('launcherId', { valueAsNumber: true })} />
      </FormField>

      <FormField label='אק"א' error={errors.aka?.message}>
        <Input type="text" hasError={!!errors.aka} {...register('aka')} />
      </FormField>

      <FormField label="פיצ׳" error={errors.pitch?.message}>
        <Input type="text" hasError={!!errors.pitch} {...register('pitch')} />
      </FormField>

      <FormField label="רול" error={errors.roll?.message}>
        <Input type="text" hasError={!!errors.roll} {...register('roll')} />
      </FormField>

      <FormField label="באמצעות מה הוצפן הרכב?" error={errors.vehicleEncryptionMethod?.message}>
        <Input type="text" hasError={!!errors.vehicleEncryptionMethod} {...register('vehicleEncryptionMethod')} />
      </FormField>

      <FormField label="מיקום טיך בכוורת" error={errors.hivePosition?.message}>
        <Input type="text" hasError={!!errors.hivePosition} {...register('hivePosition')} />
      </FormField>

      <FormField label="דור" error={errors.generation?.message}>
        <Controller
          name="generation"
          control={control}
          render={({ field }) => (
            <SegmentedToggle
              options={GENERATION_OPTIONS}
              value={field.value ?? 'a'}
              onChange={field.onChange}
            />
          )}
        />
      </FormField>

      <FormField label='נ"צ עמדה' error={errors.stationCoordinates?.message}>
        <Input type="number" hasError={!!errors.stationCoordinates} {...register('stationCoordinates', { valueAsNumber: true })} />
      </FormField>

      <FormField label="גובה" error={errors.altitude?.message}>
        <Input type="number" hasError={!!errors.altitude} {...register('altitude', { valueAsNumber: true })} />
      </FormField>

      <FormField label='נ"צ מטרה' error={errors.targetCoordinates?.message}>
        <Input type="number" hasError={!!errors.targetCoordinates} {...register('targetCoordinates', { valueAsNumber: true })} />
      </FormField>

      <FormField label="טווח עמדת מטרה" error={errors.stationTargetRange?.message}>
        <Input type="number" hasError={!!errors.stationTargetRange} {...register('stationTargetRange', { valueAsNumber: true })} />
      </FormField>

      <FormField label="אזימות עמדה מטרה" error={errors.stationTargetAzimuth?.message}>
        <Input type="number" hasError={!!errors.stationTargetAzimuth} {...register('stationTargetAzimuth', { valueAsNumber: true })} />
      </FormField>

      <FormField label="הפרש גובה עמדה מטרה" error={errors.stationTargetAltitudeDiff?.message}>
        <Input type="number" hasError={!!errors.stationTargetAltitudeDiff} {...register('stationTargetAltitudeDiff', { valueAsNumber: true })} />
      </FormField>

      <FormField label="גורם המציין" error={errors.indicatorFactor?.message}>
        <Input type="number" hasError={!!errors.indicatorFactor} {...register('indicatorFactor', { valueAsNumber: true })} />
      </FormField>

      <FormField label="אמצעי מציין" error={errors.indicatorMeans?.message}>
        <Input type="text" hasError={!!errors.indicatorMeans} {...register('indicatorMeans')} />
      </FormField>

      <FormField label='נ"צ מציין' error={errors.indicatorCoordinates?.message}>
        <Input type="number" hasError={!!errors.indicatorCoordinates} {...register('indicatorCoordinates', { valueAsNumber: true })} />
      </FormField>

      <FormField label="אזימות מציין מטרה" error={errors.indicatorTargetAzimuth?.message}>
        <Input type="number" hasError={!!errors.indicatorTargetAzimuth} {...register('indicatorTargetAzimuth', { valueAsNumber: true })} />
      </FormField>

      <FormField label="טווח מציין" error={errors.indicatorRange?.message}>
        <Input type="number" hasError={!!errors.indicatorRange} {...register('indicatorRange', { valueAsNumber: true })} />
      </FormField>

      <FormField label="זווית קודקוד" error={errors.apexAngle?.message}>
        <Input type="number" hasError={!!errors.apexAngle} {...register('apexAngle', { valueAsNumber: true })} />
      </FormField>

      <FormField label="גודל כתם (ללא מריחה)" error={errors.spotSizeWithoutSpread?.message}>
        <Input type="number" hasError={!!errors.spotSizeWithoutSpread} {...register('spotSizeWithoutSpread', { valueAsNumber: true })} />
      </FormField>

      <FormField label="מפנה מטרה" error={errors.targetFront?.message}>
        <Input type="text" hasError={!!errors.targetFront} {...register('targetFront')} />
      </FormField>

      <FormField label="אזימות הקיר" error={errors.wallAzimuth?.message}>
        <Input type="number" hasError={!!errors.wallAzimuth} {...register('wallAzimuth', { valueAsNumber: true })} />
      </FormField>

      <FormField label="גודל כתם (עם מריחה)" error={errors.spotSizeWithSpread?.message}>
        <Input type="number" hasError={!!errors.spotSizeWithSpread} {...register('spotSizeWithSpread', { valueAsNumber: true })} />
      </FormField>

      <FormField label="גובה בסיס ענן" error={errors.cloudBaseAltitude?.message}>
        <Input type="number" hasError={!!errors.cloudBaseAltitude} {...register('cloudBaseAltitude', { valueAsNumber: true })} />
      </FormField>

      <FormField label="מהירות רוח (קשר)" error={errors.windSpeed?.message}>
        <Input type="number" hasError={!!errors.windSpeed} {...register('windSpeed', { valueAsNumber: true })} />
      </FormField>

      <FormField label="מסלול מעוף" error={errors.flightPath?.message}>
        <Input type="text" hasError={!!errors.flightPath} {...register('flightPath')} />
      </FormField>

      <FormField label="היסט" error={errors.offset?.message}>
        <Input type="number" hasError={!!errors.offset} {...register('offset', { valueAsNumber: true })} />
      </FormField>

      <FormField label="כיווניות" error={errors.directionality?.message}>
        <Input type="text" hasError={!!errors.directionality} {...register('directionality')} />
      </FormField>

      <FormField label="סוג מרעום" error={errors.fuseType?.message}>
        <Input type="text" hasError={!!errors.fuseType} {...register('fuseType')} />
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

export default AttackLogForm
