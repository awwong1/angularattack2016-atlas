import {Component} from '@angular/core';
import {QueryBuilderComponent} from "../shared/query-builder/query-builder.component";

@Component({
  selector: 'world-data-bank',
  templateUrl: 'app/world-data-bank/world-data-bank.component.html',
  directives: [QueryBuilderComponent]
})
export class WorldDataBankComponent {
  private title:String = '';

  constructor() {
    this.title = 'World Data Bank';
  }
}
