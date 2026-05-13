import SearchInput from './base/SearchInput'

interface IndicatorSearchBarProps {
  searchQuery: string
  onSearchQueryChange: (value: string) => void
}

function IndicatorSearchBar({ searchQuery, onSearchQueryChange }: IndicatorSearchBarProps) {
  return (
    <div dir="rtl">
      <SearchInput
        value={searchQuery}
        onChange={onSearchQueryChange}
        placeholder="חפש לפי שם, אמצעי, קוד ציון..."
      />
    </div>
  )
}

export default IndicatorSearchBar
