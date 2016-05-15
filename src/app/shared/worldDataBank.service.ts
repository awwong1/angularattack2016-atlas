import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestMethod, RequestOptions, Request} from '@angular/http';

@Injectable()
export class WorldDataBankService {

  // we were stuck on https://github.com/angular/angular/issues/6583
  // for about 2 hours. so now we're using this https://crossorigin.me
  // because holy shit it is magic for CORS
  private static corsMagic:string = 'https://crossorigin.me/';

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

  execute(url:string):Promise<any> {
    return this.http.get(WorldDataBankService.corsMagic + url)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res:Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body.data || {};
  }

  private handleError(error:any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Promise.reject(errMsg);
  }
}
