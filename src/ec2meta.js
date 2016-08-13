#!/usr/bin/env node

var program = require('commander')
  , info = require('../package.json')

program
  .version(info.version)
  .command('meta <path>', 'Retrieve the requested instance metadata (e.g. ec2meta meta instance-id)')
  .command('tag <name>', 'Retrieve the value of an instance tag (e.g. ec2meta tag Name)')
  .command('user [path]', 'Retrieve the user data. If specified, path must be a JSON pointer, and data must be JSON')
  .command('identity [path]', 'Retrieve a value from the instance identity document. If specified, path must be a JSON pointer')
  .command('instance [path]', 'Retrieve an instance attribute. If specified, path must be a JSON pointer')
  .parse(process.argv);
