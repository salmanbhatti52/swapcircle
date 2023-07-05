import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendcurrencyPageRoutingModule } from './sendcurrency-routing.module';

import { SendcurrencyPage } from './sendcurrency.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendcurrencyPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [SendcurrencyPage]
})
export class SendcurrencyPageModule { }
