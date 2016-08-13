#!/usr/bin/env node

var tags = require('./tags')
  , program = require('commander')
  , info = require('../package.json')
  , name

program
  .version(info.version)
  .arguments('<name>')
  .option('-d, --debug', 'Print error messages to stderr')
  .action(function(_name) {
    name = _name;
    tags().then(tags => {
      var out = tags[name];
      if (typeof out === 'undefined') {
        process.exit(2);
      } else {
        process.stdout.write(out);
        process.exit(0);
      }
    }).catch(err => {
      if (program.debug) {
        console.error(err);
      }
      process.exit(1);
    })
  })
  .parse(process.argv);

if (typeof name === 'undefined') {
  program.outputHelp();
  process.exit(1);
}