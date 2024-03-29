import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateofferPageRoutingModule } from './createoffer-routing.module';

import { CreateofferPage } from './createoffer.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateofferPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [CreateofferPage]
})
export class CreateofferPageModule { }
