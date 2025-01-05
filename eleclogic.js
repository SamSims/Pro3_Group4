let maploc = "./Data/Geojson/RevConDistricts";
let year = "2016";
let distmap = maploc + year + ".geojson"

let myMap = L.map("elecmap", {
  center: [
    37.09, -95.71
  ],
  zoom: 5
});

function createslider(year){
electoraltotal = 0
electoraldem = 0
electoralrep = 0
actualresults ={"2016":{"Democrat":227,"Republican":304},"2020":{"Democrat":306,"Republican":232}}
d3.json("./Data/election_results_by_district.json").then(function (response) {
  d3.json("./Data/election_results_by_state.json").then(function (data) {
    console.log(data)
    for (district of response){
      if(district.Year === parseInt(year)){
      if(district.District_dem_votes > district.District_rep_votes){
        electoraldem+=1
      }else{electoralrep+=1}
    }}
    for (district of data){
      if(district.Year === parseInt(year)){
      if(district.State_dem_vote>district.State_rep_vote){
        electoraldem+=2
      }else{electoralrep+=2}
    }}
    console.log(electoraldem)
    console.log(electoralrep)
    slider = document.getElementById("myRange")
    slider.setAttribute("max",(electoraldem+electoralrep))
    slider.setAttribute("value",electoraldem)
    slider1 = document.getElementById("myRange1")
    slider1.setAttribute("max",(actualresults[year].Democrat+actualresults[year].Republican))
    slider1.setAttribute("value",actualresults[year].Democrat)

    tempSliderValue = slider.value;
    
    const progress = (tempSliderValue / slider.max) * 100;
    
    slider.style.background = `linear-gradient(to right, #0000ff ${progress}%, #ff0000 ${progress}%)`;

    tempSliderValue1 = slider1.value;
    
    const progress1 = (tempSliderValue1 / slider1.max) * 100;
    
    slider1.style.background = `linear-gradient(to right, #0000ff ${progress1}%, #ff0000 ${progress1}%)`;
    

    document.getElementById('valueDisplay').innerHTML = `Democrat Votes:${electoraldem} Republican Votes:${electoralrep}`;
    document.getElementById('valueDisplay1').innerHTML = `Democrat Votes:${actualresults[year].Democrat} Republican Votes:${actualresults[year].Republican}`;

  });
});

}

function colordist(response){
// color each district based on amount of votes each cantidate got.
if(response.properties["WINNER"] ==="Unknown"){

  return {color:"#00ff00",
  weight:3,
  fillOpacity: 0.6
}}else if(response.properties["WINNER"]==="Democrat") {
  return {color:"#0000ff",
    weight:3,
    fillOpacity: 0.6
  }
} else {
  return {color:"#ff0000",
    weight:3,
    fillOpacity: 0.6}
}};

function onEachFeature(feature,layer){
  layer.bindPopup(`${feature.properties.NAMELSAD}<br>District Democratic Votes: ${feature.properties.DEMVOTES}<br>District Republican Votes: ${feature.properties.REPVOTES}`)
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
  createslider(year);
  L.geoJSON(response,{style:colordist,onEachFeature:onEachFeature}).addTo(myMap)
});