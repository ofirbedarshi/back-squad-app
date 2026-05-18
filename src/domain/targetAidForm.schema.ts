import type { FormSchema } from './dynamicForm.types'

/** Loader field keys match בדח תחקור where shared; מציין still maps נ"צ/גובה ב-storage דרך ה-loader בלי שדות מיותרים במסך. */
export const targetAidFormSchema: FormSchema = {
  fields: [
    { type: 'header', text: 'מטרה', bold: false },
    {
      type: 'targetLoader',
      key: 'targetId',
      text: 'מטרה',
      bold: true,
      required: false,
      fieldMappings: {
        targetName: 'targetNumber',
        targetCoords: 'targetCoords',
        targetAltitude: 'targetAltitude',
      },
    },
    {
      type: 'text',
      key: 'targetNumber',
      label: 'מספר מטרה',
      lockedByRef: 'targetId',
      infoTooltipText: 'מתמלא מהמטרה שנבחרה',
    },
    {
      type: 'coords',
      key: 'targetCoords',
      label: 'נ.צ.',
      lockedByRef: 'targetId',
      infoTooltipText: 'מתמלא מהמטרה שנבחרה',
    },
    {
      type: 'text',
      key: 'targetAltitude',
      label: 'גובה מטרה',
      lockedByRef: 'targetId',
      infoTooltipText: 'מתמלא מהמטרה שנבחרה',
    },

    {
      type: 'indicatorLoader',
      key: 'indicatorId',
      text: 'מציין',
      bold: true,
      required: false,
      fieldMappings: {
        indicatorName: 'indicatorName',
        coordinates: 'indicatorPositionCoords',
        altitude: 'indicatorAltitude',
        markCode: 'indicatorKoz',
      },
    },
    {
      type: 'text',
      key: 'indicatorName',
      label: 'שם מציין',
      lockedByRef: 'indicatorId',
      infoTooltipText: 'מתמלא מהמציין שנבחר',
    },
    {
      type: 'text',
      key: 'indicatorKoz',
      label: 'קו"צ',
      lockedByRef: 'indicatorId',
      infoTooltipText: 'מתמלא מהמציין שנבחר',
    },

    {
      type: 'positionLoader',
      key: 'referencePositionId',
      text: 'עמדה',
      bold: true,
      required: false,
      fieldMappings: {
        positionName: 'referencePositionName',
        positionCoords: 'referencePositionCoords',
        positionAltitude: 'referencePositionAltitude',
        aka: 'referencePositionAka',
      },
    },
    {
      type: 'text',
      key: 'referencePositionName',
      label: 'שם עמדה',
      lockedByRef: 'referencePositionId',
      infoTooltipText: 'מתמלא מהעמדה שנבחרת או מהעמדה הנוכחית בטעינה',
    },

    {
      type: 'row',
      fields: [
        {
          type: 'text',
          key: 'positionTargetAltitudeDelta',
          label: 'הפרש גובה עמדה מטרה',
          required: false,
        },
        {
          type: 'text',
          key: 'bearingManual',
          label: 'אמורה',
          required: false,
        },
        {
          type: 'text',
          key: 'rangeManual',
          label: 'טווח',
          required: false,
        },
      ],
    },

    {
      type: 'toggle',
      key: 'delayType',
      label: 'השהייה',
      options: ['הקשה', 'השהייה קצרה', 'השהייה ארוכה'],
      required: false,
    },
    {
      type: 'toggle',
      key: 'directionality',
      label: 'כיווניות',
      options: ['ימין', 'שמאל'],
      required: false,
    },
    {
      type: 'toggle',
      key: 'offset',
      label: 'היסט',
      options: ['ימין', 'שמאל', 'למעלה', 'למטה'],
      required: false,
    },
    { type: 'number', key: 'timeOfFlight', label: 'זמן מעוף', required: false },
    { type: 'textarea', key: 'notes', label: 'הערות', rows: 5, required: false },
  ],
}
