import { useState } from 'react'
import Checkbox from '../components/base/Checkbox'
import { loadSadapParisatDugChecklistUseCase } from '../useCases/loadSadapParisatDugChecklist'
import { toggleSadapParisatDugChecklistItemUseCase } from '../useCases/toggleSadapParisatDugChecklistItem'
import { clearSadapParisatDugChecklistUseCase } from '../useCases/clearSadapParisatDugChecklist'

const CHECKLIST_ITEMS = [
  { id: 'connector-50', label: 'שלושת המחברים של צמת כבל 50 מחוברים היטב ברכב' },
  { id: 'cable-secured', label: 'כבל ההרחקה מאובטח לרכב' },
  { id: 'acdc-on', label: 'ACDC פועל – שמיעת מאורר' },
  { id: 'no-equipment-behind', label: 'אין ציוד מאחורי גזרת העבודה או על הרכב בקו הרשף, לרבות כבלים' },
  { id: 'missile-connectors', label: 'חיבור צמות הטילים' },
  { id: 'butterflies-check', label: 'בדיקת פרפריות 0 ופילוט הכוורת' },
  { id: 'travel-lock', label: 'סגר מסע מורד וראצ\'טים מנותקים' },
  { id: 'mlc-ziud', label: 'MLC דולק' },
  { id: 'doors-closed', label: 'דלתות הרכב סגורות' },
  { id: 'parking', label: 'רכב כבוי, ב PARKING עם בלם רגל לחוץ.' },
  { id: 'liu-unlock', label: 'מפקד מדליק LIU UNLOCK, תיק מפקד משימה לעמדה ומכריז "רכב חם"' }
]

function SadapParisatDugScreen() {
  const [checked, setChecked] = useState<Record<string, boolean>>(
    () => loadSadapParisatDugChecklistUseCase()
  )

  function handleToggle(id: string) {
    setChecked(toggleSadapParisatDugChecklistItemUseCase(id))
  }

  function handleClear() {
    setChecked(clearSadapParisatDugChecklistUseCase())
  }

  return (
    <div dir="rtl" className="flex flex-col h-full overflow-y-auto">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800">
        סד"פ פריסת דוג
      </header>

      <div className="flex flex-col gap-5 p-4">

        {/* main steps */}
        <ul className="flex flex-col gap-2 pr-4">
          <li className="list-disc text-neutral-700">
            נהג מבצע בדיקת נלנול והגבהה ומכבה רכב.
          </li>
          <li className="list-disc text-neutral-700">
            <span className="bg-yellow-200 font-medium px-0.5">מפקד</span> מוודא שטח נקי מסביב למשגר ללא סכנת התלקחות (יש לוודא עבור כל גזרת העבודה).
          </li>
          <li className="list-disc text-neutral-700">
            <span className="bg-yellow-200 font-medium px-0.5">מפקד</span> קובע, ומעדכן את שאר חברי החוליה את מיקום עמדת ההפעלה (מינימום 30 מטר, מחוץ לגזרת העבודה וכמה שיותר מאחורי הרכב).
          </li>
          <li className="list-disc text-neutral-700">
            <span className="bg-yellow-200 font-medium px-0.5">מפקד</span> מכריז פקודת "<strong>צוות פעל</strong>" – ברגע זה החוליה יוצאת מהרכב וכל לוחם רץ בציר שלו.
          </li>
          <li className="list-disc text-neutral-700">
            <span className="bg-yellow-200 font-medium px-0.5">חמש</span> מוודא LIU מכובה, מקפל קשתות, מנתק ראצ'טים, מוריד סגר מסע, ומחבר את צמות הטילים – בסיום לוקח פליקן עבודה לעמדה.
          </li>
          <li className="list-disc text-neutral-700">
            <span className="bg-yellow-200 font-medium px-0.5">מפקד</span> מבצע מדידה של אק"א, אזימוט לקצה גבולות הגזרה ואזימוט למכשולים לבדיקה במידה ויש.
          </li>
          <li className="list-disc font-bold text-neutral-800">
            <span className="bg-yellow-200 px-0.5">סנג'רים</span> פורסים את כבל ההרחקה לכיוון העמדה.
          </li>
          <li className="list-disc font-bold text-neutral-800">
            <span className="bg-yellow-200 px-0.5">אישה</span> לוקח את תיבת ההרחקה עם הטאצ'סטר ויריעת העבודה לכיוון עמדת ההפעלה.
          </li>
          <li className="list-disc font-bold text-neutral-800">
            <span className="bg-yellow-200 px-0.5">אישה</span> מוודא Nav &amp;PWR
          </li>
          <li className="list-disc font-bold text-neutral-800">
            <span className="bg-yellow-200 px-0.5">אישה</span> מחבר ומאבטח את צמות ההרחקה אל התיבה
          </li>
          <li className="list-disc text-neutral-700">
            <span className="bg-yellow-200 px-0.5">אישה</span> מאבטח ומחליף את הצמות ברכב לצמות של תיבת ההרחקה, (יש לשים לב לנתק קודם כל את שתי הצמות הצדדיות, ולאחר מכן את האמצעיות ולהחליף אותה תוך פחות מחצי דקה כדי שה MLC לא יפול.)
          </li>
          <li className="list-disc text-neutral-700">
            <span className="bg-yellow-200 font-medium px-0.5">אישה</span> מזין מיקום עצמי ואק"א על פי מצפן (5+) והזנת גזרת הירי.
          </li>
          <li className="list-disc text-neutral-700">
            <span className="bg-yellow-200 font-medium px-0.5">מפקד ואישה</span> מבצעים בדיקה על גזרת הירי שהוגדרה במערכת (ראה פירוט בהמשך).
          </li>
          <li className="list-disc text-neutral-700">
            <span className="bg-yellow-200 font-medium px-0.5">סנג'רים</span> פורסים גנרטור וכבלים מאריכים לרכב ולעמדת ההפעלה ומחברים ל-ACDC (מינימום 30 מטר מהרכב).
          </li>
          <li className="list-disc text-neutral-700">
            <span className="bg-yellow-200 font-medium px-0.5">סנג'רים</span> מורידים קשרים ומסדרים בעמדה.
          </li>
          <li className="list-disc text-neutral-700">
            <span className="bg-yellow-200 font-medium px-0.5">נהג</span> מכבה רכב, לאחר פקודה ממפקד.
          </li>
          <li className="list-disc text-neutral-700">
            <span className="bg-yellow-200 font-medium px-0.5">אישה ובקשיסט</span> – מפעיל NFS
          </li>
        </ul>

        {/* בדיקות מפקד לפני תחילת עבודה */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold underline text-neutral-800">בדיקות מפקד לפני תחילת עבודה:</h3>
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-neutral-500 border border-neutral-300 rounded px-2 py-1 active:bg-neutral-100"
            >
              נקה הכל
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {CHECKLIST_ITEMS.map((item) => (
              <Checkbox
                key={item.id}
                label={item.label}
                checked={!!checked[item.id]}
                onChange={() => handleToggle(item.id)}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

export default SadapParisatDugScreen
