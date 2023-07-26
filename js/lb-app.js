// Creating our initial map object:
// Initialize all the LayerGroups that we'll use.
let layers = {
    CLEAR: new L.LayerGroup(),
    RAIN: new L.LayerGroup(),
    SNOW: new L.LayerGroup(),
    CLOUDY: new L.LayerGroup(),
    OTHER: new L.LayerGroup()
  };
  
  // Create a Leaflet map and set its center and zoom level.
  const myMap = L.map('map', {
    center: [37.0902, -95.7129],
    zoom: 5,
    layers: [
      layers.CLEAR,
      layers.RAIN,
      layers.SNOW,
      layers.CLOUDY,
      layers.OTHER
    ]
  });
  
  // Create the tile layer that will be the background of our map.
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Create an overlays object to add to the layer control.
  let overlays = {
    "Clear": layers.CLEAR,
    "Rain": layers.RAIN,
    "Snow": layers.SNOW,
    "Cloudy": layers.CLOUDY,
    "Other": layers.OTHER
  };
  
  // Create a control for our layers, and add our overlays to it.
  let layerControl = L.control.layers(null, overlays).addTo(myMap);
  
  // Create a legend to display information about our map.
  let info = L.control({
    position: "bottomright"
  });
  
  // When the layer control is added, insert a div with the class of "legend".
  info.onAdd = function() {
    let div = L.DomUtil.create("div", "legend");
    return div;
  };
  
  // Add the info legend to the map.
  info.addTo(myMap);
  
  // Initialize an object that contains icons for each layer group.
  let icons = {
    CLEAR: L.ExtraMarkers.icon({
      icon: "ion-star",
      iconColor: "white",
      markerColor: "yellow"
    }),
    RAIN: L.ExtraMarkers.icon({
      icon: "ion-umbrella",
      iconColor: "white",
      markerColor: "blue"
    }),
    SNOW: L.ExtraMarkers.icon({
      icon: "ion-snow",
      iconColor: "white",
      markerColor: "pink"
    }),
    CLOUDY: L.ExtraMarkers.icon({
      icon: "ion-cloud",
      iconColor: "black",
      markerColor: "white"
    }),
    OTHER: L.ExtraMarkers.icon({
      iconColor: "white",
      markerColor: "grey"
    })
  };
  
  const url2 = "http://127.0.0.1:5000/api/v1.0/weather_conditions";
  
  // get the data with d3
  d3.json(url2).then(function(data) {
    // create an object to keep the number of markers in each layer.
    let weatherCount = {
      CLEAR: 0,
      RAIN: 0,
      SNOW: 0,
      CLOUDY: 0,
      OTHER: 0
    };
    // Initialize weatherStatusCode, which will be used as a key to access the appropriate layers, icons, and weather count for the layer group.
    let weatherStatusCode;
    
    let stateOutput = [];
    for (let k=0; k<data.length;k++) {
      let row = data[k];
      if (row.state == "Alabama") {
        stateOutput.push(row);
      }
    }

    // Loop through the stations (they're the same size and have partially matching data).
    for (let i = 0; i < stateOutput.length; i++) {
    
      // Loop through weather conditions
      if (stateOutput[i].weather_condition == "Clear") {
        weatherStatusCode = "CLEAR";
      }
  
      else if (stateOutput[i].weather_condition == "Rain") {
        weatherStatusCode = "RAIN";
      }
  
      else if (stateOutput[i].weather_condition == "Snow") {
        weatherStatusCode = "SNOW";
      }
  
      else if (stateOutput[i].weather_condition == "Cloudy") {
        weatherStatusCode = "CLOUDY";
      }
  
      else {
        weatherStatusCode = "OTHER";
      }
  
      // Update weather count
      weatherCount[weatherStatusCode]++;
  
      // create a new marker with appropriate icon and coordinates
      let newMarker = L.marker([stateOutput[i].lat, stateOutput[i].lon], {
        icon: icons[weatherStatusCode]
      });
  
      newMarker.addTo(layers[weatherStatusCode]);
  
      let popupContent = `<b>State:</b> ${stateOutput[i].state}<br><b>Weather:</b> ${stateOutput[i].weather_condition}<br>`;
  
      newMarker.bindPopup(popupContent);
    }
  
    updateLegend(weatherCount);
  });
  
  function updateLegend(weatherCount) {
    document.querySelector(".legend").innerHTML = [
      "<p class='clear'>Clear: " + weatherCount.CLEAR + "</p>",
      "<p class='rain'>Rain: " + weatherCount.RAIN + "</p>",
      "<p class='snow'>Snow: " + weatherCount.SNOW + "</p>",
      "<p class='cloudy'>Cloudy: " + weatherCount.CLOUDY + "</p>",
      "<p class='other'>Other: " + weatherCount.OTHER + "</p>",
    ].join("");
  }
