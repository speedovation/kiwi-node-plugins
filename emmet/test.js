var api = require('./../api');

a = api();

function cal()
{
	console.log("ff" + a.response);
}

a.request("hello",[],cal);


