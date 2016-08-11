#!/usr/bin/env node

var program = require('commander')
  , info = require('./package.json')

program
  .version(info.version)
  .command('meta <path>', 'get the specified instance metadata')
  .command('tag <name>', 'get an instance tag')
  .parse(process.argv);
