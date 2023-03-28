import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendcurrencyPageRoutingModule } from './sendcurrency-routing.module';

import { SendcurrencyPage } from './sendcurrency.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendcurrencyPageRoutingModule
  ],
  declarations: [SendcurrencyPage]
})
export class SendcurrencyPageModule {}
