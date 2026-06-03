import { useConfirm } from '../hooks/useConfirm'
import { useDomainError } from '../hooks/useDomainError'
import { useNotification } from '../hooks/useNotification'
import { clearAllAppDataUseCase } from '../useCases/clearAllAppData'

function SettingsScreen() {
  const confirm = useConfirm()
  const { triggerError } = useDomainError()
  const { notifySuccess } = useNotification()

  async function handleClearAllData() {
    const confirmed = await confirm({
      title: 'מחיקת כל הנתונים',
      message:
        'פעולה זו תמחק לצמיתות את כל הנתונים השמורים באפליקציה: מטרות, עמדות, יומן תקיפות, הערות והקלטות, נדברים, היתכנות לירי, בדחים, צ\'קליסטים, מציינים וכל שאר הנתונים. לא ניתן לשחזר.',
      confirmLabel: 'מחק הכל',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (!confirmed) return

    try {
      await clearAllAppDataUseCase()
      notifySuccess('כל הנתונים נמחקו')
      window.location.reload()
    } catch {
      triggerError('מחיקת הנתונים נכשלה')
    }
  }

  return (
    <div dir="rtl" className="flex flex-col h-full">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800">
        הגדרות
      </header>

      <div className="p-4">
        <button
          type="button"
          onClick={() => void handleClearAllData()}
          className="w-full rounded-2xl border border-red-300 bg-red-50 px-4 py-4 text-base font-semibold text-red-700 shadow-sm touch-manipulation active:bg-red-100"
        >
          מחק את כל הנתונים השמורים
        </button>
      </div>
    </div>
  )
}

export default SettingsScreen
