d3.json("samples.json").then(function(data){
    console.log(data)

    let otu_values = data.samples.map(x => x.sample_values)

    let otu_labels = data.samples.map(x => x.otu_labels)

    let otu_ids = data.samples.map(x => x.otu_ids)

    // console.log(otu_ids)

    function init(){

//Bar Chart
        bar_data = [{
            x: otu_values[0].slice(0, 10).reverse(),
            y: otu_ids[0].slice(0, 10).map(item => `OTU ${item}`).reverse(),
            text: otu_labels[0].slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        }]

        Plotly.newPlot("bar", bar_data)
    
//Bubble Chart
        bubble_data = [{
          x: otu_ids[0],
          y: otu_values[0],
          text: otu_labels[0],
          mode: "markers",
          marker: {
            size: otu_values[0],
            color: otu_ids[0],
          }
          
        }]

        bubble_layout = {
          xaxis: { title: "OTU ID" },
        };

        Plotly.newPlot("bubble", bubble_data, bubble_layout);


//Metadata
        let metadata = data.metadata
        console.log(metadata[0])
        let DemoGraph = d3.select("#sample-metadata")

        Object.entries(metadata[0]).forEach(([key, value]) => {
          DemoGraph.append("h6").text(`${key}: ${value}`)
        }); 




        
}



//Re Style Plots

//Dropdown menu options
        
    let dropdown = d3.select("#selDataset")
    let Options = data.names
    console.log(Options)

    Options.forEach(x => {dropdown.append("option").text(x).property("value", x)})

//Update Plots


    d3.selectAll("option").on("click", function() {
    let selection = d3.select(this).property("value")

    })



    d3.select("#selDataset").on("change", updatePlotly);

    function updatePlotly(){

  
    let index = Options.indexOf(selection)
    x = otu_values[index].slice(0, 10).reverse(),
    y = otu_ids[index].slice(0, 10).map(item => `OTU ${item}`).reverse(),
    text = otu_labels[index].slice(0, 10).reverse(),

      


    Plotly.restyle("bar", ["x", "y", "text"], [x, y, text])

    
  

    }



    init()





    })