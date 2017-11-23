import { EmployeeDetails } from './employee-details.po';

describe('hotel-employees App', () => {
  let page: EmployeeDetails;

  beforeEach(() => {
    page = new EmployeeDetails();
  });

  describe('the employee edit page', () => {
    it('is contains a loading symbol on loading', () => {
      page.navigateTo();
      expect(page.getLoadingSymbol()).toBeTruthy();
    });
    it('should contain a header', () => {
      expect(page.getHeaderText()).toEqual('Employee Details');
    });
    it('should contain details after loading', () => {
      page.waitForContent();
      expect(page.getDetails()).toBeTruthy();
    });
    it('should contain buttons after loading', () => {
      expect(page.getButtons().count()).toBe(3);
    });
  });
});
