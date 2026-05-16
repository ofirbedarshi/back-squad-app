import type { RshamatzChecklistSectionDef } from '../components/rshamatzChecklist.types'

export const RSHAMATZ_REHEV_CHECKLIST_SECTIONS: RshamatzChecklistSectionDef[] = [
  {
    id: 'dedicated-systems',
    title: 'רשמ"צ מערכות ייעודיות',
    items: [
      { id: 'booster', label: 'בוסטר' },
      { id: 'remote-charger', label: 'מטען הרחקה' },
      { id: 'ratchet-handle', label: 'ידית ראצ\'ט' },
      { id: 'long-extension', label: 'מאריך ארוך' },
      { id: 'short-extension', label: 'מאריך קצר' },
      { id: 'erection-joint', label: 'מפרק הזקפה' },
      { id: 'erection-adapter', label: 'מתאם הזקפה' },
      { id: 'erection-allen', label: 'אלן הזקפה' },
      { id: 'acdc-cable', label: 'כבל ACDC' },
    ],
  },
  {
    id: 'vehicle',
    title: 'רשמ"צ רכב',
    items: [
      { id: 'jack', label: 'ג\'ק' },
      { id: 'jack-handle', label: 'ידית לג\'ק' },
      { id: 'four-extensions', label: '4 מאריכים' },
      { id: 'vest', label: 'ווסט' },
      { id: 'fire-extinguisher', label: 'מטף' },
      { id: 'triangle', label: 'משולש' },
    ],
  },
  {
    id: 'camouflage',
    title: 'רשמ"צ הסוואה',
    items: [
      { id: 'jerrycans', label: 'ג\'ריקנים' },
      { id: 'fuel-cans', label: 'דלקנים' },
      { id: 'vehicle-gasoline', label: '2 בנזין לרכב' },
      { id: 'shovel', label: 'את חפירה' },
      { id: 'spare-parts-kit', label: 'ערכת ח"ח' },
      { id: 'adhesives-kit', label: 'ערכת דבקים' },
      { id: 'oils-kit', label: 'ערכת שמנים' },
      { id: 'stretcher', label: 'אלונקה' },
      { id: 'food', label: 'אוכל' },
      { id: 'lau-bags', label: 'תיקי לאו' },
      { id: 'ammunition', label: 'תחמושת' },
    ],
  },
  {
    id: 'communications',
    title: 'רשמ"צ קשר',
    items: [
      { id: 'assembly-protector', label: 'מגן מכלול' },
      { id: 'radio-710', label: '710' },
      { id: 'radio-93', label: '93' },
      { id: 'charger', label: 'מטען' },
      { id: 'single-phase', label: 'חד פס' },
    ],
  },
]
