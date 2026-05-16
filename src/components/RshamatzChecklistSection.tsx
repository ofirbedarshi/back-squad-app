import RshamatzChecklistItem from './RshamatzChecklistItem'
import type { RshamatzChecklistSectionDef } from './rshamatzChecklist.types'

interface RshamatzChecklistSectionProps {
  section: RshamatzChecklistSectionDef
  checked: Record<string, boolean>
  onToggle: (id: string) => void
}

function RshamatzChecklistSection({ section, checked, onToggle }: RshamatzChecklistSectionProps) {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="font-bold text-neutral-900 text-base">{section.title}</h3>
      <div className="flex flex-col gap-0.5">
        {section.items.map((item) => (
          <RshamatzChecklistItem
            key={item.id}
            label={item.label}
            checked={!!checked[item.id]}
            onChange={() => onToggle(item.id)}
          />
        ))}
      </div>
    </section>
  )
}

export default RshamatzChecklistSection
