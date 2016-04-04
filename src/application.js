/* jshint node: true,globals: true */
//All variables defined here are global and can be accessed from Plugins source files
api = require('./Core/Api');
jsesc = require('jsesc');
logger = require('./Core/Logger');
api = api();

//Store Function Name
funcstr = '';
//Available function data
api_functions= {};
//Module Name
moduleName = '';

//Read Commands from arguments
require('./Core/CommandHandler');

//Load module
var module = require('./Plugins/'+ moduleName );

//Run function of above module
module[funcstr]();

