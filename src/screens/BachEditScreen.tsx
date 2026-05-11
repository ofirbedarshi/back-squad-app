import { useNavigate, useParams } from 'react-router-dom'
import DynamicForm from '../components/DynamicForm/DynamicForm'
import { useNotification } from '../hooks/useNotification'
import { useDomainError } from '../hooks/useDomainError'
import type { FormValues } from '../domain/dynamicForm.types'
import { loadBachById } from '../storage/bachStorage'
import { updateBachUseCase } from '../useCases/updateBach'
import { bachFormSchema } from './bachForm.schema'

function BachEditScreen() {
  const { id } = useParams<{ id: string }>()
  const { notifySuccess } = useNotification()
  const { triggerError } = useDomainError()
  const navigate = useNavigate()

  const bach = id ? loadBachById(id) : undefined

  if (!bach) {
    triggerError('הבדח המבוקש לא נמצא')
    navigate('/others/bach', { replace: true })
    return null
  }

  function handleSubmit(values: FormValues) {
    updateBachUseCase(bach!, { values })
    notifySuccess('הבדח עודכן בהצלחה')
    navigate('/others/bach')
  }

  return (
    <div dir="rtl" className="flex flex-col h-full">
      <header className="sticky top-0 z-10 bg-white px-4 py-3 flex items-center justify-between border-b border-neutral-200 shrink-0">
        <span className="font-bold text-lg text-neutral-800">עריכת בדח</span>
        <button
          type="submit"
          form="bach-edit-form"
          className="text-sm font-bold text-white bg-blue-600 rounded-xl px-4 py-2 active:bg-blue-700 touch-manipulation"
        >
          שמור שינויים
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <DynamicForm
          formId="bach-edit-form"
          schema={bachFormSchema}
          defaultValues={bach.values as Partial<FormValues>}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default BachEditScreen
