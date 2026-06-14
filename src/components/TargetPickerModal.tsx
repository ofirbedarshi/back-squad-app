import { useEffect, useState } from 'react'
import Modal from './base/Modal'
import TargetCard from './TargetCard'
import TargetSearchBar from './TargetSearchBar'
import type { Target } from '../domain/target.types'
import { calculateTargetLiveMetricsUseCase } from '../useCases/calculateTargetLiveMetrics'
import { filterByQuery } from '../utils/search'
import { getTargetSearchFields, filterTargetsByAdvancedFilter } from '../utils/targetSearch'
import type { TargetAdvancedFilter } from '../utils/targetSearch.types'
import { emptyTargetAdvancedFilter } from '../utils/targetSearch.types'

interface TargetPickerModalProps {
  open: boolean
  title: string
  onClose: () => void
  targets: Target[]
  emptyListMessage?: string
  onPick: (target: Target) => void
}

function TargetPickerModal({
  open,
  title,
  onClose,
  targets,
  emptyListMessage = 'אין מטרות שמורות לבחירה',
  onPick,
}: TargetPickerModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [advancedFilter, setAdvancedFilter] = useState<TargetAdvancedFilter>(emptyTargetAdvancedFilter)

  useEffect(() => {
    if (!open) {
      setSearchQuery('')
      setAdvancedFilter(emptyTargetAdvancedFilter)
    }
  }, [open])

  if (!open) return null

  const textFilteredTargets = filterByQuery(targets, searchQuery, getTargetSearchFields)
  const filteredTargets = filterTargetsByAdvancedFilter(
    textFilteredTargets,
    advancedFilter,
    (target) => calculateTargetLiveMetricsUseCase({ targetCoordinates: target.coordinates, targetHeight: target.altitude }),
  )

  function handleCardPick(target: Target) {
    onPick(target)
    onClose()
  }

  return (
    <Modal title={title} onClose={onClose}>
      <div className="flex flex-col gap-3">
        {targets.length > 0 ? (
          <TargetSearchBar
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            advancedFilter={advancedFilter}
            onAdvancedFilterChange={setAdvancedFilter}
          />
        ) : null}

        {targets.length === 0 ? (
          <p className="text-center text-neutral-500 text-sm py-6">{emptyListMessage}</p>
        ) : filteredTargets.length === 0 ? (
          <p className="text-center text-neutral-400 py-8">לא נמצאו תוצאות</p>
        ) : (
          filteredTargets.map((target) => (
            <TargetCard key={target.id} target={target} onClick={() => handleCardPick(target)} />
          ))
        )}
      </div>
    </Modal>
  )
}

export default TargetPickerModal
