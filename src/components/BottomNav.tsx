import { NavLink, useNavigate } from 'react-router-dom'

interface NavItem {
  to: string
  label: string
  icon: (active: boolean) => React.ReactNode
}

function iconClass(active: boolean) {
  return active
    ? 'w-7 h-7 stroke-green-600'
    : 'w-7 h-7 stroke-neutral-500'
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={active ? 2.2 : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={iconClass(active)}
    >
      <path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-10.5Z" />
      <path d="M9 22V13h6v9" />
    </svg>
  )
}

function CalculatorIcon({ active }: { active: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={active ? 2.2 : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={iconClass(active)}
    >
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <rect x="7" y="5" width="10" height="3" rx="1" />
      <circle cx="8" cy="13" r="1" fill="currentColor" className={active ? 'fill-green-600' : 'fill-neutral-500'} />
      <circle cx="12" cy="13" r="1" fill="currentColor" className={active ? 'fill-green-600' : 'fill-neutral-500'} />
      <circle cx="16" cy="13" r="1" fill="currentColor" className={active ? 'fill-green-600' : 'fill-neutral-500'} />
      <circle cx="8" cy="17" r="1" fill="currentColor" className={active ? 'fill-green-600' : 'fill-neutral-500'} />
      <circle cx="12" cy="17" r="1" fill="currentColor" className={active ? 'fill-green-600' : 'fill-neutral-500'} />
      <circle cx="16" cy="17" r="1" fill="currentColor" className={active ? 'fill-green-600' : 'fill-neutral-500'} />
    </svg>
  )
}

function AttackLogIcon({ active }: { active: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={active ? 2.2 : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={iconClass(active)}
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
      <line x1="19" y1="5" x2="14.5" y2="9.5" />
      <line x1="21" y1="3" x2="19" y2="5" />
      <line x1="19" y1="3" x2="21" y2="5" />
    </svg>
  )
}

function TargetBankIcon({ active }: { active: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={active ? 2.2 : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={iconClass(active)}
    >
      <path d="M12 2C8.686 2 6 4.686 6 8c0 5 6 13 6 13s6-8 6-13c0-3.314-2.686-6-6-6Z" />
      <circle cx="12" cy="8" r="2.5" />
    </svg>
  )
}

const navItems: NavItem[] = [
  { to: '/', label: 'מסך בית', icon: (active) => <HomeIcon active={active} /> },
  { to: '/calculator', label: 'מחשבון', icon: (active) => <CalculatorIcon active={active} /> },
  { to: '/attack-log', label: 'יומן תקיפות', icon: (active) => <AttackLogIcon active={active} /> },
  { to: '/target-bank', label: 'בנק מטרות', icon: (active) => <TargetBankIcon active={active} /> },
]

function BottomNav() {
  const navigate = useNavigate()

  return (
    <nav
      dir="rtl"
      className="fixed bottom-0 inset-x-0 z-[60] flex items-stretch bg-white border-t border-neutral-200"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          onClick={(e) => {
            e.preventDefault()
            navigate(item.to, { state: { navKey: Date.now() } })
          }}
          className={({ isActive }) =>
            [
              'relative flex flex-col items-center justify-center gap-1 flex-1 py-2.5 min-h-[60px] text-[10px] font-semibold tracking-wide transition-colors touch-manipulation select-none',
              isActive
                ? 'text-green-600'
                : 'text-neutral-500',
            ].join(' ')
          }
        >
          {({ isActive }) => (
            <>
              {item.icon(isActive)}
              <span>{item.label}</span>
              {isActive && (
                <span className="absolute top-0 inset-x-4 h-0.5 rounded-full bg-green-600" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav
