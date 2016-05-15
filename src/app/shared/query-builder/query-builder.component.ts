import {Component, EventEmitter} from '@angular/core';

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
  styleUrls:["static/css/spinner.css", "static/css/query-builder.css"],
  outputs:['serviceStartEvent', 'serviceEndEvent']
})

export class QueryBuilderComponent {
  private countries:Array<Country> = [];
  private tIndicators:Array<Indicator> = [];
  private startDate:number = new Date().getFullYear() - 15;
  private endDate:number = new Date().getFullYear();
  private indicator:string;
  private loading: boolean = false;
  // variables for input countries tags
  private inputCountries:string = "";
  private inputCountriesSuggestions:Array<Country> = [];
  private inputErrors = "";
  
  public serviceStartEvent: EventEmitter<boolean> = new EventEmitter();
  public serviceEndEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(private countryService:CountryService,
              private indicatorService:IndicatorService,
              private worldDataBankService:WorldDataBankService) {
    let testIndicator = new Indicator();
    testIndicator.name = 'test';
    testIndicator.id = 'testId';
    this.tIndicators.push(testIndicator);

    console.log('getting countries');
    this.countryService.getCountries()
      .subscribe(
        countries => {
          console.log('got countries');
          for (var tCountry of countries) {
            this.countries.push(tCountry);
          }
        },
        error => {
          console.log('error:');
          console.log(error);
        }
      );
    console.log('getting indicators');
    this.indicatorService.getIndicators()
      .subscribe(
        indicators => {
          console.log('got indicators');
          for (var tIndicator of indicators) {
            this.tIndicators.push(tIndicator);
          }
        },
        error => {
          console.log('error:');
          console.log(error);
        }
      )
  }

  generateRequest = function () {
    // If we're loading, don't generate a new request
    if (this.loading) {
      return;
    }
    
    // Months are zero indexed in javascript, but the API request requirs "1" indexed, so add 1.
    var startYear:number = this.startDate;
    var endYear:number = this.endDate;
    var indicatorCode:string = this.indicator;
    var countryList = "";
    var resultQuery = "http://api.worldbank.org/countries/";

    // get all of the countries from that gross :poop: auto complete implementation
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

    if (selectedCountries.length === 0) {
      this.inputErrors = "Please enter valid countries.";
      return;
    }
    
    if (!indicatorCode) {
      this.inputErrors = "Please select an indicator code.";
      return;
    }
    
    if (!startYear) {
      this.inputErrors = "Please select a valid start year (must be greater than or equal to 1960, and less than the end year).";
      return;
    }
    
    if (!endYear) {
      this.inputErrors = "Please select a valid end year (must be less than or equal to the current year, and greater than the start year)";
      return;
    }
    if(startYear>endYear){
      this.inputErrors = "Start year must be less than end year";
      return;
    }
    
    this.inputErrors = "";
    
    this.loading = true;
    this.serviceStartEvent.emit(true);
    
    for (var country in selectedCountries) {
      if (!(selectedCountries.hasOwnProperty(country))) continue;
      countryList += selectedCountries[country].id + ";";
    }
    //Remove trailing semi-colon, may not be necesssary
    countryList = countryList.slice(0, -1);

    // This query includes the months, but those seem to break the year range
    // so I'm just going with the year range for now
    resultQuery += countryList + "/indicators/" + indicatorCode + "?per_page=10000&date=" + 
      startYear + ":" + endYear + "&format=json";
    this.worldDataBankService.execute(resultQuery).subscribe(
      worldDataBankResponse => {
        this.loading = false;
        
        // This event tells the wbd component that the json response has be recieved.
        this.serviceEndEvent.emit(true);
      },
      error => {
        this.loading = false;
        console.log('error:');
        console.log(error);
      }
    );

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
