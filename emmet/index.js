var api = require('./../api');
api = api();
var plugin = require('./plugin');
var expand = require('./expand');
expand = expand()
var jsesc = require('jsesc');

var winston = require('winston');
winston.emitErrs = true;

var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'debug',
            filename: './all-logs.log',
            handleExceptions: true,
            json: false,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'info',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};


var x = { }; // better would be to have module create an object


// print process.argv
//process.argv.forEach(function (val, index, array) {
  //console.log(index + ': ' + val);
//});


//console.log("function: " + funcstr);

//var v = expand.expand('ul+',{});
//console.log( "V: " + v );  div.class


//jsonstr = jsonstr.replace(/\\/g, "");

//logger.info("JSON: " + jsonstr );

/*var funcstr = process.argv[2];
var jsonstr = process.argv[3];
var api_functions = JSON.parse([jsonstr]);
logger.debug( api_functions.selected_text )
*/

var program = require('commander');

program
  .version('0.0.1')
  .arguments('<func> [data]')
  .action(function (func, data) {
     funcValue = func;
     dataValue = JSON.parse(data);
  });

program.parse(process.argv);

if (typeof funcValue === 'undefined') {
   console.error('no command given!');
   process.exit(1);
}

//console.log('function:', funcValue);
//console.log('data:', dataValue);
//console.log('data file path:', dataValue.file_path);




function return_result(method,params)
{
	console.log('{ "method" : "' + method + '", "params" : ["'+ params +'"]}')
}


x.expand_tab = function() { 

    logger.debug("Expand tab: "+dataValue.file_path )
    //console.info("Expand tab: "+api_functions.file_path )
    
	var v = expand.expand(dataValue.selected_text, {});
	v = v.replace(/"/g, "'");
	return return_result('replace_selected_text',[v]);

}


var parser = require('emmet/lib/parser/abbreviation');
var action = require('emmet/lib/action/wrapWithAbbreviation');
var utils  = require('emmet/lib/utils/common');

x.expand_wrap = function() { 
    
    
    var input = dataValue.input_dialog;
    var selected_text = dataValue.selected_text;
      
	logger.debug("expand_wrap: " + dataValue.selected_text );
	input = utils.escapeText(input);
	
	var v = parser.expand(input, {
			pastedContent: selected_text, 
			syntax: 'html', 
			profile: 'plain'
		});
        
        
	
	v = v.replace(/"/g, "'");
		
	return return_result('replace_selected_text',[v]);

   // console.log("Result: " + res + " | " + v);
            
           

}

// div#id.class.another

//x.expandWrap();

x[funcValue]();

/* old style and still supported
 * 
 *  api.request('selected_text',[], function(err, errors, res){
    
        if(err)
        {
            this.error = errors;
            console.log('Err:' + errors); 
        }
        
        var v = expand.expand(res, {});
    
        console.log("Result: " + res + " | " + v);
        
        api.request('replace_selected_text',[v], function(err, errors, res){
       
            console.log('Replaced Done');
        
        });
        

    });

 api.request('get_input_text',[], function(err, errors, res){
     
        console.log("Result: " + res );
        
        content = res;    
    

        api.request('selected_text',[], function(err, errors, abbr){
        
            if(err)
            {
                this.error = errors;
                console.log('Err:' + errors); 
            }
            
            var v = expand.expand(res, {});
            
            content = utils.escapeText(content);
    	        var v = parser.expand(abbr, {
    	            pastedContent: content, 
    	            syntax: 'html', 
    	            profile: 'plain'
    	        });
        
            console.log("Result: " + res + " | " + v);
            
            api.request('replace_selected_text',[v], function(err, errors, res){
           
                console.log('Replaced Done');
            
            });
            
    
        });
    
    })
    * 
    */
