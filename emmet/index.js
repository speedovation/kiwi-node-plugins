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

console.log("function: " + funcstr);

//var v = expand.expand('ul+',{});
//console.log( "V: " + v );  div.class



x.expandTab = function() { 

    api.request('selectedText',[], function(err, errors, res){
    
        if(err)
        {
            this.error = errors;
            console.log('Err:' + errors); 
        }
        
        var v = expand.expand(res, {});
    
        console.log("Result: " + res + " | " + v);
        
        api.request('replaceSelectedText',[v], function(err, errors, res){
       
            console.log('Replaced Done');
        
        });
        

    });

}


var parser = require('emmet/lib/parser/abbreviation');
var action = require('emmet/lib/action/wrapWithAbbreviation');
var utils  = require('emmet/lib/utils/common');

x.expandWrap = function() { 
    var content;

    api.request('getInputText',[], function(err, errors, res){
     
        console.log("Result: " + res );
        
        content = res;    
    

        api.request('selectedText',[], function(err, errors, abbr){
        
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
            
            api.request('replaceSelectedText',[v], function(err, errors, res){
           
                console.log('Replaced Done');
            
            });
            
    
        });
    
    })

}

// div#id.class.another

//x.expandWrap();

x[funcstr]();
