import type { FormSchema } from '../domain/dynamicForm.types'

export const missChecklistFormSchema: FormSchema = {
  fields: [
    {
      type: 'toggleWithConditions',
      key: 'impactLocationDetected',
      label: 'בדוק האם זוהה מקום הפגיעה',
      options: ['כן', 'לא'],
      defaultValue: 'לא',
      conditions: {
        כן: [
          {
            type: 'toggleWithConditions',
            key: 'impactLocationKind',
            label: 'מהו מיקום הפגיעה?',
            options: ['קרוב', 'רחוק', 'תיאור מילולי', 'נ.צ.'],
            conditions: {
              'תיאור מילולי': [
                { type: 'text', key: 'impactLocationDescription', label: 'תיאור מיקום הפגיעה' },
              ],
              'נ.צ.': [
                { type: 'coords', key: 'impactLocationCoords', label: 'נ.צ. מקום הפגיעה' },
              ],
            },
          },
          {
            type: 'toggle',
            key: 'impactLocationExploded',
            label: 'האם התפוצץ?',
            options: ['כן', 'לא'],
            defaultValue: 'לא',
          },
        ],
      },
    },
    {
      type: 'checkbox',
      key: 'indicatorTargetDataComparedWithChecklist',
      label: 'השווה מול מציין את נתוני המטרה עם הצ\'קליסט',
      defaultValue: false,
    },
    {
      type: 'checkbox',
      key: 'indicatorKozEnteredInMeansChecked',
      label: 'בדוק מול מציין מה הקוץ שמוזן באמצעי',
      defaultValue: false,
      visibleWhen: {
        or: [
          { field: 'impactLocationDetected', equals: 'לא' },
          { field: 'impactLocationExploded', equals: 'לא' },
        ],
      },
    },
    {
      type: 'toggle',
      key: 'exitWasValid',
      label: 'האם היציאה הייתה תקינה',
      options: ['כן', 'לא'],
      defaultValue: 'לא',
      visibleWhen: {
        or: [
          { field: 'impactLocationKind', equals: 'רחוק' },
          { field: 'impactLocationKind', equals: 'תיאור מילולי' },
          { field: 'impactLocationKind', equals: 'נ.צ.' },
        ],
      },
    },
    { type: 'text', key: 'targetType', label: 'מה היה סוג המטרה?' },
    {
      type: 'toggle',
      key: 'reflectiveTarget',
      label: 'האם המטרה הייתה רפלקטיבית או בקרבת משטחים רפלקטיביים?',
      options: ['כן', 'לא'],
      defaultValue: 'לא',
    },
    { type: 'text', key: 'targetFace', label: 'מה היה מפנה המטרה? (חזית וכיוון החזית? גג?)' },
    {
      type: 'toggle',
      key: 'multipleSpots',
      label: 'האם היה ריבוי כתמים?',
      options: ['כן', 'לא'],
      defaultValue: 'לא',
    },
    {
      type: 'toggle',
      key: 'spotBounced',
      label: 'האם בוצעה הקפצת כתם?',
      options: ['כן', 'לא'],
      defaultValue: 'לא',
    },
    {
      type: 'toggle',
      key: 'deflectionDone',
      label: 'האם הייתה הסטה?',
      options: ['כן', 'לא'],
      defaultValue: 'לא',
    },
    { type: 'text', key: 'crossPosition', label: 'מה מיקום הצלב ביחס לנקודת הפגיעה הרצויה?' },
    { type: 'text', key: 'missileImpactRelativeToCross', label: 'היכן פגע הטיל ביחס לצלב?' },
    {
      type: 'toggle',
      key: 'spotSliding',
      label: 'האם הייתה גלישה של הכתם (גלישה מהחזית? גלישה לתוך חלון? וכו\')?',
      options: ['כן', 'לא'],
      defaultValue: 'לא',
    },
    {
      type: 'toggle',
      key: 'spotDrift',
      label: 'האם הייתה בליעה של הכתם?',
      options: ['כן', 'לא'],
      defaultValue: 'לא',
    },

    { type: 'header', text: 'שיגור', bold: true },

    {
      type: 'toggle',
      key: 'hitDetected',
      label: 'האם זוהתה פגיעה?',
      options: ['כן', 'לא'],
      defaultValue: 'לא',
    },
    {
      type: 'toggle',
      key: 'missileExploded',
      label: 'האם הטיל התפוצץ? (אי-פיצוץ יכול להעיד על בעיה ברכישת הכתם)',
      options: ['כן', 'לא'],
      defaultValue: 'לא',
    },
    { type: 'number', key: 'impactDistanceMeters', label: 'באיזה מרחק מ-נ.צ. המטרה זוהתה פגיעת הטיל? (מטרים)' },
    {
      type: 'toggle',
      key: 'malfunctionOnExit',
      label: 'האם זוהתה תקלה בעת יציאת הטיל? (טיפוס תקין? זווית יציאה תקינה? כיוון מעוף תקין?)',
      options: ['כן', 'לא'],
      defaultValue: 'לא',
    },
    {
      type: 'toggle',
      key: 'dataValidated',
      label: 'האם נעשה ווידוא לתקינות הנתונים?',
      options: ['כן', 'לא'],
      defaultValue: 'לא',
    },
    {
      type: 'toggle',
      key: 'allMissionsValidated',
      label: 'האם נעשה ווידוא לכפל מטרות או משימות בעלות אותו השם?',
      options: ['כן', 'לא'],
      defaultValue: 'לא',
    },
    {
      type: 'toggle',
      key: 'northSourceMethod',
      label: 'כיצד הוזנה האק"א?',
      options: ['מוצא צפון', 'מצפן סימאפס'],
      defaultValue: 'מוצא צפון',
    },
    {
      type: 'toggle',
      key: 'northSourceValidated',
      label: 'האם נעשה ווידוא נוסף של האק"א?',
      options: ['כן', 'לא'],
      defaultValue: 'לא',
    },
    {
      type: 'toggle',
      key: 'fallingIndicatorsOk',
      label: 'האם בהוצאת הטילים מהמזוודות מצייני הנפילה היו תקינים?',
      options: ['כן', 'לא'],
      defaultValue: 'לא',
    },
    {
      type: 'toggle',
      key: 'hiveOk',
      label: 'האם הכוורת תקינה (פרפרים סגורות? חנוכיות תקניות? מחברים תקינים? הכוורת לא מעוקמת? ראצ\'טים משוחררים? סגר מסע פתוח?)',
      options: ['כן', 'לא'],
      defaultValue: 'לא',
    },

    {
      type: 'toggle',
      key: 'directionCodeInsertedIn',
      label: 'האם קוד הציוון הוכנס במשימת ירי או במציין?',
      options: ["הוכנס במשימת יר'", "הוכנס המצי'"],
      defaultValue: "הוכנס במשימת יר'",
    },
    {
      type: 'toggle',
      key: 'targetAbove8km',
      label: 'אם היה שימוש בכיוונות המטרה הייתה מעל 8 ק"מ +?',
      options: ['כן', 'לא'],
      defaultValue: 'לא',
    },
    {
      type: 'toggle',
      key: 'directionApproval',
      label: 'האם היה אישור מהתא עבור כיוונות?',
      options: ['כן', 'לא'],
      defaultValue: 'לא',
    },
  ],
}
