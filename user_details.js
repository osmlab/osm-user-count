var async = require('queue-async');
var fs = require('fs');
var request = require('request');

/*
  Process a single object
*/
var checkObject = function(data, callback) {
  request('http://hdyc.neis-one.org/user/' + data[0], function (error, response, body) {
    var result;
    if (!error && response.statusCode == 200) {
      var json = JSON.parse(body);
      if (json.contributor && json.contributor.since) {
        var date_string = json.contributor.since.replace('st,',',').replace('nd,',',').replace('rd,',',').replace('th,',',');
        var date = new Date(Date.parse(date_string));
        console.log(data[0] + "," + data[1] + "," + date.toISOString());
      } else {
        console.log(data[0] + "," + data[1] + ",");
      }
    }
    callback(null,null);
  });
};


/*
  Processes an array of objects
*/

var checkArray = function(data, callback) {
  var q = async(5); //FIXME: make queue size configurable?
  Object.keys(data).forEach(function(k) {
    q.defer(checkObject, [k, data[k]]);
  });
  q.awaitAll(function(err, results) {
    callback(err, results);
  });
};


/*
  Processes a file containing an array of objects
*/
var checkFile = function(filePath, callback) {
  var contents = fs.readFileSync(filePath);
  var jsonContent = JSON.parse(contents);
  checkArray(jsonContent, function(err, results) {
    if (callback) callback(err, results);
  });
};

//if script is called from the command line with a filename argument, check that file.
if (process.argv.length > 2) {
  var filename = process.argv[2];
  checkFile(filename, function(err, results) {
    if (err) throw(err);
  });
}