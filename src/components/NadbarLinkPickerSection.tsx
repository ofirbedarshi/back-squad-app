import type { ReactNode } from 'react'

interface NadbarLinkPickerSectionProps {
  title: string
  description: string
  children: ReactNode
}

function NadbarLinkPickerSection({ title, description, children }: NadbarLinkPickerSectionProps) {
  return (
    <section className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-5">
      <h2 className="font-bold text-neutral-800 mb-1">{title}</h2>
      <p className="text-sm text-neutral-500 mb-4">{description}</p>
      {children}
    </section>
  )
}

export default NadbarLinkPickerSection
