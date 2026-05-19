import type { NadbarType } from '../domain/nadbar.types'
import { getNadbarTypeLabel } from '../utils/nadbarDisplay'

interface NadbarNewLinksStepHeaderProps {
  nadbarType: NadbarType
}

function NadbarNewLinksStepHeader({ nadbarType }: NadbarNewLinksStepHeaderProps) {
  return (
    <header className="shrink-0 px-4 pb-2 pt-6 text-center">
      <p className="mb-2 text-xs font-bold text-blue-600">שלב 1 מתוך 2</p>
      <h1 className="text-2xl font-bold leading-tight tracking-tight text-neutral-800">
        קישור מציין, מטרה ועמדה
      </h1>
      <p className="mt-2 text-sm text-neutral-500">בחר את כל הישויות כדי להמשיך</p>
      <p className="mt-1 text-xs text-neutral-400">{getNadbarTypeLabel(nadbarType)}</p>
    </header>
  )
}

export default NadbarNewLinksStepHeader
