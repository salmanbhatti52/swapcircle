import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatewalletPageRoutingModule } from './createwallet-routing.module';

import { CreatewalletPage } from './createwallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatewalletPageRoutingModule
  ],
  declarations: [CreatewalletPage]
})
export class CreatewalletPageModule {}
