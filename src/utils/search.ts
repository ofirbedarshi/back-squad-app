export function filterByQuery<T>(
  items: T[],
  query: string,
  getFields: (item: T) => string[],
): T[] {
  const q = query.trim().toLowerCase()
  if (q === '') return items
  return items.filter((item) =>
    getFields(item).some((field) => field.toLowerCase().includes(q)),
  )
}
