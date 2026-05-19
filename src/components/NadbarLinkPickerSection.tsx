import type { ReactNode } from 'react'
import LoadPickerSuccessBadge from './base/LoadPickerSuccessBadge'

interface NadbarLinkPickerSectionProps {
  title: string
  description: string
  isComplete?: boolean
  children: ReactNode
}

function NadbarLinkPickerSection({ title, description, isComplete = false, children }: NadbarLinkPickerSectionProps) {
  const completeDescription = 'הישות קושרה בהצלחה'

  return (
    <section
      className={[
        'rounded-3xl border p-[18px] shadow-sm',
        isComplete
          ? 'border-green-200 bg-gradient-to-b from-white to-green-50/60'
          : 'border-neutral-200/80 bg-white/90',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-2.5">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold tracking-tight text-neutral-800">{title}</h2>
          <p className="mt-1 text-sm leading-snug text-neutral-500">{isComplete ? completeDescription : description}</p>
        </div>
        {isComplete ? <LoadPickerSuccessBadge /> : null}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  )
}

export default NadbarLinkPickerSection
