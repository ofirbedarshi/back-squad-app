import type { ReactNode } from 'react'

interface NadbarMessageBlockFrameProps {
  children: ReactNode
}

function NadbarMessageBlockFrame({ children }: NadbarMessageBlockFrameProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-black p-3">{children}</div>
  )
}

export default NadbarMessageBlockFrame
