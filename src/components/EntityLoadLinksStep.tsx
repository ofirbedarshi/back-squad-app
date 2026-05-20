import IndicatorLoadButton from './IndicatorLoadButton'
import NadbarLinkPickerSection from './NadbarLinkPickerSection'
import EntityLoadLinksStepHeader from './EntityLoadLinksStepHeader'
import LoadLinksStepNextFooter from './LoadLinksStepNextFooter'
import PositionLoadButton from './PositionLoadButton'
import TargetLoadButton from './TargetLoadButton'
import type {
  EntityLinksUpdate,
  EntityLoadLinksSection,
  EntityLoadLinksStepHeaderConfig,
} from '../domain/entityLinks.types'

interface EntityLoadLinksStepProps {
  sections: EntityLoadLinksSection[]
  header: EntityLoadLinksStepHeaderConfig
  pointerId?: string
  targetId?: string
  positionId?: string
  onLinksChange: (links: EntityLinksUpdate) => void
  onNext: () => void
}

function isSectionComplete(
  section: EntityLoadLinksSection,
  ids: { pointerId?: string; targetId?: string; positionId?: string },
): boolean {
  switch (section) {
    case 'indicator':
      return Boolean(ids.pointerId)
    case 'target':
      return Boolean(ids.targetId)
    case 'position':
      return Boolean(ids.positionId)
  }
}

function EntityLoadLinksStep({
  sections,
  header,
  pointerId,
  targetId,
  positionId,
  onLinksChange,
  onNext,
}: EntityLoadLinksStepProps) {
  const ids = { pointerId, targetId, positionId }
  const canProceed = sections.every((section) => isSectionComplete(section, ids))

  return (
    <div dir="rtl" className="flex h-full min-h-0 flex-col bg-neutral-50">
      <EntityLoadLinksStepHeader {...header} />

      <div className="flex min-h-0 flex-1 flex-col gap-3 px-3 py-2">
        {sections.includes('indicator') ? (
          <NadbarLinkPickerSection
            className="min-h-0 flex-1"
            title="מציין"
            description="בחר מציין מהמאגר"
            isComplete={Boolean(pointerId)}
          >
            <IndicatorLoadButton
              variant="section"
              indicatorId={pointerId}
              onSelect={(indicator) => onLinksChange({ pointerId: indicator.id })}
              onClear={() => onLinksChange({ pointerId: null })}
            />
          </NadbarLinkPickerSection>
        ) : null}

        {sections.includes('target') ? (
          <NadbarLinkPickerSection
            className="min-h-0 flex-1"
            title="מטרה"
            description="בחר מטרה ממאגר המטרות"
            isComplete={Boolean(targetId)}
          >
            <TargetLoadButton
              variant="section"
              targetId={targetId}
              onSelect={(target) => onLinksChange({ targetId: target.id })}
              onClear={() => onLinksChange({ targetId: null })}
            />
          </NadbarLinkPickerSection>
        ) : null}

        {sections.includes('position') ? (
          <NadbarLinkPickerSection
            className="min-h-0 flex-1"
            title="עמדה"
            description="בחר עמדה ממאגר העמדות"
            isComplete={Boolean(positionId)}
          >
            <PositionLoadButton
              variant="section"
              positionId={positionId}
              onSelect={(position) => onLinksChange({ positionId: position.id })}
              onClear={() => onLinksChange({ positionId: null })}
            />
          </NadbarLinkPickerSection>
        ) : null}
      </div>

      <LoadLinksStepNextFooter canProceed={canProceed} onNext={onNext} />
    </div>
  )
}

export default EntityLoadLinksStep
