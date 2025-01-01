let maploc = "./Data/Geojson/ConDistricts";
let year = "2016";
let distmap = maploc + year + ".geojson"

let myMap = L.map("elecmap", {
  center: [
    37.09, -95.71
  ],
  zoom: 5
});

function colordist(response){
// color each district based on amount of votes each cantidate got.
return {color:"#ff0000",
  weight:3,
  fillOpacity: 0.6
}
}
function onEachFeature(feature,layer){
  layer.bindPopup(feature.properties.NAMELSAD)
  layer.on({
    // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
    mouseover: function(event) {
      layer = event.target;
      layer.setStyle({
        fillOpacity: 0.9
      });
    },
    // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
    mouseout: function(event) {
      layer = event.target;
      layer.setStyle({
        fillOpacity: 0.6
      });
    }
  });
}

d3.json(distmap).then(function (response) {
  console.log(response);
  
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap)

  L.geoJSON(response,{style:colordist,onEachFeature:onEachFeature}).addTo(myMap)
});