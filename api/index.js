var jsesc = require('jsesc');

module.exports = function (info) {

    var jayson = require('jayson');
    
    // create a client
    var client = jayson.client.tcp({
      port: 9040,
      hostname: '127.0.0.1',
      headers: {}
    });
    
    var result;
    var error;
    
    // invoke "add"
/*    client.request('hello', [], function(err, error, response) {
      if(err){ 
          console.log(error);
          throw err;
      }
      console.log(response); // 2!
      result = response; 
    });*/

    var apiClass = function() {
        
        this.response = '';
        this.error = '';
        
        this.request = function(method,params,callback){
            
            client.request(method,params, function(err, errors, res){
                if(err)
                {
                    this.error = errors; 
                }
                //console.log(res);
                
                res = jsesc(res, {  'json': true  } );
                
                this.response = res;
                
                callback(this.response);
            })
        }
            
        
    }
    return client;
    return new apiClass();

}
