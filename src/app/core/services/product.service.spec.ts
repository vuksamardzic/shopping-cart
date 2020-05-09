import {TestBed} from '@angular/core/testing';

import {ProductService} from './product.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SortOrderEnum} from "../enums/sort-order.enum";
import {Product} from "../interfaces/product.interface";

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should pass correct sort order', () => {
    const currentOrder: SortOrderEnum = SortOrderEnum.ASC;
    const newOrder = service.toggleSortOrder(currentOrder);
    expect(newOrder).toBe(SortOrderEnum.DESC);
  });

  it('should return filtered product', () => {
    const products: Product[] = [
      {
        "id": "5eb2b05602d6c225749abab0",
        "productName": "Axe",
        "price": 15,
        "quantity": 2
      }, {
        "id": "5eb2b07f5ba03d2144c65ca8",
        "productName": "Pipe C30",
        "price": 2,
        "quantity": 23
      }, {
        "id": "5eb2b0c55ba03d2144c65ca9",
        "productName": "Cable 2m",
        "price": 8.33,
        "quantity": 20
      }
    ];
    const expectedResult: Product[] = [
      {
        "id": "5eb2b05602d6c225749abab0",
        "productName": "Axe",
        "price": 15,
        "quantity": 2
      }
    ];
    const term = 'Ax';
    let filteredProducts: Product[] = service.searchByProductName(term, products);
    expect(filteredProducts).toEqual(expectedResult);
  });
});
