interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <div className="relative">
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none text-base">
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full py-2.5 pr-9 pl-3 rounded-xl border border-neutral-300 bg-white text-neutral-800 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-blue-400 transition-colors"
        dir="rtl"
      />
    </div>
  )
}

export default SearchInput
