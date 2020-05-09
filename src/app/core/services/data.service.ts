import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class DataService {
  private CART_ITEMS_DATA_SOURCE = new BehaviorSubject<any>([]);
  cartItemsDataSource = this.CART_ITEMS_DATA_SOURCE.asObservable();

  constructor() {
  }

  changeCartItemsDataSource(data: any[]) {
    this.CART_ITEMS_DATA_SOURCE.next(data);
  }
}
