import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import FormField from './FormField'
import Input from './Input'
import type { IndicatorInput } from '../domain/indicator.types'

const numberField = z.number({ error: 'יש להזין מספר' })

const schema = z.object({
  indicatorName: z.string().min(1, 'שדה חובה'),
  coordinates: numberField,
  altitude: numberField,
  means: z.string().min(1, 'שדה חובה'),
  markCode: numberField,
  targetDomain: z.string().optional(),
  azimuth: z.number({ error: 'יש להזין מספר' }).optional(),
  range: z.number({ error: 'יש להזין מספר' }).optional(),
})

type IndicatorFormValues = z.infer<typeof schema>

interface IndicatorFormProps {
  onSubmit: (data: IndicatorInput) => void
  submitLabel?: string
  initialValues?: IndicatorInput
}

function IndicatorForm({ onSubmit, submitLabel = 'שמור', initialValues }: IndicatorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IndicatorFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <FormField label="שם מציין" error={errors.indicatorName?.message}>
        <Input type="text" placeholder="הכנס שם..." hasError={!!errors.indicatorName} {...register('indicatorName')} />
      </FormField>

      <FormField label='נ"צ' error={errors.coordinates?.message}>
        <Input type="number" hasError={!!errors.coordinates} {...register('coordinates', { valueAsNumber: true })} />
      </FormField>

      <FormField label="גובה" error={errors.altitude?.message}>
        <Input type="number" placeholder="במטרים" hasError={!!errors.altitude} {...register('altitude', { valueAsNumber: true })} />
      </FormField>

      <FormField label="אמצעי" error={errors.means?.message}>
        <Input type="text" hasError={!!errors.means} {...register('means')} />
      </FormField>

      <FormField label="קוד ציון" error={errors.markCode?.message}>
        <Input type="number" hasError={!!errors.markCode} {...register('markCode', { valueAsNumber: true })} />
      </FormField>

      <FormField label="תחום מטרות" error={errors.targetDomain?.message}>
        <Input type="text" hasError={!!errors.targetDomain} {...register('targetDomain')} />
      </FormField>

      <FormField label="אזימוט" error={errors.azimuth?.message}>
        <Input type="number" hasError={!!errors.azimuth} {...register('azimuth', { valueAsNumber: true })} />
      </FormField>

      <FormField label="טווח" error={errors.range?.message}>
        <Input type="number" hasError={!!errors.range} {...register('range', { valueAsNumber: true })} />
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

export default IndicatorForm
