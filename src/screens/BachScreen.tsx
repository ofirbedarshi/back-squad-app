import DynamicForm from '../components/DynamicForm/DynamicForm'
import { useNotification } from '../hooks/useNotification'
import { bachFormSchema } from './bachForm.schema'
import type { FormValues } from '../domain/dynamicForm.types'

function BachScreen() {
  const { notifySuccess } = useNotification()

  function handleSubmit(values: FormValues) {
    console.log('bach form values:', values)
    notifySuccess('הטופס נשמר בהצלחה')
  }

  return (
    <div dir="rtl" className="flex flex-col h-full overflow-y-auto">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800 shrink-0">
        בדח תחקור ותקיפה
      </header>

      <div className="p-4">
        <DynamicForm
          schema={bachFormSchema}
          onSubmit={handleSubmit}
          submitLabel="שמור טופס"
        />
      </div>
    </div>
  )
}

export default BachScreen
