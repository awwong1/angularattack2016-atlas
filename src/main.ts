import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { NgWorldAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(NgWorldAppComponent);
