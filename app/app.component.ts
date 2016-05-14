import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {MaterializeDirective} from "angular2-materialize";

import {HeroesComponent} from './heroes.component';
import {HeroDetailComponent} from './hero-detail.component';
import {DashboardComponent} from './dashboard.component';
import {HeroService} from './hero.service';

@Component({
    selector: 'my-app',
    template: `
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo">ngWorld</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a [routerLink]="['Dashboard']">Dashboard</a></li>
          <li><a [routerLink]="['Heroes']">Heroes</a></li>
        </ul>
      </div>
    </nav>
    <ul materialize="collapsible" class="collapsible" data-collapsible="accordion">
      <li>
        <div class="collapsible-header"><h1>{{title}}</h1></div>
        <div class="collapsible-body"><p></p></div>
      </li>
      <li>
        <div class="collapsible-header">Second</div>
        <div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
      </li>
      <li>
        <div class="collapsible-header">Third</div>
        <div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
      </li>
    </ul>
    <router-outlet></router-outlet>
  `,
    directives: [MaterializeDirective, ROUTER_DIRECTIVES],
    providers: [HeroService]
})
@RouteConfig([
    // {path: '/', redirectTo: ['Dashboard'] },
    {path: '/dashboard', name: 'Dashboard', component: DashboardComponent, useAsDefault: true},
    {path: '/heroes', name: 'Heroes', component: HeroesComponent},
    {path: '/detail/:id', name: 'HeroDetail', component: HeroDetailComponent}
])
export class AppComponent {
    title = 'Angular World Data Bank';
}
