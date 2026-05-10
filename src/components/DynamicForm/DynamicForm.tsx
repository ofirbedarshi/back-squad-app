import { useForm } from 'react-hook-form'
import { extractDefaultValues } from '../../domain/dynamicForm'
import DynamicFormField from './DynamicFormField'
import type { FormSchema, FormValues } from '../../domain/dynamicForm.types'

interface DynamicFormProps {
  schema: FormSchema
  onSubmit: (values: FormValues) => void
  defaultValues?: Partial<FormValues>
  submitLabel?: string
}

function DynamicForm({ schema, onSubmit, defaultValues, submitLabel = 'שמור' }: DynamicFormProps) {
  const schemaDefaults = extractDefaultValues(schema)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: defaultValues ?? schemaDefaults,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      {schema.fields.map((field, index) => (
        <DynamicFormField
          key={
            field.type === 'header'
              ? `header-${index}`
              : field.type === 'row'
                ? `row-${index}`
                : field.key
          }
          field={field}
          control={control}
          register={register}
          errors={errors}
        />
      ))}

      <button
        type="submit"
        className="w-full py-3.5 rounded-2xl bg-blue-500 text-white text-base font-semibold shadow-sm active:bg-blue-600 transition-colors mt-2"
      >
        {submitLabel}
      </button>
    </form>
  )
}

export default DynamicForm
