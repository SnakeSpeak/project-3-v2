// Creating our initial map object:
// We set the longitude, latitude, and starting zoom level.
// Initialize the map
var map = L.map('map').setView([51.505, -0.09], 13);

// Add a tile layer (you can choose different tile providers)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
