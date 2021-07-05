/*
 * @Author: Lyl
 * @Date: 2021-03-10 14:20:47
 * @LastEditors: Lyl
 * @LastEditTime: 2021-07-05 09:17:55
 * @Description:
 */
"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST: '"http://127.0.0.1:98"'
  // API_HOST: '"http://192.168.5.166:91"' // yn91
  // API_HOST: '"http://192.168.5.1:91"' // yn241
  // API_HOST: '"http://112.91.115.70:8099/dmps"', // hz
});
