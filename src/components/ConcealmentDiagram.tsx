import { formatMetric } from '../utils/metricRounding'
import type { ConcealmentDiagramModel } from '../domain/concealmentDiagram.types'

interface ConcealmentDiagramProps {
  model: ConcealmentDiagramModel
}

const VIEW_WIDTH = 320
const VIEW_HEIGHT = 200
const PAD_LEFT = 30
const PAD_RIGHT = 56
const PAD_TOP = 30
const PAD_BOTTOM = 34

function formatMeters(value: number): string {
  return `${formatMetric(value)} מ׳`
}

function formatDeg(value: number): string {
  return `${formatMetric(value)}°`
}

function ConcealmentDiagram({ model }: ConcealmentDiagramProps) {
  const maxDistanceMeters = Math.max(
    model.concealment.distanceFromTargetMeters,
    model.missile.distanceFromTargetMeters,
    1,
  )
  const maxHeightMeters = Math.max(
    model.concealment.heightAboveTargetMeters,
    model.missile.heightAboveTargetMeters,
    1,
  )

  const plotWidth = VIEW_WIDTH - PAD_LEFT - PAD_RIGHT
  const plotHeight = VIEW_HEIGHT - PAD_TOP - PAD_BOTTOM
  const baseY = VIEW_HEIGHT - PAD_BOTTOM
  const targetX = VIEW_WIDTH - PAD_RIGHT

  // Uniform meters-per-pixel on both axes so drawn angles match the real angles.
  const pixelsPerMeter = Math.min(plotWidth / maxDistanceMeters, plotHeight / maxHeightMeters)

  const projectX = (distanceMeters: number) => targetX - distanceMeters * pixelsPerMeter
  const projectY = (heightMeters: number) => baseY - heightMeters * pixelsPerMeter

  const concealmentX = projectX(model.concealment.distanceFromTargetMeters)
  const concealmentY = projectY(model.concealment.heightAboveTargetMeters)
  const missileX = projectX(model.missile.distanceFromTargetMeters)
  const missileY = projectY(model.missile.heightAboveTargetMeters)

  const missileColor = model.enabled ? '#16a34a' : '#dc2626'

  return (
    <svg
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      className="w-full rounded-lg border border-neutral-200 bg-white"
      role="img"
      aria-label="תרשים זוויות הסתר וטיל ביחס למטרה"
    >
      <line
        x1={PAD_LEFT}
        y1={baseY}
        x2={targetX}
        y2={baseY}
        stroke="#9ca3af"
        strokeWidth={1}
      />

      <line
        x1={targetX}
        y1={baseY}
        x2={concealmentX}
        y2={concealmentY}
        stroke="#2563eb"
        strokeWidth={1.5}
      />
      <line
        x1={targetX}
        y1={baseY}
        x2={missileX}
        y2={missileY}
        stroke={missileColor}
        strokeWidth={1.5}
      />

      <line
        x1={concealmentX}
        y1={baseY}
        x2={concealmentX}
        y2={concealmentY}
        stroke="#2563eb"
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      <line
        x1={missileX}
        y1={baseY}
        x2={missileX}
        y2={missileY}
        stroke={missileColor}
        strokeWidth={1}
        strokeDasharray="3 3"
      />

      <circle cx={targetX} cy={baseY} r={4} fill="#16a34a" />
      <circle cx={concealmentX} cy={concealmentY} r={3.5} fill="#2563eb" />
      <circle cx={missileX} cy={missileY} r={3.5} fill={missileColor} />

      <text x={targetX} y={baseY + 16} textAnchor="middle" fontSize={9} fill="#374151">
        {model.target.label}
      </text>

      <text x={concealmentX} y={concealmentY - 18} textAnchor="middle" fontSize={9} fill="#2563eb">
        {model.concealment.label} ({formatDeg(model.concealmentAngleDeg)})
      </text>
      <text x={concealmentX} y={concealmentY - 8} textAnchor="middle" fontSize={8} fill="#6b7280">
        גובה {formatMeters(model.concealment.heightAboveTargetMeters)}
      </text>
      <text x={concealmentX} y={baseY + 16} textAnchor="middle" fontSize={8} fill="#6b7280">
        {formatMeters(model.concealment.distanceFromTargetMeters)}
      </text>

      <text x={missileX} y={missileY - 18} textAnchor="middle" fontSize={9} fill={missileColor}>
        {model.missile.label} ({formatDeg(model.missileAngleDeg)})
      </text>
      <text x={missileX} y={missileY - 8} textAnchor="middle" fontSize={8} fill="#6b7280">
        גובה {formatMeters(model.missile.heightAboveTargetMeters)}
      </text>
      <text x={missileX} y={baseY + 16} textAnchor="middle" fontSize={8} fill="#6b7280">
        {formatMeters(model.missile.distanceFromTargetMeters)}
      </text>
    </svg>
  )
}

export default ConcealmentDiagram
