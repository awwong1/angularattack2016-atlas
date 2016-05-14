import { NgWorldPage } from './app.po';

describe('ng-world App', function() {
  let page: NgWorldPage;

  beforeEach(() => {
    page = new NgWorldPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ng-world works!');
  });
});
