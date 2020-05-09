import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigService} from './services/config.service';
import {SortArrowPipe} from './pipes/sort-arrow.pipe';
import {DataService} from './services/data.service';
import {ProductService} from './services/product.service';
import {ShowStepOKPipe} from './pipes/show-step-ok.pipe';
import {IbanPipe} from './pipes/iban.pipe';
import {LocalStorageService} from './services/local-storage.service';


@NgModule({
  declarations: [
    SortArrowPipe,
    ShowStepOKPipe,
    IbanPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SortArrowPipe,
    ShowStepOKPipe,
    IbanPipe
  ],
  providers: [
    ConfigService,
    ProductService,
    DataService,
    LocalStorageService
  ]
})
export class CoreModule {
}
