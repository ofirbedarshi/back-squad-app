function SadapKipulEshkolScreen() {
  return (
    <div dir="rtl" className="flex flex-col h-full overflow-y-auto">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800">
        סד"פ קיפול אשכול
      </header>

      <div className="flex flex-col gap-6 p-4">
        <section className="flex flex-col gap-2">
          <h3 className="font-bold text-neutral-800">
            <span className="ml-1">1.</span> ציר משגר:
          </h3>
          <ul className="flex flex-col gap-1 pr-4">
            <li className="list-disc text-neutral-700">מכבים LIU</li>
            <li className="list-disc text-neutral-700">מנתקים צמות טילים</li>
            <li className="list-disc text-neutral-700">מנתקים טילים</li>
            <li className="list-disc text-neutral-700">מפרקים כוורת מהבסיס</li>
            <li className="list-disc text-neutral-700">מפרקים חצובה עליונה</li>
            <li className="list-disc text-neutral-700">מוציאים יתדות מהאדמה</li>
            <li className="list-disc text-neutral-700">מוציאים רגליים אחוריות</li>
            <li className="list-disc text-neutral-700">מוציאים חצובה</li>
            <li className="list-disc text-neutral-700">זיווד חצובה במנשאים</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="font-bold text-neutral-800">
            <span className="ml-1">2.</span> ציר מערכת:
          </h3>
          <ul className="flex flex-col gap-1 pr-4">
            <li className="list-disc text-neutral-700">לכבות פאוור אנד אב</li>
            <li className="list-disc text-neutral-700">ניתוק מחברים מתיבת הרחקה</li>
            <li className="list-disc text-neutral-700">כיבוי Battery Pack (לאחר כיבוי MLC)</li>
            <li className="list-disc text-neutral-700">ניתוק כבלים מהמערכות</li>
            <li className="list-disc text-neutral-700">גלגול כבל הרחקה + זיווד מערכות למנשאים</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default SadapKipulEshkolScreen
