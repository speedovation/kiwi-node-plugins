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



/*var funcstr = process.argv[2];
var jsonstr = process.argv[3]
var api_functions = JSON.parse([jsonstr]);
*/


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

//console.log(api_functions.file_path)

var x = {}; // better would be to have module create an object

function return_result(method, params) {
    console.log('{ "method" : "' + method + '", "params" : ["' + params + '"]}')
}


x.format_html = function() {

    //TODO:  Test selected_text  	//api_functions.selected_text

    //if selected_text not found call a json rpc and get full text and
    api.request('text', [], function(err, errors, res) {

        if (err) {
            this.error = errors;
            console.log('Err:' + errors);
            return;
        }

        //console.log("Result: " + res );
        //"<html><head><meta charset='UTF-8' /><title>Document</title></head><body></body></html>"
        var res = beautify_html(res);


        res = jsesc(res, {
            'quotes': 'double'
        });

        //My hack which no longer required as jsesc doing this.
        //res = res.replace(/"/g, "\\\"");

        // jsesc convers below. Do research more. Look these also
        /*	\/\b   \f    \n    \r   \t    \u */


        return return_result('set_text', [res]);

    });


}

x.format_js = function() {


    api.request('text', [], function(err, errors, res) {

        if (err) {
            this.error = errors;
            console.log('Err:' + errors);
            return;
        }

        var res = beautify_js(res);
        res = jsesc(res, {
            'quotes': 'double'
        });

        return return_result('set_text', [res]);

    });

}

x.format_css = function() {


    api.request('text', [], function(err, errors, res) {

        if (err) {
            this.error = errors;
            console.log('Err:' + errors);
            return;
        }

        var res = beautify_css(res);
        res = jsesc(res, {
            'quotes': 'double'
        });

        return return_result('set_text', [res]);

    });

}

x.format_json = function() {

    api.request('text', [], function(err, errors, res) {

        if (err) {
            this.error = errors;
            console.log('Err:' + errors);
            return;
        }

        res = JSON.stringify(JSON.parse(res), null, 4);
        res = jsesc(res, {
            'quotes': 'double'
        });

        return return_result('set_text', [res]);

    });


    /*var exec = require('child_process').exec;
    var cmd = 'node underscore pretty --in '+ api_functions.file_path;
	console.log("Cmd: " + cmd);
    
    exec(cmd, function(error, stdout, stderr) {
      // command output is in stdout
		console.log("Out:" + stdout);
    });*/

}


x[funcstr]();
