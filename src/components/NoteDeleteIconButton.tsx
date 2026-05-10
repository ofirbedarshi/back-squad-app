interface NoteDeleteIconButtonProps {
  onClick: () => void
}

function NoteDeleteIconButton({ onClick }: NoteDeleteIconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 p-2 rounded-lg text-red-700 bg-red-50/80 border border-red-100 active:bg-red-100 touch-manipulation select-none"
      aria-label="מחק הערה"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        aria-hidden
      >
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
      </svg>
    </button>
  )
}

export default NoteDeleteIconButton
