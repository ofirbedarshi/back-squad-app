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
    <div dir="rtl" className="flex flex-col bg-neutral-50 min-h-full">
      <NadbarNewLinksStepHeader nadbarType={nadbarType} />

      <div className="flex-1 overflow-y-auto px-3.5 pb-4 pt-2 flex flex-col gap-3">
        <NadbarLinkPickerSection
          title="מציין"
          description="בחר מציין מהמאגר"
          isComplete={Boolean(pointerId)}
        >
          <IndicatorLoadButton
            large
            indicatorId={pointerId}
            onSelect={(indicator) => onLinksChange({ pointerId: indicator.id })}
            onClear={() => onLinksChange({ pointerId: null })}
          />
        </NadbarLinkPickerSection>

        <NadbarLinkPickerSection
          title="מטרה"
          description="בחר מטרה ממאגר המטרות"
          isComplete={Boolean(targetId)}
        >
          <TargetLoadButton
            large
            targetId={targetId}
            onSelect={(target) => onLinksChange({ targetId: target.id })}
            onClear={() => onLinksChange({ targetId: null })}
          />
        </NadbarLinkPickerSection>

        <NadbarLinkPickerSection
          title="עמדה"
          description="בחר עמדה ממאגר העמדות"
          isComplete={Boolean(positionId)}
        >
          <PositionLoadButton
            large
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
