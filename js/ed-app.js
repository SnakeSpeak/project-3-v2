const stateData = "Resources/gz_2010_us_040_00_500k.json"
const statePop = d3.json("http://127.0.0.1:5000/api/v1.0/population")

d3.json(stateData).then(function(data){
    console.log(data);
});

init();

console.log(statePop)


function displayPop(state) {
    //parse out api data
    d3.json("http://127.0.0.1:5000/api/v1.0/population")
    .then(data => {
        console.log(data)
        //filter to only see selected state data
        let value = data.filter(result => result.state == state);
        let statePop = value[0].population
        let name = value[0].state
        console.log(statePop)
        //adjust html elements to display population counts and state name
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
        createLightingBarGraph(init_state)
    });
}

function newState(state) {
    displayPop(state);
    createLightingBarGraph(state);
};

function createLightingBarGraph(state) {
    //parse out api data
    d3.json("http://127.0.0.1:5000//api/v1.0/lighting_conditions").then((data) => {
        console.log(data)
        //filter to only see selected state data
        let value = data.filter(result => result.state == state)
        const lightingCounts = {};
        //increase counts for specific lighting types
        value.forEach(item => {
            console.log(item)
            const lighting = item.lighting_condition;
            lightingCounts[lighting] = (lightingCounts[lighting] || 0)+1;
        })
        //create data for chart
        const lightingData = 
            {
                x: Object.keys(lightingCounts),
                y: Object.values(lightingCounts),
                type: 'bar'
            };
        //create layout, and slight adjustments for readability
        const layout = {
            xaxis: {
                title: 'Lighting Condition',
                automargin: true,
                tickangle: -45
            },
            yaxis:{
                title: 'Count'
            },
            width: 800
        };
        //plot it out
        Plotly.newPlot('chart',[lightingData],layout);
    })

    
}