import MenuButton from '../components/MenuButton'

function FireFeasibilityScreen() {
  return (
    <div dir="rtl" className="flex flex-col h-full">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800">
        היתכנות לירי
      </header>

      <div className="flex flex-col gap-3 p-4">
        <MenuButton label="נצ" to="/fire-feasibility/coords" />
        <MenuButton label="מרחקים וגבהים" to="/fire-feasibility/distances-heights" />
      </div>
    </div>
  )
}

export default FireFeasibilityScreen
