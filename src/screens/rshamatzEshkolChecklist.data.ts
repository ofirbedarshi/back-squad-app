import type { RshamatzChecklistSectionDef } from '../components/rshamatzChecklist.types'

export const RSHAMATZ_ESHKOL_CHECKLIST_SECTIONS: RshamatzChecklistSectionDef[] = [
  {
    id: 'dedicated-systems',
    title: 'רשמ"צ מערכות ייעודיות',
    items: [
      { id: 'mlc', label: 'MLC' },
      { id: 'liu', label: 'LIU' },
      { id: 'bp', label: 'BP' },
      { id: 'batteries', label: 'סוללות' },
      { id: 'battery-charger', label: 'מטען סוללות' },
      { id: 'missile-cable', label: 'כבל טילים' },
      { id: 'remote-cable', label: 'כבל הרחקה' },
      { id: 'missile-hive', label: 'כוורת טילים' },
      { id: 'legs', label: 'רגליים' },
      { id: 'bottom-tripod', label: 'חצובה תחתונה' },
      { id: 'top-tripod', label: 'חצובה עליונה' },
      { id: 'drill-kit', label: 'מקדחה + סוללה + מטען' },
      { id: 'chuck-driver', label: 'מברגה פוטר + סוללה' },
      { id: 'socket-16', label: 'בוקסה 16 מ"מ' },
      { id: 'drill-10', label: 'מקדח 10 מ"מ' },
      { id: 'spiral-stakes-6', label: '6 יתד ספירלה' },
      { id: 'bandolier', label: 'בנדולרה' },
      { id: 'nuts-set', label: 'אומים 5 ס"מ - 8, 10 ס"מ - 8' },
      { id: 'fixing-washers-6', label: '6 דסקיות קיבוע' },
      { id: 'jumbo-anchors-12', label: '12 גמבו 12 מ"מ' },
      { id: 'jumbo-washers-12', label: '12 דיסקיות גמבו' },
      { id: 'drill-16', label: 'מקדח 16 מ"מ' },
      { id: 'fixing-rings-6', label: '6 עיגולים לקיבוע' },
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
