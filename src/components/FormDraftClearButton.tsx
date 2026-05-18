interface FormDraftClearButtonProps {
  onPress: () => void | Promise<void>
  disabled?: boolean
}

/** Secondary action to clear saved draft after caller confirms destructive action. */
function FormDraftClearButton({ onPress, disabled }: FormDraftClearButtonProps) {
  return (
    <button
      type="button"
      onClick={() => void onPress()}
      disabled={disabled}
      className="w-full py-3 rounded-2xl text-sm font-semibold text-red-700 border border-red-200 bg-red-50/80 active:bg-red-100 touch-manipulation disabled:opacity-40 disabled:pointer-events-none"
    >
      נקה טיוטה
    </button>
  )
}

export default FormDraftClearButton
