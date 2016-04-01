api = require('./src/Plugins/api');
jsesc = require('jsesc');
api = api();

//Sample only
//var learn = require('./src/Plugins/learn');
//learn.requestFlush(); 


var funcstr;
api_functions= {};
var moduleName;

var program = require('commander');

program
    .version('0.0.1')
    .usage(
'\n\n' + 
'___ ____ _ ____ ____ _ ______________\n'+
'|_  ||_  _|  (_)|_  _|    |_  _|(_)  \n'+
'  | |_/ /    __   \\ \\  /\\  / /  __   \n'+
"  |  __'.   [  |   \\ \\/  \\/ /  [  |  \n"+
' _| |  \\ \\_  | |    \\  /\\  /    | |  \n'+
'|____||____|[___]    \\/  \\/    [___] \n'+
'\n\n' +
"<module> <func> {data}")

    .arguments('<module> <func> {data}')
    .action(function(module,func, data) {
        moduleName = module;
        funcstr = func;
        api_functions = data;
    });

program.parse(process.argv);

if (typeof funcstr === 'undefined') {
    console.error('no command given!');
    process.exit(1);
}


var module = require('./src/Plugins/'+ moduleName )

module[funcstr]();
