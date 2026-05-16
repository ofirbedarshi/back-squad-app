export interface RshamatzChecklistItemDef {
  id: string
  label: string
}

export interface RshamatzChecklistSectionDef {
  id: string
  title: string
  items: RshamatzChecklistItemDef[]
}
