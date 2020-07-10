export interface ReplaceOrder {
  order_id: string
  qty?: number
  time_in_force?: string
  limit_price?: number
  stop_price?: number
  client_order_id?: string
}
