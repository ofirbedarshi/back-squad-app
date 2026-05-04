import MenuButton from '../components/MenuButton'

function HomeScreen() {
  return (
    <div dir="rtl" className="flex flex-col h-full">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100">
        תפריט ראשי
      </header>

      <div className="flex flex-col gap-3 p-4">
        <MenuButton label='סדפ"ים' to="/sadpam" />
        <MenuButton label="נדברים" to="/nidbarim" />
        <MenuButton label="עמדה נוכחית" to="/current-position" primary />
      </div>
    </div>
  )
}

export default HomeScreen
