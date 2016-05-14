import {Component} from '@angular/core';

import {MaterializeDirective} from "angular2-materialize";

import {Country} from "../country";
import {CountryService} from "../country.service";

@Component({
  selector: 'query-builder',
  templateUrl: 'app/shared/query-builder/query-builder.component.html',
  directives: [MaterializeDirective],
  providers: [CountryService]
})
export class QueryBuilderComponent {
  private countries:Array<Country> = [];

  constructor(private countryService:CountryService) {
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
  }
}
