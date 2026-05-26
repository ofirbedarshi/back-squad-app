import type { FormSchema } from '../domain/dynamicForm.types'

export const missChecklistFormSchema: FormSchema = {
  fields: [
    {
      type: 'checkboxWithFields',
      key: 'impactLocationDetectedChecked',
      label: 'בדוק האם זוהה מקום הפגיעה',
      defaultValue: false,
      fields: [
        {
          type: 'toggleWithConditions',
          key: 'impactLocationDetected',
          label: 'תשובה',
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
                    {
                      type: 'text',
                      key: 'impactLocationDescription',
                      label: 'תיאור מיקום הפגיעה',
                    },
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
      ],
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
      type: 'toggleWithConditions',
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
      conditions: {
        לא: [
          {
            type: 'multiSelectToggle',
            key: 'exitInvalidSigns',
            label: 'פרט',
            options: ['מעוף', 'רעש', 'ריח', 'עשן'],
          },
          {
            type: 'text',
            key: 'exitInvalidDetailsText',
            label: 'פירוט נוסף',
          },
        ],
      },
    },
    {
      type: 'checkbox',
      key: 'indicatorNameAndDirectionCodeMatchMissionChecked',
      label: 'וודא כי שם המצין וקוד הציון תואמים למשימה במחשב',
      defaultValue: false,
    },
    {
      type: 'checkboxWithFields',
      key: 'indicatorNearTargetWeatherConditionsChecked',
      label: 'בדוק עם המציין תנאי מז"א בקרבת המטרה',
      defaultValue: false,
      fields: [
        {
          type: 'toggle',
          key: 'nearTargetWeatherWind',
          label: 'רוח',
          options: ['כן', 'לא'],
          defaultValue: 'לא',
        },
        {
          type: 'toggle',
          key: 'nearTargetWeatherCloudsOrHaze',
          label: 'עננים או אובך',
          options: ['כן', 'לא'],
          defaultValue: 'לא',
        },
        {
          type: 'toggle',
          key: 'nearTargetWeatherRain',
          label: 'גשם',
          options: ['כן', 'לא'],
          defaultValue: 'לא',
        },
      ],
    },
    {
      type: 'checkboxWithFields',
      key: 'attackCellFlightAltitudeWeatherConditionsChecked',
      label: 'בדוק עם תא תקיפה תנאי מז"א בגובה המעוף',
      defaultValue: false,
      fields: [
        {
          type: 'toggle',
          key: 'attackCellFlightAltitudeWeatherValid',
          label: 'תקין',
          options: ['כן', 'לא'],
          defaultValue: 'לא',
        },
      ],
    },
    {
      type: 'checkboxWithFields',
      key: 'indicatorAmuraApexAngleAsked',
      label: 'העבר למציין אמורה – שאל מה זווית הקודקוד להזין',
      defaultValue: false,
      fields: [
        { type: 'number', key: 'indicatorAmuraApexAngle', label: 'זווית קודקוד' },
      ],
    },
    {
      type: 'checkboxWithFields',
      key: 'indicatorNearTargetObstaclesAsked',
      label: 'שאל שוב את המציין אם יש הסתרים בקרבת המטרה',
      defaultValue: false,
      fields: [
        {
          type: 'toggle',
          key: 'indicatorNearTargetObstacles',
          label: 'יש הסתרים?',
          options: ['יש', 'אין'],
          defaultValue: 'אין',
        },
      ],
    },
    {
      type: 'checkbox',
      key: 'targetOrMissionNumberDuplicateFilterChecked',
      label: 'וודא כי אין כפילות במספר מטרה ו/או משימה – בצע "סינון"',
      defaultValue: false,
    },
    {
      type: 'checkboxWithFields',
      key: 'northSourceMethodChecked',
      label: 'כיצד הוזנה האק"א?',
      defaultValue: false,
      fields: [
        {
          type: 'toggleWithConditions',
          key: 'northSourceMethod',
          label: 'אופן ההזנה',
          options: ['מוצא צפון', 'טימאפס', 'מצפן'],
          defaultValue: 'מוצא צפון',
          conditions: {
            'מוצא צפון': [],
            טימאפס: [],
            מצפן: [
              {
                type: 'checkbox',
                key: 'indicatorRecheckAkaAfterCompass',
                label: 'בדוק אק"א מחדש',
                defaultValue: false,
                visibleWhen: {
                  or: [
                    { field: 'impactLocationDetected', equals: 'לא' },
                    { field: 'impactLocationKind', equals: 'רחוק' },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
    {
      type: 'checkboxWithFields',
      key: 'missionDataEnteredChecked',
      label: 'הזן נתוני משימה',
      defaultValue: false,
      fields: [
        { type: 'number', key: 'missionRangeMeters', label: 'טווח (מטרים)' },
        { type: 'number', key: 'missionHeightDiff', label: 'הפרש גובה' },
        {
          type: 'toggle',
          key: 'missionFlightPath',
          label: 'מסלול',
          options: ['+lofted', 'lofted', 'low', 'flat'],
        },
      ],
    },
    {
      type: 'checkboxWithFields',
      key: 'directionalShootingChecked',
      label: 'ירי בכיווניות',
      defaultValue: false,
      fields: [
        {
          type: 'toggleWithConditions',
          key: 'hadDirectionalShooting',
          label: 'האם היה ירי בכיווניות?',
          options: ['כן', 'לא'],
          defaultValue: 'לא',
          conditions: {
            כן: [
              {
                type: 'checkbox',
                key: 'directionalShootingRecheckObstaclesChecked',
                label: 'בדוק מחדש מכשולים והסתרים מכיוון מעוף הטיל',
                defaultValue: false,
              },
            ],
            לא: [],
          },
        },
      ],
    },
    {
      type: 'checkboxWithFields',
      key: 'targetTypeChecked',
      label: 'מה היה סוג המטרה?',
      defaultValue: false,
      fields: [{ type: 'text', key: 'targetType', label: 'סוג המטרה' }],
    },
    {
      type: 'checkboxWithFields',
      key: 'reflectiveTargetChecked',
      label: 'האם המטרה הייתה רפלקטיבית או בקרבת משטחים רפלקטיביים?',
      defaultValue: false,
      fields: [
        {
          type: 'toggle',
          key: 'reflectiveTarget',
          label: 'תשובה',
          options: ['כן', 'לא'],
          defaultValue: 'לא',
        },
      ],
    },
    {
      type: 'checkboxWithFields',
      key: 'targetFaceChecked',
      label: 'מה היה מפנה המטרה? (חזית וכיוון החזית? גג?)',
      defaultValue: false,
      fields: [{ type: 'text', key: 'targetFace', label: 'מפנה המטרה' }],
    },
    {
      type: 'checkboxWithFields',
      key: 'multipleSpotsChecked',
      label: 'האם היה ריבוי כתמים?',
      defaultValue: false,
      fields: [
        {
          type: 'toggle',
          key: 'multipleSpots',
          label: 'תשובה',
          options: ['כן', 'לא'],
          defaultValue: 'לא',
        },
      ],
    },
    {
      type: 'checkboxWithFields',
      key: 'spotBouncedChecked',
      label: 'האם בוצעה הקפצת כתם?',
      defaultValue: false,
      fields: [
        {
          type: 'toggle',
          key: 'spotBounced',
          label: 'תשובה',
          options: ['כן', 'לא'],
          defaultValue: 'לא',
        },
      ],
    },
    {
      type: 'checkboxWithFields',
      key: 'deflectionDoneChecked',
      label: 'האם הייתה הסטה?',
      defaultValue: false,
      fields: [
        {
          type: 'toggle',
          key: 'deflectionDone',
          label: 'תשובה',
          options: ['כן', 'לא'],
          defaultValue: 'לא',
        },
      ],
    },
    {
      type: 'checkboxWithFields',
      key: 'crossPositionChecked',
      label: 'מה מיקום הצלב ביחס לנקודת הפגיעה הרצויה?',
      defaultValue: false,
      fields: [{ type: 'text', key: 'crossPosition', label: 'מיקום הצלב' }],
    },
    {
      type: 'checkboxWithFields',
      key: 'missileImpactRelativeToCrossChecked',
      label: 'היכן פגע הטיל ביחס לצלב?',
      defaultValue: false,
      fields: [
        { type: 'text', key: 'missileImpactRelativeToCross', label: 'מיקום הפגיעה' },
      ],
    },
    {
      type: 'checkboxWithFields',
      key: 'spotSlidingChecked',
      label: 'האם הייתה גלישה של הכתם (גלישה מהחזית? גלישה לתוך חלון? וכו\')?',
      defaultValue: false,
      fields: [
        {
          type: 'toggle',
          key: 'spotSliding',
          label: 'תשובה',
          options: ['כן', 'לא'],
          defaultValue: 'לא',
        },
      ],
    },
    {
      type: 'checkboxWithFields',
      key: 'spotDriftChecked',
      label: 'האם הייתה בליעה של הכתם?',
      defaultValue: false,
      fields: [
        {
          type: 'toggle',
          key: 'spotDrift',
          label: 'תשובה',
          options: ['כן', 'לא'],
          defaultValue: 'לא',
        },
      ],
    },

    { type: 'header', text: 'שיגור', bold: true },

    {
      type: 'checkboxWithFields',
      key: 'fallingIndicatorsOkChecked',
      label: 'האם בהוצאת הטילים מהמזוודות מצייני הנפילה היו תקינים?',
      defaultValue: false,
      fields: [
        {
          type: 'toggle',
          key: 'fallingIndicatorsOk',
          label: 'תשובה',
          options: ['כן', 'לא'],
          defaultValue: 'לא',
        },
      ],
    },
    {
      type: 'checkboxWithFields',
      key: 'hiveOkChecked',
      label: 'האם הכוורת תקינה (פרפרים סגורות? חנוכיות תקניות? מחברים תקינים? הכוורת לא מעוקמת? ראצ\'טים משוחררים? סגר מסע פתוח?)',
      defaultValue: false,
      fields: [
        {
          type: 'toggle',
          key: 'hiveOk',
          label: 'תשובה',
          options: ['כן', 'לא'],
          defaultValue: 'לא',
        },
      ],
    },
  ],
}
