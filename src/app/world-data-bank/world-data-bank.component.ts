import {Component} from '@angular/core';
import {MaterializeDirective} from "angular2-materialize";

@Component({
  selector: 'world-data-bank',
  templateUrl: 'app/world-data-bank/world-data-bank.component.html',
  directives: [MaterializeDirective]
})
export class WorldDataBankComponent {
  title = 'World Data Bank Component';
}
