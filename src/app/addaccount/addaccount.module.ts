import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddaccountPageRoutingModule } from './addaccount-routing.module';

import { AddaccountPage } from './addaccount.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    AddaccountPageRoutingModule
  ],
  declarations: [AddaccountPage]
})
export class AddaccountPageModule { }
