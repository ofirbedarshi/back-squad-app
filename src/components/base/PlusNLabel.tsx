interface PlusNLabelProps {
  n: number
}

function PlusNLabel({ n }: PlusNLabelProps) {
  return (
    <span className="flex items-center gap-0.5 whitespace-nowrap px-1 text-xs font-bold text-emerald-600">
      +{n}
    </span>
  )
}

export default PlusNLabel
