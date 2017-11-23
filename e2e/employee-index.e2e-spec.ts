import { Employee } from './employee-index.po';

describe('hotel-employees App', () => {
  let page: Employee;

  beforeEach(() => {
    page = new Employee();
  });

  describe('the employee index', () => {
    it('should contain a header', () => {
      page.navigateTo();
      expect(page.getHeaderText()).toEqual('Employees');
    });
    it('should have an add button', () => {
      expect(page.getAddButton()).toBeTruthy();
    });
    it('should have a filter field', () => {
      expect(page.getFilterField()).toBeTruthy();
    });
    it('should have a page limit dropdown', () => {
      const dropdown = page.getFilterField();
      expect(dropdown).toBeTruthy();
      dropdown.click();
      expect(page.getPageLimitItems().count()).toBe(3);
    });
    it('should have a table', () => {
      expect(page.getTable()).toBeTruthy();
    });
    it('should have table pagination', () => {
      expect(page.getPagination()).toBeTruthy();
    });
  });
});
