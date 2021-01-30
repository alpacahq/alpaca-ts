'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/alpaca.min.js')
} else {
  module.exports = require('./dist/alpaca.js')
}
