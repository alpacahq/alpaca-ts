export interface Asset {
  id: string
  class: string
  exchange: string
  symbol: string
  status: string
  tradable: boolean
  marginable: boolean
  shortable: boolean
  easy_to_borrow: boolean
}
