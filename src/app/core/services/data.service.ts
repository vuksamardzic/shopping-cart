import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class DataService {
  private _cartItemsDataSource = new BehaviorSubject<any>([]);
  cartItemsDataSource = this._cartItemsDataSource.asObservable();

  constructor() {
  }

  changeCartItemsDataSource(data: any[]) {
    this._cartItemsDataSource.next(data);
  }
}
