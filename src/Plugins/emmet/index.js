/* jshint node: true,globals: true */
var plugin = require('./plugin');
var expand = require('./expand');
expand = expand();


var vemmet = {}; // better would be to have module create an object
module.exports = vemmet;


vemmet.expand_tab = function() {

    logger.debug("Expand tab: " + api_functions.selected_text);
    logger.debug(JSON.stringify(api_functions, null, 4));


    var v = expand.expand(api_functions.selected_text, {});
    v = jsesc(v, {
        'quotes': 'double'
    });

    return api.return_result('replace_selected_text', api.to_string(v)   );

};


var parser = require('emmet/lib/parser/abbreviation');
var action = require('emmet/lib/action/wrapWithAbbreviation');
var utils = require('emmet/lib/utils/common');

vemmet.expand_wrap = function() {


    var input = api_functions.input_dialog;
    var selected_text = api_functions.selected_text;

    logger.debug("expand_wrap: " + api_functions.selected_text);
    input = utils.escapeText(input);

    var v = parser.expand(input, {
        pastedContent: selected_text,
        syntax: 'html',
        profile: 'plain'
    });


    v = jsesc(v, {
        'quotes': 'double'
    });
    //v = v.replace(/"/g, "'");

    return api.return_result('replace_selected_text', api.to_string(v));

    // console.log("Result: " + res + " | " + v);



};


//x[funcValue]();

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
    
    // print process.argv
//process.argv.forEach(function (val, index, array) {
  //console.log(index + ': ' + val);
//});


//console.log("function: " + funcstr);

//var v = expand.expand('ul+',{});
//console.log( "V: " + v );  div.class


//jsonstr = jsonstr.replace(/\\/g, "");

//logger.info("JSON: " + jsonstr );

/ *var funcstr = process.argv[2];
var jsonstr = process.argv[3];
var api_functions = JSON.parse([jsonstr]);
logger.debug( api_functions.selected_text )
*/
