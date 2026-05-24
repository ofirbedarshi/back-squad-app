import { useState } from 'react'
import type { PositionCoordinates } from '../domain/position.types'
import type {
  FireFeasibilityCoordsFormFields,
  FireFeasibilityDistancesHeightsFormFields,
  FireFeasibilityMode,
  FireFeasibilityResults,
} from '../domain/fireFeasibility.types'
import type { EntityLinksUpdate } from '../domain/entityLinks.types'
import { calculateFireFeasibility } from '../useCases/calculateFireFeasibility'
import { useDomainError } from './useDomainError'
import type { FireFeasibilityStep } from './useFireFeasibilityFlow.types'

export function useFireFeasibilityFlow(mode: FireFeasibilityMode) {
  const { triggerError } = useDomainError()
  const [step, setStep] = useState<FireFeasibilityStep>('links')
  const [targetId, setTargetId] = useState<string | undefined>()
  const [positionId, setPositionId] = useState<string | undefined>()
  const [results, setResults] = useState<FireFeasibilityResults | null>(null)

  const [obstacleCoords, setObstacleCoords] = useState('')
  const [obstacleHeight, setObstacleHeight] = useState('')
  const [hide1Coordinates, setHide1Coordinates] = useState<PositionCoordinates | undefined>()
  const [hide1Height, setHide1Height] = useState('')
  const [hide2Coordinates, setHide2Coordinates] = useState<PositionCoordinates | undefined>()
  const [hide2Height, setHide2Height] = useState('')
  const [positionObstacleRange, setPositionObstacleRange] = useState('')
  const [hide1Distance, setHide1Distance] = useState('')
  const [hide1HeightDiff, setHide1HeightDiff] = useState('')
  const [hide2Distance, setHide2Distance] = useState('')
  const [hide2HeightDiff, setHide2HeightDiff] = useState('')
  const [flightPath, setFlightPath] = useState('flat')

  const coordsFormState: FireFeasibilityCoordsFormFields = {
    obstacleCoords,
    obstacleHeight,
    hide1Coordinates,
    hide1Height,
    hide2Coordinates,
    hide2Height,
    flightPath,
  }

  const distancesHeightsFormState: FireFeasibilityDistancesHeightsFormFields = {
    obstacleHeight,
    positionObstacleRange,
    hide1Distance,
    hide1HeightDiff,
    hide2Distance,
    hide2HeightDiff,
    flightPath,
  }

  function updateCoordsForm(patch: Partial<FireFeasibilityCoordsFormFields>) {
    if (patch.obstacleCoords !== undefined) setObstacleCoords(patch.obstacleCoords)
    if (patch.obstacleHeight !== undefined) setObstacleHeight(patch.obstacleHeight)
    if (patch.hide1Coordinates !== undefined) setHide1Coordinates(patch.hide1Coordinates)
    if (patch.hide1Height !== undefined) setHide1Height(patch.hide1Height)
    if (patch.hide2Coordinates !== undefined) setHide2Coordinates(patch.hide2Coordinates)
    if (patch.hide2Height !== undefined) setHide2Height(patch.hide2Height)
    if (patch.flightPath !== undefined) setFlightPath(patch.flightPath)
  }

  function updateDistancesHeightsForm(patch: Partial<FireFeasibilityDistancesHeightsFormFields>) {
    if (patch.obstacleHeight !== undefined) setObstacleHeight(patch.obstacleHeight)
    if (patch.positionObstacleRange !== undefined) {
      setPositionObstacleRange(patch.positionObstacleRange)
    }
    if (patch.hide1Distance !== undefined) setHide1Distance(patch.hide1Distance)
    if (patch.hide1HeightDiff !== undefined) setHide1HeightDiff(patch.hide1HeightDiff)
    if (patch.hide2Distance !== undefined) setHide2Distance(patch.hide2Distance)
    if (patch.hide2HeightDiff !== undefined) setHide2HeightDiff(patch.hide2HeightDiff)
    if (patch.flightPath !== undefined) setFlightPath(patch.flightPath)
  }

  function updateLinks(links: EntityLinksUpdate) {
    if ('targetId' in links) {
      setTargetId(links.targetId ?? undefined)
    }
    if ('positionId' in links) {
      setPositionId(links.positionId ?? undefined)
    }
  }

  function advanceFromLinks() {
    if (!targetId || !positionId) return
    setStep('form')
  }

  function calculateResult(): FireFeasibilityResults | null {
    try {
      return calculateFireFeasibility()
    } catch (error) {
      triggerError(error instanceof Error ? error.message : 'חישוב נכשל')
      return null
    }
  }

  return {
    mode,
    step,
    setStep,
    targetId,
    positionId,
    results,
    setResults,
    coordsFormState,
    distancesHeightsFormState,
    updateCoordsForm,
    updateDistancesHeightsForm,
    updateLinks,
    advanceFromLinks,
    calculateResult,
  }
}
