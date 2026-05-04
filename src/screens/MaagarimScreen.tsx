import MenuButton from '../components/MenuButton'

function MaagarimScreen() {
  return (
    <div dir="rtl" className="flex flex-col h-full">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800">
        מאגרים
      </header>

      <div className="flex flex-col gap-3 p-4">
        <MenuButton label="עמדות" to="/maagarim/positions" />
        <MenuButton label="מציינים" to="/maagarim/indicators" />
      </div>
    </div>
  )
}

export default MaagarimScreen
