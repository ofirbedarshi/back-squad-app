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

    { type: 'header', text: 'מטרה', bold: true },
    { type: 'text', key: 'targetName', label: 'שם מטרה' },
    { type: 'text', key: 'detection', label: 'איתור' },
    { type: 'coords', key: 'targetCoords', label: 'נ.צ. מטרה' },
    { type: 'text', key: 'targetAltitude', label: 'גובה מטרה' },
    { type: 'text', key: 'targetType', label: 'סוג המטרה' },
    { type: 'text', key: 'targetDescription', label: 'תיאור המטרה' },
    { type: 'text', key: 'requiredAchievement', label: 'הישג נדרש' },
    { type: 'text', key: 'markingFactor', label: 'גורם מציין' },
    { type: 'text', key: 'recordingFactor', label: 'גורם מתעד' },
    { type: 'text', key: 'flightAltitude', label: 'גובה מעוף' },
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

    { type: 'header', text: 'התמקמות', bold: true },
    { type: 'header', text: 'אחורי', bold: false },
    { type: 'text', key: 'positionName', label: 'שם עמדה' },
    { type: 'coords', key: 'positionCoords', label: 'נ.צ. עמדה' },
    { type: 'text', key: 'positionAltitude', label: 'גובה' },
    { type: 'text', key: 'missileC', label: "צ' הטיל" },
    { type: 'text', key: 'serialNumber', label: "מספר סידורי דוג'" },
    { type: 'text', key: 'barrelNumber', label: 'מספר קנה' },
    { type: 'text', key: 'koz', label: 'קו"צ' },
    { type: 'text', key: 'aka', label: 'אק"א' },
    { type: 'text', key: 'wind', label: 'רוח' },
    { type: 'text', key: 'clouds', label: 'עננות' },
  ],
}
