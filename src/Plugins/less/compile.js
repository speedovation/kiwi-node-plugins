var less = require( 'less' );
var fs = require( 'fs' );
var path = require('path');
 
// Load the file, convert to string
fs.readFile( '../less/gaf.less', function ( error, data ) {
  var dataString = data.toString();
  var options = {
    paths         : ["../less"],      // .less file search paths
    outputDir     : "../css",   // output directory, note the '/'
    optimization  : 1,                // optimization level, higher is better but more volatile - 1 is a good value
    filename      : "gaf.less",       // root .less file
    compress      : true,             // compress?
    yuicompress   : true              // use YUI compressor?
  };
 
 
  // Create a file name such that
  //  if options.filename == gaf.js and options.compress = true
  //    outputfile = gaf.min.css
  options.outputfile = options.filename.split(".less")[0] + (options.compress ? ".min" : "") + ".css";
  // Resolves the relative output.dir to an absolute one and ensure the directory exist
  options.outputDir = path.resolve( process.cwd(), options.outputDir) + "/";
  ensureDirectory( options.outputDir );
 
  // Create a parser with options, filename is passed even though its loaded
  // to allow less to give us better errors
  var parser = new less.Parser(options);
  parser.parse( dataString, function ( error, cssTree ) {
      if ( error ) {
        less.writeError( error, options );
        return;
      }
 
    // Create the CSS from the cssTree
    var cssString = cssTree.toCSS( {
      compress   : options.compress,
      yuicompress: options.yuicompress
    } );
 
    // Write output
    fs.writeFileSync( options.outputDir + options.outputfile, cssString, 'utf8' );
    console.log("Converted Less: '" + options.filename + "', to CSS: " + options.outputDir + options.outputfile);
  });
});
 
//
var ensureDirectory = function (filepath) {
  var dir = path.dirname(filepath);
  var existsSync = fs.existsSync || path.existsSync;
  if (!existsSync(dir)) { fs.mkdirSync(dir); }
};
