#!/usr/bin/env node

var tags = require('./tags')
  , program = require('commander')
  , info = require('./package.json')
  , name

program
  .version(info.version)
  .arguments('<name>')
  .action(function(_name) {
    name = _name;
    tags().then(tags => {
      process.stdout.write(tags[name] || '');
      process.exit(0);
    }, err => {
      console.error(err);
      process.exit(1);
    })
  })
  .parse(process.argv);

if (typeof name === 'undefined') {
  program.outputHelp();
  process.exit(1);
}