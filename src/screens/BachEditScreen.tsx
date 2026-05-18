import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DynamicForm, { type DynamicFormRef } from '../components/DynamicForm/DynamicForm'
import { useNotification } from '../hooks/useNotification'
import { useDomainError } from '../hooks/useDomainError'
import { useConfirm } from '../hooks/useConfirm'
import type { FormValues } from '../domain/dynamicForm.types'
import { FORM_DRAFT_KEYS } from '../domain/formDraft.types'
import { loadBachById } from '../storage/bachStorage'
import { updateBachUseCase } from '../useCases/updateBach'
import { clearFormDraftUseCase } from '../useCases/clearFormDraft'
import { bachFormSchema } from './bachForm.schema'

function BachEditScreen() {
  const { id } = useParams<{ id: string }>()
  const { notifySuccess } = useNotification()
  const { triggerError } = useDomainError()
  const navigate = useNavigate()
  const confirm = useConfirm()
  const formRef = useRef<DynamicFormRef>(null)

  const bach = id ? loadBachById(id) : undefined

  if (!bach) {
    triggerError('הבדח המבוקש לא נמצא')
    navigate('/others/bach', { replace: true })
    return null
  }

  const draftKey = FORM_DRAFT_KEYS.bachEdit(bach.id)

  function handleSubmit(values: FormValues) {
    clearFormDraftUseCase(draftKey)
    updateBachUseCase(bach!, { values })
    notifySuccess('הבדח עודכן בהצלחה')
    navigate('/others/bach')
  }

  async function handleClearDraft() {
    const ok = await confirm({
      title: 'ניקוי טיוטה',
      message: 'לחזור לגירסה האחרונה שנשמרה של הבדח? אם נשמרו שינויים בטיוטה הם יאבדו.',
      confirmLabel: 'נקה טיוטה',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (!ok) return
    clearFormDraftUseCase(draftKey)
    formRef.current?.resetToBaseline()
  }

  return (
    <div dir="rtl" className="flex flex-col h-full">
      <header className="sticky top-0 z-10 bg-white px-4 py-3 flex items-center justify-between border-b border-neutral-200 shrink-0 gap-2">
        <span className="font-bold text-lg text-neutral-800 min-w-0 flex-1">עריכת בדח</span>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => void handleClearDraft()}
            className="text-xs font-semibold text-red-700 border border-red-200 rounded-xl px-3 py-2 active:bg-red-50 touch-manipulation"
          >
            נקה טיוטה
          </button>
          <button
            type="submit"
            form="bach-edit-form"
            className="text-sm font-bold text-white bg-blue-600 rounded-xl px-4 py-2 active:bg-blue-700 touch-manipulation shrink-0"
          >
            שמור שינויים
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <DynamicForm
          ref={formRef}
          formId="bach-edit-form"
          schema={bachFormSchema}
          defaultValues={bach.values as Partial<FormValues>}
          onSubmit={handleSubmit}
          draftKey={draftKey}
        />
      </div>
    </div>
  )
}

export default BachEditScreen
