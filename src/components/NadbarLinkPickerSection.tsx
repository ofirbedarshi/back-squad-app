import type { ReactNode } from 'react'
import LoadPickerSuccessBadge from './base/LoadPickerSuccessBadge'

interface NadbarLinkPickerSectionProps {
  title: string
  description: string
  isComplete?: boolean
  className?: string
  children: ReactNode
}

function NadbarLinkPickerSection({
  title,
  description,
  isComplete = false,
  className,
  children,
}: NadbarLinkPickerSectionProps) {
  return (
    <section
      className={[
        'flex flex-col justify-start gap-1.5 rounded-2xl border px-3 py-2.5 shadow-sm',
        className,
        isComplete
          ? 'border-green-200 bg-gradient-to-b from-white to-green-50/60'
          : 'border-neutral-200/80 bg-white/90',
      ].join(' ')}
    >
      {!isComplete ? (
        <div className="flex min-h-11 items-center gap-2">
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-bold text-neutral-800">{title}</h2>
            <p className="truncate text-xs text-neutral-500">{description}</p>
          </div>
          <div className="shrink-0">{children}</div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-1.5">
            <h2 className="text-sm font-bold text-neutral-800">{title}</h2>
            <LoadPickerSuccessBadge />
          </div>
          <div className="flex min-h-10 items-center gap-2">{children}</div>
        </>
      )}
    </section>
  )
}

export default NadbarLinkPickerSection
