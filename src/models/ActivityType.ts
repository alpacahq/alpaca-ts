/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * - FILL
 * Order fills (both partial and full fills)
 *
 * - TRANS
 * Cash transactions (both CSD and CSW)
 *
 * - MISC
 * Miscellaneous or rarely used activity types (All types except those in TRANS, DIV, or FILL)
 *
 * - ACATC
 * ACATS IN/OUT (Cash)
 *
 * - ACATS
 * ACATS IN/OUT (Securities)
 *
 * - CFEE
 * Crypto fee
 *
 * - CSD
 * Cash deposit(+)
 *
 * - CSW
 * Cash withdrawal(-)
 *
 * - DIV
 * Dividends
 *
 * - DIVCGL
 * Dividend (capital gain long term)
 *
 * - DIVCGS
 * Dividend (capital gain short term)
 *
 * - DIVFEE
 * Dividend fee
 *
 * - DIVFT
 * Dividend adjusted (Foreign Tax Withheld)
 *
 * - DIVNRA
 * Dividend adjusted (NRA Withheld)
 *
 * - DIVROC
 * Dividend return of capital
 *
 * - DIVTW
 * Dividend adjusted (Tefra Withheld)
 *
 * - DIVTXEX
 * Dividend (tax exempt)
 *
 * - FEE
 * Fee denominated in USD
 *
 * - INT
 * Interest (credit/margin)
 *
 * - INTNRA
 * Interest adjusted (NRA Withheld)
 *
 * - INTTW
 * Interest adjusted (Tefra Withheld)
 *
 * - JNL
 * Journal entry
 *
 * - JNLC
 * Journal entry (cash)
 *
 * - JNLS
 * Journal entry (stock)
 *
 * - MA
 * Merger/Acquisition
 *
 * - NC
 * Name change
 *
 * - OPASN
 * Option assignment
 *
 * - OPEXP
 * Option expiration
 *
 * - OPXRC
 * Option exercise
 *
 * - PTC
 * Pass Thru Charge
 *
 * - PTR
 * Pass Thru Rebate
 *
 * - REORG
 * Reorg CA
 *
 * - SC
 * Symbol change
 *
 * - SSO
 * Stock spinoff
 *
 * - SSP
 * Stock split
 */
export enum ActivityType {
  FILL = "FILL",
  TRANS = "TRANS",
  MISC = "MISC",
  ACATC = "ACATC",
  ACATS = "ACATS",
  CSD = "CSD",
  CSW = "CSW",
  DIV = "DIV",
  DIVCGL = "DIVCGL",
  DIVCGS = "DIVCGS",
  DIVFEE = "DIVFEE",
  DIVFT = "DIVFT",
  DIVNRA = "DIVNRA",
  DIVROC = "DIVROC",
  DIVTW = "DIVTW",
  DIVTXEX = "DIVTXEX",
  INT = "INT",
  INTNRA = "INTNRA",
  INTTW = "INTTW",
  JNL = "JNL",
  JNLC = "JNLC",
  JNLS = "JNLS",
  MA = "MA",
  NC = "NC",
  OPASN = "OPASN",
  OPEXP = "OPEXP",
  OPXRC = "OPXRC",
  PTC = "PTC",
  PTR = "PTR",
  REORG = "REORG",
  SC = "SC",
  SSO = "SSO",
  SSP = "SSP",
  CFEE = "CFEE",
  FEE = "FEE",
}
