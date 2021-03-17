/*
 * @Author: Lyl
 * @Date: 2021-03-10 14:20:47
 * @LastEditors: Lyl
 * @LastEditTime: 2021-03-16 17:03:12
 * @Description: 
 */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST: '"http://127.0.0.1:91"',
  // API_HOST: '"http://192.168.99.63:91"',
  // API_HOST: '"http://112.91.115.70:8099/dmps"',
})
