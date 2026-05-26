import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MissChecklistCard from '../components/MissChecklistCard'
import type { MissChecklist } from '../domain/missChecklist.types'
import { useConfirm } from '../hooks/useConfirm'
import { useDomainError } from '../hooks/useDomainError'
import { useNotification } from '../hooks/useNotification'
import { loadMissChecklistsUseCase } from '../useCases/loadMissChecklists'
import { removeMissChecklistUseCase } from '../useCases/removeMissChecklist'

function MissChecklistListScreen() {
  const [items, setItems] = useState<MissChecklist[]>(() => loadMissChecklistsUseCase())
  const navigate = useNavigate()
  const confirm = useConfirm()
  const { triggerError } = useDomainError()
  const { notifySuccess } = useNotification()

  useEffect(() => {
    setItems(loadMissChecklistsUseCase())
  }, [])

  async function handleRemove(id: string) {
    const confirmed = await confirm({
      title: "מחיקת צ'קליסט",
      message: "האם למחוק את הצ'קליסט? לא ניתן לשחזר אחרי המחיקה.",
      confirmLabel: 'מחק',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (!confirmed) return
    try {
      removeMissChecklistUseCase(id)
      setItems(loadMissChecklistsUseCase())
      notifySuccess("הצ'קליסט נמחק")
    } catch {
      triggerError("מחיקת הצ'קליסט נכשלה")
    }
  }

  return (
    <div dir="rtl" className="flex flex-col bg-neutral-50 min-h-full">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800 bg-white">
        צאק"ליסט החטאה
      </header>

      <div className="flex flex-col gap-3 p-4">
        {items.length === 0 && (
          <p className="text-center text-neutral-400 py-8">אין צ'קליסטים שמורים</p>
        )}

        {items.map((item) => (
          <MissChecklistCard
            key={item.id}
            item={item}
            onClick={() => navigate(`/others/miss-checklist/${item.id}/edit`)}
            menuItems={[
              {
                label: "מחק צ'קליסט",
                variant: 'danger',
                onSelect: () => void handleRemove(item.id),
              },
            ]}
          />
        ))}

        <button
          type="button"
          onClick={() => navigate('/others/miss-checklist/new')}
          className="w-full py-4 rounded-2xl border-2 border-dashed border-neutral-300 text-neutral-500 font-semibold text-base active:bg-neutral-100 transition-colors touch-manipulation select-none"
        >
          + הוסף צ'קליסט
        </button>
      </div>
    </div>
  )
}

export default MissChecklistListScreen
