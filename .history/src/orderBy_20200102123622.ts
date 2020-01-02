export default interface OrderBy(T) {
  [T]: string
  operator: 'asc' | 'asc_nulls_first' | 'asc_nulls_last' | 'desc' | 'desc_nulls_first' | 'desc_nulls_last'
}

export default

