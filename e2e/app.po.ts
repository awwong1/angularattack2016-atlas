export class NgWorldPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ng-world-app h1')).getText();
  }
}
