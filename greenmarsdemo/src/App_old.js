import React, { Component } from 'react';
import ReactDOM from "react-dom";
import $ from 'jquery';
import Plotly from 'react-plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory'
import './metrics.css';
import Papa from 'papaparse';


const Plot = createPlotlyComponent(Plotly);

        // <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
        // <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
        // <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        // <script src="https://cdn.dashjs.org/latest/dash.all.min.js"></script>

var myCSV = `id,date,org_name,used_by_physicist_count,used_by_physician_count,used_by_dosimetrist_count,used_by_administrator_count,used_by_other_count,patients_processed_count,anatomical_site_HN_count,anatomical_site_P_count,anatomical_site_L_count,average_processing_time,average_idle_time,average_session_time,average_match_dissimilarity,non_completion_count,min_priority_update_count_per_session,max_priority_update_count_per_session,mean_priority_update_count_per_session,min_import_to_done_processing,max_import_to_done_processing,mean_import_to_done_processing,min_import_to_export,max_import_to_export,mean_import_to_export,user,improvement_values,L_weight_changed_saved,L_weight_changed_not_saved,P_weight_changed_saved,P_weight_changed_not_saved,HN_weight_changed_saved,HN_weight_changed_not_saved,HN_average_weight_change,L_average_weight_change,P_average_weight_change,
1,11/05/2018,Institution-0006,0,0,0,0,4,4,1,0,3,01:32.4,00:23.5,00:17.3,0.221929122,3,0,0,0,01:32.4,01:32.4,01:32.4,00:17.3,00:17.3,00:17.3,CMD,1,2,2,2,1,2,2,2,1,3,2
2,08/05/2018,Institution-0006,0,0,0,0,2,2,1,0,1,01:32.4,00:23.5,00:58.1,0.927732593,0,0,0,0,01:32.4,01:32.4,01:32.4,00:17.3,01:38.9,00:58.1,MD,8,0,1,1,2,3,3,3,2,4,3
3,18/05/2018,Institution-0006,0,0,0,0,1,1,0,0,1,00:47.3,01:31.9,01:07.4,9.546271153,0,0,0,0,00:47.3,00:47.3,00:47.3,01:07.4,01:07.4,01:07.4,PhD,7,1,1,1,3,5,5,5,4,6,4
4,18/06/2018,Institution-0008,0,0,0,0,2,2,0,0,2,00:48.5,04:01.6,08:34.4,3.087441533,1,0,4,4,00:48.5,00:48.5,00:48.5,08:34.4,08:34.4,08:34.4,MD,4,2,2,2,4,1,3,3,1,3,5
5,19/06/2018,Institution-0008,1,0,0,0,2,3,0,0,3,00:23.4,00:33.9,56:47.3,2.577709182,1,0,0,0,00:45.2,01:42.2,01.22.5,01:07.9,52:26.7,56:47.3,CMD,2,3,1,2,2,3,1,2,5,1,2
6,31/07/2018,Institution-0005,0,0,0,0,3,3,1,1,1,00:42.0,02:28.4,00:53.9,1.270531201,1,0,3,1,00:36.2,00:49.7,00:42.0,00:49.5,00:58.3,00:53.9,Other,3,2,0,1,1,2,3,1,2,2,3
7,20/07/2017,Institution-0005,0,2,2,0,3,2,1,0,1,00:24.0,02:22.2,00:42.8,34:46.3,1,0,2,1,00:23.1,00:44.2,00:32.3,00:42.2,00:44.3,00:42.9,Other,3,2,0,1,1,2,2,2,1,1,2
`

let myValues;

Papa.parse(myCSV, {
  header: true,
  complete: function(results) {
    myValues = results;
  }
})

// Papa.parse('./static/data/clinic_aggregate_metrics.csv',  {
//   header: true,
//   download: true,
//   complete: function(results) {
//     console.dir('here is the csv file, supposedly');
//     console.dir(JSON.stringify(results.data));
//     // data = results.data;
//   }
// });

class App extends Component {
  //performance metrics page
 includeClinicRow(row, clinic) {
    if(clinic === "all" || clinic===row['org_name']){
        let org_name = row['org_name'];
        return true;
    }
  }

