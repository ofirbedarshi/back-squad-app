import MenuButton from '../components/MenuButton'

function OthersScreen() {
  return (
    <div dir="rtl" className="flex flex-col h-full">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800">
        אחרים
      </header>

      <div className="flex flex-col gap-3 p-4">
        <MenuButton label='בדח תחקור ותקיפה' to="/others/bach" />
        <MenuButton label='צאק"ליסט החטאה' to="/others/miss-checklist" />
        <MenuButton label="עזר מטרות למפקד משימה" to="/others/target-aid" />
        <MenuButton label='רשמ״צים' to="/others/rshatazim" />
      </div>
    </div>
  )
}

export default OthersScreen
