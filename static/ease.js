function plotWeightChanges(clinic_val) {
    Plotly.d3.csv('./static/data/clinic_aggregate_metrics.csv', (err,rows) => {
        var layout = {
            title: 'Number of times weights are changed',
            barmode: 'stack'
        };

        var siteIndices = {'HN': 0, 'L': 1, 'P': 2};

        var xValue = ['HN', 'L', 'P'];
        var saved = [0, 0, 0];
        var notSaved = [0, 0, 0];
        if (rows === undefined) {
            rows = [];
        }

        rows.forEach(function(row){
          if(includeClinicRow(row, clinic_val)){
            xValue.forEach(function(anatomical_site){
                var siteIndex = siteIndices[anatomical_site];
                saved[siteIndex] += parseInt(row[anatomical_site+'_weight_changed_saved']);
                notSaved[siteIndex] += parseInt(row[anatomical_site+'_weight_changed_not_saved']);
            });
        }});
        
        var savedWeights = {
            x: xValue,
            y: saved,
            type: 'bar',
            text: saved,
            textposition: 'auto',
            name: "Saved Weights",
            hoverinfo: 'none'
        };
        
        var notSavedWeights = {
            x: xValue,
            y: notSaved,
            type: 'bar',
            text: notSaved,
            textposition: 'auto',
            name: "Unsaved Weights",
            hoverinfo: 'none',
              marker: {
                    color: 'rgb(0,153,255)'
                }
        };

        var data = [savedWeights, notSavedWeights];
        Plotly.newPlot('weights', data, layout);
     });
}



function plotAverageChanges(clinic_val) {
    Plotly.d3.csv('./static/data/clinic_aggregate_metrics.csv', (err,rows) => {
        var layout = {
            title: 'Average number of weights changed per anatomical site'
        };
        var noOfChanges = [0, 0, 0];
        var xValue = ['HN', 'L', 'P'];
        var siteIndices = {'HN': 0, 'L': 1, 'P': 2};
        if (rows === undefined) {
            rows = [];
        }

        rows.forEach(function(row){
           if(includeClinicRow(row, clinic_val)){
            xValue.forEach(function(anatomical_site){
                var siteIndex = siteIndices[anatomical_site];
                noOfChanges[siteIndex] += parseInt(row[anatomical_site+'_average_weight_change']);
            });
        }});
        var changed = {
            x: xValue,
            y: noOfChanges,
            type: 'bar',
            textposition: 'auto',
            hoverinfo: 'none'
        };

        var data = [changed]
        Plotly.newPlot('changes', data, layout);
    });
}
