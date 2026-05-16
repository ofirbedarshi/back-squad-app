import MenuButton from '../components/MenuButton'

function RshatazimScreen() {
  return (
    <div dir="rtl" className="flex flex-col h-full">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800">
        רשת"צים
      </header>

      <div className="flex flex-col gap-3 p-4">
        <MenuButton label='רשמ"צ רכב' to="/others/rshatazim/rehev" />
        <MenuButton label='רשמ"צ אשכול' to="/others/rshatazim/eshkol" />
      </div>
    </div>
  )
}

export default RshatazimScreen
