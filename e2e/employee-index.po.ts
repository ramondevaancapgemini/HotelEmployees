import { browser, by, element } from 'protractor';

export class Employee {

  constructor() { }

  navigateTo() {
    browser.get('/employees');
  }

  getHeaderText() {
    return element(by.css('app-employee-index h1')).getText();
  }

  getAddButton() {
    return element(by.id('add-button'));
  }

  getFilterField() {
    return element(by.id('filter'));
  }

  getPageLimit() {
    return element(by.id('page-limit'));
  }

  getPageLimitItems() {
    return element.all(by.className('dropdown-item'));
  }

  getTable() {
    return element(by.css('app-employee-index table'));
  }

  getPagination() {
    return element(by.id('pagination'));
  }
}
