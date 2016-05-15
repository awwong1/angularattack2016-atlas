import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/observable';

import {WorldDataBankResponse} from './worldDataBank';

@Injectable()
export class WorldDataBankService {

  // we were stuck on https://github.com/angular/angular/issues/6583
  // for about 2 hours. so now we're using this https://crossorigin.me
  // because holy shit it is magic for CORS
  private static corsMagic:string = 'https://crossorigin.me/';

  constructor(private http:Http) {
  }

  public execute(url:string):Observable<WorldDataBankResponse> {
    return this.http.get(WorldDataBankService.corsMagic + url)
      .map(WorldDataBankService.extractData)
      .catch(WorldDataBankService.handleError);
  }

  private static extractData(res:Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Response status: ' + res.status);
    }
    let body = res.json() || {};
    return body;
  }

  private static handleError(error:any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
