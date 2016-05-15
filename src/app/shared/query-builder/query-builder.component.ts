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
  providers: [CountryService, IndicatorService, WorldDataBankService],
  styleUrls:["static/css/spinner.css"]
})

export class QueryBuilderComponent {
  private countries:Array<Country> = [];
  private indicators:Array<Indicator> = [];
  private startDate:string;
  private endDate:string;
  private indicator:string;
  private loading: boolean = false;
  // variables for input countries tags
  private inputCountries:string = "";
  private inputCountriesSuggestions:Array<Country> = [];

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
    var resultQuery = "http://api.worldbank.org/countries/";

    this.loading = (this.loading === false)? true: false;
    console.log(this.loading);



    var selectedCountries:Array<Country> = [];

    var rawCountryNames:Array<string> = this.inputCountries.split("|");
    for (var rawCountryName of rawCountryNames) {
      for (var actualCountry of this.countries) {
        if (rawCountryName.trim() === actualCountry.name){
          selectedCountries.push(actualCountry);
          break;
        }
      }
    }

    for (var country in selectedCountries) {
      if (!(selectedCountries.hasOwnProperty(country))) continue;
      countryList += selectedCountries[country].id + ";";
    }
    //Remove trailing semi-colon, may not be necesssary
    countryList = countryList.slice(0, -1);

    // This query includes the months, but those seem to break the year range, so I'm just going with the year range for now
    //resultQuery += countryList+"/indicators/"+indicatorCode+"?per_page=10000&date="+startYear+"M"+this.pad(startMonth)+":"+endYear+"M"+this.pad(endMonth)+"&format=json"
    resultQuery += countryList + "/indicators/" + indicatorCode + "?per_page=10000&date=" + startYear + ":" + endYear + "&format=json";
    this.worldDataBankService.execute(resultQuery).subscribe(
      worldDataBankResponse => {
        // todo: Do something with this
        console.log(worldDataBankResponse);
      },
      error => {
        console.log('error:');
        console.log(error);
      }
    );
    // console.log(startYear);

  };


  /**
   * Super gross hacked together auto complete, because I don't like the multiple select css
   * @param $event
   */
  countriesInputChanged($event) {
    if ($event.keyIdentifier === "Enter" && this.inputCountriesSuggestions.length > 0) {
      var suggestion:Country = this.inputCountriesSuggestions[0];
      var sepIndex:number = this.inputCountries.lastIndexOf("|");
      if (sepIndex < 0) {
        this.inputCountries = suggestion.name + " | ";
      } else {
        this.inputCountries = this.inputCountries.substring(0, sepIndex + 1) + " " + suggestion.name + " | ";
      }
    }
    this.repopulateSuggestions();
  }

  /**
   * Gross hacked together auto complete if a user clicks something instead of hitting enter
   * @param country
   */
  countriesInputClicked(country:Country) {
    var sepIndex:number = this.inputCountries.lastIndexOf("|");
    if (sepIndex < 0) {
      this.inputCountries = country.name + " | ";
    } else {
      this.inputCountries = this.inputCountries.substring(0, sepIndex + 1) + " " + country.name + " | ";
    }
    this.repopulateSuggestions();
  }

  /**
   * Repopulate the search suggestions based on the search state
   */
  repopulateSuggestions() {
    this.inputCountriesSuggestions = [];
    if (this.inputCountries !== "") {
      let sepIndex:number = this.inputCountries.lastIndexOf("|");
      if (sepIndex === -1) {
        sepIndex = 0;
      } else {
        sepIndex += 1;
      }
      let searchString = this.inputCountries.substring(sepIndex, this.inputCountries.length);
      searchString = searchString.trim();
      if (searchString.trim() === "") {
        this.inputCountriesSuggestions = [];
      } else {
        for (var hintCountry of this.countries) {
          let index = hintCountry.name.toLowerCase().search(searchString.toLowerCase());
          if (index !== -1) this.inputCountriesSuggestions.push(hintCountry);
        }
      }
    }
  }
}
