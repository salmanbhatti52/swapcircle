import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfferpopupPageRoutingModule } from './offerpopup-routing.module';

import { OfferpopupPage } from './offerpopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfferpopupPageRoutingModule
  ],
  declarations: [OfferpopupPage]
})
export class OfferpopupPageModule {}
