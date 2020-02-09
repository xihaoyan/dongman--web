'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const BASIC_URL = 'http://localhost:8366';

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',  //必须加双引号，否则报错 development is not defined
  BASIC_URL: BASIC_URL
})
