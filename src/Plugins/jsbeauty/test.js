//#!/usr/bin/env node
 
var program = require('commander');


program
  .version('0.0.1')
  .command('install [name]', 'install one or more packages')
  .command('search [query]', 'search with optional query')
  .command('list', 'list packages installed')
  .command('publish', 'publish the package')
  .parse(process.argv);
