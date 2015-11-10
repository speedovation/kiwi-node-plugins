var api = require('./../api');

a = api();

function cal(res)
{
	console.log("ff" + res + "||" + a.response);
}

a.request("hello",[],cal);

a.request("selectedText",[],cal);

