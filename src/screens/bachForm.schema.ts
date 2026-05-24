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
    },
    { type: 'text', key: 'hitProbabilityDetails', label: 'פירוט' },

    { type: 'header', text: 'אישור סיום הבקרה', bold: true },
    { type: 'row', fields: [
      {
        type: 'toggle',
        key: 'controlApproved',
        label: 'אושר',
        options: ['כן', 'לא'],
      },
      { type: 'text', key: 'approvedBy', label: 'על ידי' },
    ]},

    { type: 'header', text: 'עמדת שיגור', bold: true },
    {
      type: 'positionLoader',
      key: 'rearPositionId',
      text: 'אחורי',
      bold: false,
      fieldMappings: {
        positionName: 'positionName',
        positionCoords: 'positionCoords',
        positionAltitude: 'positionAltitude',
        aka: 'aka',
      },
    },
    { type: 'text', key: 'positionName', label: 'שם עמדה', lockedByRef: 'rearPositionId', infoTooltipText: 'שדה זה מתמלא אוטומטית מהעמדה הנטענת ואינו ניתן לעריכה ידנית' },
    { type: 'coords', key: 'positionCoords', label: 'נ.צ. עמדה', lockedByRef: 'rearPositionId', infoTooltipText: 'שדה זה מתמלא אוטומטית מהעמדה הנטענת ואינו ניתן לעריכה ידנית' },
    { type: 'text', key: 'positionAltitude', label: 'גובה', lockedByRef: 'rearPositionId', infoTooltipText: 'שדה זה מתמלא אוטומטית מהעמדה הנטענת ואינו ניתן לעריכה ידנית' },
    { type: 'text', key: 'aka', label: 'אק"א', lockedByRef: 'rearPositionId', infoTooltipText: 'שדה זה מתמלא אוטומטית מהעמדה הנטענת ואינו ניתן לעריכה ידנית' },
    { type: 'row', fields: [
      { type: 'text', key: 'missileC', label: "צ' הטיל" },
      { type: 'text', key: 'serialNumber', label: "מספר סידורי דוג'" },
    ]},
    { type: 'row', fields: [
      { type: 'text', key: 'barrelNumber', label: 'מספר קנה' },
      { type: 'text', key: 'koz', label: 'קו"צ' },
    ]},
    { type: 'row', fields: [
      { type: 'text', key: 'wind', label: 'רוח' },
      { type: 'text', key: 'clouds', label: 'עננות' },
    ]},
    {
      type: 'text',
      key: 'azimuthToTarget',
      label: "אז' עמדת שיגור מטרה (אמורה)",
      computedFrom: 'positionToTarget',
      computedMetric: 'azimuth',
      infoTooltipText: 'ערך מחושב אוטומטית לפי נ"צ וגובה העמדה האחורית והמטרה כששניהם נטענו. לא ניתן לעריכה ידנית.',
    },
    {
      type: 'text',
      key: 'launchRange',
      label: 'טווח עמדת שיגור',
      computedFrom: 'positionToTarget',
      computedMetric: 'range',
      infoTooltipText: 'ערך מחושב אוטומטית כטווח בין העמדה האחורית למטרה לפי נ"צ וגובה של שניהם כששניהם נטענו. לא ניתן לעריכה ידנית.',
    },
    { type: 'header', text: 'מאפייני משימה', bold: true },
    {
      type: 'toggle',
      key: 'flightType',
      label: 'סוג מעוף',
      options: ['+lofted','lofted', 'low', 'flat'],
    },
    { type: 'toggle', key: 'impact', label: 'היסט', options: ['ימין', 'שמאל', 'למעלה', 'למטה'] },
    {
      type: 'toggleWithConditions',
      key: 'arcTrack',
      label: 'מסלול קשתי',
      options: ['כן', 'לא'],
      conditions: {
        'כן': [
          { type: 'toggle', key: 'arcTrackDirection', label: 'כיוון קשת', options: ['ימין', 'שמאל'] },
        ]
      },
    },
    { type: 'text', key: 'fuseType', label: 'סוג רש"ק' },
    {
      type: 'toggle',
      key: 'delay',
      label: 'השהייה',
      options: ['לא', 'קצרה', 'ארוכה'],
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
      conditions: {
        כן: [
          { type: 'row', fields: [
            {
              type: 'toggle',
              key: 'elevation',
              label: 'הגבהה ',
              options: ['מחשב', 'בוצע'],
            },
            {
              type: 'toggle',
              key: 'sizeup',
              label: 'צידוד ',
              options: ['מחשב', 'בוצע'],
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
    },
    { type: 'row', fields: [
      {
        type: 'text',
        key: 'rightSectorAzimuth',
        label: 'אז׳ גבול גזרה ימני',
        valueKind: 'azimuthDegree',
      },
      {
        type: 'text',
        key: 'leftSectorAzimuth',
        label: 'אז׳ גבול גזרה שמאלי',
        valueKind: 'azimuthDegree',
      },
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
    { type: 'text', key: 'indicatorName', label: 'שם מציין', lockedByRef: 'indicatorId', infoTooltipText: 'שדה זה מתמלא אוטומטית מהמציין הנטען ואינו ניתן לעריכה ידנית' },
    { type: 'coords', key: 'indicatorPositionCoords', label: 'נ.צ. מציין', lockedByRef: 'indicatorId', infoTooltipText: 'שדה זה מתמלא אוטומטית מהמציין הנטען ואינו ניתן לעריכה ידנית' },
    { type: 'row', fields: [
      { type: 'text', key: 'indicatorAltitude', label: 'גובה', lockedByRef: 'indicatorId', infoTooltipText: 'שדה זה מתמלא אוטומטית מהמציין הנטען ואינו ניתן לעריכה ידנית' },
      { type: 'text', key: 'observationMeans', label: 'אמצעי תצפית' },
      { type: 'text', key: 'indicatorMeans', label: 'אמצעי מציין', lockedByRef: 'indicatorId', infoTooltipText: 'שדה זה מתמלא אוטומטית מהמציין הנטען ואינו ניתן לעריכה ידנית' },
    ]},
    { type: 'row', fields: [
      { type: 'text', key: 'indicatorKoz', label: 'קו"צ', lockedByRef: 'indicatorId', infoTooltipText: 'שדה זה מתמלא אוטומטית מהמציין הנטען ואינו ניתן לעריכה ידנית' },
      {
        type: 'text',
        key: 'indicatorToTargetAzimuth',
        label: "אז' מציין מטרה",
        computedFrom: 'indicatorToTarget',
        computedMetric: 'azimuth',
        infoTooltipText: 'ערך מחושב אוטומטית לפי נ"צ וגובה המציין והמטרה כששניהם נטענו מהרשימה. לא ניתן לעריכה ידנית.',
      },
      {
        type: 'text',
        key: 'indicationRange',
        label: 'טווח ציון',
        computedFrom: 'indicatorToTarget',
        computedMetric: 'range',
        infoTooltipText: 'ערך מחושב אוטומטית כטווח בין המציין למטרה לפי נ"צ וגובה של שניהם כששניהם נטענו מהרשימה. לא ניתן לעריכה ידנית.',
      },
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
    { type: 'toggle', key: 'bdaResult', label: 'קבלת דיווח BDA ראשוני', options: ['אלפא', 'ברבו', 'דלתא', 'אקו'] },
    { type: 'text', key: 'bdaWithObserver', label: 'BDA עם חוזי' },
    { type: 'text', key: 'unusualEvents', label: 'אירועים חריגים (האם היה ריח חריג בשיגור?)' },
    { type: 'text', key: 'results', label: 'תוצאות' },
    { type: 'text', key: 'renewed', label: 'ירי נוסף – אישור מוכנות מחודש' },
    { type: 'time', key: 'readyTime', label: 'זמן בהיכון לירי' },
    { type: 'text', key: 'malfunctions', label: 'תקלות במהלך או לפני העבודה' },

    { type: 'header', text: 'הערות', bold: true },
    {
      type: 'textarea',
      key: 'comments',
      label: 'הערות',
      rows: 5,
      placeholder: 'כתוב הערות...',
    },

    { type: 'header', text: 'מקרא', bold: true },
    { type: 'note', text: "אלפא – פגע והשמיד, בראבו – פגע ולא השמיד, דלתא – הפוכה ב-ג', אקו – הפוכה לא ב-ג'" },
  ],
}
