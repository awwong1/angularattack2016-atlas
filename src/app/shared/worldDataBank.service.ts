import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestMethod, RequestOptions, Request} from '@angular/http';
import {WorldDataBankResponse, DataPoint} from './worldDataBank';
import {Country} from './country';
import {Indicator} from './indicator';

import {Observable} from 'rxjs/observable';

@Injectable()
export class WorldDataBankService {
    public url = 'http://api.worldbank.org/countries/CAN/indicators/EG.ELC.ACCS.ZS?per_page=10&date=1960:2016&format=json';

  constructor(private http:Http) {
  }
// Domain you wish to allow
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  //
  // // Request methods you wish to allow
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  //
  // // Request headers you wish to allow
  // res.setHeader('Access-Control-Allow-Headers', 'YOUR-CUSTOM-HEADERS-HERE');
  //
  // // Set to true if you need the website to include cookies in  requests
  // res.setHeader('Access-Control-Allow-Credentials', true);

  execute (): Promise<any> {
      var tokenHeader = new Headers();
      tokenHeader.append('Access-Control-Allow-Origin', '*');
      tokenHeader.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      tokenHeader.append('Access-Control-Allow-Headers', '*');
      var options = new RequestOptions({
          method: RequestMethod.Get,
          url: this.url,
          headers: tokenHeader
      });
      console.log(options);
      var req = new Request(options);
      this.http.request(req)
      .subscribe((res: Response) => {
          console.log(res);
      });

      return this.http.get('/app/shared/query-resource/countries.json')
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
      if (res.status < 200 || res.status >= 300) {
          throw new Error('Bad response status: ' + res.status);
      }
      let body = res.json();
      return body.data || { };
  }

  private handleError (error: any) {
      // In a real world app, we might send the error to remote logging infrastructure
      let errMsg = error.message || 'Server error';
      console.error(errMsg); // log to console instead
      return Promise.reject(errMsg);
  }
}
