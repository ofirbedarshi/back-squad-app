import MenuButton from '../components/MenuButton'

function HomeScreen() {
  return (
    <div dir="rtl" className="flex flex-col h-full">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800">
        תפריט ראשי
      </header>

      <div className="flex flex-col gap-3 p-4">
        <MenuButton label='סדפ"ים' to="/sadpam" />
        <MenuButton label="נדברים" to="/nidbarim" />
        <MenuButton label="מאגרים" to="/maagarim" />
        <MenuButton label="עמדה נוכחית" to="/current-position" primary />
      </div>
    </div>
  )
}

export default HomeScreen
