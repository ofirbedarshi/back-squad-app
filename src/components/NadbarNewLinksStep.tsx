import IndicatorLoadButton from './IndicatorLoadButton'
import NadbarLinkPickerSection from './NadbarLinkPickerSection'
import NadbarNewLinksStepHeader from './NadbarNewLinksStepHeader'
import NadbarNewStepNextFooter from './NadbarNewStepNextFooter'
import PositionLoadButton from './PositionLoadButton'
import TargetLoadButton from './TargetLoadButton'
import type { NadbarLinksUpdate, NadbarType } from '../domain/nadbar.types'

interface NadbarNewLinksStepProps {
  nadbarType: NadbarType
  pointerId?: string
  targetId?: string
  positionId?: string
  onLinksChange: (links: NadbarLinksUpdate) => void
  onNext: () => void
}

function NadbarNewLinksStep({
  nadbarType,
  pointerId,
  targetId,
  positionId,
  onLinksChange,
  onNext,
}: NadbarNewLinksStepProps) {
  const canProceed = Boolean(pointerId && targetId && positionId)

  return (
    <div dir="rtl" className="flex h-full min-h-0 flex-col bg-neutral-50">
      <NadbarNewLinksStepHeader nadbarType={nadbarType} />

      <div className="flex min-h-0 flex-1 flex-col gap-3 px-3 py-2">
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
      </div>

      <NadbarNewStepNextFooter canProceed={canProceed} onNext={onNext} />
    </div>
  )
}

export default NadbarNewLinksStep
