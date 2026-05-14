import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import PositionBaseFields from './PositionBaseFields'
import { schema, LAUNCHER_TYPES, EMPTY_OBSTACLES, getInitialPlusTenApplied } from './positionForm.schema'
import type { PositionFormValues } from './positionForm.schema'
import type { PositionFormInitialShape, PositionInput } from '../domain/position.types'

interface PositionFormProps {
  onSubmit: (data: PositionInput) => void
  submitLabel?: string
  initialValues?: PositionFormInitialShape
}

function PositionForm({ onSubmit, submitLabel = 'שמור', initialValues }: PositionFormProps) {
  const methods = useForm<PositionFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      launcherType: LAUNCHER_TYPES.VEHICLE,
      obstacles: EMPTY_OBSTACLES,
      plusTenApplied: getInitialPlusTenApplied(initialValues),
      ...initialValues,
    },
  })

  function handleSubmit({ plusTenApplied, ...positionInput }: PositionFormValues) {
    void plusTenApplied
    onSubmit(positionInput as PositionInput)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} noValidate className="flex flex-col gap-4">
        <PositionBaseFields />
        <button
          type="submit"
          className="mt-2 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-200 active:scale-95 transition-transform touch-manipulation select-none"
        >
          {submitLabel}
        </button>
      </form>
    </FormProvider>
  )
}

export default PositionForm
