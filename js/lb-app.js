// Create initial map object
let layers = {
  CLEAR: new L.LayerGroup(),
  RAIN: new L.LayerGroup(),
  SNOW: new L.LayerGroup(),
  CLOUDY: new L.LayerGroup(),
  OTHER: new L.LayerGroup()
};

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

let overlays = {
  "Clear": layers.CLEAR,
  "Rain": layers.RAIN,
  "Snow": layers.SNOW,
  "Cloudy": layers.CLOUDY,
  "Other": layers.OTHER
};

let layerControl = L.control.layers(null, overlays).addTo(myMap);

let info = L.control({
  position: "bottomright"
});

info.onAdd = function () {
  let div = L.DomUtil.create("div", "legend");
  return div;
};

info.addTo(myMap);

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
    
function createWeatherMap(data, value) {
  let weatherCount = {
      CLEAR: 0,
      RAIN: 0,
      SNOW: 0,
      CLOUDY: 0,
      OTHER: 0
    };

    let weatherStatusCode;

    let stateOutput = [];
    for (let k = 0; k < data.length; k++) {
      let row = data[k];
      if (row.state == value) {
        stateOutput.push(row);
      }
    }

    for (let i = 0; i < stateOutput.length; i++) {
      if (stateOutput[i].weather_condition == "Clear") {
        weatherStatusCode = "CLEAR";
      } else if (stateOutput[i].weather_condition == "Rain") {
        weatherStatusCode = "RAIN";
      } else if (stateOutput[i].weather_condition == "Snow") {
        weatherStatusCode = "SNOW";
      } else if (stateOutput[i].weather_condition == "Cloudy") {
        weatherStatusCode = "CLOUDY";
      } else {
        weatherStatusCode = "OTHER";
      }

      weatherCount[weatherStatusCode]++;

      let newMarker = L.marker([stateOutput[i].lat, stateOutput[i].lon], {
        icon: icons[weatherStatusCode]
      });
      
      newMarker.addTo(layers[weatherStatusCode]);

      let popupContent = `<b>State:</b> ${stateOutput[i].state}<br><b>Weather:</b> ${stateOutput[i].weather_condition}<br>`;

      newMarker.bindPopup(popupContent);
    }

    updateLegend(weatherCount);
  }


  function updateLegend(weatherCount) {
    document.querySelector(".legend").innerHTML = [
      "<p class='clear'>Clear: " + weatherCount.CLEAR + "</p>",
      "<p class='rain'>Rain: " + weatherCount.RAIN + "</p>",
      "<p class='snow'>Snow: " + weatherCount.SNOW + "</p>",
      "<p class='cloudy'>Cloudy: " + weatherCount.CLOUDY + "</p>",
      "<p class='other'>Other: " + weatherCount.OTHER + "</p>",
    ].join("");
  }

// Call the function with the desired URL for the API
const url2 = "http://127.0.0.1:5000/api/v1.0/weather_conditions";

// createWeatherMap(url2);
function init() {
  d3.json(url2).then(function(data) {
    createWeatherMap(data, "Alabama");
  });
} 

d3.selectAll("#selDataset1").on("change", getData);
// Create function for getData()
function getData(){
    // Assign the dropdown menu option to a variable
    let dropdownMenu = d3.select("#selDataset1");
    // Assign the value of the dropdown menu option to a variable
    let dataset = dropdownMenu.property("value");
    // Fetching JSON data
    d3.json(url).then(function(data){
        // Call data extraction/graphing function based on value selected
        createWeatherMap(data, dataset)
    });
}

init();


