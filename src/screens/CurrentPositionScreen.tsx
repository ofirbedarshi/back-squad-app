import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import FormField from '../components/FormField'
import Input from '../components/Input'

const schema = z.object({
  stationName: z.string().min(1, 'שדה חובה'),
  coordinates: z.string().min(1, 'שדה חובה'),
  altitude: z.string().min(1, 'שדה חובה'),
  aka: z.string().min(1, 'שדה חובה'),
  vehicleId: z.string().optional(),
  pitchAndRoll: z.string().min(1, 'שדה חובה'),
})

type CurrentPositionForm = z.infer<typeof schema>

function CurrentPositionScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CurrentPositionForm>({
    resolver: zodResolver(schema),
  })

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
          <Input type="text" placeholder="לדוגמה: 32.0853, 34.7818" hasError={!!errors.coordinates} {...register('coordinates')} />
        </FormField>

        <FormField label="גובה עמדה" error={errors.altitude?.message}>
          <Input type="number" placeholder="במטרים" hasError={!!errors.altitude} {...register('altitude')} />
        </FormField>

        <FormField label='אק"א' error={errors.aka?.message}>
          <Input type="text" hasError={!!errors.aka} {...register('aka')} />
        </FormField>

        <FormField label="צ׳ רכב">
          <Input type="text" {...register('vehicleId')} />
        </FormField>

        <FormField label="PITCH & ROLL" error={errors.pitchAndRoll?.message}>
          <Input type="text" hasError={!!errors.pitchAndRoll} {...register('pitchAndRoll')} />
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
