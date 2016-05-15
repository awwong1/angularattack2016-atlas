import {Component} from '@angular/core';
import {MaterializeDirective} from "angular2-materialize";

@Component({
  selector: 'world-data-bank',
  templateUrl: 'app/main/main.component.html',
  directives: [MaterializeDirective],
  styleUrls: ['app/main/main.component.css']
})


export class MainComponent {
  title = 'Main Page';
  astroimgurl = 'static/img/astro.jpeg';
  spaceimgurl = 'static/img/space.jpeg';
  nightimgurl = 'static/img/night.jpeg';
  rocketimgurl = 'static/img/rocket.jpeg';
}
