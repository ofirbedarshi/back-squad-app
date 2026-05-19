import IndicatorLoadButton from './IndicatorLoadButton'
import NadbarLinkPickerSection from './NadbarLinkPickerSection'
import NadbarNewLinksStepHeader from './NadbarNewLinksStepHeader'
import NadbarNewStepNextFooter from './NadbarNewStepNextFooter'
import TargetLoadButton from './TargetLoadButton'
import type { NadbarLinksUpdate, NadbarType } from '../domain/nadbar.types'

interface NadbarNewLinksStepProps {
  nadbarType: NadbarType
  pointerId?: string
  targetId?: string
  onLinksChange: (links: NadbarLinksUpdate) => void
  onNext: () => void
}

function NadbarNewLinksStep({
  nadbarType,
  pointerId,
  targetId,
  onLinksChange,
  onNext,
}: NadbarNewLinksStepProps) {
  const canProceed = Boolean(pointerId && targetId)

  return (
    <div dir="rtl" className="flex flex-col bg-neutral-50 min-h-full">
      <NadbarNewLinksStepHeader nadbarType={nadbarType} />

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        <NadbarLinkPickerSection title="מציין" description="בחר מציין מהמאגר">
          <IndicatorLoadButton
            large
            indicatorId={pointerId}
            onSelect={(indicator) => onLinksChange({ pointerId: indicator.id })}
            onClear={() => onLinksChange({ pointerId: null })}
          />
        </NadbarLinkPickerSection>

        <NadbarLinkPickerSection title="מטרה" description="בחר מטרה ממאגר המטרות">
          <TargetLoadButton
            large
            targetId={targetId}
            onSelect={(target) => onLinksChange({ targetId: target.id })}
            onClear={() => onLinksChange({ targetId: null })}
          />
        </NadbarLinkPickerSection>
      </div>

      <NadbarNewStepNextFooter canProceed={canProceed} onNext={onNext} />
    </div>
  )
}

export default NadbarNewLinksStep
