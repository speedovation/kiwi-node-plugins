var api = require('./../api');
api = api();
var plugin = require('./plugin');
var expand = require('./expand');
expand = expand()

var x = { }; // better would be to have module create an object


// print process.argv
//process.argv.forEach(function (val, index, array) {
  //console.log(index + ': ' + val);
//});

var funcstr = process.argv[2];

//console.log("function: " + funcstr);

//var v = expand.expand('ul+',{});
//console.log( "V: " + v );  div.class

var jsonstr = process.argv[3]

//console.log("JSON: " + jsonstr );

var api_functions = JSON.parse([jsonstr]);

//console.log( api_functions.selected_text )

function return_result(method,params)
{
	console.log('{ "method" : "' + method + '", "params" : ["'+ params +'"]}')
}


x.expand_tab = function() { 

	var v = expand.expand(api_functions.selected_text, {});
	v = v.replace(/"/g, "'");
	return return_result('replace_selected_text',[v]);

}


var parser = require('emmet/lib/parser/abbreviation');
var action = require('emmet/lib/action/wrapWithAbbreviation');
var utils  = require('emmet/lib/utils/common');

x.expand_wrap = function() { 
    
    
    var input = api_functions.input_dialog;
    var selected_text = api_functions.selected_text;
      
	
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

x[funcstr]();

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
