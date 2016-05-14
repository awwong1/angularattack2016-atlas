import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';

import {HeroService} from './hero.service';
import {AppComponent} from './app.component';

import "angular2-materialize";

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HeroService
]);
