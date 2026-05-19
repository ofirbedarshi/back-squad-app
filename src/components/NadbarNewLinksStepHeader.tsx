import type { NadbarType } from '../domain/nadbar.types'
import { getNadbarTypeLabel } from '../utils/nadbarDisplay'

interface NadbarNewLinksStepHeaderProps {
  nadbarType: NadbarType
}

function NadbarNewLinksStepHeader({ nadbarType }: NadbarNewLinksStepHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white px-4 py-4 border-b border-neutral-200 shrink-0 text-center">
      <p className="text-xs font-semibold text-blue-600 mb-1">שלב 1 מתוך 2</p>
      <h1 className="font-bold text-lg text-neutral-800">קישור מציין ומטרה</h1>
      <p className="text-sm text-neutral-500 mt-1">{getNadbarTypeLabel(nadbarType)}</p>
    </header>
  )
}

export default NadbarNewLinksStepHeader
