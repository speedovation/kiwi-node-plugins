//All variables defined here are global and can be accessed from Plugins source files
api = require('./src/Core/Api');
jsesc = require('jsesc');
logger = require('./src/Core/Logger');
api = api();

//Store Function Name
funcstr = '';
//Available function data
api_functions= {};
//Module Name
moduleName = '';

//Read Commands from arguments
require('./src/Core/CommandHandler');

//Load module
var module = require('./src/Plugins/'+ moduleName )

//Run function of above module
module[funcstr]();

