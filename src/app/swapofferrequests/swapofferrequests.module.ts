import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SwapofferrequestsPageRoutingModule } from './swapofferrequests-routing.module';

import { SwapofferrequestsPage } from './swapofferrequests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwapofferrequestsPageRoutingModule
  ],
  declarations: [SwapofferrequestsPage]
})
export class SwapofferrequestsPageModule {}
