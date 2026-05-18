import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import DynamicForm, { type DynamicFormRef } from '../components/DynamicForm/DynamicForm'
import DocFeedbackModal from '../components/base/DocFeedbackModal'
import { useNotification } from '../hooks/useNotification'
import { useConfirm } from '../hooks/useConfirm'
import type { FormValues } from '../domain/dynamicForm.types'
import { FORM_DRAFT_KEYS } from '../domain/formDraft.types'
import { addMissChecklistUseCase } from '../useCases/addMissChecklist'
import { clearFormDraftUseCase } from '../useCases/clearFormDraft'
import { missChecklistFormSchema } from './missChecklistForm.schema'
import missChecklistDocMarkdown from '../../docs/צקליסט-החטאה.md?raw'

function MissChecklistScreen() {
  const { notifySuccess } = useNotification()
  const navigate = useNavigate()
  const confirm = useConfirm()
  const formRef = useRef<DynamicFormRef>(null)

  function handleSubmit(values: FormValues) {
    clearFormDraftUseCase(FORM_DRAFT_KEYS.MISS_CHECKLIST_CREATE)
    addMissChecklistUseCase({ values })
    notifySuccess("הצ'קליסט נשמר בהצלחה")
    navigate('/others/miss-checklist')
  }

  async function handleClearDraft() {
    const ok = await confirm({
      title: 'ניקוי טיוטה',
      message: 'למחוק את מה שהוזן מהטיוטה? צ’קליסטים כבר שמורים לא משתנים.',
      confirmLabel: 'נקה טיוטה',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (!ok) return
    clearFormDraftUseCase(FORM_DRAFT_KEYS.MISS_CHECKLIST_CREATE)
    formRef.current?.resetToBaseline()
  }

  return (
    <div dir="rtl" className="flex flex-col h-full">
      <header className="sticky top-0 z-10 bg-white px-4 py-3 flex items-center justify-between border-b border-neutral-200 shrink-0 gap-2">
        <span className="font-bold text-lg text-neutral-800 min-w-0 flex-1">צאק"ליסט החטאה</span>
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
            form="miss-checklist-form"
            className="text-sm font-bold text-white bg-blue-600 rounded-xl px-4 py-2 active:bg-blue-700 touch-manipulation shrink-0"
          >
            שמור טופס
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <DynamicForm
          ref={formRef}
          formId="miss-checklist-form"
          schema={missChecklistFormSchema}
          onSubmit={handleSubmit}
          draftKey={FORM_DRAFT_KEYS.MISS_CHECKLIST_CREATE}
        />
      </div>
      <DocFeedbackModal
        markdown={missChecklistDocMarkdown}
        modalTitle="מידע על צ'קליסט החטאה"
        shareTitle="צ'קליסט החטאה"
        openButtonAriaLabel="פתח מידע על צ'קליסט החטאה"
      />
    </div>
  )
}

export default MissChecklistScreen
