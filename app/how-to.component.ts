import { Component } from '@angular/core';
import { MaterializeDirective } from "angular2-materialize";

@Component({
	selector: 'howToComponent',
	directives: [MaterializeDirective],
	template: `
	<ul materialize="collapsible" class="collapsible" data-collapsible="accordion">
		<li>
			<div class="collapsible-header"><h5>How To Use ngWorld</h5></div>
			<div class="collapsible-body">
				<p>Step 1: npm install ngWorld</p>
				<p>Step 2: Input data </p>
				<p>Step 3: ??? </p>
				<p>Step 4: Profit </p>
			</div>
		</li>
	</ul>

	`
})

export class howToComponent {
	
}