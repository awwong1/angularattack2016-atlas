import {Component} from '@angular/core';
import {MaterializeDirective} from "angular2-materialize";

import {Country} from "../shared/country";
import {CountryService} from "../shared/country.service";

@Component({
  selector: 'world-data-bank',
  templateUrl: 'app/world-data-bank/world-data-bank.component.html',
  directives: [MaterializeDirective],
  providers: [CountryService]
})
export class WorldDataBankComponent {
  private static title = 'World Data Bank Component';
  private static countryOptions:Array<Country>;

  private countryKeys;
  private countries;
  private errorMessage;

  constructor(private countryService:CountryService) {
    this.countryService.getCountries()
      .subscribe(
        countries => {
          console.log('subscribe:');
          console.log(countries);
          this.countryKeys = Object.keys(countries);
          this.countries = countries;
        },
        error => {
          console.log('error:');
          console.log(error);
        }
      );
  }
}
