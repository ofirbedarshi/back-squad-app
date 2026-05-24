import type { FormSchema, PositionToTargetWatchKeyOverrides, TextField } from './dynamicForm.types'

const TARGET_AID_POSITION_TO_TARGET_WATCH_KEYS = {
  positionId: 'referencePositionId',
  positionCoords: 'referencePositionCoords',
  positionAltitude: 'referencePositionAltitude',
} as const satisfies PositionToTargetWatchKeyOverrides

function targetAidPositionToTargetComputedField(
  computedMetric: 'altitudeDiff' | 'azimuth' | 'range',
  key: string,
  label: string,
  infoTooltipText: string,
): TextField {
  return {
    type: 'text',
    key,
    label,
    computedFrom: 'positionToTarget',
    computedMetric,
    positionToTargetWatchKeys: TARGET_AID_POSITION_TO_TARGET_WATCH_KEYS,
    infoTooltipText,
  }
}

/** Loader field keys match בדח תחקור where shared; מציין still maps נ"צ/גובה ב-storage דרך ה-loader בלי שדות מיותרים במסך. */
export const targetAidFormSchema: FormSchema = {
  fields: [
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
      label: 'שם מטרה',
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
      type: 'row',
      fields: [
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
      ],
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
        targetAidPositionToTargetComputedField(
          'altitudeDiff',
          'positionTargetAltitudeDelta',
          'הפרש גובה עמדה מטרה',
          'ערך מחושב אוטומטית לפי גובה העמדה והמטרה כששניהם נטענו. לא ניתן לעריכה ידנית.',
        ),
      ],
    },
    {
      type: 'row',
      fields: [
        targetAidPositionToTargetComputedField(
          'azimuth',
          'bearingManual',
          'אמורה',
          'ערך מחושב אוטומטית לפי נ"צ וגובה העמדה והמטרה כששניהם נטענו. לא ניתן לעריכה ידנית.',
        ),
        targetAidPositionToTargetComputedField(
          'range',
          'rangeManual',
          'טווח',
          'ערך מחושב אוטומטית כטווח בין העמדה למטרה לפי נ"צ כששניהם נטענו. לא ניתן לעריכה ידנית.',
        ),
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
      options: ['מימין', 'משמאל'],
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
