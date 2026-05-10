import DynamicForm from '../components/DynamicForm/DynamicForm'
import { useNotification } from '../hooks/useNotification'
import { missChecklistFormSchema } from './missChecklistForm.schema'
import type { FormValues } from '../domain/dynamicForm.types'

function MissChecklistScreen() {
  const { notifySuccess } = useNotification()

  function handleSubmit(values: FormValues) {
    console.log('miss checklist values:', values)
    notifySuccess('הצ\'קליסט נשמר בהצלחה')
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
    </div>
  )
}

export default MissChecklistScreen
