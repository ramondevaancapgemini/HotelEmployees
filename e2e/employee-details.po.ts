import { browser, by, element, until, protractor } from 'protractor';

export class EmployeeDetails {

  constructor() { }

  navigateTo() {
    browser.get('/detail/1');
  }

  getHeaderText() {
    return element(by.css('app-employee-detail h1')).getText();
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
    var loader = element(by.className("details"));
    browser.wait(protractor.ExpectedConditions.visibilityOf(loader), 5000, 'Element taking too long to appear in the DOM');
  }
}
