var api = require('./../api');
var jsesc = require('jsesc');

api = api();



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



x[funcstr]();
