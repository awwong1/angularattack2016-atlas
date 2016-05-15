import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, Routes} from "@angular/router";

import {MaterializeDirective} from "angular2-materialize";

import {MainComponent} from "./main/main.component";
import {WorldDataBankComponent} from "./world-data-bank/world-data-bank.component";

@Routes([
  {path: '/', component: MainComponent},
  {path: '/world-data-bank', component: WorldDataBankComponent},
])
@Component({
  moduleId: module.id,
  selector: 'atlas-app',
  templateUrl: 'atlas.component.html',
  styleUrls: ['atlas.component.css'],
  directives: [ROUTER_DIRECTIVES, MaterializeDirective]
})
export class AtlasAppComponent {
  title = 'Atlas';
  logoimgurl = 'static/img/logo.jpeg';

  constructor(private router:Router) {
  }

  ngOnInit() {
    this.router.navigate(['/']);
  }
}
