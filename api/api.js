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

    var apiClass = {
        
        response : result,
        error : error ,
        
        request: function(method,params,callback){
            
            client.request(method,params, function(err, errors, response){
                if(err)
                {
                    error = errors; 
                }
                console.log(response);
                result = response;
                
                callback();
            })
        }
            
        
    }
    
    return apiClass;

}
