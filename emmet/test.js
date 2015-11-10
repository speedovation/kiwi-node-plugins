var api = require('./../api');

var plugin = require('./plugin');
var expand = require('./expand');

var client = api();

function cal(res)
{
	console.log("ff" + res + "||" + a.response);
}

//plugin = plugin()

//plugin.yash();


expand = expand()
var v = expand.expand('ul+',{});

console.log( "V: " + v );
//a.request("hello",[],cal);

//a.request("selectedText",[],cal);

client.request('hello',[], function(err, errors, res){
    
    if(err)
    {
        this.error = errors; 
    }

    console.log("Result: " + res);







})

