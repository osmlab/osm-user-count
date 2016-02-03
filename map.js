var mexico = require('./data/mexico.json');
var inside = require('turf-inside');

module.exports = function (tileLayers, tile, write, done) {

  var users = {};

  for (var i = 0; i < tileLayers.osm.osm.length; i++) {
    var ft = tileLayers.osm.osm.feature(i);

    var geom = ft.toGeoJSON(tile[0], tile[1], tile[2]);
    var pt = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point"
      }
    }

    if (geom.type == "Point") {
      pt.geometry.coordinates = geom.geometry.coordinates;
    } else {
      pt.geometry.coordinates = geom.geometry.coordinates[0];
    }

    if (inside(pt, mexico)) {
      users[ ft.properties._user ] = (users[ ft.properties._user] ? users[ ft.properties._user ] : 0 ) + 1;
    }
  }

  done(null, users);
};