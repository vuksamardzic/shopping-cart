import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {
  private KEY = 'sc-data';

  constructor() {
  }

  getLocalStorage(key: string = this.KEY): any {
    return JSON.parse(localStorage.getItem(key));
  }

  saveToLocalStorage(value: any, key: string = this.KEY): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  clearLocalStorage(key: string = this.KEY): void {
    localStorage.removeItem(key);
  }
}
