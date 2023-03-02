import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillingpaymentPage } from './billingpayment.page';

const routes: Routes = [
  {
    path: '',
    component: BillingpaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillingpaymentPageRoutingModule {}
