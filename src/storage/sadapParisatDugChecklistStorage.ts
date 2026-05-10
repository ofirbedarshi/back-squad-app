const STORAGE_KEY = 'sadap-parisat-dug-checklist'

export function loadCheckedItems(): Record<string, boolean> {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return {}
  try {
    return JSON.parse(raw) as Record<string, boolean>
  } catch {
    return {}
  }
}

export function saveCheckedItems(checked: Record<string, boolean>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checked))
}

export function removeCheckedItems(): void {
  localStorage.removeItem(STORAGE_KEY)
}
