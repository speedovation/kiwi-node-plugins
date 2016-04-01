var api = require('./../api');
api = api();

var fs = require('fs');
var UglifyJS = require("uglifyjs");



var funcstr = process.argv[2];
var jsonstr = process.argv[3]

//console.log(funcstr + "|" + jsonstr);

var api_functions = JSON.parse([jsonstr]);

var x = { }; // better would be to have module create an object

function return_result(method,params)
{
	console.log('{ "method" : "' + method + '", "params" : ["'+ params +'"]}')
}



x.parse_js = function() { 

	var text = fs.readFileSync(api_functions.file_path,'utf8')
	//console.log (text)

    var parsed = UglifyJS.parse(text);
	parsed.compute_char_frequency();
	parsed.figure_out_scope();
	
	console.log(parsed.mangle_names())
	
	parsed.globals.each(function(g) {console.log(g.name)});
    
    //return return_result('replace_selected_text',[res]);

}




x[funcstr]();
