/* jshint node: true,globals: true */
var jshint = require("jshint");
var underscore = require("underscore");

var lint = {}; // better would be to have module create an object
module.exports = lint;


lint.lint_js = function() {

    //TODO:  Test selected_text  	//api_functions.selected_text

    //if selected_text not found call a json rpc and get full text and
    api.request('text', [], function(err, errors, res) {



        if (err) {
            this.error = errors;
            console.log('Err:' + errors);
            return;
        }



        var options = {
            undef: true ,
            globals: true
            //,"node": true
        };
        var predef = {
            api: false,
            logger : false,
            jsesc : false
        };

        //JSHINT(res, options, predef);

        var report = jshint.JSHINT(res, options, predef);

        var yerrors = jshint.JSHINT.data().errors;
        var modifiedErrors = {};
        if( !underscore.isEmpty(yerrors) )
        {
        
        
          yerrors.forEach(function(err) {
            logger.debug(err.line, err.message, err.reason);
            modifiedErrors[err.line - 1 ] = err.message +" "+ err.reason;
            //console.log(err);
          });
        
        }


        //console.log(jshint.JSHINT.data());
        
        modifiedErrors = JSON.stringify(modifiedErrors);

        //m = '{"2" : "some error msg"}';
        //modifiedErrors = jsesc(modifiedErrors, {
        //    'quotes': 'double'
        //});
        
        
        
        //logger.debug(api.return_result('set_markers', [m]));

        
        return api.return_result('set_markers', [modifiedErrors]);

    });


};


var cssLint = require('csslint').CSSLint;

lint.lint_css = function() {

    //TODO:  Test selected_text  	//api_functions.selected_text

    //if selected_text not found call a json rpc and get full text and
    api.request('text', [], function(err, errors, res) {



        if (err) {
            this.error = errors;
            console.log('Err:' + errors);
            return;
        }



        var result = cssLint.verify(res);
        
        
        var modifiedErrors = {};
        
        
        if (result.messages.length === 0) {
            //Success
        } else {
            //Errors or warnings
            
            var i = 0;
            for (i=0; i<result.messages.length; i++) 
            {
                var message = result.messages[i];
                logger.debug("%s (line %d, col %d): %s", message.type, message.line, message.col, message.message);
                
                modifiedErrors[message.line - 1 ] =  message.type.toUpperCase() +" : "+ message.message  ;
            }
        }

        //console.log(jshint.JSHINT.data());
        
        modifiedErrors = JSON.stringify(modifiedErrors);

        //m = '{"2" : "some error msg"}';
        //modifiedErrors = jsesc(modifiedErrors, {
        //    'quotes': 'double'
        //});
        
        
        //logger.debug(api.return_result('set_markers', [m]));

        
        return api.return_result('set_markers', [modifiedErrors]);

    });


};


var jsonlint = require("jsonlint");
//var util = require('util');

lint.lint_json = function() {

    //TODO:  Test selected_text  	//api_functions.selected_text

    //if selected_text not found call a json rpc and get full text and
    api.request('text', [], function(err, errors, res) {



        if (err) {
            this.error = errors;
            console.log('Err:' + errors);
            return;
        }
		
		var modifiedErrors = {};

		try{
		
        		jsonlint.parse(res);
		
		}
		catch(err) {
   			//console.log(err.message, err.name);
			
			 //'Parse error on line 1:\n/* jshint node: true\n^\nExpecting \'STRING\', \'NUMBER\', \'NULL\', \'TRUE\', \'FALSE\', \'{\', \'[\', got \'undefined\'' }

			var line = err.message.match(/(line\s*[0-9]+)/g)[0].split(" ")[1];
			
			modifiedErrors[line - 1 ] =  err.message.replace(/(\r\n|\n|\r)/gm,"");

			//console.log(util.inspect(response, true, null));
		}
        
        
        
        //modifiedErrors = JSON.stringify(modifiedErrors);

        //m = '{"2" : "some error msg"}';
        modifiedErrors = jsesc(modifiedErrors, {
            'quotes': 'double',
            'compact': true
        });
        
        
        //logger.debug(modifiedErrors);

        
        return api.return_result('set_markers', [modifiedErrors]);

    });


};
