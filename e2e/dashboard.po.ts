import { browser, by, element } from 'protractor';

export class Dashboard {

  constructor() { }

  navigateTo() {
    browser.get('/dashboard');
  }

  getHeader() {
    return element(by.css('app-dashboard h1')).getText();
  }

  getKittyImage() {
    return element(by.css('app-dashboard img'));
  }
}
