import SearchInput from './SearchInput'

interface ListSearchBarProps {
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  placeholder: string
}

function ListSearchBar({ searchQuery, onSearchQueryChange, placeholder }: ListSearchBarProps) {
  return (
    <div dir="rtl">
      <SearchInput value={searchQuery} onChange={onSearchQueryChange} placeholder={placeholder} />
    </div>
  )
}

export default ListSearchBar
