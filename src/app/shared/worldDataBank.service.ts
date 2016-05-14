import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {WorldDataBankResponse, DataPoint, Country, Indicator} from './country';

import {Observable} from 'rxjs/observable';

@Injectable()
export class WorldDataBankService {

  constructor(private http:Http) {
  }

  /**
   * Return the Promise of countries data in JSON
   * @returns {any}
   */
  public getCountries():Observable<Country[]> {
    return this.http.get(this.countriesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res:Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Response status: ' + res.status);
    }
    let body = res.json();
    return body || {};
  }

  private handleError(error:any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
