import { useState } from 'react'
import OptionsMenu from './OptionsMenu'
import type { OptionsMenuItem } from './OptionsMenu'

interface HeaderOptionsMenuProps {
  items: OptionsMenuItem[]
}

function HeaderOptionsMenu({ items }: HeaderOptionsMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full text-neutral-500 active:bg-neutral-100 touch-manipulation select-none text-xl leading-none"
        aria-label="אפשרויות"
      >
        ⋮
      </button>

      {open && <OptionsMenu items={items} onClose={() => setOpen(false)} />}
    </>
  )
}

export default HeaderOptionsMenu
