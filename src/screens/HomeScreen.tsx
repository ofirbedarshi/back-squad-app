import MenuButton from '../components/MenuButton'
import CloudHeightWidget from '../components/CloudHeightWidget'

function HomeScreen() {
  return (
    <div dir="rtl" className="flex flex-col h-full">
      <header className="px-4 border-b border-neutral-200 flex items-center justify-between">
        <div className="w-24" />
        <span className="font-bold text-lg text-neutral-800 py-4">תפריט ראשי</span>
        <CloudHeightWidget />
      </header>

      <div className="flex flex-col gap-3 p-4">
        <MenuButton label="עמדה נוכחית" to="/current-position" primary />
        <MenuButton label="מאגרים" to="/maagarim" />
        <MenuButton label="נדברים" to="/nidbarim" />
        <MenuButton label='סדפ"ים' to="/sadap" />
        <MenuButton label="אחרים" to="/others" />
        <MenuButton label="הערות" to="/notes" />
      </div>
    </div>
  )
}

export default HomeScreen
