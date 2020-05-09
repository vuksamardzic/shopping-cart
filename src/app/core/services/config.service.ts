import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
  static URL = 'https://vs-shopping-cart.herokuapp.com/api/v1';

  constructor() {
  }

  static getProductUrl(): string {
    return `${this.URL}/product`;
  }
}
