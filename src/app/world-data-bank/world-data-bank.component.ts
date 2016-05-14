import {Component} from '@angular/core';
import {QueryBuilderComponent} from "../shared/query-builder/query-builder.component";
import {WorldDataBankService} from "../shared/worldDataBank.service";

@Component({
  selector: 'world-data-bank',
  templateUrl: 'app/world-data-bank/world-data-bank.component.html',
  directives: [QueryBuilderComponent],
  providers: [WorldDataBankService]
})
export class WorldDataBankComponent {
  private title:String = '';

  constructor(worldDataBankService:WorldDataBankService) {
      worldDataBankService.execute();
      this.title = 'World Data Bank';
  }
}
