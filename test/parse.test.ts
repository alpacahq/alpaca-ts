import parse from '../src/parse'

import {
  RawAccount,
  RawOrder,
  RawPosition,
  RawTradeActivity,
  RawNonTradeActivity,
  TradeActivity,
  NonTradeActivity,
} from '../src/entities'

describe('Parser', () => {
  describe('parseAccount', () => {
    it('should handle missing input', () => {
      const result = parse.account(null)

      expect(result).toBeUndefined()
    })

    it('should make a raw function to return the raw input', () => {
      const rawAccount = {} as RawAccount
      const account = parse.account(rawAccount)
      const result = account.raw()

      expect(result).toBe(rawAccount)
    })

    it('should parse buying power to a number', () => {
      const rawAccount = {
        buying_power: '123.456',
      } as RawAccount
      const account = parse.account(rawAccount)

      expect(account.buying_power).toBe(123.456)
    })
  })

  describe('parseOrder', () => {
    it('should handle missing input', () => {
      const result = parse.order(null)

      expect(result).toBeUndefined()
    })

    it('should make a raw function to return the raw input', () => {
      const rawOrder = {} as RawOrder
      const account = parse.order(rawOrder)
      const result = account.raw()

      expect(result).toBe(rawOrder)
    })

    it('should parse qty to a number', () => {
      const rawOrder = {
        qty: '42',
      } as RawOrder
      const account = parse.order(rawOrder)

      expect(account.qty).toBe(42)
    })

    it('should parse legs if they exist', () => {
      const rawOrder = {
        legs: [
          {
            qty: '7',
          },
        ],
      } as RawOrder
      const order = parse.order(rawOrder)

      expect(order.legs[0].qty).toBe(7)
    })

    it(`should not parse legs if they don't exist`, () => {
      const rawOrder = {
        legs: null,
      } as RawOrder
      const order = parse.order(rawOrder)

      expect(order.legs).toBeUndefined()
    })
  })

  describe('parseOrders', () => {
    it('should parse orders if they exist', () => {
      const rawOrders = [
        {
          qty: '42',
        },
      ] as RawOrder[]
      const orders = parse.orders(rawOrders)

      expect(orders[0].qty).toBe(42)
    })

    it(`should not parse orders if they don't exist`, () => {
      const result = parse.orders(null)

      expect(result).toBeUndefined()
    })
  })

  describe('parsePosition', () => {
    it('should handle missing input', () => {
      const result = parse.position(null)

      expect(result).toBeUndefined()
    })

    it('should make a raw function that returns the raw input', () => {
      const rawPosition = {} as RawPosition
      const position = parse.position(rawPosition)
      const result = position.raw()

      expect(result).toBe(rawPosition)
    })

    it('should parse qty to a number', () => {
      const rawPosition = {
        qty: '42',
      } as RawPosition
      const position = parse.position(rawPosition)

      expect(position.qty).toBe(42)
    })
  })

  describe('parsePositions', () => {
    it('should parse positions if they exist', () => {
      const result = parse.positions(null)

      expect(result).toBeUndefined()
    })

    it(`should not parse positions if they don't exist`, () => {
      const rawPositions = [
        {
          qty: '42',
        },
      ] as RawPosition[]
      const result = parse.positions(rawPositions)

      expect(result[0].qty).toBe(42)
    })
  })

  describe('parseTradeActivity', () => {
    it('should handle missing input', () => {
      const result = parse.tradeActivity(null)

      expect(result).toBeUndefined()
    })

    it('should make a raw function that returns the raw input', () => {
      const rawTradeActivity = {} as RawTradeActivity
      const position = parse.tradeActivity(rawTradeActivity)
      const result = position.raw()

      expect(result).toBe(rawTradeActivity)
    })

    it('should parse qty to a number', () => {
      const rawTradeActivity = {
        qty: '42',
      } as RawTradeActivity
      const position = parse.tradeActivity(rawTradeActivity)

      expect(position.qty).toBe(42)
    })
  })

  describe('parseNonTradeActivity', () => {
    it('should handle missing input', () => {
      const result = parse.nonTradeActivity(null)

      expect(result).toBeUndefined()
    })

    it('should make a raw function that returns the raw input', () => {
      const rawNonTradeActivity = {} as RawNonTradeActivity
      const position = parse.nonTradeActivity(rawNonTradeActivity)
      const result = position.raw()

      expect(result).toBe(rawNonTradeActivity)
    })

    it('should parse qty to a number', () => {
      const rawNonTradeActivity = {
        qty: '42',
      } as RawNonTradeActivity
      const position = parse.nonTradeActivity(rawNonTradeActivity)

      expect(position.qty).toBe(42)
    })
  })

  describe('parseActivities', () => {
    it('should handle missing input', () => {
      const result = parse.activities(null)

      expect(result).toBeUndefined()
    })

    it('should parse each activity type', () => {
      const rawActivities = [
        {
          activity_type: 'FILL',
          price: '6.66',
        } as RawTradeActivity,
        {
          activity_type: 'TRANS',
          net_amount: '123.45',
        } as RawNonTradeActivity,
      ]
      const activities = parse.activities(rawActivities)

      expect((activities[0] as TradeActivity).price).toBe(6.66)
      expect((activities[1] as NonTradeActivity).net_amount).toBe(123.45)
    })
  })
})
