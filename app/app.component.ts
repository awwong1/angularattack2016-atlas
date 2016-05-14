import { Component } from '@angular/core';
import { MaterializeDirective } from 'angular2-materialize';
import {BodyComponent} from './app-body.component';

@Component({
    selector: 'my-app',
    directives: [MaterializeDirective, BodyComponent],
    template: `
    <div>
      <nav>
        <div class="blue-grey lighten-2 nav-wrapper">
          <a href="#" class="brand-logo" style="margin-left:1%">ngWorld</a>
          <ul class="right hide-on-med-and-down">
            <li><a href="#">Link 1</a></li>
            <li><a href="#">Link 2</a></li>
            <li><a href="#">Link 3</a></li>
          </ul>

          <ul class="side-nav" id="navmobile">
            <li><a href="#">Link 1</a></li>
            <li><a href="#">Link 2</a></li>
            <li><a href="#">Link 3</a></li>
          </ul>
        </div>
      </nav>
      <h1>YOHDOG2</h1>
      <app-body></app-body>
      </div>
      `
})

export class AppComponent { }
