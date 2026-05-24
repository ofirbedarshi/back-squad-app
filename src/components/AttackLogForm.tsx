import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import FormField from './FormField'
import Input from './Input'
import PitchRollInput from './PitchRollInput'
import { optionalPitchRollSchema, pitchRollOpts } from './pitchRollInput.utils'
import SegmentedToggle from './base/SegmentedToggle'
import Checkbox from './base/Checkbox'
import CoordinateInput from './base/CoordinateInput'
import { coordinateValueSchema } from './base/coordinateInput.utils'
import type { AttackLogInput } from '../domain/attackLog.types'
import {
  AZIMUTH_MAX_MESSAGE,
  AZIMUTH_MUST_BE_NUMBER_MESSAGE,
  AZIMUTH_MIN_MESSAGE,
  AZIMUTH_DEGREE_MAX,
  AZIMUTH_DEGREE_MIN,
} from '../domain/azimuthDegree'

const requiredTextField = z.string().min(1, 'שדה חובה')
const optionalTextField = z.string().optional()
const optionalNumberField = z.nan().transform((): undefined => undefined).or(z.number().optional())
const optionalAzimuthDegreeField = z
  .nan()
  .transform((): undefined => undefined)
  .or(
    z
      .number({ error: AZIMUTH_MUST_BE_NUMBER_MESSAGE })
      .min(AZIMUTH_DEGREE_MIN, AZIMUTH_MIN_MESSAGE)
      .max(AZIMUTH_DEGREE_MAX, AZIMUTH_MAX_MESSAGE)
      .optional(),
  )

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
  pitch: optionalPitchRollSchema,
  roll: optionalPitchRollSchema,
  vehicleEncryptionMethod: optionalTextField,
  hivePosition: optionalTextField,
  generation: z.enum(['a', 'b']).optional(),
  stationCoordinates: coordinateValueSchema.optional(),
  altitude: optionalNumberField,
  targetCoordinates: coordinateValueSchema.optional(),
  stationTargetRange: optionalNumberField,
  stationTargetAzimuth: optionalAzimuthDegreeField,
  stationTargetAltitudeDiff: optionalNumberField,
  indicatorFactor: optionalNumberField,
  indicatorMeans: optionalTextField,
  indicatorCoordinates: coordinateValueSchema.optional(),
  indicatorTargetAzimuth: optionalAzimuthDegreeField,
  indicatorRange: optionalNumberField,
  apexAngle: optionalNumberField,
  spotSizeWithoutSpread: optionalNumberField,
  targetFront: optionalTextField,
  wallAzimuth: optionalAzimuthDegreeField,
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
  const pitch = watch('pitch')
  const roll = watch('roll')

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

      <PitchRollInput
        label="פיצ׳"
        error={errors.pitch?.message}
        valueForWarning={pitch}
        {...register('pitch', pitchRollOpts)}
      />

      <PitchRollInput
        label="רול"
        error={errors.roll?.message}
        valueForWarning={roll}
        {...register('roll', pitchRollOpts)}
      />

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

      <FormField label='נ"צ עמדה' error={errors.stationCoordinates?.east?.message || errors.stationCoordinates?.north?.message || errors.stationCoordinates?.palach?.message}>
        <Controller
          name="stationCoordinates"
          control={control}
          render={({ field }) => (
            <CoordinateInput
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.stationCoordinates}
            />
          )}
        />
      </FormField>

      <FormField label="גובה" error={errors.altitude?.message}>
        <Input type="number" hasError={!!errors.altitude} {...register('altitude', { valueAsNumber: true })} />
      </FormField>

      <FormField label='נ"צ מטרה' error={errors.targetCoordinates?.east?.message || errors.targetCoordinates?.north?.message || errors.targetCoordinates?.palach?.message}>
        <Controller
          name="targetCoordinates"
          control={control}
          render={({ field }) => (
            <CoordinateInput
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.targetCoordinates}
            />
          )}
        />
      </FormField>

      <FormField label="טווח עמדת מטרה" error={errors.stationTargetRange?.message}>
        <Input type="number" hasError={!!errors.stationTargetRange} {...register('stationTargetRange', { valueAsNumber: true })} />
      </FormField>

      <FormField label="אזימות עמדה מטרה" error={errors.stationTargetAzimuth?.message}>
        <Input
          type="number"
          min={0}
          max={359.9}
          step={0.1}
          hasError={!!errors.stationTargetAzimuth}
          {...register('stationTargetAzimuth', { valueAsNumber: true })}
        />
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

      <FormField label='נ"צ מציין' error={errors.indicatorCoordinates?.east?.message || errors.indicatorCoordinates?.north?.message || errors.indicatorCoordinates?.palach?.message}>
        <Controller
          name="indicatorCoordinates"
          control={control}
          render={({ field }) => (
            <CoordinateInput
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.indicatorCoordinates}
            />
          )}
        />
      </FormField>

      <FormField label="אזימות מציין מטרה" error={errors.indicatorTargetAzimuth?.message}>
        <Input
          type="number"
          min={0}
          max={359.9}
          step={0.1}
          hasError={!!errors.indicatorTargetAzimuth}
          {...register('indicatorTargetAzimuth', { valueAsNumber: true })}
        />
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
        <Input
          type="number"
          min={0}
          max={359.9}
          step={0.1}
          hasError={!!errors.wallAzimuth}
          {...register('wallAzimuth', { valueAsNumber: true })}
        />
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
