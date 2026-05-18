import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { FORM_DRAFT_DEBOUNCE_MS } from '../../domain/formDraft.types'
import type { FormValues } from '../../domain/dynamicForm.types'
import type { FormDraftValues } from '../../domain/formDraft.types'
import { extractDefaultValues } from '../../domain/dynamicForm'
import { buildParentByKeyMap } from '../../domain/dynamicFormValidation'
import { saveFormDraftUseCase } from '../../useCases/saveFormDraft'
import { debounce } from '../../utils/debounce'
import { useDraftMergedDefaults } from '../../hooks/useDraftMergedDefaults'
import DynamicFormField from './DynamicFormField'
import type { FormSchema } from '../../domain/dynamicForm.types'

export interface DynamicFormRef {
  resetToBaseline: () => void
}

export interface DynamicFormProps {
  schema: FormSchema
  onSubmit: (values: FormValues) => void
  defaultValues?: Partial<FormValues>
  submitLabel?: string
  /** When provided, sets the form's id so an external button with form={formId} can submit it.
   *  The internal submit button is hidden in this case. */
  formId?: string
  /** When set, form field values persist locally under this key until submit or explicit clear. */
  draftKey?: string
}

const DynamicForm = forwardRef<DynamicFormRef, DynamicFormProps>(function DynamicForm(
  { schema, onSubmit, defaultValues, submitLabel = 'שמור', formId, draftKey },
  ref,
) {
  const schemaDefaults = useMemo(() => extractDefaultValues(schema), [schema])
  const parentByKey = useMemo(() => buildParentByKeyMap(schema), [schema])

  const baseline = useMemo(
    () => ({ ...schemaDefaults, ...defaultValues }) as FormValues,
    [schemaDefaults, defaultValues],
  )

  const mergedDefaults = useDraftMergedDefaults<FormValues>(draftKey, baseline)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: mergedDefaults,
  })

  const baselineRef = useRef(baseline)

  useEffect(() => {
    baselineRef.current = baseline
  }, [baseline])

  const debouncedSaveRef = useRef<ReturnType<typeof debounce<(v: FormDraftValues) => void>> | null>(null)
  const unsubscribeRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!draftKey) return

    unsubscribeRef.current?.()
    unsubscribeRef.current = null
    debouncedSaveRef.current?.cancel()

    const saver = debounce((payload: FormDraftValues) => {
      saveFormDraftUseCase(draftKey, payload)
    }, FORM_DRAFT_DEBOUNCE_MS)
    debouncedSaveRef.current = saver

    const sub = watch((formValues) => {
      saver(formValues as FormDraftValues)
    })
    unsubscribeRef.current = () => sub.unsubscribe()

    return () => {
      sub.unsubscribe()
      unsubscribeRef.current = null
      saver.cancel()
      debouncedSaveRef.current = null
    }
  }, [draftKey, watch])

  useImperativeHandle(
    ref,
    () => ({
      resetToBaseline: () => {
        debouncedSaveRef.current?.cancel()
        reset(baselineRef.current)
      },
    }),
    [reset],
  )

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      {schema.fields.map((field, index) => (
        <DynamicFormField
          key={
            field.type === 'header' || field.type === 'note'
              ? `${field.type}-${index}`
              : field.type === 'row'
                ? `row-${index}`
                : field.key
          }
          field={field}
          control={control}
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
          getValues={getValues}
          parentByKey={parentByKey}
        />
      ))}

      {!formId && (
        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-blue-500 text-white text-base font-semibold shadow-sm active:bg-blue-600 transition-colors mt-2"
        >
          {submitLabel}
        </button>
      )}
    </form>
  )
})

export default DynamicForm
