import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {ROUTER_PROVIDERS} from '@angular/router';
import {AtlasAppComponent, environment} from './app';

if (environment.production) {
  enableProdMode();
}

bootstrap(AtlasAppComponent, [
  ROUTER_PROVIDERS
]);
