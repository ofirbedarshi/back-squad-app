/**
 * Dev-only utility: writes the same mock data that scripts/seed-localStorage.mjs
 * embeds into public/dev-seed.html directly into the current localStorage.
 *
 * Must stay in sync with scripts/seed-localStorage.mjs whenever seed data changes.
 */

const savedAt = '2026-05-10T10:00:00.000Z'

const IDS = {
  posAlpha: 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaa1',
  posBravo: 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaa2',
  posCharlie: 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaa3',
  target1: 'bbbbbbbb-bbbb-4bbb-bbbb-bbbbbbbbbbb1',
  target2: 'bbbbbbbb-bbbb-4bbb-bbbb-bbbbbbbbbbb2',
  target3: 'bbbbbbbb-bbbb-4bbb-bbbb-bbbbbbbbbbb3',
  ind1: 'cccccccc-cccc-4ccc-cccc-ccccccccccc1',
  ind2: 'cccccccc-cccc-4ccc-cccc-ccccccccccc2',
  log1: 'dddddddd-dddd-4ddd-dddd-dddddddddddd1',
  log2: 'dddddddd-dddd-4ddd-dddd-dddddddddddd2',
}

const positions = [
  {
    id: IDS.posAlpha,
    savedAt,
    stationName: 'עמדה אלפא',
    coordinates: { east: '345678', north: '3456789' },
    altitude: 420,
    aka: 40,
    launcherType: 'vehicle',
    vehicleId: 'רכב-12',
    pitch: 1.1,
    roll: 0.2,
  },
  {
    id: IDS.posBravo,
    savedAt,
    stationName: 'עמדה בראבו',
    coordinates: { east: '456789', north: '4567890' },
    altitude: 380,
    aka: 38,
    launcherType: 'infantry',
    pitch: 0.8,
    roll: 0.1,
  },
  {
    id: IDS.posCharlie,
    savedAt,
    stationName: 'עמדה צ׳ארלי',
    coordinates: { east: '567890', north: '5678901' },
    altitude: 510,
    aka: 41,
    launcherType: 'vehicle',
    vehicleId: 'רכב-07',
    pitch: 1.5,
    roll: 0.4,
  },
]

const targets = [
  {
    id: IDS.target1,
    targetName: 'יעד דמה א׳',
    targetDescription: 'מטרה לאימון',
    coordinates: { east: '400000', north: '4000000' },
    altitude: 440,
  },
  {
    id: IDS.target2,
    targetName: 'יעד דמה ב׳',
    coordinates: { east: '410000', north: '4100000' },
    altitude: 395,
  },
  {
    id: IDS.target3,
    targetName: 'יעד דמה ג׳',
    targetDescription: 'מבנה',
    coordinates: { east: '420000', north: '4200000' },
    altitude: 480,
  },
]

const indicators = [
  {
    id: IDS.ind1,
    savedAt,
    indicatorName: 'מציין דמה א׳',
    coordinates: { east: '401234', north: '4012345' },
    altitude: 430,
    means: 'אופטי',
    markCode: 12,
    targetDomain: 'צפון',
  },
  {
    id: IDS.ind2,
    savedAt,
    indicatorName: 'מציין דמה ב׳',
    coordinates: { east: '402567', north: '4025678' },
    altitude: 400,
    means: 'מכ״ם',
    markCode: 7,
  },
]

const attackLogs = [
  {
    id: IDS.log1,
    savedAt,
    targetName: 'יעד דמה א׳',
    date: '2026-05-09',
    wasAttacked: 'yes',
    hit: true,
    result: 'פגיעה טובה',
    time: '14:30',
    launcherType: 'רכבי',
    generation: 'a',
    stationTargetRange: 8500,
    stationTargetAzimuth: 1200,
  },
  {
    id: IDS.log2,
    savedAt,
    targetName: 'יעד דמה ב׳',
    date: '2026-05-08',
    wasAttacked: 'no',
    hit: false,
    generation: 'b',
  },
]

const SEED_PAYLOAD: Record<string, string> = {
  positions: JSON.stringify(positions),
  currentPositionId: IDS.posAlpha,
  referencePositionId: IDS.posBravo,
  targets: JSON.stringify(targets),
  indicators: JSON.stringify(indicators),
  attackLogs: JSON.stringify(attackLogs),
}

export function applySeedMockData(): void {
  for (const [key, value] of Object.entries(SEED_PAYLOAD)) {
    localStorage.setItem(key, value)
  }
}
