const stateData = "Resources/gz_2010_us_040_00_500k.json"
const statePop = "est2021pop.csv"
d3.json(stateData).then(function(data){
    console.log(data);
});
init();

// Function to convert CSV to JSON
function csvToJSON(csvData) {
    let rows = csvData.trim().split('\n');
    let headers = rows[0].split(',');
    let jsonData = [];

    for (let i = 1; i < rows.length; i++) {
        let values = rows[i].split(',');
        let entry = {};

        for (let j = 0; j < headers.length; j++) {
            entry[headers[j].trim()] = values[j].trim();
        }

        jsonData.push(entry);
    }

    return jsonData;
}


function displayPop(state) {
    // Fetch the CSV file and convert it to JSON
    fetch('est2021pop.csv')
        .then(response => response.text())
        .then(csvData => {
            // Convert CSV to JSON
            let jsonData = csvToJSON(csvData);

            // Log the JSON data to the console
            console.log(jsonData);
            let value = jsonData.filter(result => result.NAME == state);
            let name = value[0].NAME
            let statePop = value[0].POPESTIMATE2021
            console.log(statePop)
            const popEstElement = document.getElementById('popEst');
            const stateNameElement = document.getElementById('stateName');
            popEstElement.textContent = statePop.toLocaleString();
            stateNameElement.textContent = name.toLocaleString();
            })

    }


function init() {
    let dropdown1 = d3.select("#selDataset1");
    d3.json(stateData).then(function(data){
        // Extract the state names from the data
        let stateNames = data.features.map((feature) => feature.properties.NAME);
        // Sort the state names alphabetically
        stateNames.sort();

        // Clear existing options before adding alphabetized ones
        dropdown1.html("");

        // Append the sorted state names to the dropdown
        stateNames.forEach((stateName) => {
            dropdown1.append("option").text(stateName).property("value", stateName);
        });
        let init_state = stateNames[0];
        console.log(init_state)
        displayPop(init_state)
    });
}

function newState(state) {
    displayPop(state);
};


fetch("http://127.0.0.1:5000/api/v1.0/lighting_conditions").then(response => response.json()).then(data => {
    console.log(data);
})