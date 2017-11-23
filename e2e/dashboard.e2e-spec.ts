import { Dashboard } from './dashboard.po';

describe('hotel-employees App', () => {
  let page: Dashboard;

  beforeEach(() => {
    page = new Dashboard();
  });

  describe('the homepage', () => {
    it('should contain a dashboard header', () => {
      page.navigateTo();
      expect(page.getHeader()).toEqual('Dashboard');
    });
    it('should contain a kitty image', () => {
      expect(page.getKittyImage()).toBeTruthy();
    });
  });
});
