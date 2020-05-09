import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../../core/services/product.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Product} from '../../../../core/interfaces/product.interface';
import {SortOrderEnum} from '../../../../core/enums/sort-order.enum';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../../core/services/data.service';
import {CartItemModel} from '../../../../core/model/cart-item.model';
import {IBANValidator} from '../../../../core/validators/iban.validator';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../../../core/services/local-storage.service';

@Component({
  selector: 'sc-dashboard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products$: Observable<Product[]>;
  products: Product[] = [];
  filter = new FormControl('');
  sortOrder: SortOrderEnum;
  cartItems: CartItemModel[] = [];
  cartTotalPrice = 0;
  currentFormStep = 1;
  formSteps = [
    {value: 1, text: 'Cart', valid: true},
    {value: 2, text: 'Shipping', valid: false},
    {value: 3, text: 'Payment', valid: false},
    {value: 4, text: 'Overview', valid: false}
  ];
  form: FormGroup;
  loader = true;

  constructor(
    private productService: ProductService,
    private modalService: NgbModal,
    private dataService: DataService,
    private fb: FormBuilder,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get address() {
    return this.form.get('address');
  }

  get phone() {
    return this.form.get('phone');
  }

  get accountOwner() {
    return this.form.get('accountOwner');
  }

  get iban() {
    return this.form.get('iban');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      address: '',
      phone: ['', [Validators.required, Validators.pattern(/^\+[0-9]+$/)]],
      accountOwner: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      iban: ['', [Validators.required, IBANValidator()]]
    });
    this.form.valueChanges.subscribe(() => {
      this.localStorageService.saveToLocalStorage(this.getAllFormData());
    });
    const formData = this.localStorageService.getLocalStorage();
    if (formData) {
      this.dataService.changeCartItemsDataSource(formData.items);
      this.cartTotalPrice = formData.cartTotalPrice;
      this.currentFormStep = formData.currentFormStep;
      this.form.patchValue(formData);
    }

    this.dataService.cartItemsDataSource.subscribe(data => this.cartItems = data);
    this.productService.getProducts()
      .subscribe(
        (value: Product[]) => {
          this.products = value;
          this.loader = false;
          this.products$ = this.filter.valueChanges.pipe(
            startWith(''),
            map(() => this.productService.searchByProductName(this.filter.value, this.products))
          );
        }, error => {
          this.loader = false;
          console.log('[ getProducts() :: error ]', error);
        });
  }

  onSort(): void {
    this.sortOrder = this.productService.toggleSortOrder(this.sortOrder);
    this.products$ = this.products$.pipe(map((products: Product[]) => this.productService.sortProductsByPrice(this.sortOrder, products)));
  }

  openCartModal(content): void {
    this.modalService.open(content, {});
    this.sumCartItems();
  }

  addToCart(product: Product): void {
    if (!this.cartItems.some(ci => ci.id === product.id)) {
      this.dataService.changeCartItemsDataSource([...this.cartItems, new CartItemModel(product)]);
    }
    this.localStorageService.saveToLocalStorage(this.getAllFormData());
  }

  onQuantityClick(cartItem: CartItemModel, type: string): void {
    switch (type) {
      case 'add':
        if (cartItem.quantity < cartItem.maxQuantity) {
          cartItem.quantity++;
        }
        break;
      case 'subtract':
        if (cartItem.quantity > 1) {
          cartItem.quantity--;
        }
        break;
      case 'remove':
        this.dataService.changeCartItemsDataSource(this.cartItems.filter(ci => ci.id !== cartItem.id));
        break;
    }
    this.sumCartItems();
  }

  sumCartItems(): void {
    this.cartTotalPrice = 0;
    if (this.cartItems && this.cartItems.length) {
      this.cartItems.forEach(cartItem => {
        this.cartTotalPrice += (cartItem.price * cartItem.quantity);
      });
    }
    this.localStorageService.saveToLocalStorage(this.getAllFormData());
  }

  onFormSubmit(): void {
    console.log('[ SUBMIT :: data ]', this.getAllFormData());
    if (this.form.valid && this.cartItems.length) {
      this.modalService.dismissAll();
      this.form.reset();
      this.dataService.changeCartItemsDataSource([]);
      this.sumCartItems();
      this.localStorageService.clearLocalStorage();
      this.router.navigateByUrl('/success').then(() => {
      });
    }
  }

  getAllFormData(): any {
    return Object.assign({}, this.form.value, {
      items: this.cartItems.length ? this.cartItems : [],
      cartTotalPrice: this.cartTotalPrice,
      currentFormStep: this.currentFormStep
    });
  }

  goToStep(type: string): void {
    switch (type) {
      case 'next':
        this.currentFormStep += 1;
        break;
      case 'prev':
        this.currentFormStep -= 1;
        break;
      case 'confirm':
        console.log('CONFIRM');
        break;
    }
    this.localStorageService.saveToLocalStorage(this.getAllFormData());
  }

  disableFormStep(currentStep: number): boolean {
    switch (currentStep) {
      case 1:
        return false;
      case 2:
        return !this.cartItems.length;
      case 3:
        return !this.cartItems.length ||
          this.firstName.invalid ||
          this.lastName.invalid ||
          this.phone.invalid;
      case 4:
        return !this.cartItems.length ||
          this.firstName.invalid ||
          this.lastName.invalid ||
          this.phone.invalid ||
          this.accountOwner.invalid ||
          this.iban.invalid;
    }
    return false;
  }

  onFormStepChange(): void {
    this.localStorageService.saveToLocalStorage(this.getAllFormData());
  }
}
