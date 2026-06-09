import type {
  FormSchema,
  IndicatorToTargetWatchKeyOverrides,
  PositionToTargetWatchKeyOverrides,
  TextField,
} from './dynamicForm.types'

const ATTACK_LOG_POSITION_TO_TARGET_WATCH_KEYS = {
  positionId: 'stationPositionId',
  positionCoords: 'stationCoordinates',
  positionAltitude: 'altitude',
  targetCoords: 'targetCoordinates',
  targetAltitude: 'targetAltitude',
} as const satisfies PositionToTargetWatchKeyOverrides

const ATTACK_LOG_INDICATOR_TO_TARGET_WATCH_KEYS = {
  targetId: 'targetId',
  indicatorId: 'indicatorId',
  indicatorCoords: 'indicatorCoordinates',
  indicatorAltitude: 'indicatorAltitude',
  targetCoords: 'targetCoordinates',
  targetAltitude: 'targetAltitude',
} as const satisfies IndicatorToTargetWatchKeyOverrides

const POSITION_TARGET_COMPUTED_TOOLTIP =
  'ערך מחושב אוטומטית לפי נ"צ וגובה העמדה והמטרה כששניהם נטענו. לא ניתן לעריכה ידנית.'

const INDICATOR_TARGET_COMPUTED_TOOLTIP =
  'ערך מחושב אוטומטית לפי נ"צ וגובה המציין והמטרה כששניהם נטענו. לא ניתן לעריכה ידנית.'

function attackLogPositionToTargetComputedField(
  computedMetric: 'altitudeDiff' | 'azimuth' | 'range',
  key: string,
  label: string,
): TextField {
  return {
    type: 'text',
    key,
    label,
    computedFrom: 'positionToTarget',
    computedMetric,
    positionToTargetWatchKeys: ATTACK_LOG_POSITION_TO_TARGET_WATCH_KEYS,
    infoTooltipText: POSITION_TARGET_COMPUTED_TOOLTIP,
  }
}

function attackLogIndicatorToTargetComputedField(
  computedMetric: 'azimuth' | 'range',
  key: string,
  label: string,
): TextField {
  return {
    type: 'text',
    key,
    label,
    computedFrom: 'indicatorToTarget',
    computedMetric,
    indicatorToTargetWatchKeys: ATTACK_LOG_INDICATOR_TO_TARGET_WATCH_KEYS,
    infoTooltipText: INDICATOR_TARGET_COMPUTED_TOOLTIP,
  }
}

