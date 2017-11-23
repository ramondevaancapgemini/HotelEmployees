import { browser, by, element, until, protractor } from 'protractor';

export class EmployeeEdit {

  constructor() { }

  navigateTo() {
    browser.get('/edit/1');
  }

  getHeaderText() {
    return element(by.css('app-employee-edit h1')).getText();
  }

  getLoadingSymbol() {
    return element(by.className('fa-spin'));
  }

  getForm() {
    return element(by.css('form'));
  }

  waitForContent() {
    const loader = element(by.id('content'));
    browser.wait(protractor.ExpectedConditions.visibilityOf(loader), 5000, 'Element taking too long to appear in the DOM');
  }
}
