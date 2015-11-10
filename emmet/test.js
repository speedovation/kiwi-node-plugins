var api = require('./../api');

var plugin = require('./plugin');

var expand = require('./expand');
expand = expand()

var client = api();

function cal(res)
{
	console.log("ff" + res + "||" + a.response);
}


var v = expand.expand('ul+',{});

console.log( "V: " + v );
//a.request("hello",[],cal);  div.class

//a.request("selectedText",[],cal);

client.request('selectedText',[], function(err, errors, res){
    
    if(err)
    {
        this.error = errors;
        console.log('Err:' + errors); 
    }
    
    var v = expand.expand(res, {});

    console.log("Result: " + res + " | " + v);



})

