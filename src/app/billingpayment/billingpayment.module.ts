import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillingpaymentPageRoutingModule } from './billingpayment-routing.module';

import { BillingpaymentPage } from './billingpayment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillingpaymentPageRoutingModule
  ],
  declarations: [BillingpaymentPage]
})
export class BillingpaymentPageModule {}
