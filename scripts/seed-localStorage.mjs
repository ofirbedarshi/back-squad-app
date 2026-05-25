/**
 * Seeds the app's browser "collections" (localStorage keys used by src/storage/).
 *
 * Usage:
 *   npm run seed   → only regenerates public/dev-seed.html (does not touch the browser).
 *   npm run dev    → open http://localhost:5173/dev-seed.html (same host/port as the app).
 *   The page auto-writes mock data on load when served over http(s). Do not open the file via file:// —
 *   that uses a different localStorage than the app.
 *
 * Keys: positions, currentPositionId, referencePositionId, targets, indicators, attackLogs, userNotes, bachs, missChecklists
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const outDir = join(repoRoot, 'public')
const outFile = join(outDir, 'dev-seed.html')

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
  note1: 'eeeeeeee-eeee-4eee-eeee-eeeeeeeeeee1',
  note2: 'eeeeeeee-eeee-4eee-eeee-eeeeeeeeeee2',
  bach1: 'ffffffff-ffff-4fff-ffff-fffffffffff1',
  bach2: 'ffffffff-ffff-4fff-ffff-fffffffffff2',
  missChecklist1: 'gggggggg-gggg-4ggg-gggg-ggggggggggg1',
}

const positions = [
  {
    id: IDS.posAlpha,
    updatedAt: savedAt,
    stationName: 'עמדה אלפא',
    coordinates: { east: '345678', north: '3456789', palach: '36' },
    altitude: 420,
    aka: 40,
    launcherType: 'vehicle',
    vehicleId: 'רכב-12',
    pitch: 1.1,
    roll: 0.2,
  },
  {
    id: IDS.posBravo,
    updatedAt: savedAt,
    stationName: 'עמדה בראבו',
    coordinates: { east: '456789', north: '4567890', palach: '36' },
    altitude: 380,
  },
  {
    id: IDS.posCharlie,
    updatedAt: savedAt,
    stationName: 'עמדה צ׳ארלי',
    coordinates: { east: '567890', north: '5678901', palach: '36' },
    altitude: 510,
  },
]

const targets = [
  {
    id: IDS.target1,
    updatedAt: savedAt,
    targetName: 'יעד דמה א׳',
    targetDescription: 'מטרה לאימון',
    coordinates: { east: '400000', north: '4000000', palach: '36' },
    altitude: 440,
  },
  {
    id: IDS.target2,
    updatedAt: savedAt,
    targetName: 'יעד דמה ב׳',
    coordinates: { east: '410000', north: '4100000', palach: '36' },
    altitude: 395,
  },
  {
    id: IDS.target3,
    updatedAt: savedAt,
    targetName: 'יעד דמה ג׳',
    targetDescription: 'מבנה',
    coordinates: { east: '420000', north: '4200000', palach: '36' },
    altitude: 480,
  },
]

const indicators = [
  {
    id: IDS.ind1,
    updatedAt: savedAt,
    indicatorName: 'מציין דמה א׳',
    coordinates: { east: '401234', north: '4012345', palach: '36' },
    altitude: 430,
    means: 'שיח',
    markCode: 12,
    targetDomain: 'צפון',
  },
  {
    id: IDS.ind2,
    updatedAt: savedAt,
    indicatorName: 'מציין דמה ב׳',
    coordinates: { east: '402567', north: '4025678', palach: '36' },
    altitude: 400,
    means: 'ראטלר',
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

const userNotes = [
  {
    id: IDS.note1,
    text: 'הערת דמה: לבדיקת רשימת ההערות במסך.',
    createdAtIso: '2026-05-10T08:15:00.000Z',
    updatedAtIso: '2026-05-10T09:00:00.000Z',
  },
  {
    id: IDS.note2,
    text: 'הערה שנייה ללא עריכה.',
    createdAtIso: '2026-05-09T16:45:00.000Z',
  },
]

const bachs = [
  {
    id: IDS.bach1,
    updatedAt: savedAt,
    values: {
      date: '2026-05-09',
      hour: '14:00',
      sector: 'גזרה צפון',
      launchingUnit: 'חוליה 1',
      markingUnit: 'חוליה מציין א׳',
      targetId: IDS.target1,
      targetName: 'יעד דמה א׳',
      detection: 'אופטי',
      targetCoords: { east: '400000', north: '4000000', palach: '36' },
      targetAltitude: '440',
      targetDescription: 'מטרה לאימון',
      requiredAchievement: 'פגיעה',
      recordingFactor: 'קצין תצפית',
      flightAltitude: '500',
      hitProbability: 'בינוני',
      hitProbabilityDetails: 'מטרה חצי מוסתרת',
      controlApproved: 'כן',
      approvedBy: 'מ"פ',
      rearPositionId: IDS.posAlpha,
      positionName: 'עמדה אלפא',
      positionCoords: { east: '345678', north: '3456789', palach: '36' },
      positionAltitude: '420',
      missileC: 'א',
      serialNumber: '12345',
      barrelNumber: '1',
      koz: '1200',
      aka: '40',
      wind: '5 קמ"ש צפון',
      clouds: '3/8',
      azimuthToTarget: '1200',
      launchRange: '8500',
      flightType: 'flat',
      impact: 'ימין',
      arcTrack: 'לא',
      fuseType: 'T-433',
      delay: 'לא',
      launchTime: '14:30',
      missileFlightTime: 12,
      munitionsCount: 1,
      manualPlacement: 'לא',
      powerSource: 'רכב מונע',
      rightSectorAzimuth: '78.8',
      leftSectorAzimuth: '56.3',
      indicatorId: IDS.ind1,
      indicatorName: 'מציין דמה א׳',
      indicatorPositionCoords: { east: '401234', north: '4012345', palach: '36' },
      indicatorAltitude: '430',
      observationMeans: 'אופטי',
      indicatorMeans: 'שיח',
      indicatorKoz: '12',
      indicatorToTargetAzimuth: '1180',
      indicatorWind: '4 קמ"ש',
      indicatorClouds: '2/8',
      aimPoint: 'מרכז המבנה',
      indicationRange: '850',
      spotSize: 'קטן',
      targetSize: 'בינוני',
      concealments: 'אין',
      bdaResult: 'אלפא',
      bdaWithObserver: 'פגיעה טובה, השמדה מלאה',
      unusualEvents: 'אין',
      results: 'הושמד',
      renewed: 'לא רלוונטי',
      readyTime: '15:00',
      malfunctions: 'אין',
    },
  },
  {
    id: IDS.bach2,
    updatedAt: savedAt,
    values: {
      date: '2026-05-08',
      hour: '09:30',
      sector: 'גזרה דרום',
      launchingUnit: 'חוליה 2',
      markingUnit: 'חוליה מציין ב׳',
      targetName: 'יעד דמה ב׳',
      detection: 'מכ"ם',
      targetCoords: { east: '410000', north: '4100000', palach: '36' },
      targetAltitude: '395',
      requiredAchievement: 'נטרול',
      flightAltitude: '400',
      hitProbability: 'קשה',
      hitProbabilityDetails: 'מטרה נעה',
      controlApproved: 'לא',
      positionName: 'עמדה בראבו',
      positionCoords: { east: '456789', north: '4567890', palach: '36' },
      positionAltitude: '380',
      barrelNumber: '2',
      koz: '0800',
      aka: '38',
      wind: '10 קמ"ש מזרח',
      clouds: '5/8',
      azimuthToTarget: '0800',
      launchRange: '6200',
      flightType: 'lofted',
      impact: 'למטה',
      arcTrack: 'כן',
      arcTrackDirection: 'שמאל',
      delay: 'קצרה',
      launchTime: '09:45',
      missileFlightTime: 9,
      munitionsCount: 2,
      manualPlacement: 'כן',
      elevationComputer: 120,
      elevationPerformed: 118,
      sizeupComputer: 45,
      sizeupPerformed: 44,
      powerSource: 'גנרטור',
      bdaResult: 'ברבו',
      unusualEvents: 'ריח חריג קל בשיגור',
      results: 'פגיעה חלקית',
      malfunctions: 'תקלת תקשורת קצרה לפני ירי',
    },
  },
]

const missChecklists = [
  {
    id: IDS.missChecklist1,
    updatedAt: savedAt,
    values: {
      impactLocationDetected: 'כן',
      impactLocationKind: 'תיאור מילולי',
      impactLocationDescription: '3 מטר מזרחה לנ.צ. המטרה',
      impactLocationExploded: 'כן',
      indicatorTargetDataComparedWithChecklist: true,
      exitWasValid: 'לא',
      targetType: 'מבנה',
      reflectiveTarget: 'לא',
      targetFace: 'חזית דרום',
      multipleSpots: 'לא',
      spotBounced: 'לא',
      deflectionDone: 'לא',
      crossPosition: 'מרכז',
      missileImpactRelativeToCross: '3 מטר ימינה',
      spotSliding: 'לא',
      spotDrift: 'לא',
      hitDetected: 'לא',
      missileExploded: 'כן',
      impactDistanceMeters: 3,
      malfunctionOnExit: 'לא',
      dataValidated: 'כן',
      allMissionsValidated: 'כן',
      northSourceMethod: 'מוצא צפון',
      northSourceValidated: 'כן',
      fallingIndicatorsOk: 'כן',
      hiveOk: 'כן',
      directionCodeInsertedIn: "הוכנס במשימת יר'",
      targetAbove8km: 'לא',
      directionApproval: 'לא',
    },
  },
]

/** Matches what the storage layer persists */
const seedPayload = {
  positions: JSON.stringify(positions),
  currentPositionId: IDS.posAlpha,
  referencePositionId: IDS.posBravo,
  targets: JSON.stringify(targets),
  indicators: JSON.stringify(indicators),
  attackLogs: JSON.stringify(attackLogs),
  userNotes: JSON.stringify(userNotes),
  bachs: JSON.stringify(bachs),
  missChecklists: JSON.stringify(missChecklists),
}

