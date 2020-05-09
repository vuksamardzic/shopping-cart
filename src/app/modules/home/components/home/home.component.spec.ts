import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {ProductService} from "../../../../core/services/product.service";
import {DataService} from "../../../../core/services/data.service";
import {LocalStorageService} from "../../../../core/services/local-storage.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {SortArrowPipe} from "../../../../core/pipes/sort-arrow.pipe";
import {Product} from "../../../../core/interfaces/product.interface";
import {CartItemModel} from "../../../../core/model/cart-item.model";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserDynamicTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [
        HomeComponent,
        SortArrowPipe
      ],
      providers: [
        ProductService,
        DataService,
        LocalStorageService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sum total price correctly', () => {
    const products: Product[] = [{
      "id": "5eb2b05602d6c225749abab0",
      "productName": "Axe",
      "price": 15,
      "quantity": 2
    }, {
      "id": "5eb2b0c55ba03d2144c65ca9",
      "productName": "Cable 2m",
      "price": 8.33,
      "quantity": 20
    }];
    component.cartItems = [...products.map(p => new CartItemModel(p))];
    component.sumCartItems();
    expect(component.cartTotalPrice).toEqual(23.33);
  });
});
