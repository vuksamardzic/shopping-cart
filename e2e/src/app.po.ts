import {browser, by, element, ElementArrayFinder, ElementFinder} from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('sc-root footer small')).getText() as Promise<string>;
  }

  getTableElements(): ElementArrayFinder {
    return element.all(by.css('tbody tr')) as ElementArrayFinder;
  }

  getFirstTableElement(): ElementFinder {
    return element.all(by.css('tbody button.btn')).first() as ElementFinder;
  }

  getCartButton(): ElementFinder {
    return element(by.css('nav .badge')) as ElementFinder;
  }

  getCartDeleteButton(): ElementFinder {
    return element(by.css('.modal-body .btn.badge.btn-danger')) as ElementFinder;
  }
}
