var api = require('./../api');
var escapeJSON = require('escape-json-node');

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
	api.request('text',[], function(err, errors, res){
    
        if(err)
        {
            this.error = errors;
            console.log('Err:' + errors); 
			return;
        }
        
        //console.log("Result: " + res );
		
		//"<html><head><meta charset='UTF-8' /><title>Document</title></head><body></body></html>"
		var res = beautify_html(res);
		
		res = escapeJSON('"'+res+'"');
		
		console.log(res);
		
		
		var JSONString = 'Acceptance says, "True,"" this is ' +
'my situation at the moment. I\'ll look unblinkingly at the reality of it. ' +
'But I will also open my hands to accept willingly whatever a loving ' +
'Father sends me.""}';
 
JSONString = escapeJSON(JSONString);
 
console.log(JSONString);
		
		return;
    
    		return return_result('replace_selected_text',[res]);
        
    });
	
	
	
	
	//api_functions.selected_text
	
	

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
