import {Component} from '@angular/core';

import {MaterializeDirective} from "angular2-materialize";

import {Country} from "../country";
import {CountryService} from "../country.service";
import {Indicator} from "../indicator";
import {IndicatorService} from "../indicator.service";

@Component({
  selector: 'query-builder',
  templateUrl: 'app/shared/query-builder/query-builder.component.html',
  directives: [MaterializeDirective],
  providers: [CountryService, IndicatorService]
})
export class QueryBuilderComponent {
  private countries:Array<Country> = [];
  private indicators:Array<Indicator> = [];

  constructor(private countryService:CountryService,
              private indicatorService:IndicatorService) {
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
}
