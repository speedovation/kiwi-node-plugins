var api = require('./../api');
var jsesc = require('jsesc');

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

//jsonstr = JSON.stringify(jsonstr);

//console.log(funcstr + "|" + jsonstr);

var api_functions = JSON.parse([jsonstr]);
//return;


//console.log(api_functions.file_path)

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
		
		
		//console.log(res);
		
		//console.log("------------");
		
		//res = escapeJSON(res);
		
		res = res.replace(/"/g, "\\\"");
		// Cover these also
/*		\/
\b
\f
\n
\r
\t
\u*/ 
		
		
		//res = jsesc(res, {  'json': true  } );
		
		//console.log(res);
		
		
 

		
    
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
