/**
 * Seeds the app's browser "collections" (localStorage keys used by src/storage/).
 *
 * Usage:
 *   npm run seed   → only regenerates public/dev-seed.html (does not touch the browser).
 *   npm run dev    → open http://localhost:5173/dev-seed.html (same host/port as the app).
 *   The page auto-writes mock data on load when served over http(s). Do not open the file via file:// —
 *   that uses a different localStorage than the app.
 *
 * Keys: positions, currentPositionId, referencePositionId, targets, indicators, attackLogs
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
    coordinates: '400000/4000000',
    altitude: 440,
  },
  {
    id: IDS.target2,
    targetName: 'יעד דמה ב׳',
    coordinates: '410000/4100000',
    altitude: 395,
  },
  {
    id: IDS.target3,
    targetName: 'יעד דמה ג׳',
    targetDescription: 'מבנה',
    coordinates: '420000/4200000',
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

/** Matches what the storage layer persists */
const seedPayload = {
  positions: JSON.stringify(positions),
  currentPositionId: IDS.posAlpha,
  referencePositionId: IDS.posBravo,
  targets: JSON.stringify(targets),
  indicators: JSON.stringify(indicators),
  attackLogs: JSON.stringify(attackLogs),
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
