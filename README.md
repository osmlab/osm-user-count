# osm-user-count

Counts edits per user from QA Tiles

# Usage

* Download and gunzip [OSMQATiles country extract](http://osmlab.github.io/osm-qa-tiles/country.html
* Change mbtiles path (todo, make args) and bbox 
* `node index.js > data/mexico_users.js`
* `node user_details_filtered.js data/mexico_users.js > data/mexico_users_filtered.csv`

# Limitations

* Only captures edits to latest version of features
