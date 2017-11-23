import { browser, by, element, until, protractor } from 'protractor';

export class EmployeeDelete {

  constructor() { }

  navigateTo() {
    browser.get('/delete/1');
  }

  getHeaderText() {
    return element(by.css('app-employee-delete h1')).getText();
  }

  getLoadingSymbol() {
    return element(by.className('fa-spin'));
  }

  getDetails() {
    return element(by.className('details'));
  }

  getButtons() {
    return element.all(by.css('div#buttons .btn'));
  }

  waitForContent() {
    const loader = element(by.className('details'));
    browser.wait(protractor.ExpectedConditions.visibilityOf(loader), 5000, 'Element taking too long to appear in the DOM');
  }
}
