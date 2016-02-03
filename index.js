var tilereduce = require('tile-reduce'),
  path = require('path'),
  argv = require('minimist')(process.argv.slice(2));

var opts = {
  zoom: 12,
  sources: [
    {
      name: 'osm',
      mbtiles: path.join(__dirname, 'data/mexico.mbtiles'),
      raw: true
    }
  ],
  map: __dirname+'/map.js'
};

if (argv.area) opts.bbox = JSON.parse(argv.area);
opts.bbox = [
          -117.252,
          14.339,
          -86.638,
          32.725
        ];
var counts = {};

function mapResults(result, saveTo) {
  Object.keys(result).forEach( function(u) {
    counts[u] = (counts[u] ? counts[u] : 0) + result[u];
  });
}

var tilereduce = tilereduce(opts)
.on('reduce', function(result, tile){
  mapResults(result, counts)
})
.on('end', function(error){
  console.log(JSON.stringify(counts));
});