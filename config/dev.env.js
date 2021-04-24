/*
 * @Author: Lyl
 * @Date: 2021-03-10 14:20:47
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-24 08:17:20
 * @Description: 
 */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_HOST: '"http://127.0.0.1:91"',
  API_HOST: '"http://192.168.0.91:91"', // yn91
  // API_HOST: '"http://192.168.0.241:91"', // yn241
  // API_HOST: '"http://112.91.115.70:8099/dmps"', // hz
  // API_HOST: '"http://192.168.0.93:91"',  //owt
})
