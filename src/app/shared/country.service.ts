import {Injectable}     from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {Country}           from './country';

@Injectable()
export class CountryService {
  private countriesUrl = '/app/shared/query-resource/countries.json';

  constructor(private http:Http) {
    this.http = http;
  }

  /**
   * Return the Promise of countries data in JSON
   * @returns {any}
   */
  public getCountries():Observable<Country[]> {
    return this.http.get(this.countriesUrl)
      .map(CountryService.extractData)
      .catch(CountryService.handleError);
  }

  private static extractData(res:Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Response status: ' + res.status);
    }
    let body = res.json() || {};
    let fullCountryNames:Array<string> = Object.keys(body);
    let countries:Array<Country> = [];

    for (var fullCountryName of fullCountryNames) {
      let country = new Country();
      country.name = fullCountryName;
      country.id = body[fullCountryName];
      countries.push(country);
    }
    return countries;
  }

  private static handleError(error:any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
