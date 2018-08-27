//performance metrics page
function includeClinicRow(row, clinic){
    if(clinic == "all" || clinic==row['org_name']){
        org_name = row['org_name'];
        return true;
    }
}

function plotMatchDissimilarity(clinic_val) {
    Plotly.d3.csv('./static/data/clinic_aggregate_metrics.csv', (err,rows) => {
      var layout = {
        title: "Average dissimilarity across matches available"
      };

      var xValue = [];
      var yValue = [];

        if (rows === undefined) {
            rows = [];
        }
      rows.forEach(function(row){
       if(includeClinicRow(row, clinic_val)){
            xValue.push(row.average_match_dissimilarity),
            yValue.push(row.patients_processed_count)
        }
        })
        var trace1 = {
            x: xValue,
            y: yValue,
            type: 'scatter'
        };
        var data=[trace1];
        Plotly.newPlot('dissimilarity', data, layout);
})
}

function plotImprovementAttempts(clinic_val) {
    Plotly.d3.csv('./static/data/clinic_aggregate_metrics.csv', (err,rows) => {
        var layout = {
            title: "Number of attempts on average to improve a constraint"
        };

        var xValue = [];
        var yValue = [];

        if (rows === undefined) {
            rows = [];
        }
        rows.forEach(function(row){
         if(includeClinicRow(row, clinic_val)){
                xValue.push(row.date),
                yValue.push(row.improvement_values)
          }
          })
          var data = [{
                    type: 'bar',
                    hoverinfo: 'none',
                    x: xValue,
                    y: yValue
           }];
           Plotly.newPlot('improvementAttempts', data, layout);
    })
}
