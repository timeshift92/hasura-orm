export default interface OrderBy {
  field: string
  operator: []
}


enum operator = {
  asc=asc
  asc_nulls_first=asc_nulls_first
  asc_nulls_last=asc_nulls_last
  desc=desc
  desc_nulls_first=desc_nulls_first
  desc_nulls_last=desc_nulls_last
}
