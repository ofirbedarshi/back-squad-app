import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import FormField from './FormField'
import Input from './Input'
import CoordinateInput from './base/CoordinateInput'
import SelectInput from './base/SelectInput'
import { coordinateValueSchema } from './base/coordinateInput.utils'
import type { IndicatorInput, IndicatorMeans } from '../domain/indicator.types'

const numberField = z.number({ error: 'יש להזין מספר' })
const markCodeField = numberField
  .int({ error: 'חייב להיות מספר שלם' })
  .min(0, { error: 'ערך לא יכול להיות שלילי' })
  .max(9999, { error: 'לכל היותר 4 ספרות' })
const indicatorMeansOptions = ['שיח', 'ראטלר', 'ספקטרו', 'צור', 'זיק', 'דוהר שמיים'] as const satisfies readonly IndicatorMeans[]
const indicatorMeansSelectOptions = indicatorMeansOptions.map((means) => ({ label: means, value: means }))

const schema = z.object({
  indicatorName: z.string().min(1, 'שדה חובה'),
  coordinates: coordinateValueSchema,
  altitude: numberField,
  means: z.enum(indicatorMeansOptions, { error: 'שדה חובה' }),
  markCode: markCodeField,
  targetDomain: z.string().optional(),
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
    control,
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

      <FormField label='נ"צ' error={errors.coordinates?.east?.message || errors.coordinates?.north?.message || errors.coordinates?.palach?.message}>
        <Controller
          name="coordinates"
          control={control}
          render={({ field }) => (
            <CoordinateInput
              value={field.value}
              onChange={field.onChange}
              hasError={!!errors.coordinates}
            />
          )}
        />
      </FormField>

      <FormField label="גובה" error={errors.altitude?.message}>
        <Input type="number" placeholder="במטרים" hasError={!!errors.altitude} {...register('altitude', { valueAsNumber: true })} />
      </FormField>

      <FormField label="אמצעי" error={errors.means?.message}>
        <SelectInput
          placeholder="בחר אמצעי"
          options={indicatorMeansSelectOptions}
          hasError={!!errors.means}
          {...register('means')}
        />
      </FormField>

      <FormField label="קוד ציון" error={errors.markCode?.message}>
        <Input
          type="number"
          inputMode="numeric"
          min={0}
          max={9999}
          step={1}
          hasError={!!errors.markCode}
          {...register('markCode', { valueAsNumber: true })}
        />
      </FormField>

      <FormField label="תחום מטרות" error={errors.targetDomain?.message}>
        <Input type="text" hasError={!!errors.targetDomain} {...register('targetDomain')} />
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
