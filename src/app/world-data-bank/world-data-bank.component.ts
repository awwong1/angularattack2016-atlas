import {Component} from '@angular/core';
import {QueryBuilderComponent} from "../shared/query-builder/query-builder.component";
import {C3DisplayComponent} from "../shared/c3/c3-display.component";

@Component({
  selector: 'world-data-bank',
  templateUrl: 'app/world-data-bank/world-data-bank.component.html',
  directives: [QueryBuilderComponent, C3DisplayComponent],
  styleUrls:['static/css/spinner.css']
})
export class WorldDataBankComponent {
  private title:String = '';
  private loading:boolean = false;
  public wdbServiceComplete:boolean = false;
  private showChart:boolean = false;
  
  constructor() {
      this.title = 'World Data Bank';
  }
  // Fires when the "generate chart" button is pressed.
  startLoading = function(arg){
    //  console.log(arg+" The event fired");
     this.loading = true;
     
     // Reset the wdbServiceComplete var to false, so that the chart will clear so we can load a new query
     this.wdbServiceComplete = false;
    //  console.log(this.loading);
  }
  // Fires when the word-data-bank service finishes loading the data points from the api request.
  wdbServiceFinished = function(arg){
    // console.log("wdbService has finished");
    this.wdbServiceComplete = true;
  }
  stopLoadingAnimation = function(arg){
    // console.log("Chart is ready, loading has finished");
    this.loading = false;
    this.showChart = true;
  }
}
