/* jshint node: true,globals: true */
var JSFtp = require("jsftp");

var jftp = new JSFtp({
  host: "ftp.techus24x7.com",
  port: 21, // defaults to 21
  user: "mayon_test@techus24x7.com", // defaults to "anonymous"
  pass: "Yash121#" // defaults to "@anonymous"
});

var ftp = {}; // better would be to have module create an object
module.exports = ftp;


ftp.test = function() {
  

api.request('set_values',
  //outer one required for any/all request 
  [ 
    //this where we are creating list object to send function
    [ 
      //Normal set_value call wrapped in list
      //First = module name
      //Second = Element(GUI) name
      //Third = value
      // Value may be string or complex like list,object etc
      ['ftp','listServerFiles', ['Archana VALUES crazy','Mayon'] ],
      ['ftp','username', 'Archana is VALUES0' ]
    ]
  ], 
    
    function(err, errors, res){
    console.log(res);
    
    });
    
 
    api.request('get_values',['ftp',['hostname','username'] ], function(err, errors, res){
    
        if(err)
        {
            this.error = errors;
            console.log('Err:' + errors); 
        }
        
        
    
        console.log("Result: " + res + typeof(res) );
        console.log(JSON.stringify(res) ) ;
        var t = JSON.parse(res) ;
        console.log(t.hostname + " | " + t.username);
       
        

    });
   
    api.request('set_value',['ftp','username', 'Archana is crazy' ], function(err, errors, res){
    
        if(err)
        {
            this.error = errors;
            console.log('Err:' + errors); 
        }
        
        
    
        console.log("Result: " + res + typeof(res) );
        //console.log(JSON.stringify(res) ) ;
        //var t = JSON.parse(res) ;
        //console.log(t.hostname + " | " + t.username);
       
        

    });
    
    
      api.request('set_value',['ftp','listServerFiles', ['Archana is crazy','Mayon'] ], function(err, errors, res){
    
        if(err)
        {
            this.error = errors;
            console.log('Err:' + errors); 
        }
        
        
    
        console.log("Result: " + res + typeof(res) );
        //console.log(JSON.stringify(res) ) ;
        //var t = JSON.parse(res) ;
        //console.log(t.hostname + " | " + t.username);
       
        

    });
    
    
    


  jftp.put('/var/www/html/index.html', 'index.html', function(hadError) {
    if (!hadError)
     console.log("Uploading done");
  });
  
  //_this = this;
  
  jftp.ls(".", function(err, res) {
    res.forEach(function(file) {
      console.log(file);
    });
    
    ftp.quit();
    
  });

 };  
 
  ftp.quit = function()  {  
    
    jftp.raw.quit(function(err, data) {
      if (err) return console.error(err);
  
      console.log("Bye!");
  });

};
  /*
  ftp.list(remoteCWD, function(err, res) {
    console.log(res);
    // Prints something like
    // -rw-r--r--   1 sergi    staff           4 Jun 03 09:32 testfile1.txt
    // -rw-r--r--   1 sergi    staff           4 Jun 03 09:31 testfile2.txt
    // -rw-r--r--   1 sergi    staff           0 May 29 13:05 testfile3.txt
    // ...
  });
  */


