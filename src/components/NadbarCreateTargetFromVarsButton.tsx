interface NadbarCreateTargetFromVarsButtonProps {
  onClick: () => void
}

function NadbarCreateTargetFromVarsButton({ onClick }: NadbarCreateTargetFromVarsButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm active:bg-emerald-700 transition-colors touch-manipulation select-none"
    >
      שמור במאגר מטרות
    </button>
  )
}

export default NadbarCreateTargetFromVarsButton
