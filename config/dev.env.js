'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const BASIC_URL = 'http://localhost:8400';

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASIC_URL: BASIC_URL
})
