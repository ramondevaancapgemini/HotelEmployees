import { browser, by, element, until, protractor } from 'protractor';

export class EmployeeAdd {

  constructor() { }

  navigateTo() {
    browser.get('/add');
  }

  getHeaderText() {
    return element(by.css('app-employee-add h1')).getText();
  }

  getForm() {
    return element(by.css('form'));
  }

  getFields() {
    return element.all(by.css('input'));
  }

  getButtons() {
    return element.all(by.css('div#buttons .btn'));
  }

  getSubmitButton() {
    return element(by.className('btn-success'));    
  }
}
