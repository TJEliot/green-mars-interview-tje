
function includeClinicRow(row, clinic){
//    if(row['org_name']=="all" || clinic==row['org_name']){
    if(clinic == "all" || clinic==row['org_name']){
        org_name = row['org_name'];
        return true;
    }
}
function plotUserRoleUsage(clinic_val) {
    Plotly.d3.csv('./static/data/clinic_aggregate_metrics.csv', (err,rows) => {
        var layoutPie = {
            title: 'Type of User',
            height: 400,
            width: 500
        };
        if (rows === undefined) {
            rows = [];
        }
        var roleIndices = {'CMD': 0, 'MD': 1, 'PhD': 2, 'Other': 3};
        var roles = Object.keys(roleIndices);
        var roleSums = [0, 0, 0, 0];

        rows.forEach(function(row){
        if(includeClinicRow(row, clinic_val)){
            roleIndex = roleIndices[row.user];
            roleSums[roleIndex] += 1;
            }
        })

        var dataPie = [{
            labels: roles,
            values: roleSums,
            type: 'pie',
            marker: {
                colors: ['rgb(0,153,255)', 'rgba(58, 200, 225, .5)', 'rgb(158, 202, 225)']

            }
        }];


        Plotly.newPlot('userRoleUsage', dataPie, layoutPie);
    });
}

function plotPatientsTreated(clinic_val){
        Plotly.d3.csv('./static/data/clinic_aggregate_metrics.csv', (err, rows) => {
            var layout = {
                title: 'Number and Type of Patient Treated per day',
                barmode: 'stack'
            };
            var xValue = [];
            var hnValue = [];
            var pValue = [];
            var lValue = [];
        if (rows === undefined) {
            rows = [];
        }
            rows.forEach(function(row){
               if (includeClinicRow(row, clinic_val)){
                xValue.push(row.date);
                hnValue.push(row.anatomical_site_HN_count);
                pValue.push(row.anatomical_site_P_count);
                lValue.push(row.anatomical_site_L_count);
            }
          })

            var Prostate = {
                x: xValue,
                y: pValue,
                type: 'bar',
                text: pValue,
                textposition: 'auto',
                name: "Prostate",
                hoverinfo: 'none',
                marker: {
                    color: 'rgba(58, 200, 225, .5)'
                }
            };
            var Lung = {
                x: xValue,
                y: lValue,
                type: 'bar',
                text: lValue,
                textposition: 'auto',
                name: "Lung",
                hoverinfo: 'none',
                marker: {
                 color: 'rgb(158, 202, 225)'
                }
            };
            var headAndNeck = {
                x: xValue,
                y: hnValue,
                type: 'bar',
                text: hnValue,
                textposition: 'auto',
                name: "Head & Neck",
                hoverinfo: 'none',
                marker: {
                    color: 'rgb(0,153,255)'
                }
            };
            var data = [Prostate, Lung, headAndNeck];
            Plotly.newPlot('treated', data, layout);
         });
}




function plotPatientTypesProcessed(clinic_val){
    Plotly.d3.csv('./static/data/clinic_aggregate_metrics.csv', (err,rows) => {
        var layoutProcessed = {
            title: 'Number and Type of patient processed per clinic',
            barmode: 'stack'
        };
        var xValue = [];
        var hnValue = [];
        var pValue = [];
        var lValue = [];

        if (rows === undefined) {
            rows = [];
        }
        rows.forEach(function(row){
           if(includeClinicRow(row, clinic_val)){
            xValue.push(row.org_name);
            hnValue.push(row.anatomical_site_HN_count);
            pValue.push(row.anatomical_site_P_count);
            lValue.push(row.anatomical_site_L_count);
           }
         })


        function unique(value, index, self) {
            return self.indexOf(value) === index
            }

        var xV = xValue.filter(unique);
        var site = ['HN', 'L', 'P'];
        var numP = [];
        var numL = [];
        var numHN = [];
        var counter = 0;
        var siteIndices = {};
        xV.forEach(function(inst) {
            numHN.push(0);
            numL.push(0);
            numP.push(0);
            siteIndices[inst] = counter;
            counter+=1;
        });

        rows.forEach(function(row){
           if(includeClinicRow(row, clinic_val)){
                var siteIndex = siteIndices[row['org_name']];

                numHN[siteIndex] += parseInt(row['anatomical_site_HN_count']);
                numL[siteIndex] += parseInt(row['anatomical_site_L_count']);
                numP[siteIndex] += parseInt(row['anatomical_site_P_count']);
        }});

         var Prostate = {
                x: xV,
                y: numP,
                type: 'bar',
                text: numP,
                textposition: 'auto',
                name: "Prostate",
                hoverinfo: 'none',
                marker: {
                    color: 'rgba(58, 200, 225, .5)'
                }
            };
         var Lung = {
                x: xV,
                y: numL,
                type: 'bar',
                text: numL,
                textposition: 'auto',
                name: "Lung",
                hoverinfo: 'none',
                marker: {
                 color: 'rgb(158, 202, 225)'
                }
          };

          var headAndNeck = {
                x: xV,
                y: numHN,
                type: 'bar',
                text: numHN,
                textposition: 'auto',
                name: "Head & Neck",
                hoverinfo: 'none',
                marker: {
                    color: 'rgb(0,153,255)'
                }
          };
          var dataProcessed = [Prostate, Lung, headAndNeck];
          Plotly.newPlot('clinicsPatients', dataProcessed, layoutProcessed);
    });
}

