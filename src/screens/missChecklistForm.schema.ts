import type { FormSchema } from '../domain/dynamicForm.types'

export const missChecklistFormSchema: FormSchema = {
  fields: [
    {
      type: 'checkboxWithFields',
      key: 'impactLocationDetectedChecked',
      label: 'בדוק האם זוהה מקום הפגיעה',
      fields: [
        {
          type: 'toggleWithConditions',
          key: 'impactLocationDetected',
          label: 'תשובה',
          options: ['כן', 'לא'],
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
    },
    {
      type: 'checkbox',
      key: 'indicatorKozEnteredInMeansChecked',
      label: 'בדוק מול מציין מה הקוץ שמוזן באמצעי',
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
    },
    {
      type: 'checkboxWithFields',
      key: 'indicatorNearTargetWeatherConditionsChecked',
      label: 'בדוק עם המציין תנאי מז"א בקרבת המטרה',
      highlightBorderWhen: [
        { field: 'nearTargetWeatherWind', equals: 'כן' },
        { field: 'nearTargetWeatherCloudsOrHaze', equals: 'כן' },
        { field: 'nearTargetWeatherRain', equals: 'כן' },
      ],
      fields: [
        {
          type: 'toggle',
          key: 'nearTargetWeatherWind',
          label: 'רוח',
          options: ['כן', 'לא'],
        },
        {
          type: 'toggle',
          key: 'nearTargetWeatherCloudsOrHaze',
          label: 'עננים או אובך',
          options: ['כן', 'לא'],
        },
        {
          type: 'toggle',
          key: 'nearTargetWeatherRain',
          label: 'גשם',
          options: ['כן', 'לא'],
        },
      ],
    },
    {
      type: 'checkboxWithFields',
      key: 'attackCellFlightAltitudeWeatherConditionsChecked',
      label: 'בדוק עם תא תקיפה תנאי מז"א בגובה המעוף',
      highlightBorderWhen: [
        { field: 'attackCellFlightAltitudeWeatherValid', equals: 'לא' },
      ],
      fields: [
        {
          type: 'toggle',
          key: 'attackCellFlightAltitudeWeatherValid',
          label: 'תקין',
          options: ['כן', 'לא'],
        },
      ],
    },
    {
      type: 'checkboxWithFields',
      key: 'indicatorAmuraApexAngleAsked',
      label: 'העבר למציין אמורה – שאל מה זווית הקודקוד להזין',
      highlightBorderWhen: [{ field: 'indicatorAmuraApexAngle', greaterThan: 55 }],
      fields: [
        { type: 'number', key: 'indicatorAmuraApexAngle', label: 'זווית קודקוד' },
        {
          type: 'note',
          text: '*הערך מעל 55',
          visibleWhen: { field: 'indicatorAmuraApexAngle', greaterThan: 55 },
        },
      ],
    },
    {
      type: 'checkboxWithFields',
      key: 'indicatorNearTargetObstaclesAsked',
      label: 'שאל שוב את המציין אם יש הסתרים בקרבת המטרה',
      highlightBorderWhen: [{ field: 'indicatorNearTargetObstacles', equals: 'יש' }],
      fields: [
        {
          type: 'toggleWithConditions',
          key: 'indicatorNearTargetObstacles',
          label: 'יש הסתרים?',
          options: ['יש', 'אין'],
          conditions: {
            יש: [
              {
                type: 'checkbox',
                key: 'indicatorNearTargetObstaclesRecalculateChecked',
                label: 'חשב מחדש',
              },
            ],
          },
        },
      ],
    },
    {
      type: 'checkbox',
      key: 'targetOrMissionNumberDuplicateFilterChecked',
      label: 'וודא כי אין כפילות במספר מטרה ו/או משימה – בצע "סינון"',
    },
    {
      type: 'checkboxWithFields',
      key: 'northSourceMethodChecked',
      label: 'כיצד הוזנה האק"א?',
      fields: [
        {
          type: 'toggleWithConditions',
          key: 'northSourceMethod',
          label: 'אופן ההזנה',
          options: ['מוצא צפון', 'טימאפס', 'מצפן'],
          conditions: {
            'מוצא צפון': [],
            טימאפס: [],
            מצפן: [
              {
                type: 'checkbox',
                key: 'indicatorRecheckAkaAfterCompass',
                label: 'בדוק אק"א מחדש',
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
      label: 'בדוק אם היה ירי בכיווניות',
      highlightBorderWhenAll: [
        { field: 'hadDirectionalShooting', equals: 'כן' },
        { field: 'missionRangeMeters', greaterThan: 8000 },
      ],
      fields: [
        {
          type: 'toggleWithConditions',
          key: 'hadDirectionalShooting',
          label: 'האם היה ירי בכיווניות?',
          options: ['כן', 'לא'],
          conditions: {
            כן: [
              {
                type: 'note',
                text: '*ירי בכיווניות והטווח במשימה מעל 8000 מטר',
                visibleWhen: { field: 'missionRangeMeters', greaterThan: 8000 },
              },
              {
                type: 'checkbox',
                key: 'directionalShootingRecheckObstaclesChecked',
                label: 'בדוק מחדש מכשולים והסתרים מכיוון מעוף הטיל',
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
      fields: [{ type: 'text', key: 'targetType', label: 'סוג המטרה' }],
    },
    {
      type: 'checkboxWithFields',
      key: 'reflectiveTargetChecked',
      label: 'בדוק אם המטרה הייתה רפלקטיבית או בקרבת משטחים רפלקטיביים',
      highlightBorderWhen: [{ field: 'reflectiveTarget', equals: 'כן' }],
      fields: [
        {
          type: 'toggle',
          key: 'reflectiveTarget',
          label: 'תשובה',
          options: ['כן', 'לא'],
        },
      ],
    },
    {
      type: 'checkboxWithFields',
      key: 'targetFaceChecked',
      label: 'מה היה מפנה המטרה? (חזית וכיוון החזית? גג?)',
      fields: [{ type: 'text', key: 'targetFace', label: 'מפנה המטרה' }],
    },
    {
      type: 'checkboxWithFields',
      key: 'multipleSpotsChecked',
      label: 'בדוק אם היה ריבוי כתמים',
      highlightBorderWhen: [{ field: 'multipleSpots', equals: 'כן' }],
      fields: [
        {
          type: 'toggle',
          key: 'multipleSpots',
          label: 'היה ריבוי כתמים?',
          options: ['כן', 'לא'],
        },
      ],
    },
    {
      type: 'checkboxWithFields',
      key: 'spotBouncedChecked',
      label: 'בדוק אם בוצעה הקפצת כתם',
      highlightBorderWhen: [{ field: 'spotBounced', equals: 'כן' }],
      fields: [
        {
          type: 'toggle',
          key: 'spotBounced',
          label: 'בוצעה הקפצת כתם?',
          options: ['כן', 'לא'],
        },
      ],
    },
    {
      type: 'checkboxWithFields',
      key: 'deflectionDoneChecked',
      label: 'בדוק אם הייתה הסטה',
      fields: [
        {
          type: 'toggle',
          key: 'deflectionDone',
          label: 'הייתה הסטה?',
          options: ['כן', 'לא'],
        },
      ],
    },
    {
      type: 'checkboxWithFields',
      key: 'crossPositionChecked',
      label: 'בדוק את מיקום הצלב ביחס לנקודת הפגיעה הרצויה',
      fields: [{ type: 'text', key: 'crossPosition', label: 'מיקום הצלב' }],
    },
    {
      type: 'checkboxWithFields',
      key: 'missileImpactRelativeToCrossChecked',
      label: 'היכן פגע הטיל ביחס לצלב?',
      fields: [
        { type: 'text', key: 'missileImpactRelativeToCross', label: 'מיקום הפגיעה' },
      ],
    },
    {
      type: 'checkboxWithFields',
      key: 'spotSlidingChecked',
      label: 'בדוק אם הייתה גלישה של הכתם (גלישה מהחזית? גלישה לתוך חלון? וכו\')',
      highlightBorderWhen: [{ field: 'spotSliding', equals: 'כן' }],
      fields: [
        {
          type: 'toggle',
          key: 'spotSliding',
          label: 'תשובה',
          options: ['כן', 'לא'],
        },
      ],
    },
    {
      type: 'checkboxWithFields',
      key: 'spotSizeWithSpreadChecked',
      label: 'בדוק מה גודל הכתם (כולל מריחה)',
      fields: [
        { type: 'text', key: 'spotSizeWithSpread', label: 'גודל הכתם (כולל מריחה)' },
      ],
    },
    {
      type: 'checkboxWithFields',
      key: 'spotDriftChecked',
      label: 'בדוק אם הייתה בליעה של הכתם',
      highlightBorderWhen: [{ field: 'spotDrift', equals: 'כן' }],
      fields: [
        {
          type: 'toggle',
          key: 'spotDrift',
          label: 'תשובה',
          options: ['כן', 'לא'],
        },
      ],
    },

    { type: 'header', text: 'שיגור', bold: true },

    {
      type: 'checkboxWithFields',
      key: 'fallingIndicatorsOkChecked',
      label: 'בדוק את מצייני הנפילה בהוצאת הטילים מהמזוודות',
      highlightBorderWhen: [{ field: 'fallingIndicatorsOk', equals: 'לא' }],
      fields: [
        {
          type: 'toggle',
          key: 'fallingIndicatorsOk',
          label: 'תשובה',
          options: ['כן', 'לא'],
        },
      ],
    },
    {
      type: 'checkboxWithFields',
      key: 'hiveOkChecked',
      label: 'בדוק את מצב הכוורת (פרפרים סגורות? חנוכיות תקניות? מחברים תקינים? הכוורת לא מעוקמת?  ראצ\'טים משוחררים?)',
      highlightBorderWhen: [{ field: 'hiveOk', equals: 'לא' }],
      fields: [
        {
          type: 'toggle',
          key: 'hiveOk',
          label: 'תקין?',
          options: ['כן', 'לא'],
        },
      ],
    },
  ],
}
