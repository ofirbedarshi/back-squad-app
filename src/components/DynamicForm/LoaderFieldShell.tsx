import type { ReactNode } from 'react'
import type { UseFormGetValues, UseFormRegister } from 'react-hook-form'
import { makeFieldValidator } from '../../domain/dynamicFormValidation'
import type { FormValues, ToggleWithConditionsField } from '../../domain/dynamicForm.types'
import type { LoaderFieldShellFieldDef } from './loaderFieldShell.types'

interface LoaderFieldShellProps {
  fieldDef: LoaderFieldShellFieldDef
  register: UseFormRegister<FormValues>
  getValues: UseFormGetValues<FormValues>
  parentByKey: Map<string, ToggleWithConditionsField>
  errorMessage?: string
  actions: ReactNode
}

function LoaderFieldShell({
  fieldDef,
  register,
  getValues,
  parentByKey,
  errorMessage,
  actions,
}: LoaderFieldShellProps) {
  return (
    <>
      <input
        type="hidden"
        {...register(fieldDef.key, {
          validate: makeFieldValidator(fieldDef, getValues, parentByKey),
        })}
      />

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2 pt-2">
          {fieldDef.bold
            ? <h2 className="text-base font-bold underline text-neutral-800">{fieldDef.text}</h2>
            : <h3 className="text-sm font-semibold text-neutral-500">{fieldDef.text}</h3>
          }
          {actions}
        </div>

        {errorMessage && (
          <p className="text-xs text-red-500 px-1">{errorMessage}</p>
        )}
      </div>
    </>
  )
}

export default LoaderFieldShell
