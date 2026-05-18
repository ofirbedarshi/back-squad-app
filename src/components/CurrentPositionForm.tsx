import { useMemo } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import type { Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import FormDraftClearButton from './FormDraftClearButton'
import PositionBaseFields from './PositionBaseFields'
import AdditionalFormForCurrentPosition from './AdditionalFormForCurrentPosition'
import {
  currentPositionFormSchema,
  createArchivePositionDefaultValues,
} from './positionForm.schema'
import type { PositionFormValues } from './positionForm.schema'
import type { PositionFormInitialShape, PositionInput } from '../domain/position.types'
import { clearFormDraftUseCase } from '../useCases/clearFormDraft'
import { useDraftMergedDefaults } from '../hooks/useDraftMergedDefaults'
import { useFormDraft } from '../hooks/useFormDraft'
import { useConfirm } from '../hooks/useConfirm'

interface CurrentPositionFormProps {
  onSubmit: (data: PositionInput) => void
  initialValues?: PositionFormInitialShape
  submitLabel?: string
  draftKey?: string
}

function CurrentPositionForm({
  onSubmit,
  initialValues,
  submitLabel = 'שמור',
  draftKey,
}: CurrentPositionFormProps) {
  const confirm = useConfirm()

  const baseline = useMemo(() => createArchivePositionDefaultValues(initialValues), [initialValues])

  const defaultValues = useDraftMergedDefaults(draftKey, baseline)

  const methods = useForm<PositionFormValues>({
    resolver: zodResolver(currentPositionFormSchema) as Resolver<PositionFormValues>,
    defaultValues,
  })

  const { resetToBaseline } = useFormDraft({
    draftKey,
    baseline,
    watch: methods.watch,
    reset: methods.reset,
  })

  async function handleClearDraft() {
    if (!draftKey) return
    const ok = await confirm({
      title: 'ניקוי טיוטה',
      message: 'למחוק את הטיוטה של עמדה נוכחית מהמכשיר?',
      confirmLabel: 'נקה טיוטה',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (!ok) return
    clearFormDraftUseCase(draftKey)
    resetToBaseline()
  }

  function handleSubmit({ plusTenApplied, ...positionInput }: PositionFormValues) {
    void plusTenApplied
    onSubmit(positionInput as PositionInput)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} noValidate className="flex flex-col gap-4">
        <PositionBaseFields />
        <AdditionalFormForCurrentPosition />
        {draftKey ? <FormDraftClearButton onPress={() => void handleClearDraft()} /> : null}
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

export default CurrentPositionForm
