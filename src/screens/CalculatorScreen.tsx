import MenuButton from '../components/MenuButton'

function CalculatorScreen() {
  return (
    <div dir="rtl" className="flex flex-col h-full">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800">
        מחשבון
      </header>

      <div className="p-4">
        {/* LTR grid so column order matches the reference layout (Hebrew labels remain RTL inside buttons). */}
        <div dir="ltr" className="grid grid-cols-2 gap-3">
          <MenuButton label="מחשבון חדירה ומריחת כתם" to="/calculator/hit-penetration" />
          <MenuButton label="מחשבון המרת יחידות" to="/calculator/unit-conversion" />
          <MenuButton label="מחשבון מטרה בתנועה" to="/calculator/moving-target" />
          <MenuButton label="מחשבון זווית סטיה היסט" to="/calculator/deflection-angle" />
          <div className="min-h-[3.25rem] pointer-events-none select-none" aria-hidden />
          <MenuButton label="מרחק בירי כיווניות" to="/calculator/directional-distance" />
        </div>
      </div>
    </div>
  )
}

export default CalculatorScreen
