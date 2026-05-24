import type { FormSchema } from '../domain/dynamicForm.types'

export const bachFormSchema: FormSchema = {
  fields: [
    { type: 'header', text: 'כללי', bold: true },
    { type: 'row', fields: [
      { type: 'date', key: 'date', label: 'תאריך', required: true },
      { type: 'time', key: 'hour', label: 'שעה', required: true },
    ]},
    { type: 'text', key: 'sector', label: 'גזרה', required: true },
    { type: 'text', key: 'launchingUnit', label: 'חוליה משגרת', required: true },
    { type: 'text', key: 'markingUnit', label: 'חוליה מציינת', required: true },

    {
      type: 'targetLoader',
      key: 'targetId',
      text: 'מטרה',
      bold: true,
      required: true,
      fieldMappings: {
        targetName: 'targetName',
        targetCoords: 'targetCoords',
        targetAltitude: 'targetAltitude',
        targetDescription: 'targetDescription',
      },
    },
    { type: 'text', key: 'targetName', label: 'שם מטרה', lockedByRef: 'targetId', infoTooltipText: 'שדה זה מתמלא אוטומטית מהמטרה הנטענת ואינו ניתן לעריכה ידנית' },
    { type: 'text', key: 'detection', label: 'איתור', required: false },
    { type: 'coords', key: 'targetCoords', label: 'נ.צ. מטרה', lockedByRef: 'targetId', infoTooltipText: 'שדה זה מתמלא אוטומטית מהמטרה הנטענת ואינו ניתן לעריכה ידנית' },
    { type: 'text', key: 'targetAltitude', label: 'גובה מטרה', lockedByRef: 'targetId', infoTooltipText: 'שדה זה מתמלא אוטומטית מהמטרה הנטענת ואינו ניתן לעריכה ידנית' },
    { type: 'text', key: 'targetDescription', label: 'תיאור המטרה', lockedByRef: 'targetId', infoTooltipText: 'שדה זה מתמלא אוטומטית מהמטרה הנטענת ואינו ניתן לעריכה ידנית' },
    { type: 'text', key: 'requiredAchievement', label: 'הישג נדרש', required: false },
    { type: 'text', key: 'recordingFactor', label: 'גורם מתעד', required: false },
    { type: 'text', key: 'flightAltitude', label: 'גובה מעוף (מתעד)', required: true },
    {
      type: 'toggle',
      key: 'hitProbability',
      label: 'הערכת סיכוי פגיעה',
      options: ['קל', 'בינוני', 'קשה'],
      required: true,
    },
    { type: 'text', key: 'hitProbabilityDetails', label: 'פירוט', required: false },

    { type: 'header', text: 'אישור סיום הבקרה', bold: true },
    { type: 'row', fields: [
      {
        type: 'toggle',
        key: 'controlApproved',
        label: 'אושר',
        options: ['כן', 'לא'],
        required: true,
      },
      { type: 'text', key: 'approvedBy', label: 'על ידי', required: true },
    ]},

    { type: 'header', text: 'עמדת שיגור', bold: true },
    {
      type: 'positionLoader',
      key: 'rearPositionId',
      text: 'אחורי',
      bold: false,
      required: true,
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
      { type: 'text', key: 'missileC', label: "צ' הטיל", required: true },
      { type: 'text', key: 'serialNumber', label: "מספר סידורי דוג'", required: false },
    ]},
    { type: 'row', fields: [
      { type: 'text', key: 'barrelNumber', label: 'מספר קנה', required: true },
      { type: 'text', key: 'koz', label: 'קו"צ', required: true },
    ]},
    { type: 'row', fields: [
      { type: 'text', key: 'wind', label: 'רוח', required: true },
      { type: 'text', key: 'clouds', label: 'עננות', required: true },
    ]},
    {
      type: 'text',
      key: 'azimuthToTarget',
      label: "אז' עמדת שיגור מטרה (אמורה)",
      computedFrom: 'positionToTarget',
      computedMetric: 'azimuth',
      infoTooltipText: 'ערך מחושב אוטומטית לפי נ"צ וגובה העמדה האחורית והמטרה כששניהם נטענו. לא ניתן לעריכה ידנית.',
    },
    { type: 'text', key: 'launchRange', label: 'טווח עמדת שיגור', required: true },
    { type: 'header', text: 'מאפייני משימה', bold: true },
    {
      type: 'toggle',
      key: 'flightType',
      label: 'סוג מעוף',
      options: ['+lofted','lofted', 'low', 'flat'],
      required: true,
    },
    { type: 'toggle', key: 'impact', label: 'היסט', options: ['ימין', 'שמאל', 'למעלה', 'למטה'], required: true },
    {
      type: 'toggleWithConditions',
      key: 'arcTrack',
      label: 'מסלול קשתי',
      options: ['כן', 'לא'],
      required: true,
      conditions: {
        'כן': [
          { type: 'toggle', key: 'arcTrackDirection', label: 'כיוון קשת', options: ['ימין', 'שמאל'], required: true },
        ]
      },
    },
    { type: 'text', key: 'fuseType', label: 'סוג רש"ק', required: true },
    {
      type: 'toggle',
      key: 'delay',
      label: 'השהייה',
      options: ['לא', 'קצרה', 'ארוכה'],
      required: true,
    },
    { type: 'row', fields: [
      { type: 'time', key: 'launchTime', label: 'שעת שיגור', required: true },
      { type: 'number', key: 'missileFlightTime', label: 'זמן מעוף הטיל', required: true },
    ]},
    { type: 'number', key: 'munitionsCount', label: "מס' חימושים", required: true },
    {
      type: 'toggleWithConditions',
      key: 'manualPlacement',
      label: 'הצבה ידנית',
      options: ['כן', 'לא'],
      required: true,
      conditions: {
        כן: [
          { type: 'row', fields: [
            {
              type: 'toggle',
              key: 'elevation',
              label: 'הגבהה ',
              options: ['מחשב', 'בוצע'],
              required: false,
            },
            {
              type: 'toggle',
              key: 'sizeup',
              label: 'צידוד ',
              options: ['מחשב', 'בוצע'],
              required: false,
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
      required: true,
    },
    { type: 'row', fields: [
      {
        type: 'text',
        key: 'rightSectorAzimuth',
        label: 'אז׳ גבול גזרה ימני',
        required: true,
        valueKind: 'azimuthDegree',
      },
      {
        type: 'text',
        key: 'leftSectorAzimuth',
        label: 'אז׳ גבול גזרה שמאלי',
        required: true,
        valueKind: 'azimuthDegree',
      },
    ]},

    {
      type: 'indicatorLoader',
      key: 'indicatorId',
      text: 'מציין',
      bold: true,
      required: true,
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
      { type: 'text', key: 'observationMeans', label: 'אמצעי תצפית', required: true },
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
      { type: 'text', key: 'indicatorWind', label: 'רוח', required: true },
      { type: 'text', key: 'indicatorClouds', label: 'עננות', required: true },
    ]},
    { type: 'text', key: 'aimPoint', label: 'נקודת מכוון', required: false },
    { type: 'row', fields: [
      { type: 'text', key: 'spotSize', label: 'גודל כתם', required: true },
      { type: 'text', key: 'targetSize', label: 'גודל מטרה', required: false },
    ]},
    { type: 'text', key: 'concealments', label: 'הסתרים', required: true },
    { type: 'note', text: '* הפרש גובה הסתר – גובה מטרה\n* מרחק ההסתר ממטרה' },

    { type: 'header', text: 'לאחר ירי', bold: true },
    { type: 'toggle', key: 'bdaResult', label: 'קבלת דיווח BDA ראשוני', options: ['אלפא', 'ברבו', 'דלתא', 'אקו'], required: true },
    { type: 'text', key: 'bdaWithObserver', label: 'BDA עם חוזי', required: true },
    { type: 'text', key: 'unusualEvents', label: 'אירועים חריגים (האם היה ריח חריג בשיגור?)', required: true },
    { type: 'text', key: 'results', label: 'תוצאות', required: true },
    { type: 'text', key: 'renewed', label: 'ירי נוסף – אישור מוכנות מחודש', required: true },
    { type: 'time', key: 'readyTime', label: 'זמן בהיכון לירי', required: true },
    { type: 'text', key: 'malfunctions', label: 'תקלות במהלך או לפני העבודה', required: true },

    { type: 'header', text: 'מקרא', bold: true },
    { type: 'note', text: "אלפא – פגע והשמיד, בראבו – פגע ולא השמיד, דלתא – הפוכה ב-ג', אקו – הפוכה לא ב-ג'" },
  ],
}
