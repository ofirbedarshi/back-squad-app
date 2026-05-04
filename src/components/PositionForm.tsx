import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import FormField from './FormField'
import Input from './Input'
import SegmentedToggle from './base/SegmentedToggle'
import type { PositionInput } from '../domain/position.types'

const numberField = z.number({ error: 'יש להזין מספר' })

const LAUNCHER_TYPES = {
  VEHICLE: 'vehicle',
  INFANTRY: 'infantry',
} as const

const schema = z.object({
  stationName: z.string().min(1, 'שדה חובה'),
  coordinates: numberField,
  altitude: numberField,
  aka: numberField,
  launcherType: z.enum(['vehicle', 'infantry']),
  vehicleId: z.string().optional(),
  pitchAndRoll: z.number({ error: 'יש להזין מספר' }).max(5, 'ערך מקסימלי הוא 5'),
})

type PositionFormValues = z.infer<typeof schema>

const LAUNCHER_OPTIONS: [{ label: string; value: string }, { label: string; value: string }] = [
  { label: 'משגר רכב', value: LAUNCHER_TYPES.VEHICLE },
  { label: 'משגר רגלי', value: LAUNCHER_TYPES.INFANTRY },
]

interface PositionFormProps {
  onSubmit: (data: PositionInput) => void
  submitLabel?: string
}

function PositionForm({ onSubmit, submitLabel = 'שמור' }: PositionFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<PositionFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      launcherType: LAUNCHER_TYPES.VEHICLE,
    },
  })

  const launcherType = watch('launcherType')
  const isVehicle = launcherType === LAUNCHER_TYPES.VEHICLE

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <FormField label="שם עמדה" error={errors.stationName?.message}>
        <Input type="text" placeholder="הכנס שם..." hasError={!!errors.stationName} {...register('stationName')} />
      </FormField>

      <FormField label='נ"צ' error={errors.coordinates?.message}>
        <Input type="number" hasError={!!errors.coordinates} {...register('coordinates', { valueAsNumber: true })} />
      </FormField>

      <FormField label="גובה עמדה" error={errors.altitude?.message}>
        <Input type="number" placeholder="במטרים" hasError={!!errors.altitude} {...register('altitude', { valueAsNumber: true })} />
      </FormField>

      <FormField label='אק"א' error={errors.aka?.message}>
        <Input type="number" hasError={!!errors.aka} {...register('aka', { valueAsNumber: true })} />
      </FormField>

      <FormField label="סוג משגר">
        <Controller
          name="launcherType"
          control={control}
          render={({ field }) => (
            <SegmentedToggle
              options={LAUNCHER_OPTIONS}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </FormField>

      {isVehicle && (
        <FormField label="צ׳ רכב">
          <Input type="text" {...register('vehicleId')} />
        </FormField>
      )}

      <FormField label="PITCH & ROLL" error={errors.pitchAndRoll?.message}>
        <Input type="number" hasError={!!errors.pitchAndRoll} {...register('pitchAndRoll', { valueAsNumber: true })} />
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

export default PositionForm
