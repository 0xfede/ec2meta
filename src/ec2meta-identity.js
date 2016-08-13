#!/usr/bin/env node

var Metadata = require('./meta')
  , program = require('commander')
  , jr = require('jsonref')
  , info = require('../package.json')

program
  .version(info.version)
  .arguments('[path]')
  .option('-j, --json', 'Always produce a JSON output')
  .option('-p, --pretty', 'Format a JSON output')
  .option('-d, --debug', 'Print error messages to stderr')
  .parse(process.argv);

var path = program.args[0];

if (!path) {
  path = '#/';
} else {
  if (path[0] !== '#') path = '#' + path;
  if (path[1] !== '/') path = '#/' + path.substr(1);
}
var m = new Metadata();
m.document().then(data => {
  let out = path.length > 2 ? jr.pointer(data, path) : data;
  if (typeof out === 'undefined') {
    process.exit(2);
  } else {
    if (program.json || typeof out === 'object') {
      out = JSON.stringify(out, null, program.pretty ? 2 : null) + (program.pretty ? '\n' : '');
    }
    process.stdout.write(out);
    process.exit(0);
  }
}).catch(err => {
  if (program.debug) {
    console.error(err);
  }
  process.exit(1);
});
