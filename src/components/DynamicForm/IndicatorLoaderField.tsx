import { useMemo, useState } from 'react'
import type { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import Modal from '../base/Modal'
import IndicatorCard from '../IndicatorCard'
import { loadIndicatorsUseCase } from '../../useCases/loadIndicators'
import type { FormValues, IndicatorLoaderField as IndicatorLoaderFieldDef } from '../../domain/dynamicForm.types'
import type { Indicator } from '../../domain/indicator.types'

interface IndicatorLoaderFieldProps {
  fieldDef: IndicatorLoaderFieldDef
  currentIndicatorId: string | undefined
  setValue: UseFormSetValue<FormValues>
  register: UseFormRegister<FormValues>
  errors: FieldErrors<FormValues>
}

function IndicatorLoaderField({ fieldDef, currentIndicatorId, setValue, register, errors }: IndicatorLoaderFieldProps) {
  const [showModal, setShowModal] = useState(false)
  const indicators = useMemo(() => loadIndicatorsUseCase(), [showModal])
  const loadedIndicator = indicators.find((i) => i.id === currentIndicatorId)

  function handleSelect(indicator: Indicator) {
    const { key, fieldMappings } = fieldDef
    setValue(key, indicator.id)
    if (fieldMappings.indicatorName) setValue(fieldMappings.indicatorName, indicator.indicatorName)
    if (fieldMappings.coordinates) setValue(fieldMappings.coordinates, indicator.coordinates)
    if (fieldMappings.altitude) setValue(fieldMappings.altitude, String(indicator.altitude))
    if (fieldMappings.means) setValue(fieldMappings.means, indicator.means)
    if (fieldMappings.markCode) setValue(fieldMappings.markCode, String(indicator.markCode))
    setShowModal(false)
  }

  function handleClear() {
    const { key, fieldMappings } = fieldDef
    setValue(key, '')
    if (fieldMappings.indicatorName) setValue(fieldMappings.indicatorName, '')
    if (fieldMappings.coordinates) setValue(fieldMappings.coordinates, { east: '', north: '', palach: '' })
    if (fieldMappings.altitude) setValue(fieldMappings.altitude, '')
    if (fieldMappings.means) setValue(fieldMappings.means, '')
    if (fieldMappings.markCode) setValue(fieldMappings.markCode, '')
  }

  const error = errors[fieldDef.key]
  const errorMessage = error && 'message' in error ? (error.message as string) : undefined

  return (
    <>
      <input
        type="hidden"
        {...register(fieldDef.key, { validate: (v) => !!v || 'יש לטעון מציין לפני שמירה' })}
      />

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2 pt-2">
          {fieldDef.bold
            ? <h2 className="text-base font-bold underline text-neutral-800">{fieldDef.text}</h2>
            : <h3 className="text-sm font-semibold text-neutral-500">{fieldDef.text}</h3>
          }

          {loadedIndicator ? (
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-2 py-0.5 max-w-[140px] truncate">
                {loadedIndicator.indicatorName}
              </span>
              <button
                type="button"
                onClick={handleClear}
                className="text-neutral-400 text-base leading-none active:text-neutral-600 touch-manipulation px-1"
                aria-label="נקה מציין"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className={[
                'shrink-0 text-xs font-semibold rounded-full px-3 py-1 touch-manipulation',
                errorMessage
                  ? 'text-red-600 bg-red-50 border border-red-300 active:bg-red-100'
                  : 'text-blue-600 bg-blue-50 border border-blue-200 active:bg-blue-100',
              ].join(' ')}
            >
              טען מציין
            </button>
          )}
        </div>

        {errorMessage && (
          <p className="text-xs text-red-500 px-1">{errorMessage}</p>
        )}
      </div>

      {showModal && (
        <Modal title="בחר מציין" onClose={() => setShowModal(false)}>
          <div className="flex flex-col gap-3">
            {indicators.length === 0 ? (
              <p className="text-center text-neutral-500 text-sm py-6">אין מציינים שמורים לבחירה</p>
            ) : (
              indicators.map((indicator) => (
                <IndicatorCard key={indicator.id} indicator={indicator} onClick={() => handleSelect(indicator)} onLongPress={() => {}} />
              ))
            )}
          </div>
        </Modal>
      )}
    </>
  )
}

export default IndicatorLoaderField
