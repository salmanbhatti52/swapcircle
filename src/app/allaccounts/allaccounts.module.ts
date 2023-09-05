import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllaccountsPageRoutingModule } from './allaccounts-routing.module';

import { AllaccountsPage } from './allaccounts.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllaccountsPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [AllaccountsPage]
})
export class AllaccountsPageModule { }
