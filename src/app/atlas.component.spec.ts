import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { AtlasAppComponent } from '../app/atlas.component';

beforeEachProviders(() => [AtlasAppComponent]);

describe('App: Atlas', () => {
  it('should create the app',
      inject([AtlasAppComponent], (app: AtlasAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'ng-world works!\'',
      inject([AtlasAppComponent], (app: AtlasAppComponent) => {
    expect(app.title).toEqual('Atlas works!');
  }));
});
