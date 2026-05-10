import MenuButton from '../components/MenuButton'

function SadapScreen() {
  return (
    <div dir="rtl" className="flex flex-col h-full">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800">
        סדפ"ים
      </header>

      <div className="flex flex-col gap-3 p-4">
        <MenuButton label='סד"פ פריסת אשכול' to="/sadap/parisat-eshkol" />
        <MenuButton label='סד"פ קיפול אשכול' to="/sadap/kipul-eshkol" />
        <MenuButton label='סד"פ פריסת דוג' to="/sadap/parisat-dug" />
        <MenuButton label='סד"פ קיפול דוג' to="/sadap/kipul-dug" />
      </div>
    </div>
  )
}

export default SadapScreen
