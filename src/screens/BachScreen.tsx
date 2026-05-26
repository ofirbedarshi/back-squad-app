import { useNavigate } from 'react-router-dom'
import DynamicForm from '../components/DynamicForm/DynamicForm'
import { useNotification } from '../hooks/useNotification'
import type { FormValues } from '../domain/dynamicForm.types'
import { addBachUseCase } from '../useCases/addBach'
import { bachFormSchema } from './bachForm.schema'

function BachScreen() {
  const { notifySuccess } = useNotification()
  const navigate = useNavigate()

  function handleSubmit(values: FormValues) {
    addBachUseCase({ values })
    notifySuccess('הבדח נשמר בהצלחה')
    navigate('/others/bach')
  }

  return (
    <div dir="rtl" className="flex flex-col h-full">
      <header className="sticky top-0 z-10 bg-white px-4 py-3 flex items-center justify-between border-b border-neutral-200 shrink-0">
        <span className="font-bold text-lg text-neutral-800">בדח תחקור ותקיפה</span>
        <button
          type="submit"
          form="bach-form"
          className="text-sm font-bold text-white bg-blue-600 rounded-xl px-4 py-2 active:bg-blue-700 touch-manipulation"
        >
          שמור טופס
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <DynamicForm
          formId="bach-form"
          schema={bachFormSchema}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default BachScreen
