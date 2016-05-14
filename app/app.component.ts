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
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective]
})
export class AppComponent {
    constructor(private router:Router) {
    }

    ngOnInit() {
        this.router.navigate(['/']);
    }
}
