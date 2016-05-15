import {Injectable}     from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {Indicator} from './indicator';

@Injectable()
export class IndicatorService {
  private indicatorsUrl:string = '/app/shared/query-resource/indicators.json';

  constructor(private http:Http) {
    this.http = http;
  }

  /**
   * Return the Promise of indicator data in JSON
   * @returns {any}
   */
  public getIndicators():Observable<Indicator[]> {
    return this.http.get(this.indicatorsUrl)
      .map(IndicatorService.extractData)
      .catch(IndicatorService.handleError);
  }

  private static extractData(res:Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Response status: ' + res.status);
    }
    let body = res.json() || {};
    let fullIndicatorNames:Array<string> = Object.keys(body);
    let indicators:Array<Indicator> = [];

    for (var fullIndicatorName of fullIndicatorNames) {
      let indicator = new Indicator();
      indicator.name = fullIndicatorName;
      indicator.id = body[fullIndicatorName];
      indicators.push(indicator);
    }
    return indicators;
  }

  private static handleError(error:any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
