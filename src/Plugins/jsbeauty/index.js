/* jshint node: true,globals: true */

var beautify_js = require('js-beautify');
var beautify_css = require('js-beautify').css;
var beautify_html = require('js-beautify').html;

//opts = jsbeautifier.default_options()
//opts.indent_size = 2
//res = jsbeautifier.beautify('some javascript', opts)



/*var funcstr = process.argv[2];
var jsonstr = process.argv[3]
var api_functions = JSON.parse([jsonstr]);
*/


var jsbeauty = {}; // better would be to have module create an object
module.exports = jsbeauty;

jsbeauty.format_html = function() {

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
        res = beautify_html(res);


        res = jsesc(res, {
            'quotes': 'double'
        });

        //My hack which no longer required as jsesc doing this.
        //res = res.replace(/"/g, "\\\"");

        // jsesc convers below. Do research more. Look these also
        /*	\/\b   \f    \n    \r   \t    \u */


        return api.return_result('set_text', api.to_string(res));

    });


};

jsbeauty.format_js = function() {


    api.request('text', [], function(err, errors, res) {

        if (err) {
            this.error = errors;
            console.log('Err:' + errors);
            return;
        }

        res = beautify_js(res);
        res = jsesc(res, {
            'quotes': 'double'
        });

        return api.return_result('set_text', api.to_string(res));

    });

};

jsbeauty.format_css = function() {


    api.request('text', [], function(err, errors, res) {

        if (err) {
            this.error = errors;
            console.log('Err:' + errors);
            return;
        }

        res = beautify_css(res);
        res = jsesc(res, {
            'quotes': 'double'
        });

        return api.return_result('set_text', api.to_string(res));

    });

};

jsbeauty.format_json = function() {

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

        return api.return_result('set_text', api.to_string(res));

    });


    /*var exec = require('child_process').exec;
    var cmd = 'node underscore pretty --in '+ api_functions.file_path;
	console.log("Cmd: " + cmd);
    
    exec(cmd, function(error, stdout, stderr) {
      // command output is in stdout
		console.log("Out:" + stdout);
    });*/

};
