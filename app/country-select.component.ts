import { Component } from '@angular/core';
import { MaterializeDirective } from "angular2-materialize";

@Component({
	selector: 'countrySelectComponent',
	directives: [MaterializeDirective],
	template: `
	<div class="input-field col s12">
	    <select materialize="material_select">
	      <option value="" disabled selected>Choose your country(ies) or region(s)</option>
	      <option value="1">Option 1</option>
	      <option value="2">Option 2</option>
	      <option value="3">Option 3</option>
	    </select>
  	</div>

	`
})

export class countrySelectComponent {
	
}