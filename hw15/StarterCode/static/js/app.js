function populateMetaData(sample){
    d3.json("samples.json").then((data) =>{
        var metadata= data.metadata;
        sample_id=metadata.filter(sample_object=>sample_object.id==sample);
        selection=sample_id[0]
        var panel= d3.select("#sample-metadata");
        panel.html("");
        Object.entries(selection).forEach(([key,value])=>{
            panel.append("h6").text(`${key}: ${value}`);
        });
    });
}
 

function chartUpdate(sample){
    d3.json("samples.json").then((data) => {
    samples=data.samples;
    sample_filter=samples.filter(sample_object=>sample_object.id==sample)
    sample=sample_filter[0]
    yTicks=sample.otu_ids.slice(0,10).map(otu_id=>`OTU ${otu_id}`).reverse();
        //  Create the Traces
        var trace1 = {
        x: sample.sample_values.slice(0,10).reverse(),
        text: sample.otu_labels.slice(0,10).reverse(),
        y: yTicks,
        type: "bar",
        name: "Top 10 OTU",
        orientation: "h"
        };

        var data = [trace1];

    // Define the plot layout
    var layout = {
        title: "Top 10 OTU",
        xaxis: { title: "values" },
        yaxis: { title: "ID" }
    };

    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("bar", data, layout);

    // bubble
    var trace1 = {
        x: sample.otu_ids,
        y: sample.sample_values,
        text: sample.otu_labels,
        mode: 'markers',
        marker: {
          color: sample.otu_ids,
          colorscale: 'Earth',
          size: sample.sample_values
        }
      };
      
      var data = [trace1];
      
      var layout = {
        title: 'Bubble Chart',
        showlegend: false,
        height: 600,
        width: 900

      };
      
      Plotly.newPlot('bubble', data, layout);
    });    



}


function init(){
    var dropDown=d3.select("#selDataset")
    d3.json("samples.json").then((data) =>{
    var names= data.names;
    names.forEach((sample)=>{
        dropDown
            .append("option")
            .text(sample)
            .property("value",sample);
    });
    var firstSample=names[0]
    chartUpdate(firstSample)
    populateMetaData(firstSample)


});
}

function optionChanged(sample){
    chartUpdate(sample);
    populateMetaData(sample);
}
init();

