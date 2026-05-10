function SadapParisatDugScreen() {
  return (
    <div dir="rtl" className="flex flex-col h-full overflow-y-auto">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800">
        סד"פ פריסת דוג
      </header>

      <div className="flex flex-col gap-5 p-4">

        {/* main steps */}
        <ul className="flex flex-col gap-2 pr-4">
          <li className="list-disc text-neutral-700">
            נגה מבצע בדיקת נלנול והגבהה ומכבה רכב.
          </li>
          <li className="list-disc text-neutral-700">
            <span className="bg-yellow-200 font-medium px-0.5">מפקד</span> מוודא שטח נקי מסביב למשגר ללא סכנת התלקחות (יש לוודא עבור כל גזרת העבודה).
          </li>
          <li className="list-disc text-neutral-700">
            <span className="bg-yellow-200 font-medium px-0.5">מפקד</span> קובע, ומעדכן את שאר חברי החוליה את מיקום עמדת הפעולה (מינימום 30 מטר, מחוץ לגזרת העבודה וכמה שיותר מאחורי הרכב).
          </li>
          <li className="list-disc text-neutral-700">
            <span className="bg-yellow-200 font-medium px-0.5">מפקד</span> מכריז פקודת "<strong>צוות פועל</strong>" – בדגש זה החוליה יוצאת מהרכב וכל לוחם רץ בציר שלו.
          </li>
          <li className="list-disc text-neutral-700">
            <span className="bg-yellow-200 font-medium px-0.5">חמש</span> מוודא LIU מכובה, מקפל קשתות, מנתק ראצ'טים, מוריד סגר מסע, ומחבר את צמות הטילים – בסיום לוקח פליקע לעבודה לעמדה.
          </li>
          <li className="list-disc text-neutral-700">
            <span className="bg-yellow-200 font-medium px-0.5">מפקד</span> מבצע מדידה של אק"א, אזימוט לקצה גבולות הגזרה ואזימוט למכשולים לבדיקה במידה ויש.
          </li>
          <li className="list-disc font-bold text-neutral-800">
            <span className="bg-yellow-200 px-0.5">סנג'רים</span> פורסים את כבל ההרחקה לכיוון העמדה.
          </li>
          <li className="list-disc font-bold text-neutral-800">
            <span className="bg-yellow-200 px-0.5">אישה</span> לוקח את תיבת ההרחקה עם הטאצ'סטר ועובדת הפעולה לכיוון עמדת ההפעלה.
          </li>
          <li className="list-disc font-bold text-neutral-800">
            <span className="bg-yellow-200 px-0.5">אישה</span> מוודא Nav &amp;PWR לתיבה:
          </li>
          <li className="list-disc font-bold text-neutral-800">
            <span className="bg-yellow-200 px-0.5">אישה</span> מחבר ומבצטח את צמות ההרחקה אל התיבה
          </li>
          <li className="list-disc font-bold text-neutral-800">
            <span className="bg-yellow-200 px-0.5">אישה</span> מאבטחת ומחליף את הצמות ברכב לצמות של תיבת ההרחקות, (יש לשים לב לנתק קודם כל את שתי הצמות הצדדיות, ולאחר מכן את האמצעיות ולהחליף אותה תוך פחות מצי דקה כדי שה MLC לא יפול.)
          </li>
          <li className="list-disc text-neutral-700">
            <span className="bg-yellow-200 font-medium px-0.5">אישה</span> מזין מיקום עצמי ואק"א על פי מצפן (5+) והזנת גזרת הירי.
          </li>
          <li className="list-disc text-neutral-700">
            <span className="bg-yellow-200 font-medium px-0.5">מפקד ואישה</span> מבצעים בדיקה על גזרת הירי שהוגדרה במערכת (ראה פירוט בהמשך).
          </li>
          <li className="list-disc text-neutral-700">
            <span className="bg-yellow-200 font-medium px-0.5">סנג'רים</span> פורסים גנרטור וכבלים מאריכים לרכב ולעמדת ההפעלה ומחברים ל-ACDC (מינימום 30 מסר מהרכב).
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
          <h3 className="font-bold underline text-neutral-800">בדיקות מפקד לפני תחילת עבודה:</h3>
          <ul className="flex flex-col gap-1 pr-4">
            <li className="list-disc text-neutral-700">שלושת המחברים של צמת כבל 50 מחוברים היסב ברכב</li>
            <li className="list-disc text-neutral-700">כבל ההרחקה מאובטח לרכב</li>
            <li className="list-disc text-neutral-700">ACDC פועל – שמיעת מאורר</li>
            <li className="list-disc text-neutral-700">אי ציוד מאחורי גזרת העבודה או על הרכב בקו הרשף, לרבות כבלים</li>
            <li className="list-disc text-neutral-700">חיבור צמות הטילים</li>
            <li className="list-disc text-neutral-700">בדיקת פרפריות 0 ופילוט הכוורת</li>
            <li className="list-disc text-neutral-700">סגר מסע מורד וראצ'טים מנותקים</li>
            <li className="list-disc text-neutral-700">זיול MLC</li>
            <li className="list-disc text-neutral-700">דלתות הרכב סגורות</li>
            <li className="list-disc text-neutral-700">רכב כבוי, ב PARKING ופקודת פקיד משימה לעמדה לחוץ</li>
          </ul>
        </section>

        {/* final step */}
        <div className="border border-neutral-400 rounded p-3 text-center font-medium text-neutral-800">
          מפקד מדליק LIU UNLOCK, תיק מפקד משימה לעמדה ומכריז "רכב חם"
        </div>

      </div>
    </div>
  )
}

export default SadapParisatDugScreen
