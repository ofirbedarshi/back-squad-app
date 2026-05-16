import type { FormSchema } from '../domain/dynamicForm.types'

export const bachFormSchema: FormSchema = {
  fields: [
    { type: 'header', text: 'כללי', bold: true },
    { type: 'row', fields: [
      { type: 'date', key: 'date', label: 'תאריך' },
      { type: 'time', key: 'hour', label: 'שעה' },
    ]},
    { type: 'text', key: 'sector', label: 'גזרה' },
    { type: 'text', key: 'launchingUnit', label: 'חוליה משגרת' },
    { type: 'text', key: 'markingUnit', label: 'חוליה מציינת' },

    {
      type: 'targetLoader',
      key: 'targetId',
      text: 'מטרה',
      bold: true,
      fieldMappings: {
        targetName: 'targetName',
        targetCoords: 'targetCoords',
        targetAltitude: 'targetAltitude',
        targetDescription: 'targetDescription',
      },
    },
    { type: 'text', key: 'targetName', label: 'שם מטרה', lockedByRef: 'targetId', infoTooltipText: 'שדה זה מתמלא אוטומטית מהמטרה הנטענת ואינו ניתן לעריכה ידנית' },
    { type: 'text', key: 'detection', label: 'איתור' },
    { type: 'coords', key: 'targetCoords', label: 'נ.צ. מטרה', lockedByRef: 'targetId', infoTooltipText: 'שדה זה מתמלא אוטומטית מהמטרה הנטענת ואינו ניתן לעריכה ידנית' },
    { type: 'text', key: 'targetAltitude', label: 'גובה מטרה', lockedByRef: 'targetId', infoTooltipText: 'שדה זה מתמלא אוטומטית מהמטרה הנטענת ואינו ניתן לעריכה ידנית' },
    { type: 'text', key: 'targetDescription', label: 'תיאור המטרה', lockedByRef: 'targetId', infoTooltipText: 'שדה זה מתמלא אוטומטית מהמטרה הנטענת ואינו ניתן לעריכה ידנית' },
    { type: 'text', key: 'requiredAchievement', label: 'הישג נדרש' },
    { type: 'text', key: 'recordingFactor', label: 'גורם מתעד' },
    { type: 'text', key: 'flightAltitude', label: 'גובה מעוף (מתעד)' },
    {
      type: 'toggle',
      key: 'hitProbability',
      label: 'הערכת סיכוי פגיעה',
      options: ['קל', 'בינוני', 'קשה'],
      defaultValue: 'בינוני',
    },
    { type: 'text', key: 'hitProbabilityDetails', label: 'פירוט' },

    { type: 'header', text: 'אישור סיום הבקרה', bold: true },
    { type: 'row', fields: [
      {
        type: 'toggle',
        key: 'controlApproved',
        label: 'אושר',
        options: ['כן', 'לא'],
        defaultValue: 'לא',
      },
      { type: 'text', key: 'approvedBy', label: 'על ידי' },
    ]},

    { type: 'header', text: 'עמדת שיגור', bold: true },
    { type: 'header', text: 'אחורי', bold: false },
    { type: 'text', key: 'positionName', label: 'שם עמדה' },
    { type: 'coords', key: 'positionCoords', label: 'נ.צ. עמדה' },
    { type: 'text', key: 'positionAltitude', label: 'גובה' },
    { type: 'row', fields: [
      { type: 'text', key: 'missileC', label: "צ' הטיל" },
      { type: 'text', key: 'serialNumber', label: "מספר סידורי דוג'" },
    ]},
    { type: 'row', fields: [
      { type: 'text', key: 'barrelNumber', label: 'מספר קנה' },
      { type: 'text', key: 'koz', label: 'קו"צ' },
    ]},
    { type: 'text', key: 'aka', label: 'אק"א' },
    { type: 'row', fields: [
      { type: 'text', key: 'wind', label: 'רוח' },
      { type: 'text', key: 'clouds', label: 'עננות' },
    ]},
    { type: 'text', key: 'azimuthToTarget', label: "אז' עמדה אחורית מטרה (אמורה)" },
    { type: 'text', key: 'launchRange', label: 'טווח עמדת שיגור' },
    { type: 'header', text: 'מאפייני משימה', bold: true },
    {
      type: 'toggle',
      key: 'flightType',
      label: 'סוג מעוף',
      options: ['+lofted','lofted', 'low', 'flat'],
      defaultValue: 'flat',
    },
    { type: 'toggle', key: 'impact', label: 'היסט', options: ['ימין', 'שמאל', 'למעלה', 'למטה'], defaultValue: 'ימין' },
    {
      type: 'toggleWithConditions',
      key: 'arcTrack',
      label: 'מסלול קשתי',
      options: ['כן', 'לא'],
      defaultValue: 'לא',
      conditions: {
        'כן': [
          { type: 'toggle', key: 'arcTrackDirection', label: 'כיוון קשת', options: ['ימין', 'שמאל'], defaultValue: 'ימין' },
        ]
      },
    },
    { type: 'text', key: 'fuseType', label: 'סוג רש"ק' },
    {
      type: 'toggle',
      key: 'delay',
      label: 'השהייה',
      options: ['לא', 'קצרה', 'ארוכה'],
      defaultValue: 'לא',
    },
    { type: 'row', fields: [
      { type: 'time', key: 'launchTime', label: 'שעת שיגור' },
      { type: 'number', key: 'missileFlightTime', label: 'זמן מעוף הטיל' },
    ]},
    { type: 'number', key: 'munitionsCount', label: "מס' חימושים" },
    {
      type: 'toggleWithConditions',
      key: 'manualPlacement',
      label: 'הצבה ידנית',
      options: ['כן', 'לא'],
      defaultValue: 'לא',
      conditions: {
        כן: [
          { type: 'row', fields: [
            {
              type: 'toggle',
              key: 'elevation',
              label: 'הגבהה ',
              options: ['מחשב', 'בוצע'],
              defaultValue: 'מחשב',
            },
            {
              type: 'toggle',
              key: 'sizeup',
              label: 'צידוד ',
              options: ['מחשב', 'בוצע'],
              defaultValue: 'מחשב',
            },
          ]},
        ],
      },
    },
    {
      type: 'toggle',
      key: 'powerSource',
      label: 'הזנת חשמל',
      options: ['רכב מונע', 'גנרטור', 'שקע קיר'],
      defaultValue: 'רכב מונע',
    },
    { type: 'row', fields: [
      { type: 'text', key: 'rightSectorAzimuth', label: 'אז׳ גבול גזרה ימני' },
      { type: 'text', key: 'leftSectorAzimuth', label: 'אז׳ גבול גזרה שמאלי' },
    ]},

    {
      type: 'indicatorLoader',
      key: 'indicatorId',
      text: 'מציין',
      bold: true,
      fieldMappings: {
        indicatorName: 'indicatorName',
        coordinates: 'indicatorPositionCoords',
        altitude: 'indicatorAltitude',
        means: 'indicatorMeans',
        markCode: 'indicatorKoz',
      },
    },
    { type: 'row', fields: [
      { type: 'text', key: 'indicatorName', label: 'שם מציין', lockedByRef: 'indicatorId', infoTooltipText: 'שדה זה מתמלא אוטומטית מהמציין הנטען ואינו ניתן לעריכה ידנית' },
      { type: 'coords', key: 'indicatorPositionCoords', label: 'נ.צ. מציין', lockedByRef: 'indicatorId', infoTooltipText: 'שדה זה מתמלא אוטומטית מהמציין הנטען ואינו ניתן לעריכה ידנית' },
    ]},
    { type: 'row', fields: [
      { type: 'text', key: 'indicatorAltitude', label: 'גובה', lockedByRef: 'indicatorId', infoTooltipText: 'שדה זה מתמלא אוטומטית מהמציין הנטען ואינו ניתן לעריכה ידנית' },
      { type: 'text', key: 'observationMeans', label: 'אמצעי תצפית' },
      { type: 'text', key: 'indicatorMeans', label: 'אמצעי מציין', lockedByRef: 'indicatorId', infoTooltipText: 'שדה זה מתמלא אוטומטית מהמציין הנטען ואינו ניתן לעריכה ידנית' },
    ]},
    { type: 'row', fields: [
      { type: 'text', key: 'indicatorKoz', label: 'קו"צ', lockedByRef: 'indicatorId', infoTooltipText: 'שדה זה מתמלא אוטומטית מהמציין הנטען ואינו ניתן לעריכה ידנית' },
      { type: 'text', key: 'indicatorToTargetAzimuth', label: "אז' מציין מטרה" },
      { type: 'text', key: 'indicationRange', label: 'טווח ציון' },
    ]},
    { type: 'row', fields: [
      { type: 'text', key: 'indicatorWind', label: 'רוח' },
      { type: 'text', key: 'indicatorClouds', label: 'עננות' },
    ]},
    { type: 'text', key: 'aimPoint', label: 'נקודת מכוון' },
    { type: 'row', fields: [
      { type: 'text', key: 'spotSize', label: 'גודל כתם' },
      { type: 'text', key: 'targetSize', label: 'גודל מטרה' },
    ]},
    { type: 'text', key: 'concealments', label: 'הסתרים' },
    { type: 'note', text: '* הפרש גובה הסתר – גובה מטרה\n* מרחק ההסתר ממטרה' },

    { type: 'header', text: 'לאחר ירי', bold: true },
    { type: 'toggle', key: 'bdaResult', label: 'קבלת דיווח BDA ראשוני', options: ['אלפא', 'ברבו', 'דלתא', 'אקו'], defaultValue: 'אלפא' },
    { type: 'text', key: 'bdaWithObserver', label: 'BDA עם חוזי' },
    { type: 'text', key: 'unusualEvents', label: 'אירועים חריגים (האם היה ריח חריג בשיגור?)' },
    { type: 'text', key: 'results', label: 'תוצאות' },
    { type: 'text', key: 'renewed', label: 'ירי נוסף – אישור מוכנות מחודש' },
    { type: 'time', key: 'readyTime', label: 'זמן בהיכון לירי' },
    { type: 'text', key: 'malfunctions', label: 'תקלות במהלך או לפני העבודה' },

    { type: 'header', text: 'מקרא', bold: true },
    { type: 'note', text: "אלפא – פגע והשמיד, בראבו – פגע ולא השמיד, דלתא – הפוכה ב-ג', אקו – הפוכה לא ב-ג'" },
  ],
}
