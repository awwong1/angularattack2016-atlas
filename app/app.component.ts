import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {MaterializeDirective} from "angular2-materialize";

import {HeroesComponent} from './heroes.component';
import {HeroDetailComponent} from './hero-detail.component';
import {DashboardComponent} from './dashboard.component';
import {HeroService} from './hero.service';
import {howToComponent} from './howto.component';

@Component({
    selector: 'my-app',
    template: `
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo" style="margin-left:1%">{{title}}</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>How To Instructions</li>
          <li><a [routerLink]="['Heroes']">Heroes</a></li>
        </ul>
      </div>
    </nav>

    <howToComponent></howToComponent>

    <router-outlet></router-outlet>
  `,
    directives: [MaterializeDirective, ROUTER_DIRECTIVES, howToComponent],
    providers: [HeroService]
})

@RouteConfig([
    // {path: '/', redirectTo: ['Dashboard'] },
    {path: '/dashboard', name: 'Dashboard', component: DashboardComponent, useAsDefault: true},
    {path: '/heroes', name: 'Heroes', component: HeroesComponent},
    {path: '/detail/:id', name: 'HeroDetail', component: HeroDetailComponent}
])

export class AppComponent {
    title = 'ngWorld';
    longTitle = 'Angular World Data Bank';
}
