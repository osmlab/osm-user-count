module.exports = function (tileLayers, tile, write, done) {

  var users = {};

  for (var i = 0; i < tileLayers.osm.osm.length; i++) {
    var ft = tileLayers.osm.osm.feature(i);

    users[ ft.properties._user ] = (users[ ft.properties._user] ? users[ ft.properties._user ] : 0 ) + 1;
  }

  done(null, users);
};