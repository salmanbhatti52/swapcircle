import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatewalletPageRoutingModule } from './createwallet-routing.module';

import { CreatewalletPage } from './createwallet.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatewalletPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [CreatewalletPage]
})
export class CreatewalletPageModule { }
