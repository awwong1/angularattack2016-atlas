import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router';
import {AtlasAppComponent, environment} from './app';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

if (environment.production) {
  enableProdMode();
}

bootstrap(AtlasAppComponent, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS
]);
