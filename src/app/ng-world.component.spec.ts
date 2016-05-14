import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { NgWorldAppComponent } from '../app/ng-world.component';

beforeEachProviders(() => [NgWorldAppComponent]);

describe('App: NgWorld', () => {
  it('should create the app',
      inject([NgWorldAppComponent], (app: NgWorldAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'ng-world works!\'',
      inject([NgWorldAppComponent], (app: NgWorldAppComponent) => {
    expect(app.title).toEqual('ng-world works!');
  }));
});
