import { useState } from 'react'
import DynamicForm from '../components/DynamicForm/DynamicForm'
import { useConfirm } from '../hooks/useConfirm'
import { useNotification } from '../hooks/useNotification'
import type { FormValues } from '../domain/dynamicForm.types'
import { targetAidFormSchema } from '../domain/targetAidForm.schema'
import {
  clearTargetAidFormUseCase,
  loadTargetAidFormUseCase,
  saveTargetAidFormUseCase,
} from '../useCases/targetAidForm'

function TargetAidScreen() {
  const confirm = useConfirm()
  const { notifySuccess } = useNotification()
  const [formDefaults, setFormDefaults] = useState<FormValues>(() => loadTargetAidFormUseCase())
  const [formKey, setFormKey] = useState(0)

  function handleSubmit(values: FormValues) {
    saveTargetAidFormUseCase(values)
    setFormDefaults(values)
    notifySuccess('הטופס נשמר')
  }

  async function handleClear() {
    const confirmed = await confirm({
      title: 'ניקוי טופס',
      message: 'למחוק את כל השדות בעזר מטרות למפקד משימה? לא ניתן לשחזר.',
      confirmLabel: 'נקה הכל',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (!confirmed) return

    setFormDefaults(clearTargetAidFormUseCase())
    setFormKey((k) => k + 1)
  }

  return (
    <div dir="rtl" className="flex flex-col h-full">
      <header className="sticky top-0 z-10 bg-white px-4 py-3 flex items-center justify-between border-b border-neutral-200 shrink-0 gap-2">
        <button
          type="submit"
          form="target-aid-form"
          className="text-sm font-bold text-white bg-blue-600 rounded-xl px-3 py-2 active:bg-blue-700 touch-manipulation shrink-0"
        >
          שמור
        </button>
        <span className="flex-1 text-center font-bold text-lg text-neutral-800 min-w-0">
          עזר מטרות למפקד משימה
        </span>
        <button
          type="button"
          onClick={() => void handleClear()}
          className="text-xs text-red-600 border border-red-200 rounded-lg px-2.5 py-1.5 font-medium active:bg-red-50 touch-manipulation shrink-0"
        >
          נקה טופס
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <DynamicForm
          key={formKey}
          formId="target-aid-form"
          schema={targetAidFormSchema}
          defaultValues={formDefaults}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default TargetAidScreen
