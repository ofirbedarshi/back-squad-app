import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NadbarCard from '../components/NadbarCard'
import HeaderOptionsMenu from '../components/base/HeaderOptionsMenu'
import OptionsMenu from '../components/base/OptionsMenu'
import { useConfirm } from '../hooks/useConfirm'
import { useNotification } from '../hooks/useNotification'
import { loadNadbarsUseCase } from '../useCases/loadNadbars'
import { removeAllNadbarsUseCase } from '../useCases/removeAllNadbars'
import { removeNadbarUseCase } from '../useCases/removeNadbar'
import type { Nadbar } from '../domain/nadbar.types'
import { getNadbarCardTitle } from '../utils/nadbarDisplay'

function NadbarimScreen() {
  const [nadbars, setNadbars] = useState<Nadbar[]>([])
  const [menuNadbar, setMenuNadbar] = useState<Nadbar | null>(null)
  const navigate = useNavigate()
  const confirm = useConfirm()
  const { notifySuccess } = useNotification()

  useEffect(() => {
    setNadbars(loadNadbarsUseCase())
  }, [])

  async function handleRemove(nadbar: Nadbar) {
    const confirmed = await confirm({
      title: 'מחיקת נדבר',
      message: `למחוק את "${getNadbarCardTitle(nadbar)}"?`,
      confirmLabel: 'מחק',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (!confirmed) return
    removeNadbarUseCase(nadbar.id)
    setNadbars(loadNadbarsUseCase())
    notifySuccess('הנדבר נמחק')
  }

  async function handleRemoveAll() {
    const confirmed = await confirm({
      title: 'מחיקת כל הנדברים',
      message: 'פעולה זו תמחק את כל הנדברים השמורים ללא אפשרות שחזור.',
      confirmLabel: 'מחק הכל',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (!confirmed) return
    removeAllNadbarsUseCase()
    setNadbars(loadNadbarsUseCase())
    notifySuccess('כל הנדברים נמחקו')
  }

  return (
    <div dir="rtl" className="flex flex-col bg-neutral-50 min-h-full">
      <header className="relative py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800 bg-white">
        נדברים
        <HeaderOptionsMenu
          items={[
            {
              label: 'מחק את כל הנדברים',
              variant: 'danger',
              onSelect: handleRemoveAll,
            },
          ]}
        />
      </header>

      <div className="flex flex-col gap-3 p-4">
        {nadbars.length === 0 && (
          <p className="text-center text-neutral-400 py-8">אין נדברים שמורים</p>
        )}

        {nadbars.map((nadbar) => (
          <NadbarCard
            key={nadbar.id}
            nadbar={nadbar}
            onClick={() => navigate(`/nadbarim/${nadbar.id}/edit`)}
            onLongPress={() => setMenuNadbar(nadbar)}
          />
        ))}

        {menuNadbar && (
          <OptionsMenu
            title={getNadbarCardTitle(menuNadbar)}
            items={[
              {
                label: 'מחק נדבר',
                variant: 'danger',
                onSelect: () => handleRemove(menuNadbar),
              },
            ]}
            onClose={() => setMenuNadbar(null)}
          />
        )}

        <button
          type="button"
          onClick={() => navigate('/nadbarim/new')}
          className="w-full py-4 rounded-2xl border-2 border-dashed border-neutral-300 text-neutral-500 font-semibold text-base active:bg-neutral-100 transition-colors touch-manipulation select-none"
        >
          + הוסף נדבר
        </button>
      </div>
    </div>
  )
}

export default NadbarimScreen
