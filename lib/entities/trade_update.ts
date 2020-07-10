export interface TradeUpdate {
  event: string
  price: string
  timestamp: string
  position_qty: string
  order: {
    id: string
    client_order_id: string
    asset_id: string
    symbol: string
    exchange: string
    asset_class: string
    side: string
  }
}
