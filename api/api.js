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
}); */


var jayson = require('jayson');

// create a client
var client = jayson.client.http({
  port: 9040,
  hostname: '127.0.0.1'
});

// invoke "add"
client.request('hello', [1, 1], function(err, error, response) {
  if(err) throw err;
  console.log(response); // 2!
});

