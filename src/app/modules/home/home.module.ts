import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './home-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './components/home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CoreModule} from '../../core/core.module';
import {SuccessPageComponent} from './components/success-page/success-page.component';

@NgModule({
  declarations: [HomeComponent, SuccessPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    NgbModule,
    CoreModule
  ]
})
export class HomeModule {
}
