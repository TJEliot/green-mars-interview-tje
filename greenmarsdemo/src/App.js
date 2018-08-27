import React, { Component } from 'react';
import ReactDOM from "react-dom";
import $ from 'jquery';
import Plotly from 'react-plotly.js';
import Plot from 'react-plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory'
import './metrics.css';
import Papa from 'papaparse';


// const Plot = createPlotlyComponent(Plotly);

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
    console.dir(myValues);
  }
})


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayNumberAndTypeOfPatientsProcessedPerClinicDiv: "visible",
            displayNumberAndTypeOfPatientsTreatedPerDayDiv: "visible",
            displayTypeOfUserDiv: "visible",
            displayNumberOfTimesWeightsAreChangedDiv: "blank",
            displayNumberOfWeightChangesPerAnatomicalSiteDiv: "blank",
            displayNumberOfAttemptsOnAverageToImproveAConstantDiv: "blank",
            displayAverageDissimilarityAcrossMatchesAvailableDiv: "blank",
            UCSF: true, 
            HLCC: true, 
            Brigham: true, 
            }
        this.onClick1 = this.onClick1.bind(this);
        this.onClick2 = this.onClick2.bind(this);
        this.onClick3 = this.onClick3.bind(this);
        this.onClickAll = this.onClickAll.bind(this);
        this.onClickUCSF = this.onClickUCSF.bind(this);
        this.onClickBrigham = this.onClickBrigham.bind(this);
        this.onClickHLCC = this.onClickHLCC.bind(this);
        this.displayNumberAndTypeOfPatientsTreatedPerDay = this.displayNumberAndTypeOfPatientsTreatedPerDay.bind(this);
        this.displayTypeOfUser = this.displayTypeOfUser.bind(this);
        this.displayNumberOfTimesWeightsAreChanged = this.displayNumberOfTimesWeightsAreChanged.bind(this);
        this.displayNumberOfWeightChangesPerAnatomicalSite = this.displayNumberOfWeightChangesPerAnatomicalSite.bind(this);
        this.displayNumberOfAttemptsOnAverageToImproveAConstant = this.displayNumberOfAttemptsOnAverageToImproveAConstant.bind(this);
        this.displayAverageDissimilarityAcrossMatchesAvailable = this.displayAverageDissimilarityAcrossMatchesAvailable.bind(this);
    }

    testMaker() {
        var myTest = JSON.stringify(this.state.UCSF)
        return (
            <h1>{myTest}</h1>
        )
    }

    onClick1() {
            this.setState({displayNumberAndTypeOfPatientsProcessedPerClinicDiv: "visible",
                    displayNumberAndTypeOfPatientsTreatedPerDayDiv: "visible",
                    displayTypeOfUserDiv: "visible",
                    displayNumberOfTimesWeightsAreChangedDiv: "blank",
                    displayNumberOfWeightChangesPerAnatomicalSiteDiv: "blank",
                    displayNumberOfAttemptsOnAverageToImproveAConstantDiv: "blank",
                    displayAverageDissimilarityAcrossMatchesAvailableDiv: "blank"})
        }


    onClick2() {
            this.setState({displayNumberAndTypeOfPatientsProcessedPerClinicDiv: "blank",
                                displayNumberAndTypeOfPatientsTreatedPerDayDiv: "blank",
                                displayTypeOfUserDiv: "blank",
                                displayNumberOfTimesWeightsAreChangedDiv: "visible",
                                displayNumberOfWeightChangesPerAnatomicalSiteDiv: "visible",
                                displayNumberOfAttemptsOnAverageToImproveAConstantDiv: "blank",
                                displayAverageDissimilarityAcrossMatchesAvailableDiv: "blank"})
        } 

    onClick3() {
            this.setState({displayNumberAndTypeOfPatientsProcessedPerClinicDiv: "blank",
                                displayNumberAndTypeOfPatientsTreatedPerDayDiv: "blank",
                                displayTypeOfUserDiv: "blank",
                                displayNumberOfTimesWeightsAreChangedDiv: "blank",
                                displayNumberOfWeightChangesPerAnatomicalSiteDiv: "blank",
                                displayNumberOfAttemptsOnAverageToImproveAConstantDiv: "visible",
                                displayAverageDissimilarityAcrossMatchesAvailableDiv: "visible"})
        }
    onClickAll() {
        this.setState({
            UCSF: true,
            Brigham: true,
            HLCC: true
        })
    }
    onClickUCSF(){
        this.setState({
            UCSF: true,
            Brigham: false,
            HLCC: false
        })
    }
    onClickBrigham(){
        this.setState({
            UCSF: false,
            Brigham: true,
            HLCC: false
        })
    }
    onClickHLCC(){
        this.setState({
            UCSF: false,
            Brigham: false,
            HLCC: true
        })
    }
    
    displayNumberAndTypeOfPatientsTreatedPerDay() {
        return (<div>
          <Plot
            data={[
              {
                x: [1, 2, 3],
                y: [2, 6, 3],
                type: 'bar'
              }
            ]}
            layout={ {width: 320, height: 240, title: 'Number and Type of Patients Treated Per Day'} }
          /></div>
        );
    }

    displayTypeOfUser() {
        return (<div>
                  <Plot
                    data={[
                      {
                        labels: ['CMD', 'MD', 'PhD', 'Other'],
                        values: [28.6, 28.6, 28.6, 14.3],
                        type: 'pie'
                      }
                    ]}
                    layout={ {width: 320, height: 240, title: 'Type of User'} }
                  /></div>
                );
    }

    displayNumberOfTimesWeightsAreChanged() {
        return (<div>
          <Plot
            data={[
              {
                x: [1, 2, 3],
                y: [2, 6, 3],
                type: 'bar'
              }
            ]}
            layout={ {width: 320, height: 240, title: 'Number of Times Weights are Changed'} }
          /></div>
        );}
    displayNumberOfWeightChangesPerAnatomicalSite() {
        return (<div>
          <Plot
            data={[
              {
                x: [1, 2, 3],
                y: [2, 6, 3],
                type: 'bar'
              }
            ]}
            layout={ {width: 320, height: 240, title: 'Number of Weights Changed per anatomical site'} }
          /></div>
        );}
    displayNumberOfAttemptsOnAverageToImproveAConstant() {
        return (<div>
          <Plot
            data={[
              {
                x: [1, 2, 3],
                y: [2, 6, 3],
                type: 'bar'
              }
            ]}
            layout={ {width: 320, height: 240, title: 'Number of Attempts on Average to Improve a Constant'} }
          /></div>
        );}
    displayAverageDissimilarityAcrossMatchesAvailable() {
        return (<div>
          <Plot
            data={[
              {
                x: [1, 2, 3],
                y: [2, 6, 3],
                type: 'bar'
              }
            ]}
            layout={ {width: 320, height: 240, title: 'Average Dissimilarty Across Matches Available'} }
          /></div>
        );}