export const attackLogFormSchema: FormSchema = {
  fields: [
    {
      type: 'targetLoader',
      key: 'targetId',
      text: 'מטרה',
      bold: true,
      required: false,
      fieldMappings: {
        targetName: 'targetName',
        targetCoords: 'targetCoordinates',
        targetAltitude: 'targetAltitude',
      },
    },
    {
      type: 'text',
      key: 'targetName',
      label: 'שם מטרה',
      required: true,
      lockedByRef: 'targetId',
      infoTooltipText: 'מתמלא מהמטרה שנבחרה',
    },

    {
      type: 'toggle',
      key: 'wasAttacked',
      label: 'נתקפה',
      options: ['לא', 'כן'],
      defaultValue: 'לא',
      required: false,
    },
    {
      type: 'checkbox',
      key: 'hit',
      label: 'פגע',
      defaultValue: false,
      visibleWhen: { field: 'wasAttacked', equals: 'כן' },
    },
    { type: 'text', key: 'result', label: 'תוצאה', required: false },
    { type: 'date', key: 'date', label: 'תאריך', required: true },
    { type: 'time', key: 'time', label: 'שעה', required: false },
    { type: 'text', key: 'launcherType', label: 'סוג משגר', required: false },
    { type: 'number', key: 'launcherId', label: 'צ׳ משגר', required: false },
    {
      type: 'text',
      key: 'aka',
      label: 'אק"א',
      required: false,
      lockedByRef: 'stationPositionId',
      infoTooltipText: 'מתמלא מהעמדה שנבחרה',
    },
    {
      type: 'row',
      fields: [
        { type: 'pitchRoll', key: 'pitch', label: 'Pitch', required: false },
        { type: 'pitchRoll', key: 'roll', label: 'Roll', required: false },
      ],
    },
    {
      type: 'multiSelectToggle',
      key: 'vehicleEncryptionMethod',
      label: 'באמצעות מה הוצפן הרכב?',
      options: ['מצפן', 'nfs', 'tmaps'],
      required: false,
    },
    { type: 'text', key: 'hivePosition', label: 'מיקום טיך בכוורת', required: false },
    {
      type: 'toggle',
      key: 'generation',
      label: 'דור',
      options: ['דור א׳', 'דור ב׳'],
      defaultValue: 'דור א׳',
      required: false,
    },

    { type: 'header', text: 'עמדה', bold: true },
    {
      type: 'positionLoader',
      key: 'stationPositionId',
      text: 'עמדה',
      bold: false,
      required: false,
      fieldMappings: {
        positionCoords: 'stationCoordinates',
        positionAltitude: 'altitude',
        aka: 'aka',
      },
    },
    {
      type: 'coords',
      key: 'stationCoordinates',
      label: 'נ"צ עמדה',
      lockedByRef: 'stationPositionId',
      infoTooltipText: 'מתמלא מהעמדה שנבחרה',
    },
    {
      type: 'text',
      key: 'altitude',
      label: 'גובה',
      lockedByRef: 'stationPositionId',
      infoTooltipText: 'מתמלא מהעמדה שנבחרה',
    },
    {
      type: 'coords',
      key: 'targetCoordinates',
      label: 'נ"צ מטרה',
      lockedByRef: 'targetId',
      infoTooltipText: 'מתמלא מהמטרה שנבחרה',
    },
    {
      type: 'text',
      key: 'targetAltitude',
      label: 'גובה מטרה',
      lockedByRef: 'targetId',
      infoTooltipText: 'מתמלא מהמטרה שנבחרה — לחישוב מדדים',
    },
    attackLogPositionToTargetComputedField('range', 'stationTargetRange', 'טווח עמדת מטרה'),
    attackLogPositionToTargetComputedField('azimuth', 'stationTargetAzimuth', 'אזימות עמדה מטרה'),
    attackLogPositionToTargetComputedField(
      'altitudeDiff',
      'stationTargetAltitudeDiff',
      'הפרש גובה עמדה מטרה',
    ),

    { type: 'header', text: 'מציין', bold: true },
    {
      type: 'indicatorLoader',
      key: 'indicatorId',
      text: 'מציין',
      bold: false,
      required: false,
      fieldMappings: {
        coordinates: 'indicatorCoordinates',
        altitude: 'indicatorAltitude',
        means: 'indicatorMeans',
        markCode: 'indicatorFactor',
      },
    },
    {
      type: 'text',
      key: 'indicatorFactor',
      label: 'גורם המציין',
      lockedByRef: 'indicatorId',
      infoTooltipText: 'מתמלא מהמציין שנבחר',
    },
    {
      type: 'text',
      key: 'indicatorMeans',
      label: 'אמצעי מציין',
      lockedByRef: 'indicatorId',
      infoTooltipText: 'מתמלא מהמציין שנבחר',
    },
    {
      type: 'coords',
      key: 'indicatorCoordinates',
      label: 'נ"צ מציין',
      lockedByRef: 'indicatorId',
      infoTooltipText: 'מתמלא מהמציין שנבחר',
    },
    attackLogIndicatorToTargetComputedField('azimuth', 'indicatorTargetAzimuth', 'אזימות מציין מטרה'),
    attackLogIndicatorToTargetComputedField('range', 'indicatorRange', 'טווח מציין'),

    {
      type: 'number',
      key: 'apexAngle',
      label: 'זווית קודקוד (בין אזימוט מציין מטרה לבין אזימוט עמדה מטרה)',
      required: false,
    },
    { type: 'number', key: 'spotSizeWithoutSpread', label: 'גודל כתם (ללא מריחה)', required: false },
    { type: 'text', key: 'targetFront', label: 'מפנה מטרה', required: false },
    {
      type: 'text',
      key: 'wallAzimuth',
      label: 'אזימות הקיר (במעלות)',
      valueKind: 'azimuthDegree',
      required: false,
    },
    { type: 'number', key: 'spotSizeWithSpread', label: 'גודל כתם (עם מריחה)', required: false },
    { type: 'number', key: 'cloudBaseAltitude', label: 'גובה בסיס ענן', required: false },
    { type: 'number', key: 'windSpeed', label: 'מהירות רוח (קשר)', required: false },
    { type: 'flightPath', key: 'flightPath', required: false },
    { type: 'number', key: 'offset', label: 'היסט', required: false },
    { type: 'text', key: 'directionality', label: 'כיווניות', required: false },
    { type: 'text', key: 'fuseType', label: 'סוג מרעום', required: false },
  ],
}
