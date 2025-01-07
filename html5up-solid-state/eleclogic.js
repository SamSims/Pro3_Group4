// create refrence for the file to pull from.
let maploc = "./Data/Geojson/RevConDistricts";
let year = "2016";
//create the sliders at the top of the html
function createslider(year) {
  electoraltotal = 0
  electoraldem = 0 //holder for democrat electoral votes
  electoralrep = 0 //holder for republican electoral votes
  actualresults = { "2016": { "Democrat": 227, "Republican": 304 }, "2020": { "Democrat": 306, "Republican": 232 } }// store actual election results for comparison.
  d3.json("./Data/election_results_by_district.json").then(function (response) { //open district data
    d3.json("./Data/election_results_by_state.json").then(function (data) {//open state data
      //loop through the election results and add to the electoral votes for the districts
      for (district of response) {
        //make sure it is the proper year for election
        if (district.Year === parseInt(year)) {
          //check if democrat or republican had more votes.
          if (district.District_dem_votes > district.District_rep_votes) {
            electoraldem += 1
          } else { electoralrep += 1 }
        }
      }
      //loop through state election results
      for (district of data) {
        //make sure in proper year
        if (district.Year === parseInt(year)) {
          // check who had more votes, 2 votes more than number of districts per state so add 2 for winner.
          if (district.State_dem_vote > district.State_rep_vote) {
            electoraldem += 2
          } else { electoralrep += 2 }
        }
      }
      //find the district slider
      slider = document.getElementById("myRange")
      //set right bound of slider
      slider.setAttribute("max", (electoraldem + electoralrep))
      //set value for slider to be at
      slider.setAttribute("value", electoraldem)
      //find the actual results slider
      slider1 = document.getElementById("myRange1")
      //set right bound for slider
      slider1.setAttribute("max", (actualresults[year].Democrat + actualresults[year].Republican))
      //set value of slider
      slider1.setAttribute("value", actualresults[year].Democrat)
      //find value for shading
      tempSliderValue = slider.value;
      //turn into percentage for usage in gradient.
      const progress = (tempSliderValue / slider.max) * 100;
      //set gradient for slider using party colors
      slider.style.background = `linear-gradient(to right, #0000ff ${progress}%, #ff0000 ${progress}%)`;
      //find value for shading
      tempSliderValue1 = slider1.value;
      //turn into percentage for usage in gradient.
      const progress1 = (tempSliderValue1 / slider1.max) * 100;
      //set gradient for slider using party colors
      slider1.style.background = `linear-gradient(to right, #0000ff ${progress1}%, #ff0000 ${progress1}%)`;

      //add numbers at bottom of slider to see easier representation of results
      document.getElementById('valueDisplay').innerHTML = `Democrat Votes:${electoraldem} Republican Votes:${electoralrep}`;
      document.getElementById('valueDisplay1').innerHTML = `Democrat Votes:${actualresults[year].Democrat} Republican Votes:${actualresults[year].Republican}`;
      //make sliders so they can't be editied
      slider.setAttribute('readonly', 'readonly');
      slider.addEventListener('input', function (event) {
        event.preventDefault();
        return false;
      });
      slider1.setAttribute('readonly', 'readonly');
      slider1.addEventListener('input', function (event) {
        event.preventDefault();
        return false;
      });
    });
  });

}
//funtion for coloring of districts based on district votes.
function colordist(response) {
  // color each district based on amount of votes each cantidate got.
  if (response.properties["WINNER"] === "Unknown") {
    //color green incase of missing data
    return {
      color: "#00ff00",
      weight: 3,
      fillOpacity: 0.3
    }
    //blue for democrat winner
  } else if (response.properties["WINNER"] === "Democrat") {
    return {
      color: "#0000ff",
      weight: 3,
      fillOpacity: 0.3
    }
    //red for republican winner
  } else {
    return {
      color: "#ff0000",
      weight: 3,
      fillOpacity: 0.3
    }
  }
};
//color districts based on overall state winner to give indication of differences.
function colorstate(response) {
  // color each district based on amount of votes each cantidate got.
  if (response.properties["STATEWINNER"] === "Unknown") {
    //green if data is missing
    return {
      color: "#00ff00",
      weight: 3,
      fillOpacity: 0.6
    }
    //blue for democrat win.
  } else if (response.properties["STATEWINNER"] === "Democrat") {
    return {
      color: "#0000ff",
      weight: 3,
      fillOpacity: 0.6
    }
    //red for republican win.
  } else {
    return {
      color: "#ff0000",
      weight: 3,
      fillOpacity: 0.6
    }
  }
};
//function to bind a pop up on each district in geojson
function onEachFeature(feature, layer) {
  //add the popup containing state, district, votes counts for party by state, and vote counts for party by district.
  layer.bindPopup(`<h1>${feature.properties.STATENAME}</h1><br><h2>${feature.properties.NAMELSAD}</h2><br>State Democratic Votes: ${feature.properties.STATEDEMVOTES}<br>State Republican Votes: ${feature.properties.STATEREPVOTES}<br>District Democratic Votes: ${feature.properties.DEMVOTES}<br>District Republican Votes: ${feature.properties.REPVOTES}`)
  layer.on({
    // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
    mouseover: function (event) {
      layer = event.target;
      layer.setStyle({
        fillOpacity: 0.9
      });
    },
    // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
    mouseout: function (event) {
      layer = event.target;
      layer.setStyle({
        fillOpacity: 0.6
      });
    }
  });
}
//begining funtion start here.
function init() {
  //fill election options into the dropdown selection.
  let dropdown =d3.select("#elecsel");
  dropdown.append("option").text(`2016 Election`).property("value", "2016");
  dropdown.append("option").text(`2020 Election`).property("value", "2020");
  //create street tile layer for map
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })
  // create topology view for map
  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });
  let baseMaps = {
    Street: street,
    Topography: topo
  };
  //call funtion to create a slider, giving the year that is used.
  createslider(year);
  //grab 2016 district map
  let distmap = maploc + "2016" + ".geojson"
  d3.json(distmap).then(function (response) {
    //make state coloring view
    let state2016 =L.geoJSON(response, { style: colorstate, onEachFeature: onEachFeature })
    //make district coloring view
    let elec2016 = L.geoJSON(response, { style: colordist, onEachFeature: onEachFeature })
    //grab 2020 data
    let distmap1 = maploc + "2020" + ".geojson"
    d3.json(distmap1).then(function (data) {
      //make state coloring view
      let state2020 = L.geoJSON(data, { style: colorstate, onEachFeature: onEachFeature })
      //make district coloring view
      let elec2020 = L.geoJSON(data, { style: colordist, onEachFeature: onEachFeature })
      //set maps for view selection
     let overlayMaps = {
        "2016 Election": elec2016,
        "2016 Election by State": state2016,
        "2020 Election": elec2020,
        "2020 Election by State": state2020
      };
      //initialize the map
      let myMap = L.map("elecmap", {
        center: [
          30.09, -95.71
        ],
        zoom: 4,
        layers: [street, state2016, elec2016]
      });
      //create layer control
      L.control.layers(baseMaps, overlayMaps).addTo(myMap);

    });
  });
}
//function for when a different election year is selected.
function optionChanged(newyear) {
  //make new slider
createslider(newyear);
}
//start function.
init();