/*okay, we need a few different functions. What I want to do is something like
    create a state for the app which stores the options for what to display, so 
    that when we press a button, we change the state, which then automatically 
    updates the displayed data. So what options do we have for what we want to display?
    update: okay, made the state (see above), made the buttons (see below for the buttons
    themselves, see above for functionality), and made the schema for the graphs (see this comment below)

    Customer Health Measurements:
        Number and Type of Patients processed per clinic
            var data = [{
                x: [dates pulled from the CSV],
                y: [range 0 to max of data],
                type: 'bar'
              }]
          Plotly.newPlot('numberAndTypeOfPatientsProcessedPerClinicDiv', data);
        Number and Type of Patients Treated per day
            var traceHeadNeck = {
                x: [dates pulled from the CSV],
                y: [range 0 to max of data],
                name: "Head and Neck",
                type: 'bar'
            };
            var traceLung = {
                x: [dates pulled from the CSV],
                y: [range 0 to max of data],
                name: "Lung",
                type: 'bar'
            };
            var traceProstate = {
                x: [dates pulled from the CSV],
                y: [range 0 to max of data],
                name: "Prostate",
                type: 'bar'
            };
            var data = [traceHeadNeck, traceLung, traceProstate]
            var layout = {barmode: 'stack'};
            Plotly.newPlot('numberAndTypeOfPatientsTreatedPerDayDiv', data);
        Type of User
            var data = [{
                values: [taken from the CSV]
                labels: ['CMD', 'MD', 'Other', 'PhD']
                type: 'pie'
            }];
            var layout = {
                height: 400,
                width: 500
            };
            Plotly.newPlot('typeOfUserDiv', data, layout);

    Ease of Use/Customer Satisfaction
        Number of times weights are changed
            var traceUnsavedWeights = {
                x: ['HN', 'L', 'P'],
                y: [data taken from CSV],
                name: 'Unsaved Weights',
                type: 'bar'
            }
            var traceSavedWeights = {
                x: ['HN', 'L', 'P'],
                y: [data taken from CSV].
                name: 'Saved Weights',
                type: 'bar'
            }
            var data = [traceUnsavedWeights, traceSavedWeights];
            Plotly.newPlot('numberOfTimesWeightsAreChangedDiv', data);
        Average number of weight changes per anatomical site
            var data = [{
                x: ['HN', 'L', 'P'],
                y: [data pulled from CSV]
                type: 'bar'
            }]
            Plotly.newPlot('numberOfWeightChangesPerAnatomicalSiteDiv', data);

    Software Performance Measurement
        Number of attempts on average to improve a constant
            var data = [{
                x: [data pulled from CSV],
                y: [data pulled from CSV],
                type: 'bar'
            }]
            Plotly.newPlot('numberOfAttemptsOnAverageToImproveAConstantDiv', data);
        Average dissimilarity across matches available
            var trace1 = [{
                x: [data pulled from CSV], //there are two lines but they aren't labeled so idk what their deal is
                y: [data pulled from CSV],
                type: 'line'
            }]
            var trace2 = [{
                x: [data pulled from CSV], //this is for the second line, idk what its deal is
                y: [data pulled from CSV],
                type: 'line'
            }]
            var data = [trace1, trace2];
            Plotly.newPlot('averageDissimilarityAcrossMatchesAvailableDiv', data);
    and orthoganally to the above, we can display data from
        UCSF
        Brigham
        HLCC
        All Clinics
    which will affect the 'data pulled from CSV' variables listed above, and nothing else I do believe    
*/


    render() {
        return (
            <div id="wrapper">
                <button onClick={this.onClickAll}>All</button>
                <button onClick={this.onClickUCSF}>UCSF</button>
                <button onClick={this.onClickHLCC}>HLCC</button>
                <button onClick={this.onClickBrigham}>Brigham</button>
                <div></div>
                <button onClick={this.onClick1}>Customer Health Measurements</button>
                <button onClick={this.onClick2}>Ease of Use/Customer Satisfaction</button>
                <button onClick={this.onClick3}>Software Performance Measurement</button>
                <div>
                </div>
                <div id="numberAndTypeOfPatientsProcessedPerClinicDiv" className={this.state.displayNumberAndTypeOfPatientsTreatedPerDayDiv}>{this.displayNumberAndTypeOfPatientsTreatedPerDay()} 1 UCSF: {JSON.stringify(this.state.UCSF)}, Brigham: {JSON.stringify(this.state.Brigham)}, HLCC: {JSON.stringify(this.state.HLCC)}</div>
                <div id="numberAndTypeOfPatientsTreatedPerDayDiv" className={this.state.displayTypeOfUserDiv}>{this.displayTypeOfUser()}2 UCSF: {JSON.stringify(this.state.UCSF)}, Brigham: {JSON.stringify(this.state.Brigham)}, HLCC: {JSON.stringify(this.state.HLCC)}</div>
                <div id="typeOfUserDiv" className={this.state.displayNumberOfTimesWeightsAreChangedDiv}>{this.displayNumberOfTimesWeightsAreChanged()}3 UCSF: {JSON.stringify(this.state.UCSF)}, Brigham: {JSON.stringify(this.state.Brigham)}, HLCC: {JSON.stringify(this.state.HLCC)} </div>
                <div id="numberOfTimesWeightsAreChangedDiv" className={this.state.displayNumberOfTimesWeightsAreChangedDiv}>{this.displayNumberOfTimesWeightsAreChanged()}4 UCSF: {JSON.stringify(this.state.UCSF)}, Brigham: {JSON.stringify(this.state.Brigham)}, HLCC: {JSON.stringify(this.state.HLCC)}</div>
                <div id="numberOfWeightChangesPerAnatomicalSiteDiv" className={this.state.displayNumberOfWeightChangesPerAnatomicalSiteDiv}>{this.displayNumberOfWeightChangesPerAnatomicalSite()}5 UCSF: {JSON.stringify(this.state.UCSF)}, Brigham: {JSON.stringify(this.state.Brigham)}, HLCC: {JSON.stringify(this.state.HLCC)}</div>
                <div id="numberOfAttemptsOnAverageToImproveAConstantDiv" className={this.state.displayNumberOfAttemptsOnAverageToImproveAConstantDiv}>{this.displayNumberOfAttemptsOnAverageToImproveAConstant()}6 UCSF: {JSON.stringify(this.state.UCSF)}, Brigham: {JSON.stringify(this.state.Brigham)}, HLCC: {JSON.stringify(this.state.HLCC)}</div>
                <div id="averageDissimilarityAcrossMatchesAvailableDiv" className={this.state.displayAverageDissimilarityAcrossMatchesAvailableDiv}>{this.displayAverageDissimilarityAcrossMatchesAvailable()}7 UCSF: {JSON.stringify(this.state.UCSF)}, Brigham: {JSON.stringify(this.state.Brigham)}, HLCC: {JSON.stringify(this.state.HLCC)}</div>    
            </div>
        )
     }
}

export default App;
