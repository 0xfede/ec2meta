#!/usr/bin/env node

var Metadata = require('./meta')
  , program = require('commander')
  , info = require('../package.json')
  , path

program
  .version(info.version)
  .arguments('<path>')
  .action(function(_path) {
    path = _path;
    var m = new Metadata();
    m.request('/' + path).then(data => {
      process.stdout.write(data);
      process.exit(0);
    }, err => {
      console.error(err);
      process.exit(1);
    })
  })
  .parse(process.argv);

if (typeof path === 'undefined') {
  program.outputHelp();
  process.exit(1);
}
