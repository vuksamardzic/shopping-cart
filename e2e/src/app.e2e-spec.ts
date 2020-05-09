import {AppPage} from './app.po';
import {browser, logging} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display footer text', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('© 2020 Vuk Samardžić');
  });

  it('should display table row length', () => {
    expect(page.getTableElements().count()).toBe(7);
  });

  it('should add first product to cart', () => {
    page.getFirstTableElement().click();
    expect(page.getCartButton().getText()).toBe('1');
  });

  it('should open cart and remove item', () => {
    page.getCartButton().click();
    page.getCartDeleteButton().click();
    expect(page.getCartButton().getText()).toBe('0');
  });

  it('should display cart items length', () => {
    expect(page.getCartButton().getText()).toBe('0');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
