import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import PositionBaseFields from './PositionBaseFields'
import AdditionalFormForCurrentPosition from './AdditionalFormForCurrentPosition'
import { schema, LAUNCHER_TYPES, EMPTY_OBSTACLES } from './positionForm.schema'
import type { PositionFormValues } from './positionForm.schema'
import type { PositionInput } from '../domain/position.types'

interface CurrentPositionFormProps {
  onSubmit: (data: PositionInput) => void
  initialValues?: PositionInput
}

function CurrentPositionForm({ onSubmit, initialValues }: CurrentPositionFormProps) {
  const methods = useForm<PositionFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      launcherType: LAUNCHER_TYPES.VEHICLE,
      obstacles: EMPTY_OBSTACLES,
      ...initialValues,
    },
  })

  function handleSubmit(data: PositionFormValues) {
    onSubmit(data as unknown as PositionInput)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} noValidate className="flex flex-col gap-4">
        <PositionBaseFields />
        <AdditionalFormForCurrentPosition />
        <button
          type="submit"
          className="mt-2 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-200 active:scale-95 transition-transform touch-manipulation select-none"
        >
          שמור
        </button>
      </form>
    </FormProvider>
  )
}

export default CurrentPositionForm
