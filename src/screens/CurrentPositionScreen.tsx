import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import FormField from '../components/FormField'
import Input from '../components/Input'
import SegmentedToggle from '../components/base/SegmentedToggle'

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

type CurrentPositionForm = z.infer<typeof schema>

const LAUNCHER_OPTIONS: [{ label: string; value: string }, { label: string; value: string }] = [
  { label: 'משגר רכב', value: LAUNCHER_TYPES.VEHICLE },
  { label: 'משגר רגלי', value: LAUNCHER_TYPES.INFANTRY },
]

function CurrentPositionScreen() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<CurrentPositionForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      launcherType: LAUNCHER_TYPES.VEHICLE,
    },
  })

  const launcherType = watch('launcherType')
  const isVehicle = launcherType === LAUNCHER_TYPES.VEHICLE

  function onSave(data: CurrentPositionForm) {
    // TODO: call saveCurrentPosition use-case
    console.log(data)
  }

  return (
    <div dir="rtl" className="flex flex-col bg-neutral-50">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800 bg-white">
        עמדה נוכחית
      </header>

      <form onSubmit={handleSubmit(onSave)} noValidate className="flex flex-col gap-4 p-4">
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
          שמור
        </button>
      </form>
    </div>
  )
}

export default CurrentPositionScreen
