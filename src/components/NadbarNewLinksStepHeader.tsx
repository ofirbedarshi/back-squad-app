import type { NadbarType } from '../domain/nadbar.types'
import { getNadbarTypeLabel } from '../utils/nadbarDisplay'

interface NadbarNewLinksStepHeaderProps {
  nadbarType: NadbarType
}

function NadbarNewLinksStepHeader({ nadbarType }: NadbarNewLinksStepHeaderProps) {
  return (
    <header className="shrink-0 px-3 pb-0.5 pt-2 text-center">
      <p className="text-[11px] font-bold text-blue-600">שלב 1 מתוך 2</p>
      <h1 className="mt-0.5 text-lg font-bold leading-tight text-neutral-800">קישור מציין, מטרה ועמדה</h1>
      <p className="mt-0.5 truncate text-xs text-neutral-500">
        בחר את כל הישויות · {getNadbarTypeLabel(nadbarType)}
      </p>
    </header>
  )
}

export default NadbarNewLinksStepHeader
