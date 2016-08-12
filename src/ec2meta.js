#!/usr/bin/env node

var program = require('commander')
  , info = require('../package.json')

program
  .version(info.version)
  .command('meta <path>', 'Retrieve the requested instance metadata (e.g. ec2meta meta instance-id)')
  .command('tag <name>', 'Retrieve the value of an instance tag (e.g. ec2meta tag Name)')
  .command('instance <path>', 'Retrieve the value of an instance attribute, path must be a JSON pointer')
  .parse(process.argv);
