var api = require('./../api');
api = api();

var beautify_js = require('js-beautify'); 
var beautify_css = require('js-beautify').css;
var beautify_html = require('js-beautify').html;
//res = jsbeautifier.beautify('your javascript string')
//res = jsbeautifier.beautify_file('some_file.js')
//...or, to specify some options:

//opts = jsbeautifier.default_options()
//opts.indent_size = 2
//res = jsbeautifier.beautify('some javascript', opts)



var funcstr = process.argv[2];
var jsonstr = process.argv[3]

//console.log(funcstr + "|" + jsonstr);

var api_functions = JSON.parse([jsonstr]);

var x = { }; // better would be to have module create an object

function return_result(method,params)
{
	console.log('{ "method" : "' + method + '", "params" : ["'+ params +'"]}')
}


x.format_html = function() { 

    //check if selected_text found
	// if not call a json rpc and get full text and
	// set it using
	
	//api_functions.selected_text
	
	var res = beautify_html("<html><head><meta charset='UTF-8' /><title>Document</title></head><body></body></html>");
    
    return return_result('replace_selected_text',[res]);

}

x.format_js = function() { 

    var res = beautify_js("<html><head><meta charset='UTF-8' /><title>Document</title></head><body></body></html>");
    
    return return_result('replace_selected_text',[res]);

}

x.format_json = function() { 

    var exec = require('child_process').exec;
    var cmd = 'node underscore pretty --in '+ api_functions.file_path;
	console.log("Cmd: " + cmd);
    
    exec(cmd, function(error, stdout, stderr) {
      // command output is in stdout
		console.log("Out:" + stdout);
    });

}


x[funcstr]();
