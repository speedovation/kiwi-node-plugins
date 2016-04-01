api = require('./src/Plugins/api');
jsesc = require('jsesc');
api = api();

var learn = require('./src/Plugins/learn');
learn.requestFlush(); 


funcstr = '';
api_functions= {};

var program = require('commander');

program
    .version('0.0.1')
    .arguments('<func> [data]')
    .action(function(func, data) {
        funcstr = func;
        api_functions = JSON.parse(data);
    });

program.parse(process.argv);

if (typeof funcstr === 'undefined') {
    console.error('no command given!');
    process.exit(1);
}


var module = require('./src/Plugins/'+'jsbeauty' )

module[funcstr]();
