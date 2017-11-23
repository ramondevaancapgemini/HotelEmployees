import { EmployeeAdd } from './employee-add.po';

describe('hotel-employees App', () => {
  let page: EmployeeAdd;

  beforeEach(() => {
    page = new EmployeeAdd();
  });

  describe('the employee add page', () => {
    it('should contain a header', () => {
      page.navigateTo();
      expect(page.getHeaderText()).toEqual('Add Employee');
    });
    it('should contain a form', () => {
      expect(page.getForm()).toBeTruthy();
    });
    it('should contain buttons', () => {
      expect(page.getButtons().count()).toBe(3);
    });
    describe('submit button', () => {
      let submitButton;
      beforeEach(() => {
        submitButton = page.getSubmitButton();
      });
      it('should be disabled when the form is empty', () => {
        expect(submitButton.getAttribute('disabled')).toBeTruthy();
      });
      it('should not be disabled when the form is filled', () => {
        page.getFields().each(field => {
          field.sendKeys('test');
        });
        expect(submitButton.getAttribute('disabled')).toBeFalsy();
      });
    });
  });
});
