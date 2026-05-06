import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import FormField from './FormField'
import Input from './Input'
import type { TargetInput } from './target.types'

const requiredTextField = z.string().min(1, 'שדה חובה')
const optionalTextField = z.string().optional()
const optionalNumberField = z.nan().transform((): undefined => undefined).or(z.number().optional())

const schema = z.object({
  targetName: requiredTextField,
  targetDescription: optionalTextField,
  coordinates: requiredTextField,
  altitude: optionalNumberField,
  azimuth: optionalNumberField,
  range: optionalNumberField,
  altitudeDiff: optionalNumberField,
  results: optionalTextField,
})

type TargetFormValues = z.infer<typeof schema>

interface TargetFormProps {
  onSubmit: (data: TargetInput) => void
  submitLabel?: string
  initialValues?: TargetInput
}

function TargetForm({ onSubmit, submitLabel = 'שמור', initialValues }: TargetFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TargetFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <FormField label="שם מטרה" error={errors.targetName?.message}>
        <Input type="text" hasError={!!errors.targetName} {...register('targetName')} />
      </FormField>

      <FormField label="תיאור מטרה" error={errors.targetDescription?.message}>
        <Input type="text" hasError={!!errors.targetDescription} {...register('targetDescription')} />
      </FormField>

      <FormField label='נ.צ' error={errors.coordinates?.message}>
        <Input type="text" hasError={!!errors.coordinates} {...register('coordinates')} />
      </FormField>

      <FormField label="גובה" error={errors.altitude?.message}>
        <Input type="number" hasError={!!errors.altitude} {...register('altitude', { valueAsNumber: true })} />
      </FormField>

      <FormField label="אזימוט" error={errors.azimuth?.message}>
        <Input type="number" hasError={!!errors.azimuth} {...register('azimuth', { valueAsNumber: true })} />
      </FormField>

      <FormField label="טווח" error={errors.range?.message}>
        <Input type="number" hasError={!!errors.range} {...register('range', { valueAsNumber: true })} />
      </FormField>

      <FormField label="הפרש גובה" error={errors.altitudeDiff?.message}>
        <Input type="number" hasError={!!errors.altitudeDiff} {...register('altitudeDiff', { valueAsNumber: true })} />
      </FormField>

      <FormField label="תוצאות" error={errors.results?.message}>
        <Input type="text" hasError={!!errors.results} {...register('results')} />
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
