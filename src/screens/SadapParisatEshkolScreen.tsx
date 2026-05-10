function SadapParisatEshkolScreen() {
  return (
    <div dir="rtl" className="flex flex-col h-full overflow-y-auto">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800">
        סד"פ פריסת אשכול
      </header>

      <div className="flex flex-col gap-5 p-4">

        {/* ציר חצובה */}
        <section className="flex flex-col gap-2">
          <h3 className="font-bold underline text-neutral-800">ציר חצובה:</h3>
          <p className="font-bold text-neutral-800">בע"ת פורסים: 2 מעגנים + מפקד משימה</p>
          <ul className="flex flex-col gap-1.5 pr-4">
            <li className="list-disc text-neutral-700">
              <span className="underline font-medium">מעגנים</span> מפלסים קרקע עם את חפירה (במידת הצורך)
            </li>
            <li className="list-disc text-neutral-700">
              <span className="underline font-medium">מעגנים</span> מרכיבים רגליים אחוריות לבסיס
            </li>
            <li className="list-disc text-neutral-700">
              <span className="underline font-medium">מפקד משימה ומעגנים </span> מציינים את המשנר באק"א
            </li>
            <li className="list-disc text-neutral-700">
              <span className="underline font-medium">מפקד משימה</span> עושה בדיקת פילוס ראשונית
            </li>
            <li className="list-disc text-neutral-700">
              <span className="underline font-medium">מעגנים</span> קודחים ומעגנים למרקע
            </li>
            <li className="list-disc text-neutral-700">
              <span className="underline font-medium">מפקד משימה</span> מוודא פילוס תקין
            </li>
            <li className="list-disc text-neutral-700">
              <span className="underline font-medium">מפק"צ</span> מכריז צוות פועל
            </li>
          </ul>
        </section>

        {/* צוות פועל - two-column table */}
        <section className="flex flex-col gap-2">
          <h3 className="font-bold text-center text-neutral-800 border border-neutral-400 py-1">צוות פועל</h3>
          <table className="w-full border-collapse text-sm text-neutral-700">
            <thead>
              <tr className="bg-neutral-100">
                <th className="border border-neutral-400 p-2 font-bold text-center w-1/2">ציר חצובה</th>
                <th className="border border-neutral-400 p-2 font-bold text-center w-1/2">ציר מערכת</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-top">
                <td className="border border-neutral-400 p-2">
                  <span className="underline font-medium">מעגנים</span> מרכיבים חלק עליון (שני חלקים – חצובה עליונה וכוורת)
                  <br />
                  <span className="text-neutral-500 text-xs">* אחרי הרכבה מוודאים עיגון יציב – במשיכה וסלסול</span>
                </td>
                <td className="border border-neutral-400 p-2">
                  <span className="underline font-medium">חמש</span> מוציא תיבות מהמנשא וכבל טילים
                </td>
              </tr>
              <tr className="align-top">
                <td className="border border-neutral-400 p-2">
                  <span className="underline font-medium">מפקד משימה</span> מודד אק"א, גלגול עלרוד ורשום בעזר
                </td>
                <td className="border border-neutral-400 p-2">
                  פריסת כבל הרחקה (<span className="underline font-medium">חמש</span> משחרר כבל,{' '}
                  <span className="underline font-medium">בק"שיסט</span> משרשר לעמדת ההרחקה)
                </td>
              </tr>
              <tr className="align-top">
                <td className="border border-neutral-400 p-2">
                  <span className="underline font-medium">מעגנים</span> טוענים טילים על המשגר
                </td>
                <td className="border border-neutral-400 p-2">
                  <span className="underline font-medium">בק"שיסט</span> מחבר כבל ההרחקה לתיבת ההרחקה
                </td>
              </tr>
              <tr className="align-top">
                <td className="border border-neutral-400 p-2"></td>
                <td className="border border-neutral-400 p-2">
                  <span className="underline font-medium">חמש</span> מחבר כבל ההרחקה לתיבות
                </td>
              </tr>
              <tr className="align-top">
                <td className="border border-neutral-400 p-2"></td>
                <td className="border border-neutral-400 p-2">
                  <span className="underline font-medium">חמש</span> מדליק מתג BATTERY PACK
                </td>
              </tr>
              <tr className="align-top">
                <td className="border border-neutral-400 p-2"></td>
                <td className="border border-neutral-400 p-2">
                  <span className="underline font-medium">בק"שיסט</span> מדליק מתג Power&amp;nav
                </td>
              </tr>
              <tr className="align-top">
                <td className="border border-neutral-400 p-2"></td>
                <td className="border border-neutral-400 p-2">
                  <span className="underline font-medium">חמש</span> מוודא LIU OFF ומחבר כבל מהLIU לטילים
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* בדיקות מפקד עמדה */}
        <section className="flex flex-col gap-2">
          <h3 className="font-bold underline text-neutral-800">בדיקות מפקד עמדה</h3>
          <ul className="flex flex-col gap-1 pr-4">
            <li className="list-disc text-neutral-700">יציבות עיגון לכל העוגנים</li>
            <li className="list-disc text-neutral-700">פינים במקום</li>
            <li className="list-disc text-neutral-700">הידוק מוט תומך אמצע</li>
            <li className="list-disc text-neutral-700">סגירת פרפריות</li>
            <li className="list-disc text-neutral-700">חיבור טילים</li>
            <li className="list-disc text-neutral-700">אק"א</li>
            <li className="list-disc text-neutral-700">פיץ' ורול</li>
          </ul>
        </section>

        {/* final step */}
        <div className="border border-neutral-400 rounded p-3 text-center font-medium text-neutral-800">
          מפקד מדליק LIU ומכריז "אשכול חם"
        </div>

      </div>
    </div>
  )
}

export default SadapParisatEshkolScreen
