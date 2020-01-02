export default interface OrderBy {
  field: string
  operator: "asc
  asc_nulls_first
  asc_nulls_last
  desc
  desc_nulls_first
  desc_nulls_last"
}


enum operator = {
  asc
  asc_nulls_first
  asc_nulls_last
  desc
  desc_nulls_first
  desc_nulls_last
}
