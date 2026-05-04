interface FormFieldProps {
  label: string
  error?: string
  children: React.ReactNode
}

function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm text-neutral-500 pr-1">{label}</span>
      {children}
      {error && (
        <span className="text-xs text-red-500 pr-1">{error}</span>
      )}
    </div>
  )
}

export default FormField
