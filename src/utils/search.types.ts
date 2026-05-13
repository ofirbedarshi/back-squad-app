export interface MetricFilter {
  mode: 'exact' | 'range' | 'max'
  exact: string
  min: string
  max: string
}
