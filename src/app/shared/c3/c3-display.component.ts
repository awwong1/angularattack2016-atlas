import {Component, EventEmitter, Input, OnChanges, SimpleChange} from '@angular/core';
import {MaterializeDirective} from "angular2-materialize";
import {WorldDataBankService} from "../worldDataBank.service";
import {DataPoint} from '../dataPoint';
import * as c3 from "c3";

interface CountryData {
    data:Array<number>;
}

@Component({
  selector: 'c3-display',
  templateUrl: 'app/shared/c3/c3-display.component.html',
  directives: [MaterializeDirective],
  providers: [WorldDataBankService],
  outputs:['chartRenderComplete']
})

export class C3DisplayComponent implements OnChanges{
    public chartRenderComplete: EventEmitter<boolean> = new EventEmitter();
    private dataPoints:Array<DataPoint> = [];
    private showChart:boolean = false;
    private userMessage:String = "";
    @Input() dataLoaded:boolean;
    constructor(
              private worldDataBankService:WorldDataBankService) {
             
    }
    // This monitors for changes in the parent supplied parameters, in this case "dataLoaded"
    // We use it to let this component know when to start creating a C3 chart.
 ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    
    // Load in the json data points then emit an event to notify wdb component to stop loading animation, and show the c3 component
    if(this.dataLoaded ==true){
        this.dataPoints = this.worldDataBankService.getDataPoints();
        //                      !
        //                     !!!
        //                    !!!!!
        //                   !!!!!!!
        // Here you would format the datapoints and load them into c3 chart!
        //                   !!!!!!!
        //                    !!!!!
        //                     !!!
        //                      !
        
        // What we want to track
        var countryData : { [country:string] : CountryData }  = {}; 
        
        var dataColumns = [['Year']];
        var country = "";
        var counter = 0;
        var valueNum:number = 0;
        for (var dataPoint of this.dataPoints) {
           if (country != dataPoint.country.name) {
               country = dataPoint.country.name;
               dataColumns.push([country]);
               counter += 1;
           }
           if (dataPoint.value != null) {
            dataColumns[counter].push(dataPoint.value);
            
            if (!(dataColumns[0].indexOf(dataPoint.value) > -1)) {
                dataColumns[0].push(dataPoint.date);
            }
           }
          
        } 
        
        
        var chart = c3.generate({
            bindto: '#chart',
            data: {
                x: 'Year', 
                columns: dataColumns,
            }
        });
        
        console.log(this.dataPoints);
        this.showChart = true;
        this.chartRenderComplete.emit(true);
    }
    if(this.dataLoaded == false){
        // A new query has been executed, clear the data and hide the chart.
        this.showChart = false;
        this.dataPoints = [];
    }
  }
}