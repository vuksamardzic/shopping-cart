import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "./config.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Product} from "../interfaces/product.interface";
import {BasicResponse} from "../interfaces/basic-response.interface";
import {SortOrderEnum} from "../enums/sort-order.enum";

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<any> {
    return this.http.get(ConfigService.getProductUrl())
      .pipe(map((response: BasicResponse) => response.data));
  }

  searchByProductName(text: string, products: Product[]): Product[] {
    let filteredProducts = products.filter(product => {
      const term = text.toLowerCase();
      return product.productName.toLowerCase().includes(term);
    });
    console.log('[ search :: ]', filteredProducts);
    return filteredProducts;
  }

  sortProductsByPrice(sortOrder: string, products: Product[]): Product[] {
    console.log('[ sort :: ]', products);
    if (sortOrder === SortOrderEnum.DESC) {
      return products.sort((a, b) => b.price - a.price);
    } else if (sortOrder === SortOrderEnum.ASC) {
      return products.sort((a, b) => a.price - b.price);
    }
    return products;
  }

  toggleSortOrder(sortOrder: SortOrderEnum): SortOrderEnum {
    if (sortOrder === SortOrderEnum.ASC) {
      return SortOrderEnum.DESC;
    } else if (sortOrder === SortOrderEnum.DESC) {
      return SortOrderEnum.NONE;
    }
    return SortOrderEnum.ASC;
  }
}
