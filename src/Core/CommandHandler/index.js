//Sample only
//var learn = require('./src/Plugins/learn');
//learn.requestFlush(); 




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

    .arguments('<module> <func> <data>')
    .action(function(module,func, data) {
        moduleName = module;
        funcstr = func;
        api_functions = JSON.parse(data);
    });

program.parse(process.argv);

if (typeof funcstr === 'undefined') {
    console.error('no command given!');
    process.exit(1);
}
