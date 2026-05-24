import { useNavigate, useParams } from 'react-router-dom'
import DynamicForm from '../components/DynamicForm/DynamicForm'
import { useNotification } from '../hooks/useNotification'
import { useDomainError } from '../hooks/useDomainError'
import type { FormValues } from '../domain/dynamicForm.types'
import { targetAidFormSchema } from '../domain/targetAidForm.schema'
import { loadTargetAidById } from '../storage/targetAidStorage'
import { updateTargetAidUseCase } from '../useCases/updateTargetAid'

function TargetAidEditScreen() {
  const { id } = useParams<{ id: string }>()
  const { notifySuccess } = useNotification()
  const { triggerError } = useDomainError()
  const navigate = useNavigate()

  const item = id ? loadTargetAidById(id) : undefined

  if (!item) {
    triggerError('הטופס המבוקש לא נמצא')
    navigate('/others/target-aid', { replace: true })
    return null
  }

  function handleSubmit(values: FormValues) {
    updateTargetAidUseCase(item!, { values })
    notifySuccess('הטופס עודכן בהצלחה')
    navigate('/others/target-aid')
  }

  return (
    <div dir="rtl" className="flex flex-col h-full">
      <header className="sticky top-0 z-10 bg-white px-4 py-3 flex items-center justify-between border-b border-neutral-200 shrink-0">
        <span className="font-bold text-lg text-neutral-800">עריכת טופס</span>
        <button
          type="submit"
          form="target-aid-edit-form"
          className="text-sm font-bold text-white bg-blue-600 rounded-xl px-4 py-2 active:bg-blue-700 touch-manipulation"
        >
          שמור שינויים
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <DynamicForm
          formId="target-aid-edit-form"
          schema={targetAidFormSchema}
          defaultValues={item.values as Partial<FormValues>}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default TargetAidEditScreen
