import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Sendcurrency2PageRoutingModule } from './sendcurrency2-routing.module';

import { Sendcurrency2Page } from './sendcurrency2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Sendcurrency2PageRoutingModule
  ],
  declarations: [Sendcurrency2Page]
})
export class Sendcurrency2PageModule {}
