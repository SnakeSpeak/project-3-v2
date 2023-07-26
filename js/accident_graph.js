let url = "http://127.0.0.1:5000/api/v1.0/accident_type"


function graph(data,value){
  let output = []
  let test_type = []
  let test_count = []

  for (let i=0;i<data.length;i++){
    let row = data[i]

    if (row.state == value){
      output.push(row)
    }
  }

  var hashMap = {}

  output.map(element => {
// if the key(name) is inserted in our hashmap, just increment the count
// if the key isn't present, then just assign the count of that key(name) as 1 and increment next time onwards
  hashMap[element.accident_type] = hashMap[element.accident_type] + 1 || 1;
  });

// our count for each name is ready...just getting the result ready in our desired format
  var aggregatedData =
  Object.keys(hashMap).map(element =>
  ({
    accident_type: element,
    count: hashMap[element]
  })
)

  let new_data = aggregatedData.sort(function(a,b){return b.count - a.count})

  for (let a=0; a<10; a++){
    bob = new_data[a]

    let type = bob.accident_type
    let type_count = bob.count

    test_type.push(type)
    test_count.push(type_count)
  }

  

  bar_plot(test_type, test_count, value)


}


// d3.json(url).then(function(data){
  

// })



function bar_plot(x_value, y_value, state){
  let bar_plot = [{
      x: x_value,
      y: y_value,
      text: x_value,
      type: "bar"
  }];

  let bar_layout = {
      width: 800,
      height: 500,
      title: `Top 10 Accident Types in ${state}`
  };

  Plotly.newPlot("accident", bar_plot, bar_layout);
};

function init(){
    // Fetching JSON data
    d3.json(url).then(function(data){ 

        // Call data extraction/graphing function for first ID
        graph(data, "Alabama")

    });

};


// On change to the DOM, call getData()
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
        graph(data, dataset)
                    
    }); 


}

init();