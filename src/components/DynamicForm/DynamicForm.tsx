import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { extractDefaultValues } from '../../domain/dynamicForm'
import { buildParentByKeyMap } from '../../domain/dynamicFormValidation'
import DynamicFormField from './DynamicFormField'
import type { FormSchema, FormValues } from '../../domain/dynamicForm.types'

interface DynamicFormProps {
  schema: FormSchema
  onSubmit: (values: FormValues) => void
  defaultValues?: Partial<FormValues>
  submitLabel?: string
  /** When provided, sets the form's id so an external button with form={formId} can submit it.
   *  The internal submit button is hidden in this case. */
  formId?: string
}

function DynamicForm({ schema, onSubmit, defaultValues, submitLabel = 'שמור', formId }: DynamicFormProps) {
  const schemaDefaults = extractDefaultValues(schema)
  const parentByKey = useMemo(() => buildParentByKeyMap(schema), [schema])

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: defaultValues ?? schemaDefaults,
  })

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
}

export default DynamicForm
