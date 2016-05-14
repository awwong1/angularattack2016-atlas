import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {AtlasAppComponent, environment} from './app';

if (environment.production) {
  enableProdMode();
}

bootstrap(AtlasAppComponent);
