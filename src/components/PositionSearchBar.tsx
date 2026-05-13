import SearchInput from './base/SearchInput'

interface PositionSearchBarProps {
  searchQuery: string
  onSearchQueryChange: (value: string) => void
}

function PositionSearchBar({ searchQuery, onSearchQueryChange }: PositionSearchBarProps) {
  return (
    <div dir="rtl">
      <SearchInput
        value={searchQuery}
        onChange={onSearchQueryChange}
        placeholder="חפש לפי שם או קואורדינטות..."
      />
    </div>
  )
}

export default PositionSearchBar
