/*var net = require('net');
 
var client = new net.Socket();

client.connect(9040, '127.0.0.1', function() {
    console.log('Connected');
    client.write('Hello, server! Love, Client.');
});
 
client.on('data', function(data) {
    console.log('Received: ' + data);
    client.destroy(); // kill client after server's response
});
	 
client.on('close', function() {
    console.log('Connection closed');
}); 
*/

var jayson = require('jayson');

// create a client
var client = jayson.client.tcp({
  port: 9040,
  hostname: '127.0.0.1',
  headers: {}
});

// invoke "add"
client.request('hello', [], function(err, error, response) {
  if(err){ 
      console.log(error);
      throw err;
  }
  console.log(response); // 2!
});



/*var rpc = require('node-json-rpc');
 
var options = {
  // int port of rpc server, default 5080 for http or 5433 for https 
  port: 9040,
  // string domain name or ip of rpc server, default '127.0.0.1' 
  host: '127.0.0.1',
  // string with default path, default '/' 
  path: '/',
  // boolean false to turn rpc checks off, default true 
  strict: true
};
 
// Create a server object with options 
var client = new rpc.Client(options);
 
client.call(
  {"jsonrpc": "2.0", "method": "hello", "params": [], "id": 0},
  function (err, res) {
    // Did it all work ? 
    if (err) { console.log(err); }
    else { console.log(res); }
  }
);*/



/*
var jsonrpc = require('multitransport-jsonrpc'); // Get the multitransport JSON-RPC suite

var Server = jsonrpc.server; // The server constructor function
var Client = jsonrpc.client; // The client constructor function

var ServerHttp = jsonrpc.transports.server.http; // The server HTTP transport constructor function
var ServerTcp = jsonrpc.transports.server.tcp; // The server TCP transport constructor function
var ServerMiddleware = jsonrpc.transports.server.middleware; // The server Middleware transport constructor function (for Express/Connect)
var Loopback = jsonrpc.transports.shared.loopback; // The Loopback transport for mocking clients/servers in tests

var ClientHttp = jsonrpc.transports.client.http;
var ClientTcp = jsonrpc.transports.client.tcp;*/

/* Setting up servers
var jsonRpcHttpServer = new Server(new ServerHttp(8000), {
    loopback: function(obj, callback) { callback(undefined, obj); }
});

var jsonRpcTcpServer = new Server(new ServerTcp(8001), {
    loopback: function(obj, callback) { callback(undefined, obj); }
});*/

/*var express = require('express');
var app = express();
app.use(express.bodyParser());
var jsonRpcMiddlewareServer = new Server(new ServerMiddleware(), {
    loopback: function(obj, callback) { callback(undefined, obj); }
});
app.use('/rpc', jsonRpcMiddlewareServer.transport.middleware);
app.listen(8002);

var loopback = new Loopback();
var jsonRpcLoopbackServer = new Server(loopback, {
    loopback: function(obj, callback) { callback(undefined, obj); }
});

// Setting up and using the clients

// Either explicitly register the remote methods
var jsonRcpHttpClient = new Client(new ClientHttp('localhost', 8000));
jsonRpcHttpClient.register('loopback');
jsonRpcHttpClient.loopback('foo', function(err, val) {
    console.log(val); // Prints 'foo'
});*/

// Or wait for the "auto-register" functionality do that for you
/*new Client(new ClientTcp('127.0.0.1', 9040), {}, function(jsonRpcTcpClient) {
    jsonRpcTcpClient.hello('', function(err, val) {
        console.log(val); // Prints 'foo'
    });
});*/

/*var jsonRpcExpressClient = new Client(new ClientHttp('localhost', 8002, { path: '/rpc' }));
jsonRpcExpressClient.register('loopback');
jsonRpcExpressClient.loopback('foo', function(err, val) {
    console.log(val); // Prints 'foo'
});

new Client(loopback, {}, function(jsonRpcLoopbackClient) {
    jsonRpcLoopbackClient.loopback('foo', function(err, val) {
        console.log(val); // Prints 'foo'
    });
});
*/
