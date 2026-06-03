import HeaderOptionsMenu from './HeaderOptionsMenu'
import ListHeaderAddButton from './ListHeaderAddButton'
import type { OptionsMenuItem } from './OptionsMenu'

interface ListScreenHeaderProps {
  title: string
  addLabel: string
  onAdd: () => void
  menuItems: OptionsMenuItem[]
  hideAdd?: boolean
  titleClassName?: string
}

function ListScreenHeader({
  title,
  addLabel,
  onAdd,
  menuItems,
  hideAdd = false,
  titleClassName = 'font-bold text-lg',
}: ListScreenHeaderProps) {
  return (
    <header className="relative grid grid-cols-[auto_1fr_auto] items-center gap-2 py-3 px-3 border-b border-neutral-200 text-neutral-800 bg-white">
      <div className="justify-self-start shrink-0">
        {!hideAdd ? <ListHeaderAddButton label={addLabel} onClick={onAdd} /> : null}
      </div>
      <h1 className={`text-center min-w-0 ${titleClassName}`}>{title}</h1>
      <div className="w-24 shrink-0 justify-self-end" aria-hidden />
      <HeaderOptionsMenu items={menuItems} />
    </header>
  )
}

export default ListScreenHeader
