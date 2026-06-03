import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TargetAidCard from '../components/TargetAidCard'
import ListSearchBar from '../components/base/ListSearchBar'
import ListScreenHeader from '../components/base/ListScreenHeader'
import type { TargetAid } from '../domain/targetAid.types'
import { useConfirm } from '../hooks/useConfirm'
import { useDomainError } from '../hooks/useDomainError'
import { useNotification } from '../hooks/useNotification'
import { loadTargetAidsUseCase } from '../useCases/loadTargetAids'
import { removeAllTargetAidsUseCase } from '../useCases/removeAllTargetAids'
import { removeTargetAidUseCase } from '../useCases/removeTargetAid'
import { filterByQuery } from '../utils/search'
import { getTargetAidSearchFields } from '../utils/targetAidSearch'

function TargetAidListScreen() {
  const [items, setItems] = useState<TargetAid[]>(() => loadTargetAidsUseCase())
  const [searchQuery, setSearchQuery] = useState('')
  const filteredItems = filterByQuery(items, searchQuery, getTargetAidSearchFields)
  const navigate = useNavigate()
  const confirm = useConfirm()
  const { triggerError } = useDomainError()
  const { notifySuccess } = useNotification()

  useEffect(() => {
    setItems(loadTargetAidsUseCase())
  }, [])

  async function handleRemove(id: string) {
    const confirmed = await confirm({
      title: 'מחיקת טופס',
      message: 'האם למחוק את הטופס? לא ניתן לשחזר אחרי המחיקה.',
      confirmLabel: 'מחק',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (!confirmed) return
    try {
      removeTargetAidUseCase(id)
      setItems(loadTargetAidsUseCase())
      notifySuccess('הטופס נמחק')
    } catch {
      triggerError('מחיקת הטופס נכשלה')
    }
  }

  async function handleRemoveAll() {
    const confirmed = await confirm({
      title: 'מחיקת כל הטפסים',
      message: 'פעולה זו תמחק את כל הטפסים השמורים ללא אפשרות שחזור.',
      confirmLabel: 'מחק הכל',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (!confirmed) return
    try {
      removeAllTargetAidsUseCase()
      setItems(loadTargetAidsUseCase())
      notifySuccess('כל הטפסים נמחקו')
    } catch {
      triggerError('מחיקת כל הטפסים נכשלה')
    }
  }

  return (
    <div dir="rtl" className="flex flex-col bg-neutral-50 min-h-full">
      <ListScreenHeader
        title="עזר מטרות למפקד משימה"
        addLabel="+ הוסף טופס"
        onAdd={() => navigate('/others/target-aid/new')}
        menuItems={[
          {
            label: 'מחק את כל הטפסים',
            variant: 'danger',
            onSelect: () => void handleRemoveAll(),
          },
        ]}
      />

      <div className="flex flex-col gap-3 p-4">
        <ListSearchBar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          placeholder="חפש לפי שם מטרה..."
        />

        {items.length === 0 && (
          <p className="text-center text-neutral-400 py-8">אין טפסים שמורים</p>
        )}

        {items.length > 0 && filteredItems.length === 0 && (
          <p className="text-center text-neutral-400 py-8">לא נמצאו תוצאות</p>
        )}

        {filteredItems.map((item) => (
          <TargetAidCard
            key={item.id}
            item={item}
            onClick={() => navigate(`/others/target-aid/${item.id}/edit`)}
            menuItems={[
              {
                label: 'מחק טופס',
                variant: 'danger',
                onSelect: () => void handleRemove(item.id),
              },
            ]}
          />
        ))}

        <button
          type="button"
          onClick={() => navigate('/others/target-aid/new')}
          className="w-full py-4 rounded-2xl border-2 border-dashed border-neutral-300 text-neutral-500 font-semibold text-base active:bg-neutral-100 transition-colors touch-manipulation select-none"
        >
          + הוסף טופס
        </button>
      </div>
    </div>
  )
}

export default TargetAidListScreen
