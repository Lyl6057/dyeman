/*
 * @Author: Lyl
 * @Date: 2021-03-10 14:20:47
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-06-14 10:09:25
 * @Description:
 */
"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST: '"http://127.0.0.1:91"'
  // API_HOST: '"http://192.168.5.166:91"' // yn91
  // API_HOST: '"http://192.168.5.1:91"' // yn241
  // API_HOST: '"http://112.91.115.70:8099/dmps"' // hz
});
