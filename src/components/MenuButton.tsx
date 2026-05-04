import { useNavigate } from 'react-router-dom'

interface MenuButtonProps {
  label: string
  to: string
  primary?: boolean
}

function MenuButton({ label, to, primary = false }: MenuButtonProps) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(to)}
      className={[
        'w-full p-4 rounded-2xl border text-base font-medium text-right',
        'shadow-sm select-none touch-manipulation transition-transform duration-75',
        'active:scale-[0.97] active:shadow-none',
        primary
          ? 'bg-gradient-to-l from-blue-400 to-blue-600 text-white border-transparent font-bold active:brightness-90'
          : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 active:bg-neutral-100 dark:active:bg-neutral-700',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

export default MenuButton
