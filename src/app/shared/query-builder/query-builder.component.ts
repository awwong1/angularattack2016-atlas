import {Component} from '@angular/core';

import {MaterializeDirective} from "angular2-materialize";

import {Country} from "../country";
import {CountryService} from "../country.service";
import {Indicator} from "../indicator";
import {IndicatorService} from "../indicator.service";
import {WorldDataBankService} from "../worldDataBank.service";

@Component({
  selector: 'query-builder',
  templateUrl: 'app/shared/query-builder/query-builder.component.html',
  directives: [MaterializeDirective],
  providers: [CountryService, IndicatorService, WorldDataBankService]
})

export class QueryBuilderComponent {
  private countries:Array<Country> = [];
  private indicators:Array<Indicator> = [];
  private startDate:string;
  private endDate:string;
  private indicator:string;


  constructor(private countryService:CountryService,
              private indicatorService:IndicatorService,
              private worldDataBankService:WorldDataBankService) {
    this.countryService.getCountries()
      .subscribe(
        countries => {
          this.countries = countries;
        },
        error => {
          console.log('error:');
          console.log(error);
        }
      );
    this.indicatorService.getIndicators()
      .subscribe(
        indicators => {
          this.indicators = indicators;
        },
        error => {
          console.log('error:');
          console.log(error);
        }
      )
  }

  generateRequest = function () {
    // Months are zero indexed in javascript, but the API request requirs "1" indexed, so add 1.
    var startMonth:number = new Date(this.startDate).getMonth() + 1;
    var startYear:number = new Date(this.startDate).getFullYear();
    var endMonth:number = new Date(this.endDate).getMonth() + 1;
    var endYear:number = new Date(this.endDate).getFullYear();
    var indicatorCode:string = this.indicator;
    var countryList = "";
    var resultQuery = "http://api.worldbank.org/countries/"
    //BHS/indicators/AG.LND.TRAC.ZS?per_page=100&date=1960:2016&format=json
    var selectedCountries = this.countries.filter((item) => {
      return item.selected === true;
    });
    for (var country in selectedCountries) {
      countryList += selectedCountries[country].id + ";";
    }
    //Remove trailing semi-colon, may not be necesssary
    countryList = countryList.slice(0, -1);

    // This query includes the months, but those seem to break the year range, so I'm just going with the year range for now
    //resultQuery += countryList+"/indicators/"+indicatorCode+"?per_page=10000&date="+startYear+"M"+this.pad(startMonth)+":"+endYear+"M"+this.pad(endMonth)+"&format=json"
    resultQuery += countryList + "/indicators/" + indicatorCode + "?per_page=10000&date=" + startYear + ":" + endYear + "&format=json";
    console.log(resultQuery);
    this.worldDataBankService.execute(resultQuery).subscribe(
      worldDataBankResponse => {
        console.log(worldDataBankResponse);
      },
      error => {
        console.log('error:');
        console.log(error);
      }
    );
    // console.log(startYear);

  };
  // From this work-around: http://stackoverflow.com/a/37178512/2388906
  // (Don't worry, I upvoted it)
  setSelected = function (selectElement) {

    for (var i = 0; i < selectElement.options.length; i++) {
      var optionElement = selectElement.options[i];
      var optionModel = this.countries[i];

      if (optionElement.selected == true) {
        optionModel.selected = true;
      }
      else {
        optionModel.selected = false;
      }
    }
  }

  pad = function (month) {
    var s = month + "";
    if (s.length < 2) s = "0" + s;
    return s;
  }
}
