// create a map
const map = L.map('my-map').setView([
  30.268606149999997, 
  -97.74320738193495], 13);
   
// Retina displays require different mat tiles quality
const isRetina = L.Browser.retina;

const baseUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey={apiKey}";
const retinaUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey={apiKey}";

// Add map tiles layer. Set 20 as the maximal zoom and provide map data attribution.
L.tileLayer(isRetina ? retinaUrl : baseUrl, {
    attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a>',
    apiKey: '78a2da46af4b455abc0c8999786a21aa',
    maxZoom: 20,
    id: 'osm-bright',
}).addTo(map);

function onMapClick(e) {
  // user clicked on a map
  fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&apiKey=78a2da46af4b455abc0c8999786a21aa`)
  .then(response => response.json())
  .then(result => {
    if (result.features.length) {
      const address = result.features[0].properties.formatted;
      L.popup().setLatLng(e.latlng).setContent(address).openOn(map);
      
    } else {
      L.popup().setLatLng(e.latlng).setContent("No address found").openOn(map);
      
    }
  });
  console.log(e.latlng)
}

map.on('click', onMapClick);