 plotMatchDissimilarity(clinic_val) {
    Plot.d3(myValues, (err,rows) => {
      var layout = {
        title: "Average dissimilarity across matches available"
      };

      var xValue = [];
      var yValue = [];

        if (rows === undefined) {
            rows = [];
        }
      rows.forEach(function(row){
       if(this.includeClinicRow(row, clinic_val)){
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

 plotImprovementAttempts(clinic_val) {
    Plot.d3(myValues, (err,rows) => {
        var layout = {
            title: "Number of attempts on average to improve a constraint"
        };

        var xValue = [];
        var yValue = [];

        if (rows === undefined) {
            rows = [];
        }
        rows.forEach(function(row){
         if(this.includeClinicRow(row, clinic_val)){
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
           Plot.newPlot('improvementAttempts', data, layout);
    })
}

  plotWeightChanges(clinic_val) {
    Plot.d3(myValues, (err,rows) => {
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
          if(this.includeClinicRow(row, clinic_val)){
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
        Plot.newPlot('weights', data, layout);
     });
}



 plotAverageChanges(clinic_val) {
    Plot.d3(myValues, (err,rows) => {
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
           if(this.includeClinicRow(row, clinic_val)){
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
        Plot.newPlot('changes', data, layout);
    });
}

 plotUserRoleUsage(clinic_val) {
    Plot.d3(myValues, (err,rows) => {
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
        if(this.includeClinicRow(row, clinic_val)){
            let roleIndex = roleIndices[row.user];
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


        Plot.newPlot('userRoleUsage', dataPie, layoutPie);
    });
}

 plotPatientsTreated(clinic_val){
        Plot.d3(myValues, (err, rows) => {
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
               if (this.includeClinicRow(row, clinic_val)){
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
            Plot.newPlot('treated', data, layout);
         });
}




 plotPatientTypesProcessed(clinic_val){
    Plot.d3(myValues, (err,rows) => {
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
           if(this.includeClinicRow(row, clinic_val)){
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
           if(this.includeClinicRow(row, clinic_val)){
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
          Plot.newPlot('clinicsPatients', dataProcessed, layoutProcessed);
    });
}



  componentDidMount(){
                $('input[name="clinic_selected"]').on("change", function(){
                    var clinic_val = $(this).val();
                    console.log("Clinic selected: ", clinic_val);
                    this.plotUserRoleUsage(clinic_val);
                    this.plotPatientTypesProcessed(clinic_val);
                    this.plotImprovementAttempts(clinic_val);
                    this.plotWeightChanges(clinic_val);
                    this.plotPatientsTreated(clinic_val);
                    this.plotAverageChanges(clinic_val);
                    this.plotMatchDissimilarity(clinic_val);
                });
                // $("#top-tabs").tabs();
                // $("#overview-subtabs").tabs();
                
                // Initial clinic val
                var init_clinic_val = $('input[name="clinic_selected"]').val();
                this.plotUserRoleUsage(init_clinic_val);
                this.plotPatientTypesProcessed(init_clinic_val);
                this.plotImprovementAttempts(init_clinic_val);
                this.plotWeightChanges(init_clinic_val);
                this.plotPatientsTreated(init_clinic_val);
                this.plotAverageChanges(init_clinic_val);
                this.plotMatchDissimilarity(init_clinic_val);
            };
  render() {
    return (
      <div> 
    <head>
      <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
        <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <script src="https://cdn.dashjs.org/latest/dash.all.min.js"></script>
        <script type= "text/javascript" src="./static/metrics.js"></script>
        <script type= "text/javascript" src="./static/performance.js"></script>
        <script type= "text/javascript" src="./static/ease.js"></script>
    </head>
      <div id="clinic-select">
            <input type="radio" name="clinic_selected" value="all" checked="checked" /> All Clinics
            <input type="radio" name="clinic_selected" value="Institution-0005" /> UCSF
            <input type="radio" name="clinic_selected" value="Institution-0006" /> Brigham
            <input type="radio" name="clinic_selected" value="Institution-0008" /> HLCC
        </div>
        <div id="overview-subtabs">
            <ul>
                <li className="active"><a href="#overview-chm">Customer Health Measurements</a></li>
                <li><a href="#overview-eou">Ease of Use/Customer Satisfaction</a></li>
                <li><a href="#overview-spm">Software Performance Measurement</a></li>
            </ul>
            <div id="overview-chm">
               <div id="clinicsPatients" className="left"></div>
               <div id="treated" className="right"></div>
               <div id="userRoleUsage"></div>
            </div>
            <div id="overview-eou">
                <table>
                <tr>
                <td>
                <div id="weights"></div>
                </td>
                <td>
                <div id="changes"></div>
                </td>
                </tr>
                </table>
            </div>
            <div id="overview-spm">
                <table>
                <tr>
                <td>
                <div id="improvementAttempts"></div>
                </td>
                <td>
                <div id="dissimilarity"></div>
                </td>
                </tr>
                </table>
            </div>
      </div>
      </div>
    );
  }
}

export default App;


//         //  <script>
//         //     $(document).ready(function(){
//         //         $('input[name="clinic_selected"]').on("change", function(){
//         //             var clinic_val = $(this).val();
//         //             console.log("Clinic selected: ", clinic_val);
//         //             plotUserRoleUsage(clinic_val);
//         //             plotPatientTypesProcessed(clinic_val);
//         //             plotImprovementAttempts(clinic_val);
//         //             plotWeightChanges(clinic_val);
//         //             plotPatientsTreated(clinic_val);
//         //             plotAverageChanges(clinic_val);
//         //             plotMatchDissimilarity(clinic_val);
//         //         });
//         //         $("#top-tabs").tabs();
//         //         $("#overview-subtabs").tabs();
                
//         //         // Initial clinic val
//         //         var init_clinic_val = $('input[name="clinic_selected"]').val();
//         //         plotUserRoleUsage(init_clinic_val);
//         //         plotPatientTypesProcessed(init_clinic_val);
//         //         plotImprovementAttempts(init_clinic_val);
//         //         plotWeightChanges(init_clinic_val);
//         //         plotPatientsTreated(init_clinic_val);
//         //         plotAverageChanges(init_clinic_val);
//         //         plotMatchDissimilarity(init_clinic_val);
//         //     });
//         // </script>
