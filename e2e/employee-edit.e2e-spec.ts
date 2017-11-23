import { EmployeeEdit } from './employee-edit.po';

describe('hotel-employees App', () => {
  let page: EmployeeEdit;

  beforeEach(() => {
    page = new EmployeeEdit();
  });

  describe('the employee edit page', () => {
    it('is contains a loading symbol on loading', () => {
      page.navigateTo();
      expect(page.getLoadingSymbol()).toBeTruthy();
    });
    it('should contain a header', () => {
      expect(page.getHeaderText()).toEqual('Employee Form');
    });
    it('should contain a form after loading', () => {
      page.waitForContent();
      expect(page.getForm()).toBeTruthy();
    });
  });
});
