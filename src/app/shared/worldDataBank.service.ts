import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/observable';

import {Country} from './country';
import {DataPoint} from './dataPoint';
import {Indicator} from './indicator';

@Injectable()
export class WorldDataBankService {
  private static dataPoints:Array<DataPoint> = [];
  // we were stuck on https://github.com/angular/angular/issues/6583
  // for about 2 hours. so now we're using this https://crossorigin.me
  // because holy shit it is magic for CORS
  private static corsMagic:string = 'https://crossorigin.me/';

  constructor(private http:Http) {
  }
  public getDataPoints= function() {
    // console.log(WorldDataBankService.dataPoints);
    return WorldDataBankService.dataPoints;
  }
  public execute(url:string):Observable<DataPoint[]> {
    return this.http.get(WorldDataBankService.corsMagic + url)
      .map(WorldDataBankService.extractData)
      .catch(WorldDataBankService.handleError);
  }

  private static extractData(res:Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Response status: ' + res.status);
    }
    let body = res.json() || [];
    // let dataPoints:Array<DataPoint> = [];
    // response should be an array of length 1 on nodata/error or length 2 on daa
    if (body.length === 2) {
      for (var rawDataPoint of body[1]) {
        let dataPoint = new DataPoint();

        let country = new Country();
        country.id = rawDataPoint.country.id;
        country.name = rawDataPoint.country.value;
        dataPoint.country = country;

        let indicator = new Indicator();
        indicator.id = rawDataPoint.indicator.id;
        indicator.name = rawDataPoint.indicator.value;
        dataPoint.indicator = indicator;

        dataPoint.date = rawDataPoint.date;
        dataPoint.decimal = rawDataPoint.decimal;
        dataPoint.value = rawDataPoint.value;

        WorldDataBankService.dataPoints.push(dataPoint);
      }
    }
    return true;
  }
  
  private static handleError(error:any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
