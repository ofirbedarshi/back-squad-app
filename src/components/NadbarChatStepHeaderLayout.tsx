import type { ReactNode } from 'react'

interface NadbarChatStepHeaderLayoutProps {
  title: ReactNode
  onSave: () => void
  children: ReactNode
}

function NadbarChatStepHeaderLayout({ title, onSave, children }: NadbarChatStepHeaderLayoutProps) {
  return (
    <header className="sticky top-0 z-10 shrink-0 border-b border-neutral-200 bg-white px-4 py-3 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="min-w-0 flex-1 truncate px-1 text-center text-lg font-bold text-neutral-800">{title}</span>
        <button
          type="button"
          onClick={onSave}
          className="shrink-0 touch-manipulation rounded-xl bg-blue-600 px-3 py-1.5 text-sm font-bold text-white active:bg-blue-700"
        >
          שמור
        </button>
      </div>
      {children ? (
        <div className="flex w-full min-w-0 items-center justify-center gap-1">{children}</div>
      ) : null}
    </header>
  )
}

export default NadbarChatStepHeaderLayout
