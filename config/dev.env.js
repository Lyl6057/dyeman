'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST: '"http://10.0.168.127:8091"',
  // API_HOST: '"http://112.91.115.70:8099/dmps"',
})
