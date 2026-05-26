import { useNavigate } from 'react-router-dom'
import DocFeedbackModal from '../components/base/DocFeedbackModal'
import DynamicForm from '../components/DynamicForm/DynamicForm'
import { useNotification } from '../hooks/useNotification'
import type { FormValues } from '../domain/dynamicForm.types'
import { addMissChecklistUseCase } from '../useCases/addMissChecklist'
import { missChecklistFormSchema } from './missChecklistForm.schema'
import missChecklistDocMarkdown from '../../docs/צקליסט-החטאה.md?raw'

function MissChecklistScreen() {
  // #region agent log
  fetch('http://127.0.0.1:7426/ingest/4a83feaa-631d-41d5-8558-e70907ee82ba',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'16f59f'},body:JSON.stringify({sessionId:'16f59f',location:'MissChecklistScreen.tsx:mount',message:'MissChecklistScreen render',data:{},timestamp:Date.now(),hypothesisId:'H-C'})}).catch(()=>{});
  // #endregion
  const { notifySuccess } = useNotification()
  const navigate = useNavigate()

  function handleSubmit(values: FormValues) {
    addMissChecklistUseCase({ values })
    notifySuccess("הצ'קליסט נשמר בהצלחה")
    navigate('/others/miss-checklist')
  }

  return (
    <div dir="rtl" className="flex flex-col h-full">
      <header className="sticky top-0 z-10 bg-white px-4 py-3 flex items-center justify-between border-b border-neutral-200 shrink-0">
        <span className="font-bold text-lg text-neutral-800">צאק"ליסט החטאה</span>
        <button
          type="submit"
          form="miss-checklist-form"
          className="text-sm font-bold text-white bg-blue-600 rounded-xl px-4 py-2 active:bg-blue-700 touch-manipulation"
        >
          שמור טופס
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <DynamicForm
          formId="miss-checklist-form"
          schema={missChecklistFormSchema}
          onSubmit={handleSubmit}
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
