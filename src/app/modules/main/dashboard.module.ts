import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {FormsModule} from '@angular/forms';
import {DashboardComponent} from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    FormsModule,
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {
}
