import type { IndicatorInput } from '../domain/indicator.types'

interface IndicatorFormProps {
  onSubmit: (data: IndicatorInput) => void
  submitLabel?: string
}

function IndicatorForm({ onSubmit, submitLabel = 'שמור' }: IndicatorFormProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({})
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <p className="text-center text-neutral-400 py-4">שדות המציין יוגדרו בקרוב</p>

      <button
        type="submit"
        className="mt-2 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-200 active:scale-95 transition-transform touch-manipulation select-none"
      >
        {submitLabel}
      </button>
    </form>
  )
}

export default IndicatorForm
