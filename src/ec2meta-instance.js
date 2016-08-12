#!/usr/bin/env node

var instance = require('./instance')
  , program = require('commander')
  , jr = require('jsonref')
  , info = require('../package.json')
  , path

program
  .version(info.version)
  .arguments('<path>')
  .option('-j, --json', 'Always produce a JSON output')
  .option('-p, --pretty', 'Format a JSON output')
  .action(function(_path) {
    path = _path;
    if (path[0] !== '#') path = '#' + path;
    if (path[1] !== '/') path = '#/' + path.substr(1);
    instance().then(data => {
      let out = path.length > 2 ? jr.pointer(data, path) : data;
      if (program.json || typeof out === 'object') {
        out = JSON.stringify(out, null, program.pretty ? 2 : null) + (program.pretty ? '\n' : '');
      }
      process.stdout.write(out);
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
