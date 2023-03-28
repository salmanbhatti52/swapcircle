import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateofferPageRoutingModule } from './createoffer-routing.module';

import { CreateofferPage } from './createoffer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateofferPageRoutingModule
  ],
  declarations: [CreateofferPage]
})
export class CreateofferPageModule {}
