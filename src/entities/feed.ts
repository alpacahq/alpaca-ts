/**
 * Which feed to pull market data from. This is either `iex` or `sip`. `sip` and `otc` are only available to those with a subscription
 */
export enum feed {
  IEX = "iex",
  SIP = "sip",
  OTC = "otc",
}
