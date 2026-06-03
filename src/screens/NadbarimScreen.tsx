import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListCard from '../components/base/ListCard'
import ListSearchBar from '../components/base/ListSearchBar'
import ListScreenHeader from '../components/base/ListScreenHeader'
import OptionsMenu from '../components/base/OptionsMenu'
import { NADBAR_TYPES, type Nadbar } from '../domain/nadbar.types'
import type { Target } from '../domain/target.types'
import { useConfirm } from '../hooks/useConfirm'
import { useNotification } from '../hooks/useNotification'
import { loadNadbarsUseCase } from '../useCases/loadNadbars'
import { loadTargetsUseCase } from '../useCases/loadTargets'
import { removeAllNadbarsUseCase } from '../useCases/removeAllNadbars'
import { removeNadbarUseCase } from '../useCases/removeNadbar'
import { filterByQuery } from '../utils/search'
import { getNadbarCardDetails, getNadbarCardTitle, getNadbarTypeLabel } from '../utils/nadbarDisplay'
import { getNadbarSearchFields } from '../utils/nadbarSearch'

function NadbarimScreen() {
  const [nadbars, setNadbars] = useState<Nadbar[]>([])
  const [targets, setTargets] = useState<Target[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [typePickerOpen, setTypePickerOpen] = useState(false)
  const filteredNadbars = filterByQuery(nadbars, searchQuery, getNadbarSearchFields)
  const navigate = useNavigate()
  const confirm = useConfirm()
  const { notifySuccess } = useNotification()

  function resetResources() {
    setNadbars(loadNadbarsUseCase())
    setTargets(loadTargetsUseCase())
  }

  useEffect(() => {
    resetResources()
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
    resetResources()
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
    resetResources()
    notifySuccess('כל הנדברים נמחקו')
  }

  return (
    <div dir="rtl" className="flex flex-col bg-neutral-50 min-h-full">
      <ListScreenHeader
        title="נדברים"
        addLabel="+ הוסף נדבר"
        onAdd={() => setTypePickerOpen(true)}
        menuItems={[
          {
            label: 'מחק את כל הנדברים',
            variant: 'danger',
            onSelect: handleRemoveAll,
          },
        ]}
      />

      <div className="flex flex-col gap-3 p-4">
        <ListSearchBar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          placeholder="חפש לפי סוג נדבר..."
        />

        {nadbars.length === 0 && (
          <p className="text-center text-neutral-400 py-8">אין נדברים שמורים</p>
        )}

        {nadbars.length > 0 && filteredNadbars.length === 0 && (
          <p className="text-center text-neutral-400 py-8">לא נמצאו תוצאות</p>
        )}

        {filteredNadbars.map((nadbar) => {
          const { targetName, updatedAtLabel } = getNadbarCardDetails(nadbar, targets)

          return (
            <ListCard
              key={nadbar.id}
              title={getNadbarCardTitle(nadbar)}
              subheader={<span>מטרה: {targetName}</span>}
              lastUpdatedAt={updatedAtLabel}
              onClick={() => navigate(`/nadbarim/${nadbar.id}/edit`)}
              menuTitle={getNadbarCardTitle(nadbar)}
              menuItems={[
                {
                  label: 'מחק נדבר',
                  variant: 'danger',
                  onSelect: () => void handleRemove(nadbar),
                },
              ]}
            />
          )
        })}

        {typePickerOpen && (
          <OptionsMenu
            title="בחר סוג נדבר"
            items={NADBAR_TYPES.filter(
              // TzurPointer hidden for now — not offered in create picker yet
              (type) => type !== 'TzurPointer',
            ).map((type) => ({
              label: getNadbarTypeLabel(type),
              onSelect: () => navigate(`/nadbarim/new/${type}`),
            }))}
            onClose={() => setTypePickerOpen(false)}
          />
        )}

        <button
          type="button"
          onClick={() => setTypePickerOpen(true)}
          className="w-full py-4 rounded-2xl border-2 border-dashed border-neutral-300 text-neutral-500 font-semibold text-base active:bg-neutral-100 transition-colors touch-manipulation select-none"
        >
          + הוסף נדבר
        </button>
      </div>
    </div>
  )
}

export default NadbarimScreen