const seedPayloadJson = JSON.stringify(seedPayload)

const html = `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>טעינת נתוני דמה</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 36rem; margin: 2rem auto; padding: 0 1rem; line-height: 1.5; }
    button { padding: 0.75rem 1.25rem; font-size: 1rem; cursor: pointer; border-radius: 0.75rem; border: none; background: #2563eb; color: #fff; }
    button:active { transform: scale(0.98); }
    a { color: #2563eb; }
    code { font-size: 0.85rem; background: #f5f5f5; padding: 0.15rem 0.35rem; border-radius: 0.25rem; }
  </style>
</head>
<body>
  <h1>טעינת נתוני דמה</h1>
  <p>דף זה כותב ל־<code>localStorage</code> את אותם המפתחות שהאפליקציה משתמשת בהם (מטרות, עמדות, מציינים, יומן תקיפות ועוד).</p>
  <p><strong>שים לב:</strong> הפעולה דורסת את הערכים הקיימים לאותם מפתחות.</p>
  <p>
    <button type="button" id="seed">מלא שוב נתוני דמה</button>
  </p>
  <p id="status" role="status"></p>
  <p><a href="/">חזרה לאפליקציה</a></p>
  <script>
    const SEED_PAYLOAD = ${seedPayloadJson};
    function applySeed() {
      const status = document.getElementById('status');
      try {
        for (const [key, value] of Object.entries(SEED_PAYLOAD)) {
          localStorage.setItem(key, value);
        }
        status.textContent = 'בוצע. אפשר לחזור לאפליקציה.';
      } catch (e) {
        status.textContent = 'שגיאה: ' + (e && e.message ? e.message : String(e));
      }
    }
    document.getElementById('seed').addEventListener('click', applySeed);
    window.addEventListener('DOMContentLoaded', () => {
      const status = document.getElementById('status');
      if (location.protocol === 'file:') {
        status.textContent =
          'לא נטען כלום: דף שנפתח מקובץ מקומי (file://) לא חולק את אותו localStorage עם השרת. ' +
          'הפעל את שרת הפיתוח והיכנס לכתובת: http://localhost:5173/dev-seed.html';
        return;
      }
      applySeed();
    });
  </script>
</body>
</html>
`

mkdirSync(outDir, { recursive: true })
writeFileSync(outFile, html, 'utf8')

console.log(`Wrote ${outFile}`)
console.log(
  'This does not write to the app yet. With `npm run dev`, open http://localhost:5173/dev-seed.html (not file://) so the page can fill localStorage.',
)
