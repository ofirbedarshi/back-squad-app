interface ListHeaderAddButtonProps {
  label: string
  onClick: () => void
}

function ListHeaderAddButton({ label, onClick }: ListHeaderAddButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="py-2 px-3 rounded-xl border-2 border-dashed border-neutral-300 text-neutral-600 font-semibold text-sm active:bg-neutral-100 transition-colors touch-manipulation select-none max-w-[11rem] leading-tight"
    >
      {label}
    </button>
  )
}

export default ListHeaderAddButton
