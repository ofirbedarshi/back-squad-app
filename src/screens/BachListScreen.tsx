import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BachCard from '../components/BachCard'
import HeaderOptionsMenu from '../components/base/HeaderOptionsMenu'
import type { Bach } from '../domain/bach.types'
import { useConfirm } from '../hooks/useConfirm'
import { useDomainError } from '../hooks/useDomainError'
import { useNotification } from '../hooks/useNotification'
import { loadBachsUseCase } from '../useCases/loadBachs'
import { removeAllBachsUseCase } from '../useCases/removeAllBachs'
import { removeBachUseCase } from '../useCases/removeBach'

function BachListScreen() {
  const [bachs, setBachs] = useState<Bach[]>(() => loadBachsUseCase())
  const navigate = useNavigate()
  const confirm = useConfirm()
  const { triggerError } = useDomainError()
  const { notifySuccess } = useNotification()

  useEffect(() => {
    setBachs(loadBachsUseCase())
  }, [])

  async function handleRemove(id: string) {
    const confirmed = await confirm({
      title: 'מחיקת בדח',
      message: 'האם למחוק את הבדח? לא ניתן לשחזר אחרי המחיקה.',
      confirmLabel: 'מחק',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (!confirmed) return
    try {
      removeBachUseCase(id)
      setBachs(loadBachsUseCase())
      notifySuccess('הבדח נמחק')
    } catch {
      triggerError('מחיקת הבדח נכשלה')
    }
  }

  async function handleRemoveAll() {
    const confirmed = await confirm({
      title: 'מחיקת כל הבדחים',
      message: 'פעולה זו תמחק את כל הבדחים השמורים ללא אפשרות שחזור.',
      confirmLabel: 'מחק הכל',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (!confirmed) return
    try {
      removeAllBachsUseCase()
      setBachs(loadBachsUseCase())
      notifySuccess('כל הבדחים נמחקו')
    } catch {
      triggerError('מחיקת כל הבדחים נכשלה')
    }
  }

  return (
    <div dir="rtl" className="flex flex-col bg-neutral-50 min-h-full">
      <header className="relative py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800 bg-white">
        בדח תחקור ותקיפה
        <HeaderOptionsMenu
          items={[
            {
              label: 'מחק את כל הבדחים',
              variant: 'danger',
              onSelect: () => void handleRemoveAll(),
            },
          ]}
        />
      </header>

      <div className="flex flex-col gap-3 p-4">
        {bachs.length === 0 && (
          <p className="text-center text-neutral-400 py-8">אין בדחים שמורים</p>
        )}

        {bachs.map((bach) => (
          <BachCard
            key={bach.id}
            bach={bach}
            onClick={() => navigate(`/others/bach/${bach.id}/edit`)}
            menuItems={[
              {
                label: 'מחק בדח',
                variant: 'danger',
                onSelect: () => void handleRemove(bach.id),
              },
            ]}
          />
        ))}

        <button
          type="button"
          onClick={() => navigate('/others/bach/new')}
          className="w-full py-4 rounded-2xl border-2 border-dashed border-neutral-300 text-neutral-500 font-semibold text-base active:bg-neutral-100 transition-colors touch-manipulation select-none"
        >
          + הוסף בדח
        </button>
      </div>
    </div>
  )
}

export default BachListScreen
